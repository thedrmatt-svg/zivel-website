type PricingTier = {
  name: string;
  price: string;
  cadence?: string;
  description?: string;
  features?: string[];
  mostPopular?: boolean;
};

type StandardPrice = {
  name: string;
  price: string;
  note?: string;
};

export default function PricingSection({
  tiers,
  standardPrices,
}: {
  tiers?: PricingTier[];
  standardPrices?: StandardPrice[];
}) {
  const hasTiers = !!tiers?.length;
  const hasStandard = !!standardPrices?.length;

  if (!hasTiers && !hasStandard) {
    return (
      <div className="rounded-2xl border-subtle bg-card p-6 text-white/70">
        Pricing coming soon.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {hasTiers ? (
        <div>
          <h3 className="mb-6 text-lg">Membership Options</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers!.map((t) => (
              <div
                key={t.name}
                className={[
                  "rounded-2xl border-subtle bg-card p-6",
                  t.mostPopular ? "ring-1 ring-[var(--zivel-gold)]" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-white/90">{t.name}</div>
                  {t.mostPopular ? (
                    <span className="rounded-full bg-[var(--zivel-gold)] px-3 py-1 text-xs font-semibold text-black">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 text-2xl font-semibold">
                  {t.price}
                  {t.cadence ? <span className="text-sm text-white/60"> {t.cadence}</span> : null}
                </div>

                {t.description ? <p className="mt-3 text-sm text-white/70">{t.description}</p> : null}

                {t.features?.length ? (
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {t.features.map((f, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-white/50">&bull;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {hasStandard ? (
        <div>
          <h3 className="mb-6 text-lg">Standard Service Pricing</h3>
          <div className="rounded-2xl border-subtle bg-card p-6">
            <div className="grid gap-4 md:grid-cols-2">
              {standardPrices!.map((s) => (
                <div key={s.name} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                  <div className="text-white/85">
                    {s.name}
                    {s.note ? <div className="text-xs text-white/50">{s.note}</div> : null}
                  </div>
                  <div className="font-semibold text-white/90">{s.price}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm text-white/50 italic">
            Save more with memberships or packages—contact this location for personalized pricing info.
          </p>
        </div>
      ) : null}
    </div>
  );
}
