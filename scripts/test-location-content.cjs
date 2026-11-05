const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");
const r = createLocationRenderer();
const { locations } = r.source("src/lib/data/locations");
const active = locations.filter(location => location.citySlug !== "brecksville");
const p = r.source("src/lib/location-presentation");
const booking = r.source("src/lib/location-booking");
const faq = r.source("src/lib/location-faqs");
const headerProps = {
  locationNav: r.source("src/lib/data/locationNav").getLocationNav({ featuredCount: 4 }),
  bookingActions: booking.buildLocationBookingActions(locations),
};
const mainFile = "src/app/[locale]/locations/[state]/[city]/page";
const serviceFile = "src/app/[locale]/locations/[state]/[city]/[service]/page";
const schemas = doc => doc.querySelectorAll('script[type="application/ld+json"]').map(node => JSON.parse(node.innerHTML));
const parameters = location => ({ state: location.stateSlug, city: location.citySlug, locale: "en" });
const baselinePath = process.env.LOCATION_AUDIT_BASELINE;
const baseline = baselinePath ? JSON.parse(fs.readFileSync(baselinePath, "utf8")) : null;
const report = { main: [], subpages: [], services: [], externalRedirects: ["belmont", "palm-coast"] };
const normalize = text => text.toLowerCase().replace(/[^a-z0-9]/g, "");

function verifyBreadcrumb(doc, city, label) {
  const schema = schemas(doc).find(entry => entry["@type"] === "BreadcrumbList");
  const nav = doc.querySelector('nav[aria-label="Breadcrumb"]');
  assert(schema && nav, `${label}: existing breadcrumb preserved`);
  const visible = nav.querySelectorAll("li").filter(node => node.getAttribute("aria-hidden") !== "true").map(node => node.text.trim());
  assert.deepEqual(schema.itemListElement.map(item => item.name), visible, `${label}: schema matches visible names`);
  assert(visible.includes(city), `${label}: municipality breadcrumb`);
  return schema;
}
function preserveSchema(before, after, label) {
  const old = schemas(r.parse(before));
  const current = schemas(after);
  assert.deepEqual(current.map(schema => schema["@type"]), old.map(schema => schema["@type"]), `${label}: schema types unchanged`);
  old.forEach((schema, index) => {
    if (schema["@type"] === "FAQPage") return;
    const actual = structuredClone(current[index]);
    const expected = structuredClone(schema);
    if (schema["@type"] === "BreadcrumbList") {
      expected.itemListElement.forEach(item => delete item.name);
      actual.itemListElement.forEach(item => delete item.name);
    } else {
      delete expected.description; delete actual.description;
      delete expected.hasOfferCatalog; delete actual.hasOfferCatalog;
    }
    assert.deepEqual(actual, expected, `${label}: protected schema fields`);
  });
}

test("city/neighborhood, title limits, and-more recomputation, and minute-based FAQ hours", () => {
  assert.equal(active.length, 18);
  for (const location of active) {
    const meta = p.getLocationMainMetadata(location);
    assert(meta.title.length <= 65);
    assert(meta.description.length <= 155);
    assert.equal((meta.title.match(/\| Zivel/g) ?? []).length, 1);
    assert(!p.hasUnavailableServiceMention(location, meta.title + meta.description + meta.subhead));
    const eligible = p.getPriorityLocationServices(location);
    const shown = eligible.filter(service => meta.description.includes(service.name)).length;
    assert.equal(meta.description.includes(", and more"), eligible.length > shown);
  }
  const base = active.find(location => location.citySlug === "briargate");
  const shortened = {
    ...base, services: p.getPriorityLocationServices(base).slice(0, 4),
    contact: { ...base.contact, address: "123 Main St, Colorado Springs Metropolitan Area, CO 80920" },
  };
  assert(p.getLocationMainMetadata(shortened).description.includes(", and more"));
  assert.equal(p.getLocationCity(base), "Colorado Springs");
  assert.equal(p.getLocationNeighborhood(base), "Briargate");
  const items = faq.buildLocationFaqs(base, {
    cityName: p.getLocationCity(base), groupedHours: [{ label: "Monday–Friday", time: "8:30am – 6:30pm" }, { label: "Sunday", time: "Closed" }],
    bookingUrl: booking.getLocationBookingHref(base),
  });
  assert(items[0].answer.includes("Monday–Friday 8:30am – 6:30pm, and closed Sunday"));
  assert.equal(items[1].parts.find(part => part.href === "#map").text, "the map and directions");
});

