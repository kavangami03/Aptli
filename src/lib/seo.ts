import type { Metadata } from "next";
import { site } from "./site";

type PageSeo = {
  /** ≤ 60 characters. Primary keyword first. "| Aptli" is added by the template. */
  title: string;
  /** ≤ 155 characters. Answers the searcher's question in plain words. */
  description: string;
  /** Route path with trailing slash, e.g. "/reconciliation/". */
  path: string;
  /** Optional 1200×630 image path. Defaults to the site OG image. */
  image?: string;
  noindex?: boolean;
  /** Use for the homepage so the title is not templated. */
  absoluteTitle?: boolean;
};

export const absoluteUrl = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Build page metadata. Every page.tsx exports `metadata = pageMetadata({...})`.
 * Dev warnings flag titles/descriptions that break the brief's length rules.
 */
export function pageMetadata({ title, description, path, image, noindex, absoluteTitle }: PageSeo): Metadata {
  if (process.env.NODE_ENV !== "production") {
    const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
    if (fullTitle.length > 60) console.warn(`[seo] Title over 60 chars (${fullTitle.length}) on ${path}: ${fullTitle}`);
    if (description.length > 155)
      console.warn(`[seo] Description over 155 chars (${description.length}) on ${path}`);
  }

  const url = absoluteUrl(path);
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
