import { Fragment, type ReactElement } from "react";

const BRECKSVILLE_ORDER = [
  "services", "pricing", "reviews", "booking",
  "pathways", "details", "map", "blog",
] as const;

/**
 * Reorder already-created section fragments without adding DOM or changing
 * their contents. Constructing them first preserves the template's original
 * sectionParity evaluation and therefore every existing background choice.
 */
export default function BrecksvilleSectionOrder({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactElement[];
}) {
  if (!enabled) return <Fragment>{children}</Fragment>;

  const rank = (section: ReactElement) => {
    const index = BRECKSVILLE_ORDER.indexOf(
      String(section.key) as typeof BRECKSVILLE_ORDER[number],
    );
    if (index < 0) throw new Error("Unexpected section in Brecksville section order.");
    return index;
  };

  return <Fragment>{[...children].sort((a, b) => rank(a) - rank(b))}</Fragment>;
}
