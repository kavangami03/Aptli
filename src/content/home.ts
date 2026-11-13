import type { StaticImageData } from "next/image";
import type { Status } from "@/components/ui/status-chip";

import leakCancelled from "@/assets/images/home/leak-cancelled-stay.jpg";
import leakClc from "@/assets/images/home/leak-clc-crew.jpg";
import leakEarly from "@/assets/images/home/leak-early-departure.jpg";
import leakVcc from "@/assets/images/home/leak-virtual-card.jpg";
import stepAct from "@/assets/images/home/step-act.jpg";
import stepProve from "@/assets/images/home/step-prove.jpg";
import stepReconcile from "@/assets/images/home/step-reconcile.jpg";
import whoController from "@/assets/images/home/who-controller.jpg";
import whoCrew from "@/assets/images/home/who-crew-hotel.jpg";
import whoGm from "@/assets/images/home/who-general-manager.jpg";
import whoMgmt from "@/assets/images/home/who-management-company.jpg";
import whoOwner from "@/assets/images/home/who-owner.jpg";

/* ---------------------------------------------------------------------------
   All homepage copy. Voice: plain, specific, calm. Amounts are labelled examples.
   --------------------------------------------------------------------------- */

export const heroLedger: {
  channel: string;
  ref: string;
  says: string;
  pms: string;
  status: Status;
}[] = [
  { channel: "Booking.com", ref: "BKG-10219", says: "Stayed", pms: "Cancelled", status: "done" },
  { channel: "Expedia", ref: "EXP-502841", says: "3 nights", pms: "1 night", status: "approve" },
  { channel: "Virtual card", ref: "VCC-55813", says: "Not charged", pms: "Checked out", status: "done" },
];

export const channels = [
  "Expedia",
  "Booking.com",
  "Hotels.com",
  "OTA virtual cards",
  "CLC direct bill",
  "CheckINN",
  "Your PMS",
  "Folios",
  "Extranets",
  "Night audit",
];

export type Leak = {
  title: string;
  answer: string;
  image: StaticImageData;
  alt: string;
  otaLabel: string;
  ota: string;
  pms: string;
  action: string;
  status: Status;
  amount: string;
  href: string;
};

export const leaks: Leak[] = [
  {
    title: "Commission charged on a stay that never happened",
    answer:
      "The guest cancelled, but the OTA still bills commission. Aptli spots it in your PMS and files the dispute with the folio.",
    image: leakCancelled,
    alt: "A traveller wheeling luggage down a hotel corridor towards the exit",
    otaLabel: "OTA says",
    ota: "Stayed · $240.00 commission",
    pms: "Cancelled before arrival",
    action: "Dispute filed with folio evidence",
    status: "done",
    amount: "$240.00",
    href: "/reconciliation/ota-commission/",
  },
  {
    title: "A guest leaves two nights early, the OTA bills all three",
    answer:
      "Commission is charged on nights nobody slept. Aptli compares the folio and readies the stay update for your approval.",
    image: leakEarly,
    alt: "A guest handing a card to a front desk agent at check-out",
    otaLabel: "OTA says",
    ota: "3 nights · $186.40 commission",
    pms: "Checked out after 1 night",
    action: "Stay update waiting for your approval",
    status: "approve",
    amount: "$186.40",
    href: "/reconciliation/ota-commission/",
  },
  {
    title: "The stay is over, the virtual card was never charged",
    answer:
      "Virtual cards only pay if someone charges them in time. Aptli charges each eligible card after check-out, never too early.",
    image: leakVcc,
    alt: "A card being processed on a payment terminal",
    otaLabel: "OTA says",
    ota: "Virtual card $932.00 ready",
    pms: "Checked out, balance unpaid",
    action: "Card charged, payment posted",
    status: "done",
    amount: "$932.00",
    href: "/reconciliation/virtual-card/",
  },
  {
    title: "CLC paid you, but eleven invoices still look open",
    answer:
      "One CLC payment covers many crew stays. Aptli splits it across the right invoices so nothing stays open.",
    image: leakClc,
    alt: "Crew luggage being loaded into an aircraft hold",
    otaLabel: "CLC says",
    ota: "Payment $2,180.00 received",
    pms: "11 crew invoices open",
    action: "Payment matched and posted to 11 invoices",
    status: "done",
    amount: "$2,180.00",
    href: "/reconciliation/clc-direct-bill/",
  },
];

