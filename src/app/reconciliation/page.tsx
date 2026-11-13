import { PageMain } from "@/components/layout/page-main";
import { RecCadence } from "@/components/sections/reconciliation/rec-cadence";
import { RecChannels } from "@/components/sections/reconciliation/rec-channels";
import { RecCta } from "@/components/sections/reconciliation/rec-cta";
import { RecFaq } from "@/components/sections/reconciliation/rec-faq";
import { RecFlow } from "@/components/sections/reconciliation/rec-flow";
import { RecHero } from "@/components/sections/reconciliation/rec-hero";
import { RecMatch } from "@/components/sections/reconciliation/rec-match";
import { RecNext } from "@/components/sections/reconciliation/rec-next";
import { RecWhat } from "@/components/sections/reconciliation/rec-what";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema, softwareSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { recFaqs } from "@/content/reconciliation";

const path = "/reconciliation/";
const title = "OTA reconciliation for hotels, checked daily";
const description =
  "Aptli matches every OTA booking, virtual card and CLC payment against your PMS each day and shows where the records disagree, with proof.";

export const metadata = pageMetadata({ title, description, path });

/** Reconciliation hub (Reconcile, step one). Parent of the OTA commission, virtual card and CLC pages. */
export default function ReconciliationPage() {
  return (
    <PageMain>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Reconciliation", path }]),
          serviceSchema({ name: "OTA reconciliation for hotels", description, path }),
          softwareSchema(),
          faqSchema(recFaqs),
        ]}
      />
      <RecHero />
      <RecWhat />
      <RecFlow />
      <RecChannels />
      <RecMatch />
      <RecCadence />
      <RecNext />
      <RecFaq />
      <RecCta />
    </PageMain>
  );
}
