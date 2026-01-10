import type { Service } from "@/types/service";

import { cryotherapy } from "@/content/services/cryotherapy";

export const services: Service[] = [
  cryotherapy,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
