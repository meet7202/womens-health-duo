import type { ComponentType } from "react";

/**
 * SSR-only slot. `entry-server` assigns the real component before `renderToString`.
 * The client bundle never reads this; Index keeps a lazy import for the browser.
 * A top-level `await import()` in Index made the SSR bundle circular and the
 * Node process exited before the import settled.
 */
let component: ComponentType | null = null;

export function setHomeBelowFoldForSsr(next: ComponentType): void {
  component = next;
}

export function homeBelowFoldForSsr(): ComponentType | null {
  return component;
}
