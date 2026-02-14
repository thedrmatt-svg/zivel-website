import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookingWidget from "@/components/booking/BookingWidget";
import GoogleMapEmbed from "@/components/location/GoogleMapEmbed";
import GoogleReviews from "@/components/location/GoogleReviews";
import JobsSection from "@/components/location/JobsSection";
import PartnersSection from "@/components/location/PartnersSection";
import PricingSection from "@/components/location/PricingSection";
import StoreSection from "@/components/location/StoreSection";
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
      <div className="space-y-0">

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden zv-hero-bg zv-noise">
        {location.hero?.image && (
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt={location.name}
              fill
              priority
              sizes="100vw"
              quality={80}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/10" />
          </div>
        )}

        <div className="relative section py-24 zv-glow-gold">
          <div className="max-w-3xl space-y-6">
            <h1>{location.hero?.headline ?? location.name}</h1>
            {location.hero?.subheadline && (
              <p className="text-lg text-white/85">{location.hero.subheadline}</p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#book"
                className="rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black"
              >
                Book Now
              </a>
              <Link
                href="/services"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* SECTION 2 — ABOUT THIS LOCATION (optional) */}
      {location.about && (
        <>
        <section className="section py-20 grid gap-10 md:grid-cols-2 md:items-center zv-section-elevated">
          <div className="space-y-4">
            <h2>{location.about.headline}</h2>
            {location.about.body.map((p, i) => (
              <p key={i} className="text-white/70">{p}</p>
            ))}
          </div>
          <Image
            src={location.about.image}
            alt={`${location.name} interior`}
            width={600}
            height={450}
            className="rounded-2xl object-cover"
          />
        </section>
        <div className="zv-divider-white" />
        </>
      )}

      {/* SECTION — CONTACT INFO (for simple locations) */}
      {location.contact?.address && (
        <>
        <section className="section py-20 zv-section-recessed">
          <h2 className="mb-6">Location Details</h2>
          <div className="rounded-2xl zv-card-glass p-6 space-y-3">
            <p className="text-white/85">{location.contact.address}</p>
            {location.contact.phone && (
              <p>
                <a href={`tel:${location.contact.phone}`} className="text-brand underline">
                  {location.contact.phone}
                </a>
              </p>
            )}
            {location.contact.parking && (
              <p className="text-white/70 text-sm">{location.contact.parking}</p>
            )}
            {location.contact.notes && (
              <p className="text-white/70 text-sm">{location.contact.notes}</p>
            )}
          </div>
        </section>
        <div className="zv-divider-gold" />
        </>
      )}

      {/* SECTION — GOOGLE MAP */}
      <section id="map" className="section py-20">
        <h2 className="mb-6">Find Us</h2>
        <GoogleMapEmbed
          title={`Map for ${location.name}`}
          embedUrl={location.google?.mapEmbedUrl}
          placeId={location.google?.placeId}
          query={location.contact?.address || location.name}
        />
      </section>

      <div className="zv-divider-white" />

      {/* SECTION 3 — SERVICES AVAILABLE */}
      <section className="section py-20 zv-section-warm zv-noise">
        <h2 className="mb-10">Services Available</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {location.services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-2xl zv-card-glass p-6"
            >
              <h3 className="text-lg">{s.name}</h3>
              {s.description && (
                <p className="mt-2 text-sm text-white/70">{s.description}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* SECTION — LOCAL PRICING */}
      <section id="pricing" className="section py-20 zv-section-elevated">
        <h2 className="mb-10">Pricing</h2>
        <PricingSection
          tiers={location.pricing?.membershipTiers}
          standardPrices={location.pricing?.standardPrices}
        />
      </section>

      <div className="zv-divider-white" />

      {/* SECTION — GOOGLE REVIEWS */}
      <section id="reviews" className="section py-20 zv-section-recessed">
        <h2 className="mb-10">What Guests Are Saying</h2>
        <GoogleReviews
          placeId={location.google?.placeId}
          locationName={location.name}
        />
      </section>

      <div className="zv-divider-gold" />

      {/* SECTION 4 — LOCAL OWNERS (optional) */}
      {location.owners && location.owners.length > 0 && (
        <>
        <section className="section py-20 zv-section-elevated">
          <h2 className="mb-10">Meet the Team</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {location.owners.map((o) => (
              <div key={o.name} className="rounded-2xl zv-card-glass p-6">
                <h3 className="text-lg">{o.name}</h3>
                {o.title && <p className="text-sm text-brand">{o.title}</p>}
                {o.bio && <p className="mt-2 text-sm text-white/70">{o.bio}</p>}
              </div>
            ))}
          </div>
        </section>
        <div className="zv-divider-white" />
        </>
      )}

      {/* SECTION — LOCAL PARTNERS */}
      <section id="partners" className="section py-20 zv-section-cool">
        <h2 className="mb-10">Local Partners</h2>
        <PartnersSection partners={location.partners} />
      </section>

      <div className="zv-divider-white" />

      {/* SECTION — LOCAL JOB OFFERS */}
      <section id="jobs" className="section py-20 zv-section-recessed">
        <h2 className="mb-10">Join Our Team</h2>
        <JobsSection jobs={location.jobs} />
      </section>

      <div className="zv-divider-gold" />

      {/* SECTION — STORE */}
      <section id="store" className="section py-20 zv-section-elevated">
        <h2 className="mb-10">Shop</h2>
        <StoreSection items={location.store} />
      </section>

      <div className="zv-divider-gold" />

      {/* SECTION 6 — BOOKING */}
      <section id="book" className="section py-20 rounded-2xl zv-card-glass p-10 zv-glow-gold">
        <h2 className="mb-4">Book Your Session</h2>
        {location.booking?.locationId ? (
          <BookingWidget locationId={location.booking.locationId} />
        ) : location.contact?.phone ? (
          <p className="text-white/70">
            Booking coming soon. Call{" "}
            <a href={`tel:${location.contact.phone}`} className="text-brand underline">
              {location.contact.phone}
            </a>{" "}
            to schedule.
          </p>
        ) : (
          <p className="text-white/70">Booking coming soon.</p>
        )}
      </section>

      <div className="zv-divider-white" />

      {/* SECTION 7 — FAQ (optional) */}
      {faqItems.length > 0 && (
        <>
        <section className="section py-20 zv-section-recessed">
          <h2 className="mb-10">Frequently Asked Questions</h2>
          {faqItems.map((f, i) => (
            <details key={i} className="rounded-2xl zv-card-glass p-6 mb-4">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-3 text-sm text-white/70">{f.a}</p>
            </details>
          ))}
        </section>
        <div className="zv-divider-gold" />
        </>
      )}

      {/* SECTION 8 — FINAL CTA (optional) */}
      {location.finalCTA && (
        <section className="section py-20 rounded-2xl zv-cta-bg p-10">
          <h2>{location.finalCTA.headline}</h2>
          <a
            href="#book"
            className="inline-block mt-6 rounded-xl bg-[var(--zivel-gold)] px-6 py-3 font-semibold text-black"
          >
            Book Your Visit
          </a>
        </section>
      )}

    </div>
    </>
  );
}
