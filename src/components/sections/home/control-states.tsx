"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";
import approveImg from "@/assets/images/home/control-approve-phone.jpg";
import doneImg from "@/assets/images/home/control-done-desk.jpg";
import blockedImg from "@/assets/images/home/control-held-terminal.jpg";
import taskImg from "@/assets/images/home/control-task-frontdesk.jpg";
import { StatusChip, type Status } from "@/components/ui/status-chip";
import { cn } from "@/lib/cn";

type State = {
  status: Status;
  title: string;
  meaning: string;
  who: string;
  image: StaticImageData;
  alt: string;
  pos: string;
  example: { channel: string; what: string; amount: string; result: string };
};

/** Example amounts are illustrative and labelled "Example" on the page. */
const states: State[] = [
  {
    status: "done",
    title: "Taken care of",
    meaning: "Inside your rules, so Aptli finished it and tells you in the morning email.",
    who: "Aptli",
    image: doneImg,
    alt: "A hotel manager reading the morning summary at his desk",
    pos: "object-[62%_45%]",
    example: { channel: "Expedia", what: "Commission on a cancelled stay", amount: "$86.40", result: "Disputed with proof" },
  },
  {
    status: "approve",
    title: "Needs your approval",
    meaning: "Outside your rules, so it waits. One tap from you and Aptli does the rest.",
    who: "You, from your phone",
    image: approveImg,
    alt: "A manager approving an action on her phone",
    pos: "object-[22%_50%]",
    example: { channel: "Booking.com", what: "Stay cut from 3 nights to 1", amount: "$640.00", result: "Waiting for your tap" },
  },
  {
    status: "task",
    title: "Your team's task",
    meaning: "Only your staff can fix it, so Aptli tells them exactly what to change.",
    who: "Your front desk",
    image: taskImg,
    alt: "A front desk agent handing a card back to a guest",
    pos: "object-[62%_50%]",
    example: { channel: "Your PMS", what: "Wrong check-out date on a folio", amount: "$212.00", result: "Fix the date, then Aptli files" },
  },
  {
    status: "blocked",
    title: "Held on purpose",
    meaning: "Acting now would be wrong, so Aptli waits for the right moment by itself.",
    who: "Nobody yet",
    image: blockedImg,
    alt: "A card terminal waiting on a desk, not yet charged",
    pos: "object-[38%_60%]",
    example: { channel: "Virtual card", what: "The guest can still cancel for free", amount: "$389.00", result: "Charged when the window closes" },
  },
];

const tile: Record<Status, string> = { done: "bg-ok", approve: "bg-approve", task: "bg-task", blocked: "bg-block" };

function Details({ s }: { s: State }) {
  return (
    <>
      <StatusChip status={s.status} className="self-start" />
      <h3 className="mt-4 text-h4 text-paper">{s.title}</h3>
      <p className="mt-3 text-paper/75">{s.meaning}</p>
      <dl className="mt-stack-md grid gap-0 border-t border-white/12 text-small">
        <div className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3">
          <dt className="text-paper/55">Who acts</dt>
          <dd className="text-right font-display font-bold text-paper">{s.who}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3">
          <dt className="text-paper/55">Example</dt>
          <dd className="text-right text-paper/85">
            {s.example.channel}: {s.example.what}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="font-display text-h5 font-bold text-paper">{s.example.amount}</dt>
          <dd className="text-right font-display font-bold text-brand-400">{s.example.result}</dd>
        </div>
      </dl>
    </>
  );
}

/**
 * The four states as a photo accordion (desktop): one panel open, the others slim strips.
 * Hover (mouse), focus or click opens a panel. 60fps: every panel is the full open width and only
 * moves with translateX and is revealed with clip-path (no width/flex animation). Positions are
 * computed with container query units, so it fits any container width.
 *   --c collapsed strip width · --g gap · D = 100cqw − 4·c − 3·g (open − collapsed)
 * ≤991 it becomes a simple stacked list (photo, then text beside/below it).
 */
