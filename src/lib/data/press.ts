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
    id: "club-solutions-2025",
    publication: "Club Solutions Magazine",
    publicationShort: "Club Solutions",
    headline: "From Pain Relief to Growth: Zivel's Journey with ClubReady",
    excerpt:
      "When Dr. Matt O'Neill, a seasoned physical therapist, founded Zivel, his mission was simple but ambitious: help people reduce pain, stress, and anxiety before they're broken, rather than just repairing after injury.",
    date: "2025-08-18",
    url: "https://clubsolutionsmagazine.com/2025/08/from-pain-relief-to-growth-zivels-journey-with-clubready/",
    category: "National",
    featured: true,
  },
  {
    id: "fox8-youtube-2025",
    publication: "WVUE FOX 8 New Orleans",
    publicationShort: "FOX 8 NOLA",
    headline: "Relax, Recover and Recharge with Zivel Wellness",
    excerpt:
      "In this segment sponsored by Zivel, Shan Bailey takes us inside the new Metairie studio taking self-care to the next level with cryotherapy, red light therapy, and more.",
    date: "2025-08-07",
    url: "https://www.youtube.com/watch?v=vQeZWcjgrQE",
    category: "Local",
    featured: true,
  },
  {
    id: "fox8-article-2025",
    publication: "FOX 8 Live",
    publicationShort: "FOX 8 Live",
    headline: "Relax, Recover and Recharge with Zivel Wellness",
    excerpt:
      "A new wellness studio opens its doors in old Metairie, and it's all about helping you relax, recover, and recharge with science-backed therapies.",
    date: "2025-07-31",
    url: "https://www.fox8live.com/video/2025/07/31/relax-recover-recharge-with-zivel-wellness/",
    category: "Local",
  },
  {
    id: "city-lifestyle-2025",
    publication: "City Lifestyle",
    publicationShort: "City Lifestyle",
    headline: "Recovery With Zivel",
    excerpt:
      "City Lifestyle explores Zivel's science-backed approach to recovery, wellness, and peak performance — and how their studio experience is changing what self-care looks like.",
    date: "2025-06-01",
    url: "https://citylifestyle.com/articles/recovery-with-zivel",
    category: "Local",
  },
  {
    id: "einpresswire-newport-anxiety-2025",
    publication: "EIN Presswire",
    publicationShort: "EIN Presswire",
    headline: "Zivel Newport Offers Novel Solutions for Anxiety, Stress and Pain",
    excerpt:
      "Zivel Newport brings cutting-edge, drug-free therapies — including cryotherapy, red light therapy, and dry float — to the Newport community as novel solutions for anxiety, stress, and chronic pain.",
    date: "2025-04-21",
    url: "https://www.einpresswire.com/article/801109434/zivel-newport-offers-novel-solutions-for-anxiety-stress-and-pain",
    category: "Wellness",
  },
  {
    id: "williamson-herald-2025",
    publication: "Williamson Herald",
    publicationShort: "Williamson Herald",
    headline: "Zivel Performance and Recovery Center Comes to Franklin",
    excerpt:
      "Williamson, Inc. welcomed Zivel to the Franklin Cool Springs area with a ribbon cutting. The locally owned business is aimed at helping people recover and feel their best through science-backed therapies.",
    date: "2025-04-10",
    url: "https://www.williamsonherald.com/features/business/zivel-performance-and-recovery-center-comes-to-franklin/article_9f186c8e-d722-4613-affb-2e754550f98e.html",
    category: "Local",
    featured: true,
  },
  {
    id: "linknky-2025",
    publication: "LINK nky",
    publicationShort: "LINK nky",
    headline: "Zivel's Groundbreaking Wellness Tech Bringing 'Rockstar Rejuvenation' to Newport Residents",
    excerpt:
      "Co-founded initially by Korn's lead guitarist Brian Welch and the band's physical therapist, Dr. Matt O'Neill, Zivel is dedicated to advancing drug-free pain relief through novel wellness technologies.",
    date: "2025-02-13",
    url: "https://linknky.com/press-releases/2025/02/13/press-release-zivels-groundbreaking-wellness-tech-bringing-rockstar-rejuvenation-to-newport-residents/",
    category: "Local",
  },
  {
    id: "entrepreneur-franchise-2025",
    publication: "Entrepreneur",
    publicationShort: "Entrepreneur",
    headline: "Start a Zivel Franchise",
    excerpt:
      "A Zivel franchise can offer the chance to start your own business and be your own boss in the Personal-Care Businesses industry. Start your search for the perfect franchise opportunity today.",
    date: "2025-01-01",
    url: "https://www.entrepreneur.com/franchises/directory/zivel/335226249",
    category: "Franchise",
  },
  {
    id: "einpresswire-rogers-2024",
    publication: "EIN Presswire",
    publicationShort: "EIN Presswire",
    headline: "Rogers Residents Can Feel Like Rock Stars With Zivel's 'Cool' New Technology",
    excerpt:
      "Zivel brings whole-body cryotherapy and cutting-edge recovery technology to Rogers, Arkansas — giving residents access to the same elite-level treatments used by professional athletes and touring musicians.",
    date: "2024-12-18",
    url: "https://www.einpresswire.com/article/769921896/rogers-residents-can-feel-like-rock-stars-with-zivel-s-cool-new-technology",
    category: "Local",
  },
  {
    id: "desoto-county-news-2024",
    publication: "DeSoto County News",
    publicationShort: "DeSoto County News",
    headline: "Zivel: Elevating Athletic Performance Through Advanced Recovery Techniques",
    excerpt:
      "Located in the Gatorade Fieldhouse, Zivel emerges as a recovery tool for athletes in DeSoto County and neighboring regions. Among their offerings is the Normatec compression system, which aids in reducing swelling and expelling lactic acids.",
    date: "2024-03-17",
    url: "https://desotocountynews.com/desoto-county-news/zivel-elevating-athletic-performance-through-advanced-recovery-techniques/",
    category: "Local",
  },
  {
    id: "abc4-utah-2024",
    publication: "ABC4 Utah",
    publicationShort: "ABC4 Utah",
    headline: "Zivel Transforms Self-Care Into a Lifestyle",
    excerpt:
      "ABC4 Utah goes inside Zivel to explore how modern recovery technologies — from whole-body cryotherapy to infrared sauna — are redefining what everyday self-care looks like for Utah residents.",
    date: "2024-03-06",
    url: "https://www.youtube.com/watch?v=XlaivFs0_Hc",
    category: "Wellness",
  },
  {
    id: "nwahomepage-article-2023",
    publication: "NWAhomepage.com",
    publicationShort: "NWAhomepage",
    headline: "Zivel Offers Relief from Pain, Stress & Anxiety",
    excerpt:
      "Northwest Arkansas' NWAhomepage.com spotlights Zivel's drug-free approach to pain relief, stress, and anxiety — featuring cryotherapy, red light therapy, and compression therapy available to NWA residents.",
    date: "2023-09-27",
    url: "https://www.nwahomepage.com/lifestyle/sponsored-content/zivel-offers-relief-from-pain-stress-anxiety/",
    category: "Local",
  },
  {
    id: "nwahomepage-video-2023",
    publication: "NWAhomepage.com",
    publicationShort: "NWAhomepage",
    headline: "Zivel Offers Relief from Pain, Stress & Anxiety — Video",
    excerpt:
      "Watch NWAhomepage.com's video feature on Zivel, covering how cryotherapy and advanced recovery technologies are helping Northwest Arkansas residents find relief from pain, stress, and anxiety.",
    date: "2023-09-27",
    url: "https://www.youtube.com/watch?v=qNcxxYQ0Q3w",
    category: "Local",
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
