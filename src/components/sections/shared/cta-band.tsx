import Image, { type StaticImageData } from "next/image";
import defaultBack from "@/assets/images/home/cta-hotel-dusk.jpg";
import defaultFront from "@/assets/images/home/cta-handshake.jpg";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Kicker } from "@/components/ui/section-intro";

type Link = { label: string; href: string };
type Photo = { src: StaticImageData; alt: string };

/**
 * The closing CTA used at the end of every page (client rule: same design everywhere, content per page).
 * SFS dark card with a notch tail, kicker, headline, four numbered points, two buttons and a tilted
 * two-photo collage. Defaults to the home page photos.
 */
export function CtaBand({
  kicker,
  title,
  points,
  primary,
  secondary,
  note = "We never ask for card numbers or passwords on this site.",
  back = { src: defaultBack, alt: "A select-service hotel lit up at dusk" },
  front = { src: defaultFront, alt: "A hotel owner shaking hands after a findings walkthrough" },
}: {
  kicker: string;
  title: React.ReactNode;
  points: { t: string; d: string }[];
  primary: Link;
  secondary: Link;
  note?: string;
  back?: Photo;
  front?: Photo;
}) {
  return (
    <Section tone="paper" className="pb-[calc(var(--spacing-section-y)+1.5rem)]">
      <Reveal>
        <div className="on-ink relative grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-stack-lg rounded-[32px] bg-ink p-stack-xl text-paper max-bp1200:grid-cols-1 max-bp576:p-stack-lg">
          <span aria-hidden className="absolute -bottom-6 left-1/2 h-7 w-14 -translate-x-1/2 bg-ink [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          <div className="min-w-0">
            <Kicker tone="dark">{kicker}</Kicker>
            <h2 className="mt-4 max-w-[18ch] text-h2 text-paper">{title}</h2>
            <ol className="mt-stack-lg grid grid-cols-2 gap-3 max-bp576:grid-cols-1">
              {points.map((s, i) => (
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
              <Button href={primary.href} variant="brand" size="lg">
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="inverse" size="lg">
                {secondary.label}
              </Button>
            </div>
            {note && <p className="mt-5 text-caption text-paper/55">{note}</p>}
          </div>

          {/* Collage */}
          <div className="relative min-h-[30rem] max-bp1200:min-h-[24rem] max-bp576:min-h-[20rem]">
            <figure data-reveal="card" className="absolute top-0 right-0 h-[78%] w-[66%] overflow-hidden rounded-[24px] shadow-lg ring-4 ring-ink">
              <Image src={back.src} alt={back.alt} fill placeholder="blur" sizes="(max-width: 1199px) 90vw, 40vw" className="object-cover" />
            </figure>
            <figure data-reveal="card" className="absolute bottom-0 left-0 h-[52%] w-[50%] -rotate-3 overflow-hidden rounded-[20px] shadow-lg ring-4 ring-ink">
              <Image src={front.src} alt={front.alt} fill placeholder="blur" sizes="(max-width: 1199px) 70vw, 30vw" className="object-cover" />
            </figure>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
