import type { BlogPost } from "@/types/blog";

import post1 from "@/content/blog/cold-light-heat-modern-recovery-modalities-longevity";
import post2 from "@/content/blog/recovery-weekly-wellness-essential-not-luxury";
import post3 from "@/content/blog/recovery-nervous-system-regulation";
import post4 from "@/content/blog/body-remembers-inflammatory-memory";
import holidayPost from "@/content/blog/holiday-stress-is-preventable";
import newYearPost from "@/content/blog/new-year-new-norm-start-now";
import trimUpPost from "@/content/blog/trim-up-before-the-new-year";
import platePost from "@/content/blog/holiday-plate-strategy";

const allBlogPosts: BlogPost[] = [
  platePost,
  trimUpPost,
  newYearPost,
  holidayPost,
  post4,
  post1,
  post2,
  post3,
];

export function getEditorSourcePosts(): BlogPost[] {
  return allBlogPosts;
}

// Evaluate on each request, not once when the module is first loaded.
// Older records without status remain published, preserving existing posts.
export function getPublicationStatus(post: BlogPost, now = Date.now()): "draft" | "scheduled" | "published" {
  if (post.status === "draft") return "draft";
  if (post.publishAt) {
    const timestamp = Date.parse(post.publishAt);
    if (!Number.isFinite(timestamp)) return "draft";
    if (now < timestamp) return "scheduled";
    return "published";
  }
  return post.status === "scheduled" ? "scheduled" : "published";
}

export function getPublishedBlogPosts(now = Date.now()): BlogPost[] {
  return allBlogPosts
    .filter((post) => getPublicationStatus(post, now) === "published")
    .map((post) => ({ ...post, status: "published" }));
}

export function getBlogBySlug(slug: string, now = Date.now()): BlogPost | undefined {
  return getPublishedBlogPosts(now).find((p) => p.slug === slug);
}
