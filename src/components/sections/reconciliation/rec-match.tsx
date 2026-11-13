import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/lib/cn";

type Pair = { field: string; ota: string; pms: string; key?: boolean };

/** Example records only. The exact pair is joined by the confirmation number; the fuzzy one by details. */
const exact: Pair[] = [
  { field: "Confirmation", ota: "48210377", pms: "48210377", key: true },
  { field: "Guest", ota: "J. Rivera", pms: "J. Rivera" },
];
const fuzzy: Pair[] = [
  { field: "Confirmation", ota: "71930542", pms: "Missing" },
  { field: "Guest", ota: "Sam Okafor", pms: "S. Okafor", key: true },
  { field: "Stay", ota: "Nov 3 to 5", pms: "Nov 3 to 5", key: true },
  { field: "Amount", ota: "$238.00", pms: "$238.00", key: true },
];

function Records({ rows, tone }: { rows: Pair[]; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="table-scroll mt-5">
      <table className="w-full text-left text-small">
        <thead>
          <tr className={cn("text-caption", dark ? "text-paper/55" : "text-subtle")}>
            <th scope="col" className="pb-2 font-medium">Field</th>
            <th scope="col" className="pb-2 font-medium">OTA record</th>
            <th scope="col" className="pb-2 font-medium">PMS record</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.field} className={cn("border-t", dark ? "border-white/10" : "border-line")}>
              <th scope="row" className={cn("py-2.5 pr-3 font-medium", dark ? "text-paper/65" : "text-muted")}>{r.field}</th>
              <td className="py-2.5 pr-3 font-display font-semibold">{r.ota}</td>
              <td className="py-2.5 font-display font-semibold">
                <span className="inline-flex items-center gap-2">
                  {r.pms}
                  {r.key && (
                    <span className={cn("grid size-5 place-items-center rounded-[6px]", dark ? "bg-brand-600 text-white" : "bg-ink text-paper")}>
                      <svg aria-hidden viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                      <span className="sr-only">used to pair</span>
                    </span>
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Exact vs fuzzy matching: the direct answer on the left, two example cards on the right. The exact
 * card pairs by confirmation number and can move on; the fuzzy card pairs by details and waits for a
 * person (status chip "Needs approval", never colour alone).
 */
export function RecMatch() {
  return (
    <Section tone="paper-2">
      <SectionIntro
        align="center"
        kicker="How records are paired"
        title={
          <>
            What is an exact match vs a <em className="accent">fuzzy match?</em>
          </>
        }
        answer="How sure Aptli is that two records describe the same stay, and what it is allowed to do next."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-start gap-[clamp(1.5rem,0.5rem+3vw,4.5rem)] max-bp1200:grid-cols-1">
        <div className="min-w-0 max-bp1200:max-w-measure">
          <p data-reveal className="text-lead text-ink">
            An exact match is when the OTA or CLC confirmation number points to one reservation in your PMS, so both
            records clearly describe the same stay. A fuzzy match is when that number is missing or different, and Aptli
            pairs the records using details such as guest name, stay dates and amount instead.
          </p>
          <p data-reveal className="mt-stack-sm text-muted">
            Exact matches can move to the next step under the rules you set. Fuzzy matches never act on their own. A
            person on your team confirms the pair first, because a wrong pair would mean disputing the wrong stay.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-grid-gap max-bp768:grid-cols-1">
          <article data-reveal="card" className="flex min-w-0 flex-col rounded-[24px] bg-surface p-6 shadow-sm ring-1 ring-line max-bp390:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-h5">Exact match</h3>
              <StatusChip status="done" label="Can move on" />
            </div>
            <p className="mt-2 text-small text-muted">Paired by the confirmation number.</p>
            <Records rows={exact} tone="light" />
            <p className="mt-auto pt-5 text-caption text-subtle">Example records</p>
          </article>

          <article data-reveal="card" className="flex min-w-0 flex-col rounded-[24px] bg-ink p-6 text-paper shadow-lg max-bp390:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-h5 text-paper">Fuzzy match</h3>
              <StatusChip status="approve" />
            </div>
            <p className="mt-2 text-small text-paper/70">Paired by name, dates and amount. A person confirms it.</p>
            <Records rows={fuzzy} tone="dark" />
            <p className="mt-auto pt-5 text-caption text-paper/50">Example records</p>
          </article>
        </div>
      </div>
    </Section>
  );
}
