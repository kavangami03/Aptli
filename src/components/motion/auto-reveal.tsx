"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { mediaConditions } from "@/lib/motion";

/**
 * Site-wide entry animations (SFS reference): add `data-reveal` to any element.
 *
 *   data-reveal          fade up 40px                 (text, buttons, groups)
 *   data-reveal="card"   up 30px + scale .98          (cards, images, panels)
 *   data-reveal="tag"    up 40px + scale .9           (kickers / tags)
 *   data-reveal="line"   draw scaleX 0→1 from left    (dividers)
 *   data-reveal="pop"    scale .4 → 1 from centre     (badges, hub nodes, icons)
 *
 * Elements that enter together are staggered (ScrollTrigger.batch). Transform + opacity only.
 * Reduced motion: nothing is hidden or moved. Re-runs on every route change.
 */
const from: Record<string, gsap.TweenVars> = {
  up: { y: 40, autoAlpha: 0 },
  card: { y: 30, scale: 0.98, autoAlpha: 0 },
  tag: { y: 40, scale: 0.9, autoAlpha: 0 },
  line: { scaleX: 0, transformOrigin: "0% 50%" },
  pop: { scale: 0.4, autoAlpha: 0 },
};

export function AutoReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia(mediaConditions.reduceMotion).matches) return;

    // Only elements on the visible route (hidden <Activity> routes are display:none).
    const els = gsap.utils
      .toArray<HTMLElement>("[data-reveal]")
      .filter((el) => el.offsetParent !== null || getComputedStyle(el).position === "fixed");

    const groups = new Map<string, HTMLElement[]>();
    els.forEach((el) => {
      const kind = el.dataset.reveal && from[el.dataset.reveal] ? el.dataset.reveal : "up";
      gsap.set(el, from[kind]);
      (groups.get(kind) ?? groups.set(kind, []).get(kind)!).push(el);
    });

    const triggers = [...groups].flatMap(([kind, list]) =>
      ScrollTrigger.batch(list, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            scale: 1,
            scaleX: 1,
            autoAlpha: 1,
            duration: kind === "line" ? 1.1 : 0.9,
            ease: kind === "pop" ? "back.out(1.6)" : "power3.out",
            stagger: 0.09,
            overwrite: true,
            clearProps: "transform,translate,rotate,scale,visibility,opacity",
          }),
      }),
    );

    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id);
      triggers.forEach((t) => t.kill());
    };
  }, [pathname]);

  return null;
}
