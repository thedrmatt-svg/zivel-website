import placesCache from "@/data/places-cache.json";

type CacheEntry = {
  locationPath: string;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUri: string | null;
  reviews: {
    authorName: string | null;
    authorUri: string | null;
    rating: number | null;
    relativeTime: string | null;
    text: string | null;
  }[];
};

function getCachedPlace(placeId: string): CacheEntry | null {
  const entry = (placesCache as Record<string, unknown>)[placeId];
  if (!entry || typeof entry !== "object") return null;
  return entry as CacheEntry;
}

export default function GoogleReviews({
  placeId,
  locationName,
}: {
  placeId?: string;
  locationName: string;
}) {
  if (!placeId) {
    return (
      <div className="rounded-2xl border-subtle bg-card p-6 text-white/70">
        Reviews coming soon. Add <span className="text-white/85">google.placeId</span> to this location.
      </div>
    );
  }

  const data = getCachedPlace(placeId);

  if (!data || !data.reviews.length) {
    return (
      <div className="rounded-2xl border-subtle bg-card p-6 text-white/70">
        Reviews are temporarily unavailable.
      </div>
    );
  }

  const fiveStarReviews = data.reviews
    .filter((r) => r.rating === 5)
    .slice(0, 4);

  if (!fiveStarReviews.length) {
    return (
      <div className="rounded-2xl border-subtle bg-card p-6 text-white/70">
        Reviews are temporarily unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-subtle bg-card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-black">5-Star Reviews</div>
            <div className="text-sm text-black/70">
              Recent 5-star feedback for {locationName}
              {typeof data.rating === "number" && typeof data.userRatingCount === "number"
                ? ` • Overall ${data.rating.toFixed(1)} (${data.userRatingCount} ratings)`
                : ""}
            </div>
          </div>

          {data.googleMapsUri ? (
            <a
              href={data.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black underline"
            >
              View on Google
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fiveStarReviews.map((r, idx) => (
          <div key={idx} className="rounded-2xl border-subtle bg-card p-6">
            <div className="flex items-baseline justify-between gap-2">
              <div className="font-semibold text-black">
                {r.authorName ?? "Google User"}
              </div>
              <div className="text-xs text-black/60">
                {r.relativeTime ?? ""}
              </div>
            </div>

            {r.text ? <p className="mt-3 text-sm text-black/70">{r.text}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
