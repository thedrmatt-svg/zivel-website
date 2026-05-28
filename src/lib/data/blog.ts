import type { BlogPost } from "@/types/blog";

import post1 from "@/content/blog/cold-light-heat-modern-recovery-modalities-longevity";
import post2 from "@/content/blog/recovery-weekly-wellness-essential-not-luxury";
import post3 from "@/content/blog/recovery-nervous-system-regulation";
import post4 from "@/content/blog/body-remembers-inflammatory-memory";

export const blogPosts: BlogPost[] = [
  post4,
  post1,
  post2,
  post3,
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
