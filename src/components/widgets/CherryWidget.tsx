"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const CHERRY_LOAD_DELAY_MS = 5000;
const CHERRY_MOUNT_ID = "widget-floatingEstimator-mount";

type CherryLoader = ((...args: unknown[]) => void) & { q?: unknown[][] };
type CherryWindow = Window & {
  _hw?: CherryLoader;
  "loaded-_hw"?: boolean;
};

const CHERRY_CONFIG = {
  debug: false,
  variables: {
    slug: "zivel",
    name: "Zivel",
    images: [26],
    customLogo: "",
    defaultPurchaseAmount: 750,
    imageCategory: "medspa",
    language: "en",
  },
  styles: {
    primaryColor: "#cab14c",
    secondaryColor: "#0f766e10",
    fontFamily: "Montserrat",
    headerFontFamily: "Montserrat",
    floatingEstimator: {
      position: "bottom-right",
      offset: { x: "20px", y: "20px" },
      zIndex: 9999,
      ctaFontFamily: "Montserrat",
      bodyFontFamily: "Montserrat",
      ctaColor: "#cab14c",
      ctaTextColor: "#FFFFFF",
    },
  },
};

export default function CherryWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const active = useRef(false);

  useEffect(() => {
    active.current = true;
    const timer = setTimeout(() => {
      const cherryWindow = window as CherryWindow;
      // Cherry requires an init queue BEFORE its external script executes.
      // Rendering an inline <script> after a React mount does not execute it.
      if (!cherryWindow._hw) {
        const loader: CherryLoader = (...args) => {
          (loader.q ??= []).push(args);
        };
        cherryWindow._hw = loader;
      }
      const loader = cherryWindow._hw;
      if (!cherryWindow["loaded-_hw"] && !loader.q?.some(([method]) => method === "init")) {
        loader("init", CHERRY_CONFIG, ["floatingEstimator"]);
      }
      setShouldLoad(true);
    }, CHERRY_LOAD_DELAY_MS);
    return () => {
      active.current = false;
      clearTimeout(timer);
      // Cherry mounts outside React under <body>; don't leave it visible on
      // pages that don't include this component. Reuse it on the next eligible page.
      const mount = document.getElementById(CHERRY_MOUNT_ID);
      if (mount) mount.style.display = "none";
    };
  }, []);

  function showEstimator() {
    if (!active.current) {
      const mount = document.getElementById(CHERRY_MOUNT_ID);
      if (mount) mount.style.display = "none";
      return;
    }
    const cherryWindow = window as CherryWindow;
    if (!cherryWindow["loaded-_hw"]) {
      console.error("[CherryWidget] Cherry script loaded but did not initialize.");
      return;
    }
    // onReady also runs when Next.js reuses the script after client navigation.
    // Cherry's post-load API uses this command, not another "init" call.
    cherryWindow._hw?.("floatingEstimator");
    const mount = document.getElementById(CHERRY_MOUNT_ID);
    if (mount) mount.style.display = "";
  }

  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          #widget-floatingEstimator-mount [class*="floatingEstimator-overlay-"] {
            left: 0 !important;
            right: 0 !important;
            width: auto;
          }
          #widget-floatingEstimator-mount [role="dialog"] {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Script
        id="_hw"
        src="https://files.withcherry.com/widgets/widget.js"
        strategy="afterInteractive"
        onReady={showEstimator}
        onError={() => console.error("[CherryWidget] Unable to load Cherry's financing widget.")}
      />
    </>
  );
}
