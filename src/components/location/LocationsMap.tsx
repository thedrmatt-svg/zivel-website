interface MapLocation {
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  href: string;
  bookingId?: number;
}

export default function LocationsMap({ locations }: { locations: MapLocation[] }) {
  const query = encodeURIComponent("Zivel Performance & Recovery");
  const src = `https://maps.google.com/maps?q=${query}&output=embed&hl=en`;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border border-black/10">
      <iframe
        src={src}
        width="100%"
        height="500"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        aria-label="Map showing Zivel Performance & Recovery studio locations"
        style={{ border: 0, display: "block" }}
      />
    </div>
  );
}
