"use client";

/**
 * Global error boundary — Next.js App Router root-level 500 handler.
 *
 * Fires when an unhandled error is thrown during rendering of the root layout
 * or any page that does not have a closer error.tsx boundary. Because it
 * replaces the root layout entirely, it must render its own <html> and <body>.
 *
 * Next.js automatically returns HTTP 500 when this boundary catches an error
 * in production. In development it shows the built-in overlay instead.
 *
 * Inline styles are used (not Tailwind) because globals.css / the locale
 * layout are unavailable at this level — same approach as src/app/not-found.tsx.
 */

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          {/* Eyebrow */}
          <p
            aria-hidden="true"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: "1.25rem",
            }}
          >
            500 · Server Error
          </p>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 300,
              color: "#fff",
              margin: "0 0 1rem",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Something went wrong
          </h1>

          {/* Gold rule */}
          <div
            aria-hidden="true"
            style={{
              width: "3rem",
              height: "1px",
              background: "#d4af37",
              opacity: 0.6,
              margin: "0 auto 1.5rem",
            }}
          />

          {/* Supporting copy */}
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "28rem",
              margin: "0 auto 2.5rem",
            }}
          >
            We&apos;re working on it. Please try again in a moment.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Primary — try again */}
            <button
              onClick={reset}
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                background: "#d4af37",
                color: "#000",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>

            {/* Secondary — go home */}
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                background: "transparent",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.8125rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "2px",
              }}
            >
              Return Home
            </Link>
          </div>

          {/* Tertiary links */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/locations"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.8125rem",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              Find a Location
            </Link>
            <Link
              href="/contact"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.8125rem",
                textDecoration: "none",
                letterSpacing: "0.05em",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
