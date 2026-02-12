import React from "react";

type Props = {
  title: string;
  embedUrl?: string;
  placeId?: string;
  query?: string;
};

export default function GoogleMapEmbed({ title, embedUrl, placeId, query }: Props) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;

  const src =
    embedUrl ??
    (key && placeId
      ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(
          key
        )}&q=place_id:${encodeURIComponent(placeId)}`
      : key && query
      ? `https://www.google.com/maps/embed/v1/search?key=${encodeURIComponent(
          key
        )}&q=${encodeURIComponent(query)}`
      : null);

  return (
    <div className="rounded-2xl border-subtle bg-card overflow-hidden">
      {src ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="p-6 text-white/70">
          Map coming soon. Add either:
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li><span className="text-white/85">NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY</span> and a <span className="text-white/85">placeId</span> or <span className="text-white/85">query</span>, or</li>
            <li>a full <span className="text-white/85">embedUrl</span> on the location.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
