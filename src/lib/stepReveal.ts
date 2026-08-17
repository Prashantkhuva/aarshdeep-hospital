import { gsap } from "@/lib/gsap";

export interface StepRevealInner {
  selector: string;
  y?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
}

export interface StepRevealOptions {
  y?: number;
  blur?: number;
  start?: string;
  end?: string;
  inner?: StepRevealInner[];
}

/**
 * Creates one scrub ScrollTrigger per matched element (instead of a single
 * section-wide timeline), so each card / text block animates step by step as
 * it scrolls into view rather than the whole component animating at once.
 *
 * Intended to run inside `useScrollReveal`, which scopes every tween and
 * ScrollTrigger to a gsap.context() that reverts on unmount.
 */
export function stepReveal(
  container: Element,
  selector: string,
  options: StepRevealOptions = {}
): void {
  const {
    y = 48,
    blur = 6,
    start = "top 92%",
    end = "top 80%",
    inner = [],
  } = options;

  container.querySelectorAll<HTMLElement>(selector).forEach((item) => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      scrollTrigger: { trigger: item, start, end, scrub: 1 },
    });
    tl.from(item, {
      y,
      autoAlpha: 0,
      ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
      duration: 0.5,
    });

    inner.forEach(
      ({
        selector: childSelector,
        y: childY = 16,
        scale,
        duration = 0.32,
        stagger,
        ease,
      }) => {
        const targets = item.querySelectorAll<HTMLElement>(childSelector);
        if (!targets.length) return;
        tl.from(
          targets,
          {
            y: childY,
            autoAlpha: 0,
            ...(scale != null ? { scale } : {}),
            duration,
            ...(stagger != null ? { stagger } : {}),
            ...(ease ? { ease } : {}),
          },
          "-=0.18"
        );
      }
    );
  });
}
