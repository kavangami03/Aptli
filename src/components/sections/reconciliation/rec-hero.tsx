import heroImg from "@/assets/images/reconciliation/recon-hero-checking.jpg";
import type { HeroPath } from "@/components/sections/shared/hero-tiles";
import { PageHero } from "@/components/sections/shared/page-hero";
import { channels } from "@/content/reconciliation";
import { site } from "@/lib/site";

const icons: Record<(typeof channels)[number]["key"], React.ReactNode> = {
  ota: <path d="M4 7h16M4 12h10M4 17h6M17 14l3 3-3 3" />,
  vcc: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  clc: <path d="M3 14l7-2 8-7a2 2 0 013 3l-7 8-2 7-2-5-5-2z" />,
};

const subs: Record<(typeof channels)[number]["key"], string> = {
  ota: "Commission on stays that changed",
  vcc: "Cards charged on time, in full",
  clc: "Crew stays and payments matched",
};

/** Quick paths: one tile per channel, down to its solution page. */
const paths: HeroPath[] = channels.map((c) => ({ label: c.name, sub: subs[c.key], href: c.href, icon: icons[c.key] }));

/** Reconciliation hero: the shared photo hero (same as home) with this page's keyword H1. */
export function RecHero() {
  return (
    <PageHero
      image={heroImg}
      imagePosition="object-[50%_40%]"
      kicker="Reconcile, step one of three"
      title={
        <>
          OTA reconciliation for hotels, <em className="accent hero-accent">checked every day</em>
        </>
      }
      lead="Aptli matches every Expedia, Booking.com and Hotels.com booking, every virtual card and every CLC payment against your PMS each day, then shows you exactly where the records disagree."
      primary={site.primaryCta}
      secondary={{ label: "See what each channel checks", href: "#channels" }}
      paths={paths}
      pathsLabel="Reconcile a channel"
    />
  );
}
