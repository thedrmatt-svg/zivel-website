import type { Location } from "@/types/location";
import { newportKY as newportKy } from "@/content/locations/newport-ky";
import { hollywoodFl } from "@/content/locations/hollywood-fl";
import { rivertonUt } from "@/content/locations/riverton-ut";

export const locations: Location[] = [
  newportKy,
  hollywoodFl,
  rivertonUt,
];

export function getLocationByPath(state: string, city: string): Location | undefined {
  const s = state.toLowerCase();
  const c = city.toLowerCase();
  return locations.find((l) => l.stateSlug === s && l.citySlug === c);
}
