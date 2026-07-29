type Props = {
  title: string;
  embedUrl?: string;
  placeId?: string;
  query?: string;
};

/**
 * Renders a Google Maps embed using the free iframe format.
 * Does NOT use the Maps Embed API v1 or the Maps JavaScript API —
 * those load the JS API internally and trigger a Lighthouse console error.
 */
export default function GoogleMapEmbed({ title, embedUrl, placeId, query }: Props) {
  // Address-based query is most reliable for the free embed format.
  // place_id: prefix is NOT supported by maps.google.com?output=embed and shows a world view.
  const src =
    embedUrl ||
    (query
      ? `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=en`
      : placeId
      ? `https://maps.google.com/maps?q=${encodeURIComponent(placeId)}&output=embed&hl=en`
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
          aria-label={`Map showing ${title}`}
          style={{ border: 0, display: "block" }}
        />
      ) : (
        <div className="p-6 text-white/70">
          Map coming soon. Add a <span className="text-white/85">placeId</span>,{" "}
          <span className="text-white/85">query</span>, or full{" "}
          <span className="text-white/85">embedUrl</span> to the location.
        </div>
      )}
    </div>
  );
}
