import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { FooterTiles } from "./footer-tiles";
import { footerNav, site, trademarkLine } from "@/lib/site";

const year = site.lastUpdated.slice(0, 4); // static: no new Date() under Cache Components


/**
 * Footer (SFS-inspired): three photo action tiles (page-aware, see FooterTiles), the link columns,
 * and the legal bar with the studio credit.
 */
export function SiteFooter() {
  return (
    <footer className="on-ink relative overflow-x-clip bg-ink text-paper">
      {/* Action tiles */}
      <div className="container-site pt-section-y-sm">
        <FooterTiles />
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
