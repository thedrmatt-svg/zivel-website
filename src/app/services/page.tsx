import Link from "next/link";
import { services } from "@/lib/data/services";

export const metadata = {
  title: "Services | Zivel Wellness",
  description:
    "Explore Zivel services including cryotherapy, red light therapy, infrared sauna, compression therapy, and more. Book a session at a location near you.",
};

export default function ServicesIndexPage() {
  return (
    <div className="space-y-16">
      <section className="section py-16">
        <div className="max-w-3xl space-y-4">
          <h1>Services</h1>
          <p className="text-white/70">
            Explore Zivel&apos;s science-backed services designed to support recovery,
            performance, anti-aging, and longevity. Choose a service to learn
            how it works, see the benefits, and book a session.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-2xl border-subtle bg-card p-6 hover:border-white/20 hover:bg-white/10"
            >
              <div className="text-lg font-semibold text-white">{s.name}</div>
              <div className="mt-2 text-sm text-white/70">
                {s.hero.subheadline}
              </div>

              <div className="mt-5 inline-flex text-sm font-medium text-[var(--zivel-gold)]">
                View details →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
