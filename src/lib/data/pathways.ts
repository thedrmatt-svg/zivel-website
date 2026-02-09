import type { Pathway } from "@/types/pathway";

import { recoveryPainSupport } from "@/content/pathways/recovery-pain-support";

export const pathways: Pathway[] = [recoveryPainSupport];

export function getPathwayBySlug(slug: string): Pathway | undefined {
  return pathways.find((p) => p.slug === slug);
}

export function getPathwaysByCategory(
  category: Pathway["category"]
): Pathway[] {
  return pathways.filter((p) => p.category === category);
}
