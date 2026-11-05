import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync, readdirSync, mkdirSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { refreshPlacesCache, validateConfiguration } from "./fetch-places-cache.mjs";

const timestamp = "2026-11-05T12:00:00.000Z";
const original = {
  _comment: "Fixture data only",
  _generatedAt: "2026-03-01T00:00:00.000Z",
  alpha: {
    locationPath: "utah/studio-a", rating: 4.8, userRatingCount: 12,
    googleMapsUri: "https://maps.google.com/?cid=1",
    reviews: [{ authorName: "Fixture A", rating: 5, text: "Old A" }],
  },
  beta: {
    locationPath: "florida/studio-b", rating: 4.9, userRatingCount: 20,
    googleMapsUri: "https://maps.google.com/?cid=2",
    reviews: [{ authorName: "Fixture B", rating: 5, text: "Old B" }],
  },
};
const successfulData = id => ({
  id, rating: 5, userRatingCount: 21,
  googleMapsUri: `https://maps.google.com/?cid=${id === "alpha" ? 1 : 2}`,
  reviews: [{
    authorAttribution: { displayName: "Fixture Reviewer", uri: "https://example.test/author" },
    rating: 5, relativePublishTimeDescription: "a week ago", text: { text: "Fresh fixture review" },
  }],
});

test("Hollywood uses its verified Google Place ID in both location data and the review cache", () => {
  const placeId = "ChIJi939hZKr2YgRfV5beSrIpBg";
  const locations = readFileSync("src/lib/data/locations.ts", "utf8");
  const cache = JSON.parse(readFileSync("src/data/places-cache.json", "utf8"));
  assert(locations.includes(`"florida/hollywood": "${placeId}"`));
  assert.equal(cache[placeId]?.locationPath, "florida/hollywood");
  assert.equal(Object.values(cache).filter(entry => entry?.locationPath === "florida/hollywood").length, 1);
});

function fixture(t, cache = original) {
  const dir = mkdtempSync(join(tmpdir(), "zivel-places-test-"));
  const cachePath = join(dir, "places-cache.json");
  writeFileSync(cachePath, JSON.stringify(cache, null, 2) + "\n");
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const logs = [];
  const options = {
    cachePath, apiKey: "fixture-not-a-real-key", now: () => timestamp,
    logger: { log: message => logs.push(message), warn: message => logs.push(message) },
    sleep: async () => {},
  };
  return { dir, cachePath, options, logs, read: () => JSON.parse(readFileSync(cachePath, "utf8")) };
}

test("missing and blank configuration fail before requests or cache writes", async t => {
  const f = fixture(t);
  const before = readFileSync(f.cachePath, "utf8");
  for (const apiKey of ["", "  ", null]) {
    await assert.rejects(refreshPlacesCache({
      ...f.options, apiKey, fetchImpl: () => assert.fail("must not call Google"),
    }), /Settings > Secrets and variables > Actions/);
  }
  assert.equal(readFileSync(f.cachePath, "utf8"), before);
});

