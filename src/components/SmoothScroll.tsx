"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HEADER_OFFSET = -96;

/** Shared reference so other components (e.g. BackToTop) can drive Lenis. */
export const lenisStore: { current: Lenis | null } = { current: null };

/**
 * Lenis smooth scrolling, driven by GSAP's ticker and synced with
 * ScrollTrigger so scroll-linked animations stay perfectly in phase.
 * Anchor links (`href="#..."`) are intercepted and scrolled smoothly,
 * accounting for the fixed header. Skipped entirely for reduced-motion
 * users and paused while the preloader locks the page.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      autoRaf: false,
    });
    lenisStore.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Velocity-reactive skew on `[data-scroll-skew]` elements — as the page
    // gains speed the headings tilt a few degrees, then ease back to rest.
    // Composes with GSAP's `transform` (entrance/parallax) on the same nodes.
    const skewTos = new Map<Element, (value: number) => void>();
    const SKEW_SCALE = 0.32;
    const SKEW_MAX = 4;
    let lastSkew = 0;

    const raf = (time: number) => {
      lenis.raf(time * 1000);
      const velocity = lenis.velocity;
      const target =
        Math.abs(velocity) < 0.6
          ? 0
          : Math.max(-SKEW_MAX, Math.min(SKEW_MAX, velocity * SKEW_SCALE));
      if (target === lastSkew && skewTos.size > 0) return;
      for (const el of skewTos.keys()) {
        if (!document.contains(el)) skewTos.delete(el);
      }
      if (skewTos.size === 0) {
        document
          .querySelectorAll<HTMLElement>("[data-scroll-skew]")
          .forEach((el) => {
            skewTos.set(
              el,
              gsap.quickTo(el, "skewX", { duration: 0.9, ease: "power3.out" })
            );
          });
      }
      for (const apply of skewTos.values()) apply(target);
      lastSkew = target;
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const start = () => lenis.start();
    if (document.documentElement.dataset.preloaderDone === "true") {
      start();
    } else {
      lenis.stop();
      window.addEventListener("preloader:done", start, { once: true });
    }

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("preloader:done", start);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return null;
}
