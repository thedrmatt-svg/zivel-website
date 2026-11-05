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
const mode = { originalOrder: false };
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
  "@/components/location/BrecksvilleSectionOrder": props =>
    mode.originalOrder ? passthrough(props) : reorder(props),
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

reorder = loadLocal(path.join(root, "src/components/location/BrecksvilleSectionOrder")).default;
const { locations } = loadLocal(path.join(root, "src/lib/data/locations"));
const Page = loadLocal(path.join(root, "src/app/[locale]/locations/[state]/[city]/page")).default;

async function render(location, originalOrder) {
  mode.originalOrder = originalOrder;
  return renderToStaticMarkup(await Page({
    params: Promise.resolve({ state: location.stateSlug, city: location.citySlug, locale: "en" }),
  }));
}

function signature(html) {
  const document = parse(html);
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

test("all 19 location templates keep identical content, headings, links, schema and backgrounds; only Brecksville reorders", async () => {
  assert.equal(locations.length, 19);
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
    if (label !== "ohio/brecksville") {
      assert.equal(afterHtml, beforeHtml, `${label}: all rendered markup and order unchanged`);
      continue;
    }
    const expected = [
      "Services Available", "Pricing", "What Clients Are Saying", "Pathways",
      "Location Details", "Find Us", "Questions or Request? Reach Out!",
    ];
    const actual = after.main.querySelectorAll("h2").map(node => node.text.trim());
    assert.deepEqual(actual.filter(heading => expected.includes(heading)), expected);
    assert(!actual.includes("Book Your Session"), "Brecksville booking remains hidden");
    assert(!actual.some(heading => /Wellness Insights/i.test(heading)), "Brecksville blog remains hidden");
    assert(!after.links.some(href => /set_location=|\/services\/red-light|\/brecksville\/blog/.test(href ?? "")));
    assert.notEqual(afterHtml, beforeHtml);
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
});

test("the Brecksville ordering helper adds no DOM and leaves disabled children in their original order", () => {
  const keys = ["details", "map", "services", "pathways", "blog", "pricing", "reviews", "booking"];
  const children = keys.map(key => React.createElement(React.Fragment, { key }, React.createElement("section", { id: key }, key)));
  const before = renderToStaticMarkup(React.createElement(React.Fragment, null, children));
  assert.equal(renderToStaticMarkup(reorder({ enabled: false, children })), before);
  const after = parse(renderToStaticMarkup(reorder({ enabled: true, children })));
  assert.deepEqual(after.querySelectorAll("section").map(node => node.id), [
    "services", "pricing", "reviews", "booking", "pathways", "details", "map", "blog",
  ]);
  assert.equal(after.childNodes.filter(node => node.nodeType === 1).length, 8);
});
