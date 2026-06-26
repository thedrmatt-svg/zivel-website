import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationByPath, locations } from "@/lib/data/locations";
import PricingGateModal from "@/components/location/PricingGateModal";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

const RECOVERY_SERVICES = [
  "Cryotherapy",
  "Whole Body Cryotherapy",
  "Red Light Therapy",
  "Infrared Sauna",
  "Dry Float",
  "Compression Therapy",
  "Oxygen Therapy",
  "NormaTec",
];

const PREMIUM_SERVICES = [
  "Cryo Slimming",
  "Cryo Toning",
  "CryoLift Facial",
  "Cryo Lift Facial",
  "Cryo Soothe",
  "CryoSoothe",
];

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

  const basePath = `/locations/${location.stateSlug}/${location.citySlug}/pricing`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;

  return {
    title: `Pricing & Memberships — ${location.name}`,
    description: `View local pricing, membership tiers, and current offers at ${location.name}. Cryotherapy, red light therapy, infrared sauna, CryoLift facial, and more.`,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

export default async function LocationPricingPage({
  params,
}: {
  params: Promise<{ state: string; city: string; locale: string }>;
}) {
  const { state, city } = await params;
  const location = getLocationByPath(state, city);
  if (!location) notFound();

  const cityDisplay = location.name.replace(/^Zivel\s+/i, "");
  const bookingUrl = `https://zivel.myperformanceiq.com/book-appointment?set_location=${location.booking?.locationId ?? 11417}`;

  const allPrices = location.pricing?.standardPrices ?? [];
  const recoveryPrices = allPrices.filter((p) =>
    RECOVERY_SERVICES.some((name) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    )
  );
  const premiumPrices = allPrices.filter((p) =>
    PREMIUM_SERVICES.some((name) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    )
  );
  const otherPrices = allPrices.filter(
    (p) =>
      !recoveryPrices.includes(p) && !premiumPrices.includes(p)
  );

  const tiers = location.pricing?.membershipTiers ?? [
    {
      name: "Essential",
      price: "$99",
      cadence: "/mo",
      description: "A great entry point for regular recovery.",
      features: ["4 Recovery Sessions/Month", "Good for Beginners"],
      mostPopular: false,
    },
    {
      name: "Gold",
      price: "$139",
      cadence: "/mo",
      description: "More sessions, more value.",
      features: ["8 Recovery Sessions/Month", "Premium Service Discounts"],
      mostPopular: true,
    },
    {
      name: "Elite",
      price: "$199",
      cadence: "/mo",
      description: "The complete Zivel experience.",
      features: ["Unlimited Recovery Services", "Discounts on Premium Services"],
      mostPopular: false,
    },
  ];

  return (
    <main className="space-y-0">
      {/* HERO */}
      <section className="zv-bleed zv-hero-bg zv-noise py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Investment</p>
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-white">
              Pricing & Memberships
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-xl leading-relaxed">
              Local pricing and membership options for Zivel {cityDisplay}.
              Unlock full details below.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={150}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/locations/${location.stateSlug}/${location.citySlug}`}
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                ← Back to {location.name}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GATED CONTENT */}
      <section className="zv-bleed zv-section-elevated py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <PricingGateModal citySlug={location.citySlug} cityDisplay={cityDisplay}>
            <div className="space-y-20">

              {/* MEMBERSHIP TIERS */}
              <div>
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline mb-3">Memberships</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                    Membership Options
                  </h2>
                </ScrollReveal>
                <div className={`grid gap-6 ${tiers.length >= 4 ? "sm:grid-cols-2" : "md:grid-cols-3"}`}>
                  {tiers.map((tier) => (
                    <ScrollReveal key={tier.name} variant="fade-up" delay={80}>
                      <div
                        className={[
                          "rounded-2xl p-7 border bg-white/5 flex flex-col h-full",
                          tier.mostPopular
                            ? "border-[var(--zivel-gold)] ring-1 ring-[var(--zivel-gold)]"
                            : "border-white/10",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="font-semibold text-white/90 text-lg">{tier.name}</div>
                          {tier.mostPopular && (
                            <span className="rounded-full bg-[var(--zivel-gold)] px-3 py-1 text-xs font-semibold text-black shrink-0">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div className="text-3xl font-semibold text-white mb-1">
                          {tier.price}
                          {tier.cadence && (
                            <span className="text-sm font-normal text-white/50"> {tier.cadence}</span>
                          )}
                        </div>
                        {tier.description && (
                          <p className="mt-3 text-sm text-white/60 leading-relaxed">{tier.description}</p>
                        )}
                        {tier.features && tier.features.length > 0 && (
                          <ul className="mt-5 space-y-2 text-sm text-white/70 flex-1">
                            {tier.features.map((f, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-[var(--zivel-gold)] shrink-0">✓</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 block w-full rounded-full border border-[var(--zivel-gold)] py-3 text-center text-sm font-semibold text-[var(--zivel-gold)] transition-all duration-200 hover:bg-[var(--zivel-gold)] hover:text-black"
                        >
                          Join Now
                        </a>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                <p className="mt-6 text-sm text-white/40 italic">
                  Memberships renew monthly. Cancel anytime. Contact the studio for terms.
                </p>
              </div>

              {/* RECOVERY SERVICES */}
              {recoveryPrices.length > 0 && (
                <div>
                  <ScrollReveal variant="fade-up">
                    <p className="zv-tagline mb-3">Single Sessions</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                      Recovery & Longevity Services
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant="fade-up" delay={80}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                      <div className="grid gap-4 md:grid-cols-2">
                        {recoveryPrices.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                          >
                            <div>
                              <div className="text-white/85 font-medium">{s.name}</div>
                              {s.note && <div className="text-xs text-white/45 mt-0.5">{s.note}</div>}
                            </div>
                            <div className="font-semibold text-white shrink-0">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}

              {/* PREMIUM & ANTI-AGING */}
              {premiumPrices.length > 0 && (
                <div>
                  <ScrollReveal variant="fade-up">
                    <p className="zv-tagline mb-3">Aesthetics & Body</p>
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                      Premium & Anti-Aging Services
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant="fade-up" delay={80}>
                    <div className="rounded-2xl border border-[var(--zivel-gold)]/20 bg-[var(--zivel-gold)]/5 p-6 md:p-8">
                      <div className="grid gap-4 md:grid-cols-2">
                        {premiumPrices.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                          >
                            <div>
                              <div className="text-white/85 font-medium">{s.name}</div>
                              {s.note && <div className="text-xs text-white/45 mt-0.5">{s.note}</div>}
                            </div>
                            <div className="font-semibold text-white shrink-0">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                  <p className="mt-4 text-sm text-white/40 italic">
                    Premium services recommended as a series for best results. Package pricing available — ask the studio.
                  </p>
                </div>
              )}

              {/* OTHER PRICES (if any don't fit categories) */}
              {otherPrices.length > 0 && (
                <div>
                  <ScrollReveal variant="fade-up">
                    <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                      Additional Services
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal variant="fade-up" delay={80}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                      <div className="grid gap-4 md:grid-cols-2">
                        {otherPrices.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-baseline justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                          >
                            <div>
                              <div className="text-white/85 font-medium">{s.name}</div>
                              {s.note && <div className="text-xs text-white/45 mt-0.5">{s.note}</div>}
                            </div>
                            <div className="font-semibold text-white shrink-0">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline mb-4">Ready to Start?</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
                    Book Your First Session
                  </h2>
                  <p className="text-white/55 text-base mb-8 max-w-md mx-auto leading-relaxed">
                    Questions about which membership is right for you? Call or text the studio — our team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-8 py-3.5 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                    >
                      Book Appointment
                    </a>
                    {location.contact?.phone && (
                      <a
                        href={`tel:${location.contact.phone.replace(/\D/g, "")}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
                      >
                        {location.contact.phone}
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </PricingGateModal>
        </div>
      </section>
    </main>
  );
}
