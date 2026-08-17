"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { CONTACT, TESTIMONIALS } from "@/data/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

const STARS = [0, 1, 2, 3, 4] as const;

export function Testimonials() {
  const ref = useScrollReveal<HTMLElement>((ctx, el) => {
    const head = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 55%",
        scrub: 1,
      },
    });
    head
      .from(".sec-head-item", {
        y: 28,
        autoAlpha: 0,
        duration: 0.45,
        stagger: 0.1,
      })
      .from(
        ".sec-head-char",
        {
          yPercent: 115,
          duration: 0.5,
          stagger: 0.03,
          ease: "expo.out",
        },
        "-=0.3"
      );

    stepReveal(el, ".quote-card", {
      y: 48,
      inner: [
        {
          selector: ".quote-mark",
          y: 0,
          scale: 0.7,
          duration: 0.4,
          ease: "back.out(1.6)",
        },
      ],
    });

    // x-parallax removed: it pushed the left/right columns off the grid
    // mid-scroll (right card drifted up to ~28px past its column).

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".quote-card"));
    const listeners = cards.map((card) => {
      const lift = gsap.timeline({ paused: true });
      lift.to(card, {
        yPercent: -2,
        borderColor: "rgba(176,138,70,0.4)",
        boxShadow: "0 24px 48px -26px rgba(0,0,0,0.45)",
        duration: 0.35,
        ease: "power3.out",
      });

      const onEnter = () => lift.play();
      const onLeave = () => lift.reverse();
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => listeners.forEach((remove) => remove());
  });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="bg-primary py-20 text-background md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-6">
          <SectionHeading
            tone="dark"
            eyebrow="Patient voices"
            title="What Rajkot says about us"
            description="Real words from our patients on Google — Aarshdeep Dental Clinic is rated 5.0 across 2,835+ reviews."
            maskTitle
          />
          <p className="mb-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.24em] text-background/50">
            {CONTACT.rating}★ · {CONTACT.reviewCount}+ Reviews
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.quote}
              className="quote-card group relative overflow-hidden rounded-2xl border border-background/15 bg-background/[0.04] p-6 transition-colors duration-300 hover:bg-background/[0.07] md:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="quote-mark pointer-events-none absolute -top-6 right-3 select-none font-display text-[5.5rem] font-semibold leading-none text-gold/10 transition-colors duration-500 group-hover:text-gold/20 sm:-top-7 sm:right-4 sm:text-[7rem]"
              >
                “
              </span>
              <figure className="relative flex h-full flex-col">
                <div
                  className="flex gap-1 text-gold"
                  aria-label={`Rated ${CONTACT.rating} out of 5 stars`}
                >
                  {STARS.map((star) => (
                    <Icon key={star} name="star" className="h-3.5 w-3.5" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-lg font-medium italic leading-relaxed sm:mt-6 sm:text-xl">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-7 font-mono text-[0.6rem] font-medium uppercase tracking-[0.22em] text-background/50">
                  — {testimonial.source}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-2.5 rounded-full border border-background/15 px-5 py-2.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.22em] text-background/60">
            <Icon name="star" className="h-3.5 w-3.5 text-gold" />
            {CONTACT.rating} average · {CONTACT.reviewCount}+ Google reviews
          </span>
          <a
            href={CONTACT.mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-background/60 transition-colors hover:text-background"
          >
            Read reviews on Google
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
