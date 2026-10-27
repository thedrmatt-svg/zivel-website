const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

const filename = path.resolve("src/components/consent/CampaignGoogleTagManager.tsx");
const mod = new Module(filename, module);
mod.filename = filename;
mod.paths = Module._nodeModulePaths(path.dirname(filename));
mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText, filename);
const { CampaignGoogleTagManagerHead, CampaignGoogleTagManagerNoScript } = mod.exports;

function browser(consent, existingScript = false, storageFails = false) {
  const scripts = [];
  const listeners = [];
  const context = vm.createContext({
    window: { addEventListener: (name, handler) => listeners.push([name, handler]) },
    document: {
      querySelector: () => existingScript || scripts.length ? {} : null,
      getElementsByTagName: () => [{ parentNode: { insertBefore: (script) => scripts.push(script) } }],
      createElement: () => ({}),
    },
    localStorage: { getItem: () => {
      if (storageFails) throw new Error("Storage unavailable");
      return consent;
    } },
  });
  const execute = (consentRequired) => vm.runInContext(
    CampaignGoogleTagManagerHead({ consentRequired }).props.children[0].props.dangerouslySetInnerHTML.__html,
    context,
  );
  const accept = () => listeners.forEach(([name, handler]) => {
    if (name === "zivel:consent-accept") handler();
  });
  return { context, scripts, execute, accept };
}

test("campaign consent blocks tracking until accepted, including declined and inaccessible storage", () => {
  for (const consent of [null, "declined", "accepted"]) {
    const b = browser(consent);
    b.execute(true);
    assert.equal(b.scripts.length, consent === "accepted" ? 1 : 0);
    b.accept();
    b.accept();
    b.execute(true);
    assert.equal(b.scripts.length, 1);
    assert.equal(b.context.window.dataLayer.length, 1);
    assert.equal(b.scripts[0].src, "https://www.googletagmanager.com/gtm.js?id=GTM-5XRKPB32");
  }
  const b = browser(null, false, true);
  b.execute(true);
  assert.equal(b.scripts.length, 0);
  b.accept();
  assert.equal(b.scripts.length, 1);
});

test("immediate installation runs once and skips a pre-existing Riverton container", () => {
  const b = browser(null);
  b.execute(false);
  b.execute(false);
  assert.equal(b.scripts.length, 1);
  const existing = browser("accepted", true);
  existing.execute(false);
  existing.execute(true);
  existing.accept();
  assert.equal(existing.scripts.length, 0);
});

test("noscript points to the right container and is hidden", () => {
  const iframe = CampaignGoogleTagManagerNoScript().props.children;
  assert.equal(iframe.props.src, "https://www.googletagmanager.com/ns.html?id=GTM-5XRKPB32");
  assert.deepEqual(iframe.props.style, { display: "none", visibility: "hidden" });
});

test("Riverton remains consent-gated and protected against an existing campaign load", () => {
  const source = fs.readFileSync("src/components/consent/GoogleTagManagerRiverton.tsx", "utf8");
  assert.match(source, /localStorage.getItem\(STORAGE_KEY\) === "accepted"/);
  assert.match(source, /if \(!load\) return null/);
  const inline = source.match(/strategy="afterInteractive">\{`([\s\S]*?)`\}/)[1]
    .replaceAll("${GTM_ID}", "GTM-5XRKPB32");
  const b = browser("accepted");
  vm.runInContext(inline, b.context);
  vm.runInContext(inline, b.context);
  assert.equal(b.scripts.length, 1);
  const existing = browser("accepted", true);
  vm.runInContext(inline, existing.context);
  assert.equal(existing.scripts.length, 0);
});
