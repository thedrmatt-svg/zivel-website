import type { Pathway } from "@/types/pathway";

import recoveryPainSupport from "@/content/pathways/recovery-pain-support";

export const pathways: Pathway[] = [
  recoveryPainSupport,
];

export function getPathwayBySlug(slug: string): Pathway | undefined {
  return pathways.find((p) => p.slug === slug);
}
