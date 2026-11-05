const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");

const root = path.resolve(__dirname, ".."), cache = new Map();
const mode = { omitFaq: false };
let Faq;
const wrappers = {
  "next/image": ({ fill, priority, quality, fetchPriority, ...props }) => React.createElement("img", props),
  "next/link": ({ children, scroll, prefetch, replace, ...props }) => React.createElement("a", props, children),
  "next/navigation": { notFound() { throw new Error("NEXT_NOT_FOUND"); } },
  "@/components/ui/ScrollReveal": ({ children }) => React.createElement(React.Fragment, null, children),
  "@/components/consent/GoogleAdsScript": () => null,
  "@/components/widgets/CherryWidget": () => null,
  "@/lib/actions/contactForm": { submitContactForm: async () => ({ status: "idle", message: "" }) },
  "@/components/location/LocationFaq": props => mode.omitFaq ? null : Faq(props),
};
function loadLocal(base) {
  const filename = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`]
    .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  assert(filename, `Cannot resolve ${base}`);
  if (cache.has(filename)) return cache.get(filename).exports;
  if (filename.endsWith(".json")) return require(filename);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = Module.createRequire(filename);
  mod.require = id => {
    if (Object.hasOwn(wrappers, id)) return wrappers[id];
    if (id.startsWith("@/")) return loadLocal(path.join(root, "src", id.slice(2)));
    if (id.startsWith(".")) return loadLocal(path.resolve(path.dirname(filename), id));
    return nativeRequire(id);
  };
  cache.set(filename, mod);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
  }).outputText, filename);
  return mod.exports;
}
const { locations } = loadLocal(path.join(root, "src/lib/data/locations"));
const { LOCAL_SERVICE_COMBOS } = loadLocal(path.join(root, "src/lib/data/local-service-pages"));
const { pathways } = loadLocal(path.join(root, "src/lib/data/pathways"));
const { buildLocationFaqs, buildLocationFaqSchema, getSingleSessionRange } = loadLocal(path.join(root, "src/lib/location-faqs"));
Faq = loadLocal(path.join(root, "src/components/location/LocationFaq")).default;
const Page = loadLocal(path.join(root, "src/app/[locale]/locations/[state]/[city]/page")).default;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const cityName = location => location.city ?? location.citySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
function options(location) {
  return {
    cityName: cityName(location),
    groupedHours: days.map(day => ({ label: day, time: location.hours[day.toLowerCase()] })),
    bookingUrl: `https://zivel.myperformanceiq.com/book-appointment?set_location=${location.booking?.locationId ?? 11417}`,
  };
}
function validateSchema(document, section, label) {
  const schemas = document.querySelectorAll('script[type="application/ld+json"]');
  const faqSchemas = schemas.filter(node => JSON.parse(node.innerHTML)["@type"] === "FAQPage");
  assert.equal(faqSchemas.length, 1, `${label}: exactly one FAQPage`);
  const schema = JSON.parse(faqSchemas[0].innerHTML);
  assert.equal(schema["@context"], "https://schema.org");
  const details = section.querySelectorAll("details");
  assert.equal(schema.mainEntity.length, details.length);
  details.forEach((detail, index) => {
    assert(!detail.hasAttribute("open"), `${label}: collapsed by default`);
    const heading = detail.querySelector("summary h3");
    assert(heading, `${label}: H3 in native summary`);
    const answer = detail.querySelector("p").text;
    assert.equal(schema.mainEntity[index]["@type"], "Question");
    assert.equal(schema.mainEntity[index].name, heading.text);
    assert.equal(schema.mainEntity[index].acceptedAnswer["@type"], "Answer");
    assert.equal(schema.mainEntity[index].acceptedAnswer.text, answer);
    const words = answer.trim().split(/\s+/).length;
    assert(words >= 40 && words <= 70, `${label}: answer length ${words}`);
  });
  return faqSchemas[0];
}

