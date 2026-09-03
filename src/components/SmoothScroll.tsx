"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerLenis } from "@/lib/smooth-scroll";

/**
 * One buttery scroll for the whole app.
 *
 * Lenis replaces native wheel/touch scrolling with an eased, frame-rate-aware
 * motion. It respects the shared easing curve and runs through
 * requestAnimationFrame, so it stays smooth even on lower-power devices.
 *
 * It is destroyed on unmount and skipped entirely under reduced motion —
 * Lenis runs its own loop and would otherwise fight the browser's native
 * no-motion handling.
 */
const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    registerLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
