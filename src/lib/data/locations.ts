import type { Location } from "@/types/location";
import zivel_bentonville_location from "@/content/locations/bentonville-arkansas";
import zivel_belmont_location from "@/content/locations/belmont-north-carolina";
import zivel_brecksville_location from "@/content/locations/brecksville-ohio";
import zivel_buckhead_location from "@/content/locations/buckhead-georgia";
import zivel_briargate_location from "@/content/locations/briargate-colorado";
import zivel_coral_gables_location from "@/content/locations/coral-gables-florida";
import zivel_cumming_windermere_location from "@/content/locations/windermere-georgia";
import zivel_fayetteville_location from "@/content/locations/fayetteville-arkansas";
import zivel_fieldhouse_location from "@/content/locations/fieldhouse-mississippi";
import zivel_franklin_cool_springs_location from "@/content/locations/cool-springs-tennessee";
import zivel_highlands_ranch_location from "@/content/locations/highlands-ranch-colorado";
import zivel_hollywood_location from "@/content/locations/hollywood-florida";
import zivel_metairie_location from "@/content/locations/metairie-louisiana";
import zivel_murfreesboro_location from "@/content/locations/murfreesboro-tennessee";
import zivel_newport_location from "@/content/locations/newport-kentucky";
import zivel_palm_coast_location from "@/content/locations/palm-coast-florida";
import zivel_parker_location from "@/content/locations/parker-colorado";
import zivel_riverton_location from "@/content/locations/riverton-utah";
import zivel_rogers_location from "@/content/locations/rogers-arkansas";
export const locations: Location[] = [
  zivel_bentonville_location,
  zivel_belmont_location,
  zivel_brecksville_location,
  zivel_buckhead_location,
  zivel_briargate_location,
  zivel_coral_gables_location,
  zivel_cumming_windermere_location,
  zivel_fayetteville_location,
  zivel_fieldhouse_location,
  zivel_franklin_cool_springs_location,
  zivel_highlands_ranch_location,
  zivel_hollywood_location,
  zivel_metairie_location,
  zivel_murfreesboro_location,
  zivel_newport_location,
  zivel_palm_coast_location,
  zivel_parker_location,
  zivel_riverton_location,
  zivel_rogers_location,
];

export function getLocationByPath(state: string, city: string): Location | undefined {
  const s = state.toLowerCase();
  const c = city.toLowerCase();
  return locations.find((l) => l.stateSlug === s && l.citySlug === c);
}
