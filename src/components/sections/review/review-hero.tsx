import heroImg from "@/assets/images/review/review-hero-reception.jpg";
import type { HeroPath } from "@/components/sections/shared/hero-tiles";
import { PageHero } from "@/components/sections/shared/page-hero";
import { SectionIntro } from "@/components/ui/section-intro";
import { reviewPromises } from "@/content/review";
import { LeakageReviewForm } from "./review-form";

/** Quick paths down this page (the form first). */
const paths: HeroPath[] = [
  {
    label: "Book your review",
    sub: "Six short fields",
    href: "#review-form",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2.5" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </>
    ),
  },
  {
    label: "What you get",
    sub: "Every finding, with proof",
    href: "#what-you-get",
    icon: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  },
  {
    label: "How it works",
    sub: "Four steps, one call",
    href: "#how-it-works",
    icon: <path d="M4 7h16M4 12h10M4 17h6M17 14l3 3-3 3" />,
  },
  {
    label: "Questions",
    sub: "Plain answers",
    href: "#faq",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.6 9.5a2.5 2.5 0 014.8 1c0 1.7-2.4 2-2.4 3.5M12 17h.01" />
      </>
    ),
  },
];

/** Review hero: the shared photo hero (same as every page). The form sits in the section right below. */
export function ReviewHero() {
  return (
    <PageHero
      image={heroImg}
      imagePosition="object-[50%_45%]"
      kicker="Free, one property, no obligation"
      title={
        <>
          Get a free revenue leakage review <em className="accent hero-accent">for your hotel</em>
        </>
      }
      lead="We check one property's OTA commissions, virtual cards and CLC payments against your PMS, then show you every finding with the proof."
      primary={{ label: "Book my free review", href: "#review-form" }}
      secondary={{ label: "See what you get", href: "#what-you-get" }}
      paths={paths}
      pathsLabel="On this page"
    />
  );
}

/**
 * The form section (the conversion point, straight after the hero): centred intro, the three
 * promises and the form card. z-10: an open dropdown in the form must layer above the next
 * section, not slide behind it.
 */
export function ReviewBook() {
  return (
    <section
      id="review-form"
      className="relative isolate z-10 scroll-mt-[var(--spacing-header)] overflow-x-clip bg-paper-2 py-section-y-sm [background-image:linear-gradient(to_bottom,rgb(20_20_19/0.05)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.05)_1px,transparent_1px)] [background-size:56px_56px]"
    >
      <div className="container-site">
        <SectionIntro
          align="center"
          kicker="Book in two minutes"
          title={
            <>
              Book your free <em className="accent">leakage review</em>
            </>
          }
          answer="Six short fields. We reply to set up one short call."
        />
        <ul className="mx-auto mt-stack-md flex max-w-[56rem] flex-wrap justify-center gap-x-6 gap-y-3">
          {reviewPromises.map((p) => (
            <li key={p} data-reveal className="flex items-center gap-2.5 font-display font-semibold">
              <span aria-hidden className="grid size-7 shrink-0 place-items-center rounded-[8px] bg-brand-600 text-white">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-7" />
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>

        {/* The form card */}
        <div data-reveal="card" className="mx-auto mt-stack-lg max-w-[46rem] rounded-[28px] bg-surface p-stack-lg text-ink shadow-lg ring-1 ring-line max-bp576:p-stack-md">
          <h3 className="text-h4">Your details</h3>
          <p className="mt-1.5 mb-stack-md text-small text-muted">No card details, no passwords.</p>
          <LeakageReviewForm />
        </div>
      </div>
    </section>
  );
}
