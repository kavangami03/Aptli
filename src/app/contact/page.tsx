import { PageMain } from "@/components/layout/page-main";
import { ReviewCta } from "@/components/sections/review/review-cta";
import { ReviewDeliverables } from "@/components/sections/review/review-deliverables";
import { ReviewFaq } from "@/components/sections/review/review-faq";
import { ReviewBook, ReviewHero } from "@/components/sections/review/review-hero";
import { ReviewSteps } from "@/components/sections/review/review-steps";
import { ReviewTrust } from "@/components/sections/review/review-trust";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { reviewFaqs } from "@/content/review";

const title = "Free hotel revenue leakage review";
const description =
  "Get a free revenue leakage review for one hotel. We check OTA commissions, virtual cards and CLC payments against your PMS and show you the proof.";

export const metadata = pageMetadata({ title, description, path: "/contact/" });

/** Free leakage review: the site's primary conversion page (every "Get a free leakage review" CTA lands here). */
export default function ContactPage() {
  return (
    <PageMain>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Free leakage review", path: "/contact/" }]),
          serviceSchema({ name: title, description, path: "/contact/" }),
          faqSchema(reviewFaqs),
        ]}
      />
      <ReviewHero />
      <ReviewBook />
      <ReviewDeliverables />
      <ReviewSteps />
      <ReviewTrust />
      <ReviewFaq />
      <ReviewCta />
    </PageMain>
  );
}
