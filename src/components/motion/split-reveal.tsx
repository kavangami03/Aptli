"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { gsapEase, mediaConditions, stagger } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * GSAP SplitText line reveal (masked lines slide up), triggered on scroll.
 * Use for section headings BELOW the fold. Above-the-fold hero text uses the
 * CSS `animate-rise` utility instead so it is visible at first paint (LCP).
 *
 * - The heading's text stays real text in the HTML (SEO / AI crawlers read it).
 * - autoSplit re-splits on resize/font load, so lines never break wrongly.
 * - Reduced motion: no split, no animation.
 */
export function SplitReveal({
  as: Tag = "h2",
  className,
  children,
  start = "top 85%",
}: {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  start?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaConditions.okMotion, () => {
        if (!ref.current) return;
        const split = SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          linesClass: "split-line",
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 130,
              duration: 1,
              ease: gsapEase.out,
              stagger: stagger.base,
              scrollTrigger: { trigger: ref.current, start, once: true },
            }),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
