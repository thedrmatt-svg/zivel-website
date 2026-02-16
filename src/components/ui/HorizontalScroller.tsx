"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface HorizontalScrollerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export default function HorizontalScroller({
  children,
  speed = 30,
  className = "",
  pauseOnHover = true,
}: HorizontalScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.animationDuration = `${speed}s`;
  }, [speed]);

  return (
    <div
      className={`zv-scroller-wrap overflow-hidden ${className}`}
      onMouseEnter={() => {
        if (pauseOnHover && trackRef.current) {
          trackRef.current.style.animationPlayState = "paused";
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover && trackRef.current) {
          trackRef.current.style.animationPlayState = "running";
        }
      }}
    >
      <div ref={trackRef} className="zv-scroller-track">
        {children}
        {children}
      </div>
    </div>
  );
}
