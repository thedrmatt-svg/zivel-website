export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string;
  readingTime: string;
  featured: boolean;
  content: BlogContentBlock[];
  body?: string;
};
