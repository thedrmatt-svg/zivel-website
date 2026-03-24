#!/usr/bin/env node
/**
 * Fetch Google Places data for all Zivel locations and write to
 * src/data/places-cache.json. Run whenever you want to refresh reviews.
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=<key> node scripts/fetch-places-cache.mjs
 *
 * Or add to .env.local and run:
 *   npm run fetch-places
 *
 * The JSON is committed to the repo so builds never call the Places API.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = resolve(__dirname, "../src/data/places-cache.json");

const FIELDS = "id,displayName,formattedAddress,internationalPhoneNumber,googleMapsUri,websiteUri,rating,userRatingCount,reviews,regularOpeningHours,photos";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error("❌  GOOGLE_PLACES_API_KEY environment variable is not set.");
  process.exit(1);
}

async function fetchPlace(placeId) {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": FIELDS,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.warn(`  ⚠️  HTTP ${res.status} for ${placeId}: ${body.slice(0, 120)}`);
    return null;
  }

  return res.json();
}

async function main() {
  const cache = JSON.parse(readFileSync(CACHE_PATH, "utf-8"));

  const placeIds = Object.keys(cache).filter((k) => !k.startsWith("_"));
  console.log(`Fetching ${placeIds.length} locations from Google Places API…\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const placeId of placeIds) {
    const locationPath = cache[placeId].locationPath;
    process.stdout.write(`  ${locationPath} (${placeId.slice(0, 12)}…) … `);

    const data = await fetchPlace(placeId);

    if (!data) {
      errorCount++;
      console.log("FAILED");
      continue;
    }

    const reviews = Array.isArray(data.reviews) ? data.reviews : [];

    cache[placeId] = {
      locationPath,
      rating: typeof data.rating === "number" ? data.rating : null,
      userRatingCount: typeof data.userRatingCount === "number" ? data.userRatingCount : null,
      googleMapsUri: typeof data.googleMapsUri === "string" ? data.googleMapsUri : null,
      reviews: reviews.map((r) => ({
        authorName: r.authorAttribution?.displayName ?? null,
        authorUri: r.authorAttribution?.uri ?? null,
        rating: r.rating ?? null,
        relativeTime: r.relativePublishTimeDescription ?? null,
        text: r.text?.text ?? null,
      })),
    };

    const ratingStr = data.rating ? `${data.rating.toFixed(1)}★` : "no rating";
    const reviewStr = `${reviews.length} review(s)`;
    console.log(`OK (${ratingStr}, ${reviewStr})`);
    successCount++;

    await new Promise((r) => setTimeout(r, 300));
  }

  cache._generatedAt = new Date().toISOString();

  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n", "utf-8");

  console.log(`\n✅  Done — ${successCount} OK, ${errorCount} failed.`);
  console.log(`   Wrote: src/data/places-cache.json`);
  if (errorCount > 0) {
    console.log(`   Run again to retry failed locations.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
