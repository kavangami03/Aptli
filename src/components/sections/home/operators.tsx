import Image from "next/image";
import lobbyImg from "@/assets/images/home/operators-concierge.jpg";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Parallax } from "@/components/motion/parallax";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Kicker } from "@/components/ui/section-intro";

const principles = [
  { title: "Exact before automatic", body: "Only exact matches act on their own. A fuzzy match always waits for a person." },
  { title: "Deadlines respected", body: "Disputes go in before OTA cut-offs, and charges wait until the cancellation window closes." },
  { title: "Your books, untouched", body: "Aptli respects your month-end lock window and never posts into a closed period." },
];

/**
 * Built by hotel operators. The photo opens from an inset window to full bleed (clip-path on
 * the image layer only, so the text is never clipped).
 * TODO (open decision #6): add the approved founder story and one named or anonymised quote.
 */
export function Operators() {
  return (
    <section id="built-by-operators" className="on-ink relative isolate overflow-x-clip bg-ink text-paper">
      <ClipReveal className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax className="absolute inset-[-8%]" amount={10}>
          <Image
            src={lobbyImg}
            alt="A hotel front office manager at the reception desk"
            fill
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/70 to-ink/25 max-bp992:bg-ink/75" />
      </ClipReveal>

      <div className="container-site flex min-h-[88svh] flex-col justify-center py-section-y">
        <div data-reveal="tag">
          <Kicker tone="dark">Built by hotel operators</Kicker>
        </div>
        <h2 data-reveal className="mt-4 max-w-[17ch] text-h1 font-semibold text-paper">
          The rules a careful controller would follow, <em className="accent">run every day</em>
        </h2>
        <p data-reveal className="mt-stack-md max-w-[46ch] text-lead text-paper/80">
          Shaped by people who have closed hotel books and chased OTA statements, and just as careful as they are.
        </p>
        <RevealGroup className="mt-stack-xl grid max-w-[64rem] grid-cols-3 gap-grid-gap max-bp992:grid-cols-1">
          {principles.map((p) => (
            <RevealItem key={p.title} className="rounded-[20px] bg-white/8 p-6 ring-1 ring-white/15 backdrop-blur-md">
              <span aria-hidden className="mb-4 grid size-9 place-items-center rounded-[10px] bg-brand-500"><svg viewBox="0 0 16 16" className="size-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg></span>
              <h3 className="text-h6 text-paper">{p.title}</h3>
              <p className="mt-2 text-small text-paper/75">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
