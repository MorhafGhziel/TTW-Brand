/**
 * Coordination between the opening plate and the hero beneath it.
 *
 * The hero holds its stagger until the plate lifts, so the sequence reads as
 * one motion instead of two that overlap. On a return visit — or with reduced
 * motion — there is no plate, and the hero animates on mount.
 */

export const INTRO_SEEN_KEY = "abyss-intro-seen";
export const INTRO_DONE_EVENT = "abyss:intro-done";

/** True when the plate has already played this browser session. */
function alreadySeen(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    // Storage unavailable: treat it as seen so nothing waits on an event that
    // may never fire.
    return true;
  }
}

let decision: boolean | null = null;

/**
 * Whether the plate plays on this page load. Decided once, on the first call
 * from the client, so every component that asks gets the same answer no matter
 * what order effects run in — the hero must not subscribe to an event the
 * loader has already dispatched.
 */
export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;

  if (decision === null) {
    decision =
      !alreadySeen() &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return decision;
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // Private mode. The plate plays again next visit; harmless.
  }
}
