"use client";

import { CONTACT } from "@/data/content";
import { PageHero } from "@/components/PageHero";
import { Contact } from "@/components/Contact";
import { AppointmentForm } from "@/components/AppointmentForm";
import { CTABand } from "@/components/CTABand";
import { Icon } from "@/components/Icon";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";

export default function ContactPage() {
  const ref = useScrollReveal<HTMLElement>((_ctx, el) => {
    stepReveal(el, ".contact-info", {
      y: 30,
      blur: 0,
      start: "top 90%",
      end: "top 80%",
    });
  });

  return (
    <main ref={ref}>
      <PageHero
        eyebrow="We're here"
        title="Say hello, book a visit"
        description="Walk in, call, or send a WhatsApp message — our front desk will help you pick the best slot, usually the same day."
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-5 md:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="contact-info flex flex-col gap-5 rounded-2xl border border-line bg-panel/60 p-8">
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-primary">
                  <Icon name="mapPin" className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-medium text-ink">
                    Visit the clinic
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {CONTACT.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-primary">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-medium text-ink">
                    Call or WhatsApp
                  </h2>
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
              <div className="flex items-start gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-primary">
                  <Icon name="clock" className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-xl font-medium text-ink">
                    Clinic hours
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {CONTACT.hours}
                    <span className="block text-xs text-ink-soft">
                      Sundays closed · call to confirm your slot.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AppointmentForm />
        </div>
      </section>

      <Contact />

      <CTABand />
    </main>
  );
}
