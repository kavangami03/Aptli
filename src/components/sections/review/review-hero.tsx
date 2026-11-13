import Link from "next/link";
import { Kicker } from "@/components/ui/section-intro";
import { reviewPromises } from "@/content/review";
import { LeakageReviewForm } from "./review-form";

/** Entry delay that waits for the first-visit preloader (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

/**
 * Review hero: ink band with ledger grid lines. Left: breadcrumb, H1, one sentence, three promises.
 * Right: the form card (the conversion point, above the fold). No photo behind the form (clean-photo rule).
 */
export function ReviewHero() {
  return (
    // No `.on-ink` here: the only button in the hero sits on the white form card, so it must use its
    // light-page hover (a white wipe would vanish on white).
    // z-10: an open dropdown in the form must layer above the next section, not slide behind it.
    <section className="relative isolate z-10 overflow-x-clip bg-ink pt-[calc(var(--spacing-header)+var(--spacing-stack-lg))] pb-section-y-sm text-paper [background-image:linear-gradient(to_bottom,rgb(255_255_255/0.045)_1px,transparent_1px),linear-gradient(to_right,rgb(255_255_255/0.045)_1px,transparent_1px)] [background-size:64px_64px]">
      <div className="container-site grid grid-cols-[minmax(0,1fr)_minmax(0,34rem)] items-center gap-x-[clamp(2rem,1rem+4vw,6rem)] gap-y-stack-lg max-bp1200:grid-cols-1">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="motion-safe:animate-rise" style={{ animationDelay: intro(0) }}>
            <ol className="flex items-center gap-2 text-small text-paper/60">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:text-paper hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-paper/85">
                Free leakage review
              </li>
            </ol>
          </nav>

          <div className="mt-3 motion-safe:animate-rise" style={{ animationDelay: intro(80) }}>
            <Kicker tone="dark">Free, one property, no obligation</Kicker>
          </div>
          <h1 className="mt-5 max-w-[15ch] text-h1 text-paper motion-safe:animate-rise" style={{ animationDelay: intro(160) }}>
            Get a free revenue leakage review <em className="accent">for your hotel</em>
          </h1>
          <p className="mt-5 max-w-[46ch] text-lead text-paper/80 motion-safe:animate-rise" style={{ animationDelay: intro(240) }}>
            We check one property&apos;s OTA commissions, virtual cards and CLC payments against your PMS, then show you
            every finding with the proof.
          </p>
          <ul className="mt-stack-md grid gap-3 motion-safe:animate-rise" style={{ animationDelay: intro(320) }}>
            {reviewPromises.map((p) => (
              <li key={p} className="flex items-center gap-3 font-display font-semibold">
                <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-[8px] bg-brand-600 text-white">
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* The form card */}
        <div
          id="review-form"
          className="scroll-mt-[calc(var(--spacing-header)+1.5rem)] rounded-[28px] bg-surface p-stack-md text-ink shadow-lg ring-1 ring-white/10 motion-safe:animate-rise"
          style={{ animationDelay: intro(260) }}
        >
          <h2 className="text-h4">Book your free review</h2>
          <p className="mt-1.5 mb-stack-md text-small text-muted">Six short fields. No card details, no passwords.</p>
          <LeakageReviewForm />
        </div>
      </div>
    </section>
  );
}
