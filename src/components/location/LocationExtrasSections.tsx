import React from "react";
import { getLocationExtras } from "@/content/locations/locationExtras";
import GoogleMapEmbed from "./GoogleMapEmbed";
import GoogleReviews from "./GoogleReviews";

export default function LocationExtrasSections({
  state,
  city,
  locationLabel,
}: {
  state: string;
  city: string;
  locationLabel: string;
}): React.ReactElement {
  const extras = getLocationExtras(state, city);

  const pricing = extras?.pricing;
  const memberships = extras?.memberships;
  const partners = extras?.partners;
  const jobs = extras?.jobs;

  return (
    <div className="space-y-24">
      <section className="section" aria-labelledby="loc-map-title">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="loc-map-title" className="mb-1">Directions & Map</h2>
              <p className="text-white/70">Find {locationLabel} and get directions.</p>
            </div>
            {extras?.mapQuery ? (
              <a
                className="text-sm font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(extras.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps →
              </a>
            ) : null}
          </div>

          <GoogleMapEmbed mapQuery={extras?.mapQuery} mapEmbedUrl={extras?.mapEmbedUrl} />
        </div>
      </section>

      <section className="section" aria-labelledby="loc-pricing-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="loc-pricing-title" className="mb-2">{pricing?.title ?? "Pricing"}</h2>
            <p className="text-white/70">{pricing?.note ?? "Pricing placeholder for this location."}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(pricing?.items ?? []).length ? (
              pricing!.items.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-2xl border-subtle bg-card p-6 ${p.highlight ? "ring-1 ring-white/20" : ""}`}
                >
                  <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                  {p.priceLine ? <p className="text-white/80 font-semibold">{p.priceLine}</p> : null}
                  {p.bullets?.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      {p.bullets.map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {p.href ? (
                    <a
                      href={p.href}
                      className="mt-6 inline-flex text-sm font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                    >
                      View / Book →
                    </a>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-2xl border-subtle bg-black/40 p-8 text-white/60 md:col-span-3">
                Pricing cards placeholder: add items in <code className="text-white/80">locationExtrasByKey[&quot;{state}/{city}&quot;]</code>.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="loc-memberships-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="loc-memberships-title" className="mb-2">{memberships?.title ?? "Memberships"}</h2>
            <p className="text-white/70">{memberships?.note ?? "Membership placeholder for this location."}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(memberships?.tiers ?? []).length ? (
              memberships!.tiers.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-2xl border-subtle bg-card p-6 ${t.highlight ? "ring-1 ring-white/20" : ""}`}
                >
                  <h3 className="mb-2 text-lg font-semibold">{t.name}</h3>
                  {t.priceLine ? <p className="text-white/80 font-semibold">{t.priceLine}</p> : null}
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {t.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                  <a
                    href={t.href ?? "/memberships"}
                    className="mt-6 inline-flex text-sm font-semibold underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                  >
                    View Memberships →
                  </a>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border-subtle bg-black/40 p-8 text-white/60 md:col-span-3">
                Membership tier placeholder: add tiers in <code className="text-white/80">locationExtrasByKey[&quot;{state}/{city}&quot;]</code>.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl">
          <GoogleReviews placeId={extras?.placeId} locationLabel={locationLabel} />
        </div>
      </section>

      <section className="section" aria-labelledby="loc-partners-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="loc-partners-title" className="mb-2">{partners?.title ?? "Local Partners"}</h2>
            <p className="text-white/70">{partners?.intro ?? "Partners placeholder for this location."}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(partners?.items ?? []).length ? (
              partners!.items.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  className="rounded-2xl border-subtle bg-card p-6 hover:bg-white/[0.06] transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="mb-2 text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-white/70">{p.description ?? "Partner description placeholder."}</p>
                </a>
              ))
            ) : (
              <div className="rounded-2xl border-subtle bg-black/40 p-8 text-white/60 md:col-span-3">
                Partners placeholder: add partners in <code className="text-white/80">locationExtrasByKey[&quot;{state}/{city}&quot;]</code>.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="loc-jobs-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 id="loc-jobs-title" className="mb-2">{jobs?.title ?? "Jobs"}</h2>
            <p className="text-white/70">{jobs?.intro ?? "Jobs placeholder for this location."}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {(jobs?.items ?? []).length ? (
              jobs!.items.map((j) => (
                <a
                  key={j.title}
                  href={j.href}
                  className="rounded-2xl border-subtle bg-card p-6 hover:bg-white/[0.06] transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{j.title}</h3>
                    <span className="text-sm text-white/60">{j.type ?? "Role type"}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{j.description ?? "Job description placeholder."}</p>
                  <div className="mt-5 text-sm font-semibold underline decoration-white/20 underline-offset-4">
                    Apply →
                  </div>
                </a>
              ))
            ) : (
              <div className="rounded-2xl border-subtle bg-black/40 p-8 text-white/60 md:col-span-2">
                Jobs placeholder: add jobs in <code className="text-white/80">locationExtrasByKey[&quot;{state}/{city}&quot;]</code>.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
