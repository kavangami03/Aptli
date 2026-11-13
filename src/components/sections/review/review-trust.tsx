import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { weNeed, weNeverAsk } from "@/content/review";

function Mark({ yes }: { yes?: boolean }) {
  return (
    <span aria-hidden className={yes ? "grid size-7 shrink-0 place-items-center rounded-[8px] bg-ok text-white" : "grid size-7 shrink-0 place-items-center rounded-[8px] bg-brand-600 text-white"}>
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {yes ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M5 5l6 6M11 5l-6 6" />}
      </svg>
    </span>
  );
}

/** What we need vs what we never ask for: a light card and a dark card, side by side. */
export function ReviewTrust() {
  return (
    <Section tone="paper">
      <SectionIntro
        align="center"
        kicker="Your data, your control"
        title={
          <>
            What do we need, and what do we <em className="accent">never ask for?</em>
          </>
        }
        answer="Read-only access for one property, with your consent. Nothing in your systems changes during the review."
      />
      <div className="mx-auto mt-stack-xl grid max-w-[72rem] grid-cols-2 gap-grid-gap max-bp992:grid-cols-1">
        <div data-reveal="card" className="rounded-[26px] bg-surface p-stack-lg ring-1 ring-line">
          <h3 className="text-h4">What we need</h3>
          <ul className="mt-stack-md grid gap-4">
            {weNeed.map((t) => (
              <li key={t} className="flex items-start gap-3 font-medium">
                <Mark yes />
                <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal="card" className="rounded-[26px] bg-ink p-stack-lg text-paper shadow-lg">
          <h3 className="text-h4 text-paper">What we never ask for</h3>
          <ul className="mt-stack-md grid gap-4">
            {weNeverAsk.map((t) => (
              <li key={t} className="flex items-start gap-3 font-medium text-paper/90">
                <Mark />
                <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
