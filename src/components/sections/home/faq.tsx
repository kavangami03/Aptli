import approveImg from "@/assets/images/home/faq-approve-tablet.jpg";
import channelsImg from "@/assets/images/home/faq-booking-online.jpg";
import securityImg from "@/assets/images/home/faq-card-security.jpg";
import pmsImg from "@/assets/images/home/faq-front-desk.jpg";
import receivedImg from "@/assets/images/home/faq-received-cash.jpg";
import reportImg from "@/assets/images/home/faq-report-stack.jpg";
import reviewImg from "@/assets/images/home/faq-review-call.jpg";
import aptliImg from "@/assets/images/home/faq-what-is-aptli.jpg";
import { FaqRead } from "@/components/sections/shared/faq-read";
import { site } from "@/lib/site";
import { faqs } from "@/content/home";

/** Home FAQ (shared FaqRead design). One photo per question, same order as `faqs`, none repeated on the page. */
export function Faq() {
  return (
    <FaqRead
      kicker="Questions"
      title={
        <>
          What owners and GMs <em className="accent">ask first</em>
        </>
      }
      intro="Eight plain answers. Scroll through them in order, it takes about two minutes."
      items={faqs}
      images={[aptliImg, reportImg, channelsImg, approveImg, securityImg, pmsImg, reviewImg, receivedImg]}
      cta={site.primaryCta}
    />
  );
}
