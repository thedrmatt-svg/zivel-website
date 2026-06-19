import { locations } from "@/lib/data/locations";

export type LocalServiceCombo = {
  locale: string;
  state: string;
  city: string;
  service: string;
};

/**
 * Auto-derived from each location's `services` array.
 * Adding a service to a location file — or adding a new location — automatically
 * produces the corresponding local service pages. No manual edits needed here.
 */
export const LOCAL_SERVICE_COMBOS: LocalServiceCombo[] = locations.flatMap((loc) =>
  loc.services.flatMap((svc) => [
    { locale: "en", state: loc.stateSlug, city: loc.citySlug, service: svc.slug },
    { locale: "es", state: loc.stateSlug, city: loc.citySlug, service: svc.slug },
  ])
);

const localPageSet = new Set(
  LOCAL_SERVICE_COMBOS
    .filter((c) => c.locale === "en")
    .map((c) => `${c.state}/${c.city}/${c.service}`)
);

export function hasLocalServicePage(state: string, city: string, service: string): boolean {
  return localPageSet.has(`${state}/${city}/${service}`);
}

export function getLocalServiceHref(state: string, city: string, service: string): string | undefined {
  if (hasLocalServicePage(state, city, service)) {
    return `/locations/${state}/${city}/${service}`;
  }
  return undefined;
}