test("all 19 FAQs render before contact, match schema and page facts, and leave everything else unchanged", async () => {
  assert.equal(locations.length, 19);
  const counts = {};
  const serviceRoutes = new Set(LOCAL_SERVICE_COMBOS.map(c => `/locations/${c.state}/${c.city}/${c.service}`));
  const pageRoutes = new Set(locations.flatMap(l => [
    `/locations/${l.stateSlug}/${l.citySlug}/pricing`, `/locations/${l.stateSlug}/${l.citySlug}/pathways`,
  ]));
  for (const location of locations) {
    const label = `${location.stateSlug}/${location.citySlug}`;
    const params = Promise.resolve({ state: location.stateSlug, city: location.citySlug, locale: "en" });
    mode.omitFaq = true;
    const before = parse(renderToStaticMarkup(await Page({ params })));
    mode.omitFaq = false;
    const after = parse(renderToStaticMarkup(await Page({ params })));
    const section = after.querySelector("[data-location-faq]");
    assert(section, `${label}: FAQ in initial server HTML`);
    assert.equal(section.querySelector("h2").text.trim(), `Frequently Asked Questions About Zivel ${cityName(location)}`);
    assert.equal(after.querySelectorAll("h1").length, 1);
    const main = after.querySelector("main");
    const sections = main.childNodes.filter(node => node.tagName === "SECTION");
    const index = sections.indexOf(section);
    assert.equal(sections[index + 1].getAttribute("id"), "contact", `${label}: directly before contact`);
    if (location.localBlog) {
      assert.equal(sections[index - 1].querySelector("h2").text.trim(), location.localBlog.heading ?? "Local Wellness Insights");
    } else {
      assert.equal(sections[index - 1].getAttribute("id"), "map", `${label}: no blog added`);
    }
    const script = validateSchema(after, section, label);
    const details = section.querySelectorAll("details");
    counts[location.citySlug] = details.length;
    assert.equal(details.length, 8, label);
    assert.deepEqual(location.localFaqs, [], `${label}: no invented local content`);
    for (const { label: day, time } of options(location).groupedHours) {
      // Every source value appears in the FAQ; grouped labels are copied from
      // the actual Location Details markup below rather than guessed here.
      assert(details[0].text.includes(time), `${label}/${day}: correct hours`);
    }
    for (const row of main.querySelectorAll("dl > div")) {
      const day = row.querySelector("dt")?.text, time = row.querySelector("dd")?.text;
      if (day && time) assert(details[0].text.includes(`${day}: ${time}`), `${label}: displayed hour group`);
    }
    assert(details[0].text.includes(location.contact.phone));
    assert(details[1].text.includes(location.contact.address));
    if (location.contact.parking) assert(details[1].text.includes(location.contact.parking));
    const expectedServiceNames = location.services.map(s => s.name);
    assert.deepEqual(details[2].querySelectorAll("a").map(a => a.text), expectedServiceNames);
    const range = getSingleSessionRange(location);
    assert(details[3].text.includes(range.low) && details[3].text.includes(range.high), label);
    assert(after.querySelector("#pricing").text.includes(range.low), `${label}: low price matches visible pricing`);
    assert(after.querySelector("#pricing").text.includes(range.high), `${label}: high price matches visible pricing`);
    for (const pathway of pathways) assert(details[6].text.includes(pathway.name), `${label}: existing pathway names`);
    if (location.citySlug === "brecksville") {
      assert(!details[4].querySelectorAll("a").some(a => (a.getAttribute("href") ?? "").includes("set_location")));
      assert(!details[2].text.includes("Red Light"));
    } else {
      assert(details[4].querySelectorAll("a").some(a => a.getAttribute("href") === options(location).bookingUrl));
    }
    if (location.citySlug === "highlands-ranch") {
      assert(!details[2].text.includes("Float"));
      assert(details[2].text.includes("Red Light Therapy (coming soon)"));
    }
    for (const link of section.querySelectorAll("a")) {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) assert(after.querySelector(href), `${label}: existing anchor ${href}`);
      else if (href.startsWith("/")) assert(serviceRoutes.has(href) || pageRoutes.has(href), `${label}: existing internal route ${href}`);
      else assert(href.startsWith("tel:") || href === options(location).bookingUrl, `${label}: correct phone/booking link`);
    }
    const divider = main.childNodes.slice(0, main.childNodes.indexOf(section)).filter(node => node.nodeType === 1).at(-1);
    assert.equal(divider.getAttribute("class"), "zv-bleed zv-divider-dark-to-light");
    divider.remove(); section.remove(); script.remove();
    assert.equal(after.toString(), before.toString(), `${label}: no markup outside the addition changed`);
  }
  console.log("Final FAQ counts:", JSON.stringify(counts));
});

