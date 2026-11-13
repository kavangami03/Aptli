import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import tileGuides from "@/assets/images/home/footer-guides-reading.jpg";
import tilePortfolio from "@/assets/images/home/footer-portfolio-hotels.jpg";
import tileReview from "@/assets/images/home/footer-review-call.jpg";
import { Logo } from "@/components/ui/logo";
import { footerNav, site, trademarkLine } from "@/lib/site";

const year = site.lastUpdated.slice(0, 4); // static: no new Date() under Cache Components

const tiles: { n: string; label: string; href: string; image: StaticImageData; alt: string }[] = [
  { n: "01", label: "Get a free leakage review", href: site.primaryCta.href, image: tileReview, alt: "A team walking through findings on a video call" },
  { n: "02", label: "Talk to us about your portfolio", href: "/contact/", image: tilePortfolio, alt: "A street of city hotels side by side" },
  { n: "03", label: "Read the guides", href: "/resources/", image: tileGuides, alt: "Someone reading a printed guide with a coffee" },
];

/**
 * Footer (SFS-inspired): three photo action tiles with red label bars, the link columns,
 * and the legal bar with the studio credit.
 */
export function SiteFooter() {
  return (
    <footer className="on-ink relative overflow-x-clip bg-ink text-paper">
      {/* Action tiles */}
      <div className="container-site pt-section-y-sm">
        <ul className="grid grid-cols-3 gap-grid-gap max-bp992:grid-cols-1">
          {tiles.map((t) => (
            <li key={t.n} data-reveal="card">
              {/* isolate + transform-gpu: the clipped rounded corners stay on their own layer, so the photo
                  zoom no longer flickers. Zoom is slow and small; brightening has its own gentler timing. */}
              <Link
                href={t.href}
                className="group/tile relative isolate block aspect-[16/10] transform-gpu overflow-hidden rounded-[22px] bg-ink-2 [backface-visibility:hidden] max-bp992:aspect-[16/7] max-bp576:aspect-[16/9]"
              >
                <Image
                  src={t.image}
                  alt={t.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 991px) 100vw, 34vw"
                  className="transform-gpu object-cover opacity-80 transition-[scale,opacity] [transition-duration:1.8s,0.8s] ease-(--ease-out) [backface-visibility:hidden] group-hover/tile:scale-[1.04] group-hover/tile:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />
                {/* Same hover as <Button variant="brand"> on dark: white wipe, ink text, arrow swaps in a red box */}
                <span className="absolute right-4 bottom-4 left-4 isolate flex items-center gap-3 overflow-hidden rounded-[var(--radius-btn)] bg-brand-600 py-2 pr-2 pl-4 font-display font-bold text-white">
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:scale-x-100"
                  />
                  <span className="num text-small text-white/70 transition-colors duration-(--duration-base) group-hover/tile:text-brand-700">{t.n}</span>
                  <span className="flex-1 transition-colors duration-(--duration-base) group-hover/tile:text-ink">{t.label}</span>
                  <span
                    aria-hidden
                    className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-white text-brand-600 transition-colors duration-(--duration-base) group-hover/tile:bg-brand-600 group-hover/tile:text-white"
                  >
                    <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-x-[180%]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                    <svg viewBox="0 0 16 16" className="absolute size-4 -translate-x-[180%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-x-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Brand + links */}
      <div className="container-site grid grid-cols-[minmax(0,1.3fr)_repeat(4,minmax(0,1fr))] gap-grid-gap py-stack-xl max-bp1200:grid-cols-4 max-bp768:grid-cols-2">
        <div data-reveal className="max-bp1200:col-span-4 max-bp768:col-span-2">
          <Logo tone="light" />
          <p className="mt-5 max-w-[30ch] text-small text-paper/65">
            Revenue assurance for hotels. Every OTA commission, virtual card and CLC payment, checked against your PMS
            every day.
          </p>
        </div>
        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title} data-reveal>
            <h2 className="font-display text-small font-bold text-paper">{group.title}</h2>
            <ul className="mt-4 grid gap-1">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group/fl inline-flex min-h-9 items-center text-small text-paper/65 transition-colors hover:text-paper max-bp1200:min-h-11 max-bp1200:min-w-11"
                  >
                    <span aria-hidden className="h-px w-0 bg-brand-500 transition-[width,margin] duration-(--duration-base) group-hover/fl:mr-2 group-hover/fl:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Legal bar: copyright left, studio credit right; trademark fine print on its own line below */}
      <div className="container-site border-t border-white/10 py-6 text-caption text-paper/55">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://www.softqubes.com"
              target="_blank"
              rel="noopener"
              className="font-display font-bold text-paper underline decoration-brand-500 underline-offset-4 transition-colors hover:text-brand-300"
            >
              Softqubes Technologies LLC
            </a>
          </p>
        </div>
        <p className="mt-4 border-t border-white/5 pt-4 text-center text-paper/40">{trademarkLine}</p>
      </div>
    </footer>
  );
}