test("desktop/mobile booking mirrors the hero on both locales and every child-route pattern; safe missing-ID fallbacks", () => {
  for (const location of active) {
    const base = `/locations/${location.stateSlug}/${location.citySlug}`;
    for (const prefix of ["", "/es"]) for (const suffix of ["", "/pricing", "/pathways", "/cryotherapy", "/blog", "/blog/example"]) {
      const pathname = prefix + base + suffix;
      for (const mobile of [false, true]) {
        const doc = r.header(pathname, mobile, headerProps);
        const links = doc.querySelectorAll("a").filter(link => link.text.trim() === "Book Now");
        assert.equal(links.length, mobile ? 2 : 1, pathname);
        for (const link of links) assert.equal(link.getAttribute("href"), booking.getLocationBookingHref(location), pathname);
      }
    }
  }
  const noId = { ...active[0], booking: undefined };
  const noAction = { ...noId, contact: undefined };
  assert(booking.getLocationBookingHref(noId).startsWith("tel:+1"));
  assert.equal(booking.getLocationBookingAction(noAction), null);
  assert.equal(booking.getLocationBookingHref(noAction), `/locations/${noAction.stateSlug}/${noAction.citySlug}`);
  const href = booking.getHeaderBookingAction("/es/locations/example/missing/pricing", {}).href;
  assert.equal(href, "/locations/example/missing");
  const items = faq.buildLocationFaqs(noId, { cityName: p.getLocationCity(noId), groupedHours: [], bookingUrl: "wrong-11417" });
  assert(!JSON.stringify(items).includes("11417"));
  assert.equal(booking.getHeaderBookingAction("/", {}).href.includes("11417"), true);
});

test("18 main pages: exact metadata, city H1, eligible services, concise matching FAQ/schema, protected fields and section backgrounds", async () => {
  for (const location of active) {
    const params = parameters(location), label = `${params.state}/${params.city}`;
    const doc = await r.render(mainFile, params);
    const meta = await r.source(mainFile).generateMetadata({ params: Promise.resolve(params) });
    const expected = p.getLocationMainMetadata(location);
    assert.equal(doc.querySelector("h1").text.trim(), p.getLocationBusinessLabel(location), label);
    assert.equal(meta.title.absolute, expected.title);
    assert.equal(meta.description, expected.description);
    assert.equal(meta.openGraph.description, expected.description);
    assert.equal(meta.twitter.description, expected.description);
    assert(doc.querySelectorAll('meta[name="description"]').every(node => node.getAttribute("content") === expected.description));
    verifyBreadcrumb(doc, p.getLocationCity(location), label);
    const section = doc.querySelector("[data-location-faq]");
    const details = section.querySelectorAll("details");
    const schema = schemas(doc).find(schema => schema["@type"] === "FAQPage");
    assert.equal(details.length, schema.mainEntity.length);
    details.forEach((detail, index) => {
      assert.equal(detail.querySelector("summary").text, schema.mainEntity[index].name);
      assert.equal(detail.querySelector("p").text, schema.mainEntity[index].acceptedAnswer.text);
    });
    assert.deepEqual(details[2].querySelectorAll("a").map(node => node.text), p.getLiveLocationServices(location).map(service => service.name));
    const hasUpcoming = location.services.some(service => service.comingSoon);
    assert.equal(details[2].text.includes("Coming soon:"), hasUpcoming);
    const visibleCopy = doc.querySelectorAll("p,h1,h2,h3,h4").map(node => node.text).join(" ");
    assert.equal((visibleCopy.match(/coming soon/gi) ?? []).length, hasUpcoming ? 1 : 0, `${label}: FAQ-only visible upcoming label`);
    const old = baseline?.main.find(entry => entry.path === label);
    if (old) {
      assert.deepEqual(meta.alternates, old.meta.alternates);
      preserveSchema(old.html, doc, label);
      const oldSections = r.parse(old.html).querySelector("main").childNodes.filter(node => node.tagName === "SECTION");
      const sections = doc.querySelector("main").childNodes.filter(node => node.tagName === "SECTION");
      assert.deepEqual(sections.map(node => [node.getAttribute("id"), node.getAttribute("class")]), oldSections.map(node => [node.getAttribute("id"), node.getAttribute("class")]), `${label}: sections/order/backgrounds`);
    }
    report.main.push({ path: label, before: old?.h1, h1: doc.querySelector("h1").text.trim(), beforeTitle: old ? `${old.meta.title} | Zivel` : null, title: expected.title, description: expected.description, neighborhood: p.getLocationNeighborhood(location), bookingId: location.booking?.locationId, beforeHeader: old?.headerBookings, hero: doc.querySelectorAll("a").find(node => node.text.trim() === "Book Now")?.getAttribute("href"), faq: details.find(node => node.querySelector("summary").text.includes("How do I book"))?.querySelector('a[href]')?.getAttribute("href") });
  }
});

