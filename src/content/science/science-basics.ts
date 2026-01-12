import type { ScienceArticle } from "@/types/science";

const scienceBasics: ScienceArticle = {
  slug: "science-basics",
  title: "The Science Behind Modern Wellness",
  description: "An introduction to the scientific principles that power recovery and wellness therapies.",
  category: "Science Basics",
  publishedDate: "2024-01-15",
  readingTimeMinutes: 5,
  body: [
    { type: "p", content: "Modern wellness therapies are grounded in decades of scientific research. From cryotherapy to red light therapy, each modality works through specific biological mechanisms that support recovery, performance, and longevity." },
    { type: "h2", content: "How Your Body Responds to Stress" },
    { type: "p", content: "Controlled stress—like cold exposure or heat therapy—triggers adaptive responses in your body. This concept, known as hormesis, explains why brief, controlled stressors can strengthen your systems over time." },
    { type: "h2", content: "Key Principles" },
    { type: "ul", content: ["Hormesis: beneficial stress adaptation", "Photobiomodulation: light-based cellular support", "Thermoregulation: temperature-based recovery", "Mechanotransduction: pressure and movement signals"] },
    { type: "p", content: "Understanding these principles helps you make informed decisions about which therapies may support your wellness goals." },
  ],
  relatedSlugs: ["cold-exposure", "red-light-mechanisms"],
};

export default scienceBasics;
