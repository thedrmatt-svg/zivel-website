import type { Metadata } from "next";
import Image from "next/image";
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

const SERVICE_IMAGES: Record<string, string> = {
  "cryotherapy":             "/images/home/service-cryo.jpg",
  "whole-body-cryotherapy":  "/images/home/service-cryo.jpg",
  "red-light-therapy":       "/images/home/service-redlight.jpg",
  "infrared-sauna":          "/images/home/service-sauna.jpg",
  "dry-float":               "/images/home/service-dryfloat.jpg",
  "compression-therapy":     "/images/home/service-compression.jpg",
  "normatec":                "/images/home/service-compression.jpg",
  "cryo-slimming":           "/images/home/service-slimming.jpg",
  "cryo-toning":             "/images/services/cryo-toning/hero.avif",
  "cryo-lift-facial":        "/images/services/cryo-lift-facial/hero.avif",
  "cryolift-facial":         "/images/services/cryo-lift-facial/hero.avif",
  "cryo-soothe":             "/images/home/service-cryosoothe.avif",
  "cryosoothe":              "/images/home/service-cryosoothe.avif",
};
const FALLBACK_SERVICE_IMAGE = "/images/home/service-exercise.jpg";

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "cryotherapy":             "Whole-body cold exposure therapy",
  "whole body cryotherapy":  "Full-body cryogenic recovery",
  "red light therapy":       "Cellular repair & tissue renewal",
  "infrared sauna":          "Deep-heat detox & relaxation",
  "dry float":               "Zero-gravity decompression & rest",
  "compression therapy":     "Sequential pressure recovery massage",
  "oxygen therapy":          "Purified oxygen inhalation boost",
  "normatec":                "Dynamic pneumatic compression",
  "cryo slimming":           "Targeted cold fat reduction",
  "cryo toning":             "Cold-assisted muscle sculpting",
  "cryolift facial":         "Anti-aging cryo lift facial",
  "cryo lift facial":        "Anti-aging cryo lift facial",
  "cryo soothe":             "Targeted inflammation reduction",
  "cryosoothe":              "Targeted inflammation reduction",
};

function nameToSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function getServiceImage(name: string) {
  return SERVICE_IMAGES[nameToSlug(name)] ?? FALLBACK_SERVICE_IMAGE;
}
function getServiceDesc(name: string) {
  return SERVICE_DESCRIPTIONS[name.toLowerCase()] ?? "";
}

const MEMBERSHIP_LINKS: Record<string, string> = {
  essential: "https://app.clubready.com/JoinUs/14831/642900",
  gold: "https://app.clubready.com/JoinUs/14831/642907",
  elite: "https://app.clubready.com/JoinUs/14831/642913",
};

