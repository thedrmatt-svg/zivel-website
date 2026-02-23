import type { Metadata } from "next";
import Link from "next/link";

import { locations } from "@/lib/data/locations";
import LocationsMap from "@/components/location/LocationsMap";
import ScrollReveal from "@/components/ui/ScrollReveal";

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
    <div className="space-y-0 -mt-20">
      {/* ========== HERO (DARK) ========== */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline zv-hero-animate-1">Studio Network</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">Locations</h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
              Browse by state to find your nearest Zivel studio. Each location page includes
              services offered, booking, local partners, and FAQs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== MAP (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">Find a Studio</p>
            <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Our Locations</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <LocationsMap
              locations={locations
                .filter((loc) => loc.geo)
                .map((loc) => ({
                  name: loc.name,
                  address: loc.contact?.address ?? "",
                  phone: loc.contact?.phone ?? "",
                  lat: loc.geo!.lat,
                  lng: loc.geo!.lng,
                  href: `/locations/${loc.stateSlug}/${loc.citySlug}`,
                }))}
            />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== BROWSE BY STATE (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="flex items-end justify-between gap-6 mb-14">
              <div>
                <p className="zv-tagline">Explore</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">Browse by State</h2>
              </div>
              <p className="text-sm text-black/50 hidden md:block">
                {locations.length} location{locations.length === 1 ? "" : "s"} nationwide
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((s, idx) => (
              <ScrollReveal key={s.stateSlug} variant="fade-up" delay={idx * 80}>
                <Link
                  href={`/locations/${s.stateSlug}`}
                  className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{s.stateName}</div>
                  <p className="mt-2 text-sm text-black/55">
                    {s.count} studio{s.count === 1 ? "" : "s"}
                  </p>
                  <div className="mt-5 text-sm font-medium text-[var(--zivel-gold-dark)]">
                    View locations →
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== CTA (DARK) ========== */}
      <section className="zv-bleed relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 zv-glow-gold opacity-15" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <ScrollReveal variant="scale">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">Modern Wellness, Built for Real Life</h2>
              <p className="text-white/65 text-lg leading-relaxed">
                Zivel studios combine science-backed services and personalized guidance in a
                premium, calming environment. Visit a location page to see the services offered,
                what to expect, and how to book.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/services" className="zv-btn-luxury zv-btn-gold">
                  View Services
                </Link>
                <Link href="/pathways" className="zv-btn-luxury zv-btn-outline">
                  Explore Pathways
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
