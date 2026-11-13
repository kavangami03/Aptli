const channelCards: { name: string; checks: string; icon: React.ReactNode }[] = [
  { name: "Expedia", checks: "Commission and stay dates", icon: <path d="M4 7h16M4 12h10M4 17h6" /> },
  { name: "Booking.com", checks: "Cancellations and no-shows", icon: <path d="M5 5h14v14H5zM9 9h6M9 13h4" /> },
  { name: "Hotels.com", checks: "Commission on each stay", icon: <path d="M4 20V8l8-4 8 4v12M9 20v-6h6v6" /> },
  {
    name: "OTA virtual cards",
    checks: "Charge windows and amounts",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  },
  { name: "CLC direct bill", checks: "Invoices and payments", icon: <path d="M3 14l7-2 8-7a2 2 0 013 3l-7 8-2 7-2-5-5-2z" /> },
  { name: "CLC CheckINN", checks: "Crew check-ins and check-outs", icon: <path d="M4 12l5 5L20 6" /> },
  {
    name: "Your PMS",
    checks: "Folios, night audit, AR",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </>
    ),
  },
];

/**
 * Card tones alternate ink / white / red so the strip has rhythm. Text on red stays full white
 * (AA on brand-600); muted text only sits on ink or white.
 */
const tones = {
  ink: { card: "bg-ink text-paper ring-white/10", tile: "bg-brand-500 text-white", sub: "text-paper/70", tick: "bg-white/12 text-paper" },
  brand: { card: "bg-brand-600 text-white ring-brand-700 shadow-brand", tile: "bg-white text-brand-600", sub: "text-white", tick: "bg-white text-brand-600" },
  light: { card: "bg-surface text-ink ring-line", tile: "bg-ink text-paper", sub: "text-muted", tick: "bg-ok text-white" },
} as const;
// 4-step cycle over 7 cards: no two tones repeat side by side, even where the loop wraps.
const cycle: (keyof typeof tones)[] = ["ink", "light", "brand", "light"];

function cards(hidden: boolean) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-stretch gap-3 pr-3">
      {channelCards.map((c, i) => {
        const t = tones[cycle[i % cycle.length]];
        return (
          <li key={c.name} className={`flex w-[21rem] shrink-0 items-center gap-3.5 rounded-[16px] p-3 pr-3.5 ring-1 ${t.card}`}>
            <span className={`grid size-11 shrink-0 place-items-center rounded-[12px] ${t.tile}`}>
              <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {c.icon}
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display font-bold">{c.name}</span>
              <span className={`block text-small ${t.sub}`}>{c.checks}</span>
            </span>
            <span aria-hidden className={`grid size-6 shrink-0 place-items-center self-start rounded-full ${t.tick}`}>
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Channel strip: a calm statement beside a slow, edge-faded row of channel cards.
 * CSS transform loop that keeps running on hover (client request), static for reduced motion.
 */
export function ChannelMarquee() {
  return (
    <section aria-labelledby="channels-title" className="group relative overflow-x-clip border-b border-line bg-paper py-stack-lg">
      <div className="container-site grid grid-cols-[minmax(0,17rem)_minmax(0,1fr)] items-center gap-stack-lg max-bp992:grid-cols-1">
        <div data-reveal>
          <p id="channels-title" className="font-display text-h5 font-bold">
            Every channel, checked daily
          </p>
          <p className="mt-1 text-small text-muted">Matched against your PMS, one reservation at a time.</p>
        </div>
        <div data-reveal="card" className="-my-2 flex min-w-0 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max motion-safe:animate-marquee">
            {cards(false)}
            {cards(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
