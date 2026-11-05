/**
 * Motion / scroll helpers that honor `prefers-reduced-motion` (SEO-28).
 * Keep this module free of `framer-motion` so homepage/scroll helpers stay off the
 * LCP critical path (Hero + Index import scroll helpers eagerly).
 */

/** Smooth scroll only when the user has not requested reduced motion. */
export function preferredScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  } catch {
    return "auto";
  }
}

/**
 * Whether Framer entrance animations should start from a hidden state.
 * Pass `useReducedMotion()` from `framer-motion` at the call site.
 * SSR/`null` and `true` → do not hide (primary content visible first frame).
 */
export function motionEntranceInitial<T extends Record<string, unknown>>(
  reduceMotion: boolean | null,
  hidden: T,
): false | T {
  return reduceMotion === false ? hidden : false;
}
