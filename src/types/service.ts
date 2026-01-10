export type BenefitItem = {
  title: string;
  description: string;
  /**
   * Optional citations that map to the Research Library.
   * Example: ["cryo-001", "cryo-003"]
   */
  citations?: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServiceSEO = {
  title: string;         // <title>
  description: string;   // meta description
  canonical?: string;    // optional canonical URL path
};

export type Service = {
  slug: string;          // URL slug, e.g., "cryotherapy"
  name: string;          // Display name, e.g., "Cryotherapy"
  tagline: string;       // Short hero subheadline
  intro: string;         // One-paragraph intro

  // Visual theming (we'll use more later)
  accent?: "gold" | "red" | "blue" | "green" | "purple" | "neutral";

  // Optional hero image path in /public
  heroImage?: {
    src: string;         // e.g., "/images/services/cryotherapy/hero.jpg"
    alt: string;
  };

  // Main conversion CTA
  primaryCTA: {
    label: string;       // e.g., "Book Cryotherapy"
    href: string;        // e.g., "/locations" or "#book"
  };

  // Content sections (we will expand later)
  benefits: BenefitItem[];
  faqs: FAQItem[];

  // Booking defaults (temporary; later becomes dynamic based on chosen location)
  bookingDefaults?: {
    locationId: number;  // ClubReady set_location
  };

  seo: ServiceSEO;
};
