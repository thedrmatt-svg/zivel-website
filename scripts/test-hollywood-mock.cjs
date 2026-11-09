// Replit workspace Shell: node --test scripts/test-hollywood-mock.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

test("mock preserves the complete Hollywood main while omitting all structured data", async () => {
  const r = createLocationRenderer();
  const live = await r.render("src/app/[locale]/locations/[state]/[city]/page", {
    locale: "en", state: "florida", city: "hollywood",
  });
  const mock = await r.render("src/app/mock/HollywoodMockContent", {});
  assert(live.querySelectorAll('script[type="application/ld+json"]').length >= 3);
  assert.equal(mock.querySelectorAll('script[type="application/ld+json"],[itemscope],[itemprop],[typeof],[vocab]').length, 0);
  assert.equal(mock.querySelector("main").outerHTML, (() => {
    live.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
    return live.querySelector("main").outerHTML;
  })());
  assert(mock.querySelector("h1").text.includes("Zivel Hollywood"));
  assert(mock.querySelector("[data-location-hero-actions] a").getAttribute("href"));
  assert(mock.querySelectorAll("[data-location-faq] details").length >= 8);
});

test("mock header retains Hollywood booking and active navigation without changing other routes", () => {
  const r = createLocationRenderer();
  const { locations } = r.source("src/lib/data/locations");
  const { getLocationNav } = r.source("src/lib/data/locationNav");
  const { buildLocationBookingActions } = r.source("src/lib/location-booking");
  const props = {
    locationNav: getLocationNav({ featuredCount: 4 }),
    bookingActions: buildLocationBookingActions(locations),
  };
  for (const mobile of [false, true]) {
    const original = r.header("/locations/florida/hollywood", mobile, props);
    const mock = r.header("/mock", mobile, {
      ...props, pathnameOverride: "/locations/florida/hollywood",
    });
    assert.equal(mock.outerHTML, original.outerHTML);
  }
});

test("mock is isolated from indexed layouts and advertising installations", () => {
  const read = path => fs.readFileSync(path, "utf8");
  const layout = read("src/app/mock/layout.tsx");
  assert.match(layout, /index: false/);
  assert.match(layout, /follow: false/);
  assert(!/GoogleTagManager|MetaPixel|application\/ld\+json/.test(layout));
  assert.match(layout, /<Header/);
  assert.match(layout, /<Footer/);
  assert.match(layout, /<CookieConsent/);
  assert.match(layout, /basePath="\/mock"/);
  const middleware = read("src/middleware.ts");
  assert.match(middleware, /if \(isMock\) response\.headers\.set\("X-Robots-Tag", "noindex, nofollow"\)/);
  const sitemap = read("src/app/sitemap.ts");
  assert.match(sitemap, /mock\(\?:\\\/\|\$\)/);
  assert(!sitemap.includes('url: `${SITE_URL}/mock`'));
});
