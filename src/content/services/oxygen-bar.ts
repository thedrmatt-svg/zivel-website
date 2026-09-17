import type { Service } from "@/types/service";

const disclaimer =
  "This information is for educational purposes only and is not medical advice. Always consult a qualified healthcare professional regarding medical concerns.";

export const oxygenBar: Service = {
  slug: "oxygen-bar",
  name: "Oxygen Bar",
  accent: { name: "cool-blue", hex: "#7DD3FC" },
  hero: {
    media: { type: "image", src: "/images/services/oxygen-bar/hero.jpg", alt: "Zivel Oxygen Bar equipment for a seated wellness session" },
    subheadline: "A quiet, low-effort session using concentrated oxygen through a nasal cannula—often with an optional light aroma—for a simple mid-visit reset.",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },
  intro: {
    headline: "What is an Oxygen Bar?",
    paragraphs: [
      "Zivel's Oxygen Bar is a recreational wellness experience, not medical oxygen therapy. A concentrator delivers concentrated oxygen through a comfortable nasal cannula while you remain seated.",
      "Sessions typically last 10–20 minutes. You stay fully clothed, and some studios may offer an optional light aroma.",
      "It is a simple, low-demand reset that can fit between training, work, travel, or other recovery services.",
    ],
    bullets: ["Typically 10–20 minutes", "Seated and fully clothed", "Optional light aroma"],
    media: { type: "image", src: "/images/services/oxygen-bar/hero.jpg", alt: "Zivel Oxygen Bar equipment with optional aroma bottles" },
  },
  benefits: {
    headline: "Key Benefits",
    items: [
      { title: "A simple nervous-system downshift", description: "A quiet seated experience that creates space to pause and reset." },
      { title: "A mid-day clarity ritual", description: "An easy break between work, training, travel, or appointments." },
      { title: "Pairs with compression or dry float", description: "Adds a low-effort step to a broader recovery routine." },
      { title: "Low physical demand", description: "Remain seated, clothed, and comfortable throughout the session." },
      { title: "Sensory reset with optional aroma", description: "Some studios offer a light aroma as part of the experience." },
      { title: "Easy consistency", description: "Short sessions make this service simple to include regularly." },
    ],
  },
  howItWorks: {
    headline: "What to Expect",
    steps: [
      { title: "Arrival & Setup", description: "Check in and get comfortably seated with a clean nasal cannula." },
      { title: "Choose Your Experience", description: "Select plain concentrated oxygen or an optional light aroma where available." },
      { title: "Quiet Reset", description: "Relax and breathe normally for approximately 10–20 minutes." },
      { title: "Continue Your Day", description: "Return to your routine or stack another Zivel recovery service." },
    ],
  },
  science: {
    headline: "The Science Behind the Oxygen Bar",
    body: [
      "Room air contains about 21% oxygen, and healthy hemoglobin is normally already near saturation. An Oxygen Bar should not be confused with hyperbaric oxygen therapy or prescribed medical oxygen.",
      "Zivel positions the Oxygen Bar as a calm recreational wellness experience within a broader recovery routine, without claims to treat disease or correct medical oxygen levels.",
    ],
    media: { type: "image", src: "/images/services/oxygen-bar/hero.jpg", alt: "Recreational Oxygen Bar equipment at Zivel" },
    cta: { label: "Learn More in the Science Hub", href: "/science" },
  },
  safety: {
    headline: "Is the Oxygen Bar Safe?",
    body: [
      "The Oxygen Bar is a recreational wellness service and is not a substitute for prescribed or emergency medical oxygen.",
      "Tell the Zivel team about respiratory or cardiac conditions, oxygen prescriptions, and aroma sensitivities before your session.",
    ],
    contraindications: [
      "COPD or a history of carbon dioxide retention without clinical clearance",
      "Unstable heart or lung disease",
      "Asthma or sensitivity to optional aromas",
      "Use of prescribed oxygen without approval from the prescribing clinician",
    ],
    disclaimer,
  },
  testimonials: { headline: "What Clients Say", items: [] },
  pricingPreview: {
    headline: "Pricing Options",
    cards: [
      { title: "Single Session", priceLine: "Contact Your Studio", details: ["Pricing varies by location", "Ask about current availability"] },
      { title: "Member Options", priceLine: "Contact Your Studio", details: ["Membership benefits vary", "Local team can review options"] },
      { title: "Service Stacks", priceLine: "Contact Your Studio", details: ["Pairs with recovery services", "Ask about packages"] },
    ],
  },
  booking: { headline: "Book Your Oxygen Bar Session", subheadline: "Choose a location and ask the local studio about availability.", locationIdDefault: 11417, badges: ["Secure", "Fast", "Availability varies"] },
  faqs: {
    headline: "Oxygen Bar FAQs",
    items: [
      { question: "Is an Oxygen Bar the same as medical oxygen therapy?", answer: "No. It is a recreational wellness experience and is not prescribed oxygen, emergency oxygen, or hyperbaric oxygen therapy." },
      { question: "How long is a session?", answer: "Most sessions last approximately 10–20 minutes. Timing and availability vary by studio." },
      { question: "How does it feel?", answer: "You remain seated and breathe normally through a lightweight nasal cannula. The session is quiet and low effort." },
      { question: "Are scents required?", answer: "No. Optional light aromas may be available at some studios, and you can request a session without aroma." },
      { question: "Can I stack it with other services?", answer: "Yes. Oxygen Bar sessions can pair well with compression therapy, dry float, infrared sauna, red light therapy, or cryotherapy." },
      { question: "Can I use the Oxygen Bar weekly?", answer: "Many clients include it in a regular wellness routine. Ask your local team and consult a clinician if you have medical concerns." },
    ],
  },
  relatedServices: { headline: "Related Services", slugs: ["compression-therapy", "dry-float", "infrared-sauna", "red-light-therapy", "cryotherapy"] },
  finalCTA: { headline: "Ready to Feel Better?", primaryCTA: { label: "Book Now", href: "#book" }, secondaryCTA: { label: "View Memberships", href: "/memberships" } },
  seo: {
    title: "Oxygen Bar | Calm Reset & Recovery Add-On | Zivel",
    description: "Zivel’s Oxygen Bar is a short seated wellness session using concentrated oxygen through a nasal cannula for a calm reset between recovery services.",
    canonical: "/services/oxygen-bar",
  },
};