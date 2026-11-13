/**
 * Shared motion language. CSS (globals.css --ease-*), GSAP and Motion use the
 * same curves and durations so every animation on the site feels like one system.
 */

/** Cubic-bezier arrays for Motion (framer-motion API). */
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
} as const;

/** GSAP equivalents (built-in eases, no plugin needed). */
export const gsapEase = {
  out: "expo.out",
  outSoft: "power3.out",
  inOut: "power3.inOut",
  spring: "back.out(1.6)",
} as const;

/** Seconds. */
export const duration = {
  fast: 0.16,
  base: 0.32,
  slow: 0.64,
  reveal: 0.9,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

/** Standard in-view settings: trigger once, when ~20% is visible. */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Breakpoint helpers for gsap.matchMedia / matchMedia (same 16 kavan queries). */
export const BP = {
  bp1800: 1799,
  bp1700: 1699,
  bp1680: 1679,
  bp1600: 1599,
  bp1500: 1499,
  bp1400: 1399,
  bp1300: 1299,
  bp1200: 1199,
  bp1024: 1023,
  bp992: 991,
  bp801: 800,
  bp768: 767,
  bp576: 575,
  bp481: 480,
  bp390: 389,
  bp375: 374,
} as const;
export const below = (k: keyof typeof BP) => `(max-width: ${BP[k]}px)`;
export const above = (k: keyof typeof BP) => `(min-width: ${BP[k] + 1}px)`;

/** Standard gsap.matchMedia conditions. Always branch on reduceMotion. */
export const mediaConditions = {
  desktop: above("bp992"),
  mobile: below("bp992"),
  reduceMotion: "(prefers-reduced-motion: reduce)",
  okMotion: "(prefers-reduced-motion: no-preference)",
} as const;
