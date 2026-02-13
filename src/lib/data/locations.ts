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
const GEO_BY_LOCATION_PATH: Record<string, { lat: number; lng: number }> = {
  "arkansas/bentonville": { lat: 36.3729, lng: -94.2088 },
  "north-carolina/belmont": { lat: 35.2430, lng: -81.0370 },
  "ohio/brecksville": { lat: 41.3184, lng: -81.6268 },
  "georgia/buckhead": { lat: 33.8384, lng: -84.3793 },
  "colorado/briargate": { lat: 38.9545, lng: -104.7975 },
  "florida/coral-gables": { lat: 25.7215, lng: -80.2684 },
  "georgia/windermere": { lat: 34.2071, lng: -84.1274 },
  "arkansas/fayetteville": { lat: 36.0822, lng: -94.1719 },
  "mississippi/fieldhouse": { lat: 32.2988, lng: -90.1848 },
  "tennessee/cool-springs": { lat: 35.9270, lng: -86.8186 },
  "colorado/highlands-ranch": { lat: 39.5519, lng: -104.9686 },
  "florida/hollywood": { lat: 26.0112, lng: -80.1495 },
  "louisiana/metairie": { lat: 29.9841, lng: -90.1526 },
  "tennessee/murfreesboro": { lat: 35.8456, lng: -86.3903 },
  "kentucky/newport": { lat: 39.0914, lng: -84.4958 },
  "florida/palm-coast": { lat: 29.5844, lng: -81.2079 },
  "colorado/parker": { lat: 39.5186, lng: -104.7614 },
  "utah/riverton": { lat: 40.5219, lng: -111.9391 },
  "arkansas/rogers": { lat: 36.3320, lng: -94.1185 },
};

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
  const geo = GEO_BY_LOCATION_PATH[key];
  return {
    ...loc,
    ...(geo ? { geo } : {}),
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
