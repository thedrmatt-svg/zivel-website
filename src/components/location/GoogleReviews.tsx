"use client";

import React, { useEffect, useState } from "react";

type Review = {
  author_name: string;
  rating: number;
  relative_time_description?: string;
  text?: string;
};

type ReviewsResponse = {
  ok: boolean;
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: Review[];
  error?: string;
};

export default function GoogleReviews({
  placeId,
  locationLabel,
}: {
  placeId?: string;
  locationLabel: string;
}): React.ReactElement {
  const [data, setData] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId ?? "")}`);
        const json = (await res.json()) as ReviewsResponse;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setData({ ok: false, error: "Failed to load reviews." });
      }
    }

    if (!placeId) {
      setData({ ok: false, error: "Place ID not set for this location yet." });
      return;
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [placeId]);

  return (
    <div className="rounded-2xl border-subtle bg-card p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="mb-1">Google Reviews</h2>
          <p className="text-white/70">Reviews for {locationLabel}</p>
        </div>
        {data?.ok ? (
          <div className="text-sm text-white/70">
            <span className="text-white/90 font-semibold">{data.rating?.toFixed(1)}</span> ★ (
            {data.user_ratings_total ?? 0})
          </div>
        ) : null}
      </div>

      {!data ? (
        <div className="mt-6 text-white/60">Loading reviews…</div>
      ) : !data.ok ? (
        <div className="mt-6 text-white/60">Reviews unavailable: {data.error ?? "Unknown error"}</div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(data.reviews ?? []).slice(0, 6).map((r, idx) => (
            <figure key={`${r.author_name}-${idx}`} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <figcaption className="text-white/80 font-semibold">{r.author_name}</figcaption>
                <span className="text-white/70">{r.rating}★</span>
              </div>
              <p className="mt-3 text-sm text-white/70">{r.text ?? "Review text not available."}</p>
              {r.relative_time_description ? (
                <p className="mt-3 text-xs text-white/50">{r.relative_time_description}</p>
              ) : null}
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
