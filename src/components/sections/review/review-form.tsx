"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import { emptyReviewForm, type ReviewErrors, type ReviewForm, validateReview } from "@/lib/review-form";
import { pmsOptions, propertyOptions } from "@/content/review";

type Status = "idle" | "sending" | "done" | "failed";

const fieldOrder: (keyof ReviewForm)[] = ["firstName", "lastName", "email", "phone", "properties", "pms"];

/** One labelled field with its inline error (top level, so inputs never remount while typing). */
function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="mb-1.5 block font-display text-small font-bold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 flex items-center gap-1.5 text-small font-medium text-block">
          <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5v3.5M8 11h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The free leakage review form: the six fields the standards allow, inputs ≥16px, inline errors
 * that screen readers announce, a hidden honeypot. Never asks for card numbers or passwords.
 */
export function LeakageReviewForm() {
  const uid = useId();
  const [form, setForm] = useState<ReviewForm>(emptyReviewForm);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof ReviewForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const pick = (k: keyof ReviewForm) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const focusFirst = (er: ReviewErrors) => {
    const first = fieldOrder.find((k) => er[k]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er = validateReview(form);
    setErrors(er);
    if (Object.keys(er).length) {
      focusFirst(er);
      return;
    }
    setStatus("sending");
    try {
      const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/leakage-review/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = (await res.json()) as { ok: boolean; errors?: ReviewErrors };
      if (data.ok) setStatus("done");
      else if (data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirst(data.errors);
      } else setStatus("failed");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "done") {
    return (
      <div role="status" className="flex flex-col items-start py-stack-md">
        <span aria-hidden className="grid size-14 place-items-center rounded-[16px] bg-ok text-white">
          <svg viewBox="0 0 16 16" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </span>
        <h2 className="mt-5 text-h4">Thanks, {form.firstName.trim()}. Your review request is in.</h2>
        <p className="mt-3 text-muted">We will email you at {form.email.trim()} to book a short call. You do not need to send anything else yet.</p>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const fieldProps = (k: keyof ReviewForm, label: string) => ({ id: `${uid}-${k}`, label, error: errors[k] });

  const inputProps = (k: keyof ReviewForm) => ({
    id: `${uid}-${k}`,
    name: k,
    value: form[k],
    onChange: set(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
    className: cn(
      "h-12 w-full rounded-[12px] bg-paper px-4 text-[1rem] text-ink ring-1 ring-line outline-none transition-[box-shadow,background-color] placeholder:text-subtle focus:bg-surface focus:ring-2 focus:ring-brand-600",
      errors[k] && "ring-2 ring-block",
    ),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4">
      {/* Announced once per submit when there are errors */}
      <p aria-live="polite" className={cn("text-small font-medium text-block", !errorCount && "sr-only")}>
        {errorCount ? `Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} below.` : ""}
      </p>

      <div className="grid grid-cols-2 gap-4 max-bp576:grid-cols-1">
        <Field {...fieldProps("firstName", "First name")}>
          <input type="text" autoComplete="given-name" {...inputProps("firstName")} />
        </Field>
        <Field {...fieldProps("lastName", "Last name")}>
          <input type="text" autoComplete="family-name" {...inputProps("lastName")} />
        </Field>
      </div>
      <Field {...fieldProps("email", "Work email")}>
        <input type="email" inputMode="email" autoComplete="email" placeholder="name@yourhotel.com" {...inputProps("email")} />
      </Field>
      <Field {...fieldProps("phone", "Phone")}>
        <input type="tel" inputMode="tel" autoComplete="tel" placeholder="(555) 123-4567" {...inputProps("phone")} />
      </Field>
      <div className="grid grid-cols-2 gap-4 max-bp576:grid-cols-1">
        <Field {...fieldProps("properties", "Number of properties")}>
          <Select
            id={`${uid}-properties`}
            name="properties"
            value={form.properties}
            onChange={pick("properties")}
            options={propertyOptions}
            invalid={!!errors.properties}
            describedBy={errors.properties ? `${uid}-properties-err` : undefined}
          />
        </Field>
        <Field {...fieldProps("pms", "PMS you use")}>
          <Select
            id={`${uid}-pms`}
            name="pms"
            value={form.pms}
            onChange={pick("pms")}
            options={pmsOptions}
            invalid={!!errors.pms}
            describedBy={errors.pms ? `${uid}-pms-err` : undefined}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="brand" size="lg" className="mt-2 w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending your request" : "Get my free leakage review"}
      </Button>

      {status === "failed" && (
        <p role="alert" className="text-small font-medium text-block">
          Something went wrong sending your request. Please try again, or email us and we will book the call.
        </p>
      )}
      <p className="text-caption text-subtle">
        We use your details only to book the review. We never ask for card numbers or passwords on this site.
      </p>
    </form>
  );
}
