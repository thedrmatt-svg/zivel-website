const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");

const root = path.resolve(__dirname, "..");
const cache = new Map();
const mode = { previousOrder: false, brecksville: false };
const passthrough = ({ children }) => React.createElement(React.Fragment, null, children);
let reorder;
const wrappers = {
  "next/image": ({ fill, priority, quality, fetchPriority, ...props }) => React.createElement("img", props),
  "next/link": ({ children, scroll, prefetch, replace, ...props }) => React.createElement("a", props, children),
  "next/navigation": { notFound() { throw new Error("NEXT_NOT_FOUND"); } },
  "@/components/ui/ScrollReveal": passthrough,
  "@/components/consent/GoogleAdsScript": () => null,
  "@/components/widgets/CherryWidget": () => null,
  "@/lib/actions/contactForm": { submitContactForm: async () => ({ status: "idle", message: "" }) },
  "@/components/location/LocationSectionOrder": props =>
    mode.previousOrder && !mode.brecksville ? passthrough(props) : reorder(props),
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

reorder = loadLocal(path.join(root, "src/components/location/LocationSectionOrder")).default;
const { locations } = loadLocal(path.join(root, "src/lib/data/locations"));
const Page = loadLocal(path.join(root, "src/app/[locale]/locations/[state]/[city]/page")).default;

async function render(location, previousOrder) {
  mode.previousOrder = previousOrder;
  mode.brecksville = location.stateSlug === "ohio" && location.citySlug === "brecksville";
  return renderToStaticMarkup(await Page({
    params: Promise.resolve({ state: location.stateSlug, city: location.citySlug, locale: "en" }),
  }));
}

function signature(html) {
  // React useId intentionally depends on render-tree position, not content.
  const document = parse(html.replace(/review-text-[^"]+/g, "review-text-stable"));
  const main = document.querySelector("main");
  assert(main, "location main element");
  return {
    main,
    blocks: main.childNodes.filter(node => node.nodeType === 1).map(node => node.outerHTML),
    headings: document.querySelectorAll("h1,h2,h3").map(node => `${node.tagName}:${node.text.trim()}`),
    h1: document.querySelectorAll("h1").map(node => node.text.trim()),
    links: document.querySelectorAll("a").map(node => node.getAttribute("href")).sort(),
    schemas: document.querySelectorAll('script[type="application/ld+json"]').map(node => node.innerHTML),
  };
}

function matchingBackgrounds(main) {
  const sections = main.childNodes.filter(node => node.tagName === "SECTION").map(node => ({
    heading: node.querySelector("h2")?.text.trim() ?? node.querySelector("h1")?.text.trim() ?? "Statistics",
    background: (node.getAttribute("class") ?? "").split(/\s+/)
      .find(name => /^zv-section-(light|elevated|gradient|recessed)$/.test(name)) ??
      (node.getAttribute("class") ?? "").split(/\s+/).find(name => name.startsWith("bg-")),
  }));
  return new Set(sections.flatMap((section, index) => {
    const previous = sections[index - 1];
    return previous && section.background && previous.background === section.background
      ? [`${previous.heading} → ${section.heading} (${section.background})`] : [];
  }));
}

test("all 19 locations use the approved order with identical content, headings, links, schema and backgrounds", async () => {
  assert.equal(locations.length, 19);
  const newBackgroundPairs = new Map();
  for (const location of locations) {
    const label = `${location.stateSlug}/${location.citySlug}`;
    const beforeHtml = await render(location, true);
    const afterHtml = await render(location, false);
    const before = signature(beforeHtml), after = signature(afterHtml);
    assert.deepEqual(after.blocks.slice().sort(), before.blocks.slice().sort(), `${label}: whole blocks`);
    assert.deepEqual(after.headings.slice().sort(), before.headings.slice().sort(), `${label}: headings`);
    assert.equal(after.h1.length, 1, `${label}: one H1`);
    assert.deepEqual(after.h1, before.h1, `${label}: H1 text`);
    assert.deepEqual(after.links, before.links, `${label}: all links and booking URLs`);
    assert.deepEqual(after.schemas, before.schemas, `${label}: JSON-LD`);
    const previousPairs = matchingBackgrounds(before.main);
    for (const pair of matchingBackgrounds(after.main)) {
      if (!previousPairs.has(pair)) {
        newBackgroundPairs.set(pair, [...(newBackgroundPairs.get(pair) ?? []), label]);
      }
    }
    const headingsBefore = before.main.querySelectorAll("h2").map(node => node.text.trim());
    const blogHeading = location.localBlog?.heading ?? "Local Wellness Insights";
    const expected = [
      "Services Available", "Pricing", "What Clients Are Saying", "Book Your Session", "Pathways",
      "Location Details", "Find Us", blogHeading, "Questions or Request? Reach Out!",
    ].filter(heading => headingsBefore.includes(heading));
    const actual = after.main.querySelectorAll("h2").map(node => node.text.trim());
    assert.deepEqual(actual.filter(heading => expected.includes(heading)), expected, `${label}: approved section order`);
    if (label !== "ohio/brecksville") {
      assert.notEqual(afterHtml, beforeHtml, `${label}: section order changed`);
      continue;
    }
    const brecksvilleExpected = [
      "Services Available", "Pricing", "What Clients Are Saying", "Pathways",
      "Location Details", "Find Us", "Questions or Request? Reach Out!",
    ];
    assert.deepEqual(actual.filter(heading => brecksvilleExpected.includes(heading)), brecksvilleExpected);
    assert(!actual.includes("Book Your Session"), "Brecksville booking remains hidden");
    assert(!actual.some(heading => /Wellness Insights/i.test(heading)), "Brecksville blog remains hidden");
    assert(!after.links.some(href => /set_location=|\/services\/red-light|\/brecksville\/blog/.test(href ?? "")));
    assert.equal(afterHtml, beforeHtml, "Brecksville approved pilot remains byte-for-byte unchanged");
    const sections = after.main.childNodes.filter(node => node.tagName === "SECTION");
    const backgrounds = sections.map(node => ({
      heading: node.querySelector("h2")?.text.trim() ?? node.querySelector("h1")?.text.trim() ?? "Statistics",
      background: (node.getAttribute("class") ?? "").split(/\s+/)
        .find(name => /^zv-section-(light|elevated|gradient|recessed)$/.test(name)) ??
        (node.getAttribute("class") ?? "").split(/\s+/).find(name => name.startsWith("bg-")) ?? "unchanged custom background",
    }));
    console.log("Brecksville section order and original backgrounds:", JSON.stringify(backgrounds));
  }
  console.log("Compared all 19 rendered templates. All links compared at every location, exceeding the three-location sample.");
  console.log("New adjacent matching backgrounds, preserved as requested:", JSON.stringify(Object.fromEntries(newBackgroundPairs)));
});

test("the shared ordering helper adds no DOM and preserves every section", () => {
  const keys = ["details", "map", "services", "pathways", "blog", "pricing", "reviews", "booking"];
  const children = keys.map(key => React.createElement(React.Fragment, { key }, React.createElement("section", { id: key }, key)));
  const after = parse(renderToStaticMarkup(reorder({ children })));
  assert.deepEqual(after.querySelectorAll("section").map(node => node.id), [
    "services", "pricing", "reviews", "booking", "pathways", "details", "map", "blog",
  ]);
  assert.equal(after.childNodes.filter(node => node.nodeType === 1).length, 8);
});
