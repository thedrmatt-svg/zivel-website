import type { LocalBlogVersion } from "@/types/local-blog";

export type BlogContentBlock =
  | { type: "paragraph"; text: string; boldLead?: boolean }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[]; ordered?: boolean; boldLead?: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "source"; label: string; url: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishDate: string; // YYYY-MM-DD
  status?: "draft" | "scheduled" | "published";
  publishAt?: string; // ISO timestamp with explicit timezone
  seoTitle?: string;
  tocBelowTitle?: boolean;
  localVersion?: LocalBlogVersion;
  updatedAt?: string; // YYYY-MM-DD, most recent meaningful content change
  author: string;
  category: string;
  readingTime: string;
  featured?: boolean;
  content: BlogContentBlock[];
};
