"use client";

import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { mainNav, site } from "@/lib/site";

/**
 * Sticky header.
 * - Transparent over the hero, then soft-white glass after 24px of scroll.
 * - Slides away on scroll down, back on scroll up (transform only).
 * - Desktop (≥1200): inline nav + Reconciliation dropdown. Touch widths: full-screen menu.
 */
const DARK_HERO_ROUTES = ["/", "/contact/", "/reconciliation/"];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const lastY = useRef(0);
  // Pages whose hero is a dark photo: header text is light until the user scrolls.
  const overDark = !scrolled && !menuOpen && DARK_HERO_ROUTES.includes(pathname);

  // Hide on scroll down / show on scroll up, with a 12px direction threshold so the small
  // per-frame deltas of Lenis smooth scrolling can never toggle it back and forth (flicker).
  useEffect(() => {
    let raf = 0;
    let anchor = window.scrollY; // where the current direction started
    let lastDir = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const dir = Math.sign(y - lastY.current);
        if (dir !== 0 && dir !== lastDir) {
          anchor = lastY.current;
          lastDir = dir;
        }
        lastY.current = y;
        setScrolled((prev) => (prev === y > 24 ? prev : y > 24));
        if (y < 160) return setHidden((h) => (h ? false : h));
        if (Math.abs(y - anchor) < 12) return;
        const shouldHide = dir > 0;
        setHidden((h) => (h === shouldHide ? h : shouldHide));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Transient UI resets when the route is hidden by <Activity> or changes.
  useLayoutEffect(() => {
    return () => {
      setMenuOpen(false);
      setDropdown(false);
    };
  }, [pathname]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (setMenuOpen(false), setDropdown(false));
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transform-gpu transition-transform duration-500 ease-(--ease-out)",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        {/* Background on its own layer: only its opacity animates (no blur, no colour repaint). */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 -z-10 bg-paper/95 shadow-[0_1px_0_var(--color-line),0_8px_24px_-12px_rgb(20_20_19/0.12)] transition-opacity duration-300",
            scrolled || menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-site flex h-header items-center justify-between gap-6">
          {/* Both logos are always loaded; we crossfade instead of swapping the image (no flash). */}
          <Link href="/" aria-label="Aptli home" className="relative inline-flex min-h-11 items-center">
            <span className={cn("transition-opacity duration-300", overDark ? "opacity-0" : "opacity-100")}>
              <Logo priority tone="dark" href={null} />
            </span>
            <span aria-hidden className={cn("absolute inset-0 flex items-center transition-opacity duration-300", overDark ? "opacity-100" : "opacity-0")}>
              <Logo priority tone="light" href={null} />
            </span>
          </Link>

          <nav aria-label="Main" className="max-bp1200:hidden">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <button
                      type="button"
                      aria-expanded={dropdown}
                      aria-controls="nav-reconciliation"
                      onClick={() => setDropdown((v) => !v)}
                      className={cn("inline-flex h-11 items-center gap-1.5 rounded-[10px] px-4 font-display text-nav font-semibold transition-colors", overDark ? "text-paper hover:bg-white/10" : "text-ink hover:bg-paper-2")}
                    >
                      {item.label}
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className={cn("size-3 transition-transform duration-(--duration-base)", dropdown && "rotate-180")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                      >
                        <path d="M3 4.5l3 3 3-3" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {dropdown && (
                        <m.div
                          id="nav-reconciliation"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: duration.base, ease: ease.out }}
                          className="absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3"
                        >
                          <div className="rounded-lg bg-surface p-3 shadow-lg ring-1 ring-line">
                            <Link
                              href={item.href}
                              className="block rounded-md px-4 py-3 transition-colors hover:bg-paper"
                            >
                              <span className="font-medium">Reconciliation overview</span>
                              <span className="mt-0.5 block text-small text-muted">
                                Every OTA, virtual card and CLC record matched against your PMS, daily.
                              </span>
                            </Link>
                            <div className="my-2 h-px bg-line" />
                            {item.children.map((c) => (
                              <Link
                                key={c.href}
                                href={c.href}
                                className="group flex gap-3 rounded-md px-4 py-3 transition-colors hover:bg-paper"
                              >
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
                                <span>
                                  <span className="font-medium group-hover:text-brand-700">{c.label}</span>
                                  <span className="mt-0.5 block text-small text-muted">{c.description}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-11 items-center rounded-[10px] px-4 font-display text-nav font-semibold transition-colors",
                        overDark ? "text-paper hover:bg-white/10" : "text-ink hover:bg-paper-2",
                        !overDark && pathname === item.href && "bg-paper-2",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Over the dark hero the header has no ground, so the CTA uses its on-dark hover (wipes to white) */}
          <div className={cn("flex items-center gap-2", overDark && "on-ink")}>
            <Button href={site.primaryCta.href} variant="brand" className="max-bp576:hidden">
              {site.primaryCta.label}
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              className={cn("relative hidden size-11 items-center justify-center rounded-[12px] max-bp1200:inline-flex", overDark ? "bg-paper text-ink" : "bg-ink text-paper")}
            >
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded bg-current transition-transform duration-(--duration-base)",
                  menuOpen ? "rotate-45" : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute h-0.5 w-5 rounded bg-current transition-transform duration-(--duration-base)",
                  menuOpen ? "-rotate-45" : "translate-y-1",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper pt-header"
            data-lenis-prevent
          >
            <m.nav
              aria-label="Mobile"
              className="container-site flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {mainNav.map((item) => (
                <m.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: duration.slow, ease: ease.out }}
                  className="border-b border-line py-3"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center font-display text-h4 font-bold"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <ul className="mt-1 mb-2 grid gap-1 pl-1">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={() => setMenuOpen(false)}
                            className="flex min-h-11 items-center gap-3 text-muted"
                          >
                            <span className="size-1.5 rounded-full bg-brand-500" />
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </m.div>
              ))}
              <m.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="mt-auto pt-8"
              >
                <Button
                  href={site.primaryCta.href}
                  variant="brand"
                  size="lg"
                  arrow
                  className="w-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {site.primaryCta.label}
                </Button>
              </m.div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
