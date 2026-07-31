"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "zivel_cookie_consent";

/**
 * Loads the Google Ads / gtag script only after cookie consent is accepted.
 *
 * On mount it checks localStorage. If already "accepted", loads immediately.
 * Otherwise it listens for the "zivel:consent-accept" custom event dispatched
 * by CookieConsent.tsx and loads at that point — no page reload needed.
 */
export default function GoogleAdsScript({ id }: { id: string }) {
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id={`gtag-init-${id}`} strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}</Script>
    </>
  );
}
