import type {
  BreadcrumbList,
  FAQPage,
  Organization,
  Service,
  SoftwareApplication,
  WebSite,
  WithContext,
} from "schema-dts";
import { absoluteUrl } from "./seo";
import { site } from "./site";

/**
 * JSON-LD builders. Render with <JsonLd data={...} />.
 * Brief schema map:
 *   Organization + WebSite → sitewide (root layout)
 *   SoftwareApplication    → homepage + service pages
 *   Service                → each service and solution page
 *   FAQPage                → every page with an FAQ (text must match visible FAQ word for word)
 *   BreadcrumbList         → every page below the homepage
 */

const orgId = `${site.url}/#organization`;

export const organizationSchema = (): WithContext<Organization> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: absoluteUrl(site.logo),
  slogan: site.tagline,
  description: site.entity,
  ...(site.social.linkedin ? { sameAs: [site.social.linkedin] } : {}),
});

export const websiteSchema = (): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en-US",
  publisher: { "@id": orgId },
});

export const softwareSchema = (): WithContext<SoftwareApplication> => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Hotel revenue assurance",
  operatingSystem: "Web",
  description: site.entity,
  url: site.url,
  publisher: { "@id": orgId },
});

export const serviceSchema = (opts: { name: string; description: string; path: string }): WithContext<Service> => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: opts.name,
  description: opts.description,
  url: absoluteUrl(opts.path),
  provider: { "@id": orgId },
  areaServed: { "@type": "Country", name: "United States" },
  audience: { "@type": "BusinessAudience", audienceType: "Hotel owners, management companies, GMs and controllers" },
});

export const faqSchema = (items: { question: string; answer: string }[]): WithContext<FAQPage> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.question,
    acceptedAnswer: { "@type": "Answer", text: i.answer },
  })),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});
