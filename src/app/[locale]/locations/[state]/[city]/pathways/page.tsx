import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationByPath, locations } from "@/lib/data/locations";
import { pathways } from "@/lib/data/pathways";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

const PATHWAY_IMAGES: Record<string, string> = {
  "recovery-pain-support":               "/images/home/service-cryo.jpg",
  "body-composition-metabolic-support":  "/images/home/service-slimming.jpg",
  "skin-health-regenerative-aesthetics": "/images/services/cryo-lift-facial/hero.avif",
  "longevity-healthy-aging":             "/images/home/service-redlight.jpg",
  "stress-sleep-reset":                  "/images/home/service-dryfloat.jpg",
  "performance-athletic-optimization":   "/images/home/service-exercise.jpg",
  "mobility-active-lifestyle":           "/images/home/service-compression.jpg",
  "travel-reset-jet-lag-recovery":       "/images/home/service-sauna.jpg",
};

const PATHWAY_ICONS: Record<string, string> = {
  "recovery-pain-support":               "❄️",
  "body-composition-metabolic-support":  "🔥",
  "skin-health-regenerative-aesthetics": "✨",
  "longevity-healthy-aging":             "♾️",
  "stress-sleep-reset":                  "🌊",
  "performance-athletic-optimization":   "⚡",
  "mobility-active-lifestyle":           "🏃",
  "travel-reset-jet-lag-recovery":       "✈️",
};

export function generateStaticParams() {
  return locations.map((loc) => ({
    state: loc.stateSlug,
    city: loc.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; locale: string }>;
}): Promise<Metadata> {
  const { state, city, locale } = await params;
  const location = getLocationByPath(state, city);
  if (!location) return {};

  const cityDisplay = location.name.replace(/^Zivel\s+/i, "");
  const basePath = `/locations/${location.stateSlug}/${location.citySlug}/pathways`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;

  return {
    title: `Wellness Pathways — ${location.name}`,
    description: `Explore goal-based wellness pathways at Zivel ${cityDisplay}. Structured routines combining cryotherapy, red light therapy, sauna, and more — built for recovery, performance, aesthetics, and longevity.`,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default async function LocationPathwaysPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const location = getLocationByPath(state, city);
  if (!location) notFound();

  const cityDisplay = location.name.replace(/^Zivel\s+/i, "");
  const bookingUrl = `https://zivel.myperformanceiq.com/book-appointment?set_location=${location.booking?.locationId ?? 11417}`;
  return (
    <main id="main-content" tabIndex={-1} className="space-y-0 pt-20">

      {/* ── HERO (DARK) ── */}
      <section className="zv-bleed zv-hero-bg zv-noise relative overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-30" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-36">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline zv-hero-animate-1 mb-4">
              {location.name}
            </p>
            <h1 className="zv-hero-animate-2 font-serif text-5xl md:text-6xl font-light tracking-tight text-white">
              Wellness Pathways
            </h1>
            <p className="zv-hero-animate-3 mt-6 max-w-2xl text-lg text-white/65 leading-relaxed">
              Pathways are goal-based wellness routines that combine Zivel&apos;s
              science-backed services into structured, repeatable experiences.
              Each pathway is available at {location.name} — book any service
              individually or follow the full sequence for maximum results.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={160}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
              >
                Book a Session →
              </a>
              <Link
                href={`/locations/${location.stateSlug}/${location.citySlug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:border-[var(--zivel-gold)] hover:text-[var(--zivel-gold)]"
              >
                View Location
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ── PATHWAYS GRID (LIGHT) ── */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-3">Goal-Based Routines</p>
            <h2 className="mb-4 font-serif text-4xl md:text-5xl font-light tracking-tight">
              Choose Your Pathway
            </h2>
            <p className="mb-14 max-w-xl text-base text-black/55 leading-relaxed">
              Each pathway is designed around a specific goal — from pain relief
              and athletic performance to skin health and stress recovery. All
              services are available at {location.name}.
            </p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {pathways.map((pathway, idx) => {
              const img = PATHWAY_IMAGES[pathway.slug] ?? "/images/home/service-exercise.jpg";
              const icon = PATHWAY_ICONS[pathway.slug] ?? "⚕️";
              return (
                <ScrollReveal key={pathway.slug} variant="fade-up" delay={idx * 70}>
                  <div className="flex flex-col rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md h-full">

                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={img}
                        alt={pathway.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-2xl">{icon}</span>
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-serif text-xl font-light leading-snug text-black/90 mb-3">
                        {pathway.name}
                      </h3>
                      <p className="text-sm text-black/60 leading-relaxed flex-1 mb-3">
                        {pathway.seo.description}
                      </p>
                      <p className="text-xs text-black/40 italic mb-6">
                        {pathway.hero.subheadline}
                      </p>

                      {/* Key services */}
                      <div className="mb-6">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--zivel-gold-dark)]">
                          Services in this pathway
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {pathway.services.orderedServiceSlugs.slice(0, 4).map((slug) => (
                            <span
                              key={slug}
                              className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-medium text-black/60 capitalize"
                            >
                              {slug.replace(/-/g, " ")}
                            </span>
                          ))}
                          {pathway.services.orderedServiceSlugs.length > 4 && (
                            <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-medium text-black/40">
                              +{pathway.services.orderedServiceSlugs.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-black/[0.07]">
                        <Link
                          href={`/pathways/${pathway.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--zivel-gold)] px-5 py-2.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                        >
                          Learn More →
                        </Link>
                        <button
                          disabled
                          aria-label="Thorne Supplements — Coming Soon"
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold tracking-wide text-black/35 cursor-not-allowed select-none"
                        >
                          Thorne Supplements
                          <span className="rounded-full bg-black/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-black/40">
                            Soon
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT IS A PATHWAY (DARK) ── */}
      <section className="zv-bleed zv-section-gradient zv-immersive-section">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <p className="zv-tagline mb-4">How It Works</p>
                <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-6">
                  What is a Pathway?
                </h2>
                <p className="text-white/65 leading-relaxed mb-4">
                  A Pathway is a curated combination of Zivel services ordered
                  around a specific wellness goal. Instead of choosing services
                  one-off, a pathway gives you a clear, repeatable routine with
                  sessions that work together.
                </p>
                <p className="text-white/65 leading-relaxed">
                  You can follow a pathway at your own pace — each service can
                  be booked individually or as part of a membership — and adjust
                  frequency based on your schedule and goals.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { n: "8", label: "Goal-Based\nPathways" },
                  { n: "6+", label: "Services Per\nPathway" },
                  { n: "100%", label: "Available\nAt This Location" },
                  { n: "∞", label: "Repeatable\nResults" },
                ].map((s) => (
                  <div key={s.label} className="zv-card-glass rounded-2xl p-6 text-center">
                    <div className="font-serif text-3xl font-light text-[var(--zivel-gold)]">{s.n}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/55 whitespace-pre-line">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* ── BOTTOM CTA (LIGHT) ── */}
      <section className="zv-bleed zv-section-light zv-light py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Ready to Start?</p>
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-6">
              Begin Your Pathway at {location.name}
            </h2>
            <p className="text-black/55 leading-relaxed mb-10 max-w-lg mx-auto">
              Book any service individually or speak with our team about building
              a routine that fits your goals, schedule, and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
              >
                Book a Session →
              </a>
              <Link
                href="/pathways"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-black/70 transition-all duration-200 hover:border-[var(--zivel-gold-dark)] hover:text-[var(--zivel-gold-dark)]"
              >
                View All Pathways
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
