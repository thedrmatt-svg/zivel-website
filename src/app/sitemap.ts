import type { MetadataRoute } from "next";
import { services } from "@/lib/data/services";
import { blogPosts } from "@/lib/data/blog";
import { scienceArticles } from "@/lib/data/science";
import { researchSources } from "@/lib/data/research";
import { pathways } from "@/lib/data/pathways";
import { locations } from "@/lib/data/locations";

const SITE_URL = "https://www.zivel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/locations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/science`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/pathways`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
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

  const locationPages: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${SITE_URL}/locations/${l.stateSlug}/${l.citySlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...sciencePages,
    ...researchPages,
    ...pathwayPages,
    ...locationPages,
  ];
}