export function ControlStates() {
  const [active, setActive] = useState(1);
  const uid = useId();
  const D = "(100cqw - 4 * var(--c) - 3 * var(--g))";

  return (
    <>
      {/* Desktop accordion */}
      <div className="relative h-[clamp(30rem,20rem+12vw,36rem)] [container-type:inline-size] [--c:6.5rem] [--g:0.75rem] max-bp1200:[--c:4.75rem] max-bp992:hidden">
        {states.map((s, i) => {
          const on = i === active;
          const base = `${i} * (var(--c) + var(--g))`;
          const x = on ? `calc(${base})` : i < active ? `calc(${base} - ${D} / 2)` : `calc(${base} + ${D} / 2)`;
          const inset = on ? "0px" : `calc(${D} / 2)`;
          return (
            <div
              key={s.status}
              className="absolute inset-y-0 left-0 w-[calc(100cqw-3*(var(--c)+var(--g)))] transition-[transform,clip-path] duration-[0.8s] ease-(--ease-out) will-change-transform"
              style={{ transform: `translateX(${x})`, clipPath: `inset(0 ${inset} round 24px)` }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            >
              {/* Strip photo (collapsed): full panel width, only clipped, never resized */}
              <div className={cn("absolute inset-0 bg-ink-2 transition-opacity duration-(--duration-slow)", on ? "opacity-0" : "opacity-100")}>
                {/* Same `sizes` as the open photo below, so both layers share one download */}
                <Image src={s.image} alt="" fill placeholder="blur" sizes="(max-width: 1199px) 60vw, 50vw" className={cn("object-cover", s.pos)} />
                <div className="absolute inset-0 bg-ink/45" />
              </div>

              {/* Open photo: fills exactly the area left of the text column, framed on its subject */}
              <div
                className={cn(
                  "absolute inset-y-0 left-0 w-[56%] overflow-hidden bg-ink-2 transition-opacity duration-(--duration-slow) max-bp1200:w-[44%]",
                  on ? "opacity-100" : "opacity-0",
                )}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1199px) 60vw, 50vw"
                  className={cn("object-cover transition-transform duration-[1.2s] ease-(--ease-out)", s.pos, on ? "scale-100" : "scale-110")}
                />
              </div>

              {/* Collapsed strip: number, status tile and the state name (one small label) */}
              <button
                type="button"
                id={`${uid}-btn-${i}`}
                aria-expanded={on}
                aria-controls={`${uid}-panel-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  "absolute inset-y-0 left-1/2 flex w-[var(--c)] -translate-x-1/2 flex-col items-center justify-between py-6 text-paper transition-opacity duration-(--duration-base)",
                  on ? "pointer-events-none opacity-0" : "opacity-100",
                )}
              >
                <span className="num font-display text-small font-bold text-paper/80">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-h6 font-bold whitespace-nowrap [writing-mode:vertical-rl] rotate-180">{s.title}</span>
                <span aria-hidden className={cn("grid size-8 place-items-center rounded-[9px] text-white", tile[s.status])}>
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h8M8 4l4 4-4 4" />
                  </svg>
                </span>
              </button>

              {/* Open: solid text column beside the photo (nothing layered on the photo itself) */}
              <div
                id={`${uid}-panel-${i}`}
                role="region"
                aria-labelledby={`${uid}-btn-${i}`}
                className={cn(
                  "absolute inset-y-0 right-0 flex w-[44%] flex-col justify-center bg-ink-2 p-stack-lg transition-[opacity,transform] duration-(--duration-slow) ease-(--ease-out) max-bp1200:w-[56%]",
                  on ? "translate-x-0 opacity-100 delay-200" : "pointer-events-none translate-x-8 opacity-0",
                )}
              >
                <p className="num mb-5 font-display text-small font-bold text-paper/50">
                  {String(i + 1).padStart(2, "0")} / 04
                </p>
                <Details s={s} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Phones and small tablets: a calm stacked list */}
      <ul className="hidden gap-grid-gap max-bp992:grid">
        {states.map((s) => (
          <li key={s.status} className="overflow-hidden rounded-[24px] bg-ink-2 ring-1 ring-white/10">
            <div className="relative aspect-[16/9]">
              <Image src={s.image} alt={s.alt} fill placeholder="blur" sizes="100vw" className={cn("object-cover", s.pos)} />
            </div>
            <div className="p-stack-md">
              <Details s={s} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
