"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/hooks/useScrollReveal";

interface StatCounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatCounter({
  value,
  decimals = 0,
  suffix,
  label,
  className,
}: StatCounterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registerGsap();
    const el = rootRef.current;
    const num = valueRef.current;
    if (!el || !num) return;

    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const state = { current: 0 };
      gsap.to(state, {
        current: value,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => {
          num.textContent = state.current.toFixed(decimals);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, decimals]);

  return (
    <div ref={rootRef} className={className}>
      <p className="font-display text-4xl font-semibold tracking-tight text-ink">
        <span ref={valueRef}>{value.toFixed(decimals)}</span>
        {suffix ? <span className="text-gold">{suffix}</span> : null}
      </p>
      <p className="mt-1.5 font-mono text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ink-soft">
        {label}
      </p>
    </div>
  );
}
