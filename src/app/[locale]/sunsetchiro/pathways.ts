export const pathways = [
  {
    number: "01",
    name: "Neuro Recovery",
    label: "REST & RECHARGE",
    description:
      "A calm, restorative visit built around light, cold, weightless rest, and a moment to breathe. Your clinician can help you decide what fits your care plan.",
    services: [
      { name: "Red Light Therapy", detail: "A quiet start for a recovery-focused routine." },
      { name: "Cryotherapy", detail: "A brief whole-body cold experience." },
      { name: "Float Therapy", detail: "Dry float time for deep relaxation." },
      { name: "Oxygen", detail: "A comfortable finish at the oxygen bar." },
    ],
  },
  {
    number: "02",
    name: "Accident",
    label: "GENTLE SUPPORT",
    description:
      "A simple sequence for patients looking to add wellness services alongside their clinician-directed recovery. Only begin after your treating clinician clears each service.",
    services: [
      { name: "Red Light Therapy", detail: "A low-effort place to start." },
      { name: "Compression", detail: "Time to rest while the legs are supported." },
      { name: "Cryotherapy", detail: "A short cold session, when appropriate." },
    ],
  },
  {
    number: "03",
    name: "Spine Pain",
    label: "MOVE WITH CARE",
    description:
      "A comfort-minded routine to explore with your chiropractor. Heat and cold may not be right for every condition, so ask your care team first.",
    services: [
      { name: "Red Light Therapy", detail: "A gentle, seated wellness session." },
      { name: "Sauna", detail: "A chance to unwind with infrared warmth." },
      { name: "Cryotherapy", detail: "A brief cold session, if cleared for you." },
    ],
  },
] as const;