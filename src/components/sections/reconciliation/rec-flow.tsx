import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { flowSteps } from "@/content/reconciliation";

const icons: React.ReactNode[] = [
  // Read: stacked records
  <g key="i0">
    <ellipse cx="12" cy="6" rx="7" ry="2.5" />
    <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
  </g>,
  // Pair: two linked rings
  <g key="i1">
    <path d="M10 14a4 4 0 010-5.7l2.3-2.3a4 4 0 015.7 5.7l-1.2 1.2" />
    <path d="M14 10a4 4 0 010 5.7l-2.3 2.3a4 4 0 01-5.7-5.7l1.2-1.2" />
  </g>,
  // Compare: columns
  <g key="i2">
    <rect x="3.5" y="4" width="7" height="16" rx="2" />
    <rect x="13.5" y="4" width="7" height="16" rx="2" />
    <path d="M6 9h2M6 13h2M16 9h2M16 13h2" />
  </g>,
  // Flag
  <path key="flag" d="M5 21V4m0 0h11l-2 4 2 4H5" />,
];

/** One example finding, both records side by side (the evidence competitors don't show). */
const evidence = [
  { field: "Status", ota: "Stayed", pms: "Cancelled", off: true },
  { field: "Nights", ota: "3", pms: "0", off: true },
  { field: "Check-in", ota: "Oct 14", pms: "Oct 14" },
  { field: "Commission billed", ota: "$96.30", pms: "Not owed", off: true },
];

/**
 * How the daily match works: four step cards joined by a connector with a travelling dot (desktop),
 * then the direct answer beside one example finding that shows the two records side by side.
 */
export function RecFlow() {
  return (
    <Section
      id="how-it-works"
      tone="paper-2"
      className="[background-image:linear-gradient(to_bottom,rgb(20_20_19/0.05)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.05)_1px,transparent_1px)] [background-size:56px_56px]"
    >
      <SectionIntro
        align="center"
        kicker="The daily match"
        title={
          <>
            How does Aptli reconcile OTA bookings <em className="accent">every day?</em>
          </>
        }
        answer="Four steps, run for you each day. Your team only sees the differences."
      />

      <ol className="mt-stack-xl grid grid-cols-4 gap-grid-gap max-bp1200:grid-cols-2 max-bp576:grid-cols-1">
        {flowSteps.map((s, i) => (
          <li key={s.title} data-reveal="card" className="relative flex min-w-0 flex-col rounded-[24px] bg-surface p-6 shadow-sm ring-1 ring-line">
            {/* Connector to the next card (desktop row only): a hairline with a travelling dot */}
            {i < flowSteps.length - 1 && (
              <span aria-hidden className="absolute top-12 left-full z-10 h-px w-(--spacing-grid-gap) overflow-hidden bg-line-strong max-bp1200:hidden">
                <span
                  className="absolute inset-0 motion-safe:animate-[flow-dot_2.4s_var(--ease-in-out)_infinite]"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-brand-500" />
                </span>
              </span>
            )}
            <span className={i === 3 ? "grid size-12 place-items-center rounded-[14px] bg-brand-600 text-white" : "grid size-12 place-items-center rounded-[14px] bg-paper-2 text-brand-600"}>
              <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {icons[i]}
              </svg>
            </span>
            <h3 className="mt-5 text-h5">{s.title}</h3>
            <p className="mt-2 text-muted">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-grid-gap grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-[clamp(1.5rem,0.5rem+3vw,4.5rem)] rounded-[28px] bg-surface p-stack-lg shadow-sm ring-1 ring-line max-bp992:grid-cols-1 max-bp576:p-stack-md">
        <div className="min-w-0">
          <h3 data-reveal className="text-h4 max-w-[20ch]">Every difference becomes a finding you can check</h3>
          <p data-reveal className="mt-stack-sm max-w-measure text-muted">
            Each day Aptli reads new and changed reservations from the OTA extranets, the virtual card details, the CLC
            portal and your PMS. It pairs each OTA or CLC record with its PMS reservation and compares the stay and the
            money line by line. Every difference becomes a finding with both records attached.
          </p>
        </div>

        {/* Example finding */}
        <figure data-reveal="card" className="min-w-0 rounded-[20px] bg-paper p-5 ring-1 ring-line max-bp390:p-3.5">
          <figcaption className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-display text-small font-bold">Finding · Booking.com BK-48210</span>
            <span className="rounded-[8px] bg-paper-2 px-2 py-0.5 text-caption font-medium text-subtle ring-1 ring-line">Example</span>
          </figcaption>
          <div className="table-scroll mt-4">
            <table className="w-full text-left text-small">
              <thead>
                <tr className="text-caption text-subtle">
                  <th scope="col" className="pb-2 font-medium">Field</th>
                  <th scope="col" className="pb-2 font-medium">Booking.com</th>
                  <th scope="col" className="pb-2 font-medium">Your PMS</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map((e) => (
                  <tr key={e.field} className="border-t border-line">
                    <th scope="row" className="py-2.5 pr-3 font-medium text-muted">{e.field}</th>
                    <td className="py-2.5 pr-3 font-display font-semibold">{e.ota}</td>
                    <td className="py-2.5 font-display font-bold">
                      {e.off ? (
                        <span className="relative isolate inline-block">
                          <span aria-hidden className="hl-bar" />
                          {e.pms}
                          <span className="sr-only"> (does not match)</span>
                        </span>
                      ) : (
                        e.pms
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      </div>
    </Section>
  );
}
