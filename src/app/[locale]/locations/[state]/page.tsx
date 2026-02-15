import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { locations } from "@/lib/data/locations";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function generateStaticParams() {
  const states = new Set<string>();
  for (const loc of locations) {
    if (loc.stateSlug) states.add(loc.stateSlug);
  }
  return Array.from(states).map((state) => ({ state }));
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateParam } = await params;
  const state = stateParam.toLowerCase();
  const stateLocations = locations.filter((l) => l.stateSlug === state);

  if (!stateLocations.length) return {};

  const stateName = titleCase(state);

  return {
    title: `${stateName} Locations | Zivel`,
    description: `Find Zivel studios in ${stateName}. View services offered, booking, and local details for each location.`,
    alternates: { canonical: `/locations/${state}` },
  };
}

export default async function StateLocationsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateParam } = await params;
  const state = stateParam.toLowerCase();
  const stateLocations = locations
    .filter((l) => l.stateSlug === state)
    .slice()
    .sort((a, b) => {
      const ac = a.city ?? a.citySlug ?? "";
      const bc = b.city ?? b.citySlug ?? "";
      return ac.localeCompare(bc);
    });

  if (!stateLocations.length) return notFound();

  const stateName = titleCase(state);

  return (
    <div className="space-y-16">
      <section className="section py-14">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm text-white/60">
            <Link href="/locations" className="hover:text-[var(--zivel-gold)]">
              Locations
            </Link>{" "}
            <span className="text-white/40">/</span> {stateName}
          </p>

          <h1>{stateName} Locations</h1>

          <p className="text-white/70">
            Browse cities/neighborhoods in {stateName}. Each location page includes services
            available, booking, local partners, and FAQs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="flex items-end justify-between gap-6">
          <h2>Choose a City</h2>
          <p className="text-sm text-white/60">
            {stateLocations.length} location{stateLocations.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stateLocations.map((loc) => {
            const citySlug = loc.citySlug;
            const cityName = loc.city ?? (citySlug ? titleCase(citySlug) : "Location");

            if (!citySlug) return null;

            return (
              <Link
                key={`${loc.stateSlug}-${citySlug}`}
                href={`/locations/${state}/${citySlug}`}
                className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
              >
                <div className="text-lg font-semibold text-white">{cityName}</div>
                <div className="mt-2 text-sm text-white/60">View location details →</div>
                <div className="mt-4 text-sm font-medium text-white/70 hover:text-[var(--zivel-gold)]">
                  View this location →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section pb-16">
        <div className="rounded-2xl border-subtle bg-card p-8">
          <h2 className="text-xl">Wellness services in {stateName}</h2>
          <p className="mt-3 text-sm text-white/70">
            Explore Zivel locations in {stateName} for modern recovery and performance
            services. Each studio page provides local information, available services, and a
            direct booking experience.
          </p>
        </div>
      </section>
    </div>
  );
}
