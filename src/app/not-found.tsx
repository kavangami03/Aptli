import Link from "next/link";
import { PageMain } from "@/components/layout/page-main";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/section-intro";
import { site } from "@/lib/site";
import { NotFoundNumber } from "./not-found-number";

/** Waits for the first-visit preloader, like the home hero (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

const shortcuts = [
  { label: "Reconciliation", href: "/reconciliation/" },
  { label: "Finance Truth Engine", href: "/finance-truth-engine/" },
  { label: "Automation", href: "/automation/" },
  { label: "Integrations", href: "/integrations/" },
];

/**
 * 404: a giant 4-0-4 falls from above the screen, digit by digit, bounces and lands upright (a shadow
 * lands under each one), then a "Missing entry" tag stamps on. The cursor pushes each digit away from
 * whichever side it comes (see NotFoundNumber). Still for reduced motion. Next adds noindex.
 */
export default function NotFound() {
  return (
    <PageMain>
      <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-x-clip bg-paper-2 pt-[calc(var(--spacing-header)+var(--spacing-stack-lg))] pb-section-y-sm text-center [background-image:linear-gradient(to_bottom,rgb(20_20_19/0.06)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.06)_1px,transparent_1px)] [background-size:64px_64px]">
        <div className="container-site flex flex-col items-center">
          <p className="sr-only">Error 404</p>

          {/* The falling number; the cursor pushes each digit away from any side */}
          <NotFoundNumber />

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
