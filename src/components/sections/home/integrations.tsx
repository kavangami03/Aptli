import Image from "next/image";
import { ArrowLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";

/**
 * Integrations as a left-to-right flow you can read like a sentence:
 *   what Aptli reads (your systems)  →  Aptli matches every morning  →  what Aptli does back (and where).
 * Dots travel along the connectors (transform-only CSS loops). On touch widths it stacks top to bottom.
 * Connector status wording must be confirmed with product before launch (brief).
 */

const sources: { title: string; systems: string[]; reads: string; icon: React.ReactNode }[] = [
  {
    title: "Your PMS",
    systems: ["choiceADVANTAGE", "HotelKey", "OPERA Cloud", "AutoClerk", "SynXis"],
    reads: "Folios, stays, check-outs and AR",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </>
    ),
  },
  {
    title: "The OTAs",
    systems: ["Expedia", "Booking.com", "Hotels.com"],
    reads: "Commissions, stay dates and virtual cards",
    icon: <path d="M4 7h16M4 12h10M4 17h6M17 14l3 3-3 3" />,
  },
  {
    title: "CLC crew lodging",
    systems: ["CLC CheckINN"],
    reads: "Crew check-ins, invoices and payments",
    icon: <path d="M3 14l7-2 8-7a2 2 0 013 3l-7 8-2 7-2-5-5-2z" />,
  },
];

const outcomes: { where: string; does: string; icon: React.ReactNode }[] = [
  { where: "In the OTA extranet", does: "Files the commission dispute, with the folio attached", icon: <path d="M4 7h16M4 12h10M4 17h6" /> },
  {
    where: "On the virtual card",
    does: "Charges it once the cancellation window has closed",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  },
  {
    where: "In your PMS",
    does: "Posts each CLC payment to the right open invoice",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
  },
  {
    where: "In your inbox",
    does: "One email each morning: what was done, what needs you",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3.5 6.5l8.5 6 8.5-6" />
      </>
    ),
  },
];

const setup = [
  { t: "You approve access", d: "Read access, one property at a time" },
  { t: "We connect and test", d: "Nothing changes for your front desk" },
  { t: "Your first daily email", d: "Every finding, with its evidence" },
];

function Icon({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("grid size-10 shrink-0 place-items-center rounded-[11px]", className)}>
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

/** Horizontal connector with a dot travelling along it (desktop only). */
function Connector({ side, delay }: { side: "left" | "right"; delay: number }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-1/2 h-0.5 w-[var(--gap)] -translate-y-1/2 bg-line-strong max-bp1200:hidden",
        side === "right" ? "left-full" : "right-full",
      )}
    >
      <span className="absolute inset-0 motion-safe:animate-[flow-dot_2.4s_var(--ease-in-out)_infinite]" style={{ animationDelay: `${delay}s` }}>
        <span className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgb(236_82_36/0.15)]" />
      </span>
    </span>
  );
}

function ColumnLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-2.5 font-display text-small font-bold text-muted">
      <span className="num grid size-6 place-items-center rounded-[7px] bg-ink text-caption text-paper">{n}</span>
      {children}
    </p>
  );
}

/** Down arrow between columns when the flow stacks (≤1199). */
function FlowArrow() {
  return (
    <span aria-hidden className="mx-auto hidden size-10 place-items-center rounded-[11px] bg-brand-500 text-white max-bp1200:grid">
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v10M4 9l4 4 4-4" />
      </svg>
    </span>
  );
}

