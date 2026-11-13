import Image from "next/image";
import Link from "next/link";
import heroBg from "@/assets/images/home/operators-lobby.jpg";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/section-intro";
import { site } from "@/lib/site";

/** Entry delay that waits for the first-visit preloader (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

/** SFS-style quick paths along the bottom of the hero. */
const paths = [
  {
    label: "OTA commission",
    sub: "Cancelled and shortened stays",
    href: "/reconciliation/ota-commission/",
    icon: <path d="M4 7h16M4 12h10M4 17h6M17 14l3 3-3 3" />,
  },
  {
    label: "Virtual cards",
    sub: "Charge every eligible card",
    href: "/reconciliation/virtual-card/",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
  },
  {
    label: "CLC direct bill",
    sub: "Crew stays and payments",
    href: "/reconciliation/clc-direct-bill/",
    icon: <path d="M3 14l7-2 8-7a2 2 0 013 3l-7 8-2 7-2-5-5-2z" />,
  },
  {
    label: "Free leakage review",
    sub: "See what you are owed",
    href: "/contact/",
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4.5 4.5M8.5 11h5M11 8.5v5" />
      </>
    ),
  },
];

/**
 * Hero (SFS reference): full-bleed photo under a dark wash, one short message the visitor
 * actually reads, two actions, and four red quick-path tiles. Nothing else on top.
 * Motion: CSS rise on load (visible at first paint), photo parallax on scroll.
 */
export function Hero() {
  return (
    <section className="on-ink relative isolate flex min-h-[max(44rem,100svh)] flex-col overflow-x-clip bg-ink text-paper max-bp768:min-h-[max(40rem,92svh)]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax className="absolute inset-[-6%]" amount={8}>
          <Image
            src={heroBg}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover motion-safe:animate-zoom-out"
            style={{ animationDelay: intro(0) }}
          />
        </Parallax>
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-transparent to-ink/80" />
      </div>

      <div className="container-site flex flex-1 flex-col items-center justify-center pt-[calc(var(--spacing-header)+var(--spacing-stack-lg))] pb-stack-xl text-center">
        <div className="motion-safe:animate-rise" style={{ animationDelay: intro(0) }}>
          <Kicker tone="dark">Revenue assurance for US hotels</Kicker>
        </div>
        {/* Exactly three lines on desktop (client request); natural balanced wrap below 1024. */}
        {/* Lines slide up from a mask one by one, then the red block wipes in (CSS: visible at first paint). */}
        <h1 className="hero-title mt-5 w-full text-display leading-[1.1] text-paper [text-wrap:nowrap] max-bp1024:max-w-[18ch] max-bp1024:[text-wrap:balance]">
          <span className="hero-line">
            <span style={{ animationDelay: intro(120) }}>Hotel revenue reconciliation</span>
          </span>{" "}
          <span className="hero-line">
            <span style={{ animationDelay: intro(240) }}>that proves every dollar</span>
          </span>{" "}
          <span className="hero-line">
            <span style={{ animationDelay: intro(360) }}>
              and <em className="accent hero-accent">acts on it</em>
            </span>
          </span>
        </h1>
        <p className="mt-5 max-w-[46rem] text-lead text-paper/85 motion-safe:animate-rise" style={{ animationDelay: intro(160) }}>
          Aptli checks OTA commissions, virtual cards and CLC payments against your PMS every day, then fixes what is
          wrong with your approval.
        </p>
        <div
          className="mt-stack-lg flex flex-wrap justify-center gap-3 motion-safe:animate-rise max-bp576:w-full max-bp576:flex-col max-bp576:*:w-full"
          style={{ animationDelay: intro(240) }}
        >
          <Button href={site.primaryCta.href} variant="brand" size="lg">
            {site.primaryCta.label}
          </Button>
          <Button href={site.secondaryCta.href} variant="inverse" size="lg">
            {site.secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Red quick-path tiles */}
      <nav aria-label="Start with a channel" className="container-site relative -mb-px">
        <ul className="grid grid-cols-4 gap-2 max-bp1200:grid-cols-2">
          {paths.map((p, i) => (
            <li key={p.href} className="motion-safe:animate-rise" style={{ animationDelay: intro(360 + i * 90) }}>
              {/* Hover (pointer devices): the tile grows taller from the bottom edge (it stays attached, never
                  floats), a white panel wipes up through it, the icon swaps upward inside a red box and the
                  arrow swaps like <Button>. Both layers sit 0.75rem taller than the tile and are revealed with
                  clip-path, so the corners stay round while it grows. */}
              <Link
                href={p.href}
                className="group/tile relative isolate flex h-full items-center px-5 py-5 text-white [--r:18px_18px_0_0] max-bp1200:[--r:16px] max-bp576:px-4 max-bp576:py-4"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-3 bottom-0 -z-10 bg-brand-600 [clip-path:inset(0.75rem_0_0_0_round_var(--r))] transition-[clip-path] duration-(--duration-slow) ease-(--ease-out) group-hover/tile:[clip-path:inset(0_0_0_0_round_var(--r))]"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-3 bottom-0 -z-10 bg-surface [clip-path:inset(100%_0_0_0_round_var(--r))] transition-[clip-path] duration-(--duration-slow) ease-(--ease-out) group-hover/tile:[clip-path:inset(0_0_0_0_round_var(--r))]"
                />
                <span className="flex min-w-0 flex-1 items-center gap-4 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:-translate-y-1.5 max-bp576:gap-3">
                <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-[12px] bg-white/12 ring-1 ring-white/20 transition-[background-color,box-shadow] duration-(--duration-base) group-hover/tile:bg-brand-600 group-hover/tile:ring-brand-600 max-bp576:size-10 max-bp481:hidden">
                  <svg aria-hidden viewBox="0 0 24 24" className="size-6 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:-translate-y-[180%] max-bp576:size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                  <svg aria-hidden viewBox="0 0 24 24" className="absolute size-6 translate-y-[180%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-y-0 max-bp576:size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                <span className="min-w-0 text-left">
                  <span className="block font-display font-bold transition-colors duration-(--duration-base) group-hover/tile:text-ink">{p.label}</span>
                  <span className="block text-small text-white/75 transition-colors duration-(--duration-base) group-hover/tile:text-muted max-bp576:hidden">{p.sub}</span>
                </span>
                <span
                  aria-hidden
                  className="relative ml-auto grid size-9 shrink-0 place-items-center overflow-hidden rounded-[10px] transition-colors duration-(--duration-base) group-hover/tile:bg-brand-600 max-bp576:hidden"
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
          ))}
        </ul>
      </nav>
    </section>
  );
}
