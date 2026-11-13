import Image from "next/image";
import ctaImg from "@/assets/images/home/cta-hotel-dusk.jpg";
import proveImg from "@/assets/images/home/cta-handshake.jpg";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/section-intro";
import { site } from "@/lib/site";

const next = [
  { t: "Tell us about your hotel", d: "Name, work email, phone, properties and PMS." },
  { t: "Book a short call", d: "We confirm what to check and answer your questions." },
  { t: "Share read access", d: "One property, read-only, with your written consent." },
  { t: "Walk through every finding", d: "Each with its OTA and PMS evidence, before you decide." },
];

/** Closing CTA (SFS dark card + notch tail) with a tilted photo collage. */
export function FinalCta() {
  return (
    <Section tone="paper" className="pb-[calc(var(--spacing-section-y)+1.5rem)]">
      <Reveal>
        <div className="on-ink relative grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-stack-lg rounded-[32px] bg-ink p-stack-xl text-paper max-bp1200:grid-cols-1 max-bp576:p-stack-lg">
          <span aria-hidden className="absolute -bottom-6 left-1/2 h-7 w-14 -translate-x-1/2 bg-ink [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          <div className="min-w-0">
            <Kicker tone="dark">Free leakage review</Kicker>
            <h2 className="mt-4 max-w-[18ch] text-h2 text-paper">
              See what your hotel is owed, <em className="accent">before</em> you decide anything
            </h2>
            <ol className="mt-stack-lg grid grid-cols-2 gap-3 max-bp576:grid-cols-1">
              {next.map((s, i) => (
                <li key={s.t} data-reveal="card" className="flex gap-4 rounded-[18px] bg-white/6 p-4 ring-1 ring-white/10">
                  <span className="num grid size-9 shrink-0 place-items-center rounded-[10px] bg-brand-500 font-display text-small font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display font-bold">{s.t}</span>
                    <span className="block text-small text-paper/65">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-stack-lg flex flex-wrap gap-3 max-bp576:flex-col max-bp576:*:w-full">
              <Button href={site.primaryCta.href} variant="brand" size="lg">
                {site.primaryCta.label}
              </Button>
              <Button href="/contact/" variant="inverse" size="lg">
                Talk to us about your portfolio
              </Button>
            </div>
            <p className="mt-5 text-caption text-paper/55">We never ask for card numbers or passwords on this site.</p>
          </div>

          {/* Collage */}
          <div className="relative min-h-[30rem] max-bp1200:min-h-[24rem] max-bp576:min-h-[20rem]">
            <figure data-reveal="card" className="absolute top-0 right-0 h-[78%] w-[66%] overflow-hidden rounded-[24px] shadow-lg ring-4 ring-ink">
              <Image src={ctaImg} alt="A select-service hotel lit up at dusk" fill placeholder="blur" sizes="(max-width: 1199px) 90vw, 40vw" className="object-cover" />
            </figure>
            <figure data-reveal="card" className="absolute bottom-0 left-0 h-[52%] w-[50%] -rotate-3 overflow-hidden rounded-[20px] shadow-lg ring-4 ring-ink">
              <Image src={proveImg} alt="A hotel owner shaking hands after a findings walkthrough" fill placeholder="blur" sizes="(max-width: 1199px) 70vw, 30vw" className="object-cover" />
            </figure>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
