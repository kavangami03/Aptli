import Image from "next/image";
import receivedImg from "@/assets/images/home/control-received-phone.jpg";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";
import { ControlStates } from "./control-states";

/** The $640 Booking.com example ("Needs your approval" above), followed to the end. */
const journey = [
  { step: "Found", detail: "Booking.com and your PMS disagree" },
  { step: "Proven", detail: "Both records attached" },
  { step: "Actioned", detail: "You approved, Aptli filed it" },
  { step: "Confirmed", detail: "Booking.com accepts it" },
  { step: "Received", detail: "The money lands" },
];

/**
 * Parcel-style tracker. Desktop: one thick track through five dots; a "$" coin rides ON the track,
 * stopping at each step, with the red fill following it (both 7s loops, transform/opacity only).
 * ≤575: the same steps as a vertical tracker.
 */
function Tracker() {
  return (
    <>
      <div className="max-bp576:hidden">
        <div className="relative h-8">
          {/* Track runs from the first dot's centre to the last (dots sit in 5 equal columns) */}
          <div className="absolute top-1/2 right-[10%] left-[10%] h-2 -translate-y-1/2 rounded-full bg-white/12">
            <span aria-hidden className="absolute inset-0 origin-left rounded-full bg-brand-500 motion-safe:animate-[track-fill_7s_var(--ease-in-out)_infinite]" />
          </div>
          <ol aria-hidden className="absolute inset-0 grid grid-cols-5">
            {journey.map((j, i) => (
              <li key={j.step} className="grid place-items-center">
                <span
                  className={cn(
                    "relative size-5 rounded-full ring-4 ring-ink-2",
                    i === journey.length - 1 ? "bg-brand-600 motion-safe:animate-[pulse-glow_2.4s_var(--ease-out)_infinite]" : "bg-paper/85",
                  )}
                />
              </li>
            ))}
          </ol>
          {/* The coin rides on the track */}
          <div aria-hidden className="absolute inset-y-0 right-[10%] left-[10%]">
            <span className="absolute inset-0 motion-safe:animate-[track-walk_7s_var(--ease-in-out)_infinite]">
              <span className="absolute top-1/2 left-0 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface font-display text-small font-bold text-brand-700 shadow-lg ring-4 ring-brand-500/30">
                $
              </span>
            </span>
          </div>
        </div>
        <ol className="mt-5 grid grid-cols-5 gap-3 text-center">
          {journey.map((j, i) => {
            const last = i === journey.length - 1;
            return (
              <li key={j.step} className="min-w-0">
                <span className={cn("block font-display font-bold", last ? "text-brand-400" : "text-paper")}>{j.step}</span>
                <span className="mt-1 block text-small text-paper/60 max-bp768:hidden">{j.detail}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Phones: vertical tracker */}
      <ol className="relative hidden max-bp576:grid">
        <span aria-hidden className="absolute top-3 bottom-3 left-[0.6875rem] w-1.5 overflow-hidden rounded-full bg-white/12">
          <span className="block h-full w-full origin-top bg-brand-500 motion-safe:animate-[track-fill-y_7s_var(--ease-in-out)_infinite]" />
        </span>
        {journey.map((j, i) => {
          const last = i === journey.length - 1;
          return (
            <li key={j.step} className="relative flex items-start gap-4 py-2.5">
              <span className={cn("relative mt-0.5 size-6 shrink-0 rounded-full ring-4 ring-ink-2", last ? "bg-brand-600" : "bg-paper/85")} />
              <span className="min-w-0">
                <span className={cn("block font-display font-bold", last ? "text-brand-400" : "text-paper")}>{j.step}</span>
                <span className="block text-small text-paper/60">{j.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}

/**
 * You stay in control.
 * 1. The four states as a photo accordion (who acts, one example each).
 * 2. Recovered means received: a clean photo beside a parcel-style tracker of the $640 example.
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
        answer="Every finding lands in one of four plain states, so everyone knows what happened and who acts next."
      />

      <div data-reveal="card" className="mt-stack-xl">
        <ControlStates />
      </div>

      {/* Recovered means received */}
      <div
        data-reveal="card"
        className="mt-stack-lg grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] overflow-hidden rounded-[28px] bg-ink-2 ring-1 ring-white/10 max-bp992:grid-cols-1"
      >
        <div className="relative min-h-[22rem] max-bp992:aspect-[16/9] max-bp992:min-h-0">
          <Image
            src={receivedImg}
            alt="A hotel owner smiling at her phone as a payment arrives"
            fill
            placeholder="blur"
            sizes="(max-width: 991px) 100vw, 35vw"
            className="object-cover object-[70%_40%]"
          />
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-[10px] bg-surface px-3 py-1.5 font-display text-small font-bold text-ink shadow-md">
            <span className="size-2 rounded-full bg-ok" />
            $640.00 received
          </span>
        </div>

        <div className="flex min-w-0 flex-col justify-center gap-stack-md p-stack-lg">
          <div>
            <p className="text-small text-paper/60">Example: the $640.00 Booking.com finding</p>
            <h3 className="mt-2 text-h3 text-paper">Recovered means received, not just filed</h3>
          </div>
          <Tracker />
          <p className="flex flex-wrap items-center gap-2 text-small">
            <span className="rounded-[9px] bg-white/10 px-3 py-1.5 font-display font-bold text-paper/85">Steps 1 to 4: pending</span>
            <span aria-hidden className="text-paper/40">→</span>
            <span className="rounded-[9px] bg-brand-600 px-3 py-1.5 font-display font-bold text-white">Step 5: recovered</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
