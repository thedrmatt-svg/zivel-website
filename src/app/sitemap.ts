import type { MetadataRoute } from "next";
import { services, getServiceBySlug } from "@/lib/data/services";
import { blogPosts } from "@/lib/data/blog";
import { scienceArticles } from "@/lib/data/science";
import { researchSources } from "@/lib/data/research";
import { pathways } from "@/lib/data/pathways";
import { locations } from "@/lib/data/locations";
import { LOCAL_SERVICE_COMBOS } from "@/lib/data/local-service-pages";
import {
  getLocationBlogPosts,
  getLocationBlogSlugs,
} from "@/lib/data/locationBlog";
import type { Media } from "@/types/service";
import type { BlogPost } from "@/types/blog";
import { DEFAULT_CONTENT_DATE } from "@/lib/data/contentDates";

const SITE_URL = "https://www.zivel.com";

/**
 * Static, hand-maintained dates for pages that have no per-item content
 * source (home, index pages, legal pages, etc). These are NOT build time —
 * they should only be bumped when the actual page content meaningfully
 * changes (copy, sections, structure), never for unrelated rebuilds.
 */
const STATIC_PAGE_DATES: Record<string, string> = {
  home: "2026-02-19",
  services: "2026-02-16",
  locations: "2026-02-16",
  franchise: "2026-07-08",
  blog: "2026-02-19",
  press: "2026-02-16",
  science: "2026-02-16",
  research: "2026-02-16",
  pathways: "2026-02-09",
  about: "2026-02-16",
  contact: "2026-02-16",
  memberships: "2026-02-16",
  "privacy-policy": "2026-02-16",
  "terms-and-conditions": "2026-02-16",
};

function imgUrl(media: Media | undefined): string | null {
  if (!media || media.type !== "image") return null;
  if (media.src.endsWith(".svg")) return null;
  return `${SITE_URL}${media.src}`;
}

function serviceImgUrls(service: ReturnType<typeof getServiceBySlug>): string[] {
  if (!service) return [];
  const imgs: string[] = [];
  const hero = imgUrl(service.hero?.media);
  if (hero) imgs.push(hero);
  const intro = imgUrl(service.intro?.media);
  if (intro) imgs.push(intro);
  service.beforeAfter?.items
    .filter((item) => item.src && !item.src.endsWith(".svg"))
    .forEach((item) => imgs.push(`${SITE_URL}${item.src!}`));
  return imgs;
}

/** Returns the most recent (max) of the given ISO date strings, ignoring undefined. */
function maxDate(...dates: (string | undefined)[]): string {
  const valid = dates.filter((d): d is string => Boolean(d));
  if (valid.length === 0) return DEFAULT_CONTENT_DATE;
  return valid.reduce((latest, current) =>
    new Date(current) > new Date(latest) ? current : latest
  );
}

function blogPostDate(post: BlogPost): string {
  return post.updatedAt ?? post.publishDate;
}
/**
 * Returns true when a URL should be kept out of the sitemap.
 *
 * All paid-ads landing pages live under /ads/:city — a single pattern
 * automatically covers every current and future city page without requiring
 * manual entries. No hard-coded set is needed.
 */
