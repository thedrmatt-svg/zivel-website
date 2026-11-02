"use client";

import { useEffect, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import Script from "next/script";
import {
  HOLLYWOOD_META_PIXEL_BOOTSTRAP,
  HOLLYWOOD_META_PIXEL_NOSCRIPT_HTML,
} from "@/lib/hollywood-meta-pixel";

/** Hollywood only, sharing its existing marketing consent policy. */
export default function MetaPixelHollywood() {
  const headInserted = useRef(false);

  useServerInsertedHTML(() => {
    if (headInserted.current) return null;
    headInserted.current = true;
    return (
      <script
        id="meta-pixel-hollywood-head"
        dangerouslySetInnerHTML={{ __html: HOLLYWOOD_META_PIXEL_BOOTSTRAP }}
      />
    );
  });

  useEffect(() => {
    function addConsentApprovedNoScript() {
      if (document.getElementById("meta-pixel-hollywood-noscript")) return;
      const fallback = document.createElement("noscript");
      fallback.id = "meta-pixel-hollywood-noscript";
      // Never emit a tracking image before consent. With JS enabled this stays
      // noscript text, rather than making a second PageView image request.
      fallback.innerHTML = HOLLYWOOD_META_PIXEL_NOSCRIPT_HTML;
      document.body.prepend(fallback);
    }

    window.addEventListener("zivel:consent-accept", addConsentApprovedNoScript);
    try {
      if (localStorage.getItem("zivel_cookie_consent") === "accepted") {
        addConsentApprovedNoScript();
      }
    } catch {
      // Consent events still work when browser storage is unavailable.
    }
    window.dispatchEvent(new Event("zivel:hollywood-meta-route-ready"));

    return () => {
      window.removeEventListener("zivel:consent-accept", addConsentApprovedNoScript);
      document.getElementById("meta-pixel-hollywood-noscript")?.remove();
      // A loaded pixel cannot be unloaded by deleting its script. Reset when
      // leaving Hollywood so its pixel cannot carry into another location.
      // Child routes retain this layout, so they do not reload or fire again.
      if (
        !/^(?:\/(?:en|es))?\/locations\/florida\/hollywood(?:\/|$)/.test(window.location.pathname) &&
        (window as Window & { __zivelHollywoodMetaLoaded?: boolean }).__zivelHollywoodMetaLoaded
      ) {
        window.location.reload();
      }
    };
  }, []);

  return (
    <Script id="meta-pixel-hollywood-navigation" strategy="afterInteractive">
      {HOLLYWOOD_META_PIXEL_BOOTSTRAP}
    </Script>
  );
}
