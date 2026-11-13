import { CtaBand } from "@/components/sections/shared/cta-band";
import { site } from "@/lib/site";

/** Review page closing CTA (shared CtaBand design; points reassure, the button returns to the form). */
export function ReviewCta() {
  return (
    <CtaBand
      kicker="Ready when you are"
      title={
        <>
          Ready to see your <em className="accent">own numbers?</em>
        </>
      }
      points={[
        { t: "No cost, no obligation", d: "You see every finding before you decide anything." },
        { t: "Read-only, one property", d: "Nothing in your PMS or OTA settings changes." },
        { t: "Last four digits only", d: "We never store or ask for full card numbers." },
        { t: "The findings are yours", d: "Keep them, whether or not you go ahead with Aptli." },
      ]}
      primary={{ label: "Get my free leakage review", href: "#review-form" }}
      secondary={site.secondaryCta}
    />
  );
}
