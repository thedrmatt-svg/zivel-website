import { locations } from "@/lib/data/locations";
import type { Location } from "@/types/location";

export type LocationNavCity = { label: string; href: string };
export type LocationNavFeatured = { label: string; href: string; note?: string };

export function getLocationHref(location: Pick<Location, "stateSlug" | "citySlug">): string {
  return `/locations/${location.stateSlug.toLowerCase()}/${location.citySlug.toLowerCase()}`;
}

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function getLocationNav(options?: { featuredCount?: number }) {
  const featuredCount = options?.featuredCount ?? 4;

  // cities: all locations sorted alphabetically by city name
  const cities: LocationNavCity[] = locations
    .map((loc: Location) => {
      const stateSlug = loc.stateSlug.toLowerCase();
      const citySlug = loc.citySlug.toLowerCase();
      const cityName = loc.city ?? titleCase(citySlug);
      const stateShort = loc.state ?? stateSlug.toUpperCase();
      return { label: `${cityName}, ${stateShort}`, href: getLocationHref(loc) };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  // featured: first N locations in registry order
  const featured = locations
    .slice(0, featuredCount)
    .map((loc: Location) => {
      const stateSlug = loc.stateSlug.toLowerCase();
      const citySlug = loc.citySlug.toLowerCase();
      const stateShort = loc.state ?? stateSlug.toUpperCase();
      const cityName = loc.city ?? titleCase(citySlug);

      return {
        label: `${cityName}${stateShort ? `, ${stateShort}` : ""}`,
        href: getLocationHref(loc),
        note: loc.name ? String(loc.name) : undefined,
      } as LocationNavFeatured;
    });

  return { cities, featured };
}
