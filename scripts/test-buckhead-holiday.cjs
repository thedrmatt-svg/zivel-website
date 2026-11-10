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

test("Buckhead main retains schema, services, and booking identity with the supplied offer", async () => {
  const r = renderer(), standard = renderer(true);
  const page = await r.render(mainFile, params);
  const before = await standard.render(mainFile, params);
  assert.equal(page.querySelector("#location-hero-title").text, "Holiday Offers");
  assert(page.text.includes("Zivel Buckhead"));
  const offer = page.querySelector('section[aria-label="Holiday offers"]');
  assert.equal(offer.querySelectorAll("article").length, 3);
  const giftCard = offer.querySelectorAll("article")[2];
  assert.equal(giftCard.querySelector("h2").text, "Gift Cards");
  assert.equal(giftCard.querySelector(".price"), null);
  assert.equal(giftCard.querySelector(".description").text, "Give the Gift of Feeling Better");
  assert.equal(giftCard.querySelector("img").getAttribute("src"), "/locations/highlands-ranch/services/infrared-sauna.jpg");
  assert.equal(giftCard.querySelector("a").getAttribute("href"), "/locations/georgia/buckhead/pricing");
  assert.equal(offer.querySelector("h2").text, "6 Pack Recovery");
  assert.equal(offer.querySelector(".price").text, "$99");
  assert.equal(offer.querySelector(".description").text, "6 Recovery Services in 1 Month");
  assert.equal(offer.querySelector("a").getAttribute("href"),
    "https://app.clubready.com/JoinUs/14900/656882");
  assert.equal(offer.querySelector("img").getAttribute("src"),
    r.source("src/lib/data/location-service-images").getLocationServiceImage("buckhead", "red-light-therapy"));
  const facial = offer.querySelectorAll("article")[1];
  assert.equal(facial.querySelector("h2").text, "BOGO Cryo Facial/Double Chin");
  assert.equal(facial.querySelector(".price").text, "$150");
  assert.equal(facial.querySelector(".description").text, "Buy One Get/Give One");
  assert.equal(facial.querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656883");
  assert.equal(facial.querySelector("img").getAttribute("src"),
    r.source("src/lib/data/location-service-images").getLocationServiceImage("buckhead", "cryo-lift-facial"));
  assert.equal(offer.querySelector(".disclaimer").text,
    r.source("src/components/location/holiday/holiday-offers").HOLIDAY_OFFER_DISCLAIMER);
  assert(links(page).includes("/locations/georgia/buckhead/pricing"));
  assert.deepEqual(schema(page), schema(before), "Live structured data is unchanged");
  const serviceImages = doc => {
    const offerImages = new Set(doc.querySelectorAll('section[aria-label="Holiday offers"] img'));
    return doc.querySelectorAll("img").filter(img => !offerImages.has(img) &&
      (img.getAttribute("src").includes("/services/") || img.getAttribute("src").includes("/service-")))
      .map(img => [img.getAttribute("src"), img.getAttribute("alt")]);
  };
  assert.deepEqual(serviceImages(page), serviceImages(before));
  assert(links(page).some(link => link.includes("set_location=11537")));
  assert(!links(page).some(link => link.includes("11433")));
  assert(!page.text.includes("HOLLYWOOD"));
  assert(!page.text.includes("STOCKING STUFFERS"));
  assert(!links(page).some(link => link.includes("/locations/florida/hollywood")));
});

test("Buckhead pricing opens the gate temporarily and keeps regular prices and purchase links", async () => {
  const r = renderer(), standard = renderer(true);
  const page = await r.render(pricingFile, params);
  const before = await standard.render(pricingFile, params);
  assert.equal(page.querySelector("h1").text, "Holiday Specials, Pricing & Memberships");
  assert.deepEqual(schema(page), schema(before));
  const regularLinks = doc => {
    const specialLinks = new Set(doc.querySelectorAll("#specials a"));
    return doc.querySelectorAll("a").filter(a => !specialLinks.has(a)).map(a => a.getAttribute("href")).sort();
  };
  assert.deepEqual(regularLinks(page), regularLinks(before), "Regular pricing destinations remain unchanged");
  for (const id of ["memberships", "services", "packages"]) {
    assert.equal(page.querySelector(`#${id}`).innerHTML, before.querySelector(`#${id}`).innerHTML);
  }
  const offer = page.querySelector("#specials");
  assert.equal(offer.querySelectorAll("article").length, 3);
  const giftCard = offer.querySelectorAll("article")[2];
  assert.equal(giftCard.querySelector("h2").text, "Gift Cards");
  assert.equal(giftCard.querySelector(".description").text, "Give the Gift of Feeling Better");
  assert.equal(giftCard.querySelector("img").getAttribute("src"), "/locations/highlands-ranch/services/infrared-sauna.jpg");
  assert.equal(giftCard.querySelector("a").getAttribute("href"), "/locations/georgia/buckhead/pricing");
  const facial = offer.querySelectorAll("article")[1];
  assert.equal(facial.querySelector("h2").text, "BOGO Cryo Facial/Double Chin");
  assert.equal(facial.querySelector(".price").text, "$150");
  assert.equal(facial.querySelector(".description").text, "Buy One Get/Give One");
  assert.equal(facial.querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656883");
  assert.equal(offer.querySelector("a").getAttribute("href"), "https://app.clubready.com/JoinUs/14900/656882");
  assert.equal(offer.querySelector(".description").text, "6 Recovery Services in 1 Month");
  assert.equal(offer.querySelector(".disclaimer").text,
    r.source("src/components/location/holiday/holiday-offers").HOLIDAY_OFFER_DISCLAIMER);
  assert.deepEqual(page.querySelector('nav[aria-label="Pricing sections"]').querySelectorAll("a")
    .map(a => a.getAttribute("href")), ["#specials", "#memberships", "#services", "#packages"]);
  assert(page.querySelectorAll("[id]").indexOf(page.querySelector("#specials")) <
    page.querySelectorAll("[id]").indexOf(page.querySelector("#memberships")));
  assert.deepEqual(r.gates, [{ citySlug: "buckhead", bypass: true }]);
  assert(page.querySelector(".snowfall"));
});

test("holiday pricing is visibly ungated without stored signup state and the gate can be restored", async () => {
  const r = renderer();
  delete r.wrappers["@/components/location/PricingGateModal"];
  const page = await r.render(pricingFile, params);
  assert.equal(page.querySelector(".blur-xl"), null);
  assert.equal(page.querySelector("#pg-firstName"), null);
  assert(page.querySelector('#specials a[href="https://app.clubready.com/JoinUs/14900/656882"]'));
  assert(page.querySelector("#memberships"));
  const restored = renderer();
  const { isHolidayLocation } = restored.source("src/components/location/holiday/holiday-location-config");
  restored.wrappers["@/components/location/holiday/holiday-location-config"] = {
    isHolidayLocation, HOLIDAY_PRICING_SIGNUP_PAUSED: false,
  };
  await restored.render(pricingFile, params);
  assert.deepEqual(restored.gates, [{ citySlug: "buckhead", bypass: false }]);
});

test("seasonal decoration remains non-interactive and respects reduced motion", () => {
  for (const file of ["HolidayLocation.module.css", "HolidayPricingPresentation.module.css"]) {
    const css = fs.readFileSync(`src/components/location/holiday/${file}`, "utf8");
    assert.match(css, /prefers-reduced-motion: reduce/);
    assert.match(css, /animation: none/);
    assert.match(css, /pointer-events: none/);
  }
});
