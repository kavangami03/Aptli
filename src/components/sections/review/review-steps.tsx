import Image from "next/image";
import ownerImg from "@/assets/images/review/review-owner.jpg";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";
import { reviewSteps } from "@/content/review";

/** Per step: an icon and who does the work (no timings promised). */
const meta: { who: string; icon: React.ReactNode }[] = [
  {
    who: "You",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2.5" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
  { who: "You and us", icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /> },
  {
    who: "You give consent",
    icon: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2.5" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </>
    ),
  },
  {
    who: "Together",
    icon: (
      <>
        <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
];

/**
 * How the free review works: a tall clean photo beside a 2×2 grid of step cards. Each card has an
 * icon, a large faint step number, the step, and who does it. Step 1 is the dark card with a button
 * back to the form; the rest are light. Cards rise in turn on entry.
 */
export function ReviewSteps() {
  return (
    <Section
      id="how-it-works"
      tone="paper-2"
      className="[background-image:linear-gradient(to_bottom,rgb(20_20_19/0.05)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.05)_1px,transparent_1px)] [background-size:56px_56px]"
    >
      <SectionIntro
        align="center"
        kicker="How it works"
        title={
          <>
            How does the free review <em className="accent">work?</em>
          </>
        }
        answer="Four steps. You fill in the form and join one call, and we do the rest."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-grid-gap max-bp1200:grid-cols-1">
        {/* Photo tile */}
        {/* Portrait photo: ≤1199 a 4:3 frame (16:9 showed mostly wall) centred on his face */}
        <div data-reveal="card" className="relative min-h-[34rem] overflow-hidden rounded-[28px] bg-ink shadow-lg max-bp1200:aspect-[4/3] max-bp1200:min-h-0">
          <Image
            src={ownerImg}
            alt="A hotel owner smiling as he reads the findings on his laptop"
            fill
            placeholder="blur"
            sizes="(max-width: 1199px) 100vw, 36vw"
            className="object-cover object-[50%_30%] max-bp1200:object-[50%_44%]"
          />
          <p className="absolute bottom-5 left-5 rounded-[10px] bg-surface/95 px-3 py-2 font-display text-small font-bold text-ink shadow-md">You decide after you see the proof</p>
        </div>

        {/* 2×2 steps */}
        <ol className="grid grid-cols-2 gap-grid-gap max-bp576:grid-cols-1">
          {reviewSteps.map((s, i) => {
            const first = i === 0;
            return (
              <li
                key={s.title}
                data-reveal="card"
                className={cn(
                  "relative flex min-w-0 flex-col overflow-hidden rounded-[24px] p-6",
                  first ? "on-ink bg-ink text-paper shadow-lg" : "bg-surface shadow-sm ring-1 ring-line",
                )}
              >
                {/* Large faint step number */}
                <span aria-hidden className={cn("num absolute -top-3 right-4 font-display text-[6rem] leading-none font-extrabold", first ? "text-white/[0.07]" : "text-ink/[0.05]")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("relative grid size-12 place-items-center rounded-[14px]", first ? "bg-brand-600 text-white" : "bg-paper-2 text-brand-600")}>
                  <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {meta[i].icon}
                  </svg>
                </span>
                <p className={cn("relative mt-5 font-display text-small font-bold", first ? "text-brand-400" : "text-brand-700")}>Step {i + 1}</p>
                <h3 className={cn("relative mt-1 text-h5", first && "text-paper")}>{s.title}</h3>
                <p className={cn("relative mt-2", first ? "text-paper/75" : "text-muted")}>{s.body}</p>
                <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                  <span className={cn("rounded-[8px] px-2.5 py-1 font-display text-caption font-bold", first ? "bg-white/10 text-paper/85" : "bg-paper-2 text-muted")}>
                    Who: {meta[i].who}
                  </span>
                  {first && (
                    <Button href="#review-form" variant="brand">
                      Start now
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
