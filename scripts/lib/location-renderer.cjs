const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { parse } = require("next/dist/compiled/node-html-parser");

function createLocationRenderer(root = path.resolve(__dirname, "../..")) {
  const cache = new Map();
  const state = { pathname: "/", mobile: false, headerState: 0 };
  const wrappers = {
    "next/image": ({ fill, priority, quality, fetchPriority, ...props }) => React.createElement("img", props),
    "next/link": ({ children, scroll, prefetch, replace, ...props }) => React.createElement("a", props, children),
    "next/script": ({ strategy, ...props }) => React.createElement("script", props),
    "next/navigation": {
      usePathname: () => state.pathname,
      notFound() { throw new Error("NEXT_NOT_FOUND"); },
    },
    "next-intl/server": { getTranslations: async () => key => key, setRequestLocale: () => {} },
    "server-only": {},
    "@/components/ui/ScrollReveal": ({ children }) => React.createElement(React.Fragment, null, children),
    "@/components/consent/GoogleAdsScript": () => null,
    "@/components/widgets/CherryWidget": () => null,
    "@/lib/actions/contactForm": { submitContactForm: async () => ({ status: "idle", message: "" }) },
    "@/lib/actions/pricingGate": { submitPricingGate: async () => ({ status: "idle", message: "" }) },
  };
  function load(base) {
    const filename = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`]
      .find(file => fs.existsSync(file) && fs.statSync(file).isFile());
    if (!filename) throw new Error(`Cannot resolve ${base}`);
    if (cache.has(filename)) return cache.get(filename).exports;
    if (filename.endsWith(".module.css")) return new Proxy({}, {
      get: (_, key) => key === "__esModule" ? false : String(key),
    });
    if (filename.endsWith(".json")) return JSON.parse(fs.readFileSync(filename, "utf8"));
    const mod = new Module(filename, module);
    mod.filename = filename;
    mod.paths = Module._nodeModulePaths(path.dirname(filename));
    const nativeRequire = Module.createRequire(path.join(root, "package.json"));
    mod.require = id => {
      if (Object.hasOwn(wrappers, id)) return wrappers[id];
      if (id === "react" && filename.endsWith("/layout/Header.tsx")) return {
        ...React,
        useState(initial) {
          const value = state.headerState++ === 0 ? state.mobile : typeof initial === "function" ? initial() : initial;
          return [value, () => {}];
        },
      };
      if (id.startsWith("@/")) return load(path.join(root, "src", id.slice(2)));
      if (id.startsWith(".")) return load(path.resolve(path.dirname(filename), id));
      return nativeRequire(id);
    };
    cache.set(filename, mod);
    mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, filename);
    return mod.exports;
  }
  const source = relative => load(path.join(root, relative));
  const render = async (relative, params) => parse(renderToStaticMarkup(
    await source(relative).default({ params: Promise.resolve({ locale: "en", ...params }) })
  ));
  function header(pathname, mobile = false, props = {}) {
    state.pathname = pathname; state.mobile = mobile; state.headerState = 0;
    return parse(renderToStaticMarkup(React.createElement(source("src/components/layout/Header").default, props)));
  }
  return { source, render, header, state, wrappers, React, parse };
}

module.exports = { createLocationRenderer };
