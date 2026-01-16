import type { ResearchSource } from "@/types/research";
import { research as cryo001 } from "@/content/research/cryo-001";
import { research as cryo002 } from "@/content/research/cryo-002";
import { research as cryo003 } from "@/content/research/cryo-003";
import { research as cryo004 } from "@/content/research/cryo-004";
import { research as cryo005 } from "@/content/research/cryo-005";
import { research as cryo006 } from "@/content/research/cryo-006";
import { redLightTherapyResearch } from "@/content/research/red-light-therapy";

export const researchSources: ResearchSource[] = [
  cryo001,
  cryo002,
  cryo003,
  cryo004,
  cryo005,
  cryo006,
  ...redLightTherapyResearch,
];

export function getResearchBySlug(slug: string) {
  return researchSources.find((r) => r.slug === slug || r.id === slug);
}

export function getResearchForService(serviceSlug: string) {
  return researchSources.filter((r) => (r.relatedServiceSlugs ?? []).includes(serviceSlug));
}
