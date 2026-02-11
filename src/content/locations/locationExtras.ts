export type LocationExtras = {
  placeId?: string;
  mapQuery?: string;
  mapEmbedUrl?: string;

  pricing?: {
    title?: string;
    note?: string;
    items: Array<{
      title: string;
      priceLine?: string;
      bullets?: string[];
      href?: string;
      highlight?: boolean;
    }>;
  };

  memberships?: {
    title?: string;
    note?: string;
    tiers: Array<{
      name: string;
      priceLine?: string;
      bullets: string[];
      href?: string;
      highlight?: boolean;
    }>;
  };

  partners?: {
    title?: string;
    intro?: string;
    items: Array<{
      name: string;
      href: string;
      description?: string;
    }>;
  };

  jobs?: {
    title?: string;
    intro?: string;
    items: Array<{
      title: string;
      type?: string;
      href: string;
      description?: string;
    }>;
  };
};

export const locationExtrasByKey: Record<string, LocationExtras> = {
  "ga/cumming": {
    placeId: "YOUR_PLACE_ID_HERE",
    mapQuery: "3775 Windermere Pkwy Suite L, Cumming, GA 30041",

    pricing: {
      title: "Pricing at Zivel Cumming",
      note: "Placeholder — replace with location-specific pricing.",
      items: [
        {
          title: "Cryotherapy — Single Session",
          priceLine: "From $__",
          bullets: ["Fast session", "Great first visit option"],
          href: "/book",
          highlight: true,
        },
        {
          title: "Red Light Therapy — Pack",
          priceLine: "From $__",
          bullets: ["Best value for consistency", "Flexible scheduling"],
          href: "/pricing",
        },
      ],
    },

    memberships: {
      title: "Memberships at Zivel Cumming",
      note: "Placeholder — replace with location-specific tiers.",
      tiers: [
        {
          name: "Basic",
          priceLine: "From $__/mo",
          bullets: ["Monthly credits", "Member pricing", "Flexible scheduling"],
          href: "/memberships",
        },
        {
          name: "Core",
          priceLine: "From $__/mo",
          bullets: ["More credits", "Better per-session value", "Priority perks (placeholder)"],
          href: "/memberships",
          highlight: true,
        },
        {
          name: "Elite",
          priceLine: "From $__/mo",
          bullets: ["Highest usage", "Best per-session value", "Premium perks (placeholder)"],
          href: "/memberships",
        },
      ],
    },

    partners: {
      title: "Local Partners",
      intro: "We collaborate with local gyms, wellness providers, and community orgs. (Placeholder.)",
      items: [
        { name: "Partner Placeholder 1", href: "#", description: "Short partner description placeholder." },
        { name: "Partner Placeholder 2", href: "#", description: "Short partner description placeholder." },
      ],
    },

    jobs: {
      title: "Jobs at Zivel Cumming",
      intro: "We're always looking for great people. (Placeholder.)",
      items: [
        {
          title: "Wellness Specialist",
          type: "Part-time",
          href: "/careers/apply?loc=ga/cumming",
          description: "Front desk + member experience (placeholder).",
        },
      ],
    },
  },
};

export function getLocationExtras(state: string, city: string): LocationExtras | null {
  const key = `${state}/${city}`.toLowerCase();
  return locationExtrasByKey[key] ?? null;
}
