"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CONTACT } from "@/data/content";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { HeroVisual } from "@/components/HeroVisual";
import { StatCounter } from "@/components/StatCounter";
import { Magnetic } from "@/components/Magnetic";

export function Hero() {
  const ref = useScrollReveal<HTMLElement>(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    tl.from(".hero-eyebrow", { y: 20, autoAlpha: 0, duration: 0.6 }, 0)
      .from(
        ".hero-line-inner",
        { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.14 },
        0.1
      )
      .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 0.8 }, 0.55)
      .from(
        ".hero-cta > *",
        { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
        0.7
      )
      .from(
        ".hero-stats > *",
        { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.12 },
        0.9
      );

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
      id="top"
      className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        <div className="max-w-xl">
          <p className="hero-eyebrow flex items-center gap-3 font-mono text-[0.68rem] font-medium uppercase tracking-[0.26em] text-ink-soft">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
            Rajkot · Raiya Road · Gujarat
          </p>

          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl md:text-[4.4rem]">
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner block" data-scroll-skew>
                Painless dentistry,
              </span>
            </span>
            <span className="hero-line block overflow-hidden">
              <span className="hero-line-inner block italic" data-scroll-skew>
                close to home.
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
            A family-focused dental clinic on Raiya Road, Rajkot —
            honest, unhurried care from Dr. Makwana&rsquo;s team, with implants,
            tooth removals and braces under one roof.
          </p>

          <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={CONTACT.phoneHref}
                className="btn-sheen inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary/90"
              >
                <Icon name="phone" className="h-4 w-4" />
                Call Now
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary-tint"
              >
                Book Appointment
              </Link>
            </Magnetic>
          </div>

          <div className="hero-stats mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-line pt-7">
            <StatCounter
              value={CONTACT.rating}
              decimals={1}
              suffix="★"
              label="Google rating"
            />
            <StatCounter
              value={CONTACT.reviewCount}
              suffix="+"
              label="Patient reviews"
            />
            <StatCounter value={10} suffix="+" label="Years of care" />
          </div>
        </div>

        <HeroVisual className="w-full lg:justify-self-end" />
      </div>
    </section>
  );
}
