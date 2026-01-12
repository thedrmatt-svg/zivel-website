import type { ScienceArticle } from "@/types/science";

const article: ScienceArticle = {
  slug: "cold-exposure",
  title: "Cold Exposure: What It May Do and Why People Use It",
  description: "A science-first overview of cold exposure and how it's used in recovery and resilience routines.",
  category: "Recovery",
  publishedDate: "2026-01-11",
  readingTimeMinutes: 7,
  heroImage: { src: "/images/science/cold-exposure.jpg", alt: "Cold exposure and recovery" },
  body: [
    { type: "p", content: "Placeholder draft. Later we'll cite studies and connect each claim to the Research page." },
    { type: "h2", content: "Why cold is used" },
    { type: "ul", content: ["Perceived recovery support", "Post-training routine", "Resilience habits"] },
    { type: "h2", content: "What to expect" },
    { type: "p", content: "Explain normal sensations, common session lengths, and the importance of proper screening." },
  ],
  relatedSlugs: ["science-basics"],
};

export default article;
