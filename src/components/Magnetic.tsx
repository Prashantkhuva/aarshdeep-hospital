"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Premium magnetic hover: the wrapped element drifts toward the cursor
 * while hovered and eases back on leave. Skipped on coarse pointers
 * (touch devices) and reduced-motion users.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    return () => {
      const child = wrap?.firstElementChild;
      if (child) gsap.killTweensOf(child);
    };
  }, []);

  const child = () => wrapRef.current?.firstElementChild as HTMLElement | null;

  const onMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const wrap = wrapRef.current;
    const target = child();
    if (!wrap || !target) return;
    const rect = wrap.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(target, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const target = child();
    if (!target) return;
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <span
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
