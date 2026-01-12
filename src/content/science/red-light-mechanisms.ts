import type { ScienceArticle } from "@/types/science";

const redLightMechanisms: ScienceArticle = {
  slug: "red-light-mechanisms",
  title: "Red Light Therapy: Photobiomodulation Explained",
  description: "Learn how red and near-infrared light interact with your cells to support recovery, skin health, and overall wellness.",
  category: "Science Basics",
  publishedDate: "2024-02-15",
  readingTimeMinutes: 6,
  body: [
    { type: "p", content: "Red light therapy, also known as photobiomodulation (PBM), uses specific wavelengths of light to support cellular function. This non-invasive therapy has been studied for decades." },
    { type: "h2", content: "How Light Affects Cells" },
    { type: "p", content: "Red (630-660nm) and near-infrared (810-850nm) wavelengths penetrate the skin and are absorbed by mitochondria—the powerhouses of your cells. This interaction may support cellular energy production." },
    { type: "h2", content: "Areas of Research" },
    { type: "ul", content: ["Skin health and collagen support", "Muscle recovery and performance", "Joint comfort and mobility", "Mood and cognitive function"] },
    { type: "h2", content: "What Makes It Work" },
    { type: "p", content: "The key is using the right wavelengths at appropriate intensity and duration. Professional-grade devices deliver consistent, therapeutic doses that home devices often cannot match." },
    { type: "p", content: "Red light therapy is generally well-tolerated and can be combined with other recovery modalities for comprehensive wellness support." },
  ],
  relatedSlugs: ["science-basics", "cold-exposure"],
};

export default redLightMechanisms;
