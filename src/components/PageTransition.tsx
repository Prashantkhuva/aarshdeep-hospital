"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useScrollReveal";
import { lenisStore } from "@/components/SmoothScroll";
import { Icon } from "@/components/Icon";

const NAME = "Aarshdeep";

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Route-change veil that reuses the preloader's animation language —
 * masked character-by-character logo rise, masked sub-line reveal, then the
 * sheet lifts away with the curved liquid edge — while keeping its own
 * compact content (tooth mark, wordmark, gold progress line). Content swaps
 * underneath while the sheet is fully covering and scroll resets via Lenis.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(
    children
  );
  const childrenRef = useRef(children);

  useEffect(() => {
    childrenRef.current = children;
  }, [children]);

  useEffect(() => {
    if (pathname === pathRef.current) return;
    pathRef.current = pathname;

    const swap = () => {
      lenisStore.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      setDisplayChildren(childrenRef.current);
    };

    const sheet = sheetRef.current;
    if (!sheet || prefersReducedMotion()) {
      swap();
      return;
    }

    registerGsap();
    const ctx = gsap.context(() => {
      const chars = sheet.querySelectorAll<HTMLElement>(".page-transition-char");
      const name = sheet.querySelector<HTMLElement>(".page-transition-name");
      const icon = sheet.querySelector<HTMLElement>(".page-transition-icon");
      const sub = sheet.querySelector<HTMLElement>(".page-transition-sub");
      const subLine = sheet.querySelector<HTMLElement>(".page-transition-sub-line");
      const line = sheet.querySelector<HTMLElement>(".page-transition-line");

      const hide = () => {
        gsap.set(sheet, { visibility: "hidden", pointerEvents: "none" });
      };

      const tl = gsap.timeline({ onComplete: hide });

      gsap.set(sheet, {
        visibility: "visible",
        pointerEvents: "auto",
        yPercent: 0,
      });

      tl.set(name, { opacity: 1, letterSpacing: "0.04em" })
        .fromTo(
          chars,
          { yPercent: 130, rotate: 5, opacity: 0, filter: "blur(5px)" },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.42,
            ease: "power3.out",
            stagger: 0.03,
            immediateRender: true,
          },
          0
        )
        .from(
          icon,
          { yPercent: 60, autoAlpha: 0, scale: 0.6, duration: 0.3, ease: "back.out(2)" },
          0.05
        )
        .to(name, { letterSpacing: "-0.015em", duration: 0.35, ease: "power2.out" }, 0.25)
        .set(sub, { autoAlpha: 1 }, 0.32)
        .fromTo(
          subLine,
          { yPercent: 110, letterSpacing: "0.5em", opacity: 0 },
          {
            yPercent: 0,
            letterSpacing: "0.34em",
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            immediateRender: true,
          },
          0.32
        )
        .from(
          line,
          { scaleX: 0, duration: 0.35, ease: "power2.out", transformOrigin: "left center" },
          0.4
        )
        .add(swap, 0.55)
        .to(
          [chars, sub, icon, line],
          { autoAlpha: 0, duration: 0.15, ease: "power2.in" },
          0.68
        )
        .to(sheet, { yPercent: -112, duration: 0.65, ease: "expo.inOut" }, 0.72)
        .set(sheet, { yPercent: -100 }, "+=0.04");
    }, sheet);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <>
      <div
        ref={sheetRef}
        aria-hidden="true"
        className="page-transition invisible fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-primary text-background will-change-transform"
      >
        <span className="page-transition-icon grid h-14 w-14 place-items-center rounded-full bg-background/10 text-gold ring-1 ring-gold/30">
          <Icon name="tooth" className="h-6 w-6" />
        </span>

        <div className="page-transition-name flex overflow-hidden pb-[0.22em] pt-[0.15em] opacity-0">
          {NAME.split("").map((char, i) => (
            <span
              key={i}
              className={`page-transition-char inline-block font-display text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.15] tracking-tight opacity-0 will-change-transform ${
                char === "A" ? "italic text-gold-soft" : ""
              }`}
            >
              {char}
            </span>
          ))}
        </div>

        <p className="page-transition-sub mt-2 overflow-hidden pb-[0.12em] opacity-0">
          <span className="page-transition-sub-line block whitespace-nowrap font-mono text-[0.6rem] font-medium uppercase tracking-[0.34em] text-gold">
            Dental Clinic
          </span>
        </p>

        <span
          aria-hidden="true"
          className="page-transition-line mt-3 h-px w-40 overflow-hidden bg-background/15"
        >
          <span className="block h-full w-full origin-left scale-x-0 bg-gold" />
        </span>
      </div>
      {displayChildren}
    </>
  );
}
