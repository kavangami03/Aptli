"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import tileHow from "@/assets/images/home/step-act.jpg";
import tileLeaks from "@/assets/images/home/leak-early-departure.jpg";
import tileGuides from "@/assets/images/home/footer-guides-reading.jpg";
import tilePortfolio from "@/assets/images/home/footer-portfolio-hotels.jpg";
import tileReview from "@/assets/images/home/footer-review-call.jpg";
import { site } from "@/lib/site";

type Tile = { label: string; href: string; image: StaticImageData; alt: string };

/**
 * Tile pool, in priority order. A tile is skipped when it points at the page you are on (no point
 * offering the page you are already reading), and the first three left are shown.
 * Home → review, portfolio, guides. Contact → how it works, where hotels lose money, guides.
 * The two home-anchor tiles use home photos, so they never repeat a photo on the page they show on.
 */
const pool: Tile[] = [
  { label: "Get a free leakage review", href: site.primaryCta.href, image: tileReview, alt: "A team walking through findings on a video call" },
  { label: "Talk to us about your portfolio", href: "/contact/", image: tilePortfolio, alt: "A street of city hotels side by side" },
  { label: "See how Aptli works", href: "/#how-it-works", image: tileHow, alt: "A hotel manager reviewing the day's findings on a laptop" },
  { label: "See where hotels lose money", href: "/#where-hotels-lose-money", image: tileLeaks, alt: "A guest paying at a hotel front desk" },
  { label: "Read the guides", href: "/resources/", image: tileGuides, alt: "Someone reading a printed guide with a coffee" },
];

const pathOf = (href: string) => {
  const p = href.split("#")[0] || "/";
  return p.endsWith("/") ? p : `${p}/`;
};

export function FooterTiles() {
  const pathname = usePathname() ?? "/";
  const here = pathOf(pathname);
  const tiles = pool.filter((t) => pathOf(t.href) !== here).slice(0, 3);

  return (
    <ul className="grid grid-cols-3 gap-grid-gap max-bp992:grid-cols-1">
      {tiles.map((t, i) => (
        <li key={t.label} data-reveal="card">
          {/* isolate + transform-gpu: the clipped rounded corners stay on their own layer, so the photo
              zoom never flickers. Zoom is slow and small; brightening has its own gentler timing. */}
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
              <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-white transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:scale-x-100" />
              <span className="num text-small text-white/70 transition-colors duration-(--duration-base) group-hover/tile:text-brand-700">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1 transition-colors duration-(--duration-base) group-hover/tile:text-ink">{t.label}</span>
              <span
                aria-hidden
                className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-white text-brand-600 transition-colors duration-(--duration-base) group-hover/tile:bg-brand-600 group-hover/tile:text-white"
              >
                <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-x-[180%]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
                <svg viewBox="0 0 16 16" className="absolute size-4 -translate-x-[180%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/tile:translate-x-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
