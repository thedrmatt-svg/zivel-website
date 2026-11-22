// Replit workspace Shell: node --test scripts/test-coral-gables-fighter.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const path = require("node:path");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const campaignRoot = "src/app/ads/coral-gables/rillion-gracie";

function loadAction({ sendError = null } = {}) {
  const sent = [];
  const source = fs.readFileSync("src/app/ads/_shared/actions.ts", "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require(name) {
      if (name === "resend") return { Resend: class {
        emails = { send: async email => { sent.push(email); return { error: sendError }; } };
      } };
      if (name === "next/headers") return { headers: async () => new Headers({ "x-forwarded-for": "192.0.2.1" }) };
      throw new Error(`Unexpected import: ${name}`);
    },
    // Fake configuration only: never access workspace credentials or send mail.
    process: { env: { RESEND_API_KEY: "test-only-not-a-real-key" } },
    console: { error() {} },
    Date, Map, Set,
  });
  return { submit: exports.submitAdsLead, sent };
}

function form(overrides = {}) {
  const values = {
    name: "Campaign Test",
    phone: "(786) 555-0100",
    email: "campaign@example.test",
    service: "Cryotherapy",
    referrer: "Rilion Gracie",
    offer: "A — First recovery session free",
    source: "Coral Gables Rilion Gracie Ad",
    ...overrides,
  };
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

test("Coral Gables campaign submits only to Coral Gables recipients", async () => {
  const action = loadAction();
  assert.equal((await action.submit(form())).status, "success");
  assert.equal(action.sent.length, 1);
  const email = action.sent[0];
  assert.deepEqual(Array.from(email.to), ["coralgables@zivel.com", "mikeaguirre@zivel.com"]);
  assert.equal(email.replyTo, "campaign@example.test");
  assert(email.subject.includes("Coral Gables Rilion Gracie Ad"));
  assert(email.html.includes("Rilion Gracie"));
  assert(!email.html.includes("Buckhead"));
});

test("Coral Gables rejects missing or cross-studio campaign selections", async () => {
  for (const overrides of [
    { referrer: "Cunha MMA" }, { referrer: "" }, { offer: "" },
    { offer: "Unapproved discount" }, { service: "Not a service" },
    { name: "" }, { phone: "invalid" }, { email: "not-an-email" },
  ]) {
    const action = loadAction();
    assert.equal((await action.submit(form(overrides))).status, "error");
    assert.equal(action.sent.length, 0);
  }
});

test("Coral Gables day pass accepts two recovery services and rejects the old offer", async () => {
  const action = loadAction();
  const offer = "B — $49 day pass, two recovery services, same day";
  assert.equal((await action.submit(form({ offer }))).status, "success");
  assert(action.sent[0].html.includes(offer));
  assert.equal((await action.submit(form({ offer: "B — $49 day pass, three standard services, same day" }))).status, "error");
});

test("Beautiful Violence inquiries use their own selections and Coral Gables recipients", async () => {
  for (const offer of ["Recovery session", "Recovery day pass", "Fighter membership"]) {
    const action = loadAction();
    const result = await action.submit(form({
      source: "Coral Gables Beautiful Violence Muay Thai Ad",
      referrer: "Beautiful Violence Muay Thai",
      offer,
    }));
    assert.equal(result.status, "success");
    assert.equal(action.sent.length, 1);
    assert.deepEqual(Array.from(action.sent[0].to), ["coralgables@zivel.com", "mikeaguirre@zivel.com"]);
    assert(action.sent[0].subject.includes("Beautiful Violence Muay Thai"));
    assert(action.sent[0].html.includes(offer));
    assert(!action.sent[0].html.includes("Rilion Gracie"));
  }
});

test("Beautiful Violence rejects inherited offers and referrals and uses the local error phone", async () => {
  const values = {
    source: "Coral Gables Beautiful Violence Muay Thai Ad",
    referrer: "Beautiful Violence Muay Thai",
    offer: "Fighter membership",
  };
  for (const overrides of [
    { referrer: "Rilion Gracie" }, { referrer: "Cunha MMA" }, { referrer: "" },
    { offer: "C — Fighter membership, $69 then $139" }, { offer: "" },
    { service: "Not a service" },
  ]) {
    const action = loadAction();
    assert.equal((await action.submit(form({ ...values, ...overrides }))).status, "error");
    assert.equal(action.sent.length, 0);
  }
  const action = loadAction({ sendError: { message: "simulated failure" } });
  const result = await action.submit(form(values));
  assert.equal(result.status, "error");
  assert(result.message.includes("(786) 527-0842"));
});

test("Existing Buckhead and Riverton campaign delivery remains unchanged", async () => {
  for (const [source, referrer, recipients] of [
    ["Buckhead Fighter Ad", "Cunha MMA", ["buckhead@zivel.com", "flanagan@zivel.com"]],
    ["Salt Lake Bees Google Ads", "", ["vtzk5gc2@robot.zapier.com", "jackson@zivel.com"]],
  ]) {
    const action = loadAction();
    assert.equal((await action.submit(form({ source, referrer }))).status, "success");
    assert.deepEqual(Array.from(action.sent[0].to), recipients);
  }
});

test("Campaign errors use Coral Gables phone and never redirect as success", async () => {
  const action = loadAction({ sendError: { message: "simulated failure" } });
  const result = await action.submit(form());
  assert.equal(result.status, "error");
  assert(result.message.includes("(786) 527-0842"));
  assert(!result.message.includes("(385)"));
});

test("Campaign honeypot, rate limit, and HTML escaping remain effective", async () => {
  const action = loadAction();
  await action.submit(form({ website: "spam" }));
  assert.equal(action.sent.length, 0);
  assert.equal((await action.submit(form({ name: "<script>test</script>" }))).status, "success");
  assert(action.sent[0].html.includes("&lt;script&gt;test&lt;/script&gt;"));
  for (let i = 0; i < 4; i++) await action.submit(form());
  const limited = await action.submit(form());
  assert.equal(limited.status, "error");
  assert(limited.message.includes("Too many requests"));
  assert(limited.message.includes("(786) 527-0842"));
  assert.equal(action.sent.length, 5);
});

function pageRenderer() {
  const r = createLocationRenderer();
  r.wrappers["./actions"] = { submitAdsLead: async () => ({ status: "success" }) };
  return r;
}

test("Landing page has scoped branding, working form configuration and local links", async () => {
  const r = pageRenderer();
  const page = await r.render(`${campaignRoot}/page`, {});
  assert(page.text.includes("Rilion Gracie"));
  assert(page.text.includes("Zivel Coral Gables"));
  assert(page.text.includes("348 Minorca Ave"));
  assert(page.text.includes("Two-Service Day Pass"));
  assert(page.text.includes("Two recovery services"));
  assert(page.text.includes("Use both on the same day"));
  assert(!/\bthree\b/i.test(page.text), "No outdated three-service day-pass mentions remain");
  assert(page.querySelector('option[value="B — $49 day pass, two recovery services, same day"]'));
  assert(page.text.includes("14 recovery services per month"));
  assert(page.text.includes('Use code: "rillion" for first month discount'));
  assert(page.text.includes("Over 50% discount"));
  assert(!page.text.includes("Over 20%"));
  const membershipCheckout = page.querySelector('a[href="https://app.clubready.com/JoinUs/14828/657768"]');
  assert(membershipCheckout, "Membership has the approved checkout link");
  assert.equal(membershipCheckout.text, "Buy Now");
  assert.equal(membershipCheckout.getAttribute("target"), "_blank");
  assert(membershipCheckout.getAttribute("rel").includes("noopener"));
  assert(page.querySelector('img[src="/images/ads/coral-gables-jiu-jitsu-athlete.jpg"]'));
  assert.equal(page.querySelector('input[name="source"]').getAttribute("value"), "Coral Gables Rilion Gracie Ad");
  assert.deepEqual(page.querySelectorAll('select[name="referrer"] option').slice(1).map(o => o.text), ["Rilion Gracie"]);
  assert.equal(page.querySelectorAll('select[name="offer"] option').length, 4);
  assert.equal(page.querySelector('input[name="phone"]').getAttribute("placeholder"), "(786) 555-0123");
  assert(page.querySelector('input[name="name"][required]'));
  assert(page.querySelector('input[name="phone"][required]'));
  assert(page.querySelector('a[href="tel:+17865270842"]'));
  assert(page.text.includes("About 12 minutes from the gym"));
  assert(page.text.includes("Drive time varies with traffic"));
  const map = page.querySelector('iframe');
  assert(map, "Google map is embedded");
  assert(map.getAttribute("title"), "Map has an accessible title");
  const mapUrl = new URL(map.getAttribute("src"));
  assert.equal(mapUrl.hostname, "maps.google.com");
  assert(mapUrl.searchParams.get("q").includes("348 Minorca Ave"));
  assert.equal(mapUrl.searchParams.get("output"), "embed");
  const directions = page.querySelector('a[href^="https://www.google.com/maps/dir/"]');
  assert(directions, "Google driving directions are available");
  const directionsUrl = new URL(directions.getAttribute("href"));
  assert.equal(directionsUrl.searchParams.get("origin"), "Rilion Gracie Miami");
  assert(directionsUrl.searchParams.get("destination").includes("348 Minorca Ave"));
  assert.equal(directionsUrl.searchParams.get("travelmode"), "driving");
  assert.equal(directions.getAttribute("target"), "_blank");
  assert(directions.getAttribute("rel").includes("noopener"));
  for (const link of page.querySelectorAll('a[href^="#"]')) {
    assert(page.querySelector(link.getAttribute("href")), `Anchor ${link.getAttribute("href")} exists`);
  }
  const source = fs.readFileSync(`${campaignRoot}/page.tsx`, "utf8");
  assert(source.includes('redirectUrl="/ads/coral-gables/rillion-gracie/thank-you"'));
  for (const image of page.querySelectorAll("img")) {
    assert(fs.existsSync(`public${image.getAttribute("src")}`));
    assert(image.getAttribute("alt"));
  }
  assert.equal(r.source(`${campaignRoot}/page`).metadata.robots.index, false);
});

test("Thank-you booking and contact actions belong to Coral Gables only", async () => {
  const r = pageRenderer();
  const page = await r.render(`${campaignRoot}/thank-you/page`, {});
  assert(page.querySelector('a[href="https://zivel.myperformanceiq.com/book-appointment?set_location=11432"]'));
  assert(page.querySelector('a[href="/locations/florida/coral-gables"]'));
  assert(page.querySelector('a[href="tel:+17865270842"]'));
  assert(page.text.includes("Zivel Coral Gables"));
  assert.equal(r.source(`${campaignRoot}/thank-you/page`).metadata.robots.index, false);
  for (const file of ["page.tsx", "layout.tsx", "thank-you/page.tsx", "FighterRecoveryFaq.tsx"]) {
    const text = fs.readFileSync(`${campaignRoot}/${file}`, "utf8");
    assert(!/Buckhead|American Top Team|Riverton|GTM-|fbq|gtag/.test(text), file);
  }
  const layout = fs.readFileSync(`${campaignRoot}/layout.tsx`, "utf8");
  for (const [, font] of layout.matchAll(/src: "([^"]+)"/g)) {
    assert(fs.existsSync(path.resolve(campaignRoot, font)), `Bundled font exists: ${font}`);
  }
  assert(layout.includes("<CookieConsent />"));
  assert(!layout.includes("next/font/google"));
});

