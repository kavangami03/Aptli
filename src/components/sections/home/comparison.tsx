import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { site } from "@/lib/site";
import { comparison } from "@/content/home";

function Mark({ yes }: { yes?: boolean }) {
  return (
    <span className={yes ? "grid size-7 shrink-0 place-items-center rounded-[8px] bg-brand-600 text-white" : "grid size-7 shrink-0 place-items-center rounded-[8px] bg-paper-3 text-subtle"}>
      <span className="sr-only">{yes ? "Aptli:" : "Usual way:"}</span>
      <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {yes ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M5 5l6 6M11 5l-6 6" />}
      </svg>
    </span>
  );
}

function Arrow({ i, down }: { i: number; down?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-5 text-brand-500 motion-safe:animate-[nudge_1.8s_var(--ease-in-out)_infinite] ${down ? "rotate-90" : ""}`}
      style={{ animationDelay: `${i * 0.2}s`, "--nudge": down ? "0 4px" : "4px 0" } as React.CSSProperties}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/**
 * The usual way vs Aptli. Desktop: one grid so every row lines up across a light card (left) and
 * the dark Aptli card (right), with a red arrow between each pair. Phones: one small before/after
 * block per point. Category names only (brief): reports or an outsourced vendor.
 */
export function Comparison() {
  const rows = comparison.length;
  return (
    <Section id="compare" tone="paper">
      <SectionIntro
        align="center"
        kicker="Compare the options"
        title={
          <>
            How is Aptli different from reports and <em className="accent">recovery services?</em>
          </>
        }
        answer="Reports leave the work to you. Recovery services hide it. Aptli shows the proof and does the work with your approval."
      />

      {/* Desktop and tablet: [usual card] [label + arrow] [Aptli card], every row lined up */}
      <div data-reveal="card" className="mt-stack-xl max-bp768:hidden">
        <div className="relative mx-auto grid max-w-[72rem] grid-cols-[minmax(0,1fr)_minmax(8rem,11rem)_minmax(0,1fr)]">
          {/* Card grounds behind columns 1 and 3 (same height: header + every row) */}
          <div aria-hidden className="col-start-1 row-start-1 rounded-[24px] bg-surface ring-1 ring-line" style={{ gridRowEnd: rows + 2 }} />
          <div aria-hidden className="col-start-3 row-start-1 rounded-[24px] bg-ink shadow-lg" style={{ gridRowEnd: rows + 2 }} />

          {/* Header row */}
          <div className="col-start-1 row-start-1 px-7 pt-7 pb-5">
            <h3 className="text-h5 text-ink/70">The usual way</h3>
            <p className="mt-1 text-small text-subtle">Reports or an outsourced vendor</p>
          </div>
          <div className="col-start-2 row-start-1 grid place-items-center">
            <span className="grid size-16 place-items-center rounded-[18px] bg-brand-600 font-display text-h5 font-extrabold text-white shadow-brand ring-4 ring-paper motion-safe:animate-[pulse-glow_2.4s_var(--ease-out)_infinite]">
              vs
            </span>
          </div>
          <div className="relative col-start-3 row-start-1 px-7 pt-7 pb-5">
            <span className="absolute -top-3.5 right-7 rounded-[8px] bg-brand-600 px-2.5 py-1 font-display text-caption font-bold text-white">Recommended</span>
            <h3 className="text-h5 text-paper">With Aptli</h3>
            <p className="mt-1 text-small text-paper/65">Daily proof, and you stay in control</p>
          </div>

          {comparison.map((r, i) => {
            const row = i + 2;
            const last = i === rows - 1;
            return (
              <div key={r.label} className="contents">
                <p className={`col-start-1 mx-7 flex min-h-20 items-center gap-3 border-t border-line text-muted ${last ? "mb-3" : ""}`} style={{ gridRowStart: row }}>
                  <Mark />
                  {r.usual}
                </p>
                <p className="col-start-2 flex flex-col items-center justify-center gap-1.5 px-2 text-center" style={{ gridRowStart: row }}>
                  <span className="font-display text-caption font-bold text-ink">{r.label}</span>
                  <Arrow i={i} />
                </p>
                <p className={`col-start-3 mx-7 flex min-h-20 items-center gap-3 border-t border-white/12 font-display font-bold text-paper ${last ? "mb-3" : ""}`} style={{ gridRowStart: row }}>
                  <Mark yes />
                  {r.aptli}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-stack-lg flex justify-center">
          <Button href={site.primaryCta.href} variant="brand" size="lg">
            {site.primaryCta.label}
          </Button>
        </div>
      </div>

      {/* Phones */}
      <div className="mt-stack-lg hidden gap-3 max-bp768:grid">
        <ul className="grid gap-3">
          {comparison.map((r, i) => (
            <li key={r.label} data-reveal="card" className="rounded-[20px] bg-surface p-4 ring-1 ring-line">
              <p className="font-display text-small font-bold text-ink">{r.label}</p>
              <p className="mt-3 flex items-center gap-3 text-muted">
                <Mark />
                {r.usual}
              </p>
              <span className="my-1.5 ml-1 block">
                <Arrow i={i} down />
              </span>
              <p className="flex items-center gap-3 rounded-[12px] bg-ink px-3 py-2.5 font-display font-bold text-paper">
                <Mark yes />
                {r.aptli}
              </p>
            </li>
          ))}
        </ul>
        <Button href={site.primaryCta.href} variant="brand" className="w-full">
          {site.primaryCta.label}
        </Button>
      </div>
    </Section>
  );
}
