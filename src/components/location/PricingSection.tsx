type PricingTier = {
  name: string;
  price: string;
  cadence?: string;
  description?: string;
  features?: string[];
  mostPopular?: boolean;
  bookingUrl?: string;
};

type StandardPrice = {
  name: string;
  price: string;
  note?: string;
};

export default function PricingSection({
  tiers,
  standardPrices,
  variant = "dark",
  hideStandardPrices = false,
}: {
  tiers?: PricingTier[];
  standardPrices?: StandardPrice[];
  variant?: "dark" | "light";
  hideStandardPrices?: boolean;
}) {
  const hasTiers = !!tiers?.length;
  const hasStandard = !hideStandardPrices && !!standardPrices?.length;

  const isLight = variant === "light";

  const cardBg = isLight
    ? "bg-white border border-black/10 shadow-sm"
    : "border-subtle bg-card";
  const cardDivider = isLight ? "border-b border-black/10" : "border-b border-white/10";
  const textPrimary = isLight ? "text-black/90" : "text-white/90";
  const textSecondary = isLight ? "text-black/75" : "text-white/70";
  const textMuted = isLight ? "text-black/65" : "text-white/60";
  const textCadence = isLight ? "text-black/60" : "text-white/60";
  const bulletDot = isLight ? "text-black/65" : "text-white/50";
  const footerNote = isLight ? "text-black/65 italic" : "text-white/60 italic";
  const bookingLinkColor = isLight ? "text-[var(--zivel-gold-dark)]" : "text-[var(--zivel-gold)]";

  if (!hasTiers && !hasStandard) {
    return (
      <div className={`rounded-2xl p-6 ${cardBg} ${textMuted}`}>
        Pricing coming soon.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {hasTiers ? (
        <div>
          <h3 className={`mb-6 text-lg ${textPrimary}`}>Membership Options</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers!.map((t) => (
              <div
                key={t.name}
                className={[
                  `rounded-2xl p-6 ${cardBg}`,
                  t.mostPopular ? "ring-1 ring-[var(--zivel-gold)]" : "",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`font-semibold ${textPrimary}`}>{t.name}</div>
                  {t.mostPopular ? (
                    <span className="rounded-full bg-[var(--zivel-gold)] px-3 py-1 text-xs font-semibold text-black">
                      Most Popular
                    </span>
                  ) : null}
                </div>

                <div className={`mt-3 text-2xl font-semibold ${textPrimary}`}>
                  {t.price}
                  {t.cadence ? (
                    <span className={`text-sm ${textCadence}`}> {t.cadence}</span>
                  ) : null}
                </div>

                {t.description ? (
                  <p className={`mt-3 text-sm ${textSecondary}`}>{t.description}</p>
                ) : null}

                {t.features?.length ? (
                  <ul className={`mt-4 space-y-2 text-sm ${textSecondary}`}>
                    {t.features.map((f, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className={bulletDot}>&bull;</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {t.bookingUrl ? (
                  <a
                    href={t.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-5 block w-full rounded-full border border-[var(--zivel-gold)] py-2.5 text-center text-sm font-semibold ${bookingLinkColor} transition-colors duration-200 hover:bg-[var(--zivel-gold)] hover:text-black`}
                  >
                    Join Now
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {hasStandard ? (
        <div>
          <h3 className={`mb-6 text-lg ${textPrimary}`}>Standard Service Pricing</h3>
          <div className={`rounded-2xl p-6 ${cardBg}`}>
            <div className="grid gap-4 md:grid-cols-2">
              {standardPrices!.map((s) => (
                <div
                  key={s.name}
                  className={`flex items-baseline justify-between gap-4 ${cardDivider} pb-3 last:border-b-0 last:pb-0`}
                >
                  <div className={textPrimary}>
                    {s.name}
                    {s.note ? (
                      <div className={`text-xs ${textMuted}`}>{s.note}</div>
                    ) : null}
                  </div>
                  <div className={`font-semibold ${textPrimary}`}>{s.price}</div>
                </div>
              ))}
            </div>
          </div>
          <p className={`mt-4 text-sm ${footerNote}`}>
            Save more with memberships or packages—contact this location for personalized pricing info.
          </p>
        </div>
      ) : null}
    </div>
  );
}
