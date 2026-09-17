import type { Service } from "@/types/service";

const disclaimer =
  "This information is for educational purposes only and is not medical advice. Always consult a qualified healthcare professional regarding medical concerns.";

export const cryoSoothe: Service = {
  slug: "cryo-soothe",
  name: "Cryo Soothe",
  accent: { name: "cryo-blue", hex: "#4ECDC4" },
  hero: {
    media: { type: "image", src: "/images/services/cryo-soothe/hero.avif", alt: "Localized Cryo Soothe treatment with a Neveskin wand" },
    subheadline: "Targeted, non-invasive cold-and-contrast work on the Neveskin wand for comfort in a specific area—not slimming, not a facial, not whole-body cryo.",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },
  intro: {
    headline: "What is Cryo Soothe?",
    paragraphs: [
      "Cryo Soothe uses a manual Neveskin wand for localized comfort and recovery. It belongs to the same technology family as Cryo Slimming, Cryo Toning, and CryoLift Facial, but follows a different protocol.",
      "The service focuses on a specific area such as the shoulders, back, knees, or hips. It is not a body-contouring treatment and does not use a whole-body chamber.",
      "A session typically lasts about 10–15 minutes per area and has no downtime.",
    ],
    bullets: ["Localized comfort protocol", "Approximately 10–15 minutes per area", "Non-invasive with no downtime"],
    media: { type: "image", src: "/images/services/cryo-soothe/hero.avif", alt: "Neveskin wand used for localized comfort cryotherapy" },
  },
  benefits: {
    headline: "Key Benefits",
    items: [
      { title: "Targeted comfort work", description: "Focuses the session on a specific area such as shoulders, back, knees, or hips." },
      { title: "Localized cold exposure", description: "Provides a regional stimulus without using a whole-body chamber." },
      { title: "No downtime", description: "Return to your normal routine after the session." },
      { title: "Complements whole-body cryotherapy", description: "Adds targeted work to a broader cold-exposure routine." },
      { title: "Flexible frequency", description: "Your local team can recommend timing based on the area and your goals." },
      { title: "Stacks with compression and red light", description: "Combines easily with other recovery-focused services." },
    ],
  },
  howItWorks: {
    headline: "What to Expect",
    steps: [
      { title: "Area Selection", description: "Discuss the specific comfort area and complete the studio's safety screening." },
      { title: "Localized Protocol", description: "A trained team member moves the Neveskin wand across the selected area." },
      { title: "After the Session", description: "There is no downtime, and you can return to normal daily activity." },
      { title: "Recommended Frequency", description: "Frequency is flexible and should follow your goals, response, and studio protocol." },
    ],
  },
  science: {
    headline: "The Science Behind Localized Cryotherapy",
    body: [
      "Localized cold-and-contrast application creates temporary skin-temperature and regional blood-flow responses in the selected area.",
      "Unlike a whole-body chamber, Cryo Soothe delivers a regional stimulus. Zivel positions it as non-medical wellness support for targeted comfort, not as treatment for an injury or disease.",
    ],
    media: { type: "image", src: "/images/services/cryo-soothe/hero.avif", alt: "Localized skin-temperature response during Cryo Soothe" },
    cta: { label: "Learn More in the Science Hub", href: "/science" },
  },
  safety: {
    headline: "Is Cryo Soothe Safe?",
    body: [
      "Cryo Soothe is non-invasive, but localized cold is not appropriate for everyone. The studio team will screen the intended area before beginning.",
      "Tell the team about cold reactions, circulation concerns, sensory loss, injuries, surgery, or pregnancy before your session.",
    ],
    contraindications: [
      "Cold sensitivity or cold urticaria",
      "Poor circulation or sensory loss in the treatment area",
      "Open wounds or active skin concerns in the area",
      "Recent injury or surgery not cleared for localized cold",
      "Raynaud's syndrome or similar cold-response concerns",
      "Pregnancy, according to studio protocol and clinical guidance",
    ],
    disclaimer,
  },
  testimonials: { headline: "What Clients Say", items: [] },
  pricingPreview: {
    headline: "Pricing Options",
    cards: [
      { title: "Single Area", priceLine: "Contact Your Studio", details: ["Pricing varies by location", "Ask about current availability"] },
      { title: "Member Options", priceLine: "Contact Your Studio", details: ["Membership benefits vary", "Local team can review options"] },
      { title: "Service Stacks", priceLine: "Contact Your Studio", details: ["Pairs with recovery services", "Ask about packages"] },
    ],
  },
  booking: { headline: "Book Your Cryo Soothe Session", subheadline: "Choose a location and ask the local studio about availability.", locationIdDefault: 11417, badges: ["Secure", "Fast", "Availability varies"] },
  faqs: {
    headline: "Cryo Soothe FAQs",
    items: [
      { question: "How is Cryo Soothe different from Cryo Slimming?", answer: "Cryo Soothe is a localized comfort and recovery protocol. It is not designed or described as an inch-loss or body-contouring service." },
      { question: "How long is a session?", answer: "A session typically lasts about 10–15 minutes per area. Your local studio will confirm timing." },
      { question: "Can I address multiple areas?", answer: "Possibly. Ask your local studio whether multiple areas can be included based on timing and protocol." },
      { question: "How is it different from a cryotherapy chamber?", answer: "Cryo Soothe uses a handheld wand on one specific area. Whole-body cryotherapy exposes most of the body to controlled cold for a brief session." },
      { question: "Can I use Cryo Soothe for soreness?", answer: "Cryo Soothe is offered as non-medical wellness support for localized comfort. It does not diagnose or treat an injury." },
      { question: "How often can I book it?", answer: "Frequency is flexible and depends on the area, your response, and studio protocol." },
      { question: "Can I stack it with compression therapy?", answer: "Yes. Cryo Soothe can be combined with compression therapy, red light therapy, or whole-body cryotherapy when appropriate." },
    ],
  },
  relatedServices: { headline: "Related Services", slugs: ["cryotherapy", "compression-therapy", "red-light-therapy", "cryo-toning", "cryo-slimming"] },
  finalCTA: { headline: "Ready to Feel Better?", primaryCTA: { label: "Book Now", href: "#book" }, secondaryCTA: { label: "View Memberships", href: "/memberships" } },
  seo: {
    title: "Cryo Soothe | Localized Comfort Cryotherapy | Zivel",
    description: "Cryo Soothe at Zivel uses localized Neveskin cryotherapy for comfort in a specific area without a full-body chamber or body-contouring protocol.",
    canonical: "/services/cryo-soothe",
  },
};