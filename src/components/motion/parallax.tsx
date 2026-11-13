"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { mediaConditions } from "@/lib/motion";

/**
 * Gentle scroll parallax (transform only, scrubbed). Desktop + motion-OK only.
 * Give the wrapper some bleed (e.g. `absolute inset-[-6%]`) so edges never show.
 */
export function Parallax({
  children,
  className,
  amount = 8,
}: {
  children: React.ReactNode;
  className?: string;
  /** yPercent travel across the scroll range. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${mediaConditions.desktop} and ${mediaConditions.okMotion}`, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current?.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
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
