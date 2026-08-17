import { CONTACT } from "@/data/content";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Magnetic } from "@/components/Magnetic";

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-background md:py-24">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="max-w-xl">
          <p className="flex items-center gap-2.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold"
            />
            Book your visit
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-snug md:text-4xl">
            Ready when you need us.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-background/60 md:text-base">
            Call, WhatsApp or fill in the appointment form — our front desk will
            confirm the best slot for you. {CONTACT.hours}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href={CONTACT.phoneHref}
              className="btn-sheen inline-flex items-center gap-2.5 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              <Icon name="phone" className="h-4 w-4" />
              Call Now
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-background/25 px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:border-gold hover:text-gold"
            >
              Book Appointment
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
