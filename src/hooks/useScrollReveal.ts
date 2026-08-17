"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reusable scroll-reveal hook.
 *
 * Runs `setup` inside a `gsap.context()` scoped to the returned ref's element.
 * Selectors inside `setup` are resolved relative to that element, and every
 * tween / ScrollTrigger is reverted on unmount (required in React/Next to
 * avoid duplicate triggers on fast refresh or remount).
 *
 * All animations are skipped entirely when the user prefers reduced motion —
 * elements keep their natural (visible) state.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  setup: (ctx: gsap.Context, el: T) => void | (() => void),
  deps: unknown[] = []
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    // Note: gsap.context() executes its callback synchronously, so `ctx`
    // cannot be referenced inside the callback passed to the constructor
    // (TDZ). Creating an empty context first and adding the setup via
    // ctx.add() keeps `ctx` available while still capturing every tween
    // and ScrollTrigger created during setup (and any cleanup function it
    // returns) inside the context.
    const ctx = gsap.context(() => {}, el);
    ctx.add(() => {
      if (prefersReducedMotion()) return;
      return setup(ctx, el);
    });

    return () => ctx.revert();
  }, deps);

  return ref;
}
