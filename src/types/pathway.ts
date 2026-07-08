export type Pathway = {
  slug: string;
  name: string;

  // Content freshness (used for sitemap <lastmod>; bump updatedAt whenever
  // meaningful content on this pathway page changes)
  createdAt?: string; // ISO date, first published
  updatedAt?: string; // ISO date, most recent meaningful content change

  seo: {
    title: string;
    description: string;
    canonical?: string;
  };

  hero: {
    headline: string;
    subheadline: string;
    primaryCTA: { label: string; href: string };
    secondaryCTA: { label: string; href: string };
  };

  whoItsFor: {
    headline: string;
    body: string[];
    bullets?: string[];
    note?: string;
  };

  goal: {
    headline: string;
    body: string[];
  };

  services: {
    headline: string;
    intro?: string;
    orderedServiceSlugs: string[];
    note?: string;
  };

  howItWorks: {
    headline: string;
    bullets: string[];
  };

  science: {
    headline: string;
    body: string[];
    cta: { label: string; href: string };
  };

  frequency: {
    headline: string;
    body: string[];
    bullets?: string[];
  };

  finalCTA: {
    headline: string;
    body: string[];
    primaryCTA: { label: string; href: string };
    secondaryCTA: { label: string; href: string };
  };

  relatedPathwaySlugs?: string[];
};
