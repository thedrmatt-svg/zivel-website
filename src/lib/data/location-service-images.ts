const NATIONAL_SERVICE_IMAGES: Record<string, string> = {
  "cryotherapy": "/images/home/service-cryo.jpg",
  "red-light-therapy": "/images/home/service-redlight.jpg",
  "infrared-sauna": "/images/home/service-sauna.jpg",
  "dry-float": "/images/home/service-dryfloat.jpg",
  "compression-therapy": "/images/home/service-compression.jpg",
  "oxygen-bar": "/images/services/oxygen-bar/hero.jpg",
  "cryo-soothe": "/images/services/cryo-soothe/hero.avif",
  "cryo-slimming": "/images/home/service-slimming.jpg",
  "cryo-toning": "/images/services/cryo-toning/hero.avif",
  "cryo-lift-facial": "/images/services/cryo-lift-facial/hero.avif",
};

// Register only custom photos that exist in public/locations/<city>/services/.
// The asset regression test also detects new uploads that need registration.
const CUSTOM_SERVICE_IMAGES: Record<string, readonly string[]> = {
  "highlands-ranch": ["cryo-lift-facial", "infrared-sauna", "cryotherapy"],
};

// These studios were explicitly excluded from the missing-image fix.
const LEGACY_IMAGE_LOCATIONS = new Set(["brecksville", "palm-coast", "belmont"]);

export function getNationalServiceImage(slug: string): string {
  return NATIONAL_SERVICE_IMAGES[slug] ?? "/images/home/service-exercise.jpg";
}

export function getLocationServiceImage(citySlug: string, slug: string): string {
  if (LEGACY_IMAGE_LOCATIONS.has(citySlug) || CUSTOM_SERVICE_IMAGES[citySlug]?.includes(slug)) {
    return `/locations/${citySlug}/services/${slug}.jpg`;
  }
  return getNationalServiceImage(slug);
}
