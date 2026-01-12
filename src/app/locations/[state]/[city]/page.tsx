import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingWidget from "@/components/booking/BookingWidget";
import { getLocationByPath, locations } from "@/lib/data/locations";

export function generateStaticParams() {
  return locations.map((l) => ({ state: l.stateSlug, city: l.citySlug }));
}

export function generateMetadata({
  params,
}: {
  params: { state: string; city: string };
}): Metadata {
  const loc = getLocationByPath(params.state, params.city);
  if (!loc) return {};
  return {
    title: loc.seo.title,
    description: loc.seo.description,
    alternates: { canonical: loc.seo.canonical ?? `/locations/${loc.stateSlug}/${loc.citySlug}` },
  };
}

export default function LocationCityPage({
  params,
}: {
  params: { state: string; city: string };
}) {
  const loc = getLocationByPath(params.state, params.city);
  if (!loc) return notFound();

  return (
    <main className="section py-12 space-y-10">
      <div className="space-y-3">
        <h1>{loc.hero.headline}</h1>
        <p className="text-white/70 max-w-2xl">{loc.hero.subheadline}</p>
      </div>

      <section className="rounded-2xl border-subtle bg-card p-6 space-y-3">
        <div className="text-sm font-semibold text-white">Address</div>
        <div className="text-white/70 text-sm">
          {loc.directions.address}
        </div>
        {loc.directions.parking && (
          <div className="text-white/50 text-sm">{loc.directions.parking}</div>
        )}
      </section>

      <section id="book" className="rounded-2xl border-subtle bg-card p-6 space-y-4">
        <h2 className="m-0">{loc.booking.headline ?? `Book at ${loc.name}`}</h2>
        <BookingWidget locationId={loc.booking.locationId} />
        <p className="text-sm text-white/60">
          If the form doesn't load, open booking here:{" "}
          <a
            className="underline"
            href={`https://zivel.myperformanceiq.com/book-appointment?set_location=${loc.booking.locationId}`}
            target="_blank"
            rel="noreferrer"
          >
            Open Booking
          </a>
        </p>
      </section>
    </main>
  );
}
