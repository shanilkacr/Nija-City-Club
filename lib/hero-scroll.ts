/** Scroll distance (px) over which hero contracts/pins and header fills — keep in sync. */
export const HERO_SCROLL_DISTANCE = 180;

/** Final hero scale at progress === 1 */
export const HERO_CONTRACT_SCALE = 0.95;

/** When header text/CTA switch from light to solid (while bg continues scrubbing). */
export const HEADER_FILL_THRESHOLD = 0.5;

export function getHeroScrollProgress(scrollY = 0) {
  return Math.min(1, Math.max(0, scrollY / HERO_SCROLL_DISTANCE));
}

export function heroScaleFromProgress(progress: number) {
  return 1 - (1 - HERO_CONTRACT_SCALE) * progress;
}

/** Nudges the hero down toward the viewport’s vertical center as progress → 1. */
export function heroParallaxYFromProgress(
  progress: number,
  viewportH: number,
  heroH: number,
) {
  const centerOffset = Math.max(0, (viewportH - heroH) / 2);
  return centerOffset * progress;
}

type Listener = (progress: number) => void;

const listeners = new Set<Listener>();
let attached = false;
let raf = 0;
let lastProgress = -1;

function notify() {
  raf = 0;
  const progress = getHeroScrollProgress(window.scrollY);
  if (progress === lastProgress) return;
  lastProgress = progress;
  listeners.forEach((fn) => fn(progress));
}

function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(notify);
}

/**
 * Shared rAF-throttled scroll progress (0→1 over HERO_SCROLL_DISTANCE).
 * One window listener for all subscribers (header + hero).
 */
export function subscribeHeroScroll(listener: Listener) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    listener(getHeroScrollProgress(window.scrollY));
    if (!attached) {
      attached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && attached) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      attached = false;
      lastProgress = -1;
    }
  };
}
