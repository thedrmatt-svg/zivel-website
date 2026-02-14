"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

type LocationResult = {
  name: string;
  stateSlug: string;
  citySlug: string;
  state: string;
  city?: string;
  contact?: { address?: string; phone?: string };
  distanceMiles: number;
};

type LocationData = {
  name: string;
  stateSlug: string;
  citySlug: string;
  state: string;
  city?: string;
  contact?: { address?: string; phone?: string };
  geo?: { lat: number; lng: number };
};

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function LocationSearch({ locations }: { locations: LocationData[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");
    setResults(null);

    const isZip = /^\d{5}$/.test(trimmed);

    if (isZip) {
      try {
        const res = await fetch(`https://api.zippopotam.us/us/${trimmed}`);
        if (!res.ok) {
          setError("ZIP code not found. Please try a different one.");
          setLoading(false);
          return;
        }
        const data = await res.json();
        const place = data?.places?.[0];
        if (!place) {
          setError("Could not determine location for this ZIP code.");
          setLoading(false);
          return;
        }
        const userLat = parseFloat(place.latitude);
        const userLng = parseFloat(place.longitude);

        const sorted = locations
          .filter((loc) => loc.geo)
          .map((loc) => ({
            name: loc.name,
            stateSlug: loc.stateSlug,
            citySlug: loc.citySlug,
            state: loc.state,
            city: loc.city,
            contact: loc.contact,
            distanceMiles: haversine(userLat, userLng, loc.geo!.lat, loc.geo!.lng),
          }))
          .filter((loc) => loc.distanceMiles <= 100)
          .sort((a, b) => a.distanceMiles - b.distanceMiles)
          .slice(0, 5);

        if (sorted.length === 0) {
          setError("No locations found within 100 miles. Try a different ZIP code.");
          setLoading(false);
          return;
        }

        setResults(sorted);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    } else {
      const lower = trimmed.toLowerCase();
      const matched = locations
        .filter((loc) => {
          const cityName = (loc.city ?? loc.citySlug.replace(/-/g, " ")).toLowerCase();
          const stateName = loc.state.toLowerCase();
          const locName = loc.name.toLowerCase();
          return (
            cityName.includes(lower) ||
            stateName.includes(lower) ||
            locName.includes(lower)
          );
        })
        .map((loc) => ({
          name: loc.name,
          stateSlug: loc.stateSlug,
          citySlug: loc.citySlug,
          state: loc.state,
          city: loc.city,
          contact: loc.contact,
          distanceMiles: 0,
        }));

      if (matched.length === 0) {
        setError("No locations found. Try a ZIP code or different city name.");
      } else {
        setResults(matched);
      }
    }

    setLoading(false);
  }, [query, locations]);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="location-search">
          Search by city or ZIP
        </label>
        <input
          id="location-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
          placeholder="Enter ZIP code or city name"
          className="h-12 rounded-2xl border border-white/12 bg-black/30 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
        />
        <button
          type="button"
          onClick={search}
          disabled={loading}
          className="h-12 rounded-2xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border-subtle bg-card p-6 text-white/70">
          {error}
        </div>
      ) : null}

      {results ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((loc) => (
            <Link
              key={`${loc.stateSlug}/${loc.citySlug}`}
              href={`/locations/${loc.stateSlug}/${loc.citySlug}`}
              className="rounded-2xl border-subtle bg-card p-6 transition hover:bg-white/[0.06]"
            >
              <div className="font-semibold text-white/90">{loc.name}</div>
              <div className="mt-1 text-sm text-white/60">{loc.state}</div>
              {loc.contact?.address ? (
                <div className="mt-2 text-sm text-white/50">{loc.contact.address}</div>
              ) : null}
              {loc.distanceMiles > 0 ? (
                <div className="mt-3 text-sm font-semibold text-gold">
                  {Math.round(loc.distanceMiles)} miles away
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      ) : !error ? (
        <div className="mt-6 rounded-2xl border-subtle bg-black/40 p-10 text-center text-white/40">
          Enter a ZIP code to find the nearest Zivel locations, or search by city name.
        </div>
      ) : null}
    </div>
  );
}
