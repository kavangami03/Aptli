"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { Draggable, gsap, useGSAP } from "@/lib/gsap";
import { mediaConditions } from "@/lib/motion";
import { audiences } from "@/content/home";

/**
 * Who Aptli is for: a drag-to-explore slider (no scroll pinning).
 * - GSAP Draggable + Inertia: grab and throw, with soft edge resistance (transform only).
 * - A custom round "Drag" cursor follows the pointer inside the slider (fine pointers only).
 * - Focus-follow keeps it usable by keyboard (tabbing to a card slides it into view).
 * - Entry: the cards are "dealt" in from the right (tilt settles, photo zooms out, number pops,
 *   copy rises), once, when the slider reaches the viewport. Skipped for reduced motion.
 */
export function Audiences() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const viewport = el?.querySelector<HTMLElement>("[data-viewport]");
      const track = el?.querySelector<HTMLElement>("[data-track]");
      const cursor = el?.querySelector<HTMLElement>("[data-cursor]");
      if (!el || !viewport || !track) return;

      const minX = () => Math.min(0, viewport.clientWidth - track.scrollWidth);

      const [drag] = Draggable.create(track, {
        type: "x",
        inertia: true,
        edgeResistance: 0.85,
        dragResistance: 0.05,
        bounds: { minX: minX(), maxX: 0 },
        zIndexBoost: false,
        allowNativeTouchScrolling: true,
        onPress: () => {
          if (cursor) gsap.to(cursor, { scale: 0.8, duration: 0.25 });
        },
        onRelease: () => {
          if (cursor) gsap.to(cursor, { scale: 1, duration: 0.35, ease: "back.out(2)" });
        },
      });

      const sync = () => drag.update();

      // Keep a focused card in view (keyboard users).
      const onFocus = (e: FocusEvent) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
        if (!card) return;
        const left = card.offsetLeft + drag.x;
        if (left >= 0 && left + card.offsetWidth <= viewport.clientWidth) return;
        const x = gsap.utils.clamp(minX(), 0, -card.offsetLeft);
        gsap.to(track, { x, duration: 0.6, ease: "power3.out", onUpdate: sync });
      };
      track.addEventListener("focusin", onFocus);

      // Custom drag cursor (fine pointers only).
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const cleanups: (() => void)[] = [];
      if (cursor && fine) {
        const qx = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
        const qy = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = viewport.getBoundingClientRect();
          qx(e.clientX - r.left);
          qy(e.clientY - r.top);
        };
        const enter = () => gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.3 });
        const leave = () => gsap.to(cursor, { autoAlpha: 0, scale: 0.5, duration: 0.3 });
        viewport.addEventListener("pointermove", move);
        viewport.addEventListener("pointerenter", enter);
        viewport.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          viewport.removeEventListener("pointermove", move);
          viewport.removeEventListener("pointerenter", enter);
          viewport.removeEventListener("pointerleave", leave);
        });
      }

      const onResize = () => {
        drag.applyBounds({ minX: minX(), maxX: 0 });
      };
      window.addEventListener("resize", onResize);

      return () => {
        drag.kill();
        track.removeEventListener("focusin", onFocus);
        cleanups.forEach((c) => c());
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: root },
  );

  // Entry animation (separate from the drag logic so it can revert on its own).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaConditions.okMotion, () => {
        const viewport = root.current?.querySelector<HTMLElement>("[data-viewport]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        if (!viewport || !cards.length) return;
        const q = (sel: string) => cards.map((c) => c.querySelector<HTMLElement>(sel)).filter(Boolean);
        const clear = { clearProps: "transform,translate,rotate,scale,visibility,opacity" };

        gsap
          .timeline({ scrollTrigger: { trigger: viewport, start: "top 85%", once: true }, defaults: { ease: "expo.out" } })
          .from(cards, { xPercent: 70, rotate: 5, autoAlpha: 0, transformOrigin: "0% 100%", duration: 1.1, stagger: 0.1, ...clear })
          .from(q("img"), { scale: 1.25, duration: 1.4, stagger: 0.1, ...clear }, 0)
          .from(q("[data-card-num]"), { scale: 0, autoAlpha: 0, duration: 0.6, ease: "back.out(2.2)", stagger: 0.1, ...clear }, 0.45)
          .from(q("[data-card-body]"), { y: 40, autoAlpha: 0, duration: 0.8, stagger: 0.1, ...clear }, 0.4);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <Section id="who-its-for" tone="paper-2">
        <SectionIntro
          align="center"
          kicker="Who it is for"
          title={
            <>
              Built for the people who answer for <em className="accent">the money</em>
            </>
          }
          answer="Owners buy it, GMs and controllers use it daily, so every screen shows what you are owed and what work it adds."
        />

        {/* Slider viewport: the track slides; cards can run to the right edge of the screen */}
        <div data-viewport className="relative mt-stack-xl cursor-grab active:cursor-grabbing [@media(hover:hover)_and_(pointer:fine)]:cursor-none">
          <span
            data-cursor
            aria-hidden
            className="pointer-events-none invisible absolute top-0 left-0 z-20 -mt-12 -ml-12 grid size-24 scale-50 place-items-center rounded-full bg-brand-600 font-display text-small font-bold text-white opacity-0 shadow-brand"
          >
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4L2 8l4 4" /></svg>
              Drag
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4l4 4-4 4" /></svg>
            </span>
          </span>

          <ul data-track className="flex w-max gap-grid-gap select-none">
            {audiences.map((a, i) => (
              <li
                key={a.who}
                data-card
                className="group/card relative isolate flex h-[clamp(30rem,24rem+10vw,36rem)] w-[clamp(18rem,14rem+14vw,27rem)] shrink-0 flex-col justify-end overflow-hidden rounded-[26px] bg-ink text-paper shadow-md max-bp481:w-[78vw]"
              >
                <Image
                  src={a.image}
                  alt={a.alt}
                  fill
                  draggable={false}
                  placeholder="blur"
                  sizes="(max-width: 480px) 120vw, 900px"
                  className="-z-10 object-cover transition-transform duration-[1.2s] ease-(--ease-out) group-hover/card:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/40 to-ink/0" />
                <span data-card-num className="num absolute top-5 left-5 grid size-10 place-items-center rounded-[12px] bg-surface font-display text-small font-bold text-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div data-card-body className="p-6">
                  <h3 className="text-h4 text-paper">{a.who}</h3>
                  <p className="mt-2 text-small text-paper/80">{a.worry}</p>
                  <Button href={a.href} variant="light" draggable={false} className="mt-5 w-full">
                    {a.link}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
