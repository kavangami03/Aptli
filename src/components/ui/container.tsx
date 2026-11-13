import { cn } from "@/lib/cn";

type Size = "site" | "wide" | "prose";

const sizes: Record<Size, string> = {
  site: "container-site", // 1540px: default for all sections
  wide: "container-wide", // 1760px: full-bleed visuals that still need an edge
  prose: "container-prose", // 72ch: long-form reading
};

export function Container({
  size = "site",
  className,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { size?: Size; as?: React.ElementType }) {
  return <Tag className={cn(sizes[size], className)} {...props} />;
}
