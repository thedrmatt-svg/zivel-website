import React from "react";

export default function GoogleMapEmbed({
  mapQuery,
  mapEmbedUrl,
  height = 360,
}: {
  mapQuery?: string;
  mapEmbedUrl?: string;
  height?: number;
}): React.ReactElement {
  const src =
    mapEmbedUrl ??
    (mapQuery ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed` : "");

  if (!src) {
    return (
      <div className="rounded-2xl border-subtle bg-black/40 p-8 text-white/60">
        Map placeholder: add mapQuery or mapEmbedUrl for this location.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-subtle overflow-hidden bg-black/40">
      <iframe
        title="Google Map"
        src={src}
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0 }}
      />
    </div>
  );
}
