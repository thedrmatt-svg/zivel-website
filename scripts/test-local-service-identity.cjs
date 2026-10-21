const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

// Compile the actual page and data in memory, without touching Next's dev cache.
// Replace only framework/browser wrappers; keep real content and page logic.
const root = path.resolve(__dirname, "..");
const cache = new Map();
const passthrough = ({ children }) => React.createElement(React.Fragment, null, children);
const wrappers = {
  "next/image": ({ fill, priority, fetchPriority, quality, ...props }) =>
    React.createElement("img", props),
  "next/link": ({ children, scroll, prefetch, replace, ...props }) =>
    React.createElement("a", props, children),
  "next/script": (props) => React.createElement("script", props),
  "next/navigation": {
    notFound() {
      throw new Error("NEXT_NOT_FOUND");
    },
  },
  "@/components/ui/ScrollReveal": passthrough,
};

function loadLocal(base) {
  const filename = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`]
    .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  assert.ok(filename, `Cannot resolve ${base}`);
  if (cache.has(filename)) return cache.get(filename).exports;
  if (filename.endsWith(".json")) return require(filename);

  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: filename,
  }).outputText;
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = Module.createRequire(filename);
  mod.require = (id) => {
    if (Object.hasOwn(wrappers, id)) return wrappers[id];
    if (id.startsWith("@/")) return loadLocal(path.join(root, "src", id.slice(2)));
    if (id.startsWith(".")) return loadLocal(path.resolve(path.dirname(filename), id));
    return nativeRequire(id);
  };
  cache.set(filename, mod);
  mod._compile(compiled, filename);
  return mod.exports;
}

const { LOCAL_SERVICE_COMBOS } = loadLocal(path.join(root, "src/lib/data/local-service-pages"));
const { getLocationByPath } = loadLocal(path.join(root, "src/lib/data/locations"));
const { getServiceBySlug } = loadLocal(path.join(root, "src/lib/data/services"));
const { isBrecksvilleLocationPath } = loadLocal(path.join(root, "src/lib/location-availability"));
const { default: Page, generateMetadata } = loadLocal(
  path.join(root, "src/app/[locale]/locations/[state]/[city]/[service]/page")
);

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;",
  })[character]);
}

test("every registered location-service page retains its own studio identity", async (t) => {
  assert.ok(LOCAL_SERVICE_COMBOS.length > 0);
  const locations = new Set();
  const services = new Set();
  const locales = new Set();

  for (const combo of LOCAL_SERVICE_COMBOS) {
    const label = `${combo.locale}/${combo.state}/${combo.city}/${combo.service}`;
    const location = getLocationByPath(combo.state, combo.city);
    const service = getServiceBySlug(combo.service);
    assert.ok(location && service, `${label}: missing data`);
    const params = Promise.resolve(combo);
    const html = renderToStaticMarkup(await Page({ params }));
    assert.ok(
      html.includes(`At ${escapeHtml(location.name)}</p>`),
      `${label}: local-studio heading must name the current location`
    );
    // The page is rendered without the global navigation, which legitimately
    // links to other studios. No Riverton copy should leak into another body.
    if (combo.city !== "riverton") {
      assert.doesNotMatch(html, /riverton/i, `${label}: Riverton content leaked into this page`);
    }

    const schemas = [...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    )].map((match) => JSON.parse(match[1]));
    const business = schemas.find((schema) => [].concat(schema["@type"]).includes("LocalBusiness"));
    assert.ok(business, `${label}: missing business schema`);
    assert.equal(business.name, location.name, label);
    assert.equal(business.address.addressRegion, location.state, label);
    assert.equal(business.telephone, location.contact?.phone, label);
    const locationUrl = `https://www.zivel.com/locations/${combo.state}/${combo.city}`;
    assert.equal(business.url, locationUrl, label);
    const breadcrumb = schemas.find((schema) => schema["@type"] === "BreadcrumbList");
    assert.equal(breadcrumb.itemListElement[3].item, locationUrl, label);
    if (combo.state === "ohio" && combo.city === "brecksville") {
      assert.doesNotMatch(html, /<a\b[^>]*href="[^"]*(?:book-appointment|#book)/i,
        `${label}: disabled studio must not render booking links`);
    } else {
      assert.ok(
        html.includes(`set_location=${location.booking?.locationId ?? 11417}`),
        `${label}: incorrect page-specific booking destination`
      );
    }

    const metadata = await generateMetadata({ params });
    const serviceUrl = `${locationUrl}/${combo.service}`;
    assert.equal(
      metadata.alternates.canonical,
      combo.locale === "es" ? serviceUrl.replace("/locations/", "/es/locations/") : serviceUrl,
      label
    );
    assert.equal(metadata.alternates.languages.en, serviceUrl, label);
    assert.equal(
      metadata.alternates.languages.es,
      serviceUrl.replace("/locations/", "/es/locations/"),
      label
    );
    assert.ok(metadata.title.includes(location.name), `${label}: title has wrong studio`);
    assert.ok(metadata.description.includes(location.name), `${label}: description has wrong studio`);
    locations.add(`${combo.state}/${combo.city}`);
    services.add(combo.service);
    locales.add(combo.locale);
  }
  t.diagnostic(
    `Verified ${LOCAL_SERVICE_COMBOS.length} pages across ${locations.size} locations, ` +
    `${services.size} services, and ${locales.size} locales.`
  );
});

