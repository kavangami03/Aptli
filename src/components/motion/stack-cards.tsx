"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { mediaConditions } from "@/lib/motion";

/**
 * Sticky stacked cards: children with `data-stack-card` are CSS-sticky; as the next card
 * slides over, the previous one scales down slightly (transform only, scrubbed).
 * ≤991 the cards are static (set on the card itself) and no animation runs.
 */
export function StackCards({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${mediaConditions.desktop} and ${mediaConditions.okMotion}`, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.94,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
          });
        });
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
