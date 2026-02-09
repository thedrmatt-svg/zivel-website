import type { BlogPost } from "@/types/blog";
import coldLightHeatModernRecoveryModalitiesLongevity from "@/content/blog/cold-light-heat-modern-recovery-modalities-longevity";
import recoveryWeeklyWellnessEssentialNotLuxury from "@/content/blog/recovery-weekly-wellness-essential-not-luxury";

export const blogPosts: BlogPost[] = [
  coldLightHeatModernRecoveryModalitiesLongevity,
  recoveryWeeklyWellnessEssentialNotLuxury,
].sort((a,b) => (a.date < b.date ? 1 : -1));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
