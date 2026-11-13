import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cadence } from "@/content/reconciliation";

function Mark({ yes }: { yes?: boolean }) {
  return (
    <span aria-hidden className={yes ? "grid size-6 shrink-0 place-items-center rounded-[7px] bg-brand-600 text-white" : "grid size-6 shrink-0 place-items-center rounded-[7px] bg-paper-3 text-subtle"}>
      <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {yes ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M5 5l6 6M11 5l-6 6" />}
      </svg>
    </span>
  );
}

/**
 * Daily vs monthly: the direct answer and a note on deadlines on the left; a real comparison table on
 * the right (desktop and tablet). Phones get one small block per row instead of a squeezed table.
 */
export function RecCadence() {
  return (
    <Section tone="paper">
      <SectionIntro
        align="center"
        kicker="Daily or monthly"
        title={
          <>
            Should hotels reconcile OTAs <em className="accent">daily or monthly?</em>
          </>
        }
        answer="Daily, so problems are found while the stay is fresh and there is still time to act."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] items-start gap-[clamp(1.5rem,0.5rem+3vw,4.5rem)] max-bp1200:grid-cols-1">
        <div className="min-w-0 max-bp1200:max-w-measure">
          <p data-reveal className="text-lead text-ink">
            Daily. A monthly check finds problems weeks after the stay, when some OTA dispute and reporting windows may
            already be closed and the details are harder to prove. A daily check finds the same problems while the folio
            is fresh, so disputes go out in time and money arrives sooner. Monthly totals still matter for closing the
            books.
          </p>
          <p data-reveal className="mt-stack-md rounded-[16px] bg-paper-2 p-4 text-small text-muted ring-1 ring-line">
            Each OTA sets its own dispute and reporting windows, and they change. Check the current terms in each
            extranet before you rely on a date.
          </p>
        </div>

        {/* Table: tablet and up */}
        <div data-reveal="card" className="min-w-0 overflow-hidden rounded-[24px] bg-surface shadow-sm ring-1 ring-line max-bp768:hidden">
          <table className="w-full text-left">
            <caption className="sr-only">Monthly reconciliation compared with daily reconciliation with Aptli</caption>
            <thead>
              <tr>
                <td className="w-[28%] p-5" />
                <th scope="col" className="p-5 font-display text-h6 font-bold text-ink/70">
                  Monthly
                </th>
                <th scope="col" className="bg-ink p-5 font-display text-h6 font-bold text-paper">
                  Daily with Aptli
                </th>
              </tr>
            </thead>
            <tbody>
              {cadence.map((r) => (
                <tr key={r.label} className="border-t border-line">
                  <th scope="row" className="p-5 font-display text-small font-bold">
                    {r.label}
                  </th>
                  <td className="p-5 text-muted">
                    <span className="flex items-center gap-3">
                      <Mark />
                      {r.monthly}
                    </span>
                  </td>
                  <td className="border-t border-white/10 bg-ink p-5 text-paper">
                    <span className="flex items-center gap-3">
                      <Mark yes />
                      {r.daily}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one block per row */}
        <ul className="hidden gap-3 max-bp768:grid">
          {cadence.map((r) => (
            <li key={r.label} data-reveal="card" className="overflow-hidden rounded-[20px] bg-surface shadow-xs ring-1 ring-line">
              <p className="px-4 pt-4 font-display text-small font-bold">{r.label}</p>
              <p className="flex items-center gap-3 px-4 py-3 text-muted">
                <Mark />
                <span>
                  <span className="sr-only">Monthly: </span>
                  {r.monthly}
                </span>
              </p>
              <p className="flex items-center gap-3 bg-ink px-4 py-3 text-paper">
                <Mark yes />
                <span>
                  <span className="sr-only">Daily with Aptli: </span>
                  {r.daily}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
