"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
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
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { site } from "@/lib/site";
import { faqs } from "@/content/home";

/** One photo per question, in the same order as `faqs`, each used only here (no repeats on the page). */
const images: StaticImageData[] = [aptliImg, reportImg, channelsImg, approveImg, securityImg, pmsImg, reviewImg, receivedImg];
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * FAQ as a scroll read: every question and its full answer sit one after another (right column),
 * and the one being read lights up while the rest step back. A sticky panel on the left shows the
 * matching photo, a big "0X / 08" counter and an 8-step progress bar, so people read them in order.
 * ≤991 the questions simply stack (no sticky panel). All answers are always in the HTML and match
 * the FAQPage schema word for word (same `faqs` array).
 */
export function Faq() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-faq]") ?? []);
      const triggers = items.map((el, i) =>
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (self) => self.isActive && setActive(i) }),
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root },
  );

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
        answer="Eight plain answers. Scroll through them in order, it takes about two minutes."
      />

      <div ref={root} className="mt-stack-xl grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-x-[clamp(2rem,1rem+4vw,6rem)] max-bp992:grid-cols-1">
        {/* Sticky panel (desktop) */}
        <aside aria-hidden className="max-bp992:hidden">
          <div className="sticky top-[calc(var(--spacing-header)+2rem)] overflow-hidden rounded-[28px] bg-surface shadow-lg ring-1 ring-line">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1199px) 45vw, 40vw"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-(--duration-slow) ease-(--ease-out)",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                />
              ))}
            </div>
            <div className="p-stack-md">
              <div className="flex items-end justify-between gap-4">
                <p className="num font-display text-h2 leading-none font-bold text-ink">
                  {pad(active + 1)}
                  <span className="text-h5 text-subtle"> / {pad(faqs.length)}</span>
                </p>
                <p className="pb-1 text-small text-muted">Keep scrolling</p>
              </div>
              {/* 8-step progress */}
              <div className="mt-4 grid grid-cols-8 gap-1.5">
                {faqs.map((q, i) => (
                  <span key={q.question} className="h-1.5 overflow-hidden rounded-full bg-paper-3">
                    <span
                      className={cn(
                        "block h-full origin-left rounded-full bg-brand-500 transition-transform duration-(--duration-slow) ease-(--ease-out)",
                        i <= active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                ))}
              </div>
              <div className="mt-stack-md flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-stack-md">
                <Button href={site.primaryCta.href} variant="brand">
                  {site.primaryCta.label}
                </Button>
                <p className="text-small text-subtle">See the answers on your own data.</p>
              </div>
            </div>
          </div>
        </aside>

        {/* The questions, read one by one */}
        <ol className="grid max-bp992:gap-4">
          {faqs.map((q, i) => {
            const on = i === active;
            return (
              <li
                key={q.question}
                data-faq
                className={cn(
                  "flex min-h-[62svh] flex-col justify-center border-t border-line py-stack-lg transition-opacity duration-(--duration-slow) first:border-t-0 last:min-h-[50svh]",
                  // Phones: each question is its own card with a photo on top
                  "max-bp992:min-h-0 max-bp992:overflow-hidden max-bp992:rounded-[22px] max-bp992:border-0 max-bp992:bg-surface max-bp992:py-0 max-bp992:opacity-100 max-bp992:shadow-sm max-bp992:ring-1 max-bp992:ring-line max-bp992:last:min-h-0",
                  on ? "opacity-100" : "opacity-30",
                )}
              >
                <div className="relative hidden aspect-[16/8] bg-paper-3 max-bp992:block">
                  <Image src={images[i]} alt="" fill placeholder="blur" sizes="100vw" className="object-cover" />
                  <span className="num absolute top-3 left-3 rounded-[9px] bg-brand-600 px-2.5 py-1 font-display text-caption font-bold text-white">
                    {pad(i + 1)} / {pad(faqs.length)}
                  </span>
                </div>
                <div className="max-bp992:p-5">
                  <span className={cn("num grid size-10 place-items-center rounded-[11px] font-display text-small font-bold transition-colors duration-(--duration-base) max-bp992:hidden", on ? "bg-brand-600 text-white" : "bg-surface text-muted ring-1 ring-line")}>
                    {pad(i + 1)}
                  </span>
                  <h3 className="mt-5 max-w-[24ch] text-h3 max-bp992:mt-0 max-bp992:text-h4">{q.question}</h3>
                  <p className="mt-4 max-w-measure text-lead text-muted max-bp992:mt-3 max-bp992:text-body">{q.answer}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Phones: the CTA after the last answer */}
      <div className="mt-stack-lg hidden max-bp992:block">
        <Button href={site.primaryCta.href} variant="brand" className="w-full">
          {site.primaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
