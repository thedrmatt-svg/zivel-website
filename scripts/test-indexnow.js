#!/usr/bin/env node
/**
 * Manual test for the IndexNow integration.
 *
 * Usage:
 *   node scripts/test-indexnow.js                       # submits the built-in test URLs
 *   node scripts/test-indexnow.js https://... https://  # pass your own URLs as args
 */

const INDEXNOW_KEY = "H6QpY2O2psuF0RTXd83oRi8PeSvmTNQgW5HwHTt8QAidcOgt";
const HOST = "www.zivel.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const DEFAULT_TEST_URLS = [
  "https://www.zivel.com/",
  "https://www.zivel.com/locations",
  "https://www.zivel.com/services",
];

async function submit(urlList) {
  console.log(`\n🔑  Key        : ${INDEXNOW_KEY}`);
  console.log(`🌐  Host       : ${HOST}`);
  console.log(`🔗  Key file   : https://${HOST}/${INDEXNOW_KEY}.txt`);
  console.log(`📡  Endpoint   : ${ENDPOINT}`);
  console.log(`📋  URLs (${urlList.length})  :`);
  for (const u of urlList) console.log(`    • ${u}`);
  console.log();

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  console.log("⬆️   Sending request…\n");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const responseText = await res.text().catch(() => "");

  console.log(`HTTP ${res.status} ${res.statusText}`);
  if (responseText) console.log("Response body:", responseText);
  console.log();

  if (res.ok || res.status === 202) {
    console.log("✅  Success — URLs accepted by IndexNow.");
  } else if (res.status === 400) {
    console.error("❌  400 Bad Request — check that the key file is publicly accessible at:");
    console.error(`    https://${HOST}/${INDEXNOW_KEY}.txt`);
    console.error("    (Deploy the site first so the file is live, then re-test.)");
  } else if (res.status === 403) {
    console.error("❌  403 Forbidden — key mismatch. Ensure the .txt file contains only the key with no extra spaces.");
  } else if (res.status === 422) {
    console.error("❌  422 Unprocessable — one or more URLs are not on the declared host.");
  } else {
    console.error(`❌  Unexpected status ${res.status}.`);
  }
}

const cliUrls = process.argv.slice(2).filter((a) => a.startsWith("http"));
const urlsToSubmit = cliUrls.length > 0 ? cliUrls : DEFAULT_TEST_URLS;

submit(urlsToSubmit).catch((err) => {
  console.error("💥  Unexpected error:", err.message ?? err);
  process.exit(1);
});
