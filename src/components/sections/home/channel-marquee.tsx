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

function cards(hidden: boolean) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-stretch gap-3 pr-3">
      {channelCards.map((c) => (
        <li key={c.name} className="flex w-[20rem] shrink-0 items-center gap-3.5 rounded-[16px] bg-surface p-3 pr-4 ring-1 ring-line">
          <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-paper-2 text-ink">
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {c.icon}
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block font-display font-bold">{c.name}</span>
            <span className="block text-small text-muted">{c.checks}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Channel strip: a calm statement beside a slow, edge-faded row of channel cards.
 * CSS transform loop, pauses on hover, static for reduced motion.
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
          <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
            {cards(false)}
            {cards(true)}
          </div>
        </div>
      </div>
    </section>
  );
}
