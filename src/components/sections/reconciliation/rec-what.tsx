import Image from "next/image";
import statementImg from "@/assets/images/reconciliation/recon-statement-review.jpg";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";

const flows = [
  { name: "OTA commission invoices", from: "Expedia, Booking.com and Hotels.com" },
  { name: "OTA virtual cards", from: "The cards guests prepaid through" },
  { name: "Direct-bill accounts", from: "Such as CLC crew lodging" },
];

const icons = [
  // Invoice
  <path key="a" d="M7 3h10v18l-2.5-1.5L12 21l-2.5-1.5L7 21V3zM10 8h4M10 12h4" />,
  // Card
  <>
    <rect key="b1" x="3" y="6" width="18" height="12" rx="2.5" />
    <path key="b2" d="M3 10h18M7 14.5h3" />
  </>,
  // Plane / crew
  <path key="c" d="M3 13.5l7-1.5 4.5-6.5h2l-2 6.5 5 1-1 2-5-.5-2.5 4.5h-2l.5-4.5-5.5 1z" />,
];

/**
 * What is OTA reconciliation: a clean photo (one small tag) beside the direct answer, the three money
 * flows it covers, and one line each for the owner and the GM. The answer block is the AEO definition.
 */
export function RecWhat() {
  return (
    <Section tone="paper">
      <SectionIntro
        align="center"
        kicker="The basics"
        title={
          <>
            What is <em className="accent">OTA reconciliation?</em>
          </>
        }
        answer="Checking what each channel billed or paid against what your PMS shows for the same stay."
      />

      <div className="mt-stack-xl grid grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-stretch gap-[clamp(1.5rem,0.5rem+3vw,4.5rem)] max-bp992:grid-cols-1">
        <div data-reveal="card" className="relative min-h-[32rem] overflow-hidden rounded-[28px] bg-paper-3 shadow-md max-bp992:aspect-[4/3] max-bp992:min-h-0">
          <Image
            src={statementImg}
            alt="A manager reading through a printed statement at her desk"
            fill
            placeholder="blur"
            sizes="(max-width: 991px) 100vw, 46vw"
            className="object-cover object-[50%_40%]"
          />
          <p className="absolute bottom-5 left-5 rounded-[10px] bg-surface/95 px-3 py-2 font-display text-small font-bold text-ink shadow-md">
            One stay, two records
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <p data-reveal className="max-w-measure text-lead text-ink">
            OTA reconciliation is checking what an online travel agency billed or paid against what your PMS shows for
            the same stay. For each reservation it compares the status, dates, nights, revenue, commission and payment.
            When the two records disagree, the hotel has either been overcharged or has money it has not collected yet.
          </p>
          <p data-reveal className="mt-stack-sm max-w-measure text-muted">
            For most hotels this covers three money flows. Aptli reconciles all three in one daily check, so you
            don&apos;t need a separate tool or vendor for each channel.
          </p>

          <ul className="mt-stack-md grid gap-3">
            {flows.map((f, i) => (
              <li key={f.name} data-reveal="card" className="flex items-center gap-4 rounded-[18px] bg-surface p-4 shadow-xs ring-1 ring-line">
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-paper-2 text-brand-600">
                  <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i]}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-bold">{f.name}</span>
                  <span className="block text-small text-muted">{f.from}</span>
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-stack-md grid grid-cols-2 gap-3 max-bp576:grid-cols-1">
            <div data-reveal className="rounded-[18px] bg-ink p-5 text-paper">
              <dt className="font-display text-small font-bold text-brand-400">For owners</dt>
              <dd className="mt-1.5 text-paper/85">One view of what each channel owes you.</dd>
            </div>
            <div data-reveal className="rounded-[18px] bg-paper-2 p-5 ring-1 ring-line">
              <dt className="font-display text-small font-bold text-brand-700">For GMs and controllers</dt>
              <dd className="mt-1.5 text-muted">Nothing new for the front desk. Aptli reads what is already in your systems.</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