const NAV_ITEMS = [
  { label: "Memberships", href: "#memberships" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Specials", href: "#specials" },
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
  const phone = location.contact?.phone;

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
    (p) => !recoveryPrices.includes(p) && !premiumPrices.includes(p)
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

  const metaDescription = `View local pricing, membership tiers, and current offers at ${location.name}. Cryotherapy, red light therapy, infrared sauna, CryoLift facial, and more.`;

  return (
    <main className="space-y-0">
      <meta name="description" content={metaDescription} />
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

      {/* SECTION NAV */}
      <nav
        aria-label="Pricing sections"
        className="zv-bleed sticky top-[64px] z-10 border-b border-white/8 bg-black/90 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-6">
          <ol className="flex items-center gap-0 overflow-x-auto">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href} className="flex items-center shrink-0">
                {i > 0 && (
                  <span className="h-3.5 w-px bg-white/15 mx-1" aria-hidden="true" />
                )}
                <a
                  href={item.href}
                  className="group flex items-center gap-1.5 px-4 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors duration-200 hover:text-[var(--zivel-gold)]"
                >
                  <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]/0 transition-colors duration-200 group-hover:bg-[var(--zivel-gold)]" />
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* GATED CONTENT */}
      <section className="zv-bleed zv-section-elevated py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <PricingGateModal citySlug={location.citySlug} cityDisplay={cityDisplay}>
            <div className="space-y-20">

              {/* ── MEMBERSHIPS ── */}
              <div id="memberships" className="scroll-mt-36">
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
                          href={MEMBERSHIP_LINKS[tier.name.toLowerCase()] ?? bookingUrl}
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
                <p className="mt-6 text-sm text-white/55 italic">
                  Memberships renew monthly. Cancel anytime. Contact the studio for terms.
                </p>
              </div>

              {/* ── SERVICES ── */}
              <div id="services" className="scroll-mt-36">
                {recoveryPrices.length > 0 && (
                  <div>
                    <ScrollReveal variant="fade-up">
                      <p className="zv-tagline mb-3">Single Sessions</p>
                      <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                        Recovery & Longevity Services
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" delay={80}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {recoveryPrices.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={getServiceImage(s.name)}
                                alt={s.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white/85 text-sm leading-tight">{s.name}</div>
                              <div className="text-xs text-white/55 mt-0.5">{getServiceDesc(s.name)}</div>
                            </div>
                            <div className="font-semibold text-white shrink-0 text-sm">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>
                )}

                {premiumPrices.length > 0 && (
                  <div className={recoveryPrices.length > 0 ? "mt-14" : ""}>
                    <ScrollReveal variant="fade-up">
                      <p className="zv-tagline mb-3">Aesthetics & Body</p>
                      <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                        Premium & Anti-Aging Services
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" delay={80}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {premiumPrices.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-center gap-4 rounded-xl border border-[var(--zivel-gold)]/15 bg-[var(--zivel-gold)]/[0.04] px-4 py-3"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={getServiceImage(s.name)}
                                alt={s.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white/85 text-sm leading-tight">{s.name}</div>
                              <div className="text-xs text-white/55 mt-0.5">{getServiceDesc(s.name)}</div>
                            </div>
                            <div className="font-semibold text-white shrink-0 text-sm">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                    <p className="mt-4 text-sm text-white/55 italic">
                      Premium services recommended as a series for best results. Package pricing available — ask the studio.
                    </p>
                  </div>
                )}

                {otherPrices.length > 0 && (
                  <div className="mt-14">
                    <ScrollReveal variant="fade-up">
                      <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                        Additional Services
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal variant="fade-up" delay={80}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {otherPrices.map((s) => (
                          <div
                            key={s.name}
                            className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={getServiceImage(s.name)}
                                alt={s.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white/85 text-sm leading-tight">{s.name}</div>
                              <div className="text-xs text-white/55 mt-0.5">{getServiceDesc(s.name)}</div>
                            </div>
                            <div className="font-semibold text-white shrink-0 text-sm">{s.price}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>
                )}
              </div>

              {/* ── PACKAGES ── */}
              <div id="packages" className="scroll-mt-36">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline mb-3">Packages</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                    Session Packages
                  </h2>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={80}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 text-center">
                    <div className="mx-auto max-w-md">
                      <p className="text-white/55 text-sm uppercase tracking-widest font-semibold mb-3">
                        Coming Soon
                      </p>
                      <p className="font-serif text-xl text-white/70 font-light leading-relaxed mb-6">
                        Multi-session packages and bundle pricing are available — contact the studio directly for current offers.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {phone && (
                          <a
                            href={`tel:${phone.replace(/\D/g, "")}`}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/40 hover:text-white"
                          >
                            {phone}
                          </a>
                        )}
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-6 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                        >
                          Book a Session
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* ── SPECIALS ── */}
              <div id="specials" className="scroll-mt-36">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline mb-3">Limited Time</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight text-white mb-10">
                    Current Specials
                  </h2>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={80}>
                  <div className="rounded-2xl border border-[var(--zivel-gold)]/15 bg-[var(--zivel-gold)]/5 p-8 md:p-12 text-center">
                    <div className="mx-auto max-w-md">
                      <p className="text-[var(--zivel-gold)] text-sm uppercase tracking-widest font-semibold mb-3">
                        Check Back Soon
                      </p>
                      <p className="font-serif text-xl text-white/70 font-light leading-relaxed mb-6">
                        Promotions and seasonal specials rotate regularly. Reach out to the studio or follow us on social media for the latest offers.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {phone && (
                          <a
                            href={`tel:${phone.replace(/\D/g, "")}`}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/70 transition-all duration-200 hover:border-white/40 hover:text-white"
                          >
                            {phone}
                          </a>
                        )}
                        <a
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-6 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                        >
                          Book a Session
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* ── BOOK CTA ── */}
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
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\D/g, "")}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold tracking-wide text-white/80 transition-all duration-200 hover:border-white/40 hover:text-white"
                      >
                        {phone}
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