test("Brecksville restrictions match every nested locale route, not other studios", () => {
  for (const prefix of ["", "/en", "/es"]) {
    for (const suffix of ["", "/", "/pricing", "/pathways", "/cryotherapy", "/blog/article"]) {
      assert.equal(
        isBrecksvilleLocationPath(`${prefix}/locations/ohio/brecksville${suffix}`),
        true
      );
    }
  }
  for (const pathname of ["/", "/locations/ohio", "/locations/ohio/brecksville-other",
    "/locations/florida/coral-gables", "/es/locations/utah/riverton/pricing"]) {
    assert.equal(isBrecksvilleLocationPath(pathname), false);
  }
});

test("Windermere packages have the correct grouping, prices, and purchase links", () => {
  const pricing = getLocationByPath("georgia", "windermere").pricing;
  const packages = pricing.specialDealsBottom.slice(pricing.specialDealsBottomPremiumStart);
  const expected = [
    ["5 Cryo Facials", "$700", "627875"],
    ["5 Cryo Slimmings/Tonings", "$1,600", "627871"],
    ["10 Cryo Slimmings/Tonings", "$3,150", "627872"],
  ];
  assert.equal(packages.length, expected.length);
  for (const [index, [name, price, purchaseId]] of expected.entries()) {
    const item = packages[index];
    assert.equal(item.name, name);
    assert.equal(item.price, price);
    assert.equal(item.bookingUrl, `https://app.clubready.com/JoinUs/14944/${purchaseId}`);
    assert.ok(item.description?.length > 0);
    if (name.includes("Slimmings")) {
      assert.equal(item.regularPrice, undefined);
      assert.equal(item.savings, undefined);
    }
  }
});

test("Brecksville red light and blog pages are unavailable and absent from the sitemap", async () => {
  const brecksville = getLocationByPath("ohio", "brecksville");
  assert.ok(brecksville);
  assert.ok(!brecksville.services.some((service) => service.slug === "red-light-therapy"));
  assert.equal(brecksville.localBlog, undefined);
  assert.doesNotMatch(brecksville.seo.description, /red light/i);
  const { default: GoogleReviews } = loadLocal(path.join(root, "src/components/location/GoogleReviews"));
  const reviews = renderToStaticMarkup(React.createElement(GoogleReviews, {
    placeId: brecksville.google?.placeId,
    locationName: brecksville.name,
    excludeText: /red[\s-]*light/i,
  }));
  assert.doesNotMatch(reviews, /red[\s-]*light/i);
  assert.ok(!LOCAL_SERVICE_COMBOS.some((combo) =>
    combo.state === "ohio" && combo.city === "brecksville" && combo.service === "red-light-therapy"
  ));

  const blogIndex = loadLocal(path.join(root, "src/app/[locale]/locations/[state]/[city]/blog/page"));
  const blogPost = loadLocal(path.join(root, "src/app/[locale]/locations/[state]/[city]/blog/[slug]/page"));
  for (const locale of ["en", "es"]) {
    const serviceParams = Promise.resolve({
      locale, state: "ohio", city: "brecksville", service: "red-light-therapy",
    });
    await assert.rejects(Page({ params: serviceParams }), /NEXT_NOT_FOUND/);
    await assert.rejects(generateMetadata({ params: serviceParams }), /NEXT_NOT_FOUND/);
    const blogParams = Promise.resolve({ locale, state: "ohio", city: "brecksville" });
    await assert.rejects(blogIndex.default({ params: blogParams }), /NEXT_NOT_FOUND/);
    await assert.rejects(blogIndex.generateMetadata({ params: blogParams }), /NEXT_NOT_FOUND/);
    await assert.rejects(blogPost.default({
      params: Promise.resolve({
        locale, state: "ohio", city: "brecksville", slug: "brecksville-cryotherapy-vs-cold-plunge",
      }),
    }), /NEXT_NOT_FOUND/);
  }
  const paths = await blogIndex.generateStaticParams();
  assert.ok(!paths.some((entry) => entry.city === "brecksville"));
  const { default: sitemap } = loadLocal(path.join(root, "src/app/sitemap"));
  const urls = (await sitemap()).map((entry) => entry.url);
  assert.ok(!urls.some((url) => /\/locations\/ohio\/brecksville\/(?:red-light-therapy|blog)(?:\/|$)/.test(url)));
  assert.ok(urls.includes("https://www.zivel.com/locations/florida/coral-gables/red-light-therapy"));
  assert.ok(urls.includes("https://www.zivel.com/locations/florida/coral-gables/blog"));
});
