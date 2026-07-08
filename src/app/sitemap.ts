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

const SITE_URL = "https://www.zivel.com";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/locations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/franchise`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/press`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/science`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/pathways`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/memberships`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    images: serviceImgUrls(s),
  }));

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishDate),
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
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const pathwayPages: MetadataRoute.Sitemap = pathways.map((p) => ({
    url: `${SITE_URL}/pathways/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const LOCATION_IMAGES = [
    `${SITE_URL}/images/locations/studio-hero.jpg`,
    `${SITE_URL}/images/locations/studio-about.jpg`,
  ];

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    images: LOCATION_IMAGES,
  }));

  const stateSlugs = Array.from(new Set(locations.map((l) => l.stateSlug)));
  const stateIndexPages: MetadataRoute.Sitemap = stateSlugs.map((stateSlug) => ({
    url: `${SITE_URL}/locations/${stateSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const localServicePages: MetadataRoute.Sitemap = LOCAL_SERVICE_COMBOS
    .filter((c) => c.locale === "en")
    .map((c) => {
      const svc = getServiceBySlug(c.service);
      const imgs = serviceImgUrls(svc);
      return {
        url: `${SITE_URL}/locations/${c.state}/${c.city}/${c.service}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.75,
        images: imgs.length > 0 ? imgs : undefined,
      };
    });

  const locationPricingPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/pricing`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const locationBlogIndexPages: MetadataRoute.Sitemap = locations
    .filter((l) => getLocationBlogPosts(l.citySlug).length > 0)
    .map((l) => ({
      url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const locationBlogPostPages: MetadataRoute.Sitemap = locations.flatMap((l) =>
    getLocationBlogSlugs(l.citySlug).map((slug) => ({
      url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const locationPathwayPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}/pathways`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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
  ];
}
