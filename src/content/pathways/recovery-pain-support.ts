import type { Pathway } from "@/types/pathway";

export const recoveryPainSupport: Pathway = {
  slug: "recovery-pain-support",
  name: "Recovery & Pain Support",
  tagline: "Ease tension, reduce soreness, and restore balance.",
  category: "recovery",
  description:
    "A curated multi-service session designed to target soreness, inflammation, and nervous system stress. This pathway combines cold exposure, compression, and infrared heat to help the body recover faster and feel better between workouts, during high-stress periods, or after long days.",
  idealFor: [
    "Athletes managing post-training soreness",
    "Desk workers with chronic tension or stiffness",
    "Anyone recovering from physical or mental fatigue",
    "People seeking natural support for inflammation",
  ],
  totalDuration: "45–60 minutes",

  steps: [
    {
      serviceSlug: "infrared-sauna",
      serviceName: "Infrared Sauna",
      duration: "20 min",
      description:
        "Begin with deep, penetrating infrared heat to warm muscles, promote circulation, and prepare the body for recovery. This step helps loosen tight tissue and supports the body's natural detox processes.",
      order: 1,
    },
    {
      serviceSlug: "compression-therapy",
      serviceName: "Compression Therapy",
      duration: "15 min",
      description:
        "Sequential pneumatic compression targets the legs and lower body to flush metabolic waste, reduce swelling, and accelerate circulatory recovery. Ideal after long runs, flights, or sedentary periods.",
      order: 2,
    },
    {
      serviceSlug: "cryotherapy",
      serviceName: "Cryotherapy",
      duration: "3 min",
      description:
        "A brief, intense cold exposure session to reduce inflammation, trigger endorphin release, and reset the nervous system. The contrast from heat to cold enhances the overall recovery response.",
      order: 3,
    },
  ],

  benefits: [
    {
      title: "Reduced Muscle Soreness",
      description:
        "Cold exposure and compression work together to reduce delayed onset muscle soreness (DOMS) and support faster return to activity.",
    },
    {
      title: "Lower Inflammation",
      description:
        "The heat-to-cold contrast may help modulate the inflammatory response, easing joint stiffness and tissue irritation.",
    },
    {
      title: "Improved Circulation",
      description:
        "Infrared heat dilates blood vessels while cryotherapy triggers vasoconstriction — the alternating effect promotes efficient blood flow.",
    },
    {
      title: "Nervous System Reset",
      description:
        "Cold exposure activates the parasympathetic nervous system, helping shift the body from a stressed state into recovery mode.",
    },
    {
      title: "Better Sleep Quality",
      description:
        "By reducing cortisol levels and easing physical tension, this pathway may support deeper, more restorative sleep.",
    },
    {
      title: "Mental Clarity",
      description:
        "The endorphin and norepinephrine release from cryotherapy often leaves clients feeling focused, alert, and calm.",
    },
  ],

  scienceNote:
    "This pathway leverages contrast therapy principles — alternating vasodilation (heat) and vasoconstriction (cold) — which has been studied for its effects on recovery, inflammation markers, and perceived soreness. Compression therapy adds a mechanical circulatory assist that complements the thermal modalities. While individual results vary, consistent use of these modalities in combination is supported by emerging research in sports medicine and recovery science.",

  testimonials: [
    {
      name: "Marcus T.",
      location: "Scottsdale",
      quote:
        "I do this pathway every Sunday after my long runs. The difference in how I feel Monday morning is night and day.",
    },
    {
      name: "Elena R.",
      location: "Austin",
      quote:
        "I sit at a desk all day and my back was constantly tight. This combination loosened everything up — I actually look forward to it now.",
    },
    {
      name: "Jordan K.",
      location: "Denver",
      quote:
        "Started doing this twice a week and my recovery between training sessions has improved dramatically. Sleep is better too.",
    },
  ],

  faqs: [
    {
      question: "Do I need to do the services in this exact order?",
      answer:
        "The recommended order (heat → compression → cold) is designed to maximize the contrast therapy effect. However, our staff can adjust the sequence based on your preferences and how you're feeling that day.",
    },
    {
      question: "How often should I do this pathway?",
      answer:
        "For active individuals, 1–3 times per week is common. For general wellness and stress management, once a week is a great starting point. Consistency matters more than frequency.",
    },
    {
      question: "Is this pathway safe if I have joint pain or a past injury?",
      answer:
        "Most clients with general joint discomfort benefit from this pathway. However, if you have an acute injury, recent surgery, or a specific medical condition, consult your healthcare provider before booking.",
    },
    {
      question: "Can I book just part of the pathway?",
      answer:
        "Absolutely. Each service can be booked individually. The pathway is a curated combination for those who want a structured, multi-service session.",
    },
    {
      question: "Will I feel cold after the cryotherapy at the end?",
      answer:
        "Most clients feel energized and alert after cryo — not uncomfortably cold. The body warms back up quickly, and many people describe a pleasant rush of warmth and energy within minutes.",
    },
  ],

  relatedPathwaySlugs: ["performance-edge", "longevity-reset"],
};
