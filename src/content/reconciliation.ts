/**
 * Reconciliation hub (/reconciliation/). Copy from docs/content/reconciliation.md (kavan-content-writing).
 * Keep the two in step. Plain words, no invented numbers: every amount is labelled "Example".
 * To confirm (client): fuzzy-match fields, the daily run, live vs rolling-out PMS connectors.
 */

/** The four money flows the page explains (the three channels + the PMS they are checked against). */
export const channels = [
  {
    key: "ota",
    name: "OTA commission",
    systems: "Expedia, Booking.com, Hotels.com",
    href: "/reconciliation/ota-commission/",
    link: "OTA commission reconciliation",
    compares: "Booking status, stay dates and nights against the folio",
    catches: ["Commission on cancelled bookings", "Commission on nights not stayed", "Commission on disputed no-shows"],
  },
  {
    key: "vcc",
    name: "OTA virtual cards",
    systems: "Prepaid OTA bookings",
    href: "/reconciliation/virtual-card/",
    link: "OTA virtual card reconciliation",
    compares: "Card amount, charge date and free-cancellation window against the stay",
    catches: ["Cards never charged", "Charges made too early", "Amounts that don't match the stay"],
  },
  {
    key: "clc",
    name: "CLC direct bill",
    systems: "Crew lodging through CheckINN",
    href: "/reconciliation/clc-direct-bill/",
    link: "CLC direct-bill reconciliation",
    compares: "Crew check-ins, check-outs, invoices and payments against PMS stays and AR",
    catches: ["Crew stays not synced", "Payments not posted to open invoices", "Invoices billed for the wrong nights"],
  },
] as const;

/** What Aptli reads from the PMS (the record every channel is checked against). */
export const pmsReads = ["Folios", "Stays and check-outs", "Accounts receivable"];

/** The daily match, in order. */
export const flowSteps = [
  { title: "Read the records", body: "OTA extranets, virtual cards, the CLC portal and your PMS." },
  { title: "Pair each reservation", body: "By confirmation number first, so both records describe the same stay." },
  { title: "Compare the stay and the money", body: "Status, nights, dates, amounts and payments, line by line." },
  { title: "Flag every difference", body: "As a finding, with the OTA and PMS records side by side." },
];

/** Monthly vs daily. The windows row stays general on purpose: each OTA sets its own terms. */
export const cadence = [
  { label: "When problems are found", monthly: "Weeks after check-out", daily: "Soon after the records change" },
  { label: "Dispute and reporting windows", monthly: "Some may have closed", daily: "Still open in most cases" },
  { label: "Evidence", monthly: "Gathered by hand later", daily: "OTA and PMS records attached to each finding" },
  { label: "Work for your team", monthly: "A spreadsheet project at month-end", daily: "A short list of findings to review" },
  { label: "Month-end close", monthly: "Surprises to chase", daily: "Most issues already handled" },
];

/** Reconcile → Prove → Act (the only numbered sequence on the site). */
export const sequence = [
  { verb: "Reconcile", title: "Match every reservation", body: "OTA, virtual card and CLC records against your PMS, every day.", href: null },
  {
    verb: "Prove",
    title: "Confirm what is really owed",
    body: "The Finance Truth Engine checks each finding against the evidence before anything moves.",
    href: "/finance-truth-engine/",
    link: "See the Finance Truth Engine",
  },
  {
    verb: "Act",
    title: "Fix it in the right system",
    body: "Automation files the dispute, charges the card or posts the payment, with your approval where your rules ask.",
    href: "/automation/",
    link: "See Automation",
  },
] as const;

/** Visible FAQ = FAQPage schema (passed to faqSchema as is). Same text as the draft, word for word. */
export const recFaqs: { question: string; answer: string }[] = [
  {
    question: "How often should a hotel reconcile OTA bookings?",
    answer:
      "Daily is best. Commission errors, uncharged virtual cards and unposted CLC payments are easiest to fix while the stay is recent and OTA dispute windows are still open. Many hotels reconcile monthly because the work is manual. Aptli runs the check every day, so your team only reviews the findings that need them.",
  },
  {
    question: "Which channels does Aptli reconcile?",
    answer:
      "Aptli reconciles OTA commissions from Expedia, Booking.com and Hotels.com, OTA virtual cards, and CLC direct-bill crew stays and payments. Each one is matched against your PMS reservation by reservation, so commission, card and crew-lodging leaks show up in one daily view instead of three separate reports.",
  },
  {
    question: "Does reconciliation change anything in my PMS?",
    answer:
      "No. Reconciliation only reads your PMS, the OTA extranets and the CLC portal to compare records. Nothing is posted or changed during this step. Actions such as filing a dispute or posting a payment happen later, under rules you set for each property, and the ones that need approval wait for you.",
  },
  {
    question: "What is a fuzzy match, and is it safe?",
    answer:
      "A fuzzy match pairs an OTA or CLC record with a PMS reservation using details like guest name, stay dates and amount, because the confirmation number is missing or different. It is safe because Aptli never acts on a fuzzy match by itself. A person on your team confirms the pair before anything moves forward.",
  },
  {
    question: "Do I need to replace my PMS or channel manager?",
    answer:
      "No. Aptli works alongside the PMS you already run, including choiceADVANTAGE, HotelKey, SynXis, OPERA Cloud and AutoClerk. Some connectors are live and others are rolling out, so tell us yours when you book the free leakage review and we will confirm the setup for your property.",
  },
  {
    question: "How is this different from an OTA statement or a monthly report?",
    answer:
      "An OTA statement shows what the OTA billed, and a monthly report lists mismatches after the fact. Aptli compares every reservation against your PMS each day and attaches both records to each finding as proof. Then it hands the finding on to be fixed, so your team is not left chasing a spreadsheet.",
  },
  {
    question: "Can Aptli reconcile more than one property?",
    answer:
      "Yes. Each property is connected with its own consent and its own rules, and the findings roll up so a management company can see every property in one place. You can start with one property in the free leakage review and add the others once you have seen the findings.",
  },
];
