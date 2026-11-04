const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { NextRequest } = require("next/server");

const root = path.resolve(__dirname, "..");
const cache = new Map();
const records = new Map();
let user = null;
let model;
const wrappers = {
  "@clerk/nextjs/server": { currentUser: async () => user },
  "next/link": ({ children, ...props }) => React.createElement("a", props, children),
  "next/navigation": { notFound() { throw new Error("NEXT_NOT_FOUND"); } },
  "@/components/ui/ScrollReveal": ({ children }) => React.createElement(React.Fragment, null, children),
  "@/lib/local-blog-store": {
    listLocalVersions: async () => [...records.values()],
    getLocalVersion: async (id) => records.get(id),
    insertLocalVersion: async (record) => { records.set(record.id, record); },
    updateLocalVersion: async (record) => { records.set(record.id, record); },
    getPublishedEditorPosts: async () => [...records.values()].filter((version) => model.isLocalVersionPublished(version)).map(model.localVersionToPost),
  },
};
function load(base) {
  const file = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`].find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
  assert(file, base);
  if (file.endsWith(".json")) return require(file);
  if (cache.has(file)) return cache.get(file).exports;
  const mod = new Module(file, module);
  mod.paths = Module._nodeModulePaths(path.dirname(file));
  const nativeRequire = Module.createRequire(file);
  mod.require = (id) => Object.hasOwn(wrappers, id) ? wrappers[id] :
    id.startsWith("@/") ? load(path.join(root, "src", id.slice(2))) :
    id.startsWith(".") ? load(path.resolve(path.dirname(file), id)) : nativeRequire(id);
  cache.set(file, mod);
  mod._compile(ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: file,
  }).outputText, file);
  return mod.exports;
}
model = load(path.join(root, "src/lib/local-blog-model"));
const api = load(path.join(root, "src/app/api/blog-editor/route"));
const updateApi = load(path.join(root, "src/app/api/blog-editor/[id]/route"));
const page = load(path.join(root, "src/app/[locale]/locations/[state]/[city]/blog/[slug]/page"));
const sitemap = load(path.join(root, "src/app/sitemap"));
const editorAuth = load(path.join(root, "src/lib/blog-editor-auth"));
const fakeUser = (email, verified = true) => ({ emailAddresses: [{ emailAddress: email, verification: { status: verified ? "verified" : "unverified" } }] });
const request = (method, url, body, origin = "https://www.zivel.com") => new NextRequest(`https://www.zivel.com${url}`, {
  method, headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body),
});

test("editor authorization requires an approved, verified email; empty allowlist fails closed", async () => {
  const saved = process.env.BLOG_EDITOR_EMAILS;
  try {
    process.env.BLOG_EDITOR_EMAILS = "owner@example.com";
    user = null;
    assert.equal(await editorAuth.isBlogEditor(), false);
    user = fakeUser("stranger@example.com");
    assert.equal(await editorAuth.isBlogEditor(), false);
    user = fakeUser("owner@example.com", false);
    assert.equal(await editorAuth.isBlogEditor(), false);
    user = fakeUser("OWNER@example.com");
    assert.equal(await editorAuth.isBlogEditor(), true);
    process.env.BLOG_EDITOR_EMAILS = "";
    assert.equal(await editorAuth.isBlogEditor(), false);
  } finally {
    if (saved === undefined) delete process.env.BLOG_EDITOR_EMAILS;
    else process.env.BLOG_EDITOR_EMAILS = saved;
    user = null;
  }
});

test("editor API and public routes enforce authorization, scheduling, draft visibility and canonical rules", async () => {
  const saved = process.env.BLOG_EDITOR_EMAILS;
  const originalClock = Date.now;
  try {
    process.env.BLOG_EDITOR_EMAILS = "owner@example.com";
    assert.equal((await api.GET()).status, 403);
    const input = { parentPostId: "new-year-new-norm-start-now", locationId: "georgia/windermere" };
    assert.equal((await api.POST(request("POST", "/api/blog-editor", input))).status, 403);
    assert.equal(records.size, 0);
    user = fakeUser("owner@example.com");
    assert.equal((await api.POST(request("POST", "/api/blog-editor", input, "https://evil.example"))).status, 403);
    assert.equal((await api.GET()).status, 200);
    assert.equal(records.size, 0, "Opening the editor never creates a version");
    const created = await api.POST(request("POST", "/api/blog-editor", input));
    assert.equal(created.status, 201);
    let draft = (await created.json()).version;
    assert.equal(draft.status, "draft");
    const params = Promise.resolve({ state: "georgia", city: "windermere", slug: draft.slug, locale: "en" });
    Date.now = () => Date.parse("2026-11-12T14:00:00Z");
    await assert.rejects(page.default({ params }), /NEXT_NOT_FOUND/);
    assert.equal((await sitemap.default()).some((entry) => entry.url.endsWith(`/windermere/blog/${draft.slug}`)), false);
    const editParams = { params: Promise.resolve({ id: draft.id }) };
    assert.equal((await updateApi.PUT(request("PUT", `/api/blog-editor/${draft.id}`, { ...draft, publishAt: "2026-11-10T08:00:00-06:00" }), editParams)).status, 400);
    const published = await updateApi.PUT(request("PUT", `/api/blog-editor/${draft.id}`, { ...draft, status: "scheduled", localIntro: "Individually written local introduction." }), editParams);
    assert.equal(published.status, 200);
    let current = (await published.json()).version;
    assert.equal(current.revision, 2);
    assert.equal((await updateApi.PUT(request("PUT", `/api/blog-editor/${draft.id}`, draft), editParams)).status, 409);
    Date.now = () => Date.parse("2026-11-11T13:59:59Z");
    await assert.rejects(page.default({ params }), /NEXT_NOT_FOUND/);
    Date.now = () => Date.parse("2026-11-11T14:00:00Z");
    let metadata = await page.generateMetadata({ params });
    assert.equal(metadata.alternates.canonical, "https://www.zivel.com/blog/new-year-new-norm-start-now");
    const html = renderToStaticMarkup(await page.default({ params }));
    assert(html.includes(current.bookingUrl.replace(/&/g, "&amp;")));
    assert(html.includes(current.localIntro));
    assert((await sitemap.default()).some((entry) => entry.url.endsWith(`/windermere/blog/${draft.slug}`)));
    const unique = await updateApi.PUT(request("PUT", `/api/blog-editor/${draft.id}`, { ...current, unique: true }), editParams);
    assert.equal(unique.status, 200);
    current = (await unique.json()).version;
    metadata = await page.generateMetadata({ params });
    assert.equal(metadata.alternates.canonical, "https://www.zivel.com/locations/georgia/windermere/blog/new-year-new-norm-start-now");
    assert.equal((await updateApi.PUT(request("PUT", `/api/blog-editor/${draft.id}`, { ...current, status: "draft" }), editParams)).status, 200);
    await assert.rejects(page.default({ params }), /NEXT_NOT_FOUND/);
  } finally {
    Date.now = originalClock;
    if (saved === undefined) delete process.env.BLOG_EDITOR_EMAILS;
    else process.env.BLOG_EDITOR_EMAILS = saved;
    records.clear();
    user = null;
  }
});