export const leakTable = [
  { wrong: "Commission billed on a cancelled booking", spot: "PMS shows a cancellation the OTA still bills", act: "Files the dispute with the folio" },
  { wrong: "Commission billed on nights not stayed", spot: "Folio check-out is earlier than the OTA stay", act: "Prepares the stay update for approval" },
  { wrong: "No-show disputed by the OTA", spot: "Folio shows no arrival and no charge", act: "Answers with folio evidence before the cut-off" },
  { wrong: "Virtual card never charged", spot: "Completed stay with an uncharged card", act: "Charges the card once it is eligible" },
  { wrong: "Penalty charged too early", spot: "Free-cancellation window still open", act: "Blocks the charge and says why" },
  { wrong: "CLC payment not posted to invoices", spot: "Payment lands while invoices stay open", act: "Matches and posts it, invoice by invoice" },
  { wrong: "CLC invoice billed for the wrong nights", spot: "Invoice nights differ from the crew stay", act: "Flags it as your team's task with the fix" },
];

export const steps = [
  {
    n: "01",
    verb: "Reconcile",
    title: "Every reservation, matched every day",
    body: "Aptli reads every reservation from the OTA extranets, virtual cards, the CLC portal and your PMS, and flags each place they disagree.",
    points: ["Daily, not at month-end", "OTA, virtual card and CLC in one pass", "Exact vs fuzzy match, shown plainly"],
    href: "/reconciliation/",
    link: "How reconciliation works",
    image: stepReconcile,
    alt: "A hotel finance manager reviewing reservations on a laptop",
  },
  {
    n: "02",
    verb: "Prove",
    title: "Evidence before anyone files anything",
    body: "Both records side by side, the broken rule named, waivers and comps removed. You see exactly what you are owed, and why.",
    points: ["OTA and PMS records side by side", "Waivers and comps excluded", "Tracked from suspected to received"],
    href: "/finance-truth-engine/",
    link: "See the Finance Truth Engine",
    image: stepProve,
    alt: "Folios and statements being checked with a calculator",
  },
  {
    n: "03",
    verb: "Act",
    title: "The work done, with your approval",
    body: "Aptli files the dispute, charges the card or posts the payment under your rules. Anything outside them waits for one click.",
    points: ["Rules set per property", "One-click approvals", "A full audit trail"],
    href: "/automation/",
    link: "See what runs on its own",
    image: stepAct,
    alt: "A manager approving a card payment from her phone",
  },
];

export const states: { status: Status; title: string; body: string }[] = [
  { status: "done", title: "Taken care of", body: "Aptli finished it under your rules. It shows up in the daily email, with the evidence." },
  { status: "approve", title: "Needs approval", body: "One click from you and Aptli does the rest. Nothing moves without it." },
  { status: "task", title: "Your team's task", body: "Something only your staff can do, like correcting a folio. The fix comes with clear steps." },
  { status: "blocked", title: "Blocked", body: "Aptli stopped on purpose and says why: the cancellation window is open, the card is invalid, or evidence is missing." },
];

export const ladder = [
  { step: "Suspected", body: "Two records disagree." },
  { step: "Validated", body: "Evidence attached, exceptions removed." },
  { step: "Actioned", body: "Dispute filed, card charged or payment posted." },
  { step: "Confirmed", body: "The OTA or CLC accepted it." },
  { step: "Received", body: "The cash is in your account. Only this counts." },
];

export const comparison = {
  columns: ["Reconciliation reports", "Outsourced recovery", "Aptli"],
  rows: [
    { label: "How often discrepancies are found", values: ["When someone runs the report", "On the vendor's schedule", "Every day, reservation by reservation"] },
    { label: "Evidence you can see", values: ["A list of mismatches", "Rarely shared with you", "OTA and PMS records side by side"] },
    { label: "Who does the recovery work", values: ["Your team", "The vendor, out of view", "Aptli, with your approval where it matters"] },
    { label: "Control over what runs", values: ["Not applicable", "Limited", "Rules per property, four clear states"] },
    { label: "When money counts as recovered", values: ["When it is flagged", "Often when it is claimed", "Only when it is received"] },
    { label: "OTA, virtual card and CLC in one view", values: ["Usually one channel", "Varies by vendor", "All three, in one daily email"] },
  ],
};

