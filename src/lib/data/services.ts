import type { Service } from "@/types/service";

import { cryotherapy } from "@/content/services/cryotherapy";
import { redLightTherapy } from "@/content/services/red-light-therapy";
import { infraredSauna } from "@/content/services/infrared-sauna";

export const services: Service[] = [
  cryotherapy,
  redLightTherapy,
  infraredSauna,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
