import Link from "next/link";

/**
 * Root-level 404 fallback.
 * Fires for any request that doesn't match the [locale] segment at all
 * (extremely rare given next-intl middleware intercepts everything).
 * Keeps the same brand colours without importing locale-dependent layout.
 */
export default function RootNotFound() {
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
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: "1rem",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 300,
              color: "#fff",
              margin: "0 0 1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Page Not Found
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "28rem",
              margin: "0 auto 2rem",
            }}
          >
            This page doesn&apos;t exist or has moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "1rem 2.5rem",
              background: "#d4af37",
              color: "#000",
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderRadius: "2px",
            }}
          >
            Return Home
          </Link>
        </div>
      </body>
    </html>
  );
}
