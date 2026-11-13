import { cn } from "@/lib/cn";

/** The four action states. Same names and colours as the product and daily email. */
export type Status = "done" | "approve" | "task" | "blocked";

const config: Record<Status, { label: string; tile: string; icon: React.ReactNode }> = {
  done: { label: "Taken care of", tile: "bg-ok", icon: <path d="M3.5 8.5l3 3 6-7" /> },
  approve: {
    label: "Needs approval",
    tile: "bg-approve",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" />
        <path d="M8 5v3.2l2 1.3" />
      </>
    ),
  },
  task: {
    label: "Your team's task",
    tile: "bg-task",
    icon: (
      <>
        <circle cx="8" cy="5.5" r="2.5" />
        <path d="M3.5 13.5c.6-2.4 2.4-3.8 4.5-3.8s3.9 1.4 4.5 3.8" />
      </>
    ),
  },
  blocked: { label: "Blocked", tile: "bg-block", icon: <path d="M6 4.5v7M10 4.5v7" /> },
};

/**
 * Status chip: white chip, 8px corners (matches buttons), coloured icon tile + label.
 * Status is never colour alone: every chip has an icon shape and its words.
 */
export function StatusChip({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const c = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-[9px] bg-surface py-1 pr-2.5 pl-1 font-display text-caption font-bold whitespace-nowrap text-ink shadow-xs ring-1 ring-line",
        className,
      )}
    >
      <span aria-hidden className={cn("grid size-5 shrink-0 place-items-center rounded-[6px] text-white", c.tile)}>
        <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {c.icon}
        </svg>
      </span>
      {label ?? c.label}
    </span>
  );
}
