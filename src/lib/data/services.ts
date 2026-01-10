import type { Service } from "@/types/service";

import { cryotherapy } from "@/content/services/cryotherapy";
import { redLightTherapy } from "@/content/services/red-light-therapy";

export const services: Service[] = [
  cryotherapy,
  redLightTherapy,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
