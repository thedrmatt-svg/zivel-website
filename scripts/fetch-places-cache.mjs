#!/usr/bin/env node
/**
 * Refresh the committed Google Places cache using Node 22 built-ins only.
 * Required environment: GOOGLE_PLACES_API_KEY (never pass a key in arguments).
 * `--check-config` validates configuration without making API calls or writes.
 * Full/partial/all-failed runs exit 0/1/1 respectively. Partial results are saved;
 * failed entries and an entirely failed run retain their last-known-good data.
 */
import { readFileSync, writeFileSync, renameSync, unlinkSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const CACHE_PATH = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/places-cache.json");
const FIELDS = "id,displayName,formattedAddress,internationalPhoneNumber,googleMapsUri,websiteUri,rating,userRatingCount,reviews,regularOpeningHours,photos";
const CONFIG_ERROR = "GOOGLE_PLACES_API_KEY is missing or blank. In GitHub repository Settings > Secrets and variables > Actions, add a repository secret named GOOGLE_PLACES_API_KEY. A Replit secret does not configure GitHub Actions. Do not paste the key into logs, source, or chat.";

export function validateConfiguration(apiKey, cachePath = CACHE_PATH) {
  if (typeof apiKey !== "string" || !apiKey.trim()) throw new Error(CONFIG_ERROR);
  let cache;
  try {
    cache = JSON.parse(readFileSync(cachePath, "utf8"));
  } catch {
    throw new Error("Cannot read valid Places cache JSON; no cache changes were made.");
  }
  if (!cache || typeof cache !== "object" || Array.isArray(cache)) {
    throw new Error("Places cache must be an object; no cache changes were made.");
  }
  const placeIds = Object.keys(cache).filter(key => !key.startsWith("_"));
  const paths = new Set();
  if (!placeIds.length) throw new Error("Places cache has no studios to refresh.");
  for (const id of placeIds) {
    const entry = cache[id];
    if (!entry || typeof entry.locationPath !== "string" || !entry.locationPath.trim() ||
        paths.has(entry.locationPath)) {
      throw new Error("Places cache contains missing or duplicate studio identities; no cache changes were made.");
    }
    paths.add(entry.locationPath);
  }
  return { cache, placeIds };
}

function normalizePlace(data, placeId, previous, refreshedAt) {
  // Never accept data for a different studio or treat an error body as success.
  if (!data || data.id !== placeId || data.error ||
      !["rating", "userRatingCount", "reviews"].some(field => Object.hasOwn(data, field)) ||
      (data.rating !== undefined && (!Number.isFinite(data.rating) || data.rating < 1 || data.rating > 5)) ||
      (data.userRatingCount !== undefined && (!Number.isInteger(data.userRatingCount) || data.userRatingCount < 0)) ||
      (data.reviews !== undefined && !Array.isArray(data.reviews)) ||
      (data.googleMapsUri !== undefined && typeof data.googleMapsUri !== "string")) {
    throw new Error("Invalid or mismatched Places response");
  }
  const reviews = data.reviews ?? [];
  if (reviews.some(review => !review || typeof review !== "object" ||
      (review.rating !== undefined && (!Number.isFinite(review.rating) || review.rating < 1 || review.rating > 5)) ||
      [review.authorAttribution?.displayName, review.authorAttribution?.uri,
        review.relativePublishTimeDescription, review.text?.text]
        .some(value => value != null && typeof value !== "string"))) {
    throw new Error("Invalid reviews response");
  }
  return {
    ...previous,
    locationPath: previous.locationPath,
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    googleMapsUri: data.googleMapsUri ?? previous.googleMapsUri ?? null,
    reviews: reviews.map(review => ({
      authorName: review.authorAttribution?.displayName ?? null,
      authorUri: review.authorAttribution?.uri ?? null,
      rating: review.rating ?? null,
      relativeTime: review.relativePublishTimeDescription ?? null,
      text: review.text?.text ?? null,
    })),
    _refreshedAt: refreshedAt,
  };
}

function writeCacheAtomically(cachePath, cache) {
  const temporaryPath = `${cachePath}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporaryPath, JSON.stringify(cache, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
    renameSync(temporaryPath, cachePath);
  } finally {
    try { unlinkSync(temporaryPath); } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

export async function refreshPlacesCache({
  apiKey = process.env.GOOGLE_PLACES_API_KEY,
  cachePath = CACHE_PATH,
  fetchImpl = globalThis.fetch,
  sleep = ms => new Promise(resolveSleep => setTimeout(resolveSleep, ms)),
  now = () => new Date().toISOString(),
  logger = console,
} = {}) {
  const { cache, placeIds } = validateConfiguration(apiKey, cachePath);
  const attemptedAt = now();
  let successCount = 0;
  let errorCount = 0;
  logger.log(`Refreshing ${placeIds.length} studios from Google Places.`);
  for (const [index, placeId] of placeIds.entries()) {
    const previous = cache[placeId];
    try {
      const response = await fetchImpl(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
        {
          headers: { "X-Goog-Api-Key": apiKey.trim(), "X-Goog-FieldMask": FIELDS },
          signal: AbortSignal.timeout(15_000),
        },
      );
      // Do not log upstream bodies or exception messages: they can echo secrets.
      if (!response.ok) {
        logger.warn(`${previous.locationPath}: HTTP ${response.status}; previous data retained.`);
        errorCount++;
      } else {
        const refreshed = normalizePlace(await response.json(), placeId, previous, attemptedAt);
        cache[placeId] = refreshed;
        successCount++;
        logger.log(`${previous.locationPath}: refreshed.`);
      }
    } catch {
      errorCount++;
      logger.warn(`${previous.locationPath}: request, timeout, or response validation failed; previous data retained.`);
    }
    if (index < placeIds.length - 1) await sleep(300);
  }

  const status = errorCount === 0 ? "complete" : successCount === 0 ? "failed" : "partial";
  if (successCount > 0) {
    // This legacy timestamp means ALL studios were successfully refreshed.
    if (status === "complete") cache._generatedAt = attemptedAt;
    cache._lastRefresh = { status, attemptedAt, total: placeIds.length, successCount, errorCount };
    writeCacheAtomically(cachePath, cache);
  }
  logger.log(`Refresh ${status}: ${successCount} succeeded, ${errorCount} failed. ${
    successCount ? "Saved successful results; failed studios were unchanged." : "Cache file and timestamps were not changed."
  }`);
  return { status, successCount, errorCount, written: successCount > 0 };
}

export async function main(args = process.argv.slice(2)) {
  if (args.length > 1 || (args.length === 1 && args[0] !== "--check-config")) {
    console.error("Usage: node scripts/fetch-places-cache.mjs [--check-config]");
    return 1;
  }
  if (args[0] === "--check-config") {
    validateConfiguration(process.env.GOOGLE_PLACES_API_KEY);
    console.log("Refresh configuration and cached studio identities are valid. No API requests made.");
    return 0;
  }
  const result = await refreshPlacesCache();
  return result.status === "complete" ? 0 : 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().then(code => { process.exitCode = code; }).catch(error => {
    // Only configuration messages are safe to print; never echo raw API/fs errors.
    console.error(error.message === CONFIG_ERROR ? CONFIG_ERROR :
      "Review refresh could not complete. Check the cache file, permissions, and configuration. No API error bodies or credentials are logged.");
    process.exitCode = 1;
  });
}
