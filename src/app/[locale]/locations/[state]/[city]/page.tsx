import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import BookingWidget from "@/components/booking/BookingWidget";
import ContactForm from "@/components/location/ContactForm";
import GoogleMapEmbed from "@/components/location/GoogleMapEmbed";
import GoogleReviews from "@/components/location/GoogleReviews";
// import JobsSection from "@/components/location/JobsSection"; // hidden until ready
// import PartnersSection from "@/components/location/PartnersSection"; // hidden until ready
import PricingSection from "@/components/location/PricingSection";
// import StoreSection from "@/components/location/StoreSection"; // hidden until ready
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceImageCard from "@/components/location/ServiceImageCard";
import { getLocationByPath, locations } from "@/lib/data/locations";
import { getLocalServiceHref } from "@/lib/data/local-service-pages";
import { getLocationSocial } from "@/lib/data/socialLinks";
import rawPlacesCache from "@/data/places-cache.json";

type CacheEntry = { rating: number; userRatingCount: number };

function getCacheEntry(placeId: string | undefined): CacheEntry | null {
  if (!placeId) return null;
  const entry = (rawPlacesCache as Record<string, unknown>)[placeId];
  if (entry && typeof entry === "object" && "rating" in entry && "userRatingCount" in entry) {
    return entry as CacheEntry;
  }
  return null;
}

