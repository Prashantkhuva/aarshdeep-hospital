"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { DEPARTMENTS } from "@/data/content";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

export function Departments() {
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
          stagger: 0.035,
          ease: "expo.out",
        },
        "-=0.3"
      )
      .from(".sec-count", { y: 14, autoAlpha: 0, duration: 0.35 }, "-=0.3");

    stepReveal(el, ".dept-card", {
      y: 56,
      inner: [{ selector: ".dept-icon", scale: 0.5, ease: "back.out(2)" }],
    });

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".dept-card"));
    const listeners = cards.map((card) => {
      const lift = gsap.timeline({ paused: true });
      lift.to(card, {
        translate: "0 -6px",
        boxShadow: "0 24px 48px -26px rgba(20,60,54,0.4)",
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
    <section ref={ref} id="services" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Treatments"
            title="Our Services"
            description="Eight dental specialties working as one team — so a single visit can cover consultation, treatment and follow-up."
            maskTitle
          />
          <Link
            href="/services"
            className="sec-count group mb-1.5 inline-flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:text-ink"
          >
            08 Services · One clinic
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {DEPARTMENTS.map((department, index) => {
            const isFeatured = index === 0;
            return (
              <li
                key={department.name}
                className={`dept-card group relative flex flex-col overflow-hidden rounded-2xl p-6 md:p-7 ${
                  isFeatured
                    ? "bg-primary text-background shadow-[0_24px_48px_-28px_rgba(20,60,54,0.55)]"
                    : "border border-line bg-background transition-colors duration-300 hover:border-primary/25"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <Icon
                  name={department.icon}
                  aria-hidden="true"
                  className={`dept-watermark pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 transition-colors duration-500 ${
                    isFeatured
                      ? "text-background/[0.06] group-hover:text-gold/15"
                      : "text-ink/[0.045] group-hover:text-gold/15"
                  }`}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className={`dept-icon grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300 ${
                      isFeatured
                        ? "bg-gold-soft text-primary group-hover:bg-gold"
                        : "bg-primary-tint text-primary group-hover:bg-primary group-hover:text-gold-soft"
                    }`}
                  >
                    <Icon name={department.icon} className="h-5 w-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`font-mono text-xs font-medium tracking-widest transition-colors duration-300 group-hover:text-gold ${
                      isFeatured ? "text-gold/70" : "text-ink-soft/50"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className={`relative mt-7 font-display text-xl font-medium leading-snug ${
                    isFeatured ? "text-background" : "text-ink"
                  }`}
                >
                  {department.name}
                </h3>
                <p
                  className={`relative mt-2.5 text-sm leading-relaxed ${
                    isFeatured ? "text-background/65" : "text-ink-soft"
                  }`}
                >
                  {department.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
