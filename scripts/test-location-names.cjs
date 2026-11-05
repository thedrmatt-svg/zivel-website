// Replit workspace Shell: node --test scripts/test-location-names.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const presentation = r.source("src/lib/location-presentation");
const { buildLocationFaqs } = r.source("src/lib/location-faqs");
const participating = locations.filter(l => l.citySlug !== "brecksville");

test("owner-supplied business names are never regenerated from geography", () => {
  const buckhead = locations.find(l => l.citySlug === "buckhead");
  const windermere = locations.find(l => l.citySlug === "windermere");
  assert.equal(buckhead.name, "Zivel Buckhead");
  assert.equal(windermere.name, "Zivel Windermere");
  assert.equal(presentation.getLocationCity(buckhead), "Atlanta");
  assert.equal(presentation.getLocationCity(windermere), "Cumming");
  assert(windermere.nearbyCommunities.includes("Cumming"));
  const fixture = { ...buckhead, name: "Zivel Owner's Exact Studio Name" };
  assert.equal(presentation.getLocationBusinessLabel(fixture), fixture.name);
  assert.equal(presentation.getLocationAltText(fixture, `${fixture.name} interior`), `${fixture.name} interior`);
  for (const location of participating) {
    const meta = presentation.getLocationMainMetadata(location);
    assert(meta.title.includes(location.name), location.citySlug);
    assert(meta.title.length <= 65, location.citySlug);
    assert(meta.description.startsWith(`${location.name} offers `), location.citySlug);
    assert(meta.description.length <= 155, location.citySlug);
    const faq = buildLocationFaqs(location, {
      cityName: presentation.getLocationCity(location), groupedHours: [], bookingUrl: "#unused",
    });
    assert.equal(faq[0].question, `What are the hours at ${location.name}?`);
    assert.equal(faq[1].question, `Where is ${location.name} located, and is there parking?`);
  }
});

test("all 18 studio main templates preserve exact business names in both locales and matching FAQ schema", async () => {
  for (const location of participating) for (const locale of ["en", "es"]) {
    const doc = await r.render("src/app/[locale]/locations/[state]/[city]/page", {
      locale, state: location.stateSlug, city: location.citySlug,
    });
    assert.equal(doc.querySelector("h1").text.trim(), location.name);
    const section = doc.querySelector("[data-location-faq]");
    assert.equal(section.querySelector("h2").text.trim(), `Frequently Asked Questions About ${location.name}`);
    const schema = JSON.parse(section.querySelector('script[type="application/ld+json"]').innerHTML);
    section.querySelectorAll("details").forEach((item, index) => {
      assert.equal(item.querySelector("summary").text, schema.mainEntity[index].name);
      assert.equal(item.querySelector("p").text, schema.mainEntity[index].acceptedAnswer.text);
    });
    if (location.citySlug === "buckhead" || location.citySlug === "windermere") {
      assert(!doc.toString().includes("Zivel Atlanta"));
      assert(!doc.toString().includes("Zivel Cumming"));
    }
  }
});
