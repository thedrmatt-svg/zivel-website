import type { Location } from "@/types/location";

import newportKy from "@/content/locations/newport-ky";
import hollywoodFl from "@/content/locations/hollywood-fl";
import rivertonUt from "@/content/locations/riverton-ut";

import coralGablesFl from "@/content/locations/coral-gables-fl";
import palmCoastFl from "@/content/locations/palm-coast-fl";

import buckheadGa from "@/content/locations/buckhead-ga";
import windermereGa from "@/content/locations/windermere-ga";

import murfreesboroTn from "@/content/locations/murfreesboro-tn";
import coolSpringsTn from "@/content/locations/cool-springs-tn";

import brecksvilleOh from "@/content/locations/brecksville-oh";
import metairieLa from "@/content/locations/metairie-la";

import fieldhouseMs from "@/content/locations/fieldhouse-ms";

import bentonvilleAr from "@/content/locations/bentonville-ar";
import rogersAr from "@/content/locations/rogers-ar";
import fayettevilleAr from "@/content/locations/fayetteville-ar";

import parkerCo from "@/content/locations/parker-co";
import highlandsRanchCo from "@/content/locations/highlands-ranch-co";
import briargateCo from "@/content/locations/briargate-co";

export const locations: Location[] = [
  newportKy,
  hollywoodFl,
  rivertonUt,
  coralGablesFl,
  palmCoastFl,
  buckheadGa,
  windermereGa,
  murfreesboroTn,
  coolSpringsTn,
  brecksvilleOh,
  metairieLa,
  fieldhouseMs,
  bentonvilleAr,
  rogersAr,
  fayettevilleAr,
  parkerCo,
  highlandsRanchCo,
  briargateCo,
];

export function getLocationByPath(state: string, city: string): Location | undefined {
  const s = state.toLowerCase();
  const c = city.toLowerCase();
  return locations.find((l) => l.stateSlug === s && l.citySlug === c);
}
