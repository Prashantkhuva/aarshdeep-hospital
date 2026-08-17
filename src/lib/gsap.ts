import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP plugins exactly once, client-side only.
 * Safe to call from any component effect.
 */
export function registerGsap(): void {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  document.fonts?.ready
    .then(() => ScrollTrigger.refresh())
    .catch(() => undefined);
}

export { gsap, ScrollTrigger };
