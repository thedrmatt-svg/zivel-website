"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const STORAGE_KEY = "zivel_cookie_consent";
const PIXEL_ID = "565671302759908";

// Extend global Window so window.fbq is typed project-wide.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Meta Pixel — Coral Gables only.
 *
 * Mounted in [city]/layout.tsx when city === "coral-gables", so it covers
 * the base location page and every nested route (pricing, [service], blog,
 * blog/[slug], pathways).
 *
 * Consent-gated: same pattern as GoogleAdsScript — waits for
 * localStorage "accepted" or the "zivel:consent-accept" event.
 *
 * PageView behaviour:
 * - On first load: fired by the inline Script (fbq queue handles async).
 * - On SPA navigations within Coral Gables: fired by the pathname useEffect.
 *   The component stays mounted across child routes in the layout, so
 *   usePathname() re-fires PageView each time the URL changes.
 *
 * Privacy note: no separate Meta consent UI existed before this; pixel is
 * gated behind the same marketing-consent flag used for Google Ads.
 */
export default function MetaPixelCoralGables() {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  // Track whether the inline Script has already fired the initial PageView
  // so we don't double-fire on the first pathname effect run.
  const scriptFiredFirst = useRef(true);

  // ── Consent gate ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "accepted") {
      setLoaded(true);
      return;
    }
    const handler = () => setLoaded(true);
    window.addEventListener("zivel:consent-accept", handler);
    return () => window.removeEventListener("zivel:consent-accept", handler);
  }, []);

  // ── PageView on SPA navigations ─────────────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    if (scriptFiredFirst.current) {
      // First run: initial PageView is handled by fbq('track','PageView') in
      // the inline Script below. Just mark that we've passed the first load.
      scriptFiredFirst.current = false;
      return;
    }
    // Subsequent pathname changes = client-side navigation within Coral Gables.
    window.fbq?.("track", "PageView");
  }, [pathname, loaded]);

  if (!loaded) return null;

  return (
    <>
      {/* Meta Pixel base code — initialises fbq and fires first PageView */}
      <Script id="meta-pixel-coral-gables" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}</Script>

      {/* noscript PageView fallback */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
