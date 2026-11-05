"use client";

import { useEffect, useId, useRef, useState } from "react";

type ReviewTextProps = {
  text: string;
  className?: string;
  readMoreLabel?: string;
  readLessLabel?: string;
};

export default function ReviewText({
  text,
  className,
  readMoreLabel = "Read more",
  readLessLabel = "Read less",
}: ReviewTextProps) {
  const paragraphId = `review-text-${useId()}`;
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    const measureOverflow = () => {
      const originalStyles = {
        display: paragraph.style.display,
        overflow: paragraph.style.overflow,
        webkitBoxOrient: paragraph.style.webkitBoxOrient,
        webkitLineClamp: paragraph.style.webkitLineClamp,
      };

      paragraph.style.display = "-webkit-box";
      paragraph.style.overflow = "hidden";
      paragraph.style.webkitBoxOrient = "vertical";
      paragraph.style.webkitLineClamp = "6";
      const overflowing = paragraph.scrollHeight > paragraph.clientHeight + 1;

      paragraph.style.display = originalStyles.display;
      paragraph.style.overflow = originalStyles.overflow;
      paragraph.style.webkitBoxOrient = originalStyles.webkitBoxOrient;
      paragraph.style.webkitLineClamp = originalStyles.webkitLineClamp;

      setHasOverflow(overflowing);
    };

    measureOverflow();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measureOverflow);
      observer.observe(paragraph);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", measureOverflow);
    return () => window.removeEventListener("resize", measureOverflow);
  }, [text, expanded]);

  return (
    <div>
      <p
        id={paragraphId}
        ref={paragraphRef}
        className={className}
        style={
          expanded
            ? undefined
            : {
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 6,
              }
        }
      >
        {text}
      </p>
      {hasOverflow ? (
        <button
          type="button"
          aria-controls={paragraphId}
          aria-expanded={expanded}
          className="mt-2 text-sm underline underline-offset-4"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? readLessLabel : readMoreLabel}
        </button>
      ) : null}
    </div>
  );
}
