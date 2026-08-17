"use client";

import { DEPARTMENTS, DIRECTORY } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { Icon } from "@/components/Icon";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";

export default function ServicesPage() {
  const ref = useScrollReveal<HTMLElement>((_ctx, el) => {
    stepReveal(el, ".service-card", {
      y: 40,
      inner: [{ selector: "h3, p, ul", y: 10, duration: 0.3, stagger: 0.04 }],
    });
    stepReveal(el, ".directory-row", {
      y: 24,
      blur: 0,
      start: "top 94%",
      end: "top 84%",
    });
  });

  return (
    <main ref={ref}>
      <PageHero
        eyebrow="Treatments"
        title="Every smile, under one roof"
        description="Eight dental specialties working as one team. Consultation, treatment and follow-up — planned on digital imaging and finished painlessly."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="What we treat"
            title="Our services"
            description="From routine cleanings to implant-supported full-mouth rehabilitation, here's everything the clinic offers."
            maskTitle
          />

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {DEPARTMENTS.map((department, index) => {
              const isFeatured = index === 0;
              return (
                <li
                  key={department.name}
                  className={`service-card group relative flex flex-col rounded-2xl p-8 ${
                    isFeatured
                      ? "bg-primary text-background shadow-[0_24px_48px_-28px_rgba(20,60,54,0.55)]"
                      : "border border-line bg-background transition-colors duration-300 hover:border-primary/25"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300 ${
                        isFeatured
                          ? "bg-gold-soft text-primary group-hover:bg-gold"
                          : "bg-primary-tint text-primary group-hover:bg-primary group-hover:text-gold-soft"
                      }`}
                    >
                      <Icon name={department.icon} className="h-5 w-5" />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`font-mono text-xs font-medium tracking-widest ${
                        isFeatured ? "text-gold/70" : "text-ink-soft/50"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3
                    className={`mt-7 font-display text-xl font-medium leading-snug ${
                      isFeatured ? "text-background" : "text-ink"
                    }`}
                  >
                    {department.name}
                  </h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      isFeatured ? "text-background/65" : "text-ink-soft"
                    }`}
                  >
                    {department.description}
                  </p>
                  <ul
                    className={`mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 ${
                      isFeatured ? "text-background/80" : "text-ink-soft"
                    }`}
                  >
                    {department.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm leading-snug"
                      >
                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                            isFeatured ? "bg-gold" : "bg-primary/50"
                          }`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-panel/50 py-20 md:py-28">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="At a glance"
            title="How the clinic is organised"
            description="One floor at Ambika Shopping Center, Raiya Road, and every department a short walk away."
            maskTitle
          />
          <ul className="mt-12 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-background">
            {DIRECTORY.map((row) => (
              <li
                key={row.department}
                className="directory-row group flex items-center gap-5 px-6 py-5 transition-colors duration-300 hover:bg-panel/70 md:px-8"
              >
                <span className="w-10 shrink-0 font-mono text-sm font-semibold tracking-widest text-gold">
                  {row.floor}
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-tint text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-gold-soft">
                  <Icon name={row.icon} className="h-4 w-4" />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-base font-medium text-ink">
                    {row.department}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    {row.note}
                  </span>
                </span>
                <span className="hidden shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em] text-ink-soft sm:inline-flex">
                  {row.tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
