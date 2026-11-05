import { Fragment, type ReactElement } from "react";

const SECTION_ORDER = [
  "services", "pricing", "reviews", "booking",
  "pathways", "details", "map", "blog",
] as const;

/**
 * Reorder already-created section fragments without adding DOM or changing
 * their contents. Constructing them first preserves the template's original
 * sectionParity evaluation and therefore every existing background choice.
 */
export default function LocationSectionOrder({
  children,
}: {
  children: ReactElement[];
}) {
  const rank = (section: ReactElement) => {
    const index = SECTION_ORDER.indexOf(
      String(section.key) as typeof SECTION_ORDER[number],
    );
    if (index < 0) throw new Error("Unexpected section in location section order.");
    return index;
  };

  return <Fragment>{[...children].sort((a, b) => rank(a) - rank(b))}</Fragment>;
}
