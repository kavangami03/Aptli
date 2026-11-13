"use client";

/**
 * The ONLY place GSAP plugins are registered. Always import from here:
 *   import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
 *
 * Rules (see WEBSITE-STANDARDS.md → Animation):
 * - Animate transform + opacity only (x, y, scale, rotate, autoAlpha, clipPath sparingly).
 * - Every animation lives inside useGSAP({ scope }) so it reverts on unmount AND
 *   when Next hides the route with <Activity> (cacheComponents).
 * - Branch on gsap.matchMedia() with mediaConditions.reduceMotion.
 */
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { duration, gsapEase } from "./motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, useGSAP);
  gsap.defaults({ ease: gsapEase.out, duration: duration.reveal });
  // Mobile URL bar show/hide must not trigger a full refresh (jank).
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { Draggable, gsap, InertiaPlugin, ScrollTrigger, SplitText, useGSAP };
