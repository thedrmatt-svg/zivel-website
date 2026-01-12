import type { LocationPage } from "@/types/location";

export type LocationWithSlugs = LocationPage & {
  stateSlug: string;
  citySlug: string;
};

export const locations: LocationWithSlugs[] = [
  // Add location content files here
  // Example: import newportLocation from "@/content/locations/newport";
];

export function getLocationByPath(
  stateSlug: string,
  citySlug: string
): LocationWithSlugs | undefined {
  return locations.find(
    (l) =>
      l.stateSlug.toLowerCase() === stateSlug.toLowerCase() &&
      l.citySlug.toLowerCase() === citySlug.toLowerCase()
  );
}

export function getLocationBySlug(slug: string): LocationWithSlugs | undefined {
  return locations.find((l) => l.slug.toLowerCase() === slug.toLowerCase());
}
