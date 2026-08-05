"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import BackToTopButton from "./back-to-top-button";

function ScrollReset() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (!lenis || previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [lenis, pathname]);

  return null;
}

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
        lerp: 0.12,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
        syncTouch: true,
        syncTouchLerp: 0.1,
        touchInertiaExponent: 1.7,
        touchMultiplier: 1,
        wheelMultiplier: 1,
      }}
      root
    >
      <ScrollReset />
      <BackToTopButton />
    </ReactLenis>
  );
}
