import type { ScienceArticle } from "@/types/science";

const article: ScienceArticle = {
  featured: true,
  relatedServiceSlugs: ["cryotherapy","red-light-therapy","infrared-sauna","dry-float","compression-therapy"],
  slug: "science-basics",
  title: "How Recovery Science Works",
  description: "A clear primer on recovery, adaptation, and consistency—built for real people, not academics.",
  category: "Science Basics",
  publishedDate: "2026-01-11",
  readingTimeMinutes: 6,
  heroImage: { src: "/images/science/science-basics.jpg", alt: "Recovery science overview" },
  body: [
    { type: "p", content: "This is a placeholder article that will be expanded. The goal is to explain recovery in plain language and build topical authority for Zivel." },
    { type: "h2", content: "Adaptation, stress, and repair" },
    { type: "p", content: "Explain the stimulus → recovery → adaptation loop and why consistency matters." },
    { type: "h2", content: "How Zivel services fit in" },
    { type: "ul", content: ["Cryotherapy: stress modulation + recovery support", "Red light therapy: cellular signaling support", "Infrared sauna: relaxation + heat adaptation support", "Dry float: nervous system downshift"] },
  ],
  relatedSlugs: ["cold-exposure", "red-light-mechanisms"],
};

export default article;
