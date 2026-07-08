import type { ResearchSource } from "@/types/research";
import { DEFAULT_CONTENT_DATE } from "@/lib/data/contentDates";
import { research as cryo001 } from "@/content/research/cryo-001";
import { research as cryo003 } from "@/content/research/cryo-003";
import { research as cryo004 } from "@/content/research/cryo-004";
import { research as cryo006 } from "@/content/research/cryo-006";
import { redLightTherapyResearch } from "@/content/research/red-light-therapy";
import floatTherapySensoryReduction from "@/content/research/float-therapy-sensory-reduction";

function withResearchDateFallback(item: ResearchSource): ResearchSource {
  return {
    ...item,
    publishedAt: item.publishedAt ?? DEFAULT_CONTENT_DATE,
    updatedAt: item.updatedAt ?? item.publishedAt ?? DEFAULT_CONTENT_DATE,
  };
}

export const researchSources: ResearchSource[] = [
  cryo001,
  cryo003,
  cryo004,
  cryo006,
  ...redLightTherapyResearch,
  floatTherapySensoryReduction,
].map(withResearchDateFallback);

export function getResearchBySlug(slug: string) {
  return researchSources.find((r) => r.slug === slug || r.id === slug);
}

export function getResearchForService(serviceSlug: string) {
  return researchSources.filter((r) => (r.relatedServiceSlugs ?? []).includes(serviceSlug));
}
