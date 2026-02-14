import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { scienceArticles } from "@/lib/data/science";
import { locations } from "@/lib/data/locations";
import HomePathwaysSection from "@/components/sections/HomePathwaysSection";
import LocationSearch from "@/components/sections/LocationSearch";

export const metadata: Metadata = {
  title: "Zivel | Wellness & Recovery",
  description:
    "Zivel is modern wellness technology—delivered in calm, premium studios—with evidence-informed services designed to support recovery, performance, and daily well-being.",
  alternates: { canonical: "/" },
};

type SectionKey =
  | "booking"
  | "services"
  | "pathways"
  | "locations"
  | "about"
  | "social-proof"
  | "science";

const navItems: Array<{ key: SectionKey; label: string; href: string }> = [
  { key: "booking", label: "Book", href: "#book" },
  { key: "services", label: "Services", href: "#services" },
  { key: "pathways", label: "Pathways", href: "#pathways" },
  { key: "locations", label: "Locations", href: "#locations" },
  { key: "about", label: "About", href: "#about" },
  { key: "social-proof", label: "Reviews", href: "#reviews" },
  { key: "science", label: "Science", href: "#science" },
];

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredArticles = scienceArticles.slice(0, 3);

  return (
    <main className="space-y-0">
      {/* HERO */}
      <section id="top" className="zv-bleed zv-hero-bg zv-noise py-20 md:py-28" aria-labelledby="home-hero-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <header className="lg:col-span-7">
              <p className="mb-4 text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">
                Zivel Wellness
              </p>

              <h1 id="home-hero-title" className="mb-6">
                Feel better. Recover smarter.
              </h1>

              <p className="max-w-2xl text-lg text-white/80">
                Zivel is modern wellness technology—delivered in calm, premium studios—with evidence-informed services designed to support recovery, performance, and daily well-being.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Book Now
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Explore Services
                </a>
              </div>

              <nav className="mt-10" aria-label="Homepage quick navigation">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <a
                        className="underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white/40"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <ul className="mt-10 grid gap-3 sm:grid-cols-3" aria-label="Key highlights">
                {[
                  "Personalized guidance",
                  "Clean, consistent studios",
                  "Results you can feel",
                ].map((t) => (
                  <li
                    key={t}
                    className="zv-card-glass rounded-2xl p-4 text-sm text-white/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </header>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent flex items-center justify-center text-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                Hero Media Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* BOOKING WIDGET */}
      <section id="book" className="zv-bleed zv-section-elevated py-20" aria-labelledby="home-booking-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl zv-card-glass p-6 md:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="home-booking-title" className="mb-4">
                Book Your Session
              </h2>
              <p className="mb-8 text-white/70">
                Choose your location, select a service, and pick a time that works for you.
              </p>
            </div>

            <div className="h-[560px] w-full rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-white/40">
              Booking Widget Placeholder (iframe will go here)
            </div>

            <p className="mt-4 text-center text-sm text-white/60">
              If the booking form does not load,{" "}
              <Link href="/locations" className="underline decoration-white/20 underline-offset-4 hover:decoration-white/40">
                find a location
              </Link>{" "}
              to book directly.
            </p>
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-white" />

      {/* SERVICES */}
      <section id="services" className="zv-bleed zv-section-gradient zv-noise py-20" aria-labelledby="home-services-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="home-services-title" className="mb-2">
                Signature Services
              </h2>
              <p className="text-white/70">
                Choose a single session or build a routine. Each service is designed to work on its own—and even better together.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              aria-label="View all services"
            >
              View All Services
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <article key={service.slug} className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5">
                <header className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                </header>
                <p className="text-sm text-white/70 line-clamp-2">
                  {service.hero.subheadline}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm font-semibold text-[var(--zivel-gold)] underline decoration-[var(--zivel-gold)]/20 underline-offset-4 hover:decoration-[var(--zivel-gold)]/60"
                  >
                    Learn more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* PATHWAYS */}
      <div className="zv-bleed zv-section-recessed py-20">
        <div className="mx-auto max-w-6xl px-4">
          <HomePathwaysSection />
        </div>
      </div>

      <div className="zv-bleed zv-divider-white" />

      {/* LOCATIONS */}
      <section id="locations" className="zv-bleed zv-section-elevated zv-noise py-20" aria-labelledby="home-locations-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="home-locations-title" className="mb-2">
                Find a Zivel Near You
              </h2>
              <p className="text-white/70">
                Visit a studio near you and book in minutes. Every location delivers the same premium experience—designed to feel calm, modern, and consistent.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              aria-label="Browse all locations"
            >
              Browse Locations
            </Link>
          </div>

          <div className="mt-8">
            <LocationSearch
              locations={locations.map((loc) => ({
                name: loc.name,
                stateSlug: loc.stateSlug,
                citySlug: loc.citySlug,
                state: loc.state,
                city: loc.city,
                contact: loc.contact,
                geo: loc.geo,
              }))}
            />
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* ABOUT ZIVEL (Preview Strip) */}
      <section id="about" className="zv-bleed zv-section-gradient py-20" aria-labelledby="home-about-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 rounded-2xl zv-cta-bg p-6 md:grid-cols-12 md:p-8 md:items-center">
            <div className="md:col-span-7">
              <h2 id="home-about-title" className="mb-3">
                About Zivel
              </h2>
              <p className="text-white/70">
                Zivel brings modern wellness technology to local communities through a network of independently operated studios. We focus on evidence-informed modalities, clean environments, and personalized guidance—so you can feel better and recover smarter.
              </p>
              <div className="mt-6">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="aspect-[16/10] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent flex items-center justify-center text-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                About Media Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-white" />

      {/* SOCIAL PROOF */}
      <section id="reviews" className="zv-bleed zv-section-warm zv-noise py-20" aria-labelledby="home-social-proof-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <h2 id="home-social-proof-title" className="mb-2">
              What Clients Say
            </h2>
            <p className="text-white/70">
              Real feedback from people who have made Zivel part of their routine.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { quote: "I feel more recovered after every session. The staff makes the experience easy and comfortable.", name: "Sarah M.", city: "Nashville, TN" },
              { quote: "The combination of cryotherapy and red light has become my go-to recovery routine.", name: "Marcus T.", city: "Denver, CO" },
              { quote: "Clean, calm, and consistent—exactly what I was looking for in a wellness studio.", name: "Emily R.", city: "Atlanta, GA" },
            ].map((t) => (
              <figure key={t.name} className="rounded-2xl zv-card-glass p-6">
                <blockquote className="text-sm text-white/80 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-xs">
                  <span className="font-semibold text-white">— {t.name}</span>
                  <span className="text-white/50">, {t.city}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* SCIENCE & RECOVERY HUB PREVIEW */}
      <section id="science" className="zv-bleed zv-section-cool zv-noise py-20" aria-labelledby="home-science-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="home-science-title" className="mb-2">
                Science-Informed, Studio-Ready
              </h2>
              <p className="text-white/70">
                Explore clear, evidence-informed articles that explain how these modalities are studied—and how to use them as part of a consistent routine.
              </p>
            </div>

            <Link
              href="/science"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Explore the Science Hub
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article) => (
              <article key={article.slug} className="rounded-2xl zv-card-glass p-6 transition-all duration-300 hover:-translate-y-0.5">
                <div className="mb-4 aspect-[16/9] w-full rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent flex items-center justify-center text-white/40">
                  Article Thumbnail
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  {article.title}
                </h3>
                <p className="text-sm text-white/70 line-clamp-2">
                  {article.description}
                </p>
                <div className="mt-5">
                  <Link
                    href={`/science/${article.slug}`}
                    className="text-sm font-semibold text-[var(--zivel-gold)] underline decoration-[var(--zivel-gold)]/20 underline-offset-4 hover:decoration-[var(--zivel-gold)]/60"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* FINAL CTA STRIP */}
      <section className="zv-bleed zv-glow-gold py-20" aria-labelledby="home-final-cta-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-2xl zv-cta-bg p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <h2 id="home-final-cta-title" className="mb-2">
                  Ready to feel the difference?
                </h2>
                <p className="text-white/70">
                  Book a session today—or build a routine with memberships designed for consistency.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Book Now
                </a>
                <Link
                  href="/memberships"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  View Memberships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
