// Replit workspace Shell: node --test scripts/test-hollywood-mock.cjs
const assert = require("node:assert/strict");
const { test } = require("node:test");
const fs = require("node:fs");
const { createLocationRenderer } = require("./lib/location-renderer.cjs");

test("holiday mock replaces only the hero, preserving the rest of Hollywood and omitting schema", async () => {
  const r = createLocationRenderer();
  r.wrappers["./HollywoodHolidayHero.module.css"] = new Proxy({}, {
    get: (_, key) => key === "__esModule" ? false : String(key),
  });
  const live = await r.render("src/app/[locale]/locations/[state]/[city]/page", {
    locale: "en", state: "florida", city: "hollywood",
  });
  const mock = await r.render("src/app/mock/HollywoodMockContent", {});
  assert(live.querySelectorAll('script[type="application/ld+json"]').length >= 3);
  assert.equal(mock.querySelectorAll('script[type="application/ld+json"],[itemscope],[itemprop],[typeof],[vocab]').length, 0);
  const hero = mock.querySelector('[aria-labelledby="location-hero-title"]');
  assert.equal(hero.querySelector("h1").text, "Holiday Offers");
  assert.equal(hero.querySelectorAll("article").length, 3);
  assert.deepEqual(hero.querySelectorAll("article h2").map(n => n.text), [
    "BOGO FACIALS", "6 or 8 RECOVERY SESSIONS", "STOCKING STUFFERS",
  ]);
  for (const amount of ["$150", "$99", "$10", "Members only", "2/28/27"]) assert(hero.text.includes(amount));
  assert.equal(hero.querySelectorAll("a").length, 3);
  for (const link of hero.querySelectorAll("a")) {
    assert.equal(link.getAttribute("href"), "/locations/florida/hollywood/pricing");
  }
  const info = mock.querySelector('[aria-labelledby="location-site-info-title"]');
  assert(info, "Hollywood's original studio information follows the holiday hero");
  assert.equal(mock.querySelectorAll("h1").length, 1);
  const liveHero = live.querySelector('[aria-labelledby="location-hero-title"]');
  assert.equal(info.querySelector("h2").text, liveHero.querySelector("h1").text);
  assert.deepEqual(
    info.querySelectorAll("a").map(link => [link.text, link.getAttribute("href")]),
    liveHero.querySelectorAll("a").map(link => [link.text, link.getAttribute("href")]),
  );
  assert(info.querySelector('a[href="https://zivel.myperformanceiq.com/book-appointment?set_location=11433"]'));
  assert(info.querySelector('a[href="tel:+17542178177"]'));
  assert(info.querySelector("[data-location-hero-actions]"));
  assert(!info.classNames.includes("bg-black"));
  info.remove();
  const trustBar = mock.querySelector("section.trustBar");
  const liveTrustBar = live.querySelectorAll("section").find(section =>
    section.getAttribute("class") === "zv-bleed bg-[#0a0a0a] border-y border-white/10"
  );
  assert(trustBar, "The trust bar uses the mock holiday navy background");
  assert.equal(trustBar.innerHTML, liveTrustBar.innerHTML);
  trustBar.remove();
  liveTrustBar.remove();
  hero.remove();
  live.querySelector('[aria-labelledby="location-hero-title"]').remove();
  assert.equal(mock.querySelector("main").outerHTML, (() => {
    live.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
    return live.querySelector("main").outerHTML;
  })());
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