test("36 pricing/pathways pages retain metadata patterns, accurately list services, and align breadcrumb names", async () => {
  for (const location of active) for (const page of ["pricing", "pathways"]) {
    const params = parameters(location), label = `${params.state}/${params.city}/${page}`;
    const file = `src/app/[locale]/locations/[state]/[city]/${page}/page`;
    const doc = await r.render(file, params);
    const meta = await r.source(file).generateMetadata({ params: Promise.resolve(params) });
    verifyBreadcrumb(doc, p.getLocationCity(location), label);
    assert(!p.hasUnavailableServiceMention(location, meta.description ?? ""), `${label}: service accuracy`);
    const old = baseline?.subpages.find(entry => entry.path === label);
    if (old) {
      assert.deepEqual(meta.alternates, old.meta.alternates);
      assert.deepEqual(meta.title, old.meta.title);
      preserveSchema(old.html, doc, label);
    }
    report.subpages.push({ path: label, title: meta.title, description: meta.description });
  }
});

test("176 service pages keep canonical/title/description patterns, accurate offers and municipality breadcrumbs", async () => {
  const { LOCAL_SERVICE_COMBOS } = r.source("src/lib/data/local-service-pages");
  const combos = LOCAL_SERVICE_COMBOS.filter(combo => combo.locale === "en" && combo.city !== "brecksville");
  assert.equal(combos.length, 176);
  for (const params of combos) {
    const label = `${params.state}/${params.city}/${params.service}`;
    const location = active.find(location => location.stateSlug === params.state && location.citySlug === params.city);
    const doc = await r.render(serviceFile, params);
    const meta = await r.source(serviceFile).generateMetadata({ params: Promise.resolve(params) });
    verifyBreadcrumb(doc, p.getLocationCity(location), label);
    assert.equal(doc.querySelector('meta[name="description"]').getAttribute("content"), meta.description);
    const old = baseline?.services.find(entry => entry.path === label);
    if (old) {
      assert.deepEqual(meta, old.meta, `${label}: focused metadata unchanged`);
      preserveSchema(old.html, doc, label);
    }
    if (params.city === "highlands-ranch" && params.service === "red-light-therapy") {
      assert(meta.description.toLowerCase().includes("coming soon"));
      assert.notEqual(meta.robots?.index, false);
      assert(!schemas(doc).some(schema => schema.hasOfferCatalog));
      assert(!doc.querySelectorAll("a").some(link => /book/i.test(link.text) && /set_location/.test(link.getAttribute("href") ?? "")));
      assert(doc.text.includes("not yet available"));
    }
    report.services.push({ path: label, title: meta.title, description: meta.description });
  }
});

test("protected location data is unchanged", () => {
  if (baseline) assert.deepEqual(locations, baseline.locations);
});

test("local blog indices and published article breadcrumb names match the municipality and visible labels", async () => {
  for (const page of ["blog/page", "blog/[slug]/page"]) {
    const file = `src/app/[locale]/locations/[state]/[city]/${page}`;
    const paramsList = await r.source(file).generateStaticParams();
    for (const params of paramsList.filter(params => params.city !== "brecksville")) {
      const location = active.find(location => location.stateSlug === params.state && location.citySlug === params.city);
      const doc = await r.render(file, params);
      verifyBreadcrumb(doc, p.getLocationCity(location), `${params.state}/${params.city}/${params.slug ?? "blog"}`);
    }
  }
});

test.after(() => {
  if (process.env.LOCATION_AUDIT_OUTPUT) fs.writeFileSync(process.env.LOCATION_AUDIT_OUTPUT, JSON.stringify(report, null, 2));
});
