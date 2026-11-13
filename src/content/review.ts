
/**
 * Free leakage review page (/contact/). Plain words, no invented numbers.
 * Open decision (brief §9.4): the period covered. Copy says it is agreed on the first call.
 */

export const reviewPromises = ["No cost and no obligation", "Read-only access, one property", "Only the last four digits of a card are stored"];

/** "What you get" cards, in display order: proof, walkthrough call, amounts by channel, nothing changes. */
export const deliverables: { title: string; body: string }[] = [
  { title: "Every finding, with proof", body: "Each one shows the OTA record next to your PMS record, so you can see the gap yourself." },
  { title: "A walkthrough call", body: "We go through the findings with you and answer every question, line by line." },
  { title: "Amounts by channel", body: "What is open on OTA commissions, virtual cards and CLC, kept apart and added up." },
  { title: "Nothing changes for your team", body: "No new software for the front desk and nothing changed in your PMS during the review." },
];

export const reviewSteps = [
  { title: "Tell us about your hotel", body: "Name, work email, phone, number of properties and your PMS." },
  { title: "Book a short call", body: "We confirm what to check, agree the period and answer your questions." },
  { title: "Share read access", body: "One property, read-only, with your written consent." },
  { title: "Walk through every finding", body: "Each one with its OTA and PMS evidence, before you decide anything." },
];

export const weNeed = [
  "Read access to your PMS for one property",
  "Read access to the OTA extranets and the CLC portal you use",
  "Your written consent before we connect",
  "One short call to agree what we check",
];

export const weNeverAsk = [
  "Full card numbers. Only the last four digits are stored",
  "Passwords sent by email or chat",
  "Changes to your PMS or your OTA settings",
  "A contract before you see the findings",
];

/** Visible FAQ and FAQPage schema read from this array, so they always match word for word. */
export const reviewFaqs = [
  {
    question: "What does the free leakage review cover?",
    answer:
      "We reconcile one property's OTA commissions, OTA virtual cards and CLC direct-bill payments against your PMS. Then we walk you through every finding with the OTA and PMS evidence side by side. We agree the exact period with you on the first call.",
  },
  {
    question: "Is the leakage review really free?",
    answer:
      "Yes. There is no cost and no obligation. You see every finding and the evidence behind it before you decide anything, and you keep the findings either way.",
  },
  {
    question: "What access does Aptli need for the review?",
    answer:
      "Read access for one property: your PMS, plus the OTA extranets and the CLC portal you use. You give consent in writing first, and nothing is changed in your systems during the review.",
  },
  {
    question: "Does Aptli store card numbers?",
    answer:
      "No. Aptli stores only the last four digits of a card. We never ask for full card numbers or for passwords by email, and every action is written to an audit trail.",
  },
  {
    question: "Which PMS can you review?",
    answer:
      "Aptli is built for the systems select-service and extended-stay hotels run, including choiceADVANTAGE, HotelKey, SynXis, OPERA Cloud and AutoClerk. Some connectors are live and others are rolling out, so tell us yours in the form.",
  },
  {
    question: "What happens after the review?",
    answer:
      "If you want Aptli to recover what we found and keep checking every day, we set it up property by property under rules you choose. If not, nothing changes and you keep the findings.",
  },
];

export const pmsOptions = ["choiceADVANTAGE", "HotelKey", "OPERA Cloud", "SynXis", "AutoClerk", "Other"];
export const propertyOptions = ["1", "2 to 5", "6 to 20", "21 or more"];
