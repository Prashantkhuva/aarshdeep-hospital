"use client";

import { ABOUT_STORY, CONTACT, VALUES } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Facilities } from "@/components/Facilities";
import { CTABand } from "@/components/CTABand";
import { StatCounter } from "@/components/StatCounter";
import { Icon } from "@/components/Icon";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";

export default function AboutPage() {
  const ref = useScrollReveal<HTMLElement>((_ctx, el) => {
    stepReveal(el, ".about-story p", {
      y: 20,
      blur: 0,
      start: "top 90%",
      end: "top 80%",
    });
    stepReveal(el, ".value-card", {
      y: 36,
      inner: [{ selector: "h3, p", y: 10, duration: 0.3, stagger: 0.04 }],
    });
    stepReveal(el, ".about-photo", {
      y: 30,
      blur: 4,
      start: "top 90%",
      end: "top 78%",
    });
  });

  return (
    <main ref={ref}>
      <PageHero
        eyebrow="About the clinic"
        title="Care that feels personal"
        description="A family-run dental clinic on Raiya Road, Rajkot — built on one simple promise: dental care that doesn't hurt, and never rushes you."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="about-photo relative overflow-hidden rounded-2xl border border-line bg-panel lg:sticky lg:top-28">
            <Image
              src="https://res.cloudinary.com/prashantkhuva/image/upload/v1786969336/team_qo0cui.png"
              alt="The Aarshdeep Dental Clinic team"
              width={1152}
              height={768}
              sizes="(min-width: 1152px) 520px, 100vw"
              className="h-full w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            />
          </div>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title="From one dentist's chair to Rajkot's smile"
              description=""
            />
            <div className="mt-8 space-y-6">
              {ABOUT_STORY.map((paragraph, index) => (
                <p
                  key={index}
                  className="about-story text-base leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-10">
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
        </div>
      </section>

      <section className="border-t border-line bg-panel/50 py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="What we stand for"
            title="The values behind every visit"
            description="Five promises we keep whether it's a first check-up or a full-mouth rehabilitation."
            maskTitle
          />
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, index) => (
              <li
                key={value.label}
                className="value-card group relative flex flex-col rounded-2xl border border-line bg-background p-7 transition-colors duration-300 hover:border-primary/25"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-tint text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-gold-soft">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs font-medium tracking-widest text-ink-soft/50 transition-colors duration-300 group-hover:text-gold"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-medium leading-snug text-ink">
                  {value.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {value.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Facilities />

      <CTABand />
    </main>
  );
}