function isExcludedFromSitemap(url: string): boolean {
  const path = url.replace(SITE_URL, "");
  // Primary convention: /ads/:city (e.g. /ads/riverton, /ads/riverton-google)
  if (/^\/ads(\/|$)/.test(path)) return true;
  // Belt-and-suspenders: also exclude legacy root paths that redirect to /ads/*
  // (e.g. /riverton-ads, /riverton-google)
  if (/^\/[\w-]+-ads\/?$/.test(path)) return true;
  if (/^\/riverton-google\/?$/.test(path)) return true;
  return false;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(STATIC_PAGE_DATES.home), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: new Date(STATIC_PAGE_DATES.services), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/locations`, lastModified: new Date(STATIC_PAGE_DATES.locations), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/franchise`, lastModified: new Date(STATIC_PAGE_DATES.franchise), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(STATIC_PAGE_DATES.blog), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/press`, lastModified: new Date(STATIC_PAGE_DATES.press), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/science`, lastModified: new Date(STATIC_PAGE_DATES.science), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/research`, lastModified: new Date(STATIC_PAGE_DATES.research), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/pathways`, lastModified: new Date(STATIC_PAGE_DATES.pathways), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(STATIC_PAGE_DATES.about), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(STATIC_PAGE_DATES.contact), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/memberships`, lastModified: new Date(STATIC_PAGE_DATES.memberships), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(STATIC_PAGE_DATES["privacy-policy"]), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: new Date(STATIC_PAGE_DATES["terms-and-conditions"]), changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt ?? DEFAULT_CONTENT_DATE),
    changeFrequency: "monthly",
    priority: 0.8,
    images: serviceImgUrls(s),
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(blogPostDate(p)),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const sciencePages: MetadataRoute.Sitemap = scienceArticles.map((a) => ({
    url: `${SITE_URL}/science/${a.slug}`,
    lastModified: new Date(a.updatedDate ?? a.publishedDate),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const researchPages: MetadataRoute.Sitemap = researchSources.map((r) => ({
    url: `${SITE_URL}/research/${r.slug ?? r.id}`,
    lastModified: new Date(r.updatedAt ?? r.publishedAt ?? DEFAULT_CONTENT_DATE),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const pathwayPages: MetadataRoute.Sitemap = pathways.map((p) => ({
    url: `${SITE_URL}/pathways/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? DEFAULT_CONTENT_DATE),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const LOCATION_IMAGES = [`${SITE_URL}/images/og-image.jpg`];

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}`,
    lastModified: new Date(l.updatedAt ?? DEFAULT_CONTENT_DATE),
    changeFrequency: "weekly",
    priority: 0.8,
    images: LOCATION_IMAGES,
  }));

  const stateSlugs = Array.from(new Set(locations.map((l) => l.stateSlug)));
  const stateIndexPages: MetadataRoute.Sitemap = stateSlugs.map((stateSlug) => {
    const stateLocations = locations.filter((l) => l.stateSlug === stateSlug);
    const latest = maxDate(...stateLocations.map((l) => l.updatedAt));
    return {
      url: `${SITE_URL}/locations/${stateSlug}`,
      lastModified: new Date(latest),
      changeFrequency: "weekly",
      priority: 0.7,
    };
  });

  const localServicePages: MetadataRoute.Sitemap = LOCAL_SERVICE_COMBOS
    .filter((c) => c.locale === "en")
    .map((c) => {
      const svc = getServiceBySlug(c.service);
      const loc = locations.find((l) => l.stateSlug === c.state && l.citySlug === c.city);
      const imgs = serviceImgUrls(svc);
      const lastModified = maxDate(loc?.updatedAt, svc?.updatedAt);
      return {
        url: `${SITE_URL}/locations/${c.state}/${c.city}/${c.service}`,
        lastModified: new Date(lastModified),
        changeFrequency: "weekly" as const,
        priority: 0.75,
        images: imgs.length > 0 ? imgs : undefined,
      };
    });

  const locationPricingPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/pricing`,
    lastModified: new Date(l.pricing?.pricingUpdatedAt ?? l.updatedAt ?? DEFAULT_CONTENT_DATE),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const locationBlogIndexPages: MetadataRoute.Sitemap = locations
    .filter((l) => getLocationBlogPosts(l.citySlug).length > 0)
    .map((l) => {
      const posts = getLocationBlogPosts(l.citySlug);
      const latest = maxDate(l.updatedAt, ...posts.map(blogPostDate));
      return {
        url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/blog`,
        lastModified: new Date(latest),
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });

  const locationBlogPostPages: MetadataRoute.Sitemap = locations.flatMap((l) =>
    getLocationBlogSlugs(l.citySlug).flatMap((slug) => {
      const post = getLocationBlogPosts(l.citySlug).find((p) => p.slug === slug);
      if (!post) return [];
      return [
        {
          url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/blog/${slug}`,
          lastModified: new Date(blogPostDate(post)),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
      ];
    })
  );

  const locationPathwayPages: MetadataRoute.Sitemap = locations.map((l) => {
    const latest = maxDate(l.updatedAt, ...pathways.map((p) => p.updatedAt));
    return {
      url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/pathways`,
      lastModified: new Date(latest),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...sciencePages,
    ...researchPages,
    ...pathwayPages,
    ...locationPages,
    ...stateIndexPages,
    ...localServicePages,
    ...locationPricingPages,
    ...locationPathwayPages,
    ...locationBlogIndexPages,
    ...locationBlogPostPages,
  ].filter((entry) => !isExcludedFromSitemap(entry.url));
}
