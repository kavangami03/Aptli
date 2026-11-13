import Image, { type StaticImageData } from "next/image";
import otaImg from "@/assets/images/reconciliation/recon-ota-commission.jpg";
import clcImg from "@/assets/images/reconciliation/recon-crew-stay.jpg";
import vccImg from "@/assets/images/reconciliation/recon-virtual-card.jpg";
import { ArrowLink, Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionIntro, Triangle } from "@/components/ui/section-intro";
import { channels, pmsReads } from "@/content/reconciliation";
import { site } from "@/lib/site";

const photos: Record<(typeof channels)[number]["key"], { src: StaticImageData; alt: string; pos: string }> = {
  ota: { src: otaImg, alt: "A manager working through booking figures on a laptop, calculator beside her", pos: "object-[50%_45%]" },
  vcc: { src: vccImg, alt: "A card going into a payment terminal next to a laptop", pos: "object-[50%_50%]" },
  clc: { src: clcImg, alt: "A guest walking down a hotel corridor past the room doors", pos: "object-[50%_40%]" },
};

/**
 * What Aptli checks on each channel: a bento row. The first cell holds the direct answer (and the
 * primary CTA); then one photo card per channel with what is compared, what leaks it catches and a
 * link down to its solution page. Below, a strip for the PMS, the record every channel is checked against.
 */
export function RecChannels() {
  return (
    <Section id="channels" tone="paper" className="scroll-mt-[var(--spacing-header)]">
      <SectionIntro
        align="center"
        kicker="Channel by channel"
        title={
          <>
            What does Aptli check on <em className="accent">each channel?</em>
          </>
        }
        answer="The leaks that actually happen on each one, every reservation, every day."
      />

      <div className="mt-stack-xl grid grid-cols-4 gap-grid-gap max-bp1300:grid-cols-2 max-bp768:grid-cols-1">
        {/* Answer cell */}
        <div data-reveal="card" className="flex min-w-0 flex-col rounded-[26px] bg-ink p-stack-md text-paper shadow-lg">
          <p className="font-display text-small font-bold text-brand-400">In short</p>
          <p className="mt-3 text-paper/85">
            Aptli checks each channel for the leaks that actually happen there. OTAs bill commission on stays that were
            cancelled, cut short or never arrived. Virtual cards go uncharged or get charged at the wrong time. CLC crew
            stays and payments miss the right invoice.
          </p>
          <p className="mt-3 text-small text-paper/60">Each channel has its own page with worked examples.</p>
          <div className="on-ink mt-auto pt-stack-md">
            <Button href={site.primaryCta.href} variant="brand">
              {site.primaryCta.label}
            </Button>
          </div>
        </div>

        {channels.map((c) => {
          const p = photos[c.key];
          return (
            <article key={c.key} data-reveal="card" className="group/card flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-surface shadow-sm ring-1 ring-line">
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-3">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 767px) 100vw, (max-width: 1299px) 50vw, 23vw"
                  className={`object-cover ${p.pos} transition-[scale] duration-[1.4s] ease-(--ease-out) group-hover/card:scale-[1.04]`}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-caption font-medium text-subtle">{c.systems}</p>
                <h3 className="mt-1 text-h5">{c.name}</h3>
                <p className="mt-3 text-small text-muted">
                  <span className="font-display font-bold text-ink">Compares: </span>
                  {c.compares}
                </p>
                <p className="mt-4 font-display text-small font-bold">Leaks it catches</p>
                <ul className="mt-2 grid gap-1.5">
                  {c.catches.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-small text-muted">
                      <Triangle className="mt-1.5 size-2 rotate-90" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <ArrowLink href={c.href}>{c.link}</ArrowLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* The PMS: the record every channel is checked against */}
      <div data-reveal="card" className="mt-grid-gap flex flex-wrap items-center justify-between gap-x-stack-lg gap-y-4 rounded-[22px] bg-paper-2 px-stack-md py-5 ring-1 ring-line">
        <div className="flex min-w-0 items-center gap-4">
          <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-ink text-paper">
            <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
              <path d="M3.5 9h17M8 13h3M8 16.5h6" />
            </svg>
          </span>
          <p className="min-w-0">
            <span className="block font-display font-bold">Your PMS</span>
            <span className="block text-small text-muted">The record every channel is checked against, read with your consent</span>
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {pmsReads.map((r) => (
            <li key={r} className="rounded-[10px] bg-surface px-3 py-1.5 font-display text-small font-semibold ring-1 ring-line">
              {r}
            </li>
          ))}
          <li className="rounded-[10px] bg-ink px-3 py-1.5 font-display text-small font-semibold text-paper">Read-only</li>
        </ul>
      </div>
    </Section>
  );
}
