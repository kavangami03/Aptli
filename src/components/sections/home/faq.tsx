"use client";

import { AnimatePresence, m } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState } from "react";
import approveImg from "@/assets/images/home/faq-approve-tablet.jpg";
import channelsImg from "@/assets/images/home/faq-booking-online.jpg";
import securityImg from "@/assets/images/home/faq-card-security.jpg";
import pmsImg from "@/assets/images/home/faq-front-desk.jpg";
import receivedImg from "@/assets/images/home/faq-received-cash.jpg";
import reportImg from "@/assets/images/home/faq-report-stack.jpg";
import reviewImg from "@/assets/images/home/faq-review-call.jpg";
import aptliImg from "@/assets/images/home/faq-what-is-aptli.jpg";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { faqs } from "@/content/home";

/** One photo per question, in the same order as `faqs`, each used only here (no repeats on the page). */
const images: StaticImageData[] = [aptliImg, reportImg, channelsImg, approveImg, securityImg, pmsImg, reviewImg, receivedImg];

/**
 * FAQ as an interactive two-panel layout (desktop): numbered questions on the left (WAI-ARIA tabs,
 * arrow keys work), a large answer card with a photo on the right. Exactly one is open, the first by
 * default. ≤991 it becomes a single-open accordion. Every answer is in the server HTML (inline
 * accordion copies), so search and AI crawlers read them all; FAQPage schema comes from the same array.
 */
export function Faq() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = faqs.length - 1;
    const next = e.key === "ArrowDown" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const f = faqs[active];

  return (
    <Section
      id="faq"
      tone="paper"
      className="border-y border-line bg-paper-2 [background-image:linear-gradient(to_bottom,rgb(20_20_19/0.06)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.06)_1px,transparent_1px)] [background-size:64px_64px]"
    >
      <SectionIntro
        align="center"
        kicker="Questions"
        title={
          <>
            What owners and GMs <em className="accent">ask first</em>
          </>
        }
        answer="Still unsure? Ask us in the free leakage review and we will show you on your own data."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start gap-grid-gap max-bp992:grid-cols-1">
        {/* Questions */}
        <div role="tablist" aria-orientation="vertical" aria-label="Questions" className="grid gap-2.5">
          {faqs.map((q, i) => {
            const on = i === active;
            return (
              <div key={q.question} data-reveal="card">
                <button
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "group/q flex min-h-11 w-full items-center gap-4 rounded-[18px] px-5 py-4 text-left font-display text-h6 font-bold transition-[background-color,color,box-shadow] duration-(--duration-base)",
                    on ? "bg-ink text-paper shadow-lg" : "bg-surface text-ink ring-1 ring-line hover:ring-ink",
                  )}
                >
                  <span
                    className={cn(
                      "num grid size-9 shrink-0 place-items-center rounded-[10px] text-small transition-colors",
                      on ? "bg-brand-500 text-white" : "bg-paper-2 text-muted group-hover/q:bg-brand-50 group-hover/q:text-brand-700",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{q.question}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className={cn("size-4 shrink-0 transition-transform duration-(--duration-base)", on ? "text-brand-400 max-bp992:rotate-90" : "text-subtle group-hover/q:translate-x-0.5")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>

                {/* Inline answer (accordion, ≤991 only) */}
                <div className={cn("hidden overflow-hidden px-2", on && "max-bp992:block")}>
                  <p className="pt-3 pb-2 pl-[3.25rem] text-muted max-bp390:pl-2">{q.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Answer card (desktop) */}
        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          data-reveal="card"
          className="sticky top-[calc(var(--spacing-header)+1.5rem)] overflow-hidden rounded-[28px] bg-surface shadow-lg ring-1 ring-line max-bp992:hidden"
        >
          <div className="relative aspect-[16/8] overflow-hidden bg-paper-3">
            {/* All eight photos stay mounted (lazy, so they load together as the FAQ nears the viewport)
                and crossfade, so switching questions is instant instead of waiting for a download. */}
            {images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt=""
                fill
                placeholder="blur"
                sizes="(max-width: 1199px) 50vw, 45vw"
                className={cn(
                  "object-cover transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-out)",
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                )}
              />
            ))}
            <span className="num absolute top-5 left-5 rounded-[10px] bg-brand-600 px-3 py-1.5 font-display text-small font-bold text-white">
              {String(active + 1).padStart(2, "0")} / {String(faqs.length).padStart(2, "0")}
            </span>
          </div>
          <div className="p-stack-lg">
            <AnimatePresence initial={false} mode="wait">
              <m.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: duration.base, ease: ease.out }}
              >
                <h3 className="max-w-[24ch] text-h4">{f.question}</h3>
                <p className="mt-4 text-lead text-muted">{f.answer}</p>
              </m.div>
            </AnimatePresence>
            <div className="mt-stack-md flex flex-wrap items-center gap-4 border-t border-line pt-stack-md">
              <Button href={site.primaryCta.href} variant="brand">
                {site.primaryCta.label}
              </Button>
              <p className="text-small text-subtle">See the answer on your own data.</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
