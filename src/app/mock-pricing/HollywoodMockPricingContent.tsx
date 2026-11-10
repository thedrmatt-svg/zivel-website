import Image from "next/image";
import { cloneElement, isValidElement, type ReactNode } from "react";
import LocationPricingPage from "../[locale]/locations/[state]/[city]/pricing/page";
import PricingGateModal from "@/components/location/PricingGateModal";
import styles from "./HollywoodMockPricing.module.css";

type PricingNodeProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  href?: string;
  type?: string;
  "aria-label"?: string;
};

function hasHref(node: ReactNode, href: string): boolean {
  if (Array.isArray(node)) return node.some((child) => hasHref(child, href));
  if (!isValidElement<PricingNodeProps>(node)) return false;
  if (node.props.href === href) return true;
  return "children" in node.props && hasHref(node.props.children, href);
}

function containsPricingGate(node: ReactNode): boolean {
  if (Array.isArray(node)) return node.some(containsPricingGate);
  if (!isValidElement<PricingNodeProps>(node)) return false;
  if (node.type === PricingGateModal) return true;
  return "children" in node.props && containsPricingGate(node.props.children);
}

function reorderSpecialsNavigation(node: ReactNode): ReactNode {
  if (Array.isArray(node)) return node.map(reorderSpecialsNavigation);
  if (!isValidElement<PricingNodeProps>(node)) return node;

  if (node.type === "ol") {
    const items = Array.isArray(node.props.children)
      ? [...node.props.children]
      : [node.props.children];
    const specialsIndex = items.findIndex((item) => hasHref(item, "#specials"));
    if (specialsIndex > 0) {
      const [specials] = items.splice(specialsIndex, 1);
      items.unshift(specials);
    }
    return cloneElement(node, { children: items });
  }

  if (!("children" in node.props)) return node;
  return cloneElement(node, {
    children: reorderSpecialsNavigation(node.props.children),
  });
}

function moveSpecialsBeforeMemberships(children: ReactNode): ReactNode[] {
  const items = Array.isArray(children) ? [...children] : [children];
  const specialsIndex = items.findIndex(
    (item) => isValidElement<PricingNodeProps>(item) && item.props.id === "specials",
  );
  const membershipsIndex = items.findIndex(
    (item) => isValidElement<PricingNodeProps>(item) && item.props.id === "memberships",
  );

  if (specialsIndex > 0 && membershipsIndex >= 0) {
    const [specials] = items.splice(specialsIndex, 1);
    items.unshift(specials);
  }
  return items;
}

function mockPricingContent(node: ReactNode): ReactNode {
  if (Array.isArray(node)) return node.map((child, index) => {
    const transformed = mockPricingContent(child);
    return isValidElement(transformed) && transformed.key === null
      ? cloneElement(transformed, { key: `mock-pricing-${index}` })
      : transformed;
  });

  if (typeof node === "string") {
    const trimmed = node.trim();
    if (trimmed === "Pricing & Memberships") return "Holiday Specials, Pricing & Memberships";
    if (trimmed === "Unlock full details below.") return null;
    if (trimmed === "Current Specials") return node.replace("Current Specials", "Holiday Specials");
    if (trimmed === "Specials") return node.replace("Specials", "Holiday Specials");
    return node;
  }

  if (!isValidElement<PricingNodeProps>(node)) return node;
  if (node.type === "meta") return null;
  if (node.type === "script" && node.props.type === "application/ld+json") return null;
  if (
    node.type === "p" &&
    Array.isArray(node.props.children) &&
    node.props.children.some((child) =>
      typeof child === "string" && child.includes("Local pricing and membership options for Zivel ")
    )
  ) {
    return (
      <>
        <p className="mt-4 text-lg font-semibold text-white/90 max-w-xl leading-relaxed">
          Give the gift of feeling better. And don't forget yourself.
        </p>
        {cloneElement(node, {
          children: "This holiday season, give something that truly matters—time to relax, recharge, and recover. Whether you're treating yourself or surprising someone you love, Zivel makes it easy to give the gift of recovery, relaxation, and self-care. Because feeling your best isn't just a gift for others. It's one you deserve, too.",
        })}
      </>
    );
  }

  // Unwrap the lead-capture gate only in this owner preview; its form is never rendered or submitted.
  if (node.type === PricingGateModal) return mockPricingContent(node.props.children);

  if (node.type === "section" && containsPricingGate(node.props.children)) {
    const sectionClasses = node.props.className
      ?.replace(/\bzv-section-elevated\b/g, "")
      .trim();
    return cloneElement(node, {
      className: `${sectionClasses ?? ""} ${styles.contentSurface}`.trim(),
      children: mockPricingContent(node.props.children),
    });
  }

  if (
    node.type === "section" &&
    typeof node.props.className === "string" &&
    node.props.className.includes("zv-hero-bg")
  ) {
    const heroClasses = node.props.className
      .replace(/\bzv-hero-bg\b|\bzv-noise\b/g, "")
      .trim();
    return cloneElement(node, {
      className: `${heroClasses} ${styles.hero}`.trim(),
      children: (
        <>
          <div className={styles.bow} aria-hidden="true">
            <Image
              src="/images/mock/holiday-bow-transparent.png"
              alt=""
              width={370}
              height={285}
              priority
            />
          </div>
          <div className={styles.heroContent}>
            {mockPricingContent(node.props.children)}
          </div>
        </>
      ),
    });
  }

  if (node.type === "nav" && node.props["aria-label"] === "Pricing sections") {
    const navClasses = node.props.className
      ?.replace(/\bbg-black\/90\b/g, "")
      .trim();
    return cloneElement(node, {
      className: `${navClasses ?? ""} ${styles.sectionNav}`.trim(),
      children: mockPricingContent(reorderSpecialsNavigation(node.props.children)),
    });
  }

  if (
    node.type === "div" &&
    node.props.className?.split(/\s+/).includes("space-y-20")
  ) {
    return cloneElement(node, {
      children: mockPricingContent(moveSpecialsBeforeMemberships(node.props.children)),
    });
  }

  if (!("children" in node.props)) return node;
  return cloneElement(node, { children: mockPricingContent(node.props.children) });
}

export default async function HollywoodMockPricingContent() {
  const content = await LocationPricingPage({
    params: Promise.resolve({ state: "florida", city: "hollywood", locale: "en" }),
  });
  return (
    <>
      <div className={styles.snowfall} aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <span className={styles.snowflake} key={index} />
        ))}
      </div>
      {mockPricingContent(content)}
    </>
  );
}
