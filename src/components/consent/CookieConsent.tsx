"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "zivel_cookie_consent";

/**
 * Minimal cookie consent bar.
 *
 * Storage: localStorage key "zivel_cookie_consent"
 *   "accepted" — user accepted analytics cookies
 *   "declined" — user chose essential-only
 *   (absent)   — not yet decided → show the bar
 *
 * After the user accepts, a "zivel:consent-accept" event is dispatched on
 * window so any deferred scripts (e.g. GoogleAdsScript) can load immediately
 * without a page reload.
 *
 * Vercel Analytics is always loaded — it is first-party and privacy-friendly.
 * Google Ads / Google Analytics tags are loaded only after "accepted".
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show after hydration to avoid SSR mismatch
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("zivel:consent-accept"));
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#0a0a0a",
        borderTop: "1px solid #d4af37",
        padding: "0.75rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
        fontSize: "0.8125rem",
        lineHeight: "1.4",
      }}
    >
      <p style={{ margin: 0, color: "#ccc", maxWidth: "640px" }}>
        We use analytics cookies to understand how visitors use our site.{" "}
        <Link
          href="/privacy-policy"
          style={{ color: "#d4af37", textDecoration: "underline" }}
        >
          Privacy policy
        </Link>
        .
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            fontSize: "0.8125rem",
            cursor: "pointer",
            textDecoration: "underline",
            padding: "0.25rem 0",
          }}
        >
          Essential only
        </button>

        <button
          onClick={accept}
          style={{
            background: "#d4af37",
            color: "#000",
            border: "none",
            borderRadius: "4px",
            padding: "0.4rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
