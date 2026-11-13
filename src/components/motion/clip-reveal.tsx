"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { mediaConditions } from "@/lib/motion";

/**
 * Image frame that opens from an inset rounded window to full bleed as it scrolls in
 * (SFS reference). Scrubbed clip-path on one element. Full and static for reduced motion.
 */
export function ClipReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaConditions.okMotion, () => {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(10% 14% 10% 14% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 15%", scrub: 0.6 },
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
