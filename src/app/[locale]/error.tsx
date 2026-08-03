"use client";

/**
 * Locale-level error boundary — catches unhandled errors thrown by any page
 * component inside src/app/[locale]/. Renders inside [locale]/layout.tsx so
 * the site Header and Footer remain visible.
 *
 * Next.js returns HTTP 500 when this boundary activates in production.
 * In development the built-in error overlay appears instead.
 *
 * Must be a Client Component ("use client") — React error boundaries require
 * class-based or hook-based client lifecycle to intercept thrown errors.
 */

import Link from "next/link";

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="zv-bleed zv-hero-bg zv-noise zv-immersive-section flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">

          {/* Eyebrow */}
          <p
            className="zv-tagline mb-6 text-[var(--zivel-gold)]"
            aria-hidden="true"
          >
            500 · Server Error
          </p>

          {/* Heading */}
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.1] mb-6">
            Something went wrong
          </h1>

          {/* Gold rule */}
          <div
            className="mx-auto mb-8 h-px w-16 bg-[var(--zivel-gold)] opacity-60"
            aria-hidden="true"
          />

          {/* Supporting copy */}
          <p className="mx-auto max-w-md text-lg text-white/60 leading-relaxed mb-12">
            We&apos;re working on it. Please try again in a moment.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {/* Primary — retry the failed render */}
            <button
              onClick={reset}
              className="zv-btn-luxury zv-btn-gold"
            >
              Try Again
            </button>

            {/* Secondary — go home */}
            <Link href="/" className="zv-btn-luxury zv-btn-outline">
              Return Home
            </Link>
          </div>

          {/* Tertiary links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/locations"
              className="text-sm text-white/45 hover:text-white/70 transition-colors duration-200 tracking-wide"
            >
              Find a Location
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/45 hover:text-white/70 transition-colors duration-200 tracking-wide"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
