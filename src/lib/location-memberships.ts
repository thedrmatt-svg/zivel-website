import type { Location } from "@/types/location";

/** Only stored standard individual memberships; never generic display fallbacks. */
export function getLocationMembershipMinimum(location: Location) {
  const candidates = (location.pricing?.membershipTiers ?? []).flatMap((tier, index) => {
    if (/\b(family|household|couple|package|seasonal|promo|special|intro|first month|1st month)\b/i.test(
      `${tier.name} ${tier.cadence} ${tier.description ?? ""}`,
    )) return [];
    const match = tier.price.trim().match(/^\$((?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d{1,2})?)$/);
    const amount = match ? Number(match[1].replace(/,/g, "")) : NaN;
    return Number.isFinite(amount) && amount > 0
      ? [{ price: tier.price, unit: tier.cadence, amount, index, name: tier.name }]
      : [];
  });
  return candidates.sort((a, b) => a.amount - b.amount)[0] ?? null;
}
