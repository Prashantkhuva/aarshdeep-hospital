"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  const ref = useScrollReveal<HTMLElement>(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    tl.from(".page-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6 }, 0)
      .from(
        ".page-line-inner",
        { yPercent: 115, duration: 1, ease: "expo.out", stagger: 0.06 },
        0.1
      )
      .from(".page-sub", { y: 24, autoAlpha: 0, duration: 0.8 }, 0.55);

    const play = () => tl.play();
    if (document.documentElement.dataset.preloaderDone === "true") {
      play();
    } else {
      window.addEventListener("preloader:done", play, { once: true });
      return () => window.removeEventListener("preloader:done", play);
    }
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <p className="page-eyebrow flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.26em] text-ink-soft">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-6xl md:text-[4rem]">
          {title.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="page-line mr-[0.26em] inline-block overflow-hidden align-top"
            >
              <span className="page-line-inner inline-block">{word}</span>
            </span>
          ))}
        </h1>
        <p className="page-sub mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
