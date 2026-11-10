// Replit workspace Shell: node --test scripts/test-coral-gables-red-light-image.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

test("Coral Gables uses its supplied red-light photo on main, service, and pricing pages", async () => {
  const r = createLocationRenderer();
  const src = "/locations/coral-gables/services/red-light-therapy.jpg";
  const params = { locale: "en", state: "florida", city: "coral-gables" };
  r.wrappers["@/components/location/PricingGateModal"] = ({ children }) => children;
  for (const [file, routeParams] of [
    ["src/app/[locale]/locations/[state]/[city]/page", params],
    ["src/app/[locale]/locations/[state]/[city]/[service]/page",
      { ...params, service: "red-light-therapy" }],
    ["src/app/[locale]/locations/[state]/[city]/pricing/page", params],
  ]) {
    const page = await r.render(file, routeParams);
    const images = page.querySelectorAll(`img[src="${src}"]`);
    assert(images.length > 0, `${file} displays the Coral Gables photo`);
    for (const image of images) {
      assert(image.getAttribute("alt").trim());
      assert(image.getAttribute("style").includes("object-position:center top"),
        `${file} keeps the top of the treatment room photo in the crop`);
    }
  }
  const { getLocationServiceImage, getNationalServiceImage } =
    r.source("src/lib/data/location-service-images");
  assert.equal(getLocationServiceImage("hollywood", "red-light-therapy"),
    getNationalServiceImage("red-light-therapy"));
  assert.equal(getLocationServiceImage("coral-gables", "cryotherapy"),
    getNationalServiceImage("cryotherapy"));
});
