import type { BlogPost } from "@/types/blog";
import coldLightHeatModernRecoveryModalitiesLongevity from "@/content/blog/cold-light-heat-modern-recovery-modalities-longevity";
import recoveryWeeklyWellnessEssentialNotLuxury from "@/content/blog/recovery-weekly-wellness-essential-not-luxury";
import recoveryNervousSystemRegulation from "@/content/blog/recovery-nervous-system-regulation";

export const blogPosts: BlogPost[] = [
  coldLightHeatModernRecoveryModalitiesLongevity,
  recoveryWeeklyWellnessEssentialNotLuxury,
  recoveryNervousSystemRegulation,
].sort((a,b) => (a.date < b.date ? 1 : -1));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