test("missing pricing and pathways omit exactly those questions in both visible HTML and schema", () => {
  const location = { ...locations[0], pricing: undefined };
  const items = buildLocationFaqs(location, { ...options(location), pathways: [] });
  assert.equal(items.length, 6);
  assert(!items.some(item => item.key === "pricing" || item.key === "pathways"));
  const document = parse(renderToStaticMarkup(React.createElement(Faq, { cityName: cityName(location), items })));
  assert.equal(document.querySelectorAll("details").length, 6);
  validateSchema(document, document.querySelector("[data-location-faq]"), "missing data");
  assert.equal(buildLocationFaqs(locations[0], { ...options(locations[0]), pathways: [] }).length, 7);
  assert.equal(buildLocationFaqs(location, options(location)).length, 7);
});

test("pricing range uses only individual-session numeric prices, not series, packages or membership equivalents", () => {
  const location = { ...locations[0], pricing: { standardPrices: [
    { name: "Individual", price: "$25.50", note: "Single session" },
    { name: "Individual premium", price: "$1,600", note: "Single session" },
    { name: "Series", price: "$5", note: "Series" },
    { name: "Package", price: "$2", note: "Single-session equivalent" },
    { name: "Unknown", price: "Contact store for pricing" },
    { name: "Malformed", price: "$1,2" },
  ] } };
  assert.deepEqual(getSingleSessionRange(location), { low: "$25.50", high: "$1,600" });
  assert.equal(getSingleSessionRange({ ...location, pricing: undefined }), null);
});

test("approved local entries append after standard entries; blank entries stay hidden and markup is stripped consistently", () => {
  const location = { ...locations[0], localFaqs: [
    { question: "  <b>Approved local question?</b> ", answer: "<p>Approved &amp; verified local answer.</p>" },
    { question: "", answer: "" },
  ] };
  const items = buildLocationFaqs(location, options(location));
  assert.equal(items.length, 9);
  assert.equal(items.at(-1).question, "Approved local question?");
  assert.equal(items.at(-1).answer, "Approved & verified local answer.");
  assert.equal(buildLocationFaqSchema(items).mainEntity.at(-1).acceptedAnswer.text, items.at(-1).answer);
  const document = parse(renderToStaticMarkup(React.createElement(Faq, { cityName: cityName(location), items })));
  assert.equal(document.querySelectorAll("details").at(-1).querySelector("p").text, items.at(-1).answer);
});

test("new non-disclaimer copy avoids medical outcome terms and the required medical disclaimer is exact", () => {
  for (const location of locations) {
    const items = buildLocationFaqs(location, options(location));
    for (const item of items.filter(item => item.key !== "medical")) assert(!/\b(treat|cure|heal)\b/i.test(item.answer));
    assert(items.find(item => item.key === "medical").answer.startsWith(
      "No. Zivel wellness services are not medical treatments and do not diagnose, treat, cure, or prevent disease."
    ));
  }
});

test("the blank local FAQ template lists all 19 locations without publishing answers", () => {
  const template = fs.readFileSync(path.join(root, "LOCAL_FAQ_TEMPLATE.md"), "utf8");
  assert.equal((template.match(/^## /gm) ?? []).length, 19);
  assert.equal((template.match(/^\s+Answer:\s*$/gm) ?? []).length, 57);
  for (const location of locations) assert(template.includes(`/locations/${location.stateSlug}/${location.citySlug}`));
});
