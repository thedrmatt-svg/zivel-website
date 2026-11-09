import { cloneElement, isValidElement, type ComponentProps, type ReactNode } from "react";
import LocationPage from "../[locale]/locations/[state]/[city]/page";
import LocationFaq from "@/components/location/LocationFaq";

/**
 * Reuse the real server-rendered page instead of maintaining a second, drifting
 * location template. Only the mock's React tree is changed; the source page and
 * its metadata exports are untouched. No schema ever reaches the mock's HTML.
 */
function mockContent(node: ReactNode): ReactNode {
  // Keep section keys intact: LocationSectionOrder uses them to rank sections.
  if (Array.isArray(node)) return node.map((child, index) => {
    const filtered = mockContent(child);
    return isValidElement(filtered) && filtered.key === null
      ? cloneElement(filtered, { key: `mock-${index}` })
      : filtered;
  });
  if (!isValidElement<{ children?: ReactNode; type?: string }>(node)) return node;
  if (node.type === "meta") return null;
  if (node.type === "script" && node.props.type === "application/ld+json") return null;
  // FAQ is the only nested server component that emits its own JSON-LD.
  // Expand it here so its visible accordion is preserved, but not its schema.
  if (node.type === LocationFaq) {
    return mockContent(LocationFaq(node.props as ComponentProps<typeof LocationFaq>));
  }
  if (!("children" in node.props)) return node;
  return cloneElement(node, { children: mockContent(node.props.children) });
}

export default async function HollywoodMockContent() {
  const content = await LocationPage({
    params: Promise.resolve({ state: "florida", city: "hollywood", locale: "en" }),
  });
  return <>{mockContent(content)}</>;
}
