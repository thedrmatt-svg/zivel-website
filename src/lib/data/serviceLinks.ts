export type ServiceLinkMap = Record<
  string,
  {
    science: string[]; // /science/[slug]
    research: string[]; // /research/[slug]
  }
>;

/**
 * Central source of truth for contextual backlinks.
 * - Keys MUST match service.slug (e.g., "cryotherapy")
 * - science entries MUST match files in src/content/science (without .ts)
 * - research entries MUST match files in src/content/research (without .ts)
 */
export const serviceLinks: ServiceLinkMap = {
  // Core recovery modalities
  "cryotherapy": {
    science: ["cold-exposure", "science-basics"],
    research: ["cryo-001", "cryo-002", "cryo-003", "cryo-004", "cryo-005", "cryo-006"],
  },
  "red-light-therapy": {
    science: ["red-light-mechanisms", "science-basics"],
    research: ["red-light-therapy"],
  },
  "infrared-sauna": {
    science: ["infrared-sauna", "science-basics"],
    research: [],
  },
  "dry-float": {
    science: ["recovery-modalities-float-compression", "science-basics"],
    research: ["float-therapy-sensory-reduction"],
  },
  "compression-therapy": {
    science: ["recovery-modalities-float-compression", "science-basics"],
    research: [],
  },

  // Premium aesthetics (kept conservative; can be expanded later)
  "cryo-slimming": {
    science: ["science-basics"],
    research: [],
  },
  "cryo-toning": {
    science: ["science-basics"],
    research: [],
  },
  "cryo-lift-facial": {
    science: ["science-basics"],
    research: [],
  },
};

export function getLinksForServiceSlug(serviceSlug: string) {
  return serviceLinks[serviceSlug] ?? { science: [], research: [] };
}

export function getRelatedServicesForScienceSlug(scienceSlug: string) {
  return Object.entries(serviceLinks)
    .filter(([, v]) => v.science.includes(scienceSlug))
    .map(([serviceSlug]) => serviceSlug);
}

export function getRelatedServicesForResearchSlug(researchSlug: string) {
  return Object.entries(serviceLinks)
    .filter(([, v]) => v.research.includes(researchSlug))
    .map(([serviceSlug]) => serviceSlug);
}
