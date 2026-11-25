const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

test("Cumming finder label is alphabetized without renaming the Windermere studio", async () => {
  const r = createLocationRenderer();
  const { getLocationNav } = r.source("src/lib/data/locationNav");
  const { locations } = r.source("src/lib/data/locations");
  const studio = locations.find(location => location.citySlug === "windermere");
  const before = JSON.stringify(studio);
  const nav = getLocationNav({ featuredCount: locations.length });
  const href = "/locations/georgia/windermere";
  assert.equal(nav.cities.find(city => city.href === href).label, "Cumming, GA");
  assert.equal(nav.featured.find(city => city.href === href).label, "Cumming, GA");
  assert.deepEqual(nav.cities.map(city => city.label),
    nav.cities.map(city => city.label).sort((a, b) => a.localeCompare(b)));
  const page = await r.render("src/app/[locale]/locations/[state]/page", { state: "georgia", locale: "en" });
  const card = page.querySelectorAll("a").find(link => link.getAttribute("href") === href);
  assert(card.text.includes("Cumming, GA"));
  assert.equal(studio.name, "Zivel Windermere");
  assert.equal(JSON.stringify(studio), before);
});
