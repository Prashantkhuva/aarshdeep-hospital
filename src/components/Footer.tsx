import { CONTACT, NAV_LINKS } from "@/data/content";
import Link from "next/link";
import { Icon } from "@/components/Icon";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-background">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr] md:items-start">
          <div className="max-w-sm">
            <p className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-background/10 text-gold">
                <Icon name="tooth" className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-2xl font-semibold leading-none">
                  Aarshdeep
                </span>
                <span className="mt-1 block font-mono text-[0.55rem] font-medium uppercase tracking-[0.24em] text-background/50">
                  Dental Clinic
                </span>
              </span>
            </p>
            <p className="mt-6 text-sm leading-relaxed text-background/55">
              {CONTACT.tagline} Trusted family-first dental care at Ambika Shopping Center,
              Rajkot — {CONTACT.hoursNote.toLowerCase()}.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-background/40">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex w-fit items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="group flex w-fit items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                  />
                  FAQ
                </Link>
              </li>
            </ul>
            <ul className="mt-6 space-y-3 border-t border-background/10 pt-6">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="group flex w-fit items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                  />
                  Call us
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4"
                  />
                  WhatsApp
                </a>
              </li>
            </ul>
          </nav>

          <address className="not-italic">
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-background/40">
              Visit us
            </p>
            <ul className="mt-5 space-y-4 font-mono text-xs leading-relaxed text-background/55">
              <li className="flex gap-3">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-background"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </address>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-background/40">
            © 2026 {CONTACT.name} · {CONTACT.city}
          </p>
          <a
            href={CONTACT.meteoricUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold-soft/80 transition-colors hover:text-gold"
          >
            Design concept by Meteoric
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
          <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-background/30">
            Sample preview — not the clinic&rsquo;s live site
          </p>
        </div>
      </div>
    </footer>
  );
}
