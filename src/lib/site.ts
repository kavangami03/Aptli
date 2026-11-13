/**
 * Single source of truth for brand facts, navigation and URLs.
 * Every page, schema block, llms.txt and sitemap reads from here, so the
 * entity sentence and names stay word-for-word identical everywhere (GEO rule).
 */

export const site = {
  name: "Aptli",
  legalName: "Aptli",
  tagline: "Always ahead",
  /** Confirm domain (open decision #1 in the brief). Override with NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aptli.ai").replace(/\/$/, ""),
  locale: "en_US",
  /** The entity sentence. Use it verbatim on the homepage, About, schema, LinkedIn, directories. */
  entity:
    "Aptli is a revenue assurance platform for hotels that reconciles OTA commissions, OTA virtual cards and CLC direct-bill payments against the PMS, proves each discrepancy with evidence, and performs the recovery action with the hotel's approval.",
  description:
    "Aptli checks every OTA commission, virtual card and CLC payment against your PMS each day, shows exactly what your hotel is owed, then files the dispute, charges the card or posts the payment, with your approval.",
  primaryCta: { label: "Get a free leakage review", href: "/contact/" },
  secondaryCta: { label: "See how it works", href: "/#how-it-works" },
  logo: "/brand/aptli-logo-dark.png",
  logoOnDark: "/brand/aptli-logo-light.png",
  /** Static date of the last content update, used by sitemap (no new Date() at render). */
  lastUpdated: "2026-11-13",
  social: {
    linkedin: "" as string,
  },
} as const;

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

/** Header navigation (brief: services are the main nav, solutions sit under Reconciliation). */
export const mainNav: NavItem[] = [
  {
    label: "Reconciliation",
    href: "/reconciliation/",
    children: [
      {
        label: "OTA commission reconciliation",
        href: "/reconciliation/ota-commission/",
        description: "Get commission back on cancellations, no-shows and early departures.",
      },
      {
        label: "Virtual card reconciliation",
        href: "/reconciliation/virtual-card/",
        description: "Charge every eligible OTA virtual card at the right time.",
      },
      {
        label: "CLC direct-bill reconciliation",
        href: "/reconciliation/clc-direct-bill/",
        description: "Sync crew stays and match CLC payments to open invoices.",
      },
    ],
  },
  { label: "Finance Truth Engine", href: "/finance-truth-engine/" },
  { label: "Automation", href: "/automation/" },
  { label: "Integrations", href: "/integrations/" },
  { label: "Resources", href: "/resources/" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Reconciliation", href: "/reconciliation/" },
      { label: "Finance Truth Engine", href: "/finance-truth-engine/" },
      { label: "Automation Action", href: "/automation/" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "OTA commission", href: "/reconciliation/ota-commission/" },
      { label: "Virtual card", href: "/reconciliation/virtual-card/" },
      { label: "CLC direct-bill", href: "/reconciliation/clc-direct-bill/" },
    ],
  },
  {
    title: "Who we serve",
    links: [
      { label: "Management companies", href: "/management-companies/" },
      { label: "Integrations", href: "/integrations/" },
      { label: "Security", href: "/security/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Resources", href: "/resources/" },
      { label: "Glossary", href: "/glossary/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

/** The 14 launch pages (brief sitemap). Sitemap.ts reads this. Add a route here when it ships. */
export const launchPages: { path: string; priority: number; live: boolean }[] = [
  { path: "/", priority: 1, live: true },
  { path: "/reconciliation/", priority: 0.9, live: false },
  { path: "/finance-truth-engine/", priority: 0.9, live: false },
  { path: "/automation/", priority: 0.9, live: false },
  { path: "/reconciliation/ota-commission/", priority: 0.8, live: false },
  { path: "/reconciliation/virtual-card/", priority: 0.8, live: false },
  { path: "/reconciliation/clc-direct-bill/", priority: 0.8, live: false },
  { path: "/management-companies/", priority: 0.7, live: false },
  { path: "/integrations/", priority: 0.7, live: false },
  { path: "/security/", priority: 0.6, live: false },
  { path: "/resources/", priority: 0.6, live: false },
  { path: "/glossary/", priority: 0.6, live: false },
  { path: "/about/", priority: 0.5, live: false },
  { path: "/contact/", priority: 0.8, live: true },
];

export const trademarkLine =
  "Expedia, Booking.com, Hotels.com, CLC, Corpay and CheckINN are trademarks of their respective owners.";
