"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "zivel_cookie_consent";
const GTM_ID = "GTM-5XRKPB32";

/**
 * Loads Google Tag Manager for Riverton routes only.
 *
 * Consent-gated: same pattern as GoogleAdsScript — checks localStorage on
 * mount and listens for "zivel:consent-accept" from CookieConsent.tsx.
 *
 * GTM initialises once per page load; the container's own GA4 tag and
 * History Change trigger handle subsequent SPA page_view events.
 * Next.js deduplicates the Script by id so there is no double-init risk.
 *
 * GA4 measurement ID (G-C4QQ80DXWM) lives inside the GTM container —
 * it is NOT hardcoded here.
 *
 * Privacy note: no dedicated GTM/GA4 consent UI existed before this;
 * GTM is gated behind the same marketing-consent flag used for Google Ads.
 *
 * CSP note: current policy is frame-ancestors 'self' only; script-src /
 * connect-src / img-src are unrestricted by default, so GTM loads without
 * any CSP changes.
 */
export default function GoogleTagManagerRiverton() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "accepted") {
      setLoad(true);
      return;
    }
    const handler = () => setLoad(true);
    window.addEventListener("zivel:consent-accept", handler);
    return () => window.removeEventListener("zivel:consent-accept", handler);
  }, []);

  if (!load) return null;

  return (
    <>
      {/* GTM loader — initialises dataLayer and fetches the container */}
      <Script id="gtm-riverton" strategy="afterInteractive">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}</Script>

      {/* GTM noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
