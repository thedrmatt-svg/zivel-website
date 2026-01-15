import { research as cryo001 } from "@/content/research/cryo-001";
import { research as cryo002 } from "@/content/research/cryo-002";
import { research as cryo003 } from "@/content/research/cryo-003";
import { research as cryo004 } from "@/content/research/cryo-004";
import { research as cryo005 } from "@/content/research/cryo-005";
import { research as cryo006 } from "@/content/research/cryo-006";

export const researchSources = [
  cryo001,
  cryo002,
  cryo003,
  cryo004,
  cryo005,
  cryo006,
];

export function getResearchBySlug(slug: string) {
  return researchSources.find((r) => r.slug === slug);
}
