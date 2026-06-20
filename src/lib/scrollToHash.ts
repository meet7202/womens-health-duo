/**
 * Scroll to an element by id after it may appear (e.g. lazy-loaded homepage sections).
 * Returns a cancel function for useEffect cleanup.
 */
export function scrollToHashWhenReady(
  rawHash: string,
  options?: { behavior?: ScrollBehavior; maxMs?: number },
): () => void {
  const id = rawHash.replace(/^#/, "").trim();
  if (!id) return () => {};

  const maxMs = options?.maxMs ?? 4000;
  const behavior = options?.behavior ?? "smooth";
  const start = performance.now();
  let cancelled = false;
  let frame = 0;

  const tick = () => {
    if (cancelled) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
      return;
    }
    if (performance.now() - start >= maxMs) return;
    frame = window.requestAnimationFrame(tick);
  };

  frame = window.requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frame);
  };
}
