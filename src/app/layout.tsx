import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Preloader } from "@/components/layout/preloader";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Providers } from "@/components/providers/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

/** Headings + UI: Plus Jakarta Sans (geometric, echoes the APTLI wordmark). */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: "variable",
});

/** Body copy: Inter. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: "variable",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Hotel revenue reconciliation that acts | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Hospitality software",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/** Next adds width=device-width, initial-scale=1. Never disable zoom. */
export const viewport: Viewport = {
  themeColor: "#fafaf7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <Preloader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
