import { cn } from "@/lib/cn";
import { Container } from "./container";

type Tone = "paper" | "paper-2" | "surface" | "ink";
type Space = "default" | "sm" | "none";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-paper [&_h1,&_h2,&_h3,&_h4]:text-paper",
};

const spaces: Record<Space, string> = {
  default: "py-section-y",
  sm: "py-section-y-sm",
  none: "",
};

/**
 * Every page section uses this. It sets the background band, vertical rhythm,
 * the 1540px container, and `overflow-x: clip` so animation start offsets
 * (x: 100, scale) can never cause horizontal scroll.
 */
export function Section({
  tone = "paper",
  space = "default",
  container = "site",
  className,
  innerClassName,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  space?: Space;
  container?: "site" | "wide" | "prose" | false;
  innerClassName?: string;
}) {
  return (
    <section className={cn("relative overflow-x-clip", tones[tone], spaces[space], className)} {...props}>
      {container ? (
        <Container size={container} className={innerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
