import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookingWidget from "@/components/booking/BookingWidget";
// import GoogleMapEmbed from "@/components/location/GoogleMapEmbed";
// import GoogleReviews from "@/components/location/GoogleReviews";
// import JobsSection from "@/components/location/JobsSection"; // hidden until ready
// import PartnersSection from "@/components/location/PartnersSection"; // hidden until ready
import PricingSection from "@/components/location/PricingSection";
// import StoreSection from "@/components/location/StoreSection"; // hidden until ready
import ScrollReveal from "@/components/ui/ScrollReveal";
import ServiceImageCard from "@/components/location/ServiceImageCard";
import { getLocationByPath, locations } from "@/lib/data/locations";

export function generateStaticParams() {
  return locations.map((loc) => ({
    state: loc.stateSlug,
    city: loc.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const location = getLocationByPath(state, city);
  if (!location) return {};

  return {
    title: location.seo.title,
    description: location.seo.description,
    alternates: {
      canonical: location.seo.canonical,
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

  const heroImage = location.hero?.image ?? "/images/placeholder-location.jpg";
  const cityName = location.city ?? location.citySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

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

  let sectionParity = 0;

  return (
    <>
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
      <div className="space-y-0 -mt-20">

      {/* ========== HERO (DARK) ========== */}
      <section className="bg-black" style={{ position: 'relative', width: '100vw', left: '50%', transform: 'translateX(-50%)', marginTop: '-5rem' }} aria-labelledby="location-hero-title">
        {location.hero?.image && (
          <div className="pt-20">
            <Image
              src={heroImage}
              alt={location.name}
              width={1920}
              height={800}
              priority
              sizes="100vw"
              quality={80}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        <div className="bg-black text-white px-6 pt-6 pb-10 md:pt-8 md:pb-14">
          <div className="mx-auto max-w-6xl">
            <h1 id="location-hero-title" className="font-serif text-5xl md:text-7xl font-light tracking-tight max-w-4xl zv-hero-animate-2">
              {location.hero?.headline ?? location.name}
            </h1>
            {location.hero?.subheadline && (
              <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-3xl zv-hero-animate-3">{location.hero.subheadline}</p>
            )}

            <div className="flex flex-wrap gap-4 pt-6 zv-hero-animate-4">
              <a href="#book" className="zv-btn-luxury zv-btn-gold">
                Book Now
              </a>
              <Link href="/services" className="zv-btn-luxury zv-btn-outline">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                    {location.contact.parking && <p className="text-black/55 text-sm">{location.contact.parking}</p>}
                    {location.contact.notes && <p className="text-black/55 text-sm">{location.contact.notes}</p>}
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
                    {location.contact.parking && <p className="text-white/60 text-sm">{location.contact.parking}</p>}
                    {location.contact.notes && <p className="text-white/60 text-sm">{location.contact.notes}</p>}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )}
          {(() => { sectionParity++; return null; })()}
        </>
      )}

      {/* ========== HOURS (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">When We&apos;re Open</p>
              <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Hours</h2>
              <div className="zv-luxury-card rounded-2xl p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
                    <div key={day} className="flex items-center justify-between border-b border-black/8 pb-3 last:border-b-0 last:pb-0 sm:[&:nth-child(7)]:col-span-2">
                      <span className="text-black/70 font-medium">{day}</span>
                      <span className="text-black/85 font-semibold">8:00 AM – 7:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <section className="zv-bleed zv-immersive-section zv-section-elevated">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">When We&apos;re Open</p>
              <h2 className="mt-3 mb-10 font-serif text-4xl md:text-5xl font-light tracking-tight">Hours</h2>
              <div className="zv-luxury-card rounded-2xl p-8">
                <div className="grid gap-3 sm:grid-cols-2">
                  {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day) => (
                    <div key={day} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0 sm:[&:nth-child(7)]:col-span-2">
                      <span className="text-white/65 font-medium">{day}</span>
                      <span className="text-white/90 font-semibold">8:00 AM – 7:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-white/40 text-sm tracking-wider uppercase">Map disabled during development</div>
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
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-white/40 text-sm tracking-wider uppercase">Map disabled during development</div>
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
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

      {/* ========== PRICING (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section id="pricing" className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Investment</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Pricing</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <PricingSection
                tiers={location.pricing?.membershipTiers ?? DEFAULT_MEMBERSHIP_TIERS}
                standardPrices={location.pricing?.standardPrices ?? DEFAULT_STANDARD_PRICES}
              />
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <section id="pricing" className="zv-bleed zv-immersive-section zv-section-gradient">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Investment</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">Pricing</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <PricingSection
                tiers={location.pricing?.membershipTiers ?? DEFAULT_MEMBERSHIP_TIERS}
                standardPrices={location.pricing?.standardPrices ?? DEFAULT_STANDARD_PRICES}
              />
            </ScrollReveal>
          </div>
        </section>
      )}
      {(() => { sectionParity++; return null; })()}

      {/* ========== REVIEWS (alternating) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" />
      {sectionParity % 2 === 0 ? (
        <section id="reviews" className="zv-bleed zv-section-light zv-light zv-immersive-section">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Client Feedback</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">What Clients Are Saying</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-white/40 text-sm tracking-wider uppercase">Reviews disabled during development</div>
            </ScrollReveal>
          </div>
        </section>
      ) : (
        <section id="reviews" className="zv-bleed zv-immersive-section zv-section-recessed">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal variant="fade-up">
              <p className="zv-tagline">Client Feedback</p>
              <h2 className="mt-3 mb-14 font-serif text-4xl md:text-5xl font-light tracking-tight">What Clients Are Saying</h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-white/40 text-sm tracking-wider uppercase">Reviews disabled during development</div>
            </ScrollReveal>
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
                    <a href="#book" className="zv-btn-luxury zv-btn-gold">
                      Book Your Visit
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </>
      )}

    </div>
    </>
  );
}
