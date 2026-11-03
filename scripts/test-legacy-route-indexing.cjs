const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const { NextRequest, NextResponse } = require("next/server");

const filename = path.resolve("src/middleware.ts");
const mod = new Module(filename, module);
mod.paths = Module._nodeModulePaths(path.dirname(filename));
const nativeRequire = Module.createRequire(filename);
mod.require = (id) => {
  if (id === "next-intl/middleware") {
    return () => () => {
      const response = NextResponse.next();
      response.headers.set("x-test-intl", "handled");
      return response;
    };
  }
  if (id === "./i18n/routing") return { routing: {} };
  return nativeRequire(id);
};
mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
}).outputText, filename);
const middleware = mod.exports.default;

test("unused route queries are noindex on main, location, content and campaign pages", () => {
  for (const pathname of ["/", "/locations", "/locations/utah/riverton", "/services/cryotherapy", "/ads/riverton", "/riverton-google-thank-you"]) {
    for (const query of [
      "?route=common/users/viewprofile",
      "?route=common%2Fusers%2Fviewprofile&id=123",
      "?route=common/users/login",
      "?route=&route=common/users/viewprofile",
    ]) {
      const response = middleware(new NextRequest(`https://www.zivel.com${pathname}${query}`));
      assert.equal(response.headers.get("x-robots-tag"), "noindex", pathname + query);
      assert.equal(response.headers.get("x-test-intl"), pathname.startsWith("/ads") || pathname.startsWith("/riverton-google") ? null : "handled");
    }
  }
});

test("normal pages and ordinary query parameters stay indexable", () => {
  for (const pathname of ["/", "/locations", "/locations/florida/hollywood", "/ads/riverton"]) {
    for (const query of ["", "?q=Riverton", "?utm_source=google", "?route=", "?route=%20"]) {
      const response = middleware(new NextRequest(`https://www.zivel.com${pathname}${query}`));
      assert.equal(response.headers.get("x-robots-tag"), null, pathname + query);
    }
  }
});
