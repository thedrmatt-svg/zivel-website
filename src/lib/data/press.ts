export type PressCategory = "All" | "National" | "Wellness" | "Franchise" | "Local";

export type PressItem = {
  id: string;
  publication: string;
  publicationShort: string;
  headline: string;
  excerpt: string;
  date: string;
  url: string;
  category: Exclude<PressCategory, "All">;
  featured?: boolean;
};

export const pressItems: PressItem[] = [
  {
    id: "entrepreneur-2025",
    publication: "Entrepreneur Magazine",
    publicationShort: "Entrepreneur",
    headline: "How Zivel Is Bringing Science-Backed Recovery to the Masses",
    excerpt:
      "Once reserved for elite athletes and high-performance labs, cryotherapy and red light therapy are now widely accessible — and Zivel is leading the charge with a franchise model built for scale.",
    date: "2025-03-18",
    url: "#",
    category: "National",
    featured: true,
  },
  {
    id: "forbes-franchise-2025",
    publication: "Forbes",
    publicationShort: "Forbes",
    headline: "The Best Franchise Opportunities in Wellness for 2025",
    excerpt:
      "Zivel earns a top spot among the fastest-growing wellness franchise brands, recognized for its science-forward approach and strong unit economics across its expanding network.",
    date: "2025-01-22",
    url: "#",
    category: "Franchise",
    featured: true,
  },
  {
    id: "mindbodygreen-2024",
    publication: "mindbodygreen",
    publicationShort: "mindbodygreen",
    headline: "Cryotherapy + Red Light: The Recovery Stack That Actually Works",
    excerpt:
      "Wellness experts weigh in on why pairing whole-body cryotherapy with red light therapy has become the gold standard for active recovery — and where to find it near you.",
    date: "2024-11-07",
    url: "#",
    category: "Wellness",
    featured: true,
  },
  {
    id: "franchise-times-2025",
    publication: "Franchise Times",
    publicationShort: "Franchise Times",
    headline: "Zivel's Rapid Expansion Signals a Wellness Franchise Boom",
    excerpt:
      "With 19 locations open and dozens more in development, Zivel's founder-led growth story is drawing attention from investors and franchise operators nationwide.",
    date: "2025-02-14",
    url: "#",
    category: "Franchise",
  },
  {
    id: "well-good-2024",
    publication: "Well+Good",
    publicationShort: "Well+Good",
    headline: "We Tried Zivel's CryoLift Facial — Here's What Happened",
    excerpt:
      "The CryoLift facial uses targeted cryo technology to tighten, lift, and brighten skin in under 30 minutes. Our editor tested it for four weeks and the results were hard to argue with.",
    date: "2024-09-30",
    url: "#",
    category: "Wellness",
  },
  {
    id: "nashville-scene-2024",
    publication: "Nashville Scene",
    publicationShort: "Nashville Scene",
    headline: "Cool Springs' Newest Wellness Studio Is Redefining Recovery",
    excerpt:
      "Zivel Cool Springs opened to packed houses in its first month, attracting everyone from professional athletes to remote workers looking for a midday reset.",
    date: "2024-10-15",
    url: "#",
    category: "Local",
  },
  {
    id: "new-orleans-advocate-2025",
    publication: "The Advocate (New Orleans)",
    publicationShort: "The Advocate",
    headline: "Zivel Metairie Is Turning Heads — and Bodies — in the Greater New Orleans Area",
    excerpt:
      "Since opening its doors, Zivel's Metairie location has become a fixture in the local wellness community, drawing loyal clients from across Jefferson and Orleans parishes.",
    date: "2025-01-09",
    url: "#",
    category: "Local",
  },
  {
    id: "inc-2024",
    publication: "Inc. Magazine",
    publicationShort: "Inc.",
    headline: "This Wellness Brand Is Growing Without Sacrificing Quality",
    excerpt:
      "Zivel's leadership team talks about the systems, training standards, and culture that let them scale fast while keeping the studio experience consistent across every market.",
    date: "2024-08-20",
    url: "#",
    category: "National",
  },
  {
    id: "shape-2024",
    publication: "Shape",
    publicationShort: "Shape",
    headline: "Infrared Sauna vs. Traditional Sauna: What the Science Says",
    excerpt:
      "We asked recovery specialists — including the team at Zivel — to break down the difference between infrared and traditional heat therapy and which is better for your goals.",
    date: "2024-07-11",
    url: "#",
    category: "Wellness",
  },
  {
    id: "entrepreneur-franchise-2024",
    publication: "Entrepreneur Magazine",
    publicationShort: "Entrepreneur",
    headline: "5 Wellness Franchises Worth Watching in 2024",
    excerpt:
      "From cryotherapy to compression therapy, these five brands are building durable businesses around the $5.6 trillion global wellness market — and Zivel is near the top of the list.",
    date: "2024-05-03",
    url: "#",
    category: "Franchise",
  },
  {
    id: "cumming-local-2025",
    publication: "Forsyth County News",
    publicationShort: "Forsyth Co. News",
    headline: "Zivel Cumming-Windermere Opens, Brings Cutting-Edge Recovery to North Atlanta",
    excerpt:
      "The newest Zivel location in Cumming brings whole-body cryotherapy, red light therapy, and infrared sauna to Forsyth County residents for the first time.",
    date: "2025-03-01",
    url: "#",
    category: "Local",
  },
  {
    id: "healthline-2024",
    publication: "Healthline",
    publicationShort: "Healthline",
    headline: "What Is Whole-Body Cryotherapy? Benefits, Risks, and What to Expect",
    excerpt:
      "Healthline's editorial team consulted sports medicine experts and visited a Zivel studio to give readers a ground-level look at one of wellness's fastest-growing modalities.",
    date: "2024-06-22",
    url: "#",
    category: "Wellness",
  },
];

export const PRESS_CATEGORIES: PressCategory[] = [
  "All",
  "National",
  "Wellness",
  "Franchise",
  "Local",
];

export function formatPressDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
