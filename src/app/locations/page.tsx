import type { Metadata } from "next";
import Link from "next/link";

import { locations } from "@/lib/data/locations";

export const metadata: Metadata = {
  title: "Locations | Zivel",
  description:
    "Find a Zivel studio near you. Browse by state to view local wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, and more.",
  alternates: { canonical: "/locations" },
};

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function LocationsIndexPage() {
  const byState = new Map<string, typeof locations>();

  for (const loc of locations) {
    const stateSlug = loc.stateSlug;
    if (!stateSlug) continue;
    const list = byState.get(stateSlug) ?? [];
    list.push(loc);
    byState.set(stateSlug, list);
  }

  const states = Array.from(byState.entries())
    .map(([stateSlug, locs]) => ({
      stateSlug,
      count: locs.length,
      stateName: titleCase(stateSlug),
    }))
    .sort((a, b) => a.stateName.localeCompare(b.stateName));

  return (
    <div className="space-y-0">
      <section className="zv-bleed zv-hero-bg zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 space-y-4">
          <p className="text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">Studio Network</p>
          <h1>Locations</h1>
          <p className="text-white/70 max-w-2xl">
            Browse by state to find your nearest Zivel studio. Each location page includes
            services offered, booking, local partners, and FAQs.
          </p>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      <section className="zv-bleed zv-section-gradient zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2>Browse by State</h2>
            <p className="text-sm text-white/60">
              {locations.length} location{locations.length === 1 ? "" : "s"} in the registry
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((s) => (
              <Link
                key={s.stateSlug}
                href={`/locations/${s.stateSlug}`}
                className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="text-lg font-semibold text-white">{s.stateName}</div>
                <div className="mt-2 text-sm text-white/70">
                  {s.count} studio{s.count === 1 ? "" : "s"}
                </div>
                <div className="mt-4 text-sm font-medium text-[var(--zivel-gold)]">
                  View locations →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-white" />

      <section className="zv-bleed zv-section-elevated py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl zv-cta-bg p-8">
            <h2 className="text-xl">Modern wellness, built for real life</h2>
            <p className="mt-3 text-sm text-white/70">
              Zivel studios combine science-backed services and personalized guidance in a
              premium, calming environment. Visit a location page to see the services offered,
              what to expect, and how to book.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
