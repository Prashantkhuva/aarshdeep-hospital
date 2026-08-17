"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { FAQS } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";

export function FAQ() {
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
      );

    stepReveal(el, ".faq-item", { y: 40, start: "top 92%", end: "top 74%" });
  });

  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section ref={ref} className="pb-20 md:pb-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Good to know"
            title="Frequently asked questions"
            description="Honest answers to the questions Rajkot patients ask us most."
            maskTitle
          />
        </div>

        <ul className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <li
                key={faq.question}
                className={`faq-item overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  open
                    ? "border-primary/25 bg-panel/70"
                    : "border-line bg-background hover:border-primary/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
                >
                  <span className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`font-mono text-xs font-medium tracking-widest transition-colors duration-300 ${
                        open ? "text-gold" : "text-ink-soft/50"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-medium leading-snug text-ink md:text-xl">
                      {faq.question}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      open
                        ? "rotate-45 border-primary bg-primary text-background"
                        : "border-line text-ink-soft"
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 pl-14 text-sm leading-relaxed text-ink-soft md:px-8 md:pl-[4.7rem]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
