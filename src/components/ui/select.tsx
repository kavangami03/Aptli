"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Custom dropdown (WAI-ARIA "select-only combobox"), styled like the site's inputs.
 * Keyboard: ↓/↑/Enter/Space open; ↓/↑/Home/End move; Enter/Space choose; Esc closes; typing a
 * letter jumps to the first matching option. Click outside closes. List animates with Motion.
 * Use it for every dropdown on the site instead of a native <select>.
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Choose",
  invalid,
  describedBy,
  className,
}: {
  id: string;
  name?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const optId = (i: number) => `${listId}-opt-${i}`;
  const selected = options.indexOf(value);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  // Keep the active option in view
  useEffect(() => {
    if (!open || active < 0) return;
    list.current?.querySelector<HTMLElement>(`#${CSS.escape(optId(active))}`)?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, open]);

  const openAt = (i: number) => {
    setOpen(true);
    setActive(i);
  };
  const choose = (i: number) => {
    onChange(options[i]);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const last = options.length - 1;
    const start = selected >= 0 ? selected : 0;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openAt(start);
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        openAt(e.key === "Home" ? 0 : last);
      } else if (e.key.length === 1) {
        const i = options.findIndex((o) => o.toLowerCase().startsWith(e.key.toLowerCase()));
        if (i >= 0) onChange(options[i]);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(last, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1) {
          const i = options.findIndex((o) => o.toLowerCase().startsWith(e.key.toLowerCase()));
          if (i >= 0) setActive(i);
        }
    }
  };

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        id={id}
        name={name}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? optId(active) : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openAt(selected >= 0 ? selected : 0))}
        onKeyDown={onKey}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-3 rounded-[12px] bg-paper px-4 text-left text-[1rem] ring-1 ring-line outline-none transition-[box-shadow,background-color]",
          "focus-visible:bg-surface focus-visible:ring-2 focus-visible:ring-brand-600",
          open && "bg-surface ring-2 ring-brand-600",
          invalid && !open && "ring-2 ring-block",
        )}
      >
        <span className={cn("min-w-0 truncate", value ? "text-ink" : "text-subtle")}>{value || placeholder}</span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn("size-4 shrink-0 text-muted transition-[rotate] duration-(--duration-base)", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            ref={list}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            // Lenis smooth scroll would swallow the wheel; let the list scroll natively
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-40 max-h-64 origin-top overflow-auto overscroll-contain rounded-[14px] bg-surface p-1.5 shadow-lg ring-1 ring-line"
          >
            {options.map((o, i) => {
              const isSel = i === selected;
              return (
                <li
                  key={o}
                  id={optId(i)}
                  role="option"
                  aria-selected={isSel}
                  onPointerEnter={() => setActive(i)}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={cn(
                    "flex min-h-11 items-center justify-between gap-3 rounded-[10px] px-3 text-[1rem] transition-colors",
                    i === active ? "bg-paper-2 text-ink" : "text-ink/85",
                    isSel && "font-semibold text-brand-700",
                  )}
                >
                  {o}
                  {isSel && (
                    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  )}
                </li>
              );
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
