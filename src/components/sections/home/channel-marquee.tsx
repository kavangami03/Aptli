const channels = ["Expedia", "Booking.com", "Hotels.com", "OTA virtual cards", "CLC direct bill", "CLC CheckINN", "Your PMS"];
const checks = [
  "Commission and stay dates",
  "Cancellations and no-shows",
  "Commission on each stay",
  "Charge windows and amounts",
  "Invoices and payments",
  "Crew check-ins and check-outs",
  "Folios, night audit, AR",
];

/** Seconds between neighbouring ticks firing: the "being checked" ripple runs along the strip. */
const RIPPLE = 0.5;
const LOOP = channels.length * RIPPLE + 1.2;

function Tick({ i }: { i: number }) {
  const timing = { animationDuration: `${LOOP}s`, animationDelay: `${i * RIPPLE}s` };
  return (
    // translate-y nudges it onto the capital letters' centre line; the pop uses `transform`, so they combine
    <span
      aria-hidden
      className="mx-[0.45em] inline-grid size-[0.6em] shrink-0 translate-y-[0.07em] place-items-center rounded-[0.14em] bg-brand-600 text-white motion-safe:animate-[tick-pop_6s_var(--ease-out)_infinite]"
      style={timing}
    >
      <svg viewBox="0 0 16 16" className="size-[62%]" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 8.5l3 3 6-7" className="[stroke-dasharray:16] motion-safe:animate-[tick-draw_6s_linear_infinite]" style={timing} />
      </svg>
    </span>
  );
}

/** Big channel names in solid ink, a red tick after each. */
function NameRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {channels.map((c, i) => (
        <li
          key={c}
          // Every channel in solid ink (all are checked; a faded name would read as "not supported")
          // No outlined text: the variable font's overlapping glyph contours show as stray lines when stroked.
          className="flex items-center whitespace-nowrap text-ink"
        >
          {c}
          <Tick i={i} />
        </li>
      ))}
    </ul>
  );
}

/** What gets checked, small, dot-separated. */
function CheckRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {checks.map((c) => (
        <li key={c} className="flex items-center whitespace-nowrap">
          {c}
          <span aria-hidden className="mx-5 size-1.5 rounded-full bg-brand-500" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Channel strip as a ticker tape (deliberately unlike the hero's tiles): big channel names in display
 * type in solid ink with a red tick after each, and a small row of what gets
 * checked moving the other way. CSS transform loops, keep running on hover, still for reduced motion.
 */
export function ChannelMarquee() {
  return (
    <section aria-labelledby="channels-title" className="relative overflow-x-clip border-b border-line bg-paper py-stack-lg">
      <div data-reveal className="container-site flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
        <h2 id="channels-title" className="font-display text-h5 font-bold">
          Every channel, checked daily
        </h2>
        <p className="text-small text-muted">Matched against your PMS, one reservation at a time.</p>
      </div>

      <div data-reveal="card" className="mt-stack-md [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Row 1: channel names */}
        <div className="flex overflow-hidden py-1">
          <div className="flex w-max font-display text-[clamp(2rem,1.2rem+3vw,4.5rem)] leading-[1.15] font-bold tracking-[-0.03em] motion-safe:animate-marquee">
            <NameRow />
            <NameRow hidden />
          </div>
        </div>
        {/* Row 2: what is checked, moving the other way */}
        <div className="mt-3 flex overflow-hidden border-y border-line py-3">
          <div className="flex w-max text-small font-medium text-muted motion-safe:animate-[marquee_50s_linear_infinite_reverse]">
            <CheckRow />
            <CheckRow hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
