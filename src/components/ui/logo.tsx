import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Aptli wordmark ("APTLI. Always ahead"). Source: wireframe asset, recoloured
 * to ink for the light site. `tone="light"` is the original white version for dark bands.
 * File: public/brand/aptli-logo-{dark,light}.png, 1280 × 371.
 */
export function Logo({
  tone = "dark",
  className,
  priority,
  href = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  priority?: boolean;
  href?: string | null;
}) {
  const img = (
    <Image
      src={tone === "dark" ? site.logo : site.logoOnDark}
      alt={`${site.name}, ${site.tagline.toLowerCase()}`}
      width={1280}
      height={371}
      loading={priority ? "eager" : undefined}
      sizes="(max-width: 767px) 120px, 160px"
      className={cn("h-auto w-[clamp(7rem,6rem+1.5vw,10rem)]", className)}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} aria-label={`${site.name} home`} className="inline-flex min-h-11 items-center">
      {img}
    </Link>
  );
}
