import type { ScienceArticle } from "@/types/science";

const coldExposure: ScienceArticle = {
  slug: "cold-exposure",
  title: "Cold Exposure: How Cryotherapy Supports Recovery",
  description: "Explore the science behind cold therapy and how it may support recovery, inflammation management, and mental clarity.",
  category: "Recovery",
  publishedDate: "2024-02-01",
  readingTimeMinutes: 7,
  body: [
    { type: "p", content: "Cold exposure has been used for centuries to support recovery and wellness. Modern cryotherapy applies these principles in a controlled, efficient format." },
    { type: "h2", content: "The Biology of Cold" },
    { type: "p", content: "When exposed to cold, your body activates several protective mechanisms. Blood vessels constrict to preserve core temperature, then dilate when warming returns—a process that may support circulation and recovery." },
    { type: "h2", content: "Potential Benefits" },
    { type: "ul", content: ["May support post-exercise recovery", "Could help manage inflammation", "May enhance mental alertness and mood", "Supports metabolic activity"] },
    { type: "h2", content: "What to Expect" },
    { type: "p", content: "Whole-body cryotherapy sessions typically last 2-3 minutes at temperatures between -110°C and -140°C. Many people report feeling energized and refreshed after sessions." },
    { type: "p", content: "As with any wellness modality, individual responses vary. Consistency and personalized protocols often yield the best results." },
  ],
  relatedSlugs: ["science-basics", "red-light-mechanisms"],
};

export default coldExposure;
