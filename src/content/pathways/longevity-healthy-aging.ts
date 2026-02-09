import type { Pathway } from "@/types/pathway";

export const longevityHealthyAging: Pathway = {
  slug: "longevity-healthy-aging",
  name: "Longevity & Healthy Aging",

  seo: {
    title: "Longevity & Healthy Aging Pathway | Zivel",
    description:
      "A structured wellness pathway designed to support long-term resilience through repeatable recovery routines that prioritize body-system strength, repair capacity, and consistency.",
    canonical: "/pathways/longevity-healthy-aging",
  },

  hero: {
    headline: "Longevity & Healthy Aging",
    subheadline: "Most people focus on lifestyle. Longevity is built through healthstyle.",
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Find a Location", href: "/locations" },
  },

  whoItsFor: {
    headline: "Who This Pathway Is For",
    body: [
      "This pathway is designed for adults who want to support long-term health by strengthening recovery capacity, resilience, and consistency over time.",
      "Rather than waiting for injury, illness, or burnout, it emphasizes building a repeatable wellness routine that supports the body's ability to adapt, repair, and recover efficiently.",
      "It is suitable for a wide range of individuals—from active adults to people with demanding schedules—because longevity is not a single goal, but a long-term process.",
    ],
    bullets: [
      "Individuals focused on long-term health and sustainable routines",
      "Active adults who want to stay strong, mobile, and consistent over time",
      "People managing high workload or chronic stress who want better recovery habits",
      "Anyone prioritizing resilience and recovery capacity as part of healthy aging",
    ],
    note:
      "This pathway is educational and wellness-focused. It does not replace medical care and does not diagnose or treat conditions.",
  },

  goal: {
    headline: "Primary Goal",
    body: [
      "The goal of this pathway is to build \"healthstyle\": consistent recovery inputs that support long-term body-system resilience, repair capacity, and adaptability.",
      "Longevity is supported by repeatable habits that help the body recover efficiently after physical and lifestyle stressors, which may contribute to improved long-term consistency and wellbeing.",
    ],
  },

  services: {
    headline: "Services Commonly Used",
    intro:
      "This pathway commonly integrates modalities that support cellular energy processes, circulation, and restorative recovery rhythms:",
    orderedServiceSlugs: [
      "red-light-therapy",
      "infrared-sauna",
      "cryotherapy",
    ],
    note:
      "This pathway emphasizes services that align strongly with longevity-oriented recovery routines, while remaining compatible with additional modalities based on individual preferences and goals.",
  },

  howItWorks: {
    headline: "How This Pathway Supports Longevity Routines",
    bullets: [
      "Supports consistent recovery habits that fit real schedules",
      "Encourages restorative rhythms through heat-based relaxation and recovery inputs",
      "Supports cellular and tissue recovery processes through light-based sessions",
      "Adds structured stimulus (cold exposure) that many individuals use for resilience and post-activity recovery routines",
    ],
  },

  science: {
    headline: "Science & Education",
    body: [
      "Longevity-focused wellness often emphasizes mechanisms related to recovery capacity, cellular signaling, circulation, and the ability to return to baseline after stress.",
      "Zivel's Science Hub provides clear, practical education on mechanisms and evidence-informed use patterns across modalities commonly included in this pathway.",
    ],
    cta: { label: "Explore Longevity & Recovery Science →", href: "/science" },
  },

  frequency: {
    headline: "Recommended Frequency",
    body: [
      "Longevity routines tend to work best when they are consistent and repeatable. Many individuals incorporate these modalities as part of a weekly recovery rhythm.",
    ],
    bullets: [
      "1–3 sessions per week to build consistency and reinforce routine",
      "2–4 sessions per week during higher training or higher lifestyle stress periods",
    ],
  },

  finalCTA: {
    headline: "Build Healthstyle with a Repeatable Routine",
    body: [
      "Longevity is not a single session. It is built through consistency—supporting recovery, resilience, and the ability to return to baseline after stress.",
      "Book a session and begin building a routine designed to support long-term wellbeing.",
    ],
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Explore Services", href: "/services" },
  },

  relatedPathwaySlugs: [
    "recovery-pain-support",
    "mobility-active-lifestyle",
    "stress-sleep-reset",
  ],
};

export default longevityHealthyAging;
