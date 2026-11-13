import Link from "next/link";
import { PageMain } from "@/components/layout/page-main";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/section-intro";
import { site } from "@/lib/site";

/** Waits for the first-visit preloader, like the home hero (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

/**
 * r/r0: settled and starting tilt of the fall. lean/x: the hover "domino" (each digit tips right
 * onto the next one, pivoting on its bottom-right corner). in/out: stagger forwards on hover,
 * reversed on the way back up.
 */
const digits = [
  { d: "4", r: "-7deg", r0: "-35deg", delay: 100, tone: "text-ink", lean: "24deg", x: "4%", in: "0ms", out: "240ms" },
  { d: "0", r: "3deg", r0: "25deg", delay: 280, tone: "text-brand-500", rock: true, lean: "14deg", x: "3%", in: "140ms", out: "120ms" },
  { d: "4", r: "9deg", r0: "45deg", delay: 460, tone: "text-ink", lean: "7deg", x: "6%", in: "280ms", out: "0ms" },
];

const shortcuts = [
  { label: "Reconciliation", href: "/reconciliation/" },
  { label: "Finance Truth Engine", href: "/finance-truth-engine/" },
  { label: "Automation", href: "/automation/" },
  { label: "Integrations", href: "/integrations/" },
];

/**
 * 404: a giant 4-0-4 falls from above the screen, digit by digit, bounces and settles at a tilt
 * (a shadow lands under each one). The red 0 keeps rocking gently and a "Missing entry" tag stamps
 * on. Pure CSS (transform/opacity), still for reduced motion. Next adds noindex automatically.
 */
export default function NotFound() {
  return (
    <PageMain>
      <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-x-clip bg-paper-2 pt-[calc(var(--spacing-header)+var(--spacing-stack-lg))] pb-section-y-sm text-center [background-image:linear-gradient(to_bottom,rgb(20_20_19/0.06)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.06)_1px,transparent_1px)] [background-size:64px_64px]">
        <div className="container-site flex flex-col items-center">
          <p className="sr-only">Error 404</p>

          {/* The falling number */}
          <div aria-hidden className="group/nf relative flex cursor-default items-end justify-center gap-[0.02em] font-display text-[clamp(8rem,3rem+22vw,24rem)] leading-[0.8] font-extrabold tracking-[-0.06em] select-none">
            {digits.map((g) => (
              <span key={g.delay} className="relative inline-block">
                {/* Hover layer: the domino lean (its own transform, so it never fights the fall or the rock) */}
                <span
                  className="nf-lean inline-block"
                  style={{ "--lean": g.lean, "--x": g.x, "--in": g.in, "--out": g.out } as React.CSSProperties}
                >
                  <span
                    className={`nf-drop inline-block ${g.tone}`}
                    style={{ "--r": g.r, "--r0": g.r0, animationDelay: intro(g.delay) } as React.CSSProperties}
                  >
                    <span className={g.rock ? "nf-rock inline-block" : "inline-block"} style={g.rock ? { animationDelay: intro(g.delay + 1400) } : undefined}>
                      {g.d}
                    </span>
                  </span>
                </span>
                <span className="nf-shadow" style={{ animationDelay: intro(g.delay + 700) }} />
              </span>
            ))}
            <span
              className="nf-stamp absolute -top-[0.06em] right-[-0.1em] rounded-[10px] bg-ink px-3 py-1.5 font-display text-small font-bold tracking-normal text-paper shadow-lg max-bp576:right-0"
              style={{ animationDelay: intro(1500) }}
            >
              Missing entry
            </span>
          </div>

          <div className="mt-stack-xl flex flex-col items-center motion-safe:animate-rise" style={{ animationDelay: intro(1100) }}>
            <Kicker>Page not found</Kicker>
            <h1 className="mt-4 max-w-[18ch] text-h2">
              This page is not in <em className="accent">our ledger</em>
            </h1>
            <p className="mt-4 max-w-[46ch] text-lead text-muted">
              The link may be old or mistyped. Everything else is accounted for, so let us get you back on track.
            </p>
          </div>

          <div
            className="mt-stack-lg flex flex-wrap justify-center gap-3 motion-safe:animate-rise max-bp576:w-full max-bp576:flex-col max-bp576:*:w-full"
            style={{ animationDelay: intro(1250) }}
          >
            <Button href="/" variant="primary" size="lg">
              Back to the home page
            </Button>
            <Button href={site.primaryCta.href} variant="brand" size="lg">
              {site.primaryCta.label}
            </Button>
          </div>

          <nav aria-label="Popular pages" className="mt-stack-lg motion-safe:animate-rise" style={{ animationDelay: intro(1400) }}>
            <ul className="flex flex-wrap justify-center gap-2">
              {shortcuts.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="inline-flex min-h-11 items-center rounded-[10px] bg-surface px-4 font-display text-small font-bold text-ink ring-1 ring-line transition-colors hover:bg-ink hover:text-paper"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </PageMain>
  );
}
