import { cloneElement, isValidElement, type ComponentProps, type ReactNode } from "react";
import LocationPage from "../[locale]/locations/[state]/[city]/page";
import LocationFaq from "@/components/location/LocationFaq";
import LocationStatusLine from "@/components/location/LocationStatusLine";
import { getLocationByPath } from "@/lib/data/locations";
import type { Location } from "@/types/location";
import HollywoodHolidayHero from "./HollywoodHolidayHero";
import HollywoodLocationInfo from "./HollywoodLocationInfo";
import styles from "./HollywoodHolidayHero.module.css";

type MockNodeProps = {
  children?: ReactNode;
  type?: string;
  id?: string;
  className?: string;
  role?: string;
  "data-location-faq"?: boolean;
  "aria-labelledby"?: string;
};

function containsLocationTitle(node: ReactNode): boolean {
  if (Array.isArray(node)) return node.some(containsLocationTitle);
  if (!isValidElement<MockNodeProps>(node)) return false;
  if (node.type === "h1" && node.props.id === "location-hero-title") return true;
  return "children" in node.props && containsLocationTitle(node.props.children);
}

function getStatusProps(node: ReactNode): ComponentProps<typeof LocationStatusLine> | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const props = getStatusProps(child);
      if (props) return props;
    }
    return undefined;
  }
  if (!isValidElement<MockNodeProps>(node)) return undefined;
  if (node.type === LocationStatusLine) {
    return node.props as ComponentProps<typeof LocationStatusLine>;
  }
  return "children" in node.props ? getStatusProps(node.props.children) : undefined;
}

/**
 * Reuse the real server-rendered page instead of maintaining a second, drifting
 * location template. Only the mock's React tree is changed; the source page and
 * its metadata exports are untouched. No schema ever reaches the mock's HTML.
 */
function mockContent(node: ReactNode, location: Location): ReactNode {
  // Keep section keys intact: LocationSectionOrder uses them to rank sections.
  if (Array.isArray(node)) return node.map((child, index) => {
    const filtered = mockContent(child, location);
    return isValidElement(filtered) && filtered.key === null
      ? cloneElement(filtered, { key: `mock-${index}` })
      : filtered;
  });
  if (!isValidElement<MockNodeProps>(node)) return node;
  if (node.type === "meta") return null;
  if (node.type === "script" && node.props.type === "application/ld+json") return null;
  if (node.type === "section" && node.props.className === "zv-bleed bg-[#0a0a0a] border-y border-white/10") {
    return cloneElement(node, {
      className: `zv-bleed border-y border-white/10 ${styles.trustBar}`,
      children: mockContent(node.props.children, location),
    });
  }
  if (node.type === "section" && node.props.id === "pricing") {
    const className = node.props.className
      ?.replace(/\bzv-section-(?:light|gradient)\b|\bzv-light\b/g, "")
      .trim();
    return cloneElement(node, {
      className: `${className ?? ""} ${styles.holidayNavySection}`.trim(),
      children: mockContent(node.props.children, location),
    });
  }
  if (node.type === "section" && node.props["data-location-faq"]) {
    const className = node.props.className
      ?.replace(/\bzv-section-gradient\b/g, "")
      .trim();
    return cloneElement(node, {
      className: `${className ?? ""} ${styles.holidayNavySection}`.trim(),
      children: mockContent(node.props.children, location),
    });
  }
  if (node.type === "section" && node.props["aria-labelledby"] === "location-hero-title") {
    const sourceChildren = Array.isArray(node.props.children)
      ? node.props.children
      : [node.props.children];
    const siteInfo = sourceChildren.find(containsLocationTitle);
    return (
      <>
        <HollywoodHolidayHero />
        {siteInfo ? (
          <HollywoodLocationInfo
            location={location}
            statusProps={getStatusProps(siteInfo)}
          />
        ) : null}
      </>
    );
  }
  // FAQ is the only nested server component that emits its own JSON-LD.
  // Expand it here so its visible accordion is preserved, but not its schema.
  if (node.type === LocationFaq) {
    return mockContent(LocationFaq(node.props as ComponentProps<typeof LocationFaq>), location);
  }
  if (!("children" in node.props)) return node;
  return cloneElement(node, { children: mockContent(node.props.children, location) });
}

export default async function HollywoodMockContent() {
  const location = getLocationByPath("florida", "hollywood");
  if (!location) throw new Error("Hollywood mock requires the existing Hollywood location.");
  const content = await LocationPage({
    params: Promise.resolve({ state: "florida", city: "hollywood", locale: "en" }),
  });
  return <>{mockContent(content, location)}</>;
}
