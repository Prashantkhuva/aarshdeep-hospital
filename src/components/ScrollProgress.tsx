"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

/**
 * Thin gold scroll-progress bar fixed to the top of the viewport.
 * Scrubbed by ScrollTrigger so it stays perfectly in phase with Lenis;
 * skipped entirely for reduced-motion users.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bar = barRef.current;
    if (!bar) return;

    registerGsap();
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left center",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.4,
        },
      }
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
    >
      <div
        ref={barRef}
        className="scroll-progress-bar h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold/50 via-gold to-gold/50 shadow-[0_0_14px_rgba(176,138,70,0.55)]"
      />
    </div>
  );
}
