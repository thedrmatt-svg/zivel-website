import { cloneElement, isValidElement, type ComponentProps, type ReactNode } from "react";
import LocationPage from "../[locale]/locations/[state]/[city]/page";
import LocationFaq from "@/components/location/LocationFaq";
import HollywoodHolidayHero from "./HollywoodHolidayHero";
import styles from "./HollywoodHolidayHero.module.css";

type MockNodeProps = {
  children?: ReactNode;
  type?: string;
  id?: string;
  className?: string;
  role?: string;
  "aria-labelledby"?: string;
};

function containsLocationTitle(node: ReactNode): boolean {
  if (Array.isArray(node)) return node.some(containsLocationTitle);
  if (!isValidElement<MockNodeProps>(node)) return false;
  if (node.type === "h1" && node.props.id === "location-hero-title") return true;
  return "children" in node.props && containsLocationTitle(node.props.children);
}

function mockSiteInfo(node: ReactNode): ReactNode {
  if (!isValidElement<MockNodeProps>(node)) return mockContent(node);
  const className = node.props.className
    ?.replace(/\bbg-black\b/g, "")
    .trim();

  return cloneElement(node, {
    className: `${className ?? ""} ${styles.siteInfo}`.trim(),
    role: "region",
    "aria-labelledby": "location-site-info-title",
    children: mockContent(node.props.children),
  });
}

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
  if (!isValidElement<MockNodeProps>(node)) return node;
  if (node.type === "meta") return null;
  if (node.type === "script" && node.props.type === "application/ld+json") return null;
  if (node.type === "section" && node.props["aria-labelledby"] === "location-hero-title") {
    const sourceChildren = Array.isArray(node.props.children)
      ? node.props.children
      : [node.props.children];
    const siteInfo = sourceChildren.find(containsLocationTitle);
    return (
      <>
        <HollywoodHolidayHero />
        {siteInfo ? mockSiteInfo(siteInfo) : null}
      </>
    );
  }
  // FAQ is the only nested server component that emits its own JSON-LD.
  // Expand it here so its visible accordion is preserved, but not its schema.
  if (node.type === LocationFaq) {
    return mockContent(LocationFaq(node.props as ComponentProps<typeof LocationFaq>));
  }
  if (node.type === "h1" && node.props.id === "location-hero-title") {
    return (
      <h2 id="location-site-info-title" className={node.props.className}>
        {mockContent(node.props.children)}
      </h2>
    );
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
