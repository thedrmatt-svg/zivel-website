// Replit workspace Shell: node --test scripts/test-hollywood-mock-pricing.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

test("Hollywood pricing preview keeps real pricing and moves renamed specials first", async () => {
  const r = createLocationRenderer();
  r.wrappers["./HollywoodMockPricing.module.css"] = new Proxy({}, {
    get: (_, key) => key === "__esModule" ? false : String(key),
  });
  r.wrappers["@/components/location/PricingGateModal"] = ({ children }) => children;
  const live = await r.render("src/app/[locale]/locations/[state]/[city]/pricing/page", {
    state: "florida", city: "hollywood", locale: "en",
  });
  const mock = await r.render("src/app/mock-pricing/HollywoodMockPricingContent", {});
  assert.equal(mock.querySelectorAll('script[type="application/ld+json"],meta,form').length, 0);
  assert(!mock.text.includes("Unlock full details below."));
  assert(mock.querySelector(".hero"));
  assert.equal(mock.querySelector(".hero strong").text,
    "Treat yourself to self-care. Treat someone you love to gift-care.");
  assert(mock.querySelector(".hero").text.includes("purchase time to rest, recharge, and recover"));
  assert(!mock.querySelector(".hero").text.includes("Local pricing and membership options"));
  assert(live.text.includes("Local pricing and membership options for Zivel Hollywood"));
  assert(mock.querySelector(".contentSurface"));
  assert(mock.querySelector('img[src="/images/mock/holiday-bow-transparent.png"]'));
  assert.equal(mock.querySelectorAll(".snowflake").length, 16);
  assert.equal(mock.querySelector(".snowfall").getAttribute("aria-hidden"), "true");
  assert.equal(mock.querySelector("main .snowfall"), null, "Snow is outside hero and main clipping");
  const specials = mock.querySelector("#specials");
  assert(specials.text.includes("Holiday Specials"));
  assert.equal(specials.parentNode.querySelectorAll("[id]")[0].getAttribute("id"), "specials");
  assert(mock.querySelectorAll("[id]").indexOf(specials) <
    mock.querySelectorAll("[id]").indexOf(mock.querySelector("#memberships")));
  for (const id of ["memberships", "services", "packages"]) {
    assert.equal(mock.querySelector(`#${id}`).innerHTML, live.querySelector(`#${id}`).innerHTML,
      `${id} content and checkout links remain unchanged`);
  }
  assert.equal(specials.innerHTML.replaceAll("Holiday Specials", "Current Specials"),
    live.querySelector("#specials").innerHTML);
  const navLinks = mock.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a");
  assert.deepEqual(navLinks.map(a => [a.text.trim(), a.getAttribute("href")]), [
    ["Holiday Specials", "#specials"], ["Memberships", "#memberships"],
    ["Services", "#services"], ["Packages", "#packages"],
  ]);
  const links = doc => doc.querySelectorAll("a").map(a => a.getAttribute("href")).sort();
  assert.deepEqual(links(mock), links(live), "All existing destinations are preserved");
  assert(live.querySelector("#specials").text.includes("Current Specials"));
  assert(!live.querySelector("#specials").text.includes("Holiday Specials"));
});

test("pricing preview is separately isolated from advertising and search", () => {
  const layout = fs.readFileSync("src/app/mock-pricing/layout.tsx", "utf8");
  assert.match(layout, /index: false/);
  assert.match(layout, /follow: false/);
  assert.match(layout, /basePath="\/mock-pricing"/);
  assert.match(layout, /pathnameOverride="\/locations\/florida\/hollywood"/);
  assert(!/GoogleTagManager|MetaPixel|application\/ld\+json/.test(layout));
  const css = fs.readFileSync("src/app/mock-pricing/HollywoodMockPricing.module.css", "utf8");
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none/);
  assert.match(css, /\.snowfall\s*\{[^}]*position: fixed;[^}]*pointer-events: none;/s);
  assert.match(css, /width: clamp\(151\.8px, 25\.08vw, 356\.4px\)/);
  assert.match(css, /right: 0;/);
  assert.match(css, /width: 138\.6px/);
  const middleware = fs.readFileSync("src/middleware.ts", "utf8");
  assert(middleware.includes("/^\\/mock(?:-pricing)?\\/?$/"));
  const sitemap = fs.readFileSync("src/app/sitemap.ts", "utf8");
  assert(sitemap.includes("mock(?:-pricing)?(?:\\/|$)"));
});