test("CLI missing-key failure is nonzero and provides owner instructions without exposing credentials", () => {
  const result = spawnSync(process.execPath, ["scripts/fetch-places-cache.mjs", "--check-config"], {
    cwd: resolve("."), encoding: "utf8", env: { PATH: process.env.PATH },
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /GOOGLE_PLACES_API_KEY is missing/);
  assert.match(result.stderr, /repository secret/);
});

test("configuration-only validation preserves the cache", t => {
  const f = fixture(t);
  const before = readFileSync(f.cachePath, "utf8");
  const checked = validateConfiguration(f.options.apiKey, f.cachePath);
  assert.deepEqual(checked.placeIds, ["alpha", "beta"]);
  assert.equal(readFileSync(f.cachePath, "utf8"), before);
});

test("complete success updates reviews and accurate timestamps while retaining studio identities", async t => {
  const f = fixture(t);
  let requests = 0;
  const result = await refreshPlacesCache({
    ...f.options,
    fetchImpl: async (url, config) => {
      requests++;
      assert(url.startsWith("https://places.googleapis.com/v1/places/"));
      assert(!url.includes(f.options.apiKey));
      assert.equal(config.headers["X-Goog-Api-Key"], f.options.apiKey);
      assert(config.signal instanceof AbortSignal);
      const id = new URL(url).pathname.split("/").at(-1);
      return { ok: true, json: async () => successfulData(id) };
    },
  });
  assert.equal(requests, 2);
  assert.deepEqual(result, { status: "complete", successCount: 2, errorCount: 0, written: true });
  const cache = f.read();
  assert.equal(cache._generatedAt, timestamp);
  assert.equal(cache._lastRefresh.status, "complete");
  assert.deepEqual(Object.keys(cache).filter(key => !key.startsWith("_")), ["alpha", "beta"]);
  for (const id of ["alpha", "beta"]) {
    assert.equal(cache[id].locationPath, original[id].locationPath);
    assert.equal(cache[id].rating, 5);
    assert.equal(cache[id].userRatingCount, 21);
    assert.equal(cache[id]._refreshedAt, timestamp);
    assert.equal(cache[id].reviews[0].text, "Fresh fixture review");
    assert.equal(cache[id].reviews[0].relativeTime, "a week ago");
  }
  assert.deepEqual(readdirSync(f.dir), ["places-cache.json"], "no temporary files remain");
});

test("partial API failure saves good results, preserves failed entry, and does not advance full-cache timestamp", async t => {
  const f = fixture(t);
  const result = await refreshPlacesCache({
    ...f.options,
    fetchImpl: async url => url.includes("/alpha?")
      ? { ok: true, json: async () => successfulData("alpha") }
      : { ok: false, status: 403, text: async () => assert.fail("must not read error body") },
  });
  assert.equal(result.status, "partial");
  assert.equal(result.errorCount, 1);
  const cache = f.read();
  assert.deepEqual(cache.beta, original.beta);
  assert.equal(cache.alpha._refreshedAt, timestamp);
  assert.equal(cache._generatedAt, original._generatedAt);
  assert.equal(cache._lastRefresh.status, "partial");
  assert.equal(cache._lastRefresh.errorCount, 1);
});

test("all API failures leave cache byte-for-byte unchanged and report failure", async t => {
  const f = fixture(t);
  const before = readFileSync(f.cachePath, "utf8");
  const result = await refreshPlacesCache({
    ...f.options, fetchImpl: async () => ({ ok: false, status: 429 }),
  });
  assert.deepEqual(result, { status: "failed", successCount: 0, errorCount: 2, written: false });
  assert.equal(readFileSync(f.cachePath, "utf8"), before);
  assert(f.logs.some(log => log.includes("Cache file and timestamps were not changed")));
});

test("network errors do not abort other studios or leak error text", async t => {
  const f = fixture(t);
  const result = await refreshPlacesCache({
    ...f.options,
    fetchImpl: async url => {
      if (url.includes("/alpha?")) throw new Error(`Timeout echoed ${f.options.apiKey}`);
      return { ok: true, json: async () => successfulData("beta") };
    },
  });
  assert.equal(result.status, "partial");
  assert.deepEqual(f.read().alpha, original.alpha);
  assert.equal(f.read().beta._refreshedAt, timestamp);
  assert(!f.logs.join("\n").includes(f.options.apiKey));
});

for (const [name, payload] of [
  ["wrong studio id", successfulData("another-studio")],
  ["API error object", { error: { message: "fixture" } }],
  ["invalid rating", { id: "alpha", rating: 100 }],
  ["invalid count", { id: "alpha", userRatingCount: -1 }],
  ["malformed reviews", { id: "alpha", reviews: {} }],
  ["missing review fields", { id: "alpha" }],
  ["invalid review text", { id: "alpha", reviews: [{ text: { text: {} } }] }],
]) {
  test(`${name} cannot overwrite the existing studio cache`, async t => {
    const f = fixture(t);
    const before = readFileSync(f.cachePath, "utf8");
    const result = await refreshPlacesCache({
      ...f.options, fetchImpl: async () => ({ ok: true, json: async () => payload }),
    });
    assert.equal(result.status, "failed");
    assert.equal(readFileSync(f.cachePath, "utf8"), before);
  });
}

test("malformed JSON responses preserve previous data", async t => {
  const f = fixture(t);
  const before = readFileSync(f.cachePath, "utf8");
  const result = await refreshPlacesCache({
    ...f.options,
    fetchImpl: async () => ({ ok: true, json: async () => { throw new Error("bad JSON"); } }),
  });
  assert.equal(result.status, "failed");
  assert.equal(readFileSync(f.cachePath, "utf8"), before);
});

test("a valid zero-review studio may refresh without erasing its Maps link", async t => {
  const f = fixture(t);
  await refreshPlacesCache({
    ...f.options,
    fetchImpl: async url => ({
      ok: true,
      json: async () => ({ id: new URL(url).pathname.split("/").at(-1), userRatingCount: 0 }),
    }),
  });
  assert.equal(f.read().alpha.userRatingCount, 0);
  assert.deepEqual(f.read().alpha.reviews, []);
  assert.equal(f.read().alpha.googleMapsUri, original.alpha.googleMapsUri);
});

test("empty or duplicate studio configurations fail without requests", async t => {
  for (const cache of [{ _generatedAt: "old" }, {
    alpha: original.alpha, beta: { ...original.beta, locationPath: original.alpha.locationPath },
  }]) {
    const f = fixture(t, cache);
    await assert.rejects(refreshPlacesCache({
      ...f.options, fetchImpl: () => assert.fail("must not call Google"),
    }), /no studios|duplicate studio/);
  }
});

test("workflow retains triggers, scopes write permission, skips app installs and reports incomplete refreshes", () => {
  const workflow = readFileSync(".github/workflows/refresh-places-reviews.yml", "utf8");
  assert(workflow.includes("cron: '0 2 1,15 * *'"));
  assert(workflow.includes("workflow_dispatch:"));
  assert(workflow.includes("node-version: 22"));
  assert(workflow.includes("contents: write"));
  assert(!/\bnpm ci\b|\bpnpm install\b/.test(workflow));
  assert(workflow.includes("node scripts/fetch-places-cache.mjs --check-config"));
  assert(workflow.includes("continue-on-error: true"));
  assert(workflow.includes("steps.refresh.outcome == 'failure'"));
  assert(workflow.includes('git push origin "HEAD:refs/heads/${GITHUB_REF_NAME}"'));
  assert(!workflow.includes('|| echo "No changes"'));
  assert(workflow.includes("exit 1"));
});

for (const mode of ["complete", "partial", "failed", "check-config"]) {
  test(`CLI ${mode} has the expected exit status and cache behavior with mocked fetch`, t => {
    const f = fixture(t);
    mkdirSync(join(f.dir, "scripts"));
    mkdirSync(join(f.dir, "src", "data"), { recursive: true });
    const script = join(f.dir, "scripts", "fetch-places-cache.mjs");
    const cachePath = join(f.dir, "src", "data", "places-cache.json");
    copyFileSync("scripts/fetch-places-cache.mjs", script);
    copyFileSync(f.cachePath, cachePath);
    const mockPath = join(f.dir, "mock-fetch.mjs");
    writeFileSync(mockPath, `
      globalThis.fetch = async url => {
        const mode = ${JSON.stringify(mode)};
        if (mode === "check-config") throw new Error("config check must not fetch");
        const id = new URL(url).pathname.split("/").at(-1);
        if (mode === "failed" || (mode === "partial" && id === "beta")) {
          return new Response("fixture failure", { status: 403 });
        }
        return new Response(JSON.stringify({ id, rating: 5, userRatingCount: 99, reviews: [] }));
      };
    `);
    const before = readFileSync(cachePath, "utf8");
    const result = spawnSync(process.execPath, [
      "--import", mockPath, script, ...(mode === "check-config" ? ["--check-config"] : []),
    ], {
      encoding: "utf8",
      env: { PATH: process.env.PATH, GOOGLE_PLACES_API_KEY: "fixture-not-a-real-key" },
      timeout: 10_000,
    });
    assert.equal(result.status, ["partial", "failed"].includes(mode) ? 1 : 0, result.stderr);
    assert(!`${result.stdout}${result.stderr}`.includes("fixture-not-a-real-key"));
    const cache = JSON.parse(readFileSync(cachePath, "utf8"));
    if (mode === "failed" || mode === "check-config") {
      assert.equal(readFileSync(cachePath, "utf8"), before);
    } else {
      assert.equal(cache._lastRefresh.status, mode);
      assert.equal(cache.alpha.userRatingCount, 99);
      if (mode === "partial") {
        assert.deepEqual(cache.beta, original.beta);
        assert.equal(cache._generatedAt, original._generatedAt);
      }
    }
  });
}
