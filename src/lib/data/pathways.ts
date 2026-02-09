import type { Pathway } from "@/types/pathway";

import recoveryPainSupport from "@/content/pathways/recovery-pain-support";
import longevityHealthyAging from "@/content/pathways/longevity-healthy-aging";
import stressSleepReset from "@/content/pathways/stress-sleep-reset";
import performanceAthleticOptimization from "@/content/pathways/performance-athletic-optimization";

export const pathways: Pathway[] = [
  recoveryPainSupport,
  longevityHealthyAging,
  stressSleepReset,
  performanceAthleticOptimization,
];

export function getPathwayBySlug(slug: string): Pathway | undefined {
  return pathways.find((p) => p.slug === slug);
}
