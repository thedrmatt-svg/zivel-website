"use client";

import { useEffect, useState } from "react";
import type { Location } from "@/types/location";
import type { LocationEnhancementCopy } from "@/lib/location-enhancement-copy";
import { getLocationStatus } from "@/lib/location-status";
import { phoneHref } from "@/lib/contact-links";

export default function LocationStatusLine({ hours, zone, phone, mapsUrl, locale, copy }: {
  hours: Location["hours"]; zone: string | null; phone?: string; mapsUrl?: string | null;
  locale: string; copy: LocationEnhancementCopy;
}) {
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setStatus(getLocationStatus(hours, zone, new Date(), locale, copy));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, [hours, zone, locale, copy]);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70" data-location-status-line>
      <span style={{ width: "min(100%, 24rem)", minHeight: "3em" }} className="inline-flex items-center" aria-live="polite" data-location-status>{status ?? "\u00a0"}</span>
      <span className="flex min-h-[1.5em] flex-wrap items-center gap-x-3">
        {phone && <span aria-hidden="true" style={{ visibility: status ? "visible" : "hidden" }}>·</span>}
        {phone && <a className="underline underline-offset-4" href={phoneHref(phone)}>{copy.call} {phone}</a>}
        {phone && mapsUrl && <span aria-hidden="true">·</span>}
        {mapsUrl && <a className="underline underline-offset-4" href={mapsUrl} target="_blank" rel="noopener noreferrer">{copy.directions}</a>}
      </span>
    </div>
  );
}
