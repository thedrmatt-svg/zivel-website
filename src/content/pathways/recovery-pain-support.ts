import type { Pathway } from "@/types/pathway";

export const recoveryPainSupport: Pathway = {
  slug: "recovery-pain-support",
  name: "Recovery & Pain Support",

  seo: {
    title: "Recovery & Pain Support Pathway | Zivel",
    description:
      "A structured, non-invasive recovery pathway designed to support comfort, mobility, and resilience for adults navigating daily physical stress, training load, or lingering stiffness.",
    canonical: "/pathways/recovery-pain-support",
  },

  hero: {
    headline: "Recovery & Pain Support",
    subheadline: "Pain is common—but it does not have to be normal.",
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Find a Location", href: "/locations" },
  },

  whoItsFor: {
    headline: "Who This Pathway Is For",
    body: [
      "The Recovery & Pain Support Pathway is designed for adults approximately 30–65 who want to improve comfort, mobility, and recovery capacity through a consistent wellness routine.",
      "It is commonly used by individuals who feel stiff from sitting all day, sore from physically demanding work, recovering from heavy workouts, or managing lingering discomfort from prior injuries.",
    ],
    bullets: [
      "Stiffness from prolonged sitting or desk work",
      "Soreness from manual or repetitive work",
      "Post-workout recovery support",
      "Recovery support after prior injuries (as part of a broader wellness plan)",
    ],
    note:
      "This pathway is educational and wellness-focused. It is not medical care and does not diagnose or treat conditions.",
  },

  goal: {
    headline: "Primary Goal",
    body: [
      "The goal of this pathway is to support recovery and comfort by promoting circulation, reducing physical tension, and encouraging nervous system down-regulation.",
      "Rather than focusing on short-term fixes, it emphasizes repeatable recovery habits that help the body respond more effectively to physical stress over time.",
    ],
  },

  services: {
    headline: "Services Commonly Used",
    intro:
      "This pathway typically combines the following modalities, selected based on individual preferences and goals:",
    orderedServiceSlugs: [
      "cryotherapy",
      "red-light-therapy",
      "compression-therapy",
      "cryo-soothe",
      "infrared-sauna",
    ],
    note:
      "Dry Float Therapy may be less ideal for some individuals with certain types of low back discomfort due to reduced spinal support during the session. Zivel team members can help guide service selection.",
  },

  howItWorks: {
    headline: "How This Pathway Supports Recovery",
    bullets: [
      "Supports circulation and recovery comfort following physical stress",
      "Helps reduce perceived stiffness and tension through consistent recovery inputs",
      "Encourages nervous system regulation to support restorative recovery habits",
      "Can be used as a stand-alone recovery day or paired with training routines",
    ],
  },

  science: {
    headline: "Science & Education",
    body: [
      "Recovery strategies that support circulation, nervous system balance, and cellular energy production are frequently studied across wellness and performance contexts.",
      "Zivel's approach is evidence-informed and designed to be approachable, repeatable, and aligned with practical recovery routines.",
    ],
    cta: { label: "Explore the Science Hub →", href: "/science" },
  },

  frequency: {
    headline: "Recommended Frequency",
    body: [
      "Frequency varies based on activity level and day-to-day physical demand. Many individuals build this pathway into a weekly routine.",
    ],
    bullets: [
      "1–2 sessions per week during normal routines",
      "2–3 sessions per week during higher physical demand or training blocks",
    ],
  },

  finalCTA: {
    headline: "Support Recovery with a Structured Routine",
    body: [
      "This pathway is designed to make recovery simple: clear modalities, repeatable sessions, and a routine that fits real schedules.",
      "Book a session at a nearby studio and build consistency over time.",
    ],
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },

  relatedPathwaySlugs: [
    "longevity-healthy-aging",
    "mobility-active-lifestyle",
    "stress-sleep-reset",
  ],
};

export default recoveryPainSupport;
