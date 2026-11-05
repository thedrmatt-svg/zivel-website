// Replit workspace Shell: node --test scripts/test-local-faq-corrections.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const { test } = require("node:test");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const { capture } = require("./local-faq-snapshot.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const presentation = r.source("src/lib/location-presentation");
const { buildStructuredLocationFaqs } = r.source("src/lib/location-local-faqs");
const fieldhouse = locations.find(l => l.citySlug === "fieldhouse");
const main = "src/app/[locale]/locations/[state]/[city]/page";

test("Fieldhouse keeps its business name, venue and real address locality on both main locale pages", async () => {
  assert.equal(fieldhouse.name, "Zivel Fieldhouse");
  assert.equal(presentation.getLocationCity(fieldhouse), "Hernando");
  for (const locale of ["en", "es"]) {
    const params = { locale, state: "mississippi", city: "fieldhouse" };
    const meta = await r.source(main).generateMetadata({ params: Promise.resolve(params) });
    const doc = await r.render(main, params);
    assert.equal(doc.querySelector("h1").text.trim(), "Zivel Fieldhouse");
    assert(meta.title.absolute.includes("Zivel Fieldhouse"));
    assert(meta.title.absolute.length <= 65);
    assert(meta.description.length <= 155);
    assert(meta.description.includes("Gatorade Fieldhouse near Hernando, MS"));
    assert.equal(meta.description, meta.openGraph.description);
    assert.equal(meta.description, meta.twitter.description);
    assert(!doc.toString().includes("Zivel Hernando"));
    assert(!doc.toString().includes("Ridgeland"));
    assert(!doc.toString().includes("Fieldhouse area of Hernando"));
    assert(doc.text.includes("Located inside the Gatorade Fieldhouse near Hernando, MS"));
    const schemas = doc.querySelectorAll('script[type="application/ld+json"]').map(n => JSON.parse(n.innerHTML));
    const business = schemas.find(s => s["@type"] === "HealthAndBeautyBusiness");
    assert.equal(business.name, "Zivel Fieldhouse");
    assert.equal(business.address.addressLocality, "Hernando");
    assert.equal(business.address.postalCode, "38632");
    assert(meta.alternates.canonical.endsWith("/locations/mississippi/fieldhouse"));
    assert.equal(buildStructuredLocationFaqs(fieldhouse).length, 3);
  }
});

test("Fieldhouse's individual service pages never rename the business Zivel Hernando", async () => {
  for (const service of fieldhouse.services) {
    const doc = await r.render("src/app/[locale]/locations/[state]/[city]/[service]/page", {
      locale: "en", state: "mississippi", city: "fieldhouse", service: service.slug,
    });
    assert(!doc.toString().includes("Zivel Hernando"), service.slug);
    assert(!doc.toString().includes("Ridgeland"), service.slug);
    assert(doc.text.includes("Gatorade Fieldhouse"), service.slug);
    assert(doc.text.includes("Zivel Fieldhouse"), service.slug);
  }
});

test("corrections leave all other studios, pages, navigation, sitemap and non-target Windermere FAQs unchanged", async t => {
  const filename = process.env.LOCAL_FAQ_CORRECTIONS_BEFORE;
  if (!filename) { t.skip("Supply the pre-correction snapshot for protected comparisons."); return; }
  const before = JSON.parse(fs.readFileSync(filename, "utf8"));
  const after = JSON.parse(JSON.stringify(await capture()));
  assert.deepEqual(after.sitemap, before.sitemap);
  assert.deepEqual(after.navigation, before.navigation);
  for (let index = 0; index < after.locations.length; index++) {
    const current = structuredClone(after.locations[index]), old = before.locations[index];
    if (current.citySlug === "fieldhouse") {
      current.seo.description = old.seo.description;
      current.contact.notes = old.contact.notes;
    }
    assert.deepEqual(current, old, current.citySlug);
  }
  for (let index = 0; index < after.pages.length; index++) {
    const current = after.pages[index], old = before.pages[index];
    if (current.params.city === "fieldhouse") {
      assert.deepEqual(current.sections, old.sections);
      assert.equal(current.faq.length, old.faq.length);
      continue;
    }
    if (current.params.city === "windermere") {
      const expected = structuredClone(old);
      const area = expected.faq.find(item => item.question.startsWith("Which areas"));
      area.answer = "Zivel Cumming is in Forsyth County, GA, and welcomes clients from Alpharetta, Johns Creek, and Cumming, and surrounding communities.";
      assert.deepEqual(current, expected, current.params.locale);
    } else {
      assert.deepEqual(current, old, `${current.params.locale}/${current.params.city}`);
    }
  }
  fs.writeFileSync("/tmp/zivel-local-faq-corrections-results.json", JSON.stringify({
    pages: after.pages.length, sitemap: after.sitemap.length,
    untouchedStudioTemplates: 17, corrections: ["fieldhouse", "windermere"],
  }, null, 2));
});
