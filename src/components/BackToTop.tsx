"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore } from "@/components/SmoothScroll";
import { Icon } from "@/components/Icon";

/**
 * Floating back-to-top button that fades in after scrolling past the
 * hero and glides the page back up through Lenis.
 */
export function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    registerGsap();
    const btn = ref.current;
    if (!btn) return;

    const ctx = gsap.context(() => {
      gsap.set(btn, { autoAlpha: 0, y: 16, pointerEvents: "none" });
      ScrollTrigger.create({
        start: 600,
        end: "max",
        onToggle: (self) => {
          gsap.to(btn, {
            autoAlpha: self.isActive ? 1 : 0,
            y: self.isActive ? 0 : 16,
            pointerEvents: self.isActive ? "auto" : "none",
            duration: 0.45,
            ease: "power3.out",
          });
        },
      });
    }, btn);

    return () => ctx.revert();
  }, []);

  const onClick = () => {
    const lenis = lenisStore.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-gold-soft shadow-[0_18px_40px_-16px_rgba(20,60,54,0.55)] ring-1 ring-gold/30 transition-colors duration-300 hover:bg-primary/90 hover:text-gold"
    >
      <Icon name="medicalCross" className="h-5 w-5" />
    </button>
  );
}
