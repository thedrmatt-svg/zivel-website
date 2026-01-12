import type { ScienceArticle } from "@/types/science";

import scienceBasics from "@/content/science/science-basics";
import coldExposure from "@/content/science/cold-exposure";
import redLightMechanisms from "@/content/science/red-light-mechanisms";

export const scienceArticles: ScienceArticle[] = [
  scienceBasics,
  coldExposure,
  redLightMechanisms,
];

export function getScienceBySlug(slug: string) {
  return scienceArticles.find((a) => a.slug === slug);
}
