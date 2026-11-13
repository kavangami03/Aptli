import Image, { type StaticImageData } from "next/image";
import afterImg from "@/assets/images/home/after-laptop.jpg";
import beforeImg from "@/assets/images/home/before-receipts.jpg";
import { Section } from "@/components/ui/section";
import { SectionIntro } from "@/components/ui/section-intro";
import { cn } from "@/lib/cn";

const without = ["Month-end spreadsheets", "A different vendor per channel", "Money you never see recovered"];
const withAptli = ["One check every morning", "Evidence on every finding", "Counted only when received"];

function Card({
  tone,
  tag,
  image,
  alt,
  items,
}: {
  tone: "before" | "after";
  tag: string;
  image: StaticImageData;
  alt: string;
  items: string[];
}) {
  const after = tone === "after";
  return (
    <div data-reveal="card" className={cn("flex min-w-0 flex-col overflow-hidden rounded-[28px] ring-1", after ? "bg-ink text-paper ring-ink" : "bg-surface ring-line")}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          placeholder="blur"
          sizes="(max-width: 991px) 100vw, 45vw"
          className={cn("object-cover", !after && "grayscale")}
        />
        <span
          className={cn(
            "absolute top-5 left-5 rounded-[10px] px-3 py-1.5 font-display text-small font-bold shadow-md",
            after ? "bg-brand-600 text-white" : "bg-surface text-ink",
          )}
        >
          {tag}
        </span>
      </div>
      <ul className="grid gap-4 p-stack-lg">
        {items.map((t) => (
          <li key={t} data-reveal className="flex items-center gap-4 font-display text-h5 font-bold">
            <span
              aria-hidden
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-[10px]",
                after ? "bg-brand-500 text-white" : "bg-paper-2 text-subtle",
              )}
            >
              <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                {after ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M5 5l6 6M11 5l-6 6" />}
              </svg>
            </span>
            <span className={after ? "text-paper" : "text-muted"}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * What is Aptli: a two-line definition, then a quick before/after you can read in five seconds.
 * (The full entity sentence lives in the FAQ answer "What is Aptli?" and in schema.)
 */
export function WhatIsAptli() {
  return (
    <Section id="what-is-aptli" tone="paper">
      <SectionIntro
        align="center"
        kicker="What is Aptli?"
        title={
          <>
            One daily check for every dollar <em className="accent">your hotel is owed</em>
          </>
        }
        answer="Aptli matches OTA commissions, virtual cards and CLC payments against your PMS, then recovers what is owed with your approval."
      />

      <div className="relative mt-stack-xl grid grid-cols-2 gap-grid-gap max-bp992:grid-cols-1">
        <Card tone="before" tag="Without Aptli" image={beforeImg} alt="Receipts and a calculator spread across a desk" items={without} />
        <Card tone="after" tag="With Aptli" image={afterImg} alt="A clean laptop workspace with the day's work done" items={withAptli} />
        <span aria-hidden className="absolute top-[30%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-bp992:hidden">
          <span data-reveal="pop" className="grid size-14 place-items-center rounded-[16px] bg-brand-600 text-white shadow-brand ring-8 ring-paper">
            <svg viewBox="0 0 16 16" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </span>
      </div>
    </Section>
  );
}
