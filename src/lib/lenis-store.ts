"use client";

import type Lenis from "lenis";
import { useSyncExternalStore } from "react";

/**
 * Tiny external store for the single Lenis instance created by <SmoothScroll>.
 * `useLenis()` returns null when smooth scroll is off (reduced motion / SSR),
 * so callers must fall back to native scrolling.
 */
let current: Lenis | null = null;
const listeners = new Set<() => void>();

export const lenisStore = {
  get: () => current,
  set(instance: Lenis | null) {
    current = instance;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useLenis() {
  return useSyncExternalStore(lenisStore.subscribe, lenisStore.get, () => null);
}

/** Smooth-scroll to a target, falling back to native when Lenis is off. */
export function scrollToTarget(target: string | HTMLElement | number, offset = 0) {
  const lenis = lenisStore.get();
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset });
    return;
  }
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
}
