import Image, { type StaticImageData } from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/section-intro";
import { HeroTiles, type HeroPath } from "./hero-tiles";

/** Entry delay that waits for the first-visit preloader (--intro is 0s when it is skipped). */
const intro = (ms: number) => `calc(var(--intro, 0s) + ${ms}ms)`;

type Cta = { label: string; href: string };

/**
 * The inner-page hero (client rule: every page except /contact/ opens like the home page).
 * Full-bleed photo under a dark wash, kicker, keyword H1, one sentence, two buttons and
 * the red quick-path tiles. Nothing else sits on the photo. Text is visible at first paint (CSS rise,
 * waiting for the preloader through --intro); the photo eases out of a slight zoom and parallaxes.
 * No visible breadcrumb (client rule); BreadcrumbList stays in the page's JSON-LD.
 * The header must list the route in DARK_HERO_ROUTES so it renders light over the photo.
 */
export function PageHero({
  image,
  kicker,
  title,
  lead,
  primary,
  secondary,
  paths,
  pathsLabel,
  imagePosition = "object-center",
}: {
  image: StaticImageData;
  kicker: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  primary: Cta;
  secondary: Cta;
  paths: HeroPath[];
  pathsLabel: string;
  imagePosition?: string;
}) {
  return (
    <section className="on-ink relative isolate flex min-h-[max(42rem,92svh)] flex-col overflow-x-clip bg-ink text-paper max-bp768:min-h-[max(38rem,88svh)]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax className="absolute inset-[-6%]" amount={8}>
          <Image
            src={image}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className={`object-cover ${imagePosition} motion-safe:animate-zoom-out`}
            style={{ animationDelay: intro(0) }}
          />
        </Parallax>
        <div className="absolute inset-0 bg-ink/65" />
        <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-transparent to-ink/85" />
      </div>

      <div className="container-site flex flex-1 flex-col items-center justify-center pt-[calc(var(--spacing-header)+var(--spacing-stack-lg))] pb-stack-xl text-center">
        <div className="motion-safe:animate-rise" style={{ animationDelay: intro(0) }}>
          <Kicker tone="dark">{kicker}</Kicker>
        </div>
        <h1 className="mt-5 max-w-[24ch] text-h1 text-paper [text-wrap:balance] motion-safe:animate-rise" style={{ animationDelay: intro(160) }}>
          {title}
        </h1>
        <p className="mt-5 max-w-[46rem] text-lead text-paper/85 motion-safe:animate-rise" style={{ animationDelay: intro(240) }}>
          {lead}
        </p>
        <div
          className="mt-stack-lg flex flex-wrap justify-center gap-3 motion-safe:animate-rise max-bp576:w-full max-bp576:flex-col max-bp576:*:w-full"
          style={{ animationDelay: intro(320) }}
        >
          <Button href={primary.href} variant="brand" size="lg">
            {primary.label}
          </Button>
          <Button href={secondary.href} variant="inverse" size="lg">
            {secondary.label}
          </Button>
        </div>
      </div>

      <HeroTiles paths={paths} label={pathsLabel} delay={400} />
    </section>
  );
}
