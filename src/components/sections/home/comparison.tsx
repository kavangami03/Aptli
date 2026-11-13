import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";
import { comparison } from "@/content/home";

const Icon = ({ kind }: { kind: "yes" | "part" | "no" }) => (
  <span
    aria-hidden
    className={cn(
      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-[7px]",
      kind === "yes" && "bg-brand-500 text-white",
      kind === "part" && "bg-approve-bg text-approve",
      kind === "no" && "bg-paper-3 text-subtle",
    )}
  >
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {kind === "yes" && <path d="M3.5 8.5l3 3 6-7" />}
      {kind === "part" && <path d="M4 8h8" />}
      {kind === "no" && <path d="M5 5l6 6M11 5l-6 6" />}
    </svg>
  </span>
);

/** Which cells are partial vs missing for the two category columns (visual only; text says it). */
const marks: ("part" | "no")[][] = [
  ["part", "part"],
  ["part", "no"],
  ["no", "part"],
  ["no", "no"],
  ["no", "part"],
  ["no", "part"],
];

/**
 * Reports vs outsourced recovery vs Aptli (category names only, brief). Real <table>; the Aptli
 * column is a raised ink card with a red cap that rises above the table.
 */
export function Comparison() {
  const last = comparison.rows.length - 1;
  return (
    <Section id="compare" tone="paper">
      <SectionIntro
        align="split"
        kicker="Compare the options"
        index="05"
        title={
          <>
            How is Aptli different from reports and <em className="accent">recovery services?</em>
          </>
        }
        answer="Reports leave the work to you. Recovery services hide it. Aptli shows the evidence and does the work with your approval."
      />
      <Reveal className="mt-stack-xl">
        <div data-reveal="card" className="table-scroll pt-6">
          <table className="w-full min-w-[56rem] border-separate border-spacing-0 text-left text-table">
            <caption className="sr-only">Comparison of reconciliation reports, outsourced recovery services and Aptli</caption>
            <thead>
              <tr>
                <td className="w-[22%]" />
                <th scope="col" className="px-6 pb-5 align-bottom font-display text-h6 text-muted">{comparison.columns[0]}</th>
                <th scope="col" className="px-6 pb-5 align-bottom font-display text-h6 text-muted">{comparison.columns[1]}</th>
                <th scope="col" className="relative rounded-t-[24px] bg-ink px-6 pt-7 pb-5 align-bottom font-display text-h5 text-paper shadow-[0_-6px_0_var(--color-brand-500)]">
                  <span className="absolute -top-4 left-6 rounded-[8px] bg-brand-500 px-2.5 py-1 font-display text-caption font-bold text-white">Recommended</span>
                  {comparison.columns[2]}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r, ri) => (
                <tr key={r.label} className="group/row">
                  <th scope="row" className="border-t border-line px-1 py-5 pr-6 align-top font-display text-small font-bold text-ink">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => {
                    const aptli = i === 2;
                    return (
                      <td
                        key={i}
                        className={cn(
                          "px-6 py-5 align-top",
                          aptli
                            ? cn("border-t border-white/10 bg-ink font-semibold text-paper", ri === last && "rounded-b-[24px]")
                            : "border-t border-line text-muted transition-colors group-hover/row:bg-paper-2",
                        )}
                      >
                        <span className="flex gap-3">
                          <Icon kind={aptli ? "yes" : marks[ri][i]} />
                          <span>{v}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
