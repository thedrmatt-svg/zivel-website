import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BookingWidget from "@/components/booking/BookingWidget";
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

  return (
    <div className="space-y-24">

      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={location.hero.image}
            alt={location.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/10" />
        </div>

        <div className="relative section py-24">
          <div className="max-w-3xl space-y-6">
            <h1>{location.hero.headline}</h1>
            <p className="text-lg text-white/85">{location.hero.subheadline}</p>

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

      {/* SECTION 2 — ABOUT THIS LOCATION */}
      <section className="section grid gap-10 md:grid-cols-2 md:items-center">
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

      {/* SECTION 3 — SERVICES AVAILABLE */}
      <section className="section">
        <h2 className="mb-10">Services Available</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {location.services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-2xl border-subtle bg-card p-6 hover:bg-white/10"
            >
              <h3 className="text-lg">{s.name}</h3>
              <p className="mt-2 text-sm text-white/70">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4 — LOCAL OWNERS */}
      <section className="section">
        <h2 className="mb-10">Meet the Owners</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {location.owners.map((o) => (
            <div key={o.name} className="rounded-2xl border-subtle bg-card p-6">
              <h3 className="text-lg">{o.name}</h3>
              <p className="mt-2 text-sm text-white/70">{o.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — LOCAL PARTNERS */}
      <section className="section">
        <h2 className="mb-10">Local Partners</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {location.partners.map((p) => (
            <div key={p.name} className="rounded-2xl border-subtle bg-card p-6">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-white/60">{p.type}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — BOOKING */}
      <section id="book" className="section rounded-2xl border-subtle bg-card p-10">
        <h2 className="mb-4">Book Your Session</h2>
        <BookingWidget locationId={location.booking.locationId} />
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="section">
        <h2 className="mb-10">Frequently Asked Questions</h2>
        {location.faqs.map((f, i) => (
          <details key={i} className="rounded-2xl border-subtle bg-card p-6 mb-4">
            <summary className="font-semibold cursor-pointer">{f.q}</summary>
            <p className="mt-3 text-sm text-white/70">{f.a}</p>
          </details>
        ))}
      </section>

      {/* SECTION 8 — FINAL CTA */}
      <section className="section bg-black/60 rounded-2xl p-10">
        <h2>{location.finalCTA.headline}</h2>
        <a
          href="#book"
          className="inline-block mt-6 rounded-xl bg-[var(--zivel-gold)] px-6 py-3 font-semibold text-black"
        >
          Book Your Visit
        </a>
      </section>

    </div>
  );
}
