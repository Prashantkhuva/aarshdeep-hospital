"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { CONTACT, NAV_LINKS } from "@/data/content";
import { Icon } from "@/components/Icon";
import { Magnetic } from "@/components/Magnetic";

export function Header() {
  const rootRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileTlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const moveIndicator = (target: HTMLAnchorElement) => {
    const pill = pillRef.current;
    if (!pill) return;
    const { offsetLeft, offsetWidth } = target;
    pill.style.left = `${offsetLeft}px`;
    pill.style.width = `${offsetWidth}px`;
    pill.style.opacity = "1";
  };

  const hideIndicator = () => {
    const pill = pillRef.current;
    if (!pill) return;
    pill.style.opacity = "0";
  };

  useEffect(() => {
    registerGsap();
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.from(".header-inner", {
          y: -28,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      ScrollTrigger.create({
        start: 80,
        end: "max",
        onToggle: (self) => {
          el.classList.toggle("is-scrolled", self.isActive);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const frame = requestAnimationFrame(() => {
      const active = Array.from(
        el.querySelectorAll<HTMLAnchorElement>(".desktop-nav a"),
      ).find((anchor) => anchor.getAttribute("href") === pathname);
      if (active) moveIndicator(active);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const panel = mobileNavRef.current;
    if (!panel) return;

    const items = panel.querySelectorAll<HTMLElement>(
      "a, button, [role='link']",
    );

    if (menuOpen) {
      gsap.set(panel, { display: "block" });
      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
      ).fromTo(
        items,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out",
          stagger: 0.04,
        },
        "-=0.15",
      );
      mobileTlRef.current = tl;
    } else {
      gsap.to(items, {
        autoAlpha: 0,
        y: 8,
        duration: 0.2,
        ease: "power2.in",
        stagger: 0.02,
      });
      gsap.to(panel, {
        autoAlpha: 0,
        y: -12,
        duration: 0.25,
        ease: "power2.in",
        delay: 0.05,
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
      mobileTlRef.current = null;
    }
  }, [menuOpen]);

  return (
    <header ref={rootRef} className="header-surface fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 md:px-6 md:pt-5">
        <div className="header-inner flex items-center justify-between gap-6 rounded-2xl border px-4 py-3 md:px-6 md:py-3.5">
          <Link
            href="/"
            aria-label="Aarshdeep Dental Clinic — home"
            className="group flex items-center gap-3 rounded-full"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-gold-soft ring-1 ring-primary/20 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3">
              <Icon name="tooth" className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-[1.35rem] font-semibold leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-primary">
                Aarshdeep
              </span>
              <span className="mt-1 block font-mono text-[0.52rem] font-medium uppercase tracking-[0.24em] text-ink-soft">
                Dental Clinic
              </span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            onMouseLeave={hideIndicator}
            className="desktop-nav relative hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={(event) => moveIndicator(event.currentTarget)}
                  className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ease-out ${
                    isActive
                      ? "text-primary"
                      : "text-ink-soft hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <span
              ref={pillRef}
              aria-hidden="true"
              className="nav-indicator pointer-events-none absolute bottom-1 top-1 rounded-full bg-primary-tint opacity-0"
            />
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={CONTACT.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-primary/15 bg-background/60 px-4 py-2 font-mono text-xs font-medium text-primary transition-all duration-300 ease-out hover:-translate-y-px hover:border-primary hover:bg-primary-tint md:flex"
            >
              <Icon name="phone" className="h-3.5 w-3.5" />
              {CONTACT.phoneDisplay}
            </a>
            <Magnetic>
              <Link
                href="/contact"
                className="btn-sheen hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition-all duration-300 ease-out hover:-translate-y-px hover:bg-primary/90 hover:shadow-md active:scale-95 sm:inline-flex"
              >
                Book Appointment
              </Link>
            </Magnetic>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-primary/15 bg-background/60 text-ink transition-all duration-300 ease-out hover:border-primary hover:bg-primary-tint hover:text-primary active:scale-95 lg:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={mobileNavRef}
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className="hidden lg:hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-4 pb-4 md:px-6">
          <div className="mt-2 overflow-hidden rounded-2xl border border-line bg-background shadow-[0_16px_40px_-24px_rgba(20,60,54,0.35)]">
            <div className="flex flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 hover:bg-panel ${
                      isActive ? "text-primary" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex flex-col gap-3 border-t border-line px-3 pb-1 pt-4">
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 px-5 py-3 font-mono text-sm font-medium text-primary transition-all duration-300 ease-out hover:border-primary hover:bg-primary-tint"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {CONTACT.phoneDisplay}
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-background transition-all duration-300 ease-out hover:bg-primary/90 active:scale-95"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
