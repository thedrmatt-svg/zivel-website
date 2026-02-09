import type { Pathway } from "@/types/pathway";

export const stressSleepReset: Pathway = {
  slug: "stress-sleep-reset",
  name: "Stress & Sleep Reset",

  seo: {
    title: "Stress & Sleep Reset Pathway | Zivel",
    description:
      "A structured wellness pathway designed to support nervous system regulation and healthier sleep routines through repeatable, non-invasive recovery modalities.",
    canonical: "/pathways/stress-sleep-reset",
  },

  hero: {
    headline: "Stress & Sleep Reset",
    subheadline:
      "Sleep is the foundational habit that all other health is built on top of.",
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Find a Location", href: "/locations" },
  },

  whoItsFor: {
    headline: "Who This Pathway Is For",
    body: [
      "This pathway is designed for adults who want to improve sleep quality and feel less chronically \"wired\" or fatigued during the day.",
      "Sleep challenges are one of the most common barriers to consistent wellness routines. Many individuals report feeling tired all the time\u2014even when they believe they are resting.",
      "This pathway emphasizes nervous system regulation and repeatable recovery habits that support a healthier baseline over time.",
    ],
    bullets: [
      "Individuals who feel tired, overstimulated, or unable to fully \"shut down\"",
      "People with high workload, travel demands, or inconsistent schedules",
      "Active adults who want better recovery quality through better sleep habits",
      "Anyone prioritizing foundational wellness habits and long-term consistency",
    ],
    note:
      "This pathway is educational and wellness-focused. It does not replace medical care and does not diagnose or treat sleep disorders.",
  },

  goal: {
    headline: "Primary Goal",
    body: [
      "The goal of this pathway is to support nervous system down-regulation and recovery rhythms that make restorative sleep more achievable.",
      "Rather than relying on intensity, it focuses on consistency: repeatable sessions that help the body shift toward a calmer baseline and improved recovery capacity over time.",
    ],
  },

  services: {
    headline: "Services Commonly Used",
    intro:
      "This pathway typically combines modalities that support nervous system regulation, recovery comfort, and restorative routines:",
    orderedServiceSlugs: [
      "cryotherapy",
      "dry-float",
      "red-light-therapy",
    ],
    note:
      "Service selection can be adjusted based on individual preference and comfort. Zivel team members can help guide the sequence and session mix.",
  },

  howItWorks: {
    headline: "How This Pathway Supports Sleep & Stress Recovery",
    bullets: [
      "Creates a structured recovery window that encourages down-regulation",
      "Supports the transition from high stimulation to restorative recovery habits",
      "Pairs passive modalities (float + red light) with short, controlled stimulus (cold exposure) to support balance",
      "Encourages consistency\u2014one of the most important variables in sleep improvement routines",
    ],
  },

  science: {
    headline: "Science & Education",
    body: [
      "Sleep and recovery are closely tied to nervous system regulation, stress physiology, and the ability to return to baseline after daily demands.",
      "Zivel's Science Hub provides clear education on evidence-informed recovery modalities commonly used to support restorative routines and resilience.",
    ],
    cta: { label: "Explore Sleep & Recovery Science \u2192", href: "/science" },
  },

  frequency: {
    headline: "Recommended Frequency",
    body: [
      "Many individuals benefit from using this pathway consistently, especially during periods of high stress, poor sleep, or schedule disruption.",
    ],
    bullets: [
      "1\u20132 sessions per week to reinforce recovery rhythm",
      "2\u20133 sessions per week during high stress or inconsistent sleep periods",
    ],
  },

  finalCTA: {
    headline: "Start Building Better Sleep Through Better Recovery",
    body: [
      "Sleep is not only a nighttime outcome. It is shaped by daily recovery habits, stress load, and nervous system balance.",
      "Book a session and begin building a repeatable routine that supports calmer days and more restorative nights.",
    ],
    primaryCTA: { label: "Book Now", href: "/#book" },
    secondaryCTA: { label: "Explore Services", href: "/services" },
  },

  relatedPathwaySlugs: [
    "longevity-healthy-aging",
    "recovery-pain-support",
    "mobility-active-lifestyle",
  ],
};

export default stressSleepReset;
