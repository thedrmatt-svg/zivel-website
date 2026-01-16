import type { ScienceArticle } from "@/types/science";

import scienceBasics from "@/content/science/science-basics";
import coldExposure from "@/content/science/cold-exposure";
import redLightMechanisms from "@/content/science/red-light-mechanisms";
import infraredSauna from "@/content/science/infrared-sauna";
import recoveryModalitiesFloatCompression from "@/content/science/recovery-modalities-float-compression";

export const scienceArticles: ScienceArticle[] = [
  scienceBasics,
  coldExposure,
  redLightMechanisms,
  infraredSauna,
  recoveryModalitiesFloatCompression,
];

export function getScienceBySlug(slug: string) {
  return scienceArticles.find((a) => a.slug === slug);
}

export function getArticlesForService(serviceSlug: string) {
  return scienceArticles.filter((a) => (a.relatedServiceSlugs ?? []).includes(serviceSlug));
}
