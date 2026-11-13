import Image from "next/image";
import evidenceImg from "@/assets/images/review/review-evidence.jpg";
import frontDeskImg from "@/assets/images/review/review-front-desk.jpg";
import walkthroughImg from "@/assets/images/review/review-walkthrough.jpg";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { deliverables } from "@/content/review";

const [proof, call, amounts, team] = deliverables;
const num = (n: number) => (
  <span className="num font-display text-small font-bold text-brand-600">{String(n).padStart(2, "0")}</span>
);

/** Example channel bars (illustrative, labelled "Example"; widths only, no figures). */
const bars = [
  { label: "OTA commission", w: "w-[78%]" },
  { label: "Virtual cards", w: "w-[54%]" },
  { label: "CLC direct bill", w: "w-[36%]" },
];

/**
 * What you get, as a bento grid: a wide "proof" card (photo + example evidence slip), a tall photo
 * card for the walkthrough, a dark "amounts by channel" card whose bars draw in, and a photo card for
 * "nothing changes". Photos stay clean (words sit beside or below them).
 */
export function ReviewDeliverables() {
  return (
    <Section tone="paper">
      <SectionIntro
        align="center"
        kicker="What you get"
        title={
          <>
            What do you get from the <em className="accent">free review?</em>
          </>
        }
        answer="Four things, all yours to keep, whether or not you go ahead with Aptli."
      />

      <div className="mt-stack-xl grid grid-cols-3 gap-grid-gap max-bp1200:grid-cols-2 max-bp768:grid-cols-1">
        {/* 01 Proof: wide */}
        <article data-reveal="card" className="col-span-2 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] overflow-hidden rounded-[26px] bg-surface shadow-sm ring-1 ring-line max-bp768:col-span-1 max-bp768:grid-cols-1">
          <div className="relative min-h-[18rem] bg-paper-3 max-bp768:aspect-[16/10] max-bp768:min-h-0">
            <Image src={evidenceImg} alt="A person highlighting the key lines of a printed report" fill placeholder="blur" sizes="(max-width: 767px) 100vw, 30vw" className="object-cover object-[50%_40%]" />
          </div>
          <div className="flex min-w-0 flex-col p-stack-md">
            {num(1)}
            <h3 className="mt-2 text-h4">{proof.title}</h3>
            <p className="mt-2 text-muted">{proof.body}</p>
            <div className="mt-auto pt-stack-md">
              <div className="rounded-[16px] bg-paper-2 p-4 ring-1 ring-line max-bp390:p-3">
                <p className="text-caption text-subtle">Example finding · Booking.com</p>
                <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 max-bp390:gap-1.5">
                  <p className="rounded-[10px] bg-surface px-3 py-2 max-bp390:px-2">
                    <span className="block text-caption text-subtle">OTA says</span>
                    <span className="relative isolate inline-block font-display font-bold">
                      <span aria-hidden className="hl-bar" />
                      Stayed
                    </span>
                  </p>
                  <span className="grid size-8 place-items-center rounded-[9px] bg-ink font-display font-bold text-paper max-bp390:size-7">
                    <span aria-hidden>≠</span>
                    <span className="sr-only">does not match</span>
                  </span>
                  <p className="rounded-[10px] bg-surface px-3 py-2 max-bp390:px-2">
                    <span className="block text-caption text-subtle">PMS says</span>
                    <span className="block font-display font-bold">Cancelled</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* 02 Walkthrough: tall */}
        <article data-reveal="card" className="row-span-2 flex flex-col overflow-hidden rounded-[26px] bg-surface shadow-sm ring-1 ring-line max-bp1200:row-span-1">
          <div className="relative min-h-[20rem] flex-1 bg-paper-3 max-bp1200:aspect-[16/10] max-bp1200:min-h-0 max-bp1200:flex-none">
            <Image src={walkthroughImg} alt="A manager on a video call going through findings on her laptop" fill placeholder="blur" sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" className="object-cover object-[60%_40%]" />
          </div>
          <div className="p-stack-md">
            {num(2)}
            <h3 className="mt-2 text-h4">{call.title}</h3>
            <p className="mt-2 text-muted">{call.body}</p>
          </div>
        </article>

        {/* 03 Amounts: dark, bars draw in */}
        <article data-reveal="card" className="flex flex-col rounded-[26px] bg-ink p-stack-md text-paper shadow-lg">
          <span className="num font-display text-small font-bold text-brand-400">03</span>
          <h3 className="mt-2 text-h4 text-paper">{amounts.title}</h3>
          <p className="mt-2 text-paper/70">{amounts.body}</p>
          <div className="mt-auto pt-stack-md">
            <p className="text-caption text-paper/50">Example</p>
            <ul className="mt-2 grid gap-3">
              {bars.map((b) => (
                <li key={b.label}>
                  <span className="block text-small font-medium text-paper/85">{b.label}</span>
                  <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-white/10">
                    <span data-reveal="line" className={`block h-full origin-left rounded-full bg-brand-500 ${b.w}`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* 04 Nothing changes: photo card */}
        <article data-reveal="card" className="flex flex-col overflow-hidden rounded-[26px] bg-surface shadow-sm ring-1 ring-line">
          <div className="relative aspect-[16/9] bg-paper-3">
            <Image src={frontDeskImg} alt="A front desk agent smiling behind a hotel reception desk" fill placeholder="blur" sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" className="object-cover object-[50%_35%]" />
          </div>
          <div className="p-stack-md">
            {num(4)}
            <h3 className="mt-2 text-h4">{team.title}</h3>
            <p className="mt-2 text-muted">{team.body}</p>
          </div>
        </article>
      </div>
    </Section>
  );
}
