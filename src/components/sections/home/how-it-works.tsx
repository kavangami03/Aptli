"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro, Triangle } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { mediaConditions } from "@/lib/motion";
import { steps } from "@/content/home";

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      const setStep = (i: number) => root.setAttribute("data-active", String(i));
      const triggers = items.map((el, i) =>
        ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && setStep(i) }),
      );
      const mm = gsap.matchMedia();
      mm.add(`${mediaConditions.desktop} and ${mediaConditions.okMotion}`, () => {
        items.forEach((el, i) => {
          gsap.fromTo(
            `[data-bar="${i}"]`,
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 55%", end: "bottom 55%", scrub: true } },
          );
        });
      });
      return () => {
        triggers.forEach((t) => t.kill());
        mm.revert();
      };
    },
    { scope: ref },
  );

  // Same ground as the leaks section above, so the two share one gap (smaller top padding).
  return (
    <Section id="how-it-works" tone="paper-2" className="pt-section-y-sm">
      <SectionIntro
        align="split"
        kicker="How Aptli works"
        index="03"
        title={
          <>
            Reconcile, prove and act, <em className="accent">every single day</em>
          </>
        }
        answer="One daily sequence: match every reservation, prove what is real money, then recover it under your rules."
      />

      <div ref={ref} data-active="0" className="group/how mt-stack-xl grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-x-stack-xl max-bp992:grid-cols-1">
        {/* Sticky stage card (desktop): a dark "console" holding the step header, photo and tabs */}
        <div className="max-bp992:hidden">
          <div className="sticky top-[calc(var(--spacing-header)+1.5rem)]">
            <div
              data-reveal="card"
              className="relative overflow-hidden rounded-[32px] bg-ink p-4 shadow-lg ring-1 ring-ink [background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:18px_18px]"
            >
              {/* Header: step number swaps, three progress segments */}
              <div className="flex items-center justify-between gap-4 px-3 pt-2 pb-4">
                <div className="relative h-8 overflow-hidden font-display text-small font-bold text-paper">
                  {steps.map((s, i) => (
                    <p
                      key={s.verb}
                      className={cn(
                        "absolute inset-0 flex items-center gap-2.5 whitespace-nowrap opacity-0 transition-[opacity,transform] duration-500 ease-(--ease-out) [transform:translateY(100%)]",
                        i === 0 && "group-data-[active=0]/how:opacity-100 group-data-[active=0]/how:[transform:none]",
                        i === 1 && "group-data-[active=1]/how:opacity-100 group-data-[active=1]/how:[transform:none]",
                        i === 2 && "group-data-[active=2]/how:opacity-100 group-data-[active=2]/how:[transform:none]",
                      )}
                    >
                      <span className="num grid size-8 place-items-center rounded-[9px] bg-brand-500 text-white">{s.n}</span>
                      Step {i + 1} of 3 · {s.verb}
                    </p>
                  ))}
                  <span className="invisible block whitespace-nowrap pl-10">Step 0 of 3 · Reconcile</span>
                </div>
                <div className="flex w-40 gap-1.5">
                  {steps.map((s, i) => (
                    <span key={s.verb} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                      <span aria-hidden data-bar={i} className="absolute inset-0 origin-left rounded-full bg-brand-500" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/3] max-h-[calc(100svh-var(--spacing-header)-14rem)] w-full overflow-hidden rounded-[22px] bg-ink-2">
                {steps.map((s, i) => (
                  <div
                    key={s.verb}
                    className={cn(
                      "absolute inset-0 opacity-0 transition-[opacity,clip-path] duration-700 ease-(--ease-out) [clip-path:inset(0_0_100%_0)]",
                      i === 0 && "group-data-[active=0]/how:opacity-100 group-data-[active=0]/how:[clip-path:inset(0)]",
                      i === 1 && "group-data-[active=1]/how:opacity-100 group-data-[active=1]/how:[clip-path:inset(0)]",
                      i === 2 && "group-data-[active=2]/how:opacity-100 group-data-[active=2]/how:[clip-path:inset(0)]",
                    )}
                  >
                    <Image src={s.image} alt={s.alt} fill placeholder="blur" sizes="55vw" className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <ol className="mt-4 grid grid-cols-3 gap-2">
                {steps.map((s, i) => (
                  <li
                    key={s.verb}
                    className={cn(
                      "flex items-center gap-2.5 rounded-[14px] bg-white/6 px-4 py-3 font-display text-small font-bold text-paper/60 ring-1 ring-white/10 transition-colors duration-500",
                      i === 0 && "group-data-[active=0]/how:bg-brand-600 group-data-[active=0]/how:text-white group-data-[active=0]/how:ring-brand-600",
                      i === 1 && "group-data-[active=1]/how:bg-brand-600 group-data-[active=1]/how:text-white group-data-[active=1]/how:ring-brand-600",
                      i === 2 && "group-data-[active=2]/how:bg-brand-600 group-data-[active=2]/how:text-white group-data-[active=2]/how:ring-brand-600",
                    )}
                  >
                    <span className="num grid size-6 place-items-center rounded-[7px] bg-white/12 text-caption">{i + 1}</span>
                    {s.verb}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Steps */}
        <ol>
          {steps.map((s) => (
            <li key={s.verb} data-step className="flex min-h-[80svh] flex-col justify-center py-stack-lg max-bp992:min-h-0 max-bp992:[&+&]:border-t max-bp992:[&+&]:border-line-strong">
              <div className="relative mb-stack-md hidden aspect-[16/10] overflow-hidden rounded-[20px] max-bp992:block">
                <Image src={s.image} alt={s.alt} fill placeholder="blur" sizes="100vw" className="object-cover" />
              </div>
              <p data-reveal className="flex items-center gap-4">
                <span aria-hidden className="num font-display text-[clamp(3.5rem,2.5rem+4vw,7rem)] leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_var(--color-brand-500)]">
                  {s.n}
                </span>
                <span className="rounded-[10px] bg-ink px-3 py-1.5 font-display text-small font-bold text-paper">{s.verb}</span>
              </p>
              <h3 data-reveal className="mt-stack-md max-w-[16ch] text-h3">{s.title}</h3>
              <p data-reveal className="mt-4 max-w-measure text-muted">{s.body}</p>
              <ul className="mt-stack-md grid gap-2.5">
                {s.points.map((p) => (
                  <li key={p} data-reveal="card" className="flex items-center gap-3 rounded-[12px] bg-surface px-4 py-3 font-medium ring-1 ring-line">
                    <span className="grid size-6 place-items-center rounded-[7px] bg-brand-50">
                      <Triangle className="size-2" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div data-reveal className="mt-stack-md">
                <ArrowLink href={s.href}>{s.link}</ArrowLink>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
