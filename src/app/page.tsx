import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zivel | Wellness & Recovery",
  description:
    "Zivel homepage skeleton. Placeholder sections for hero, booking, services, pathways, locations, about, social proof, science hub, and final CTA.",
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
  return (
    <main className="space-y-24">
      {/* HERO */}
      <section id="top" className="section" aria-labelledby="home-hero-title">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <header className="lg:col-span-7">
              <p className="mb-4 text-sm font-medium tracking-wide text-white/70">
                Zivel Wellness
              </p>

              <h1 id="home-hero-title" className="mb-6">
                Homepage Hero Headline Placeholder
              </h1>

              <p className="max-w-2xl text-lg text-white/80">
                One-sentence value proposition placeholder (recovery / performance / longevity).
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
                  "Highlight placeholder 1",
                  "Highlight placeholder 2",
                  "Highlight placeholder 3",
                ].map((t) => (
                  <li
                    key={t}
                    className="rounded-2xl border-subtle bg-card p-4 text-sm text-white/80"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </header>

            <div className="lg:col-span-5">
              <div className="aspect-[4/5] w-full rounded-2xl border-subtle bg-black/40 flex items-center justify-center text-white/40">
                Hero Media Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING WIDGET */}
      <section id="book" className="section" aria-labelledby="home-booking-title">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border-subtle bg-card p-6 md:p-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="home-booking-title" className="mb-4">
                Booking Section Placeholder
              </h2>
              <p className="mb-8 text-white/70">
                Short booking explainer placeholder (location/service/time).
              </p>
            </div>

            <div className="h-[560px] w-full rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-white/40">
              Booking Widget Placeholder (iframe will go here)
            </div>

            <p className="mt-4 text-center text-sm text-white/60">
              If the booking form does not load,{" "}
              <span className="underline decoration-white/20 underline-offset-4">
                open the booking page
              </span>{" "}
              (placeholder link).
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section" aria-labelledby="home-services-title">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="home-services-title" className="mb-2">
                Services Overview Placeholder
              </h2>
              <p className="text-white/70">
                One-sentence summary placeholder for services grid.
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
            {[
              "Cryotherapy",
              "Red Light Therapy",
              "Infrared Sauna",
              "Dry Float Therapy",
              "Compression Therapy",
              "Premium Cryo Aesthetics",
            ].map((service) => (
              <article key={service} className="rounded-2xl border-subtle bg-card p-6">
                <header className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{service}</h3>
                  <span className="rounded-xl border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/60">
                    Placeholder
                  </span>
                </header>
                <p className="text-sm text-white/70">
                  Brief description placeholder (benefit-driven, 1–2 lines).
                </p>
                <div className="mt-5">
                  <Link
                    href="/services"
                    className="text-sm font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    Learn more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PATHWAYS */}
      <section id="pathways" className="section" aria-labelledby="home-pathways-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="home-pathways-title" className="mb-2">
              Zivel Pathways Placeholder
            </h2>
            <p className="text-white/70">
              Short explanation placeholder for protocol-driven experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["Performance", "Recovery", "Beauty", "Longevity"].map((pathway) => (
              <article key={pathway} className="rounded-2xl border-subtle bg-card p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold">{pathway}</h3>
                <p className="text-sm text-white/70">Pathway description placeholder.</p>
                <div className="mt-5">
                  <a
                    href="/pathways"
                    className="text-sm font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    Explore pathway →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations" className="section" aria-labelledby="home-locations-title">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="home-locations-title" className="mb-2">
                Locations Placeholder
              </h2>
              <p className="text-white/70">
                One-sentence locations intro placeholder (nationwide / nearby / expanding).
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              aria-label="View all locations"
            >
              View All Locations
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="sr-only" htmlFor="location-search">
              Search by city or ZIP
            </label>
            <input
              id="location-search"
              type="text"
              placeholder="Search by city or ZIP (placeholder)"
              className="h-12 rounded-2xl border border-white/12 bg-black/30 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
            />
            <button
              type="button"
              className="h-12 rounded-2xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Search
            </button>
          </div>

          <div className="mt-6 h-[360px] rounded-2xl border-subtle bg-black/40 flex items-center justify-center text-white/40">
            Locations Map / Grid Placeholder
          </div>
        </div>
      </section>

      {/* ABOUT ZIVEL (Preview Strip) */}
      <section id="about" className="section" aria-labelledby="home-about-title">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 rounded-2xl border-subtle bg-card p-6 md:grid-cols-12 md:p-8 md:items-center">
            <div className="md:col-span-7">
              <h2 id="home-about-title" className="mb-3">
                About Zivel Placeholder
              </h2>
              <p className="text-white/70">
                Brief brand story placeholder. (We&apos;ll replace with final copy once approved.)
              </p>
              <div className="mt-6">
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="aspect-[16/10] w-full rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center text-white/40">
                About Media Placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="reviews" className="section" aria-labelledby="home-social-proof-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="home-social-proof-title" className="mb-2">
              Social Proof Placeholder
            </h2>
            <p className="text-white/70">
              Short trust-builder placeholder (reviews, ratings, outcomes).
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {["Testimonial 1", "Testimonial 2", "Testimonial 3"].map((label) => (
              <figure key={label} className="rounded-2xl border-subtle bg-card p-6">
                <blockquote className="text-sm text-white/70">
                  Customer testimonial placeholder (2–3 lines).
                </blockquote>
                <figcaption className="mt-4 text-xs text-white/50">
                  — Name placeholder, City placeholder
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 text-sm text-white/60">
            Ratings / review platform placeholders (Google, etc.). Add structured data later.
          </p>
        </div>
      </section>

      {/* SCIENCE & RECOVERY HUB PREVIEW */}
      <section id="science" className="section" aria-labelledby="home-science-title">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 id="home-science-title" className="mb-2">
                Science & Recovery Hub Preview Placeholder
              </h2>
              <p className="text-white/70">
                3 article previews in card format (SEO + authority). Placeholder until content exists.
              </p>
            </div>

            <a
              href="/science"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              View All Articles
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <article key={n} className="rounded-2xl border-subtle bg-card p-6">
                <div className="mb-4 aspect-[16/9] w-full rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-white/40">
                  Article Thumbnail Placeholder
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Article Title Placeholder {n}
                </h3>
                <p className="text-sm text-white/70">
                  Short snippet placeholder (1–2 sentences).
                </p>
                <div className="mt-5">
                  <a
                    href="/science"
                    className="text-sm font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="section" aria-labelledby="home-final-cta-title">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-3xl">
                <h2 id="home-final-cta-title" className="mb-2">
                  Ready to Start Your Wellness Journey?
                </h2>
                <p className="text-white/70">
                  Final CTA subtitle placeholder (short, high-impact).
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#book"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Book Now
                </a>
                <a
                  href="/memberships"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                >
                  View Memberships
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
