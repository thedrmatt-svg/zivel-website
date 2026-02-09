import type { Pathway } from "@/types/pathway";

export const mobilityActiveLifestyle: Pathway = {
  slug: "mobility-active-lifestyle",
  name: "Mobility & Active Lifestyle",

  seo: {
    title: "Mobility & Active Lifestyle Pathway | Zivel",
    description:
      "A structured recovery pathway designed to support mobility, comfort, and consistency so clients can stay active long term without burning out or stopping due to soreness.",
    canonical: "/pathways/mobility-active-lifestyle",
  },

  hero: {
    headline: "Mobility & Active Lifestyle",
    subheadline: "Move what you can, move when you can, move while you can.",
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Find a Location", href: "/locations" },
  },

  whoItsFor: {
    headline: "Who This Pathway Is For",
    body: [
      "This pathway is designed for anyone who wants to keep moving well over time, from people just starting their health journey to those who have trained consistently for decades.",
      "Movement is one of the most important long-term variables in health. Many people start hard, push too aggressively early, get sore or uncomfortable, and then stop. This pathway is designed to help prevent that cycle by supporting recovery habits that make consistency easier.",
      "It supports clients who want mobility, comfort, and repeatable routines that make long-term progress more sustainable.",
    ],
    bullets: [
      "Beginners building a sustainable routine without burnout",
      "Consistent exercisers who want better recovery quality and mobility support",
      "Active adults who want to keep moving well as life and training demands change",
      "Anyone focused on long-term consistency rather than short-term intensity",
    ],
    note:
      "This pathway is educational and wellness-focused. It does not replace medical care and does not diagnose or treat conditions.",
  },

  goal: {
    headline: "Primary Goal",
    body: [
      "The goal of this pathway is to support mobility and movement consistency by improving recovery quality and reducing the likelihood of stopping due to soreness or discomfort.",
      "Instead of chasing intensity, it emphasizes repeatable recovery inputs that help clients feel better, move better, and stay consistent with their long-term plan.",
    ],
  },

  services: {
    headline: "Services Commonly Used",
    intro:
      "This pathway commonly integrates recovery modalities that support circulation, comfort, and readiness so movement stays sustainable:",
    orderedServiceSlugs: [
      "cryotherapy",
      "red-light-therapy",
      "compression-therapy",
      "infrared-sauna",
      "cryo-soothe",
    ],
    note:
      "Service selection can be adjusted based on activity level and how the body responds. Some clients prioritize sauna for relaxation and mobility, while others prioritize targeted Cryo Soothe for specific areas.",
  },

  howItWorks: {
    headline: "How This Pathway Supports Mobility Routines",
    bullets: [
      "Supports recovery comfort so movement stays consistent week to week",
      "Promotes circulation and readiness habits commonly used around workouts and active lifestyles",
      "Helps reduce the start-hard, stop-early cycle by building recovery into the routine",
      "Fits beginners and experienced clients by emphasizing consistency and sustainability",
    ],
  },

  science: {
    headline: "Science & Education",
    body: [
      "Mobility and consistency are influenced by recovery quality, circulation patterns, tissue comfort, and the ability to return to baseline after activity.",
      "Zivel's Science Hub provides clear education on evidence-informed recovery modalities commonly used to support movement quality and long-term consistency.",
    ],
    cta: { label: "Explore Mobility & Recovery Science \u2192", href: "/science" },
  },

  frequency: {
    headline: "Recommended Frequency",
    body: [
      "Frequency depends on activity level and how quickly soreness or stiffness builds with training or daily demands. Many clients use this pathway as a repeatable baseline for mobility and movement consistency.",
    ],
    bullets: [
      "1\u20132 sessions per week as a long-term consistency baseline",
      "2\u20133 sessions per week during higher activity periods or when soreness builds faster",
    ],
  },

  finalCTA: {
    headline: "Stay Active Longer by Recovering Better",
    body: [
      "Movement is a long-term game. This pathway helps clients build recovery habits that support mobility, comfort, and consistency over time.",
      "Book a session and start building a routine that keeps the body moving well.",
    ],
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Explore Services", href: "/services" },
  },

  relatedPathwaySlugs: [
    "longevity-healthy-aging",
    "recovery-pain-support",
    "performance-athletic-optimization",
  ],
};

export default mobilityActiveLifestyle;
