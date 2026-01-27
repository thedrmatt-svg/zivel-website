import { locations } from "@/lib/data/locations";
import type { Location } from "@/types/location";

export type LocationNavState = { label: string; href: string };
export type LocationNavFeatured = { label: string; href: string; note?: string };

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export function getLocationNav(options?: { featuredCount?: number }) {
  const featuredCount = options?.featuredCount ?? 4;

  // states
  const stateMap = new Map<string, { label: string; href: string }>();
  for (const loc of locations) {
    const stateSlug = loc.stateSlug.toLowerCase();
    if (!stateSlug) continue;

    const label = titleCase(stateSlug);
    stateMap.set(stateSlug, { label, href: `/locations/${stateSlug}` });
  }

  const states = Array.from(stateMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

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
        href: `/locations/${stateSlug}/${citySlug}`,
        note: loc.name ? String(loc.name) : undefined,
      } as LocationNavFeatured;
    });

  return { states, featured };
}
