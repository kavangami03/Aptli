import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { StackCards } from "@/components/motion/stack-cards";
import { ArrowLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusChip } from "@/components/ui/status-chip";
import { leakTable, leaks } from "@/content/home";

const tabs = ["Cancelled stays", "Early departures", "Virtual cards", "CLC payments"];

/**
 * "Where do hotels lose money?": a stack of case folders (MailPilot folders + StudyMate stacking),
 * each with its own tab, a photo, a receipt-style evidence slip and an SFS red amount block.
 */
export function Leaks() {
  return (
    <Section id="where-hotels-lose-money" tone="paper-2" className="[background-image:radial-gradient(var(--color-line-strong)_1px,transparent_1px)] [background-size:22px_22px]">
      <SectionIntro
        align="split"
        kicker="Where the money goes"
        index="02"
        title={
          <>
            Where do hotels lose money between the OTA and <em className="accent">the PMS?</em>
          </>
        }
        answer="In the gaps nobody checks daily: cancelled stays still billed, virtual cards left uncharged, CLC payments never matched."
      />

      <StackCards className="mt-stack-xl">
        {leaks.map((leak, i) => (
          <article
            key={leak.title}
            data-stack-card
            className="sticky pt-12 max-bp992:relative max-bp992:top-0! max-bp992:pt-11 [&+&]:mt-stack-xl"
            style={{ top: `calc(var(--spacing-header) + 1rem + ${i * 1.1}rem)` }}
          >
            {/* Folder tab */}
            <div
              className="absolute top-0 flex h-12 items-center gap-3 rounded-t-[18px] bg-surface px-5 font-display text-small font-bold ring-1 ring-line [clip-path:inset(-2px_-2px_0_-2px)] max-bp992:h-11"
              style={{ left: `clamp(1.5rem, calc(1.5rem + ${i * 23}%), calc(100% - 16rem))` }}
            >
              <span className="num grid size-6 place-items-center rounded-[7px] bg-brand-500 text-caption text-white">{i + 1}</span>
              {tabs[i]}
            </div>

            <div data-reveal="card" className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] overflow-hidden rounded-[24px] bg-surface shadow-lg ring-1 ring-line max-bp992:grid-cols-1">
              {/* Photo side */}
              <div className="relative min-h-[30rem] overflow-hidden bg-paper-3 max-bp992:min-h-[22rem] max-bp481:min-h-[20rem]">
                <Image src={leak.image} alt={leak.alt} fill placeholder="blur" sizes="(max-width: 991px) 100vw, 48vw" className="object-cover" />
                
                {/* Red amount block */}
                <div data-reveal="pop" className="absolute top-5 right-5 rounded-[16px] bg-brand-600 px-5 py-4 text-white shadow-brand max-bp481:top-3 max-bp481:right-3 max-bp481:px-4 max-bp481:py-3">
                  <p className="text-caption text-white/80">Example amount</p>
                  <p className="font-display text-h4 font-bold">{leak.amount}</p>
                  <span aria-hidden className="absolute -bottom-3 right-8 h-4 w-7 bg-brand-600 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                </div>

              </div>

              {/* Copy side */}
              <div className="relative flex flex-col overflow-hidden p-stack-lg">
                <span aria-hidden className="num pointer-events-none absolute -top-3 -right-1 font-display text-[clamp(5rem,4rem+4vw,8.5rem)] leading-none font-bold text-transparent [-webkit-text-stroke:1.5px_var(--color-line)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="relative text-small font-semibold text-brand-700">Leak {i + 1} of {leaks.length}</p>
                <h3 className="relative mt-stack-md max-w-[18ch] text-h3">{leak.title}</h3>
                <p className="relative mt-4 max-w-measure text-muted">{leak.answer}</p>

                {/* Evidence, beside the photo (not on it) */}
                <div data-reveal className="relative mt-stack-md rounded-[16px] bg-paper p-4 ring-1 ring-line">
                  <dl className="grid grid-cols-2 gap-4 text-small">
                    <div className="min-w-0">
                      <dt className="text-caption text-subtle">{leak.otaLabel}</dt>
                      <dd className="mt-0.5 font-semibold">
                        <span className="mark-highlight">{leak.ota}</span>
                      </dd>
                    </div>
                    <div className="min-w-0 border-l border-line pl-4">
                      <dt className="text-caption text-subtle">PMS says</dt>
                      <dd className="mt-0.5 font-semibold">{leak.pms}</dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                    <StatusChip status={leak.status} />
                    <span className="text-caption text-muted">{leak.action}</span>
                  </div>
                </div>

                <div className="relative mt-auto pt-stack-md">
                  <ArrowLink href={leak.href}>How Aptli handles this</ArrowLink>
                </div>
              </div>
            </div>
          </article>
        ))}
      </StackCards>

      <Reveal className="mt-section-y-sm">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-h3">The leaks at a glance</h3>
          <p className="text-small text-muted">Seven gaps Aptli checks every day</p>
        </div>
        <div className="table-scroll mt-stack-md rounded-[20px] bg-surface shadow-md ring-1 ring-line">
          <table className="w-full min-w-[46rem] text-left text-table">
            <caption className="sr-only">Common revenue leaks, how Aptli spots each one, and what Aptli does</caption>
            <thead className="bg-ink text-small text-paper">
              <tr>
                <th scope="col" className="px-6 py-4 font-display font-semibold">What goes wrong</th>
                <th scope="col" className="px-6 py-4 font-display font-semibold">How Aptli spots it</th>
                <th scope="col" className="px-6 py-4 font-display font-semibold">What Aptli does</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leakTable.map((r, i) => (
                <tr key={r.wrong} className="transition-colors hover:bg-brand-50/60">
                  <th scope="row" className="px-6 py-4 font-semibold">
                    <span className="num mr-3 inline-grid size-6 place-items-center rounded-[7px] bg-paper-2 text-caption text-muted">{i + 1}</span>
                    {r.wrong}
                  </th>
                  <td className="px-6 py-4 text-muted">{r.spot}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-500" />
                      {r.act}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
