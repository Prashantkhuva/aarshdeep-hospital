"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useScrollReveal";
import { CONTACT } from "@/data/content";

const SESSION_KEY = "aarshdeep-preloader-played";
const NAME = "Aarshdeep";
const TAG_LINES = CONTACT.tagline.split(", ");

function getSessionValue(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionValue(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* private mode — just replay the loader next time */
  }
}

/**
 * Resolves once the page fonts are loaded (or a short timeout elapses) so
 * the wordmark never animates in a fallback font and then snaps to the
 * real one mid-rise — that swap is what makes the start look rough.
 */
function waitForFonts(timeoutMs = 900): Promise<void> {
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  if (!fonts) return Promise.resolve();
  return Promise.race([
    fonts.ready.then(() => {}),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

/**
 * Marks the intro as finished so other components (e.g. Hero) can start
 * their entrance animation while the curtain is still lifting (overlap,
 * same as flowiee.com).
 */
function markPreloaderDone() {
  document.documentElement.dataset.preloaderDone = "true";
  window.dispatchEvent(new Event("preloader:done"));
}

/**
 * Flowiee-style branded preloader: masked character-by-character logo
 * rise, masked line reveals for the sub-label and tagline, italic serif
 * counter, then the sheet lifts away with a curved liquid edge. Full
 * ceremony on first visit per session, quick lift afterwards; skipped
 * entirely for reduced-motion users.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const hide = () => {
      el.style.display = "none";
    };

    if (prefersReducedMotion()) {
      markPreloaderDone();
      hide();
      return;
    }

    const start = () => {
      if (cancelled) return;
      registerGsap();
      document.body.style.overflow = "hidden";

      ctx = gsap.context(() => {
      const chars = el.querySelectorAll<HTMLElement>(".pl-char");
      const logo = el.querySelector(".pl-logo");
      const sub = el.querySelector(".pl-sub");
      const subLine = el.querySelector(".pl-sub-line");
      const tag = el.querySelector(".pl-tag");
      const tagLines = el.querySelectorAll<HTMLElement>(".pl-tag-line");
      const countWrap = el.querySelector(".pl-count");
      const num = { v: 0 };

      const finish = () => {
        setSessionValue(SESSION_KEY, "1");
        document.body.style.overflow = "";
        hide();
      };

      const tl = gsap.timeline({ onComplete: finish });

      // Return visits: skip the ceremony but still ease the brand in —
      // a hard set would make the text pop, not slide
      if (getSessionValue(SESSION_KEY)) {
        tl.set(logo, { opacity: 1 })
          .set(sub, { autoAlpha: 1 })
          .from(
            chars,
            {
              yPercent: 120,
              rotate: 4,
              opacity: 0,
              filter: "blur(4px)",
              duration: 0.55,
              ease: "power3.out",
              stagger: 0.045,
            },
            0
          )
          .from(subLine, { yPercent: 110, opacity: 0, duration: 0.4, ease: "power3.out" }, 0.15)
          .to(el, { yPercent: -112, duration: 1.1, ease: "expo.inOut" }, 0.55)
          .add(markPreloaderDone, "-=0.75");
        return;
      }

      tl.set(logo, { opacity: 1, letterSpacing: "0.04em" })
        .fromTo(
          chars,
          { yPercent: 130, rotate: 6, opacity: 0, filter: "blur(6px)" },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power4.out",
            stagger: 0.07,
            immediateRender: true,
          },
          0
        )
        .to(logo, { letterSpacing: "-0.015em", duration: 0.9, ease: "power2.out" }, 0.6)
        .set(sub, { autoAlpha: 1 }, 1.05)
        .fromTo(
          subLine,
          { yPercent: 110, skewY: 5, letterSpacing: "0.48em", opacity: 0 },
          {
            yPercent: 0,
            skewY: 0,
            letterSpacing: "0.34em",
            opacity: 1,
            duration: 0.85,
            ease: "power4.out",
            immediateRender: true,
          },
          1.05
        )
        .set(tag, { autoAlpha: 1 }, 1.25)
        .fromTo(
          tagLines,
          { yPercent: 110, letterSpacing: "0.58em", opacity: 0 },
          {
            yPercent: 0,
            letterSpacing: "0.4em",
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.12,
            immediateRender: true,
          },
          1.25
        )
        .fromTo(
          ".pl-char-j",
          { textShadow: "0 0 0px rgba(239, 227, 203, 0)" },
          {
            textShadow: "0 0 30px rgba(239, 227, 203, 0.55)",
            duration: 0.7,
            ease: "sine.out",
            immediateRender: true,
          },
          1.15
        )
        .to(countWrap, { autoAlpha: 1, duration: 0.5 }, 1.0)
        .to(
          num,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(Math.round(num.v));
              }
            },
          },
          0.4
        )
        .to(
          chars,
          {
            yPercent: -120,
            rotate: -6,
            filter: "blur(6px)",
            opacity: 0,
            duration: 0.7,
            ease: "power3.in",
            stagger: 0.04,
          },
          2.4
        )
        .to([sub, tag, countWrap], { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 2.4)
        .add(markPreloaderDone, 3.3)
        .to(el, { yPercent: -112, duration: 1.2, ease: "expo.inOut" }, 3.05);
    }, el);
    };

    waitForFonts().then(start);

    return () => {
      cancelled = true;
      ctx?.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading Aarshdeep Dental Clinic"
      className="preloader-sheet fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-background"
    >
      <div className="pl-logo flex overflow-hidden pb-[0.22em] pt-[0.15em] opacity-0">
        {NAME.split("").map((char, i) => (
          <span
            key={i}
            className={`pl-char inline-block font-display text-[clamp(3.5rem,11vw,7rem)] font-semibold leading-[1.15] tracking-tight will-change-transform ${
              char === "A" ? "pl-char-j italic text-gold-soft" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>

      <p className="pl-sub mt-4 overflow-hidden pb-[0.12em] opacity-0">
        <span className="pl-sub-line block whitespace-nowrap font-mono text-[0.6rem] font-medium uppercase tracking-[0.34em] text-gold">
          Dental Clinic
        </span>
      </p>

      <div className="pl-tag absolute bottom-[18vh] left-1/2 -translate-x-1/2 text-center opacity-0">
        {TAG_LINES.map((line) => (
          <span key={line} className="pl-tag-mask block overflow-hidden pb-[0.12em]">
            <span className="pl-tag-line block whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.4em] text-background/50">
              {line}
            </span>
          </span>
        ))}
      </div>

      <div className="pl-count absolute bottom-[clamp(1.25rem,4vw,3rem)] right-[clamp(1.5rem,5vw,4rem)] opacity-0">
        <span
          ref={countRef}
          className="font-display text-[clamp(2rem,6vw,4rem)] font-medium italic leading-none text-gold/70"
        >
          0
        </span>
      </div>
    </div>
  );
}
