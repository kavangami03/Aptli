import approveImg from "@/assets/images/home/faq-approve-tablet.jpg";
import bookingImg from "@/assets/images/home/faq-booking-online.jpg";
import frontDeskImg from "@/assets/images/home/faq-front-desk.jpg";
import reportImg from "@/assets/images/home/faq-report-stack.jpg";
import callImg from "@/assets/images/home/faq-review-call.jpg";
import pmsImg from "@/assets/images/home/faq-what-is-aptli.jpg";
import portfolioImg from "@/assets/images/home/who-management-company.jpg";
import { FaqRead } from "@/components/sections/shared/faq-read";
import { recFaqs } from "@/content/reconciliation";
import { site } from "@/lib/site";

/**
 * Reconciliation FAQ: the shared FaqRead design with this page's questions. One photo per question,
 * none used elsewhere on this page (or in its footer tiles).
 */
export function RecFaq() {
  return (
    <FaqRead
      kicker="Questions"
      title={
        <>
          What hotels ask about <em className="accent">OTA reconciliation</em>
        </>
      }
      intro="Seven plain answers. Anything else, ask us on the call."
      items={recFaqs}
      images={[reportImg, bookingImg, frontDeskImg, approveImg, pmsImg, callImg, portfolioImg]}
      cta={site.primaryCta}
    />
  );
}
