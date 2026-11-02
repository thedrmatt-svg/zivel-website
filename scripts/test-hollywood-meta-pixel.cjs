const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

const filename = path.resolve("src/lib/hollywood-meta-pixel.ts");
const mod = new Module(filename, module);
mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { HOLLYWOOD_META_PIXEL_BOOTSTRAP, HOLLYWOOD_META_PIXEL_NOSCRIPT_HTML } = mod.exports;

function browser(pathname, consent, storageFails = false) {
  const scripts = [];
  const listeners = [];
  // Browser globals alias window, unlike a separate plain window VM object.
  const window = {
    location: { pathname },
    localStorage: { getItem: () => {
      if (storageFails) throw new Error("Storage disabled");
      return consent;
    } },
    addEventListener: (name, handler) => listeners.push([name, handler]),
    document: {
      getElementsByTagName: () => [{ parentNode: { insertBefore: s => scripts.push(s) } }],
      createElement: () => ({}),
    },
  };
  window.window = window;
  const context = vm.createContext(window);
  return {
    window, scripts, listeners,
    run: () => vm.runInContext(HOLLYWOOD_META_PIXEL_BOOTSTRAP, context),
    event: event => listeners.forEach(([name, handler]) => {
      if (name === event) handler();
    }),
    calls: () => Array.from(window.fbq?.queue || [], args => Array.from(args)),
  };
}

test("Hollywood pixel waits for consent, initializes once and sends one PageView", () => {
  for (const route of [
    "/locations/florida/hollywood", "/locations/florida/hollywood/pricing",
    "/locations/florida/hollywood/cryotherapy", "/locations/florida/hollywood/blog/example",
    "/es/locations/florida/hollywood/pathways", "/en/locations/florida/hollywood",
  ]) {
    for (const consent of [null, "declined", "accepted"]) {
      const b = browser(route, consent);
      b.run();
      assert.equal(b.scripts.length, consent === "accepted" ? 1 : 0);
      b.run();
      b.event("zivel:consent-accept");
      b.event("zivel:consent-accept");
      b.window.location.pathname += "/child";
      b.event("zivel:hollywood-meta-route-ready");
      b.run();
      assert.equal(b.scripts.length, 1, route);
      assert.equal(b.scripts[0].src, "https://connect.facebook.net/en_US/fbevents.js");
      assert.deepEqual(b.calls(), [["init", "1571435273956274"], ["track", "PageView"]]);
      assert.equal(b.listeners.filter(([name]) => name === "zivel:consent-accept").length, 1);
    }
  }
});

test("pixel never initializes outside the exact Hollywood family", () => {
  for (const route of [
    "/", "/ads/fanx", "/locations/florida/coral-gables", "/locations/utah/riverton",
    "/locations/georgia/buckhead", "/locations/florida/hollywood-other",
    "/locations/georgia/hollywood", "/es/locations/florida/coral-gables",
  ]) {
    const b = browser(route, "accepted");
    b.run();
    b.event("zivel:consent-accept");
    assert.equal(b.scripts.length, 0, route);
    assert.deepEqual(b.calls(), []);
  }
});

test("consent works without storage and after returning from another location", () => {
  const blocked = browser("/locations/florida/hollywood", null, true);
  blocked.run();
  assert.equal(blocked.scripts.length, 0);
  blocked.event("zivel:consent-accept");
  assert.equal(blocked.scripts.length, 1);

  const b = browser("/locations/florida/hollywood", null);
  b.run();
  b.window.location.pathname = "/locations/florida/coral-gables";
  b.window.localStorage.getItem = () => "accepted";
  b.event("zivel:consent-accept");
  assert.equal(b.scripts.length, 0);
  b.window.location.pathname = "/locations/florida/hollywood/pricing";
  b.event("zivel:hollywood-meta-route-ready");
  assert.deepEqual(b.calls(), [["init", "1571435273956274"], ["track", "PageView"]]);
});

test("base code reuses an existing Meta library, without initializing it twice", () => {
  const b = browser("/locations/florida/hollywood", "accepted");
  const calls = [];
  b.window.fbq = (...args) => calls.push(args);
  b.run();
  b.run();
  b.event("zivel:consent-accept");
  assert.equal(b.scripts.length, 0);
  assert.deepEqual(calls, [["init", "1571435273956274"], ["track", "PageView"]]);
});

test("layout retains GTM and mounts Meta only for Hollywood, with consent-gated fallback", () => {
  const layout = fs.readFileSync("src/app/[locale]/locations/[state]/[city]/layout.tsx", "utf8");
  const component = fs.readFileSync("src/components/consent/MetaPixelHollywood.tsx", "utf8");
  assert.match(layout, /state === "florida" && city === "hollywood" && <MetaPixelHollywood/);
  assert.match(layout, /state === "florida" && city === "hollywood" && <GoogleTagManagerHollywood/);
  assert.match(component, /useServerInsertedHTML/);
  assert.doesNotMatch(component, /usePathname|fbq\(/);
  assert.match(component, /fallback.innerHTML = HOLLYWOOD_META_PIXEL_NOSCRIPT_HTML/);
  assert.match(HOLLYWOOD_META_PIXEL_NOSCRIPT_HTML, /1571435273956274&ev=PageView&noscript=1/);
});
