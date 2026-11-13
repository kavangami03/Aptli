import Link from "next/link";

/** Entry delay that waits for the first-visit preloader (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

/**
 * Tile tones (client order, Nov 13 2026: orange, white, orange, white). Each tile's hover wipes to
 * the opposite colour. All strings are static so Tailwind can see them.
 */
const tones = {
  light: {
    text: "text-ink",
    base: "bg-surface",
    wipe: "bg-brand-600",
    label: "group-hover/tile:text-white",
    sub: "text-muted group-hover/tile:text-white",
    icon: "bg-paper-2 text-brand-600 ring-line group-hover/tile:bg-white group-hover/tile:text-brand-600 group-hover/tile:ring-white",
    arrow: "text-ink group-hover/tile:bg-white group-hover/tile:text-brand-600",
  },
  brand: {
    text: "text-white",
    base: "bg-brand-600",
    wipe: "bg-surface",
    label: "group-hover/tile:text-ink",
    sub: "text-white/75 group-hover/tile:text-muted",
    icon: "bg-white/12 text-white ring-white/20 group-hover/tile:bg-brand-600 group-hover/tile:ring-brand-600",
    arrow: "text-white group-hover/tile:bg-brand-600",
  },
} as const;
const tileOrder: (keyof typeof tones)[] = ["brand", "light", "brand", "light"];

export type HeroPath = { label: string; sub: string; href: string; icon: React.ReactNode };

/**
 * The red quick-path tiles along the bottom edge of every photo hero (home and inner pages).
 * Desktop: the tiles sit on the hero's bottom edge. ≤1199 they are standalone cards with room below.
 */
export function HeroTiles({ paths, label, delay = 360 }: { paths: HeroPath[]; label: string; delay?: number }) {
  return (
    <nav aria-label={label} className="container-site relative -mb-px max-bp1200:mb-0 max-bp1200:pb-stack-lg">
        <ul className={paths.length === 3 ? "grid grid-cols-3 gap-2 max-bp1200:grid-cols-1" : "grid grid-cols-4 gap-2 max-bp1200:grid-cols-2"}>
          {paths.map((p, i) => {
            const t = tones[tileOrder[i % tileOrder.length]];
            return (
            <li key={p.href} className="motion-safe:animate-rise" style={{ animationDelay: intro(delay + i * 90) }}>
              {/* Hover (pointer devices): the tile grows taller from the bottom edge (it stays attached, never
                  floats), the opposite colour wipes up through it, the icon swaps upward and the arrow swaps
                  like <Button>. Both layers sit 0.75rem taller than the tile and are revealed with clip-path,
                  so the corners stay round while it grows. */}
              <Link
                href={p.href}
                className={`group/tile relative isolate flex h-full items-center px-5 py-5 [--r:18px_18px_0_0] max-bp1200:[--r:16px] max-bp576:px-4 max-bp576:py-4 ${t.text}`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -top-3 bottom-0 -z-10 [clip-path:inset(0.75rem_0_0_0_round_var(--r))] transition-[clip-path] duration-(--duration-slow) ease-(--ease-out) group-hover/tile:[clip-path:inset(0_0_0_0_round_var(--r))] ${t.base}`}
                />
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -top-3 bottom-0 -z-10 [clip-path:inset(100%_0_0_0_round_var(--r))] transition-[clip-path] duration-(--duration-slow) ease-(--ease-out) group-hover/tile:[clip-path:inset(0_0_0_0_round_var(--r))] ${t.wipe}`}
                />
                <span className="flex min-w-0 flex-1 items-center gap-4 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:-translate-y-1.5 max-bp576:gap-3">
                <span className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-[12px] ring-1 transition-[background-color,color,box-shadow] duration-(--duration-base) max-bp576:size-10 max-bp481:hidden ${t.icon}`}>
                  <svg aria-hidden viewBox="0 0 24 24" className="size-6 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:-translate-y-[180%] max-bp576:size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                  <svg aria-hidden viewBox="0 0 24 24" className="absolute size-6 translate-y-[180%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-y-0 max-bp576:size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                <span className="min-w-0 text-left">
                  <span className={`block font-display font-bold transition-colors duration-(--duration-base) ${t.label}`}>{p.label}</span>
                  <span className={`block text-small transition-colors duration-(--duration-base) max-bp576:hidden ${t.sub}`}>{p.sub}</span>
                </span>
                <span
                  aria-hidden
                  className={`relative ml-auto grid size-9 shrink-0 place-items-center overflow-hidden rounded-[10px] transition-colors duration-(--duration-base) max-bp576:hidden ${t.arrow}`}
                >
                  <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-x-[180%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                  <svg viewBox="0 0 16 16" className="absolute size-4 -translate-x-[180%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-x-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
    </nav>
  );
}
