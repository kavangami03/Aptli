import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "brand" | "primary" | "secondary" | "inverse" | "light" | "ghost";
type Size = "md" | "lg";

/**
 * Aptli button (SFS-inspired, made our own):
 *   [ label block | ▸ arrow box ]   14px corners, never pills.
 * Hover: a colour wipe sweeps the label left→right, the arrow exits right and a
 * fresh one slides in from the left. Transform-only → 60fps.
 */
const variants: Record<Variant, { root: string; wipe: string; box: string; hoverText: string }> = {
  brand: {
    root: "bg-brand-600 text-white shadow-brand [.on-ink_&]:shadow-none",
    // Light pages: wipe to ink. Dark sections (.on-ink): wipe to white so it never vanishes.
    wipe: "bg-ink [.on-ink_&]:bg-white",
    box: "bg-white text-brand-600 [.on-ink_&]:group-hover/btn:bg-brand-600 [.on-ink_&]:group-hover/btn:text-white",
    hoverText: "[.on-ink_&]:group-hover/btn:text-ink",
  },
  primary: {
    root: "bg-ink text-paper shadow-md",
    wipe: "bg-brand-600",
    box: "bg-brand-500 text-white",
    hoverText: "",
  },
  secondary: {
    root: "bg-surface text-ink ring-1 ring-inset ring-line-strong",
    wipe: "bg-ink",
    box: "bg-paper-2 text-ink group-hover/btn:bg-brand-500 group-hover/btn:text-white",
    hoverText: "group-hover/btn:text-paper",
  },
  inverse: {
    root: "bg-paper text-ink",
    wipe: "bg-brand-600",
    box: "bg-ink text-paper",
    hoverText: "group-hover/btn:text-white",
  },
  /** White button with a red arrow box (cards on photos / dark). Wipes to red on hover. */
  light: {
    root: "bg-surface text-ink",
    wipe: "bg-brand-600",
    box: "bg-brand-500 text-white group-hover/btn:bg-white group-hover/btn:text-brand-600",
    hoverText: "group-hover/btn:text-white",
  },
  ghost: {
    root: "bg-transparent text-ink ring-1 ring-inset ring-current/20",
    wipe: "bg-paper-2",
    box: "bg-ink text-paper",
    hoverText: "",
  },
};

const sizes: Record<Size, { root: string; label: string; box: string }> = {
  md: { root: "min-h-11 p-1", label: "px-4", box: "size-9 rounded-[10px]" },
  lg: { root: "min-h-14 p-1.5 max-bp576:min-h-12 max-bp576:p-1", label: "px-5", box: "size-11 rounded-[10px] max-bp576:size-10" },
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; className?: string; children: React.ReactNode };

function ArrowBox({ className }: { className: string }) {
  const path = <path d="M3 8h10M9 4l4 4-4 4" />;
  return (
    <span aria-hidden className={cn("relative grid shrink-0 place-items-center overflow-hidden transition-colors duration-(--duration-base)", className)}>
      <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/btn:translate-x-[180%]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {path}
      </svg>
      <svg viewBox="0 0 16 16" className="absolute size-4 -translate-x-[180%] transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/btn:translate-x-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {path}
      </svg>
    </span>
  );
}

export function Button(
  props:
    | (Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">)
    | (Common & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">),
) {
  const { variant = "brand", size = "md", arrow = true, className, children, ...rest } = props;
  const v = variants[variant];
  const s = sizes[size];

  const classes = cn(
    "group/btn relative isolate inline-flex items-center justify-between gap-2 overflow-hidden rounded-[var(--radius-btn)] text-button whitespace-nowrap",
    "transition-[transform,box-shadow] duration-(--duration-base) ease-(--ease-out) active:scale-[0.98]",
    "focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
    v.root,
    s.root,
    !arrow && "justify-center",
    className,
  );

  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/btn:scale-x-100",
          v.wipe,
        )}
      />
      <span className={cn("relative transition-colors duration-(--duration-base)", s.label, v.hoverText)}>{children}</span>
      {arrow && <ArrowBox className={cn(s.box, v.box)} />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as { href: string } & Omit<React.ComponentProps<typeof Link>, "href">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }
  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

/** Text link with an animated underline + arrow (used inside cards). */
export function ArrowLink({ href, children, tone = "light", className }: { href: string; children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/al inline-flex min-h-11 items-center gap-2.5 font-display text-[0.95em] font-semibold",
        tone === "light" ? "text-ink" : "text-paper",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-100 bg-current/30" />
        <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand-500 transition-transform duration-(--duration-slow) ease-(--ease-out) group-hover/al:scale-x-100" />
      </span>
      <span aria-hidden className="grid size-7 place-items-center rounded-[8px] bg-brand-500 text-white transition-transform duration-(--duration-base) group-hover/al:translate-x-1">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}
