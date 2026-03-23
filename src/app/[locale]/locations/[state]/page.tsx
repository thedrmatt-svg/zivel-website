import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { locations } from "@/lib/data/locations";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({ params }: { params: Promise<{ state: string; locale: string }> }): Promise<Metadata> {
  const { state: stateParam, locale } = await params;
  const state = stateParam.toLowerCase();
  const stateLocations = locations.filter((l) => l.stateSlug === state);

  if (!stateLocations.length) return {};

  const stateName = titleCase(state);
  const basePath = `/locations/${state}`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;

  return {
    title: `${stateName} Locations | Zivel`,
    description: `Find Zivel studios in ${stateName}. View services offered, booking, and local details for each location.`,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
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
    <div className="space-y-0 -mt-20">
      {/* ========== HERO (DARK) ========== */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-30" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <nav className="text-sm text-white/50 mb-6 zv-hero-animate-1">
              <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
              <span className="mx-2">/</span>
              <span className="text-white/70">{stateName}</span>
            </nav>
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">{stateName}</h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
              Browse cities and neighborhoods in {stateName}. Each location page includes services
              available, booking, local partners, and FAQs.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ========== CHOOSE A CITY (LIGHT) ========== */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="flex items-end justify-between gap-6 mb-14">
              <div>
                <p className="zv-tagline">Studios</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">Choose a City</h2>
              </div>
              <p className="text-sm text-black/50 hidden md:block">
                {stateLocations.length} location{stateLocations.length === 1 ? "" : "s"}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stateLocations.map((loc, idx) => {
              const citySlug = loc.citySlug;
              const cityName = loc.city ?? (citySlug ? titleCase(citySlug) : "Location");

              if (!citySlug) return null;

              return (
                <ScrollReveal key={`${loc.stateSlug}-${citySlug}`} variant="fade-up" delay={idx * 80}>
                  <Link
                    href={`/locations/${state}/${citySlug}`}
                    className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">{cityName}</div>
                    <p className="mt-2 text-sm text-black/55">View location details</p>
                    <div className="mt-5 text-sm font-medium text-[var(--zivel-gold-dark)]">
                      View this location →
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
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
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">Wellness Services in {stateName}</h2>
              <p className="text-white/65 text-lg leading-relaxed">
                Explore Zivel locations in {stateName} for modern recovery and performance
                services. Each studio page provides local information, available services, and a
                direct booking experience.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/services" className="zv-btn-luxury zv-btn-gold">
                  View Services
                </Link>
                <Link href="/locations" className="zv-btn-luxury zv-btn-outline">
                  All Locations
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