export function Integrations() {
  return (
    <Section id="integrations" tone="paper">
      <SectionIntro
        align="center"
        kicker="Integrations"
        title={
          <>
            How Aptli works with the systems <em className="accent">you already run</em>
          </>
        }
        answer="Aptli reads from your PMS, the OTAs and CLC, checks them against each other every morning, then fixes things in the right place."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,1fr)_minmax(15rem,0.75fr)_minmax(0,1fr)] items-stretch gap-x-[var(--gap)] gap-y-6 [--gap:clamp(2.5rem,1rem+3vw,4.5rem)] max-bp1200:grid-cols-1">
        {/* 1. What Aptli reads */}
        <div className="flex min-w-0 flex-col">
          <ColumnLabel n="1">What Aptli reads</ColumnLabel>
          <ul className="my-auto grid gap-3">
            {sources.map((s, i) => (
              <li key={s.title} data-reveal="card" className="relative rounded-[20px] bg-surface p-4 shadow-sm ring-1 ring-line">
                <div className="flex items-center gap-3">
                  <Icon className="bg-ink text-paper">{s.icon}</Icon>
                  <div className="min-w-0">
                    <h3 className="text-h6">{s.title}</h3>
                    <p className="text-small text-muted">{s.reads}</p>
                  </div>
                </div>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.systems.map((n) => (
                    <li key={n} className="rounded-[7px] bg-paper-2 px-2 py-0.5 font-display text-caption font-bold text-muted">
                      {n}
                    </li>
                  ))}
                </ul>
                <Connector side="right" delay={i * 0.5} />
              </li>
            ))}
          </ul>
        </div>

        <FlowArrow />

        {/* 2. Aptli */}
        <div className="flex min-w-0 flex-col">
          <ColumnLabel n="2">Aptli, every morning</ColumnLabel>
          <div data-reveal="card" className="relative my-auto overflow-hidden rounded-[26px] bg-ink p-stack-md text-paper shadow-lg">
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-[16px] bg-surface motion-safe:animate-[pulse-glow_2.6s_var(--ease-out)_infinite]">
                <Image src="/brand/aptli-mark.png" alt="" width={56} height={56} className="size-10" />
              </span>
              <div>
                <p className="font-display text-h5 font-bold">Aptli</p>
                <p className="text-small text-paper/65">Runs at 7:00 am, every day</p>
              </div>
            </div>
            <ol className="mt-stack-md grid gap-2">
              {["Lines up every reservation", "Finds where records disagree", "Attaches both records as proof"].map((t, i) => (
                <li key={t} className="flex items-center gap-3 rounded-[12px] bg-white/8 px-3.5 py-2.5 text-small font-medium">
                  <span className="num grid size-6 place-items-center rounded-[7px] bg-brand-500 font-display text-caption font-bold text-white">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-center gap-2 text-caption text-paper/60">
              <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 text-ok" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 015 0v2" /></svg>
              Read-only by default, with your consent per property
            </p>
          </div>
        </div>

        <FlowArrow />

        {/* 3. What Aptli does back */}
        <div className="flex min-w-0 flex-col">
          <ColumnLabel n="3">What Aptli does back</ColumnLabel>
          <ul className="my-auto grid gap-3">
            {outcomes.map((o, i) => (
              <li key={o.where} data-reveal="card" className="relative flex items-center gap-3 rounded-[20px] bg-surface p-4 shadow-sm ring-1 ring-line">
                <Icon className="bg-brand-50 text-brand-600">{o.icon}</Icon>
                <div className="min-w-0">
                  <h3 className="text-h6">{o.where}</h3>
                  <p className="text-small text-muted">{o.does}</p>
                </div>
                <Connector side="left" delay={1.2 + i * 0.4} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Setup */}
      <div data-reveal="card" className="mt-stack-xl rounded-[24px] bg-ink p-stack-md text-paper">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-h5 font-bold">Getting connected</p>
          <ArrowLink href="/integrations/" tone="dark">
            Check your PMS
          </ArrowLink>
        </div>
        <ol className="mt-stack-md grid grid-cols-3 gap-3 max-bp992:grid-cols-1">
          {setup.map((s, i) => (
            <li key={s.t} className="flex items-center gap-3 rounded-[16px] bg-white/6 p-4 ring-1 ring-white/10">
              <span className="num grid size-9 shrink-0 place-items-center rounded-[10px] bg-brand-500 font-display text-small font-bold text-white">{i + 1}</span>
              <span className="min-w-0">
                <span className="block font-display font-bold">{s.t}</span>
                <span className="block text-small text-paper/65">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-caption text-paper/55">Some connectors are live and others are rolling out. Ask us about yours.</p>
      </div>
    </Section>
  );
}
