export type PathwayServiceStep = {
  serviceSlug: string;
  serviceName: string;
  duration: string;
  description: string;
  order: number;
};

export type PathwayBenefit = {
  title: string;
  description: string;
};

export type PathwayTestimonial = {
  name: string;
  location?: string;
  quote: string;
};

export type PathwayFAQ = {
  question: string;
  answer: string;
};

export type Pathway = {
  slug: string;
  name: string;
  tagline: string;
  category: "recovery" | "performance" | "beauty" | "longevity";
  description: string;
  idealFor: string[];
  totalDuration: string;
  steps: PathwayServiceStep[];
  benefits: PathwayBenefit[];
  scienceNote: string;
  testimonials: PathwayTestimonial[];
  faqs: PathwayFAQ[];
  relatedPathwaySlugs: string[];
};
