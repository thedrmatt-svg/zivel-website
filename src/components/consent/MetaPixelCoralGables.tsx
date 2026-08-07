"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "zivel_cookie_consent";
const PIXEL_ID = "565671302759908";

// Extend the global Window so window.fbq is typed project-wide.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Loads the Meta Pixel ONLY on Coral Gables routes.
 *
 * Consent-gated: mirrors the GoogleAdsScript pattern.
 * - If localStorage already shows "accepted", loads immediately.
 * - Otherwise waits for the "zivel:consent-accept" event from CookieConsent.tsx.
 *
 * Fires PageView once on mount. Lead events are fired by ContactForm and
 * PricingGateModal when citySlug / locationSlug === "coral-gables".
 *
 * Privacy note: no consent gate was wired for Meta specifically before this
 * change; this component gates it behind the same marketing-consent flag used
 * for Google Ads. Add dedicated Meta consent UI if ever needed.
 */
export default function MetaPixelCoralGables() {
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
      {/* Meta Pixel base code */}
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
