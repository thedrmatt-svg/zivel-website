export type Location = {
  name: string;
  slug: string;
  state: string;
  stateSlug: string;
  city?: string;
  citySlug: string;

  seo: {
    title: string;
    description: string;
    canonical?: string;
  };

  contact?: {
    address?: string;
    phone?: string;
    parking?: string;
    notes?: string;
  };

  hours?: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };

  hero?: {
    headline: string;
    subheadline: string;
    image: string;
  };

  announcement?: {
    headline: string;
    dates?: string;
    body: string;
    cta?: string;
    buttons?: { label: string; href: string; variant?: "gold" | "outline" }[];
  };

  about?: {
    headline: string;
    body: string[];
    image: string;
  };

  services: {
    slug: string;
    name: string;
    description?: string;
  }[];

  owners?: {
    name: string;
    bio?: string;
    title?: string;
  }[];

  geo?: {
    lat: number;
    lng: number;
  };

  google?: {
    placeId?: string;
    mapEmbedUrl?: string;
  };

  pricing?: {
    membershipTiers?: {
      name: string;
      price: string;
      cadence: string;
      description: string;
      features: string[];
      mostPopular?: boolean;
      bookingUrl?: string;
    }[];
    specialDeals?: {
      name: string;
      price: string;
      savings: string;
      bookingUrl: string;
    }[];
    standardPrices?: {
      name: string;
      price: string;
      note?: string;
    }[];
  };

  partners?: {
    name: string;
    type: string;
    description?: string;
    website?: string;
    logo?: string;
  }[];

  jobs?: {
    title: string;
    type: string;
    locationNote?: string;
    description: string;
    applyUrl?: string;
  }[];

  store?: {
    name: string;
    description: string;
    image?: string;
    price?: string;
    url?: string;
  }[];

  linkCards?: {
    title: string;
    description?: string;
    price?: string;
    cta: string;
    href: string;
  }[];

  booking?: {
    locationId: number | null;
  };

  faqs?: {
    q: string;
    a: string;
  }[];

  finalCTA?: {
    headline: string;
  };
};

export type LocationOwner = {
  name: string;
  title?: string; // e.g. "Owner", "Co-Owner"
  photo: { src: string; alt: string };
  bio: string[]; // 2–5 short paragraphs
  credentials?: string[]; // bullets
  favorites?: { label: string; href: string }[]; // optional links to services/pathways
};

export type LocationPartner = {
  name: string;
  category: string; // Gym / PT / Sports / Clinic / Wellness / etc.
  logo?: { src: string; alt: string };
  description: string; // 1–2 sentences
  website?: { href: string; label?: string };
  perk?: string; // optional
};

export type LocationFAQ = {
  question: string;
  answer: string;
};

export type LocationReview = {
  name: string; // first name + last initial
  locationLabel?: string; // e.g. "Zivel Newport"
  quote: string;
};

export type LocationServiceCard = {
  slug: string; // must match a service slug
  labelOverride?: string;
  descriptionOverride?: string;
};

export type LocationPage = {
  slug: string;
  stateSlug: string; // e.g. "ky"
  citySlug: string; // e.g. "newport"
  name: string; // e.g. "Newport"
  city: string;
  state: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
  };
  geo?: {
    lat: number;
    lng: number;
  };

  phone: string; // display format
  phoneHref: string; // tel:+1...
  booking: {
    locationId: number | null; // PerformanceIQ / ClubReady location id
    bookingUrl?: string; // fallback link
  };

  hours: {
    label: string; // "Mon–Fri"
    value: string; // "7am–7pm"
  }[];

  hero: {
    headline: string; // H1
    subheadline: string;
    media: { src: string; alt: string };
    primaryCTA: { label: string; href: string }; // usually "#book"
    secondaryCTAs: { label: string; href: string }[]; // call/directions
    trustBadges?: string[];
  };

  stickyCTA?: {
    enabled: boolean;
    items: { label: string; href: string }[]; // Book/Call/Directions/Services
  };

  about: {
    headline: string;
    paragraphs: string[];
    bullets?: string[];
  };

  servicesAtLocation: {
    headline: string;
    items: LocationServiceCard[];
  };

  mostBooked?: {
    headline: string;
    cards: {
      title: string;
      description: string;
      duration?: string;
      cta: { label: string; href: string };
    }[];
  };

  pricingPreview?: {
    headline: string;
    cards: {
      title: string;
      priceLine: string;
      details: string[];
      cta?: { label: string; href: string };
    }[];
    disclaimer?: string;
  };

  reviews?: {
    headline: string;
    items: LocationReview[];
    cta?: { label: string; href: string };
  };

  owners?: {
    headline: string;
    owners: LocationOwner[];
    cta?: { label: string; href: string };
  };

  partners?: {
    headline: string;
    intro: string;
    partners: LocationPartner[];
  };

  faqs?: {
    headline: string;
    items: LocationFAQ[];
  };

  map?: {
    headline: string;
    parkingNotes?: string[];
    nearbyLandmarks?: string[];
  };

  serviceArea?: {
    headline: string;
    paragraphs: string[];
    nearbyAreas?: string[];
    cta?: { label: string; href: string };
  };

  relatedContent?: {
    headline: string;
    cards: { title: string; description: string; href: string }[];
  };

  finalCTA?: {
    headline: string;
    primaryCTA: { label: string; href: string };
    secondaryCTA: { label: string; href: string };
  };

  seo: {
    title: string;
    description: string;
    canonical?: string;
  };

  accent?: {
    name: string; // e.g. "gold"
    hex: string;  // e.g. "#D4AF37"
  };
};
