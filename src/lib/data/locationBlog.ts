import type { BlogPost } from "@/types/blog";
import bentonvilleCryoVsColdPlunge from "@/content/blog/bentonville-cryotherapy-vs-cold-plunge";
import rogersCryoVsColdPlunge from "@/content/blog/rogers-cryotherapy-vs-cold-plunge";

const LOCATION_BLOG_POSTS: Record<string, BlogPost[]> = {
  bentonville: [bentonvilleCryoVsColdPlunge],
  rogers: [rogersCryoVsColdPlunge],
};

export function getLocationBlogPosts(citySlug: string): BlogPost[] {
  return LOCATION_BLOG_POSTS[citySlug] ?? [];
}

export function getLocationBlogPostBySlug(
  citySlug: string,
  slug: string
): BlogPost | undefined {
  return LOCATION_BLOG_POSTS[citySlug]?.find((p) => p.slug === slug);
}

export function getLocationBlogSlugs(citySlug: string): string[] {
  return (LOCATION_BLOG_POSTS[citySlug] ?? []).map((p) => p.slug);
}
