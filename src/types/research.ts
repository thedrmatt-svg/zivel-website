export type ResearchSource = {
  id?: string;
  slug?: string;
  title: string;
  summary: string;
  url: string;
  source?: string;
  journal?: string;
  authors?: string[];
  year?: number;
  tags?: string[];
  relatedServiceSlugs?: string[];

  // Content freshness (used for sitemap <lastmod>; bump updatedAt whenever
  // meaningful content on this research entry changes)
  publishedAt?: string; // ISO date, first published
  updatedAt?: string; // ISO date, most recent meaningful content change
};
