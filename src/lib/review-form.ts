/** Shared rules for the free leakage review form (client and API route use the same checks). */

export type ReviewForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  properties: string;
  pms: string;
};

export type ReviewErrors = Partial<Record<keyof ReviewForm, string>>;

export const emptyReviewForm: ReviewForm = { firstName: "", lastName: "", email: "", phone: "", properties: "", pms: "" };

export function validateReview(f: ReviewForm): ReviewErrors {
  const e: ReviewErrors = {};
  if (!f.firstName.trim()) e.firstName = "Enter your first name.";
  if (!f.lastName.trim()) e.lastName = "Enter your last name.";
  if (!f.email.trim()) e.email = "Enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter an email like name@yourhotel.com.";
  const digits = f.phone.replace(/\D/g, "");
  if (!digits) e.phone = "Enter a phone number.";
  else if (digits.length < 7 || digits.length > 15) e.phone = "Enter a phone number with area code.";
  if (!f.properties) e.properties = "Choose how many properties.";
  if (!f.pms) e.pms = "Choose your PMS, or Other.";
  return e;
}
