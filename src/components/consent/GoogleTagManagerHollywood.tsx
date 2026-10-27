"use client";

import { useEffect, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import Script from "next/script";
import {
  HOLLYWOOD_GTM_BOOTSTRAP,
  HOLLYWOOD_GTM_NOSCRIPT_HTML,
} from "@/lib/hollywood-gtm";

/**
 * Mounted only by the Hollywood city layout, including its child routes.
 * Insert the consent bootstrap into the document head without using headers()
 * or making the locale layout dynamic. Next Script covers client navigation.
 */
export default function GoogleTagManagerHollywood() {
  const headInserted = useRef(false);

  useServerInsertedHTML(() => {
    if (headInserted.current) return null;
    headInserted.current = true;
    return (
      <script
        id="gtm-hollywood-head"
        dangerouslySetInnerHTML={{ __html: HOLLYWOOD_GTM_BOOTSTRAP }}
      />
    );
  });

  useEffect(() => {
    function addConsentApprovedNoScript() {
      if (document.getElementById("gtm-hollywood-noscript")) return;
      const fallback = document.createElement("noscript");
      fallback.id = "gtm-hollywood-noscript";
      // With scripting enabled the iframe remains noscript text, not a second
      // tracking request. Never emit an unconditional fallback before consent.
      fallback.innerHTML = HOLLYWOOD_GTM_NOSCRIPT_HTML;
      document.body.prepend(fallback);
    }

    window.addEventListener("zivel:consent-accept", addConsentApprovedNoScript);
    try {
      if (localStorage.getItem("zivel_cookie_consent") === "accepted") {
        addConsentApprovedNoScript();
      }
    } catch {
      // Consent events still work if browser storage is unavailable.
    }
    window.dispatchEvent(new Event("zivel:hollywood-route-ready"));

    return () => {
      window.removeEventListener("zivel:consent-accept", addConsentApprovedNoScript);
      document.getElementById("gtm-hollywood-noscript")?.remove();
      // An initialized GTM container cannot be unloaded by removing its script.
      // Reset the document on leaving this location so Hollywood tags cannot
      // keep receiving history events for another studio. Child routes retain
      // the city layout and never trigger this reset.
      if (
        !/^(?:\/(?:en|es))?\/locations\/florida\/hollywood(?:\/|$)/.test(window.location.pathname) &&
        document.querySelector('script[src^="https://www.googletagmanager.com/gtm.js?id=GTM-NR6P7MB7"]')
      ) {
        window.location.reload();
      }
    };
  }, []);

  return (
    <Script id="gtm-hollywood-navigation" strategy="afterInteractive">
      {HOLLYWOOD_GTM_BOOTSTRAP}
    </Script>
  );
}
