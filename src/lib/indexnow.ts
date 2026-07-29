/**
 * IndexNow helper — server-side only.
 *
 * Notifies Bing (and other IndexNow-compatible engines) about new or
 * updated URLs so they are crawled quickly.
 *
 * Usage:
 *   import { notifyIndexNow } from "@/lib/indexnow";
 *   await notifyIndexNow(["https://www.zivel.com/locations/utah/riverton"]);
 */

const INDEXNOW_KEY = "H6QpY2O2psuF0RTXd83oRi8PeSvmTNQgW5HwHTt8QAidcOgt";
const HOST = "www.zivel.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function notifyIndexNow(urls: string | string[]): Promise<void> {
  const urlList = Array.isArray(urls) ? urls : [urls];

  if (urlList.length === 0) {
    console.warn("[IndexNow] No URLs provided — nothing to submit.");
    return;
  }

  console.log(`[IndexNow] Submitting ${urlList.length} URL(s)…`);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });

    if (res.ok || res.status === 202) {
      // 200 OK or 202 Accepted are both success responses from IndexNow
      console.log(`[IndexNow] ✅ Accepted (HTTP ${res.status}) — ${urlList.length} URL(s) queued.`);
      for (const url of urlList) console.log(`  • ${url}`);
    } else {
      const text = await res.text().catch(() => "");
      console.error(
        `[IndexNow] ❌ Submission failed — HTTP ${res.status}: ${text}`
      );
      console.error("[IndexNow] URLs that were NOT submitted:");
      for (const url of urlList) console.error(`  • ${url}`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[IndexNow] ❌ Network error: ${msg}`);
    console.error("[IndexNow] URLs that were NOT submitted:");
    for (const url of urlList) console.error(`  • ${url}`);
  }
}
