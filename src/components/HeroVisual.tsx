"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CONTACT } from "@/data/content";
import { Icon } from "@/components/Icon";
import Image from "next/image";

interface HeroVisualProps {
  className?: string;
}

const TRUST = [
  { icon: "star" as const, value: "5.0★", label: "Google Rating" },
  { icon: "heartPulse" as const, value: "2,835+", label: "Happy Patients" },
  { icon: "clock" as const, value: "12+", label: "Years of Care" },
];

export function HeroVisual({ className }: HeroVisualProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLElement>(null);
  const chipRef = useRef<HTMLAnchorElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const yearsRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const ref = useScrollReveal<HTMLElement>((_ctx, el) => {
    const stage = stageRef.current;
    if (!stage) return;

    const entrance = gsap.timeline({ paused: true });

    entrance
      .from(
        frameRef.current,
        { autoAlpha: 0, y: 44, duration: 1, ease: "power3.out" },
        0.3,
      )
      .from(
        photoRef.current,
        {
          autoAlpha: 0,
          y: 44,
          scale: 0.97,
          duration: 1,
          ease: "power3.out",
          transformOrigin: "center bottom",
        },
        0.3,
      )
      .from(
        ratingRef.current,
        {
          scale: 0.5,
          autoAlpha: 0,
          duration: 0.7,
          ease: "back.out(2)",
          transformOrigin: "center center",
        },
        1,
      )
      .from(
        yearsRef.current,
        {
          scale: 0.4,
          autoAlpha: 0,
          duration: 0.8,
          ease: "back.out(2)",
        },
        1.2,
      )
      .from(
        chipRef.current,
        {
          scale: 0.6,
          autoAlpha: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        1.1,
      )
      .from(
        badgeRefs.current.filter(Boolean),
        {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        0.8,
      );

    const play = () => entrance.play();
    if (document.documentElement.dataset.preloaderDone === "true") {
      play();
    } else {
      window.addEventListener("preloader:done", play, { once: true });
      return () => window.removeEventListener("preloader:done", play);
    }

    gsap.to(chipRef.current, {
      y: -8,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(crossRef.current, {
      y: -9,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(shadowRef.current, {
      scaleX: 1.12,
      scaleY: 1.12,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(el, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const tiltX = gsap.quickTo(stage, "rotationX", {
      duration: 0.9,
      ease: "power3.out",
    });
    const tiltY = gsap.quickTo(stage, "rotationY", {
      duration: 0.9,
      ease: "power3.out",
    });

    const onMove = (event: MouseEvent) => {
      const bounds = el.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      tiltX(y * -8);
      tiltY(x * 10);
    };
    const onLeave = () => {
      tiltX(0);
      tiltY(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <aside
      ref={ref}
      aria-label="The Aarshdeep Dental Clinic team and trust highlights"
      className={`relative ${className ?? ""}`}
      style={{ perspective: "1200px" }}
    >
      <div className="relative mx-auto w-full max-w-md">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/20"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,138,70,0.16),transparent_65%)]"
        />

        <div
          ref={stageRef}
          className="relative flex flex-col items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            ref={crossRef}
            className="relative z-20 -mb-6 grid h-12 w-12 place-items-center rounded-full bg-primary text-gold shadow-[0_18px_40px_-18px_rgba(176,138,70,0.55)] ring-1 ring-gold/40"
          >
            <Icon name="tooth" className="h-5 w-5" />
          </div>

          <div className="relative w-full">
            <div
              ref={frameRef}
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[1.5rem] border border-gold/25 bg-gold/[0.04]"
            />

            <figure
              ref={photoRef}
              className="relative z-10 w-full overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] border border-line bg-panel shadow-[0_30px_60px_-30px_rgba(20,60,54,0.55)] aspect-[3/2]"
            >
              <Image
                src="https://res.cloudinary.com/prashantkhuva/image/upload/v1786969336/team_qo0cui.png"
                alt="Dr. Makwana and the dental care team at Aarshdeep Dental Clinic, Rajkot"
                fill
                priority
                sizes="(min-width: 1152px) 448px, (min-width: 768px) 40vw, 100vw"
                className="object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-4">
                <p className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  Dr. Makwana &amp; team
                </p>
                <p className="mt-1 font-display text-lg font-medium leading-snug text-background">
                  {CONTACT.shortName} Dental Clinic
                </p>
              </figcaption>
            </figure>

            <a
              ref={chipRef}
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-4 top-4 z-20 flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald-200 bg-white/90 px-3.5 py-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-md backdrop-blur-md transition-colors hover:bg-emerald-50"
            >
              <Icon name="whatsapp" className="h-3.5 w-3.5" />
              Chat with us
            </a>

            <div
              ref={ratingRef}
              className="absolute -right-3 -top-3 z-20 flex items-center gap-2.5 rounded-2xl bg-gold px-3.5 py-2 text-primary shadow-[0_18px_40px_-18px_rgba(176,138,70,0.85)]"
            >
              <Icon name="star" className="h-4 w-4 shrink-0" />
              <span>
                <span className="block font-display text-lg font-semibold leading-none">
                  {CONTACT.rating}
                </span>
                <span className="mt-0.5 block font-mono text-[0.5rem] font-semibold uppercase tracking-[0.18em]">
                  {CONTACT.reviewCount}+ reviews
                </span>
              </span>
            </div>

            <div
              ref={yearsRef}
              className="absolute -left-4 top-[24%] z-30 hidden -translate-x-1/2 sm:block lg:-left-6"
            >
              <div className="relative grid h-28 w-28 place-items-center">
                <svg
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full text-gold opacity-40"
                >
                  <defs>
                    <path
                      id="hero-years-arc"
                      d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    className="fill-gold font-mono text-[8.5px] font-semibold uppercase"
                    style={{ letterSpacing: "0.16em" }}
                  >
                    <textPath href="#hero-years-arc">
                      Since 2016 · Trusted · Rajkot
                    </textPath>
                  </text>
                </svg>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-gold shadow-[0_14px_30px_-12px_rgba(20,60,54,0.6)] ring-1 ring-gold/40">
                  <span className="font-display text-sm font-bold">10+</span>
                </span>
              </div>
            </div>
          </div>

          <div className="z-20 mt-4 grid w-full grid-cols-3 gap-3">
            {TRUST.map((badge, index) => (
              <div
                key={badge.label}
                ref={(el) => {
                  badgeRefs.current[index] = el;
                }}
                className="group flex flex-col items-center gap-1.5 rounded-2xl border border-primary/10 bg-panel/80 px-3 py-4 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/5 text-gold transition-colors duration-300 group-hover:bg-primary/10">
                  <Icon name={badge.icon} className="h-4 w-4" />
                </span>
                <span className="font-display text-lg font-semibold leading-none text-ink">
                  {badge.value}
                </span>
                <span className="font-mono text-[0.5rem] font-medium uppercase tracking-[0.16em] text-ink-soft">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={shadowRef}
          aria-hidden="true"
          className="mx-auto mt-8 h-5 w-48 rounded-[50%] bg-primary/20 blur-md"
        />
      </div>
    </aside>
  );
}
