"use client";

import { CONTACT, TEAM_MEMBERS } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTABand } from "@/components/CTABand";
import { StatCounter } from "@/components/StatCounter";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";

function initialsOf(name: string): string {
  const words = name.replace("Dr. ", "").split(" ");
  return words
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamPage() {
  const ref = useScrollReveal<HTMLElement>((_ctx, el) => {
    stepReveal(el, ".team-card", {
      y: 40,
      inner: [
        { selector: "h3, p, span, div", y: 10, duration: 0.3, stagger: 0.04 },
      ],
    });
    stepReveal(el, ".team-photo", {
      y: 30,
      blur: 4,
      start: "top 90%",
      end: "top 78%",
    });
  });

  return (
    <main ref={ref}>
      <PageHero
        eyebrow="Our team"
        title="The people behind the smiles"
        description="Specialists who treat patients, not teeth — led by Dr. Ashish Makwana and supported by a team Rajkot has trusted for years."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <div className="team-photo relative overflow-hidden rounded-2xl border border-line bg-panel">
            <Image
              src="https://res.cloudinary.com/prashantkhuva/image/upload/v1786969336/team_qo0cui.png"
              alt="The full Aarshdeep Dental Clinic team"
              width={1152}
              height={768}
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
            />
          </div>

          <SectionHeading
            eyebrow="Meet the doctors"
            title="Led by experts, supported by a family"
            description="Every specialist is fully qualified, and every consultation includes a plain-language explanation before any treatment begins."
            maskTitle
          />

          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {TEAM_MEMBERS.map((member, index) => {
              const isLead = index === 0;
              return (
                <li
                  key={member.name}
                  className={`team-card flex flex-col rounded-2xl p-8 ${
                    isLead
                      ? "bg-primary text-background shadow-[0_24px_48px_-28px_rgba(20,60,54,0.55)]"
                      : "border border-line bg-background text-ink"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-xl font-semibold ${
                        isLead
                          ? "bg-gold-soft text-primary"
                          : "bg-primary-tint text-primary"
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
                  <div
                    className={`mt-6 flex flex-wrap gap-2 ${
                      isLead ? "text-background/80" : "text-ink-soft"
                    }`}
                  >
                    <span
                      className={`rounded-full border px-3 py-1.5 font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em] ${
                        isLead
                          ? "border-gold/30 bg-gold/10 text-gold"
                          : "border-line bg-panel/70 text-ink-soft"
                      }`}
                    >
                      {member.qualification}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1.5 font-mono text-[0.58rem] font-medium uppercase tracking-[0.2em] ${
                        isLead
                          ? "border-gold/30 bg-gold/10 text-gold"
                          : "border-line bg-panel/70 text-ink-soft"
                      }`}
                    >
                      {member.experience}
                    </span>
                  </div>
                  <p
                    className={`mt-5 text-sm leading-relaxed ${
                      isLead ? "text-background/70" : "text-ink-soft"
                    }`}
                  >
                    {member.bio}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-10">
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
            <StatCounter value={4} suffix="" label="Full-time specialists" />
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