function buildTrustBar(location: import("@/types/location").Location, cityDisplay: string): { stat: string; label: string }[] {
  const cached = getCacheEntry(location.google?.placeId);
  const yr = location.openedYear ?? 2023;
  if (cached && cached.userRatingCount > 0) {
    const n = cached.userRatingCount;
    const countLabel = n >= 200 ? "200+" : n >= 100 ? `${Math.floor(n / 10) * 10}+` : `${n}+`;
    const ratingLabel = cached.rating === 5 ? "5.0" : cached.rating.toFixed(1);
    return [
      { stat: countLabel, label: `${ratingLabel}-Star Reviews` },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: `Since ${yr}`, label: `Serving ${cityDisplay}` },
    ];
  }
  return [
    { stat: "200+", label: "5.0-Star Reviews" },
    { stat: "1,000s", label: "Sessions Delivered" },
    { stat: `Since ${yr}`, label: `Serving ${cityDisplay}` },
  ];
}

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

  const SITE_URL = "https://www.zivel.com";
  const basePath = `/locations/${location.stateSlug}/${location.citySlug}`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;

  return {
    title: location.seo.title,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const location = getLocationByPath(state, city);
  if (!location) return notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zivel.com";
  const canonicalPath = location.seo?.canonical ?? `/locations/${location.stateSlug}/${location.citySlug}`;
  const canonicalUrl = canonicalPath.startsWith("http") ? canonicalPath : `${SITE_URL}${canonicalPath}`;

  const heroImage = location.hero?.image ?? "/images/home/hero.jpg";
  const cityName = location.city ?? location.citySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const bookingUrl = `https://zivel.myperformanceiq.com/book-appointment?set_location=${location.booking?.locationId ?? 11417}`;
  const trustBar = buildTrustBar(location, cityName);
  const social = getLocationSocial(location.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: location.name,
    description: location.seo.description,
    url: canonicalUrl,
    ...(location.hero?.image && {
      image: location.hero.image.startsWith("http") ? location.hero.image : `${SITE_URL}${location.hero.image}`,
    }),
    ...(location.contact?.phone && { telephone: location.contact.phone }),
    address: {
      "@type": "PostalAddress",
      addressLocality: cityName,
      addressRegion: location.state,
      addressCountry: "US",
    },
    ...(location.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.geo.lat,
        longitude: location.geo.lng,
      },
    }),
    priceRange: "$$",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Locations",
        item: `${SITE_URL}/locations`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: location.state,
        item: `${SITE_URL}/locations/${location.stateSlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityName,
        item: `${SITE_URL}/locations/${location.stateSlug}/${location.citySlug}`,
      },
    ],
  };

  const faqItems = location.faqs || [];
  const faqJsonLd = faqItems.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: String(f.q ?? ""),
      acceptedAnswer: {
        "@type": "Answer",
        text: String(f.a ?? ""),
      },
    })),
  } : null;

  const DEFAULT_MEMBERSHIP_TIERS = [
    {
      name: "Essential",
      price: "$99",
      cadence: "/mo",
      description: "Great entry point for regular recovery.",
      features: [
        "Cryotherapy — $40/session",
        "Red Light Therapy — $40/session",
        "Infrared Sauna — $40/session",
        "Dry Float — $40/session",
        "Compression Therapy — $40/session",
        "Member priority scheduling",
      ],
    },
    {
      name: "Elite",
      price: "$129",
      cadence: "/mo",
      description: "Our most popular — more sessions, more value.",
      features: [
        "All Essential services — $40/session",
        "CryoLift Facial — $150/session",
        "Priority booking",
        "Maximize your outcomes",
      ],
      mostPopular: true,
    },
    {
      name: "Exclusive",
      price: "$169",
      cadence: "/mo",
      description: "The complete Zivel experience.",
      features: [
        "All Elite services — $40/session",
        "Cryo Slimming — $350/session",
        "Cryo Toning — $350/session",
        "Premium scheduling perks",
        "Members save more",
      ],
    },
  ];

  const DEFAULT_STANDARD_PRICES = [
    { name: "Cryotherapy", price: "$40" },
    { name: "Red Light Therapy", price: "$40" },
    { name: "Infrared Sauna", price: "$40" },
    { name: "Dry Float", price: "$40" },
    { name: "Compression Therapy", price: "$40" },
    { name: "CryoLift Facial", price: "$150" },
    { name: "Cryo Slimming", price: "$350" },
    { name: "Cryo Toning", price: "$350" },
  ];

  // Build grouped hours for display
  const ORDERED_DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"] as const;
  type DayKey = "monday"|"tuesday"|"wednesday"|"thursday"|"friday"|"saturday"|"sunday";
  const hoursArray = ORDERED_DAYS.map(day => ({
    day,
    time: location.hours?.[day.toLowerCase() as DayKey] ?? "8:00 AM – 7:00 PM",
  }));
  const groupedHours: { label: string; time: string }[] = [];
  let hi = 0;
  while (hi < hoursArray.length) {
    let hj = hi + 1;
    while (hj < hoursArray.length && hoursArray[hj].time === hoursArray[hi].time) hj++;
    groupedHours.push({
      label: hj - hi === 1 ? hoursArray[hi].day : `${hoursArray[hi].day}–${hoursArray[hj - 1].day}`,
      time: hoursArray[hi].time,
    });
    hi = hj;
  }

  let sectionParity = 0;

  return (
    <>
      <meta name="description" content={location.seo.description} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Google Ads tag — Riverton only (AW-11334656695) */}
      {location.slug === "riverton" && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-11334656695"
            strategy="afterInteractive"
          />
          <Script id="gtag-riverton" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11334656695');
          `}</Script>
        </>
      )}
      <main className="space-y-0 -mt-20">

      {/* ========== HERO (DARK) ========== */}
      <section className="bg-black" style={{ position: 'relative', width: '100vw', left: '50%', transform: 'translateX(-50%)', marginTop: '-5rem' }} aria-labelledby="location-hero-title">
        <div className="pt-20">
          <div style={{ overflow: 'hidden', aspectRatio: '1920/672' }}>
            <Image
              src={heroImage}
              alt={`${location.name} — wellness studio interior`}
              width={1920}
              height={800}
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={80}
              style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-3.333vw' }}
            />
          </div>
        </div>

        <div className="bg-black text-white px-6 pt-6 md:pt-8 pb-6 md:pb-8">
          <div className="mx-auto max-w-6xl">
            {location.hero?.note && (
              <div className="mb-6 zv-hero-animate-1">
                <p className="zv-tagline">{location.hero.note.headline}</p>
                <p className="mt-2 text-base text-white/70 leading-relaxed max-w-2xl">{location.hero.note.body}</p>
              </div>
            )}
            <h1 id="location-hero-title" className="font-serif text-5xl md:text-7xl font-light tracking-tight max-w-4xl zv-hero-animate-2">
              {location.hero?.headline ?? location.name}
            </h1>
            {location.hero?.subheadline && (
              <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-3xl zv-hero-animate-3">{location.hero.subheadline}</p>
            )}

            <div className="flex flex-wrap gap-4 pt-6 zv-hero-animate-4">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="zv-btn-luxury zv-btn-gold">
                Book Now
              </a>
              <Link href="/services" className="zv-btn-luxury zv-btn-outline">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AWARD SECTION ========== */}
      {location.award && (
        <section className="zv-bleed bg-black py-10 md:py-16 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal variant="fade-up">
              <div className="flex justify-center mb-6">
                <span className="zv-tagline" style={{ marginRight: "-0.25em" }}>{location.award.headline}</span>
              </div>
              <div className="mx-auto overflow-hidden rounded-2xl" style={{ maxWidth: 480 }}>
                <Image
                  src={location.award.image}
                  alt={`${location.award.headline} — ${location.name}`}
                  width={960}
                  height={720}
                  sizes="(max-width: 640px) 100vw, 480px"
                  quality={85}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <p className="mt-8 text-white/70 text-lg leading-relaxed">{location.award.body}</p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ========== GRAND OPENING / ANNOUNCEMENT BANNER ========== */}
      {location.announcement && (
        <>
          <section className="zv-bleed bg-[var(--zivel-gold)] text-black py-10 px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-2">{location.announcement.headline}</h2>
              {location.announcement.dates && (
                <p className="text-lg font-semibold mb-4">{location.announcement.dates}</p>
              )}
              <p className="text-base mb-3 opacity-85">{location.announcement.body}</p>
              {location.announcement.cta && (
                <p className="text-base font-bold">{location.announcement.cta}</p>
              )}
            </div>
          </section>
          {location.announcement.buttons && location.announcement.buttons.length > 0 && (
            <section className="zv-bleed bg-black py-10 px-6">
              <div className="mx-auto max-w-3xl">
                <div className="flex flex-wrap justify-center gap-4">
                  {location.announcement.buttons.map((btn) => (
                    <a
                      key={btn.label}
                      href={btn.href}
                      target="_blank"
                      rel="noreferrer"
                      className={btn.variant === "outline"
                        ? "inline-block rounded-full border-2 border-[var(--zivel-gold)] text-[var(--zivel-gold)] px-8 py-4 text-sm font-semibold tracking-wide hover:bg-[var(--zivel-gold)] hover:text-black transition-colors duration-300"
                        : "inline-block rounded-full bg-[var(--zivel-gold)] text-black px-8 py-4 text-sm font-semibold tracking-wide hover:bg-[var(--zivel-gold-light)] transition-colors duration-300"
                      }
                    >
                      {btn.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ========== SPECIAL DEALS (TOP POSITION — just below hero/announcement) ========== */}
      {location.pricing?.specialDeals && location.pricing.specialDeals.length > 0 && location.pricing.specialDealsPosition === "top" && (() => {
        const recoveryDeals = location.pricing!.specialDeals!.filter(d => !d.image);
        const premiumDeals = location.pricing!.specialDeals!.filter(d => d.image);
        return (
          <section className="zv-bleed zv-immersive-section bg-[#0a0a0a]">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">{location.pricing!.specialDealsTagline ?? "Limited Time"}</p>
                <h2 className="mt-3 mb-2 font-serif text-4xl md:text-5xl font-light tracking-tight">Special Deals</h2>
                {location.pricing!.specialDealsExpiry && (
                  <p className="mb-12 text-base text-white/50 italic">Offers expire {location.pricing!.specialDealsExpiry}</p>
                )}
              </ScrollReveal>

              {/* Recovery Specials sub-group — only when premium deals also exist */}
              {recoveryDeals.length > 0 && premiumDeals.length > 0 && (
                <>
                  <ScrollReveal variant="fade-up">
                    <h3 className="mt-10 mb-6 font-serif text-2xl md:text-3xl font-light tracking-tight text-white/80">Recovery Specials</h3>
                  </ScrollReveal>
                  <div className="grid gap-6 md:grid-cols-2">
                    {recoveryDeals.map((deal, idx) => {
                      const isSavingsDollar = deal.savings && /^\$\d+$/.test(deal.savings.trim());
                      const cardClass = [
                        "group block rounded-2xl border transition-all duration-300 overflow-hidden",
                        deal.featured
                          ? "border-[var(--zivel-gold)] bg-white/10 ring-1 ring-[var(--zivel-gold)] shadow-lg shadow-[var(--zivel-gold)]/10"
                          : "border-white/10 bg-white/5",
                        !deal.contactMessage ? "hover:-translate-y-1 hover:bg-white/10 cursor-pointer" : "cursor-default",
                      ].join(" ");
                      const inner = (
                        <>
                          {deal.featured && (
                            <div className="bg-[var(--zivel-gold)] px-6 py-2 text-center text-xs font-bold tracking-widest uppercase text-black">
                              ★ Best Value
                            </div>
                          )}
                          <div className="p-6 flex flex-col h-full">
                            <div className="flex-1">
                              <h4 className="font-serif text-xl font-light leading-snug text-white/90 mb-2">{deal.name}</h4>
                              {deal.benefits && deal.benefits.length > 0 && (
                                <ul className="mt-2 mb-2 space-y-1">
                                  {deal.benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                      <span className="mt-0.5 shrink-0 text-[var(--zivel-gold)]">✓</span>
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {deal.savings && !isSavingsDollar && (
                                <p className="text-sm text-white/50 mt-2 italic">{deal.savings}</p>
                              )}
                            </div>
                            <div className="flex items-baseline gap-2 mt-4 mb-5">
                              <span className="text-2xl font-semibold text-white">{deal.price}</span>
                            </div>
                            {deal.contactMessage ? (
                              <p className="text-sm text-[var(--zivel-gold)] font-medium">{deal.contactMessage}</p>
                            ) : (
                              <span className={[
                                "block w-full rounded-full py-2.5 text-center text-sm font-semibold tracking-wide transition-colors duration-200",
                                deal.featured
                                  ? "bg-[var(--zivel-gold)] text-black group-hover:bg-[var(--zivel-gold-dark)]"
                                  : "border border-[var(--zivel-gold)] text-[var(--zivel-gold)] group-hover:bg-[var(--zivel-gold)] group-hover:text-black",
                              ].join(" ")}>
                                Claim Deal
                              </span>
                            )}
                          </div>
                        </>
                      );
                      return (
                        <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                          {deal.bookingUrl ? (
                            <a href={deal.bookingUrl} target="_blank" rel="noreferrer" className={cardClass}>{inner}</a>
                          ) : (
                            <div className={cardClass}>{inner}</div>
                          )}
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Premium Specials sub-group */}
              {premiumDeals.length > 0 && (
                <>
                  <ScrollReveal variant="fade-up">
                    <h3 className="mt-14 mb-6 font-serif text-2xl md:text-3xl font-light tracking-tight text-white/80">Premium Specials</h3>
                  </ScrollReveal>
                  <div className="grid gap-6 md:grid-cols-3">
                    {premiumDeals.map((deal, idx) => {
                      const premiumCardClass = [
                        "group block rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 overflow-hidden",
                        !deal.contactMessage ? "hover:bg-white/10 hover:-translate-y-1 cursor-pointer" : "cursor-default",
                      ].join(" ");
                      const premiumInner = (
                        <>
                          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                            <Image
                              src={deal.image!}
                              alt={deal.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className={["object-cover transition-transform duration-500", !deal.contactMessage ? "group-hover:scale-105" : ""].join(" ")}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          </div>
                          <div className="p-5 flex flex-col">
                            <h4 className="font-serif text-lg font-light leading-snug text-white/90 mb-1">{deal.name}</h4>
                            {deal.savings && (
                              <p className="text-sm text-white/50 italic mb-3">{deal.savings}</p>
                            )}
                            <div className="flex items-baseline gap-2 mb-4">
                              <span className="text-2xl font-semibold text-white">{deal.price}</span>
                            </div>
                            {deal.contactMessage ? (
                              <p className="text-sm text-[var(--zivel-gold)] font-medium">{deal.contactMessage}</p>
                            ) : (
                              <span className="block w-full rounded-full py-2.5 text-center text-sm font-semibold tracking-wide border border-[var(--zivel-gold)] text-[var(--zivel-gold)] group-hover:bg-[var(--zivel-gold)] group-hover:text-black transition-colors duration-200">
                                Book Package
                              </span>
                            )}
                          </div>
                        </>
                      );
                      return (
                        <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                          {deal.bookingUrl ? (
                            <a href={deal.bookingUrl} target="_blank" rel="noreferrer" className={premiumCardClass}>{premiumInner}</a>
                          ) : (
                            <div className={premiumCardClass}>{premiumInner}</div>
                          )}
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Fallback: flat 3-col grid for locations with no premium (image) deals */}
              {premiumDeals.length === 0 && recoveryDeals.length > 0 && (
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {location.pricing!.specialDeals!.map((deal, idx) => {
                    const isSavingsDollar = deal.savings && /^\$\d+$/.test(deal.savings.trim());
                    return (
                      <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                        <a
                          href={deal.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={[
                            "group block rounded-2xl border hover:-translate-y-1 transition-all duration-300 overflow-hidden",
                            deal.featured
                              ? "border-[var(--zivel-gold)] bg-white/10 ring-1 ring-[var(--zivel-gold)] shadow-lg shadow-[var(--zivel-gold)]/10"
                              : "border-white/10 bg-white/5 hover:bg-white/10",
                          ].join(" ")}
                        >
                          {deal.featured && (
                            <div className="bg-[var(--zivel-gold)] px-6 py-2 text-center text-xs font-bold tracking-widest uppercase text-black">
                              ★ Featured Deal
                            </div>
                          )}
                          <div className="p-6 flex flex-col h-full">
                            <div className="flex-1">
                              <h4 className="font-serif text-xl font-light leading-snug text-white/90 mb-2">{deal.name}</h4>
                              {deal.benefits && deal.benefits.length > 0 && (
                                <ul className="mt-2 mb-2 space-y-1">
                                  {deal.benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                      <span className="mt-0.5 shrink-0 text-[var(--zivel-gold)]">✓</span>
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {deal.savings && !isSavingsDollar && (
                                <p className="text-sm text-white/50 mt-2 italic">{deal.savings}</p>
                              )}
                            </div>
                            <div className="flex items-baseline gap-2 mt-4 mb-5">
                              <span className="text-2xl font-semibold text-white">{deal.price}</span>
                            </div>
                            <span className={[
                              "block w-full rounded-full py-2.5 text-center text-sm font-semibold tracking-wide transition-colors duration-200",
                              deal.featured
                                ? "bg-[var(--zivel-gold)] text-black group-hover:bg-[var(--zivel-gold-dark)]"
                                : "border border-[var(--zivel-gold)] text-[var(--zivel-gold)] group-hover:bg-[var(--zivel-gold)] group-hover:text-black",
                            ].join(" ")}>
                              Claim Deal
                            </span>
                          </div>
                        </a>
                      </ScrollReveal>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* ========== ABOUT THIS LOCATION (LIGHT) ========== */}
      {location.about && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <ScrollReveal variant="fade-left">
                  <div className="space-y-5">
                    <p className="zv-tagline">About</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight">{location.about.headline}</h2>
                    <div className="zv-gold-line-left" />
                    {location.about.body.map((p, i) => (
                      <p key={i} className="text-black/60 text-lg leading-relaxed">{p}</p>
                    ))}
                  </div>
                </ScrollReveal>
                <ScrollReveal variant="fade-right">
                  <Image
                    src={location.about.image}
                    alt={`${location.name} interior`}
                    width={600}
                    height={450}
                    className="rounded-2xl object-cover shadow-lg"
                  />
                </ScrollReveal>
              </div>
            </div>
          </section>
          {(() => { sectionParity = 1; return null; })()}
        </>
      )}

      {/* ========== TRUST BAR ========== */}
      <section
        className="zv-bleed bg-[#0a0a0a] border-y border-white/10"
        style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {trustBar.map((t) => (
              <div key={t.label}>
                <div className="font-serif text-3xl md:text-4xl text-[var(--zivel-gold)] font-light">
                  {t.stat}
                </div>
                <div className="mt-1 text-sm text-white/55 uppercase tracking-widest">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT INFO (alternating) ========== */}
      {location.contact?.address && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          {sectionParity % 2 === 0 ? (
            <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
              <div className="mx-auto max-w-6xl px-6">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline">Visit Us</p>
                  <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Location Details</h2>
                  <div className="zv-luxury-card rounded-2xl p-8 space-y-3">
                    <p className="text-black/80 text-lg">{location.contact.address}</p>
                    {location.contact.phone && (
                      <p><a href={`tel:${location.contact.phone}`} className="text-[var(--zivel-gold-dark)] underline">{location.contact.phone}</a></p>
                    )}
                    {location.contact.email && (
                      <p><a href={`mailto:${location.contact.email}`} className="text-[var(--zivel-gold-dark)] underline">{location.contact.email}</a></p>
                    )}
                    {location.contact.parking && <p className="text-black/55 text-sm">{location.contact.parking}</p>}
                    {location.contact.notes && <p className="text-black/55 text-sm">{location.contact.notes}</p>}
                    <div className="pt-4 border-t border-black/8">
                      <p className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-3">Hours</p>
                      <dl className="space-y-1.5">
                        {groupedHours.map(({ label, time }) => (
                          <div key={label} className="flex items-baseline justify-between gap-6">
                            <dt className="text-sm text-black/60 shrink-0">{label}</dt>
                            <dd className="text-sm text-black/85 font-semibold text-right">{time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    {(social.instagram || social.facebook || social.tiktok) && (
                      <div className="pt-4 border-t border-black/8 flex items-center gap-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-black/60">Follow Us</p>
                        {social.instagram && (
                          <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black/50 hover:text-[var(--zivel-gold-dark)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                          </a>
                        )}
                        {social.facebook && (
                          <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-black/50 hover:text-[var(--zivel-gold-dark)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                          </a>
                        )}
                        {social.tiktok && (
                          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-black/50 hover:text-[var(--zivel-gold-dark)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.11a8.16 8.16 0 0 0 4.77 1.52V7.18a4.85 4.85 0 0 1-1-.49z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          ) : (
            <section className="zv-bleed zv-immersive-section zv-section-elevated">
              <div className="mx-auto max-w-6xl px-6">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline">Visit Us</p>
                  <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Location Details</h2>
                  <div className="zv-luxury-card rounded-2xl p-8 space-y-3">
                    <p className="text-white/85 text-lg">{location.contact.address}</p>
                    {location.contact.phone && (
                      <p><a href={`tel:${location.contact.phone}`} className="text-[var(--zivel-gold)] underline">{location.contact.phone}</a></p>
                    )}
                    {location.contact.email && (
                      <p><a href={`mailto:${location.contact.email}`} className="text-[var(--zivel-gold)] underline">{location.contact.email}</a></p>
                    )}
                    {location.contact.parking && <p className="text-white/60 text-sm">{location.contact.parking}</p>}
                    {location.contact.notes && <p className="text-white/60 text-sm">{location.contact.notes}</p>}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">Hours</p>
                      <dl className="space-y-1.5">
                        {groupedHours.map(({ label, time }) => (
                          <div key={label} className="flex items-baseline justify-between gap-6">
                            <dt className="text-sm text-white/55 shrink-0">{label}</dt>
                            <dd className="text-sm text-white/90 font-semibold text-right">{time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    {(social.instagram || social.facebook || social.tiktok) && (
                      <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Follow Us</p>
                        {social.instagram && (
                          <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-[var(--zivel-gold)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                            </svg>
                          </a>
                        )}
                        {social.facebook && (
                          <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 hover:text-[var(--zivel-gold)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                          </a>
                        )}
                        {social.tiktok && (
                          <a href={social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/50 hover:text-[var(--zivel-gold)] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.11a8.16 8.16 0 0 0 4.77 1.52V7.18a4.85 4.85 0 0 1-1-.49z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}
          {(() => { sectionParity++; return null; })()}
        </>
      )}

      {/* ========== RIVERTON STOREFRONT IMAGE ========== */}
      {location.slug === "riverton" && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          <section className="zv-bleed zv-section-light zv-light py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <ScrollReveal variant="fade-up">
                <div className="flex justify-center">
                  <Image
                    src="/images/locations/riverton/storefront.avif"
                    alt="Zivel Riverton — storefront exterior"
                    width={1400}
                    height={933}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1000px"
                    quality={85}
                    className="rounded-2xl shadow-lg object-cover w-full"
                  />
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

      {/* ========== GOOGLE MAP (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section id="map" className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Directions</p>
              <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Find Us</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <GoogleMapEmbed
                title={location.name}
                placeId={location.google?.placeId}
                query={location.contact?.address}
              />
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <section id="map" className="zv-bleed zv-immersive-section zv-section-recessed">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Directions</p>
              <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Find Us</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <GoogleMapEmbed
                title={location.name}
                placeId={location.google?.placeId}
                query={location.contact?.address}
              />
            </ScrollReveal>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

      {/* ========== SERVICES AVAILABLE (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">What We Offer</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Services Available</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {location.services.map((s, idx) => (
                <ScrollReveal key={s.slug} variant="fade-up" delay={idx * 80}>
                  <ServiceImageCard
                    slug={s.slug}
                    name={s.name}
                    description={s.description}
                    citySlug={location.citySlug}
                    cityName={cityName}
                    variant="light"
                    localHref={getLocalServiceHref(location.stateSlug, location.citySlug, s.slug)}
                    imageAlt={s.imageAlt}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="zv-bleed zv-immersive-section zv-section-elevated">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">What We Offer</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Services Available</h2>
            </ScrollReveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {location.services.map((s, idx) => (
                <ScrollReveal key={s.slug} variant="fade-up" delay={idx * 80}>
                  <ServiceImageCard
                    slug={s.slug}
                    name={s.name}
                    description={s.description}
                    citySlug={location.citySlug}
                    cityName={cityName}
                    variant="dark"
                    localHref={getLocalServiceHref(location.stateSlug, location.citySlug, s.slug)}
                    imageAlt={s.imageAlt}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

      {/* ========== PATHWAYS (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">Goal-Based Wellness</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">Pathways</h2>
                <p className="mt-6 text-lg text-black/60 leading-relaxed max-w-md">
                  Structured wellness plans designed to help you achieve specific goals using our science-backed services — from pain relief and athletic recovery to skin health and longevity.
                </p>
                <div className="mt-10">
                  <Link
                    href={`/locations/${location.stateSlug}/${location.citySlug}/pathways`}
                    className="zv-btn-luxury zv-btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
                  >
                    Explore Local Pathways
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-right" delay={100}>
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/home/about-studio.jpg"
                    alt={`Wellness pathways at ${cityName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ) : (
        <section className="zv-bleed zv-immersive-section zv-section-elevated">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <ScrollReveal variant="fade-right">
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/home/about-studio.jpg"
                    alt={`Wellness pathways at ${cityName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
                </div>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={100}>
                <p className="zv-tagline">Goal-Based Wellness</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">Pathways</h2>
                <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-md">
                  Structured wellness plans designed to help you achieve specific goals using our science-backed services — from pain relief and athletic recovery to skin health and longevity.
                </p>
                <div className="mt-10">
                  <Link
                    href={`/locations/${location.stateSlug}/${location.citySlug}/pathways`}
                    className="zv-btn-luxury zv-btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
                  >
                    Explore Local Pathways
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

      {/* ========== LOCAL BLOG (only when configured) ========== */}
      {location.localBlog && (() => {
        const blog = location.localBlog!;
        const isDark = sectionParity % 2 !== 0;
        return (
          <>
            <div className="zv-bleed zv-divider-dark-to-light" />
            <section className={`zv-bleed zv-immersive-section ${isDark ? "zv-section-elevated" : "zv-section-light zv-light"}`}>
              <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <ScrollReveal variant="fade-right">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src="/images/blog/local-wellness-insights.avif"
                        alt={blog.heading ?? "Local Wellness Insights"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal variant="fade-up">
                    <p className="zv-tagline">From the Team</p>
                    <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">
                      {blog.heading ?? "Local Wellness Insights"}
                    </h2>
                    <p className={`mt-6 text-lg leading-relaxed ${isDark ? "text-white/65" : "text-black/60"}`}>
                      {blog.description}
                    </p>
                    <div className="mt-10">
                      <Link
                        href={blog.href}
                        className="zv-btn-luxury zv-btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
                      >
                        {blog.ctaLabel ?? "Read the Blog"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>
          </>
        );
      })()}
      {location.localBlog && (() => { sectionParity++; return null; })()}

      {/* ========== PRICING (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section id="pricing" className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Investment</p>
              <h2 className="mt-3 mb-4 font-serif text-4xl md:text-5xl font-light tracking-tight">Pricing</h2>
              <div className="mb-12">
                <Link
                  href={`/locations/${location.stateSlug}/${location.citySlug}/pricing`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-8 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                >
                  To see all options for individual or family members, packages, and seasonal deals, click here
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <PricingSection
                tiers={location.citySlug === "fayetteville" ? (location.pricing?.membershipTiers ?? DEFAULT_MEMBERSHIP_TIERS).filter(t => t.mostPopular) : undefined}
                standardPrices={location.pricing?.standardPrices ?? DEFAULT_STANDARD_PRICES}
                variant="light"
              />
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <section id="pricing" className="zv-bleed zv-immersive-section zv-section-gradient">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Investment</p>
              <h2 className="mt-3 mb-4 font-serif text-4xl md:text-5xl font-light tracking-tight">Pricing</h2>
              <div className="mb-12">
                <Link
                  href={`/locations/${location.stateSlug}/${location.citySlug}/pricing`}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--zivel-gold)] px-8 py-4 text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-[var(--zivel-gold-light)]"
                >
                  To see all options for individual or family members, packages, and seasonal deals, click here
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <PricingSection
                tiers={location.citySlug === "fayetteville" ? (location.pricing?.membershipTiers ?? DEFAULT_MEMBERSHIP_TIERS).filter(t => t.mostPopular) : undefined}
                standardPrices={location.pricing?.standardPrices ?? DEFAULT_STANDARD_PRICES}
                variant="dark"
              />
            </ScrollReveal>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}


      {/* ========== SPECIAL DEALS (alternating, only when present) ========== */}
      {location.pricing?.specialDeals && location.pricing.specialDeals.length > 0 && location.pricing.specialDealsPosition !== "top" && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          {sectionParity % 2 === 0 ? (
            <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
              <div className="mx-auto max-w-6xl px-6">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline">Limited Time</p>
                  <h2 className="mt-3 mb-2 font-serif text-4xl md:text-5xl font-light tracking-tight">Special Deals</h2>
                  {location.pricing?.specialDealsExpiry && (
                    <p className="mb-12 text-base text-black/65 italic">Offers expire {location.pricing.specialDealsExpiry}</p>
                  )}
                  {!location.pricing?.specialDealsExpiry && <div className="mb-14" />}
                </ScrollReveal>
                <div className="grid gap-6 md:grid-cols-3">
                  {location.pricing.specialDeals.map((deal, idx) => {
                    const isSavingsDollar = deal.savings && /^\$\d+$/.test(deal.savings.trim());
                    return (
                      <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                        <a
                          href={deal.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={[
                            "group block rounded-2xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden",
                            deal.featured
                              ? "border-[var(--zivel-gold)] bg-white shadow-md ring-1 ring-[var(--zivel-gold)]"
                              : "border-black/10 bg-white shadow-sm",
                          ].join(" ")}
                        >
                          {deal.featured && (
                            <div className="bg-[var(--zivel-gold)] px-6 py-2 text-center text-xs font-bold tracking-widest uppercase text-black">
                              ★ Featured Deal
                            </div>
                          )}
                          <div className="p-6 flex flex-col h-full">
                            {deal.savings && isSavingsDollar && (
                              <div className="mb-4">
                                <span className="rounded-full bg-[var(--zivel-gold)] px-3 py-1 text-xs font-semibold text-black">
                                  Save {deal.savings}
                                </span>
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-serif text-xl font-light leading-snug text-black/90 mb-2">{deal.name}</h3>
                              {deal.benefits && deal.benefits.length > 0 && (
                                <ul className="mt-2 mb-2 space-y-1">
                                  {deal.benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-black/65">
                                      <span className="mt-0.5 shrink-0 text-[var(--zivel-gold)]">✓</span>
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {deal.savings && !isSavingsDollar && (
                                <p className="text-sm text-black/55 mt-2 italic">{deal.savings}</p>
                              )}
                            </div>
                            <div className="flex items-baseline gap-2 mt-4 mb-5">
                              <span className="text-2xl font-semibold text-black">{deal.price}</span>
                              {isSavingsDollar && (
                                <span className="text-sm text-black/55 line-through">
                                  ${(parseInt(deal.price.replace(/\D/g, "")) + parseInt(deal.savings!.replace(/\D/g, ""))).toLocaleString()}
                                </span>
                              )}
                            </div>
                            <span className={[
                              "block w-full rounded-full py-2.5 text-center text-sm font-semibold tracking-wide transition-colors duration-200",
                              deal.featured
                                ? "bg-[var(--zivel-gold)] text-black group-hover:bg-[var(--zivel-gold-dark)] group-hover:text-black"
                                : "bg-black text-white group-hover:bg-[var(--zivel-gold)] group-hover:text-black",
                            ].join(" ")}>
                              Claim Deal
                            </span>
                          </div>
                        </a>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            <section className="zv-bleed zv-immersive-section zv-section-gradient">
              <div className="mx-auto max-w-6xl px-6">
                <ScrollReveal variant="fade-up">
                  <p className="zv-tagline">Limited Time</p>
                  <h2 className="mt-3 mb-2 font-serif text-4xl md:text-5xl font-light tracking-tight">Special Deals</h2>
                  {location.pricing?.specialDealsExpiry && (
                    <p className="mb-12 text-base text-white/50 italic">Offers expire {location.pricing.specialDealsExpiry}</p>
                  )}
                  {!location.pricing?.specialDealsExpiry && <div className="mb-14" />}
                </ScrollReveal>
                <div className="grid gap-6 md:grid-cols-3">
                  {location.pricing.specialDeals.map((deal, idx) => {
                    const isSavingsDollar = deal.savings && /^\$\d+$/.test(deal.savings.trim());
                    return (
                      <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                        <a
                          href={deal.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={[
                            "group block rounded-2xl border hover:-translate-y-1 transition-all duration-300 overflow-hidden",
                            deal.featured
                              ? "border-[var(--zivel-gold)] bg-white/10 ring-1 ring-[var(--zivel-gold)] shadow-lg shadow-[var(--zivel-gold)]/10"
                              : "border-white/10 bg-white/5 hover:bg-white/10",
                          ].join(" ")}
                        >
                          {deal.featured && (
                            <div className="bg-[var(--zivel-gold)] px-6 py-2 text-center text-xs font-bold tracking-widest uppercase text-black">
                              ★ Featured Deal
                            </div>
                          )}
                          <div className="p-6 flex flex-col h-full">
                            {deal.savings && isSavingsDollar && (
                              <div className="mb-4">
                                <span className="rounded-full bg-[var(--zivel-gold)] px-3 py-1 text-xs font-semibold text-black">
                                  Save {deal.savings}
                                </span>
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-serif text-xl font-light leading-snug text-white/90 mb-2">{deal.name}</h3>
                              {deal.benefits && deal.benefits.length > 0 && (
                                <ul className="mt-2 mb-2 space-y-1">
                                  {deal.benefits.map((b, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                                      <span className="mt-0.5 shrink-0 text-[var(--zivel-gold)]">✓</span>
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {deal.savings && !isSavingsDollar && (
                                <p className="text-sm text-white/50 mt-2 italic">{deal.savings}</p>
                              )}
                            </div>
                            <div className="flex items-baseline gap-2 mt-4 mb-5">
                              <span className="text-2xl font-semibold text-white">{deal.price}</span>
                              {isSavingsDollar && (
                                <span className="text-sm text-white/60 line-through">
                                  ${(parseInt(deal.price.replace(/\D/g, "")) + parseInt(deal.savings!.replace(/\D/g, ""))).toLocaleString()}
                                </span>
                              )}
                            </div>
                            <span className={[
                              "block w-full rounded-full py-2.5 text-center text-sm font-semibold tracking-wide transition-colors duration-200",
                              deal.featured
                                ? "bg-[var(--zivel-gold)] text-black group-hover:bg-[var(--zivel-gold-dark)] group-hover:text-black"
                                : "border border-[var(--zivel-gold)] text-[var(--zivel-gold)] group-hover:bg-[var(--zivel-gold)] group-hover:text-black",
                            ].join(" ")}>
                              Claim Deal
                            </span>
                          </div>
                        </a>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
          {(() => { sectionParity++; return null; })()}
        </>
      )}

      {/* ========== LINK CARDS (alternating, only when present) ========== */}
      {location.linkCards && location.linkCards.length > 0 && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          {sectionParity % 2 === 0 ? (
            <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
              <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {location.linkCards.map((card, idx) => (
                    <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-8"
                      >
                        <h3 className="font-serif text-2xl font-light text-black/90 mb-2">{card.title}</h3>
                        {card.price && (
                          <p className="text-2xl font-semibold text-black mb-3">{card.price}</p>
                        )}
                        {card.description && (
                          <p className="text-black/60 text-sm mb-4 flex-1">{card.description}</p>
                        )}
                        <span className="mt-auto inline-block rounded-full bg-black text-white px-8 py-3 text-sm font-semibold tracking-wide text-center group-hover:bg-[var(--zivel-gold)] group-hover:text-black transition-colors duration-200">
                          {card.cta}
                        </span>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="zv-bleed zv-immersive-section zv-section-elevated">
              <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {location.linkCards.map((card, idx) => (
                    <ScrollReveal key={idx} variant="fade-up" delay={idx * 80}>
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 p-8"
                      >
                        <h3 className="font-serif text-2xl font-light text-white/90 mb-2">{card.title}</h3>
                        {card.price && (
                          <p className="text-2xl font-semibold text-white mb-3">{card.price}</p>
                        )}
                        {card.description && (
                          <p className="text-white/55 text-sm mb-4 flex-1">{card.description}</p>
                        )}
                        <span className="mt-auto inline-block rounded-full border border-[var(--zivel-gold)] text-[var(--zivel-gold)] px-8 py-3 text-sm font-semibold tracking-wide text-center group-hover:bg-[var(--zivel-gold)] group-hover:text-black transition-colors duration-200">
                          {card.cta}
                        </span>
                      </a>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          )}
          {(() => { sectionParity++; return null; })()}
        </>
      )}

      {/* ========== REVIEWS (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section id="reviews" className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Client Feedback</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">What Clients Are Saying</h2>
            </ScrollReveal>
            <GoogleReviews placeId={location.google?.placeId} locationName={location.name} variant="light" />
          </div>
        </section>
      ) : (
        <section id="reviews" className="zv-bleed zv-immersive-section zv-section-recessed">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Client Feedback</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">What Clients Are Saying</h2>
            </ScrollReveal>
            <GoogleReviews placeId={location.google?.placeId} locationName={location.name} variant="dark" />
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

      {/* ========== TEAM — hidden until ready ========== */}
      {/* {location.owners && location.owners.length > 0 && ( ... )} */}

      {/* ========== PARTNERS — hidden until ready ========== */}
      {/* Local Partners section hidden */}

      {/* ========== JOBS — hidden until ready ========== */}
      {/* Join Our Team section hidden */}

      {/* ========== STORE — hidden until ready ========== */}
      {/* Shop section hidden */}

      {/* ========== BOOKING (LIGHT — always) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      <section id="book" className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">Reserve</p>
            <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Book Your Session</h2>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="zv-luxury-card rounded-2xl p-10">
              {location.booking?.locationId ? (
                <BookingWidget locationId={location.booking.locationId} />
              ) : location.contact?.phone ? (
                <p className="text-black/60 text-lg">
                  Booking coming soon. Call{" "}
                  <a href={`tel:${location.contact.phone}`} className="text-[var(--zivel-gold-dark)] underline">
                    {location.contact.phone}
                  </a>{" "}
                  to schedule.
                </p>
              ) : (
                <p className="text-black/60 text-lg">Booking coming soon.</p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== FAQ (DARK, optional) ========== */}
      {faqItems.length > 0 && (
        <>
          <div className="zv-bleed zv-divider-dark-to-light" />
          <section className="zv-bleed zv-immersive-section zv-section-gradient">
            <div className="mx-auto max-w-6xl px-6">
              <ScrollReveal variant="fade-up">
                <p className="zv-tagline">Common Questions</p>
                <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Frequently Asked Questions</h2>
              </ScrollReveal>
              <div className="space-y-4">
                {faqItems.map((f, i) => (
                  <ScrollReveal key={i} variant="fade-up" delay={i * 60}>
                    <details className="zv-luxury-card rounded-2xl p-8 group">
                      <summary className="font-serif text-lg cursor-pointer text-white group-open:text-[var(--zivel-gold)] transition-colors">
                        {f.q}
                      </summary>
                      <p className="mt-4 text-white/65 leading-relaxed">{f.a}</p>
                    </details>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ========== CONTACT FORM (DARK) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      <section className="zv-bleed zv-immersive-section zv-section-elevated">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline">Get In Touch</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl font-light tracking-tight">
              Questions or Request? Reach Out!
            </h2>
            {location.contact?.phone && (
              <p className="mt-4 mb-12 text-white/65 text-lg leading-relaxed">
                Ready to start your recovery journey? Call or text us at{" "}
                <a
                  href={`tel:${location.contact.phone}`}
                  className="text-[var(--zivel-gold)] underline hover:text-[var(--zivel-gold-light)] transition-colors"
                >
                  {location.contact.phone}
                </a>
                .
              </p>
            )}
            {!location.contact?.phone && (
              <p className="mt-4 mb-12 text-white/65 text-lg leading-relaxed">
                Ready to start your recovery journey? Fill out the form below and we&apos;ll be in touch.
              </p>
            )}
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <ContactForm
              locationSlug={location.slug}
              locationName={location.name}
              locationPhone={location.contact?.phone ?? ""}
              locationEmail={location.contact?.email}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ========== FINAL CTA (DARK) ========== */}
      {location.finalCTA && (
        <>
          <div className="zv-bleed zv-divider-gold" />
          <section className="zv-bleed relative overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 zv-glow-gold opacity-20" />
            <div className="relative z-10 mx-auto max-w-6xl px-6">
              <ScrollReveal variant="scale">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                  <h2 className="font-serif text-5xl md:text-6xl font-light tracking-tight">{location.finalCTA.headline}</h2>
                  <div className="mt-8">
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="zv-btn-luxury zv-btn-gold">
                      Book Your Visit
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

    </main>
    </>
  );
}
