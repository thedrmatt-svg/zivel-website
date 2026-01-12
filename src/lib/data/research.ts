import { researchSources } from "@/content/research";
export { researchSources };

export function getResearchBySlug(slug: string) {
  return researchSources.find((s) => s.slug === slug);
}
