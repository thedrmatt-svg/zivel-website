import Link from "next/link";

/**
 * Locale-aware 404 page.
 * Next.js App Router returns HTTP 404 automatically for not-found.tsx.
 * Renders inside [locale]/layout.tsx — inherits Header and Footer.
 * Fully server-rendered; no client components required.
 */
export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="zv-bleed zv-hero-bg zv-noise zv-immersive-section flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">

          {/* Eyebrow */}
          <p
            className="zv-tagline zv-hero-animate-1 mb-6 text-[var(--zivel-gold)]"
            aria-hidden="true"
          >
            404
          </p>

          {/* Heading */}
          <h1 className="zv-hero-animate-1 font-serif text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.1] mb-6">
            Page Not Found
          </h1>

          {/* Divider */}
          <div
            className="zv-hero-animate-2 mx-auto mb-8 h-px w-16 bg-[var(--zivel-gold)] opacity-60"
            aria-hidden="true"
          />

          {/* Body copy */}
          <p className="zv-hero-animate-2 mx-auto max-w-md text-lg text-white/60 leading-relaxed mb-12">
            The page you&apos;re looking for doesn&apos;t exist or may have
            moved. Let&apos;s get you back on track.
          </p>

          {/* CTAs */}
          <div className="zv-hero-animate-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="zv-btn-luxury zv-btn-gold">
              Return Home
            </Link>
            <Link href="/locations" className="zv-btn-luxury zv-btn-outline">
              View Locations
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
