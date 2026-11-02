const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function load(file, dependencies = {}) {
  const filename = path.resolve(file);
  const mod = new Module(filename, module);
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = Module.createRequire(filename);
  mod.require = id => dependencies[id] || nativeRequire(id);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText, filename);
  return mod.exports;
}

const contacts = load("src/lib/contact-links.ts");
const ContactText = load("src/components/ui/ContactText.tsx", {
  "@/lib/contact-links": contacts,
}).default;

test("phone destinations include a country code and contain no display formatting", () => {
  for (const phone of ["(754) 217-8177", "754-217-8177", "754.217.8177", "+1 (754) 217-8177", "1 754 217 8177"]) {
    assert.equal(contacts.phoneHref(phone), "tel:+17542178177");
  }
  assert.equal(contacts.phoneHref("+44 20 7946 0958"), "tel:+442079460958");
  assert.throws(() => contacts.phoneHref("123"), /complete phone number/);
});

test("every studio's displayed contact details retain their exact text", () => {
  for (const file of fs.readdirSync("src/content/locations").filter(f => f.endsWith(".ts"))) {
    const source = fs.readFileSync(path.join("src/content/locations", file), "utf8");
    for (const match of source.matchAll(/(?:phone|email):\s*"([^"]+)"/g)) {
      const value = match[1];
      const html = renderToStaticMarkup(React.createElement(ContactText, null, value));
      const href = value.includes("@") ? `mailto:${value}` : contacts.phoneHref(value);
      assert.ok(html.includes(`href="${href}"`), `${file}: ${value}`);
      assert.equal(html.replace(/<[^>]*>/g, ""), value);
    }
  }
});

test("embedded contacts in messages are linked without changing surrounding text", () => {
  const text = "Call (385) 443-8778, +1 754-217-8177 or email matto@zivel.com. Thanks!";
  const html = renderToStaticMarkup(React.createElement(ContactText, null, text));
  assert.equal(html.replace(/<[^>]*>/g, ""), text);
  assert.match(html, /href="tel:\+13854438778"/);
  assert.match(html, /href="tel:\+17542178177"/);
  assert.match(html, /href="mailto:matto@zivel.com"/);
  assert.equal((html.match(/<a /g) || []).length, 3);
});

test("plain text, partial numbers and URL paths are not converted", () => {
  for (const text of [
    "Thank you! We'll reach out soon.", "Prices: $1,600; ZIP 80129.",
    "https://example.com/7542178177/article", "Order 1237542178177000",
  ]) {
    assert.equal(renderToStaticMarkup(React.createElement(ContactText, null, text)).includes("<a "), false);
  }
});
