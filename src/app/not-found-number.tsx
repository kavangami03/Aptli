"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Waits for the first-visit preloader, like the home hero (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

const digits = [
  { d: "4", r0: "-35deg", delay: 100, tone: "text-ink" },
  { d: "0", r0: "25deg", delay: 280, tone: "text-brand-500" },
  { d: "4", r0: "45deg", delay: 460, tone: "text-ink" },
];

/**
 * The 404 number. Entry (CSS, plays before hydration): each digit falls from above the screen,
 * bounces and lands upright. Then (GSAP, pointer devices) the cursor pushes each digit away from
 * whichever side it comes: tip and slide away, then spring back elastically. Tap = a little hop.
 * Transform only, on a wrapper layer so it never fights the CSS fall. Off for reduced motion.
 */
export function NotFoundNumber() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current;
        if (!el) return;
        const layers = gsap.utils.toArray<HTMLElement>("[data-push]", el);
        const spring = { duration: 0.9, ease: "elastic.out(1, 0.45)" };
        const movers = layers.map((l) => ({
          el: l,
          x: gsap.quickTo(l, "x", spring),
          y: gsap.quickTo(l, "y", spring),
          r: gsap.quickTo(l, "rotation", spring),
        }));

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          for (const m of movers) {
            const b = m.el.getBoundingClientRect();
            const dx = e.clientX - (b.left + b.width / 2);
            const dy = e.clientY - (b.top + b.height / 2);
            const radius = b.width * 1.1;
            const dist = Math.hypot(dx, dy) || 1;
            const force = Math.max(0, 1 - dist / radius); // 0 far away … 1 on the digit
            // Push away from the cursor, and tip away from the side it comes from
            m.x((-dx / dist) * force * b.width * 0.28);
            m.y((-dy / dist) * force * b.height * 0.16);
            m.r((-dx / dist) * force * 22);
          }
        };
        const reset = () => movers.forEach((m) => (m.x(0), m.y(0), m.r(0)));
        const onTap = (e: PointerEvent) => {
          if (e.pointerType === "mouse") return;
          const hit = (e.target as HTMLElement).closest<HTMLElement>("[data-push]");
          if (!hit) return;
          gsap.timeline()
            .to(hit, { y: "-=40", rotation: gsap.utils.random(-12, 12), duration: 0.25, ease: "power2.out" })
            .to(hit, { y: 0, rotation: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
        };

        const zone = el.closest("section") ?? el;
        zone.addEventListener("pointermove", onMove as EventListener);
        zone.addEventListener("pointerleave", reset);
        el.addEventListener("pointerdown", onTap as EventListener);
        return () => {
          zone.removeEventListener("pointermove", onMove as EventListener);
          zone.removeEventListener("pointerleave", reset);
          el.removeEventListener("pointerdown", onTap as EventListener);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="relative flex cursor-default items-end justify-center gap-[0.04em] font-display text-[clamp(8rem,3rem+22vw,24rem)] leading-[0.8] font-extrabold tracking-[-0.06em] select-none"
    >
      {digits.map((g) => (
        <span key={g.delay} className="relative inline-block">
          {/* Push layer (GSAP) → fall layer (CSS) → glyph */}
          <span data-push className="inline-block will-change-transform">
            <span className={`nf-drop inline-block ${g.tone}`} style={{ "--r": "0deg", "--r0": g.r0, animationDelay: intro(g.delay) } as React.CSSProperties}>
              {g.d}
            </span>
          </span>
          <span className="nf-shadow" style={{ animationDelay: intro(g.delay + 700) }} />
        </span>
      ))}
      <span
        className="nf-stamp absolute -top-[0.06em] right-[-0.1em] rounded-[10px] bg-ink px-3 py-1.5 font-display text-small font-bold tracking-normal text-paper shadow-lg max-bp576:right-0"
        style={{ animationDelay: intro(1500) }}
      >
        Missing entry
      </span>
    </div>
  );
}
