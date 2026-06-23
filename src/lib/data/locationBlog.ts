import type { BlogPost } from "@/types/blog";
import bentonvilleCryoVsColdPlunge from "@/content/blog/bentonville-cryotherapy-vs-cold-plunge";
import rogersCryoVsColdPlunge from "@/content/blog/rogers-cryotherapy-vs-cold-plunge";
import brecksvilleCryoVsColdPlunge from "@/content/blog/brecksville-cryotherapy-vs-cold-plunge";
import briargateCryoVsColdPlunge from "@/content/blog/briargate-cryotherapy-vs-cold-plunge";
import buckheadCryoVsColdPlunge from "@/content/blog/buckhead-cryotherapy-vs-cold-plunge";
import coolSpringsCryoVsColdPlunge from "@/content/blog/cool-springs-cryotherapy-vs-cold-plunge";
import coralGablesExecutiveRecovery from "@/content/blog/coral-gables-executive-recovery";
import fayettevilleCryoVsColdPlunge from "@/content/blog/fayetteville-cryotherapy-vs-cold-plunge";
import fieldhouseCryoVsColdPlunge from "@/content/blog/fieldhouse-cryotherapy-vs-cold-plunge";
import highlandsRanchCryoVsColdPlunge from "@/content/blog/highlands-ranch-cryotherapy-vs-cold-plunge";
import hollywoodCryoVsColdPlunge from "@/content/blog/hollywood-cryotherapy-vs-cold-plunge";
import metairieCryoVsColdPlunge from "@/content/blog/metairie-cryotherapy-vs-cold-plunge";
import murfreesboroCryoVsColdPlunge from "@/content/blog/murfreesboro-cryotherapy-vs-cold-plunge";
import newportCryoVsColdPlunge from "@/content/blog/newport-cryotherapy-vs-cold-plunge";
import parkerCryoVsColdPlunge from "@/content/blog/parker-cryotherapy-vs-cold-plunge";
import rivertonCryoVsColdPlunge from "@/content/blog/riverton-cryotherapy-vs-cold-plunge";
import windermereCryoVsColdPlunge from "@/content/blog/windermere-cryotherapy-vs-cold-plunge";

const LOCATION_BLOG_POSTS: Record<string, BlogPost[]> = {
  bentonville: [bentonvilleCryoVsColdPlunge],
  rogers: [rogersCryoVsColdPlunge],
  brecksville: [brecksvilleCryoVsColdPlunge],
  briargate: [briargateCryoVsColdPlunge],
  buckhead: [buckheadCryoVsColdPlunge],
  "cool-springs": [coolSpringsCryoVsColdPlunge],
  "coral-gables": [coralGablesExecutiveRecovery],
  fayetteville: [fayettevilleCryoVsColdPlunge],
  fieldhouse: [fieldhouseCryoVsColdPlunge],
  "highlands-ranch": [highlandsRanchCryoVsColdPlunge],
  hollywood: [hollywoodCryoVsColdPlunge],
  metairie: [metairieCryoVsColdPlunge],
  murfreesboro: [murfreesboroCryoVsColdPlunge],
  newport: [newportCryoVsColdPlunge],
  parker: [parkerCryoVsColdPlunge],
  riverton: [rivertonCryoVsColdPlunge],
  windermere: [windermereCryoVsColdPlunge],
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
