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
  variant = "dark",
}: {
  placeId?: string;
  locationName: string;
  variant?: "light" | "dark";
}) {
  const heading    = variant === "light" ? "text-black"     : "text-white";
  const subtext    = variant === "light" ? "text-black/70"  : "text-white/70";
  const link       = variant === "light" ? "text-black"     : "text-white";
  const author     = variant === "light" ? "text-black"     : "text-white";
  const timestamp  = variant === "light" ? "text-black/60"  : "text-white/60";
  const body       = variant === "light" ? "text-black/70"  : "text-white/70";
  const card       = variant === "light" ? "rounded-2xl border border-black/10 bg-white p-6" : "rounded-2xl border border-white/10 bg-white/5 p-6";
  const fallback   = variant === "light" ? "rounded-2xl border border-black/10 bg-white p-6 text-black/70" : "rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70";

  if (!placeId) {
    return <div className={fallback}>Reviews coming soon.</div>;
  }

  const data = getCachedPlace(placeId);

  if (!data || !data.reviews.length) {
    return <div className={fallback}>Reviews coming soon.</div>;
  }

  const fiveStarReviews = data.reviews
    .filter((r) => r.rating === 5)
    .slice(0, 4);

  if (!fiveStarReviews.length) {
    return <div className={fallback}>Reviews coming soon.</div>;
  }

  return (
    <div className="space-y-4">
      <div className={card}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className={`text-lg font-semibold ${heading}`}>5-Star Reviews</div>
            <div className={`text-sm ${subtext}`}>
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
              className={`text-sm underline ${link}`}
            >
              View on Google
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {fiveStarReviews.map((r, idx) => (
          <div key={idx} className={card}>
            <div className="flex items-baseline justify-between gap-2">
              <div className={`font-semibold ${author}`}>
                {r.authorName ?? "Google User"}
              </div>
              <div className={`text-xs ${timestamp}`}>
                {r.relativeTime ?? ""}
              </div>
            </div>
            {r.text ? <p className={`mt-3 text-sm ${body}`}>{r.text}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
