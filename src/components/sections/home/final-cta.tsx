import { CtaBand } from "@/components/sections/shared/cta-band";
import { site } from "@/lib/site";

/** Home closing CTA (shared CtaBand design, home content). */
export function FinalCta() {
  return (
    <CtaBand
      kicker="Free leakage review"
      title={
        <>
          See what your hotel is owed, <em className="accent">before</em> you decide anything
        </>
      }
      points={[
        { t: "Tell us about your hotel", d: "Name, work email, phone, properties and PMS." },
        { t: "Book a short call", d: "We confirm what to check and answer your questions." },
        { t: "Share read access", d: "One property, read-only, with your written consent." },
        { t: "Walk through every finding", d: "Each with its OTA and PMS evidence, before you decide." },
      ]}
      primary={site.primaryCta}
      secondary={{ label: "Talk to us about your portfolio", href: "/contact/" }}
    />
  );
}
