"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { gsapEase, mediaConditions } from "@/lib/motion";

/**
 * Product stage:
 * - Desktop: the photo drifts gently (parallax).
 * - Everywhere (motion OK): when the ledger enters view, rows land one by one, the
 *   highlighter draws under the value that disagrees, then each verdict chip settles.
 * Transform/opacity only.
 */
export function HeroStage({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${mediaConditions.desktop} and ${mediaConditions.okMotion}`, () => {
        gsap.fromTo("[data-stage-img]", { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
      mm.add(mediaConditions.okMotion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-ledger]", start: "top 80%", once: true } });
        tl.from("[data-ledger]", { y: 40, autoAlpha: 0, duration: 0.9, ease: gsapEase.out })
          .from("[data-ledger-row]", { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.12, ease: gsapEase.outSoft }, "-=0.5")
          .from("[data-ledger-hl]", { scaleX: 0, duration: 0.5, stagger: 0.22, ease: gsapEase.outSoft }, "-=0.2")
          .from("[data-ledger-chip]", { scale: 0.5, autoAlpha: 0, duration: 0.55, stagger: 0.22, ease: gsapEase.spring }, "<0.1");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
