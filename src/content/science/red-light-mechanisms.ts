import type { ScienceArticle } from "@/types/science";

const article: ScienceArticle = {
  featured: true,
  relatedServiceSlugs: ["red-light-therapy"],
  slug: "red-light-mechanisms",
  title: "Red Light Therapy: The Mechanisms People Talk About",
  description: "A practical look at proposed mechanisms and how to think about protocols without hype.",
  category: "Recovery",
  publishedDate: "2026-01-11",
  readingTimeMinutes: 7,
  heroImage: { src: "/images/science/red-light.jpg", alt: "Red light therapy mechanisms" },
  body: [
    { type: "p", content: "Placeholder draft. Later we'll connect each mechanism to linked sources and make it citation-driven." },
    { type: "h2", content: "How people describe the mechanism" },
    { type: "ul", content: ["Cellular signaling support", "Tissue comfort and recovery routines", "Skin-focused protocols"] },
    { type: "h2", content: "What matters most" },
    { type: "p", content: "Explain consistency, time, distance, and why protocols vary by goal." },
  ],
  relatedSlugs: ["science-basics"],
};

export default article;
