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
const PLACE_ID_BY_LOCATION_PATH: Record<string, string> = {
  "arkansas/bentonville": "ChIJR09Pun4RyYcRxkI5BNchv1o",
  "north-carolina/belmont": "ChIJjaywtH29VogRFXe1l_SIid0",
  "ohio/brecksville": "ChIJhUVltrPnMIgRR5CgLcH6kEg",
  "georgia/buckhead": "ChIJy62rJ3MF9YgRvu9Ok1SKNVk",
  "florida/coral-gables": "ChIJASK_6UO32YgRpFki1ZCosJc",
  "georgia/windermere": "ChIJV-6ARVqb9YgRj0e_jO2WQ1g",
  "arkansas/fayetteville": "ChIJOQ32BYdvyYcRBVSmzC6EUXU",
  "mississippi/fieldhouse": "ChIJH-Rny771f4gR6Xo-0TmD4fY",
  "tennessee/cool-springs": "ChIJ2wrmYux_ZIgRBiaOZ9F4OJU",
  "colorado/highlands-ranch": "ChIJWfZHnFKDbIcRkP0dRbgJ9cA",
  "florida/hollywood": "ChIJi939hJKr2YgRfV5beSrIpBg",
  "louisiana/metairie": "ChIJcRW5v4CvIIYRV9XzIn-1rjQ",
  "tennessee/murfreesboro": "ChIJYTKz_hoJZIgR1CouEEaQMCY",
  "kentucky/newport": "ChIJXQjPuRuxQYgRdVqMxDTFhb4",
  "florida/palm-coast": "ChIJj-Iwlobr5ogRfJmFlZN-Cf4",
  "colorado/parker": "ChIJe_IaW4mPbIcR1irKWiajjIY",
  "utah/riverton": "ChIJp1GibQmFUocRBLMZt3xJW9k",
  "arkansas/rogers": "ChIJAxzaK14RyYcR1S8wLP9Gq4I",
};

const rawLocations: Location[] = [
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

export const locations: Location[] = rawLocations.map((loc) => {
  const key = `${loc.stateSlug}/${loc.citySlug}`;
  const placeId = PLACE_ID_BY_LOCATION_PATH[key];
  return {
    ...loc,
    google: {
      ...(loc.google ?? {}),
      ...(placeId ? { placeId } : {}),
    },
  };
});

export function getLocationByPath(state: string, city: string): Location | undefined {
  const s = state.toLowerCase();
  const c = city.toLowerCase();
  return locations.find((l) => l.stateSlug === s && l.citySlug === c);
}