test("Beautiful Violence pages are isolated, Muay Thai-specific, and ready for offer details", async () => {
  const root = "src/app/ads/coral-gables/beautiful-violence";
  const r = pageRenderer();
  const page = await r.render(`${root}/page`, {});
  assert(page.text.includes("Beautiful Violence"));
  assert(page.text.includes("Muay Thai"));
  assert(!/Rilion|rillion|BJJ|jiu.jitsu|12 minutes|657768|\$69|\$139/.test(page.text));
  assert(page.querySelector('img[src="/images/ads/coral-gables-muay-thai-athlete.jpg"]'));
  assert.equal(page.querySelector('input[name="source"]').getAttribute("value"), "Coral Gables Beautiful Violence Muay Thai Ad");
  assert.deepEqual(page.querySelectorAll('select[name="referrer"] option').slice(1).map(o => o.text), ["Beautiful Violence Muay Thai"]);
  assert.deepEqual(page.querySelectorAll('select[name="offer"] option').slice(1).map(o => o.getAttribute("value")), ["Recovery session", "Recovery day pass", "Fighter membership"]);
  assert(page.querySelector('a[href="tel:+17865270842"]'));
  assert(page.querySelector('iframe[title]'));
  const directions = new URL(page.querySelector('a[href^="https://www.google.com/maps/dir/"]').getAttribute("href"));
  assert(directions.searchParams.get("origin").includes("4180"));
  assert(directions.searchParams.get("destination").includes("348 Minorca Ave"));
  for (const link of page.querySelectorAll('a[href^="#"]')) {
    assert(page.querySelector(link.getAttribute("href")), `Anchor ${link.getAttribute("href")} exists`);
  }
  for (const image of page.querySelectorAll("img")) {
    assert(fs.existsSync(`public${image.getAttribute("src")}`));
    assert(image.getAttribute("alt"));
  }
  assert(fs.readFileSync(`${root}/page.tsx`, "utf8").includes('redirectUrl="/ads/coral-gables/beautiful-violence/thank-you"'));
  assert.equal(r.source(`${root}/page`).metadata.robots.index, false);
  const thankYou = await r.render(`${root}/thank-you/page`, {});
  assert(thankYou.querySelector('a[href="https://zivel.myperformanceiq.com/book-appointment?set_location=11432"]'));
  assert(thankYou.querySelector('a[href="/locations/florida/coral-gables"]'));
  assert(thankYou.text.includes("Beautiful Violence"));
  assert.equal(r.source(`${root}/thank-you/page`).metadata.robots.index, false);
  for (const file of ["page.tsx", "layout.tsx", "thank-you/page.tsx", "FighterRecoveryFaq.tsx"]) {
    const text = fs.readFileSync(`${root}/${file}`, "utf8");
    assert(!/Rilion|rillion|BJJ|jiu.jitsu|Buckhead|Riverton|GTM-|fbq|gtag|657768/.test(text), file);
  }
  const layout = fs.readFileSync(`${root}/layout.tsx`, "utf8");
  assert(layout.includes("<CookieConsent />"));
  assert(!layout.includes("next/font/google"));
  for (const [, font] of layout.matchAll(/src: "([^"]+)"/g)) {
    assert(fs.existsSync(path.resolve(root, font)), `Bundled font exists: ${font}`);
  }
});
