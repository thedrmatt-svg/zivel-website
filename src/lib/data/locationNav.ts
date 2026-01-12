import { locations } from "@/lib/data/locations";

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
  for (const loc of locations as any[]) {
    const stateSlug = String(loc.stateSlug ?? "").toLowerCase();
    if (!stateSlug) continue;

    const label =
      (loc.stateName as string | undefined) ??
      titleCase(stateSlug);

    stateMap.set(stateSlug, { label, href: `/locations/${stateSlug}` });
  }

  const states = Array.from(stateMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  // featured: first N locations in registry order
  const featured = (locations as any[])
    .slice(0, featuredCount)
    .map((loc) => {
      const stateSlug = String(loc.stateSlug ?? "").toLowerCase();
      const citySlug = String(loc.citySlug ?? "").toLowerCase();

      const stateShort =
        (loc.state as string | undefined) ??
        (stateSlug.length <= 2 ? stateSlug.toUpperCase() : undefined) ??
        "";

      const cityName =
        (loc.city as string | undefined) ??
        (loc.cityName as string | undefined) ??
        titleCase(citySlug);

      return {
        label: `${cityName}${stateShort ? `, ${stateShort}` : ""}`,
        href: `/locations/${stateSlug}/${citySlug}`,
        note: loc.name ? String(loc.name) : undefined,
      } as LocationNavFeatured;
    });

  return { states, featured };
}
