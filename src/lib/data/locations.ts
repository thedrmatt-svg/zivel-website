import type { LocationPage } from "@/types/location";
import { newportKy } from "@/content/locations/newport-ky";

export const locations: LocationPage[] = [
  newportKy,
];

export function getLocationByPath(state: string, city: string): LocationPage | undefined {
  const s = state.toLowerCase();
  const c = city.toLowerCase();
  return locations.find((l) => l.stateSlug === s && l.citySlug === c);
}
