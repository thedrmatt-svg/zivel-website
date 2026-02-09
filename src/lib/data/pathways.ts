import type { Pathway } from "@/types/pathway";

import recoveryPainSupport from "@/content/pathways/recovery-pain-support";
import longevityHealthyAging from "@/content/pathways/longevity-healthy-aging";

export const pathways: Pathway[] = [
  recoveryPainSupport,
  longevityHealthyAging,
];

export function getPathwayBySlug(slug: string): Pathway | undefined {
  return pathways.find((p) => p.slug === slug);
}
