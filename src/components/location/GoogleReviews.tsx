type Review = {
  authorAttribution?: { displayName?: string; uri?: string };
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
};

async function fetchFiveStarReviews(placeId: string) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return { reviews: [] as Review[], rating: null as number | null, total: null as number | null, googleUrl: null as string | null };

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`;

  const res = await fetch(url, {
    next: { revalidate: 86400 },
    headers: {
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
    },
  });

  if (!res.ok) return { reviews: [] as Review[], rating: null, total: null, googleUrl: null };

  const data = await res.json();

  const reviews: Review[] = Array.isArray(data?.reviews) ? data.reviews : [];
  const five = reviews.filter((r) => Number(r?.rating) === 5).slice(0, 4);

  return {
    reviews: five,
    rating: typeof data?.rating === "number" ? data.rating : null,
    total: typeof data?.userRatingCount === "number" ? data.userRatingCount : null,
    googleUrl: typeof data?.googleMapsUri === "string" ? data.googleMapsUri : null,
  };
}

export default async function GoogleReviews({
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

  const data = await fetchFiveStarReviews(placeId);

  if (!data.reviews.length) {
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
              {typeof data.rating === "number" && typeof data.total === "number"
                ? ` • Overall ${data.rating.toFixed(1)} (${data.total} ratings)`
                : ""}
            </div>
          </div>

          {data.googleUrl ? (
            <a
              href={data.googleUrl}
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
        {data.reviews.map((r, idx) => (
          <div key={idx} className="rounded-2xl border-subtle bg-card p-6">
            <div className="flex items-baseline justify-between gap-2">
              <div className="font-semibold text-black">
                {r.authorAttribution?.displayName ?? "Google User"}
              </div>
              <div className="text-xs text-black/60">
                {r.relativePublishTimeDescription ?? ""}
              </div>
            </div>

            {r.text?.text ? <p className="mt-3 text-sm text-black/70">{r.text.text}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
