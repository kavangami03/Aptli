import Image, { type StaticImageData } from "next/image";
import approveImg from "@/assets/images/home/control-approve-phone.jpg";
import doneImg from "@/assets/images/home/control-done-desk.jpg";
import taskImg from "@/assets/images/home/control-task-frontdesk.jpg";
import blockedImg from "@/assets/images/home/control-held-terminal.jpg";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusChip, type Status } from "@/components/ui/status-chip";
import { cn } from "@/lib/cn";

const cards: { status: Status; title: string; body: string; image: StaticImageData; alt: string; pos?: string }[] = [
  {
    status: "done",
    title: "Taken care of",
    body: "Aptli finished it under your rules. You see it in the morning email.",
    image: doneImg,
    alt: "A hotel manager reviewing the morning summary at his desk",
  },
  {
    status: "approve",
    title: "Needs your approval",
    body: "One tap from you, and Aptli does the rest. Nothing moves without it.",
    image: approveImg,
    alt: "A manager approving an action on her phone",
    pos: "object-[50%_30%]",
  },
  {
    status: "task",
    title: "Your team's task",
    body: "Something only your staff can do, like fixing a folio, with clear steps.",
    image: taskImg,
    alt: "A front desk agent helping a guest at check-out",
    pos: "object-[50%_35%]",
  },
  {
    status: "blocked",
    title: "Held on purpose",
    body: "Aptli waits when it should, like a card charge before the cancellation window closes.",
    image: blockedImg,
    alt: "A card terminal waiting on a desk, not yet charged",
  },
];

const steps = ["Found", "Proven", "Actioned", "Confirmed", "Received"];

/**
 * You stay in control: four photo cards (one plain state each, one tag per photo), then a
 * one-line "recovered means received" row. Human, not a product screen.
 */
export function Control() {
  return (
    <Section id="control" tone="ink" className="on-ink">
      <SectionIntro
        tone="dark"
        align="center"
        kicker="You stay in control"
        title={
          <>
            You decide what runs, and money counts only when it is <em className="accent">received</em>
          </>
        }
        answer="Every finding lands in one of four plain states, so everyone knows what happened and what is next."
      />

      <RevealGroup className="mt-stack-xl grid grid-cols-4 gap-grid-gap max-bp1200:grid-cols-2 max-bp576:grid-cols-1">
        {cards.map((c) => (
          <RevealItem key={c.status} className="group/c min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-ink-2 max-bp576:aspect-[4/3]">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                placeholder="blur"
                sizes="(max-width: 575px) 100vw, (max-width: 1199px) 70vw, 40vw"
                className={cn("object-cover transition-transform duration-[1.2s] ease-(--ease-out) group-hover/c:scale-105", c.pos)}
              />
              <StatusChip status={c.status} className="absolute top-4 left-4 shadow-md" />
            </div>
            <h3 className="mt-5 text-h5 text-paper">{c.title}</h3>
            <p className="mt-2 text-paper/70">{c.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Recovered means received: one simple row */}
      <div data-reveal="card" className="mt-section-y-sm rounded-[24px] bg-white/6 p-stack-md ring-1 ring-white/10">
        <p className="text-center font-display text-h5 font-bold text-paper">
          Every dollar moves through five steps. Only the last one counts.
        </p>
        <ol className="mt-stack-md flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s} className="flex items-center gap-2">
                <span
                  className={cn(
                    "relative isolate overflow-visible rounded-[12px] px-4 py-2.5 font-display text-small font-bold",
                    last ? "bg-brand-500 text-white motion-safe:animate-[pulse-glow_2.2s_var(--ease-out)_infinite]" : "bg-white/10 text-paper/85",
                  )}
                >
                  {/* Continuous loop: a red light travels step to step; "Received" keeps pulsing. */}
                  {!last && (
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-[12px] bg-brand-500 opacity-0 motion-safe:animate-[step-lit_5s_var(--ease-in-out)_infinite]"
                      style={{ animationDelay: `${i * 0.9}s` }}
                    />
                  )}
                  {s}
                </span>
                {!last && (
                  <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-paper/40 motion-safe:animate-[nudge_1.6s_var(--ease-in-out)_infinite]" style={{ animationDelay: `${i * 0.9 + 0.4}s` }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
