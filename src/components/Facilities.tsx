"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { FACILITIES } from "@/data/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";

export function Facilities() {
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
      .from(".sec-count", { y: 12, autoAlpha: 0, duration: 0.35 }, "-=0.3");

    stepReveal(el, ".fac-item", {
      y: 48,
      inner: [{ selector: ".fac-icon", scale: 0.5, ease: "back.out(2.2)" }],
    });

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".fac-item"));
    const listeners = cards.map((card) => {
      const lift = gsap.timeline({ paused: true });
      lift.to(card, {
        yPercent: -2,
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
    <section ref={ref} id="facilities" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="In-clinic"
            title="Facilities"
            description="Everything you need on a dental visit — modern imaging, painless treatment and strict hygiene, all at Ambika Shopping Center, Rajkot."
            maskTitle
          />
          <p className="sec-count mb-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.24em] text-ink-soft">
            06 Facilities · One clinic
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((facility, index) => (
            <li
              key={facility.label}
              className="fac-item group relative flex flex-col items-center overflow-hidden rounded-2xl border border-line bg-background p-8 text-center transition-colors duration-300 hover:border-primary/25"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 font-mono text-[0.65rem] font-medium tracking-widest text-ink-soft/40 transition-colors duration-300 group-hover:text-gold"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="fac-icon grid h-12 w-12 place-items-center rounded-xl bg-primary-tint text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-gold-soft">
                <Icon name={facility.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-medium leading-snug text-ink">
                {facility.label}
              </h3>
              <p className="mt-2 font-mono text-[0.58rem] font-medium uppercase tracking-[0.22em] text-ink-soft">
                {facility.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
