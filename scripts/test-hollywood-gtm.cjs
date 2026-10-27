const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

const filename = path.resolve("src/lib/hollywood-gtm.ts");
const mod = new Module(filename, module);
mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText, filename);
const { HOLLYWOOD_GTM_BOOTSTRAP, HOLLYWOOD_GTM_NOSCRIPT_HTML } = mod.exports;

function browser(pathname, consent, existing = false, storageFails = false) {
  const scripts = [];
  const listeners = [];
  const window = {
    location: { pathname },
    localStorage: { getItem: () => {
      if (storageFails) throw new Error("Storage disabled");
      return consent;
    } },
    addEventListener: (name, handler) => listeners.push([name, handler]),
  };
  const context = vm.createContext({
    window,
    document: {
      querySelector: () => existing || scripts.length ? {} : null,
      getElementsByTagName: () => [{ parentNode: { insertBefore: s => scripts.push(s) } }],
      createElement: () => ({}),
    },
  });
  return {
    window, scripts, listeners,
    run: () => vm.runInContext(HOLLYWOOD_GTM_BOOTSTRAP, context),
    accept: () => listeners.forEach(([name, handler]) => {
      if (name === "zivel:consent-accept") handler();
    }),
    ready: () => listeners.forEach(([name, handler]) => {
      if (name === "zivel:hollywood-route-ready") handler();
    }),
  };
}

test("Hollywood and every child route wait for consent and initialize once", () => {
  for (const route of [
    "/locations/florida/hollywood",
    "/locations/florida/hollywood/pricing",
    "/locations/florida/hollywood/cryotherapy",
    "/locations/florida/hollywood/blog/example",
    "/es/locations/florida/hollywood/pathways",
    "/en/locations/florida/hollywood",
  ]) {
    for (const consent of [null, "declined", "accepted"]) {
      const b = browser(route, consent);
      b.run();
      assert.equal(b.scripts.length, consent === "accepted" ? 1 : 0, route);
      b.run();
      b.accept();
      b.accept();
      assert.equal(b.scripts.length, 1, route);
      assert.equal(b.window.dataLayer.length, 1);
      assert.equal(b.listeners.filter(([name]) => name === "zivel:consent-accept").length, 1);
      assert.equal(b.scripts[0].src, "https://www.googletagmanager.com/gtm.js?id=GTM-NR6P7MB7");
      b.window.location.pathname += "/another-child";
      b.run();
      b.accept();
      assert.equal(b.scripts.length, 1, "client navigation must not reinitialize");
    }
  }
});

test("no initialization outside the exact Hollywood route family", () => {
  for (const route of [
    "/", "/ads/fanx", "/locations/florida/coral-gables",
    "/locations/utah/riverton", "/locations/georgia/buckhead",
    "/locations/florida/hollywood-other", "/locations/georgia/hollywood",
    "/es/locations/florida/coral-gables",
  ]) {
    const b = browser(route, "accepted");
    b.run();
    b.accept();
    assert.equal(b.scripts.length, 0, route);
    assert.equal(b.window.dataLayer, undefined, route);
  }
});

test("existing container and inaccessible storage do not cause duplicate or unconsented loads", () => {
  const existing = browser("/locations/florida/hollywood", "accepted", true);
  existing.run();
  existing.accept();
  assert.equal(existing.scripts.length, 0);
  const b = browser("/locations/florida/hollywood", null, false, true);
  b.run();
  assert.equal(b.scripts.length, 0);
  b.accept();
  assert.equal(b.scripts.length, 1);
});

test("returning after consent elsewhere activates only when Hollywood mounts again", () => {
  const b = browser("/locations/florida/hollywood", null);
  b.run();
  b.window.location.pathname = "/locations/florida/coral-gables";
  b.window.localStorage.getItem = () => "accepted";
  b.accept();
  assert.equal(b.scripts.length, 0);
  b.window.location.pathname = "/locations/florida/hollywood/pricing";
  b.ready();
  b.ready();
  assert.equal(b.scripts.length, 1);
  assert.equal(b.window.dataLayer.length, 1);
});

test("layout is scoped by state and city; there is no separate GA4 installation", () => {
  const layout = fs.readFileSync("src/app/[locale]/locations/[state]/[city]/layout.tsx", "utf8");
  assert.match(layout, /state === "florida" && city === "hollywood" && <GoogleTagManagerHollywood/);
  assert.match(HOLLYWOOD_GTM_NOSCRIPT_HTML, /ns.html\?id=GTM-NR6P7MB7/);
  assert.doesNotMatch(HOLLYWOOD_GTM_BOOTSTRAP, /gtag\/js|G-KNR4371DZ1/);
});
