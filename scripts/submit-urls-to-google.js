#!/usr/bin/env node
/**
 * Google Indexing API — batch URL submission script
 *
 * Usage:
 *   node scripts/submit-urls-to-google.js              # reads urls.txt
 *   node scripts/submit-urls-to-google.js url1 url2    # pass URLs as args
 *
 * Env vars required:
 *   GOOGLE_INDEXING_CREDENTIALS  — full JSON content of a service-account key file
 */

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// ─── Config ──────────────────────────────────────────────────────────────────
const MAX_PER_RUN = 200;       // Google free quota ceiling
const BATCH_SIZE = 100;        // max per single request
const URLS_FILE = path.join(__dirname, "..", "urls.txt");
const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const INDEXING_ENDPOINT =
  "https://indexing.googleapis.com/v3/urlNotifications:publish";

// ─── Auth ─────────────────────────────────────────────────────────────────────
function getAuth() {
  const raw = process.env.GOOGLE_INDEXING_CREDENTIALS;
  if (!raw) {
    console.error(
      "❌  GOOGLE_INDEXING_CREDENTIALS env var is not set.\n" +
        "    Set it to the full JSON content of your service-account key file."
    );
    process.exit(1);
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    console.error(
      "❌  GOOGLE_INDEXING_CREDENTIALS is not valid JSON. " +
        "Paste the entire contents of the downloaded key file."
    );
    process.exit(1);
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: [INDEXING_SCOPE],
  });
}

// ─── URL source ───────────────────────────────────────────────────────────────
function getUrls() {
  // If URLs were passed as CLI args, use those
  const cliUrls = process.argv.slice(2).filter((a) => a.startsWith("http"));
  if (cliUrls.length > 0) {
    console.log(`📋  Using ${cliUrls.length} URL(s) from command-line arguments.`);
    return cliUrls;
  }

  // Otherwise read urls.txt
  if (!fs.existsSync(URLS_FILE)) {
    console.error(
      `❌  No URLs provided and ${URLS_FILE} does not exist.\n` +
        "    Either pass URLs as arguments or create a urls.txt file."
    );
    process.exit(1);
  }

  const lines = fs
    .readFileSync(URLS_FILE, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("http"));

  console.log(`📋  Read ${lines.length} URL(s) from urls.txt.`);
  return lines;
}

// ─── Submit one URL ───────────────────────────────────────────────────────────
async function submitUrl(accessToken, url) {
  const res = await fetch(INDEXING_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });

  const body = await res.json();
  return { url, ok: res.ok, status: res.status, body };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🔐  Authenticating with Google…");
  const auth = getAuth();
  const client = await auth.getClient();
  const { token: accessToken } = await client.getAccessToken();
  console.log("✅  Authenticated.\n");

  let urls = getUrls();

  if (urls.length > MAX_PER_RUN) {
    console.warn(
      `⚠️   ${urls.length} URLs provided but the daily quota cap is ${MAX_PER_RUN}.\n` +
        `    Only the first ${MAX_PER_RUN} will be submitted this run.`
    );
    urls = urls.slice(0, MAX_PER_RUN);
  }

  console.log(`\n🚀  Submitting ${urls.length} URL(s) in batches of ${BATCH_SIZE}…\n`);

  const succeeded = [];
  const failed = [];

  // Process in batches (rate-limit friendly)
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    console.log(
      `── Batch ${batchNum} (URLs ${i + 1}–${i + batch.length}) ──────────────`
    );

    const results = await Promise.all(
      batch.map((url) => submitUrl(accessToken, url))
    );

    for (const r of results) {
      if (r.ok) {
        console.log(`  ✅  ${r.url}`);
        succeeded.push(r.url);
      } else {
        const msg =
          r.body?.error?.message ?? r.body?.error ?? JSON.stringify(r.body);
        console.log(`  ❌  ${r.url}`);
        console.log(`      Status ${r.status}: ${msg}`);
        failed.push({ url: r.url, status: r.status, message: msg });
      }
    }

    console.log();
  }

  // ─── Summary ───────────────────────────────────────────────────────────────
  console.log("═══════════════════════════════════════════════════════");
  console.log("  SUMMARY");
  console.log("═══════════════════════════════════════════════════════");
  console.log(`  ✅  Succeeded : ${succeeded.length}`);
  console.log(`  ❌  Failed    : ${failed.length}`);

  if (failed.length > 0) {
    console.log("\n  Failed URLs:");
    for (const f of failed) {
      console.log(`    • ${f.url}`);
      console.log(`      (${f.status}) ${f.message}`);
    }
  }

  console.log("═══════════════════════════════════════════════════════\n");

  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("💥  Unexpected error:", err.message ?? err);
  process.exit(1);
});
