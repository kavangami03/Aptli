import { leakTable } from "@/content/home";

function Tile({ yes }: { yes?: boolean }) {
  return (
    <span aria-hidden className={yes ? "mt-0.5 grid size-6 shrink-0 place-items-center rounded-[7px] bg-brand-600 text-white" : "mt-0.5 grid size-6 shrink-0 place-items-center rounded-[7px] bg-block-bg text-block"}>
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {yes ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M5 5l6 6M11 5l-6 6" />}
      </svg>
    </span>
  );
}

/**
 * The leaks at a glance: seven split cards in one centred column (client request).
 * Each card: light "Without Aptli" half (number, leak, what you miss) | red arrow on the join |
 * dark "With Aptli" half (what Aptli does). Halves stack ≤767. Server-rendered.
 */
export function LeakSplits() {
  return (
    <ol className="grid gap-3">
      {leakTable.map((r, i) => (
        <li key={r.short} data-reveal="card" className="grid min-w-0 grid-cols-2 overflow-hidden rounded-[18px] shadow-sm ring-1 ring-line max-bp768:grid-cols-1">
          {/* Without Aptli */}
          <div className="min-w-0 bg-surface px-6 py-5 pr-9 max-bp768:px-5 max-bp768:pb-7">
            <p className="flex items-baseline gap-2.5 font-display text-small font-bold text-ink">
              <span className="num text-h6 text-brand-500">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">{r.wrong}</span>
            </p>
            <p className="mt-3 flex items-start gap-2.5 font-medium text-muted">
              <Tile />
              <span>
                <span className="sr-only">Without Aptli: </span>
                {r.miss}
              </span>
            </p>
          </div>
          {/* With Aptli (the arrow badge sits on its edge: left on desktop, top on phones) */}
          <div className="relative flex min-w-0 flex-col justify-center bg-ink px-6 py-5 pl-9 text-paper max-bp768:px-5 max-bp768:pt-7">
            <span
              aria-hidden
              className="absolute top-1/2 left-0 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[11px] bg-brand-600 text-white shadow-brand ring-4 ring-surface max-bp768:top-0 max-bp768:left-1/2 max-bp768:rotate-90"
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
            <p className="font-display text-small font-bold text-brand-400">With Aptli</p>
            <p className="mt-3 flex items-start gap-2.5 font-display font-bold">
              <Tile yes />
              <span>{r.act}</span>
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
