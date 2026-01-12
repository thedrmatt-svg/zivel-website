export type ScienceArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Recovery" | "Performance" | "Anti-Aging" | "Longevity" | "Science Basics";
  publishedDate: string; // YYYY-MM-DD
  updatedDate?: string;  // YYYY-MM-DD
  readingTimeMinutes?: number;
  heroImage?: { src: string; alt: string };
  body: Array<{ type: "p" | "h2" | "ul"; content: string | string[] }>;
  relatedSlugs?: string[];
};
