const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const { test } = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

// Real content/renderers with framework-only wrappers; no runtime clock bypass.
const root = path.resolve(__dirname, "..");
const cache = new Map();
const wrappers = {
  "next/link": ({ children, prefetch, ...props }) => React.createElement("a", props, children),
  "next/navigation": { notFound() { throw new Error("NEXT_NOT_FOUND"); } },
  "@/components/ui/ScrollReveal": ({ children }) => React.createElement(React.Fragment, null, children),
};
function load(base) {
  const filename = [base, `${base}.ts`, `${base}.tsx`, `${base}.json`]
    .find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
  assert.ok(filename, base);
  if (filename.endsWith(".json")) return require(filename);
  if (cache.has(filename)) return cache.get(filename).exports;
  const mod = new Module(filename, module);
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const nativeRequire = Module.createRequire(filename);
  mod.require = (id) => {
    if (Object.hasOwn(wrappers, id)) return wrappers[id];
    if (id.startsWith("@/")) return load(path.join(root, "src", id.slice(2)));
    if (id.startsWith(".")) return load(path.resolve(path.dirname(filename), id));
    return nativeRequire(id);
  };
  cache.set(filename, mod);
  mod._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
    },
    fileName: filename,
  }).outputText, filename);
  return mod.exports;
}
const data = load(path.join(root, "src/lib/data/blog"));
const post = load(path.join(root, "src/content/blog/holiday-stress-is-preventable")).default;
const detail = load(path.join(root, "src/app/[locale]/blog/[slug]/page"));
const index = load(path.join(root, "src/app/[locale]/blog/page"));
const localIndex = load(path.join(root, "src/app/[locale]/locations/[state]/[city]/blog/page"));
const sitemap = load(path.join(root, "src/app/sitemap"));
const at = Date.parse("2026-11-03T06:00:00Z");
const params = { slug: post.slug, locale: "en" };

async function withClock(now, fn) {
  const original = Date.now;
  Date.now = () => now;
  try { return await fn(); } finally { Date.now = original; }
}

test("the post is published November 3 Chicago time, with a precise visibility boundary", () => {
  assert.equal(post.status, "published");
  assert.equal(post.publishDate, "2026-11-03");
  assert.equal(Date.parse(post.publishAt), at);
  assert.equal(new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "numeric" }).format(at), "12:00 AM");
  assert(data.getBlogBySlug(post.slug));
  for (const now of [at - 1, at, at + 1]) {
    const expected = now >= at;
    assert.equal(Boolean(data.getBlogBySlug(post.slug, now)), expected);
    assert.equal(data.getPublishedBlogPosts(now).some((p) => p.slug === post.slug), expected);
    assert.equal(data.getPublicationStatus(post, now), expected ? "published" : "scheduled");
    assert.equal(data.getPublishedBlogPosts(now).filter((p) => p.slug !== post.slug).length, 4);
  }
  assert.equal(data.getPublicationStatus({ ...post, status: "draft" }, at + 1), "draft");
  assert.equal(data.getPublicationStatus({ ...post, publishAt: "invalid" }, at + 1), "draft");
});

test("all supplied headings, paragraphs and list text are preserved word for word", () => {
  const brief = fs.readFileSync(path.join(root, "attached_assets/Pasted-TASK-Add-a-new-blog-post-to-the-main-Zivel-blog-schedul_1793737612494.txt"), "utf8");
  const markdown = brief.split("BODY (markdown):")[1].split("\n2. LOCAL VERSIONS")[0].trim();
  const expected = markdown.split(/\n\n+/).flatMap((chunk) => {
    if (chunk.startsWith("## ")) return [chunk.slice(3)];
    if (/^1\. /.test(chunk)) return chunk.split("\n").map((line) => line.replace(/^\d+\. /, "").replace(/\*\*/g, ""));
    return [chunk];
  });
  const actual = post.content.flatMap((block) => block.type === "list" ? block.items : [block.text]);
  assert.deepEqual(actual, expected);
});

test("direct route, indexes and sitemap hide the post before publication and reveal it afterwards", async () => {
  for (const now of [at - 1, at, at + 1]) {
    await withClock(now, async () => {
      const visible = now >= at;
      if (!visible) {
        await assert.rejects(detail.default({ params: Promise.resolve(params) }), /NEXT_NOT_FOUND/);
        assert.deepEqual(await detail.generateMetadata({ params: Promise.resolve(params) }), {});
      } else {
        assert(renderToStaticMarkup(await detail.default({ params: Promise.resolve(params) })).includes("Holiday Stress Is Preventable."));
      }
      const mainHtml = renderToStaticMarkup(index.default());
      const localHtml = renderToStaticMarkup(await localIndex.default({ params: Promise.resolve({ state: "utah", city: "riverton" }) }));
      assert.equal(mainHtml.includes(`/blog/${post.slug}`), visible);
      assert.equal(localHtml.includes(`/blog/${post.slug}`), visible);
      assert.equal(sitemap.default().some((entry) => entry.url === `https://www.zivel.com/blog/${post.slug}`), visible);
    });
  }
  for (const entry of [detail, index, localIndex, sitemap]) assert.equal(entry.dynamic, "force-dynamic");
});

test("published rendering retains matching anchors, metadata, schema and existing CTA buttons", async () => {
  await withClock(at, async () => {
    const html = renderToStaticMarkup(await detail.default({ params: Promise.resolve(params) }));
    const expectedIds = [
      "the-stress-you-feel-in-december-started-in-november",
      "what-holiday-stress-actually-does-to-your-body",
      "prevention-beats-recovery-but-recovery-is-prevention",
      "four-recovery-habits-to-lock-in-before-thanksgiving",
      "how-zivel-fits-into-a-busy-holiday-schedule",
      "put-yourself-on-the-list",
    ];
    for (const id of expectedIds) {
      assert.equal((html.match(new RegExp(`href="#${id}"`, "g")) || []).length, 1);
      assert.equal((html.match(new RegExp(`<h2[^>]*id="${id}"`, "g")) || []).length, 1);
    }
    assert(html.includes('href="/services"'));
    assert(html.includes('href="/locations"'));
    assert(html.includes("<strong>Book recovery like a meeting.</strong>"));
    assert(html.includes('"@type":"Article"'));
    assert(html.includes(`"datePublished":"${post.publishAt}"`));
    const metadata = await detail.generateMetadata({ params: Promise.resolve(params) });
    assert.deepEqual(metadata.title, { absolute: post.seoTitle });
    assert.equal(metadata.description, post.description);
    assert.equal(metadata.openGraph.title, post.seoTitle);
    assert.equal(metadata.openGraph.description, post.description);
    assert.equal(metadata.alternates.canonical, `https://www.zivel.com/blog/${post.slug}`);
    // Optional test-only output used to visually inspect the future article.
    if (process.env.BLOG_TEST_HTML) fs.writeFileSync(process.env.BLOG_TEST_HTML, html);
  });
});
