import type { BlogPost } from "@/types/blog";
import coldLightHeat from "@/content/blog/cold-light-heat-modern-recovery-modalities-longevity";
import recoveryWeekly from "@/content/blog/recovery-weekly-wellness-essential-not-luxury";
import recoveryNervousSystem from "@/content/blog/recovery-nervous-system-regulation";

export const blogPosts: BlogPost[] = [
  coldLightHeat,
  recoveryWeekly,
  recoveryNervousSystem,
].sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
