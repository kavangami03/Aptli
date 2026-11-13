import Image from "next/image";
import stageImg from "@/assets/images/home/hero-manager-approving.jpg";
import { HeroStage } from "@/components/motion/hero-stage";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { StatusChip } from "@/components/ui/status-chip";
import { heroLedger } from "@/content/home";

/** Short channel marks for the ledger rows (text only, no third-party logos). */
const marks: Record<string, { label: string; className: string }> = {
  "Booking.com": { label: "B", className: "bg-task text-white" },
  Expedia: { label: "E", className: "bg-highlight text-ink" },
  "Virtual card": { label: "VC", className: "bg-ink text-paper" },
};

/**
 * The brand device on its own textured band: the reconciliation ledger beside a clean photo.
 * Three short rows, a "≠" between the two records, one result chip. Rows land, the highlighter
 * draws and chips settle when it scrolls in (HeroStage).
 */
export function ProofStage() {
  return (
    <Section
      id="see-it-work"
      tone="paper-2"
      className="[background-image:linear-gradient(to_bottom,rgb(20_20_19/0.05)_1px,transparent_1px),linear-gradient(to_right,rgb(20_20_19/0.05)_1px,transparent_1px)] [background-size:56px_56px]"
    >
      <div className="relative">
        <SectionIntro
          align="center"
          kicker="A morning with Aptli"
          title={
            <>
              What the OTA says, what the PMS says, and <em className="accent">what we did</em>
            </>
          }
          answer="Each morning, Aptli lines up every reservation with your PMS and shows both records wherever they disagree."
        />

        <HeroStage className="mt-stack-xl grid grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] gap-grid-gap max-bp1200:grid-cols-1">
          {/* Ledger */}
          <div data-ledger className="order-1 flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-surface shadow-lg ring-1 ring-line max-bp1200:order-2">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-ink px-6 py-4 text-paper">
              <p className="flex items-center gap-3 font-display font-bold">
                <span className="grid size-8 place-items-center rounded-[9px] bg-brand-500">
                  <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7" /></svg>
                </span>
                Today&apos;s reconciliation
              </p>
              <p className="flex items-center gap-2 text-small text-paper/70">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-ok opacity-70 motion-safe:animate-ping" />
                  <span className="relative size-2 rounded-full bg-ok" />
                </span>
                Live · example data
              </p>
            </div>

            <table className="w-full text-left">
              <caption className="sr-only">Example reconciliation: what the OTA says, what the PMS says, and the result</caption>
              <thead className="text-small text-subtle">
                <tr>
                  <th scope="col" className="px-6 pt-5 pb-3 font-medium max-bp576:sr-only">Channel</th>
                  <th scope="col" className="px-3 pt-5 pb-3 font-medium max-bp576:pl-5">OTA says</th>
                  <th scope="col" className="w-12 px-0 pt-5 pb-3 max-bp576:hidden"><span className="sr-only">Compared with</span></th>
                  <th scope="col" className="px-3 pt-5 pb-3 font-medium">PMS says</th>
                  <th scope="col" className="px-6 pt-5 pb-3 text-right font-medium max-bp576:pr-5">Result</th>
                </tr>
              </thead>
              <tbody>
                {heroLedger.map((r) => {
                  const mk = marks[r.channel];
                  return (
                    <tr key={r.ref} data-ledger-row className="border-t border-line transition-colors hover:bg-paper">
                      <th scope="row" className="px-6 py-6 max-bp576:hidden">
                        <span className="flex items-center gap-3 font-display font-bold">
                          <span className={`grid size-10 shrink-0 place-items-center rounded-[11px] font-display text-small font-extrabold ${mk?.className ?? "bg-paper-2"}`}>
                            {mk?.label}
                          </span>
                          {r.channel}
                        </span>
                      </th>
                      <td className="px-3 py-6 font-display text-h6 font-bold max-bp576:pl-5">
                        <span className="relative isolate inline-block">
                          <span aria-hidden data-ledger-hl className="hl-bar" />
                          {r.says}
                        </span>
                      </td>
                      <td className="px-0 py-6 max-bp576:hidden">
                        <span className="grid size-8 place-items-center rounded-[9px] bg-brand-50 font-display text-h6 font-bold text-brand-600">
                          <span aria-hidden>≠</span>
                          <span className="sr-only">does not match</span>
                        </span>
                      </td>
                      <td className="px-3 py-6 font-display text-h6 font-bold">{r.pms}</td>
                      <td className="px-6 py-6 text-right max-bp576:pr-5">
                        <span data-ledger-chip className="inline-block">
                          <StatusChip status={r.status} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Clean photo, one small tag */}
          <div data-reveal="card" className="relative order-2 min-h-[26rem] overflow-hidden rounded-[26px] bg-ink shadow-lg max-bp1200:order-1 max-bp1200:aspect-[16/9] max-bp1200:min-h-0 max-bp576:aspect-[4/3]">
            <Image
              data-stage-img
              src={stageImg}
              alt="A hotel finance manager approving a recovery from her phone"
              fill
              placeholder="blur"
              sizes="(max-width: 1199px) 100vw, 50vw"
              className="scale-110 object-cover object-[62%_30%]"
            />
            <p className="absolute bottom-4 left-4 rounded-[10px] bg-surface/95 px-3 py-2 font-display text-small font-bold text-ink shadow-md">
              Approved from her phone
            </p>
          </div>
        </HeroStage>
      </div>
    </Section>
  );
}
