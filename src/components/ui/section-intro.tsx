import { cn } from "@/lib/cn";
import { SplitReveal } from "@/components/motion/split-reveal";

/** The Aptli logo triangle. Used as the kicker mark and list bullet. */
export function Triangle({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 12 10" className={cn("size-2.5 shrink-0 fill-brand-500", className)}>
      <path d="M6 0l6 10H0z" />
    </svg>
  );
}

/**
 * Section tag (SFS-style label): a red mark box + sentence-case text in a soft tag.
 * Brief: no all-caps eyebrows.
 */
export function Kicker({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-[10px] py-1 pr-3.5 pl-1 font-display text-small font-semibold",
        tone === "light" ? "bg-surface text-ink ring-1 ring-line" : "bg-white/8 text-paper ring-1 ring-white/15",
        className,
      )}
    >
      <span className="grid size-6 place-items-center rounded-[7px] bg-brand-500">
        <Triangle className="size-2.5 fill-white" />
      </span>
      {children}
    </p>
  );
}

/**
 * Section opener used across the site: kicker → question H2 → 40–60 word direct answer (AEO).
 * `animate` uses the GSAP line reveal for the heading (below-the-fold sections only).
 */
export function SectionIntro({
  kicker,
  title,
  answer,
  align = "left",
  tone = "light",
  animate = true,
  className,
  titleClassName,
  answerClassName,
  aside,
  index,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  answer?: React.ReactNode;
  align?: "left" | "center" | "split";
  tone?: "light" | "dark";
  animate?: boolean;
  className?: string;
  titleClassName?: string;
  answerClassName?: string;
  aside?: React.ReactNode;
  /** Section number shown on the header rule, e.g. "02". */
  index?: string;
}) {
  // max-w in `ch` must sit on the heading itself (ch = the element's own font size).
  const centered = align !== "left";
  const headingClass = cn("text-h2", centered ? "mx-auto max-w-[24ch]" : "max-w-[22ch]", titleClassName);
  const heading = animate ? (
    <SplitReveal className={headingClass}>{title}</SplitReveal>
  ) : (
    <h2 className={headingClass}>{title}</h2>
  );
  void index; // reserved: section numbering is not shown in the centred layout

  /*
   * Section header (client direction): centred tag → heading (≤2 lines) → one short line of
   * supporting text (≤2 lines, ~150 characters). The 40–60 word AEO answers live in the
   * section body and FAQ, not here.
   */
  return (
    <header className={cn("min-w-0", centered && "mx-auto flex max-w-[64rem] flex-col items-center text-center", className)}>
      {kicker && (
        <div data-reveal="tag">
          <Kicker tone={tone}>{kicker}</Kicker>
        </div>
      )}
      <div className={cn("w-full min-w-0", kicker && "mt-5")}>{heading}</div>
      {answer && (
        <p
          data-reveal
          className={cn(
            "mt-stack-md max-w-[50rem] text-lead",
            centered && "mx-auto",
            tone === "light" ? "text-muted" : "text-paper/75",
            answerClassName,
          )}
        >
          {answer}
        </p>
      )}
      {aside && <div data-reveal>{aside}</div>}
    </header>
  );
}