export const audiences = [
  {
    who: "Owners and ownership groups",
    worry: "Money is leaking and nobody is checking.",
    see: "What leaks, how much control you keep, and how fast you see results.",
    href: "/contact/",
    link: "Get a free leakage review",
    image: whoOwner,
    alt: "A hotel owner standing in his office",
  },
  {
    who: "Management companies",
    worry: "Every property and flag does the back office differently.",
    see: "One view across the portfolio, per-property onboarding and a full audit trail.",
    href: "/management-companies/",
    link: "Aptli for management companies",
    image: whoMgmt,
    alt: "A portfolio team meeting around laptops",
  },
  {
    who: "General managers",
    worry: "Another tool means more work for the front desk.",
    see: "What runs on its own, what needs one click, and what lands on your staff.",
    href: "/automation/",
    link: "See what runs on its own",
    image: whoGm,
    alt: "A front desk agent at a hotel reception",
  },
  {
    who: "Controllers and accounting",
    worry: "Wrong postings, month-end surprises and numbers you can't trace.",
    see: "Evidence for every finding, the verified-cash ladder and respect for your lock window.",
    href: "/finance-truth-engine/",
    link: "See the Finance Truth Engine",
    image: whoController,
    alt: "An accountant checking statements",
  },
  {
    who: "Crew-lodging hotels",
    worry: "A slipping billing speed score and CLC invoices left unpaid.",
    see: "Check-in sync with CheckINN and payments matched to every invoice.",
    href: "/reconciliation/clc-direct-bill/",
    link: "CLC direct-bill reconciliation",
    image: whoCrew,
    alt: "A select-service hotel lobby",
  },
];

/** Status wording must be confirmed with product before launch (brief: content rules). */
export const integrations = [
  { name: "choiceADVANTAGE", kind: "PMS" },
  { name: "HotelKey", kind: "PMS" },
  { name: "SynXis", kind: "Central reservations" },
  { name: "OPERA Cloud", kind: "PMS" },
  { name: "AutoClerk", kind: "PMS" },
  { name: "Expedia", kind: "OTA" },
  { name: "Booking.com", kind: "OTA" },
  { name: "Hotels.com", kind: "OTA" },
  { name: "CLC CheckINN", kind: "Crew lodging" },
];

/** Visible FAQ and FAQPage schema read from this array, so they always match word for word. */
export const faqs = [
  {
    question: "What is Aptli?",
    answer:
      "Aptli is a revenue assurance platform for hotels. It reconciles OTA commissions, OTA virtual cards and CLC direct-bill payments against your PMS every day, proves each discrepancy with evidence, and performs the recovery action with your approval.",
  },
  {
    question: "How is Aptli different from an OTA reconciliation report?",
    answer:
      "A report shows you a list of mismatches and leaves the work to your team. Aptli attaches the OTA and PMS evidence to each finding, does the recovery work under rules you set, and only counts money as recovered when it is received.",
  },
  {
    question: "Which channels does Aptli check?",
    answer:
      "Aptli checks OTA commissions from Expedia, Booking.com and Hotels.com, OTA virtual cards, and CLC direct-bill payments and check-ins. Each one is matched against your PMS every day, reservation by reservation.",
  },
  {
    question: "Does Aptli act without my approval?",
    answer:
      "Only inside rules you set for each property. Everything Aptli finds lands in one of four states: taken care of, needs approval, your team's task, or blocked. Anything outside your rules waits for one click from you.",
  },
  {
    question: "Does Aptli store card numbers?",
    answer:
      "No. Aptli stores only the last four digits of a card. Each property gives its own consent, one authorized user acts in the PMS, and every action is written to an audit trail.",
  },
  {
    question: "Which PMS does Aptli work with?",
    answer:
      "Aptli is built for the systems select-service and extended-stay hotels run, including choiceADVANTAGE, HotelKey, SynXis, OPERA Cloud and AutoClerk. Some connectors are live and others are rolling out, so ask us about yours.",
  },
  {
    question: "What is the free leakage review?",
    answer:
      "You share read access for one property. Aptli reconciles its recent OTA, virtual card and CLC activity, and we walk you through every finding with the evidence, so you can see what is leaking before you decide anything.",
  },
  {
    question: "When does Aptli count money as recovered?",
    answer:
      "Only when it arrives. Every amount moves through five steps: suspected, validated, actioned, confirmed by the OTA or CLC, and received. Aptli reports the received amount as recovered and keeps everything else visible as pending.",
  },
];
