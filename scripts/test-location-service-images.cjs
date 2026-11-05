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
const excluded = new Set(["brecksville", "palm-coast", "belmont"]);
const wrappers = {
  "next/image": ({ fill, priority, quality, fetchPriority, ...props }) => React.createElement("img", props),
  "next/link": ({ children, scroll, prefetch, replace, ...props }) => React.createElement("a", props, children),
  "next/navigation": { notFound() { throw new Error("NEXT_NOT_FOUND"); } },
  "@/components/ui/ScrollReveal": ({ children }) => React.createElement(React.Fragment, null, children),
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

const { getLocationServiceImage, getNationalServiceImage } =
  loadLocal(path.join(root, "src/lib/data/location-service-images"));
const { locations } = loadLocal(path.join(root, "src/lib/data/locations"));
const Card = loadLocal(path.join(root, "src/components/location/ServiceImageCard")).default;

function assertLocalAsset(src, label) {
  if (!src.startsWith("/") || src.startsWith("//")) return;
  const filename = path.join(root, "public", decodeURIComponent(src.split("?")[0]));
  assert(fs.existsSync(filename), `${label}: missing image ${src}`);
  assert(fs.statSync(filename).size > 0, `${label}: empty image ${src}`);
}

test("all service cards outside the three excluded studios start with an existing photo", () => {
  assert.equal(locations.length, 19);
  let checked = 0, preserved = 0;
  for (const location of locations) {
    for (const service of location.services) {
      const props = {
        ...service, citySlug: location.citySlug, cityName: location.city,
        variant: "light", localHref: `/locations/${location.stateSlug}/${location.citySlug}/${service.slug}`,
      };
      const card = parse(renderToStaticMarkup(React.createElement(Card, props)));
      const image = card.querySelector("img");
      const src = image.getAttribute("src");
      assert.equal(src, getLocationServiceImage(location.citySlug, service.slug));
      assert.equal(image.getAttribute("alt"), service.imageAlt ?? `Zivel ${service.name} at ${location.city} Location`);
      assert.equal(card.querySelector("a").getAttribute("href"), props.localHref);
      if (excluded.has(location.citySlug)) {
        assert.equal(src, `/locations/${location.citySlug}/services/${service.slug}.jpg`);
        preserved++;
      } else {
        assertLocalAsset(src, `${location.citySlug}/${service.slug}`);
        checked++;
      }
      assertLocalAsset(getNationalServiceImage(service.slug), service.slug);
    }
  }
  console.log(`Verified ${checked} service cards across 16 eligible studios; ${preserved} cards in the three excluded studios keep their original image lookup.`);
});

test("all existing custom service photos stay in use and new uploads require registration", () => {
  const directory = path.join(root, "public/locations");
  let customPhotos = 0;
  for (const city of fs.readdirSync(directory)) {
    const services = path.join(directory, city, "services");
    if (!fs.existsSync(services)) continue;
    for (const filename of fs.readdirSync(services).filter(name => name.endsWith(".jpg"))) {
      const slug = filename.slice(0, -4);
      const src = `/locations/${city}/services/${filename}`;
      assert.equal(getLocationServiceImage(city, slug), src, `${city}: custom photo must be registered`);
      assertLocalAsset(src, city);
      customPhotos++;
    }
  }
  assert(customPhotos >= 3, "Highlands Ranch custom photos remain available");
});

test("unknown service slugs use the existing general fallback photo outside excluded studios", () => {
  const src = getLocationServiceImage("hollywood", "unrecognized-service");
  assert.equal(src, "/images/home/service-exercise.jpg");
  assertLocalAsset(src, "general fallback");
});

test("individual local service pages outside excluded studios reference existing images", async () => {
  const { LOCAL_SERVICE_COMBOS } = loadLocal(path.join(root, "src/lib/data/local-service-pages"));
  const Page = loadLocal(path.join(root, "src/app/[locale]/locations/[state]/[city]/[service]/page")).default;
  let pages = 0;
  for (const combo of LOCAL_SERVICE_COMBOS) {
    if (excluded.has(combo.city)) continue;
    const html = renderToStaticMarkup(await Page({ params: Promise.resolve(combo) }));
    const images = parse(html).querySelectorAll("img");
    for (const image of images) {
      assertLocalAsset(image.getAttribute("src"), `${combo.state}/${combo.city}/${combo.service}`);
    }
    pages++;
  }
  console.log(`Audited images on ${pages} eligible individual local service pages.`);
});
