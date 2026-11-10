// Replit workspace Shell: node --test scripts/test-buckhead-holiday.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

const mainFile = "src/app/[locale]/locations/[state]/[city]/page";
const pricingFile = "src/app/[locale]/locations/[state]/[city]/pricing/page";
const params = { state: "georgia", city: "buckhead", locale: "en" };
const styles = new Proxy({}, {
  get: (_, key) => key === "__esModule" ? false : String(key),
});
function renderer(standard = false) {
  const r = createLocationRenderer();
  for (const name of [
    "@/components/location/holiday/HolidayLocation.module.css",
    "@/components/location/holiday/HolidayPricingPresentation.module.css",
    "./HolidayLocation.module.css", "./HolidayPricingPresentation.module.css",
    "./HollywoodHolidayHero.module.css", "./HollywoodMockPricing.module.css",
  ]) r.wrappers[name] = styles;
  if (standard) r.wrappers["@/components/location/holiday/holiday-location-config"] = {
    isHolidayLocation: () => false,
  };
  r.gates = [];
  r.wrappers["@/components/location/PricingGateModal"] = props => {
    r.gates.push({ citySlug: props.citySlug, bypass: props.bypass });
    return props.children;
  };
  return r;
}
const schema = page => page.querySelectorAll('script[type="application/ld+json"]')
  .map(element => JSON.parse(element.innerHTML));
const links = element => element.querySelectorAll("a")
  .map(a => a.getAttribute("href")).sort();

test("only Buckhead main and pricing are holiday-enabled; every other studio stays standard", async () => {
  const r = renderer(), standard = renderer(true);
  const { locations } = r.source("src/lib/data/locations");
  const config = r.source("src/components/location/holiday/holiday-location-config");
  for (const location of locations) {
    const enabled = location.stateSlug === "georgia" && location.citySlug === "buckhead";
    assert.equal(config.isHolidayLocation(location.stateSlug, location.citySlug), enabled);
    if (enabled) continue;
    for (const file of [mainFile, pricingFile]) {
      const p = { state: location.stateSlug, city: location.citySlug, locale: "en" };
      assert.equal((await r.render(file, p)).toString(), (await standard.render(file, p)).toString(),
        `${location.name}: holiday switch cannot alter this route`);
    }
  }
});

test("Buckhead main retains schema, service imagery, booking identity, and honest pending offers", async () => {
  const r = renderer(), standard = renderer(true);
  const page = await r.render(mainFile, params);
  const before = await standard.render(mainFile, params);
  assert.equal(page.querySelector("#location-hero-title").text, "Holiday Offers");
  assert(page.text.includes("Zivel Buckhead"));
  assert(page.querySelector(".pendingOffer").text.includes("confirmed"));
  assert(links(page).includes("/locations/georgia/buckhead/pricing"));
  assert.deepEqual(schema(page), schema(before), "Live structured data is unchanged");
  const serviceImages = doc => doc.querySelectorAll("img").filter(img =>
    img.getAttribute("src").includes("/services/") || img.getAttribute("src").includes("/service-"))
    .map(img => [img.getAttribute("src"), img.getAttribute("alt")]);
  assert.deepEqual(serviceImages(page), serviceImages(before));
  assert(links(page).some(link => link.includes("set_location=11537")));
  assert(!links(page).some(link => link.includes("11433")));
  assert(!page.text.includes("HOLLYWOOD"));
  assert(!page.text.includes("STOCKING STUFFERS"));
  assert(!links(page).some(link => link.includes("/locations/florida/hollywood")));
});

test("Buckhead pricing keeps actual prices and gate while moving Holiday Specials first", async () => {
  const r = renderer(), standard = renderer(true);
  const page = await r.render(pricingFile, params);
  const before = await standard.render(pricingFile, params);
  assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
  assert.deepEqual(schema(page), schema(before));
  assert.deepEqual(links(page), links(before), "No checkout destinations invented or replaced");
  for (const id of ["memberships", "services", "packages"]) {
    assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
  }
  assert.equal(page.querySelector("#specials").innerHTML.replace("Holiday Specials", "Current Specials"),
    before.querySelector("#specials").innerHTML);
  assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
    .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
  assert(page.querySelectorAll("[id]").indexOf(page.querySelector("#specials")) <
    page.querySelectorAll("[id]").indexOf(page.querySelector("#memberships")));
  assert.deepEqual(r.gates, [{ citySlug: "buckhead", bypass: false }]);
  assert(page.querySelector(".snowfall"));
});

test("seasonal decoration remains non-interactive and respects reduced motion", () => {
  for (const file of ["HolidayLocation.module.css", "HolidayPricingPresentation.module.css"]) {
    const css = fs.readFileSync(`src/components/location/holiday/${file}`, "utf8");
    assert.match(css, /prefers-reduced-motion: reduce/);
    assert.match(css, /animation: none/);
    assert.match(css, /pointer-events: none/);
  }
});
