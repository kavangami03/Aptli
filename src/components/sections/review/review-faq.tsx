import accessImg from "@/assets/images/home/faq-approve-tablet.jpg";
import cardImg from "@/assets/images/home/faq-booking-online.jpg";
import securityImg from "@/assets/images/home/faq-card-security.jpg";
import pmsImg from "@/assets/images/home/faq-front-desk.jpg";
import freeImg from "@/assets/images/home/faq-received-cash.jpg";
import coverImg from "@/assets/images/home/faq-report-stack.jpg";
import { FaqRead } from "@/components/sections/shared/faq-read";
import { reviewFaqs } from "@/content/review";

/**
 * Review page FAQ: the same FaqRead design as the home page, with the review questions.
 * Photos come from the home FAQ set (none of them appear elsewhere on this page).
 */
export function ReviewFaq() {
  return (
    <FaqRead
      kicker="Questions"
      title={
        <>
          What owners ask before the <em className="accent">free review</em>
        </>
      }
      intro="Six plain answers. Anything else, ask us on the call."
      items={reviewFaqs}
      images={[coverImg, freeImg, securityImg, cardImg, pmsImg, accessImg]}
      cta={{ label: "Get my free leakage review", href: "#review-form" }}
    />
  );
}
