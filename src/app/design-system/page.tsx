import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Button } from "@/components/ui/button";
import { PageMain } from "@/components/layout/page-main";
import { Logo } from "@/components/ui/logo";
import { Section } from "@/components/ui/section";
import { StatusChip } from "@/components/ui/status-chip";
import { pageMetadata } from "@/lib/seo";

/** Internal reference page for the design + dev team. Never indexed (robots + noindex). */
export const metadata = pageMetadata({
  title: "Design system",
  description: "Aptli tokens, type scale and components.",
  path: "/design-system/",
  noindex: true,
});

const swatches: { group: string; items: { name: string; cls: string; hex: string; note?: string }[] }[] = [
  {
    group: "Grounds",
    items: [
      { name: "paper", cls: "bg-paper", hex: "#FAFAF7", note: "Page background" },
      { name: "paper-2", cls: "bg-paper-2", hex: "#F3F2EE", note: "Alternate band" },
      { name: "paper-3", cls: "bg-paper-3", hex: "#EBE9E3", note: "Wells" },
      { name: "surface", cls: "bg-surface", hex: "#FFFFFF", note: "Cards, tables" },
    ],
  },
  {
    group: "Ink",
    items: [
      { name: "ink", cls: "bg-ink", hex: "#141413", note: "Headings, dark bands" },
      { name: "ink-2", cls: "bg-ink-2", hex: "#2A2926" },
      { name: "muted", cls: "bg-muted", hex: "#55534D", note: "Secondary text" },
      { name: "subtle", cls: "bg-subtle", hex: "#6B6862", note: "Captions" },
      { name: "line", cls: "bg-line", hex: "#E6E4DE", note: "Borders" },
    ],
  },
  {
    group: "Brand red (logo)",
    items: [
      { name: "brand-50", cls: "bg-brand-50", hex: "#FEF4F0" },
      { name: "brand-100", cls: "bg-brand-100", hex: "#FDE4DA" },
      { name: "brand-300", cls: "bg-brand-300", hex: "#F59E80" },
      { name: "brand-500", cls: "bg-brand-500", hex: "#EC5224", note: "Logo: marks, icons" },
      { name: "brand-600", cls: "bg-brand-600", hex: "#D4410F", note: "Red buttons" },
      { name: "brand-700", cls: "bg-brand-700", hex: "#B2350C", note: "Red text, links" },
      { name: "brand-900", cls: "bg-brand-900", hex: "#6E2410" },
    ],
  },
  {
    group: "Ledger + status",
    items: [
      { name: "highlight", cls: "bg-highlight", hex: "#F2C14E", note: "Discrepancy only" },
      { name: "ok", cls: "bg-ok", hex: "#1F6F4A" },
      { name: "approve", cls: "bg-approve", hex: "#8A4B00" },
      { name: "task", cls: "bg-task", hex: "#2A4C8C" },
      { name: "block", cls: "bg-block", hex: "#9B2C1F" },
    ],
  },
];

const typeScale = [
  { token: "text-display", sample: "Proves every dollar", spec: "88 → 36 (32 at 320)" },
  { token: "text-h1", sample: "OTA reconciliation for hotels", spec: "72 → 34 (30 at 320)" },
  { token: "text-h2", sample: "Where do hotels lose money?", spec: "56 → 28" },
  { token: "text-h3", sample: "Finance Truth Engine", spec: "40 → 22" },
  { token: "text-h4", sample: "What Aptli does next", spec: "30 → 20" },
  { token: "text-lead", sample: "Aptli checks every OTA commission against your PMS each day.", spec: "22 → 17" },
  { token: "text-body", sample: "Plain, specific and calm, like a good controller explaining a variance.", spec: "18 → 16" },
  { token: "text-small", sample: "Last run 2 hours ago. All feeds operational.", spec: "15 → 14" },
  { token: "text-caption", sample: "Source: OTA statement, Aug 24, 2026", spec: "13 → 12" },
];

const rows = [
  { ref: "EXP-384922", ota: "No-show", pms: "Stayed 3 nights", amount: "$186.40", status: "approve" as const },
  { ref: "BKG-10219", ota: "Cancelled", pms: "Checked out", amount: "$240.00", status: "done" as const },
  { ref: "VCC-55813", ota: "Card $0 limit", pms: "Folio $932.00", amount: "$932.00", status: "task" as const },
  { ref: "CLC-77201", ota: "Billed 3 nights", pms: "Stayed 1 night", amount: "$218.00", status: "blocked" as const },
];

