import { PageMain } from "@/components/layout/page-main";
import { JsonLd } from "@/components/seo/json-ld";
import { Audiences } from "@/components/sections/home/audiences";
import { ChannelMarquee } from "@/components/sections/home/channel-marquee";
import { Comparison } from "@/components/sections/home/comparison";
import { Control } from "@/components/sections/home/control";
import { FinalCta } from "@/components/sections/home/final-cta";
import { Hero } from "@/components/sections/home/hero";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { Faq } from "@/components/sections/home/faq";
import { Integrations } from "@/components/sections/home/integrations";
import { Leaks } from "@/components/sections/home/leaks";
import { Operators } from "@/components/sections/home/operators";
import { ProofStage } from "@/components/sections/home/proof-stage";
import { WhatIsAptli } from "@/components/sections/home/what-is-aptli";
import { faqSchema, softwareSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { faqs } from "@/content/home";

export const metadata = pageMetadata({
  title: "Hotel revenue reconciliation that acts | Aptli",
  description:
    "Aptli checks every OTA commission, virtual card and CLC payment against your PMS daily, proves what your hotel is owed, then acts with your approval.",
  path: "/",
  absoluteTitle: true,
});

/**
 * Homepage. Section order follows the brief's blueprint:
 * hero → channel ribbon → ledger showcase → what is Aptli → where money leaks → Reconcile/Prove/Act → control + verified cash →
 * comparison → audiences → built by operators → integrations → FAQ → closing CTA.
 */
export default function Home() {
  return (
    <PageMain>
      <JsonLd data={[softwareSchema(), faqSchema(faqs)]} />
      <Hero />
      <ChannelMarquee />
      <ProofStage />
      <WhatIsAptli />
      <Leaks />
      <HowItWorks />
      <Control />
      <Comparison />
      <Audiences />
      <Operators />
      <Integrations />
      <Faq />
      <FinalCta />
    </PageMain>
  );
}
