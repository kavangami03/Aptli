import { CtaBand } from "@/components/sections/shared/cta-band";
import { site } from "@/lib/site";

/** Reconciliation closing CTA (shared CtaBand design, this page's reassurance points). */
export function RecCta() {
  return (
    <CtaBand
      kicker="See it on your own data"
      title={
        <>
          What is your hotel <em className="accent">owed today?</em>
        </>
      }
      points={[
        { t: "OTA, cards and CLC together", d: "One check across every channel, not three reports." },
        { t: "Proof with every finding", d: "The OTA and PMS records, side by side." },
        { t: "Read-only to start", d: "Nothing in your PMS changes during reconciliation." },
        { t: "You approve what moves", d: "Fuzzy matches and your rules wait for a person." },
      ]}
      primary={site.primaryCta}
      secondary={site.secondaryCta}
    />
  );
}