export default function DesignSystemPage() {
  return (
    <PageMain>
      <Section className="pt-[calc(var(--spacing-header)+var(--spacing-section-y-sm))]">
        <div className="mb-stack-lg flex flex-wrap items-center justify-between gap-4 border-b border-line pb-stack-md">
          <Logo href={null} />
          <p className="text-small text-subtle">Internal reference · not indexed</p>
        </div>
        <p className="text-small font-medium text-brand-700">Design system</p>
        <h1 className="mt-3 max-w-[16ch] text-h1">A calm ledger, with one red mark.</h1>
        <p className="mt-stack-md max-w-measure text-lead text-muted">
          Soft-white grounds, ink type, and the Aptli logo red used sparingly for the moments that matter: the money
          call to action and the mark on a number that disagrees.
        </p>
      </Section>

      {/* Colour */}
      <Section tone="paper-2">
        <h2 className="text-h2">Colour</h2>
        <div className="mt-stack-lg grid gap-stack-lg">
          {swatches.map((g) => (
            <div key={g.group}>
              <h3 className="text-h5">{g.group}</h3>
              <div className="mt-4 grid grid-cols-7 gap-3 max-bp1300:grid-cols-5 max-bp992:grid-cols-4 max-bp768:grid-cols-3 max-bp481:grid-cols-2">
                {g.items.map((s) => (
                  <div key={s.name} className="min-w-0 overflow-hidden rounded-md bg-surface ring-1 ring-line">
                    <div className={`${s.cls} h-20 border-b border-line`} />
                    <div className="p-3">
                      <p className="text-small font-medium">{s.name}</p>
                      <p className="text-caption text-subtle">{s.hex}</p>
                      {s.note && <p className="mt-1 text-caption text-muted">{s.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Type */}
      <Section>
        <h2 className="text-h2">Type: Schibsted Grotesk</h2>
        <p className="mt-3 max-w-measure text-muted">
          Fluid clamp() sizes, exact at 1920 and floored at 320. Tabular figures in tables and amounts, so numbers
          line up.
        </p>
        <div className="mt-stack-lg divide-y divide-line border-y border-line">
          {typeScale.map((t) => (
            <div
              key={t.token}
              className="grid grid-cols-[14rem_1fr] items-baseline gap-6 py-5 max-bp992:grid-cols-1 max-bp992:gap-2"
            >
              <div className="text-small text-subtle">
                <code className="text-ink">{t.token}</code>
                <span className="block">{t.spec}</span>
              </div>
              <p className={`${t.token} min-w-0 font-semibold`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Buttons + chips */}
      <Section tone="paper-2">
        <h2 className="text-h2">Buttons and status</h2>
        <div className="mt-stack-lg flex flex-wrap gap-3">
          <Button variant="brand" size="lg" arrow href="/contact/">
            Get a free leakage review
          </Button>
          <Button variant="primary" size="lg" href="/#how-it-works">
            See how it works
          </Button>
          <Button variant="secondary" size="lg">
            Approve
          </Button>
          <Button variant="ghost" size="lg">
            Talk to us about your portfolio
          </Button>
        </div>
        <div className="mt-stack-md flex flex-wrap gap-2">
          <StatusChip status="done" />
          <StatusChip status="approve" />
          <StatusChip status="task" />
          <StatusChip status="blocked" />
        </div>
      </Section>

      {/* Ledger device */}
      <Section>
        <SplitReveal className="max-w-[20ch] text-h2">
          The ledger row is the brand device. The highlighter marks only the number that disagrees.
        </SplitReveal>
        <Reveal className="mt-stack-lg">
          <div className="table-scroll rounded-lg bg-surface shadow-md ring-1 ring-line">
            <table className="w-full min-w-[640px] text-left text-table">
              <caption className="sr-only">Example reconciliation rows</caption>
              <thead className="text-small text-subtle">
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-4 font-medium">Reservation</th>
                  <th scope="col" className="px-5 py-4 font-medium">OTA or CLC says</th>
                  <th scope="col" className="px-5 py-4 font-medium">PMS says</th>
                  <th scope="col" className="px-5 py-4 text-right font-medium">Amount</th>
                  <th scope="col" className="px-5 py-4 font-medium">Aptli verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.ref}>
                    <td className="px-5 py-4 font-mono text-small text-muted">{r.ref}</td>
                    <td className="px-5 py-4">
                      <span className="mark-highlight">{r.ota}</span>
                    </td>
                    <td className="px-5 py-4">{r.pms}</td>
                    <td className="px-5 py-4 text-right font-medium">{r.amount}</td>
                    <td className="px-5 py-4">
                      <StatusChip status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-caption text-subtle">Example data, for illustration.</p>
        </Reveal>
      </Section>

      {/* Motion group demo */}
      <Section tone="ink">
        <SplitReveal className="max-w-[18ch] text-h2">Reconcile, prove, act. Every day.</SplitReveal>
        <RevealGroup className="mt-stack-lg grid grid-cols-3 gap-grid-gap max-bp1200:grid-cols-1">
          {[
            ["1", "Reconcile", "Match every reservation across OTA, virtual card, CLC and PMS."],
            ["2", "Prove", "Attach OTA and PMS evidence and confirm what is really owed."],
            ["3", "Act", "File the dispute, charge the card or post the payment, with your approval."],
          ].map(([n, t, d]) => (
            <RevealItem key={t} className="rounded-lg bg-ink-2 p-stack-md ring-1 ring-white/10">
              <span className="text-h4 font-semibold text-brand-500">{n}</span>
              <h3 className="mt-6 text-h4">{t}</h3>
              <p className="mt-2 text-paper/75">{d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </PageMain>
  );
}
