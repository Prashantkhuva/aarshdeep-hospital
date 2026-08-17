"use client";

import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { CONTACT } from "@/data/content";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { Magnetic } from "@/components/Magnetic";

export function Contact() {
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

    stepReveal(el, ".contact-row", { y: 36, blur: 6, start: "top 92%", end: "top 70%" });
    stepReveal(el, ".contact-map", { y: 40, blur: 6, start: "top 92%", end: "top 70%" });
  });

  return (
    <section ref={ref} id="contact" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="We're here"
          title="Find us at Ambika Shopping Center"
          description="Walk in, call or message on WhatsApp — our front desk will help you pick a time."
          maskTitle
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-9">
            <div className="contact-row flex gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-primary">
                <Icon name="mapPin" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  Visit the clinic
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {CONTACT.address}
                </p>
              </div>
            </div>

            <div className="contact-row flex gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-primary">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  Call now
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  <a
                    href={CONTACT.phoneHref}
                    className="font-mono text-base font-semibold text-primary transition-colors hover:text-ink"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                  <span className="block text-xs text-ink-soft">
                    {CONTACT.hoursNote}
                  </span>
                </p>
              </div>
            </div>

            <div className="contact-row flex gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-primary">
                <Icon name="clock" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  Clinic hours
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {CONTACT.hours}
                  <span className="block text-xs text-ink-soft">
                    Call ahead to confirm your slot.
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
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
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary-tint"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  WhatsApp
                </a>
              </Magnetic>
            </div>
          </div>

          <div
            aria-label="Map showing the clinic location at Ambika Shopping Center, Raiya Road, Rajkot"
            className="contact-map relative min-h-80 overflow-hidden rounded-2xl border border-line bg-panel"
          >
            <iframe
              src={CONTACT.mapsEmbedUrl}
              title="Google Map — Aarshdeep Dental Clinic, Raiya Road, Rajkot"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
            <a
              href={CONTACT.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur transition-colors hover:bg-background"
            >
              <Icon name="mapPin" className="h-3.5 w-3.5" />
              Open in Google Maps
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
