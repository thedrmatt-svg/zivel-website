"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { LocationEnhancementCopy } from "@/lib/location-enhancement-copy";
import { phoneHref } from "@/lib/contact-links";

export default function LocationMobileActions({ basePath, bookingUrl, phone, mapsUrl, copy }: {
  basePath: string; bookingUrl?: string; phone?: string; mapsUrl?: string | null; copy: LocationEnhancementCopy;
}) {
  const pathname = usePathname();
  const bar = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(0);
  const route = pathname.replace(/^\/(?:en|es)(?=\/|$)/, "");
  const onLocation = route === basePath || route.startsWith(`${basePath}/`);

  useEffect(() => {
    if (!onLocation) return;
    const media = window.matchMedia("(max-width: 767px)");
    let hero: Element | null = null;
    let frame = 0;
    const inspect = () => {
      frame = 0;
      hero = document.querySelector("[data-location-hero-actions]");
      const pastHero = hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY >= 400;
      const focused = document.activeElement instanceof HTMLElement
        && (document.activeElement.matches("input,textarea,select") || document.activeElement.isContentEditable);
      // Observe existing UI; never change its behavior or require a consent event.
      // This also handles Essential only, which emits no accept event.
      const blocked = [...document.querySelectorAll<HTMLElement>('[role="dialog"],[aria-modal="true"],#mobile-nav-panel')]
        .some(element => {
          const style = window.getComputedStyle(element);
          return style.display !== "none" && style.visibility !== "hidden" && element.getClientRects().length > 0;
        });
      setVisible(media.matches && pastHero && !focused && !blocked);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(inspect); };
    const intersection = new IntersectionObserver(schedule);
    const observed = new WeakSet<Element>();
    const watchHero = () => {
      const target = document.querySelector("[data-location-hero-actions]");
      if (target && !observed.has(target)) { observed.add(target); intersection.observe(target); }
      schedule();
    };
    const mutation = new MutationObserver(watchHero);
    mutation.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["style", "class", "hidden", "open"] });
    watchHero();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", schedule);
    document.addEventListener("focusout", schedule);
    media.addEventListener("change", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      mutation.disconnect(); intersection.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", schedule); document.removeEventListener("focusout", schedule);
      media.removeEventListener("change", schedule);
    };
  }, [onLocation, pathname]);

  const shown = visible && onLocation;
  useEffect(() => {
    if (!shown || !bar.current) { setHeight(0); return; }
    const measure = () => setHeight(bar.current?.getBoundingClientRect().height ?? 0);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar.current);
    return () => observer.disconnect();
  }, [shown]);

  useEffect(() => {
    if (!shown || !height) return;
    // Body padding keeps even the root-layout footer's last disclaimer reachable.
    const original = document.body.style.paddingBottom;
    const padding = getComputedStyle(document.body).paddingBottom;
    document.body.style.paddingBottom = `calc(${padding} + ${height}px)`;
    // Cherry uses this variable for its bottom offset (button and calculator).
    // Preserve the vendor's configured value; only add the measured bar height.
    const root = document.documentElement;
    const property = "--custom-floating-estimator-offset-y";
    let baseline = "", priority = "", applied = "";
    const offset = () => {
      const current = root.style.getPropertyValue(property);
      if (!current || current === applied) return;
      baseline = current; priority = root.style.getPropertyPriority(property);
      applied = `calc(${baseline} + ${height}px)`;
      root.style.setProperty(property, applied, priority);
    };
    offset();
    const observer = new MutationObserver(offset);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
      document.body.style.paddingBottom = original;
      if (applied && root.style.getPropertyValue(property) === applied) root.style.setProperty(property, baseline, priority);
    };
  }, [shown, height, pathname]);

  if (!onLocation) return null;
  const actions = [
    ...(bookingUrl ? [{ label: copy.bookNow, href: bookingUrl, primary: true, external: true }] : []),
    ...(phone ? [{ label: copy.call, href: phoneHref(phone), primary: false, external: false }] : []),
    ...(mapsUrl ? [{ label: copy.directions, href: mapsUrl, primary: false, external: true }] : []),
  ];
  if (!actions.length) return null;
  return (
    <nav ref={bar} aria-label={copy.actions} data-location-mobile-actions
      hidden={!shown}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/20 bg-black px-3 pt-3 text-white md:hidden"
      style={{ display: shown ? undefined : "none", paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
      <div className="mx-auto grid max-w-6xl gap-2" style={{ gridTemplateColumns: `repeat(${actions.length}, minmax(0, 1fr))` }}>
        {actions.map(action => <a key={action.label} href={action.href}
          target={action.external ? "_blank" : undefined} rel={action.external ? "noopener noreferrer" : undefined}
          className={`flex min-h-11 items-center justify-center rounded-full px-2 py-3 text-center text-sm font-semibold ${action.primary ? "bg-[var(--zivel-gold)] text-black" : "border border-white/30 text-white"}`}>
          {action.label}
        </a>)}
      </div>
    </nav>
  );
}
