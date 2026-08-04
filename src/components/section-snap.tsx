"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";
import { usePathname } from "next/navigation";

const SNAP_SELECTOR = "main > section:first-child, main > .reveal-section, footer";
const MOBILE_HEADER_HEIGHT = 64;
const DESKTOP_HEADER_HEIGHT = 72;

function getHeaderHeight(): number {
  return window.matchMedia("(min-width: 900px)").matches
    ? DESKTOP_HEADER_HEIGHT
    : MOBILE_HEADER_HEIGHT;
}

function getSnapPoints(elements: HTMLElement[]): number[] {
  const viewportHeight = window.innerHeight;
  const pageLimit = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
  const headerHeight = getHeaderHeight();
  const pageHeight = Math.max(320, viewportHeight - headerHeight);
  const points = new Set<number>();

  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + rect.height;
    const first = Math.max(0, Math.min(pageLimit, Math.round(top - headerHeight)));
    const last = Math.max(first, Math.min(pageLimit, Math.round(bottom - viewportHeight)));

    points.add(first);
    for (let point = first + pageHeight; point < last; point += pageHeight) {
      points.add(Math.round(point));
    }
    points.add(last);
  });

  return [...points].sort((left, right) => left - right);
}

export default function SectionSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    let snap: Snap | null = null;
    let rebuildTimer = 0;
    const rebuild = () => {
      snap?.destroy();
      snap = null;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(SNAP_SELECTOR));
      if (elements.length < 2) return;

      snap = new Snap(lenis, {
        debounce: 72,
        distanceThreshold: "52%",
        duration: 0.32,
        easing: (time) => 1 - (1 - time) ** 4,
        type: "proximity",
      });
      getSnapPoints(elements).forEach((point) => snap?.add(point));
    };
    const scheduleRebuild = () => {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(rebuild, 140);
    };

    rebuild();
    const resizeObserver = new ResizeObserver(scheduleRebuild);
    resizeObserver.observe(document.body);
    window.addEventListener("resize", scheduleRebuild);

    return () => {
      window.clearTimeout(rebuildTimer);
      window.removeEventListener("resize", scheduleRebuild);
      resizeObserver.disconnect();
      snap?.destroy();
    };
  }, [lenis, pathname]);

  return null;
}
