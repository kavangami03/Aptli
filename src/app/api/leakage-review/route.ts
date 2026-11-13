import { emptyReviewForm, type ReviewForm, validateReview } from "@/lib/review-form";

/**
 * Free leakage review requests (POST JSON from /contact/).
 * Validates with the same rules as the form. `website` is a hidden honeypot: if filled, the request
 * is accepted silently and dropped (bots).
 *
 * TODO (launch blocker): deliver the request to the team, e.g. the CRM or a notification email.
 * This needs the client's CRM / email provider (brief §9.7). Until then requests are only logged.
 */
export async function POST(request: Request) {
  let body: Partial<ReviewForm> & { website?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  const form: ReviewForm = { ...emptyReviewForm };
  for (const k of Object.keys(emptyReviewForm) as (keyof ReviewForm)[]) {
    const v = body[k];
    form[k] = typeof v === "string" ? v.slice(0, 200).trim() : "";
  }

  const errors = validateReview(form);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 });

  console.info("[leakage-review] new request", { ...form, receivedAt: new Date().toISOString() });
  return Response.json({ ok: true });
}
