import type Lenis from "lenis";

/**
 * The app's active Lenis instance, if there is one.
 *
 * Lenis drives the page with its own animation loop, so anything that wants to
 * move the scroll position has to go through it — a native
 * `scrollIntoView({ behavior: "smooth" })` runs a second, competing animation
 * and lands as a stutter or a jump. `SmoothScroll` registers the instance on
 * mount and clears it on unmount; when there is none (reduced motion, or
 * before hydration) the helper below falls back to the native path.
 */
let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null): void {
  instance = next;
}

/** Height of the fixed header, which the scroll target has to clear. */
function headerOffset(): number {
  return window.matchMedia("(min-width: 768px)").matches ? 64 : 56;
}

/**
 * Scrolls to a section, or to the top of the page when `target` is null.
 * Honours the reduced-motion preference in both the Lenis and native paths.
 *
 * The destination is resolved to an absolute document position before it is
 * handed over. Passing an element and an `offset` instead leaves the header
 * gap at the mercy of how the scroll library folds `scroll-margin` into its
 * own maths, and it measurably did not land where it was asked to.
 */
export function scrollToSection(target: HTMLElement | null): void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const top = target
    ? Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - headerOffset()
      )
    : 0;

  if (instance) {
    instance.scrollTo(top, { duration: reduced ? 0 : 1.2 });
    return;
  }

  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}
