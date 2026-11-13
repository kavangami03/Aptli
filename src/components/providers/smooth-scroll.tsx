"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis-store";

/**
 * One Lenis instance for the whole site, driven by GSAP's ticker so Lenis,
 * ScrollTrigger and every tween share a single requestAnimationFrame loop (60fps+).
 *
 * - Off entirely for prefers-reduced-motion (native scroll), and switches live.
 * - Touch keeps native momentum (syncTouch off). Smoothing is for wheel/trackpad.
 * - Anchor links (#id) are handled by Lenis with the sticky-header offset.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;

    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (reduce.matches) return;
      const headerOffset = -parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || "0");
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1, // lower = smoother/heavier. 0.08–0.12 is the sweet spot.
        wheelMultiplier: 1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: headerOffset },
        autoResize: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      lenisStore.set(lenis);
    };

    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      lenisStore.set(null);
    };

    gsap.ticker.lagSmoothing(0); // keep Lenis + ScrollTrigger in lockstep after tab switches
    start();

    const onPreferenceChange = () => {
      stop();
      start();
      ScrollTrigger.refresh();
    };
    reduce.addEventListener("change", onPreferenceChange);

    return () => {
      reduce.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, []);

  // New route: layout heights changed, so re-measure every ScrollTrigger after paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
