"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import BackToTopButton from "./back-to-top-button";
import SectionSnap from "./section-snap";

export default function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!reducedMotion.matches);
    update();
    reducedMotion.addEventListener("change", update);
    return () => reducedMotion.removeEventListener("change", update);
  }, []);

  if (!enabled) return <BackToTopButton />;

  return (
    <ReactLenis
      options={{
        anchors: { offset: 0 },
        autoRaf: true,
        lerp: 0.075,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        wheelMultiplier: 0.92,
      }}
      root
    >
      <SectionSnap />
      <BackToTopButton />
    </ReactLenis>
  );
}
