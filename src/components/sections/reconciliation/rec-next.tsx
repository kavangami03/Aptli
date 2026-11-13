import { ArrowLink, Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";
import { sequence } from "@/content/reconciliation";
import { site } from "@/lib/site";

/**
 * What happens after a mismatch: Reconcile → Prove → Act (the only numbered markers on the site).
 * Ink band. Left: the direct answer and the primary CTA. Right: the three steps as a vertical rail;
 * step 1 is "this page", the other two link across to their service pages. A red pulse walks the rail.
 */
export function RecNext() {
  return (
    <Section tone="ink" className="on-ink [background-image:linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px)] [background-size:64px_64px]">
      <SectionIntro
        align="center"
        tone="dark"
        kicker="Reconcile, Prove, Act"
        title={
          <>
            What happens after Aptli finds <em className="accent">a mismatch?</em>
          </>
        }
        answer="Reconciliation is step one. Each finding is proved, then fixed in the right system."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-[clamp(1.5rem,0.5rem+3vw,4.5rem)] max-bp1200:grid-cols-1">
        <div className="min-w-0 max-bp1200:max-w-measure">
          <p data-reveal className="text-lead text-paper/85">
            Reconciliation is the first of three daily steps. Aptli&apos;s Finance Truth Engine proves each finding with
            the OTA and PMS records and works out what is really owed. Then Automation files the dispute, charges the
            card or posts the payment, with your approval wherever your rules ask for it.
          </p>
          <p data-reveal className="mt-stack-sm text-paper/60">
            Money counts as recovered only when it is received.
          </p>
          <div data-reveal className="mt-stack-lg max-bp576:*:w-full">
            <Button href={site.primaryCta.href} variant="brand" size="lg">
              {site.primaryCta.label}
            </Button>
          </div>
        </div>

        <ol className="relative grid gap-4">
          {/* Rail behind the markers, with a red pulse travelling down it */}
          <span aria-hidden className="absolute top-10 bottom-10 left-[2.375rem] w-px overflow-hidden bg-white/15 max-bp390:left-[2.125rem]">
            <span className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-transparent via-brand-500 to-transparent motion-safe:animate-[rail-run_3.2s_var(--ease-in-out)_infinite]" />
          </span>
          {sequence.map((s, i) => {
            const here = i === 0;
            return (
              <li
                key={s.verb}
                data-reveal="card"
                className={cn(
                  "relative flex min-w-0 gap-5 rounded-[24px] p-5 max-bp390:gap-4 max-bp390:p-4",
                  here ? "bg-paper text-ink shadow-lg" : "bg-white/[0.05] ring-1 ring-white/10",
                )}
              >
                <span
                  className={cn(
                    "num relative grid size-11 shrink-0 place-items-center rounded-[12px] font-display text-small font-extrabold",
                    here ? "bg-brand-600 text-white" : "bg-ink-2 text-paper ring-1 ring-white/15",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className={cn("font-display text-small font-bold", here ? "text-brand-700" : "text-brand-400")}>{s.verb}</p>
                    {here && <span className="rounded-[8px] bg-ink px-2 py-0.5 font-display text-caption font-bold text-paper">This page</span>}
                  </div>
                  <h3 className={cn("mt-1 text-h5", here ? "text-ink!" : "text-paper")}>{s.title}</h3>
                  <p className={cn("mt-1.5", here ? "text-muted" : "text-paper/70")}>{s.body}</p>
                  {s.href && (
                    <ArrowLink href={s.href} tone="dark" className="mt-2">
                      {s.link}
                    </ArrowLink>
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
