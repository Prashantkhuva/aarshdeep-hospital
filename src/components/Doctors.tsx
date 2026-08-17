"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { TEAM_MEMBERS } from "@/data/content";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import Image from "next/image";

function initialsOf(name: string): string {
  const words = name.replace("Dr. ", "").split(" ");
  return words
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Doctors() {
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
        "-=0.3",
      );

    stepReveal(el, ".doctor-card", {
      y: 60,
      inner: [
        { selector: "h3, p, a, span", y: 14, duration: 0.3, stagger: 0.05 },
      ],
    });

    const cards = Array.from(el.querySelectorAll<HTMLElement>(".doctor-card"));
    const listeners = cards.map((card) => {
      const lift = gsap.timeline({ paused: true });
      lift.to(card, {
        yPercent: -2,
        boxShadow: "0 24px 48px -24px rgba(20,60,54,0.35)",
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
    <section ref={ref} id="team" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Our Team"
            title="A team you can trust"
            description="Dr. Makwana and his team are known for gentle, painless treatment and clear explanations — from implants to kids' first visits."
            maskTitle
          />
          <Link
            href="/team"
            className="sec-count group mb-1.5 inline-flex items-center gap-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary transition-colors hover:text-ink"
          >
            Meet the full team
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <div className="relative mt-10 aspect-[3/2] overflow-hidden rounded-2xl border border-line bg-panel">
          <Image
            src="https://res.cloudinary.com/prashantkhuva/image/upload/v1786969336/team_qo0cui.png"
            alt="The Aarshdeep Dental Clinic team"
            fill
            priority
            quality={90}
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-top"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          />
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEAM_MEMBERS.slice(0, 3).map((member, index) => {
            const isLead = index === 0;
            return (
              <li
                key={member.name}
                className={`doctor-card flex flex-col rounded-2xl p-8 ${
                  isLead
                    ? "bg-primary text-background"
                    : "border border-line bg-panel/70 text-ink"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-xl font-semibold ${
                      isLead
                        ? "bg-gold-soft text-primary"
                        : "bg-background text-ink-soft"
                    }`}
                  >
                    {initialsOf(member.name)}
                  </span>
                  <div>
                    <h3
                      className={`font-display text-2xl font-medium ${
                        isLead ? "text-background" : "text-ink"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`mt-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em] ${
                        isLead ? "text-gold" : "text-ink-soft"
                      }`}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
                <p
                  className={`mt-6 text-sm leading-relaxed ${
                    isLead ? "text-background/70" : "text-ink-soft"
                  }`}
                >
                  {member.bio}
                </p>
                <span
                  className={`mt-7 inline-flex w-fit rounded-full border px-3 py-1.5 font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em] ${
                    isLead
                      ? "border-gold/30 bg-gold/10 text-gold"
                      : "border-line bg-background text-ink-soft"
                  }`}
                >
                  {member.experience}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
