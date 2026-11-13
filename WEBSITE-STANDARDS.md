# Aptli website standards

**Every page and every section must meet this file.** Read it before building or editing anything.
If a request conflicts with this file, follow the request and update this file in the same change.

- Source brief: [docs/website-brief.docx](docs/website-brief.docx) (Nov 9, 2026). Sitemap diagram: [docs/sitemap.png](docs/sitemap.png).
- Product reference (logged-in app wireframe): https://revassure-wireframe.vercel.app/
- Live design tokens and components: run `npm run dev` and open `/design-system/`.

---

## 0. Definition of done (check every page against this)

A page is not done until every box is true.

**Design**
- [ ] Page content is wrapped in `<PageMain>`, and every section uses `data-reveal` entry animations.
- [ ] Uses `<Section>` + `<Container>` (1540px). No custom max-widths except `max-w-measure` / `max-w-[Nch]` on text.
- [ ] Soft-white grounds (`paper`, `paper-2`, `surface`), ink type, red used only per the colour rules (§2.1).
- [ ] Has one distinctive moment (a ledger table, a number, a motion beat), and everything around it stays calm.

**Responsive** (kavan-responsive-skill, §3)
- [ ] Only the 16 breakpoints, written desktop-first (`max-bp*:`).
- [ ] `responsive-audit.mjs` shows **0 errors** at all 17 widths (1920 → 320), and the screenshots have been reviewed.
- [ ] No horizontal scroll, no word broken mid-word, body ≥16px on mobile, tap targets ≥44px at ≤1199.

**Motion** (§4)
- [ ] Transform/opacity only. Holds 60fps in the Chrome Performance panel with 4× CPU throttle.
- [ ] Works with `prefers-reduced-motion` (content visible, no movement).
- [ ] Above-the-fold text is visible at first paint (CSS `animate-rise`, never JS-hidden). The only exception is the first-visit preloader (§4), and hero entry delays must use `var(--intro)`.

**SEO / AEO / GEO** (§5)
- [ ] `export const metadata = pageMetadata({...})`: title ≤60 chars, description ≤155, canonical, OG.
- [ ] One H1 with the page's primary keyword. H2s phrased as buyer questions.
- [ ] Section intro ≤2 lines (client rule). The 40–60 word direct answer sits in the body or FAQ and makes sense on its own.
- [ ] FAQ (5–8 questions) where the brief asks for it, plus matching `faqSchema` word for word.
- [ ] JSON-LD per the schema map. BreadcrumbList on every page below home.
- [ ] Internal links: up to the parent service, across to sibling solutions, and to the primary CTA.
- [ ] Page added to `launchPages` (`live: true`) in `src/lib/site.ts` and to `public/llms.txt`.

**Content** (§6)
- [ ] Plain words a GM reads in one pass (aim for US grade 7–9). No hype words. No unverified numbers.
- [ ] CTA labels name the action. Never "Submit" or "Learn more".

**Quality**
- [ ] `npm run check` passes (types + lint). `npm run build` passes.
- [ ] Lighthouse mobile: Performance ≥90, Accessibility 100, Best Practices 100, SEO 100.

---

## 1. Project at a glance

| | |
|---|---|
| Framework | Next.js 16.4 (App Router, `src/`, TypeScript, Turbopack, Cache Components + Partial Prefetching) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` in `src/app/globals.css`) |
| Motion | GSAP 3.15 (+ ScrollTrigger, SplitText, `@gsap/react`), Lenis 1.3 smooth scroll, Motion 14 (`motion/react`, the Framer Motion API) |
| Fonts | Plus Jakarta Sans (headings, buttons, UI) + Inter (body), both variable and self-hosted via `next/font`. No serif or script fonts. |
| SEO | `pageMetadata()`, typed JSON-LD (`schema-dts`), `robots.ts`, `sitemap.ts`, `manifest.ts`, `public/llms.txt` |

```
src/
  app/                 routes. layout.tsx = fonts, metadata base, Org + WebSite schema, providers
    globals.css        ALL design tokens + base styles (read §2)
    design-system/     internal token/component preview (noindex)
  components/
    providers/         Providers (LazyMotion, MotionConfig), SmoothScroll (Lenis ↔ GSAP ticker)
    ui/                Container, Section, Button, StatusChip, Logo
    motion/            Reveal / RevealGroup / RevealItem (Motion), SplitReveal (GSAP)
    seo/               JsonLd
    sections/          (create) page sections, one file per section
  lib/
    site.ts            brand facts, entity sentence, nav, launchPages: the single source of truth
    seo.ts             pageMetadata(), absoluteUrl()
    schema.ts          organization/website/software/service/faq/breadcrumb builders
    motion.ts          shared eases, durations, staggers, breakpoint helpers
    gsap.ts            the only place GSAP plugins are registered
    lenis-store.ts     useLenis(), scrollToTarget()
    cn.ts              className merge (knows our custom text-* tokens)
public/brand/          aptli-logo-dark.png (light site), aptli-logo-light.png (dark bands), aptli-mark.png
```

Commands: `npm run dev` · `npm run build` · `npm run check` (tsc + eslint) · `npm run format` · `npm run audit:responsive`.

> Next 16 has breaking changes. Before you use any Next API you are unsure of, read `node_modules/next/dist/docs/` (see AGENTS.md).

---

## 2. Design system

**Direction:** a well-kept ledger, not a startup landing page. The site is calm, exact and built around real reconciliation rows. Soft white and ink, with Aptli red as the one accent.

> **Override of the brief:** the brief proposed "ledger green". The client chose a white theme with the logo red as the accent (Nov 13, 2026). Status-chip colours stay as the brief says, because they must match the product.

### 2.1 Colour (tokens in `globals.css`. Never hard-code hex in components.)

| Token | Hex | Use |
|---|---|---|
| `paper` | #FAFAF7 | Page background (soft white) |
| `paper-2` / `paper-3` | #F3F2EE / #EBE9E3 | Alternate bands, wells |
| `surface` | #FFFFFF | Cards, tables, panels |
| `ink` / `ink-2` | #141413 / #2A2926 | Headings, body, dark bands |
| `muted` / `subtle` | #55534D / #6B6862 | Secondary text / captions (both AA on paper) |
| `line` / `line-strong` | #E6E4DE / #D8D5CD | Borders, dividers |
| `brand-500` | #EC5224 | **Logo red.** Marks, icons, numbers, large text ≥24px only (3.46:1) |
| `brand-600` | #D4410F | Filled red buttons with white text (4.60:1, AA) |
| `brand-700` | #B2350C | Red text and links on paper (5.89:1, AA) |
| `highlight` | #F2C14E | The ledger highlighter, **only** on the number that disagrees |
| `ok` `approve` `task` `block` (+ `-bg`) | | The four status chips: Taken care of / Needs approval / Your team's task / Blocked |

Red rules:
- Red is the accent, not the paint. At most about 5% of any screen is red.
- Use `variant="brand"` (red) only for the money CTA, "Get a free leakage review". Every other action uses ink (`primary`), `secondary` or `ghost`.
- Never set body text in `brand-500`. Use `brand-700` for red text.
- Status is never shown by colour alone. Every chip carries its words.
- Avoid navy-and-gold and SaaS blue gradients (competitor look). No stock photos.

### 2.2 Typography
**Fonts (client choice, Nov 13, 2026):** Plus Jakarta Sans for headings and UI (`font-display`), Inter for body. The serif italic accent was rejected as "childish". Emphasis words use `<em className="accent">`, which renders a **red highlight block with white ExtraBold text** (SFS style). Use it on 1–4 words per heading, at most once per heading.

Tailwind utilities: `text-display` `text-h1`…`text-h6` `text-lead` `text-body` `text-small` `text-caption` `text-button` `text-nav` `text-table`. Each carries its own line-height and tracking.

| Token | 1920 → 320 | Use |
|---|---|---|
| `text-display` | 88 → 36 (32 at ≤374) | Homepage hero only |
| `text-h1` | 72 → 34 (30 at ≤374) | Inner-page H1 |
| `text-h2` | 56 → 28 | Section headings |
| `text-h3` / `h4` | 40 → 22 / 30 → 20 | Sub-sections, cards |
| `text-lead` | 22 → 17 | Intro paragraphs |
| `text-body` | 18 → 16 | Default body |
| `text-small` / `caption` | 15 → 14 / 13 → 12 | Meta, labels, sources |

- Sentence case for every heading, button and label. No ALL-CAPS eyebrows.
- Weights: 400 body, 500 UI and labels, 600 headings. Use 700+ rarely.
- Line length 45–75 characters: use `max-w-measure` (65ch) on paragraphs and `max-w-[14–20ch]` on headings.
- Tabular figures: add `.num` **only** to pure-number elements (counts, step numbers, integer columns). The `tnum` feature also widens commas and full stops, so it puts gaps into prose and money ("commission ,", "$932 .00"). Never apply it to tables, `<data>` or text globally. To line up amounts in tables, right-align the column.
- **Longest-word test:** "reconciliation" (14 letters) must fit at 320. It does at the current floors. Check again if you add longer words or bigger sizes.

### 2.3 Layout and container

**Container: 1540px** (`.container-site`, the default in `<Section>`). On a 1920 screen that leaves 190px margins, which is what premium B2B sites use. A 1920 container leaves no breathing room and makes scanning harder.
- `wide` = 1760px for full-bleed product visuals that still need an edge.
- `prose` = 72ch for guides, glossary and legal pages.
- **Full-bleed backgrounds** (bands, gradients, images) go on the `<section>` itself, never inside the container.
- Side gutter is fluid, 48px → 16px (`--spacing-gutter`).
- Vertical rhythm: `py-section-y` (140 → 56), `py-section-y-sm` (96 → 40), stacks `stack-xl/lg/md`, grid gap `gap-grid-gap` (32 → 16).
- Content is left-aligned by default. Centre text only for short CTA bands.
- Grids collapse with explicit columns per breakpoint (`grid-cols-3 max-bp992:grid-cols-1`) or `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`.
- Every flex/grid child that holds text gets `min-w-0`.

### 2.3b Client layout rules (Nov 13, 2026, do not regress)
- **Section headers are centred:** tag → heading (max 2 lines) → one supporting line of **max 2 lines (~150 characters)**. Never put the heading on the left with text on the right. Use `<SectionIntro align="center">`.
- **Photos stay clean:** at most **one** small tag on a photo (for example an amount or a live label). Never layer cards, receipts or tables over photos. Anything people need to read goes beside the photo.
- **Hero = SFS style:** a full-bleed photo with a dark wash, the H1 (3 lines on desktop), one short sentence, two buttons and the red quick-path tiles. Nothing else on top.
- **No full stops at the end of headings.** Plus Jakarta's full stop looks detached at display sizes. Use commas to join clauses.
- AEO 40–60 word answers live in the section body copy and the FAQ, not in section intros.

### 2.4 Components (build new ones in the same style)
`Section`, `Container`, `Button` (`primary` | `brand` | `secondary` | `ghost` | `inverse`; `md` | `lg`; `arrow`), `StatusChip`, `Logo`, `JsonLd`, `Reveal`, `RevealGroup` + `RevealItem`, `SplitReveal`.
Still to build, from the brief: sticky header with nav and dropdown, ledger table, leak table, comparison table, numbered Reconcile → Prove → Act sequence (the **only** place with numbered markers), verified-cash ladder, FAQ accordion (native `<details>`/`<summary>`), integration logo card, quote block, CTA band, footer.

- Tables are real HTML `<table>` elements, wrapped in `.table-scroll` so they scroll inside their own box on phones.
- Radius: cards 20–28px, inputs 10–12px, **buttons 14px (`--radius-btn`), never pills**, tags 10px. `rounded-pill` is only for tiny status chips and avatars-dots.
- Buttons: always `<Button>` (label block + attached arrow box, colour-wipe hover). Card links: `<ArrowLink>`.
- Shadows are soft and warm (`shadow-sm/md/lg`). Prefer a 1px `ring-line` to heavy shadows.

### 2.5 Reference sites
The client will supply reference websites for section layouts and animation. Record each one here with **what to borrow** (layout, motion beat, interaction) and **what not to copy** (brand, copy, assets). Never recreate a reference site's look 1:1.

| Reference | Borrow | Used on |
|---|---|---|
| _(to be added)_ | | |

---

## 3. Responsive (kavan-responsive-skill, mandatory)

Desktop-first. The base design is 1920 with no prefix. Override downwards with **only** these variants (Tailwind's `sm/md/lg/xl/2xl` are deleted):

| Variant | Media query | Check at |
|---|---|---|
| `max-bp1800:` | max-width 1799 | 1792 |
| `max-bp1700:` | 1699 | 1680 |
| `max-bp1680:` | 1679 | 1600 |
| `max-bp1600:` | 1599 | 1536 |
| `max-bp1500:` | 1499 | 1440 |
| `max-bp1400:` | 1399 | 1366 |
| `max-bp1300:` | 1299 | 1280 (4-col → 3) |
| `max-bp1200:` | 1199 | 1024 (touch begins: 44px targets) |
| `max-bp1024:` | 1023 | 992 |
| `max-bp992:` | 991 | 801 (split sections stack, nav collapses) |
| `max-bp801:` | 800 | 768 |
| `max-bp768:` | 767 | 576 (phone layout) |
| `max-bp576:` | 575 | 481 (1 column, full-width buttons) |
| `max-bp481:` | 480 | 390 |
| `max-bp390:` | 389 | 375 |
| `max-bp375:` | 374 | 320 |

In JS (gsap.matchMedia), use `below("bp992")` / `above("bp992")` from `src/lib/motion.ts`.

Rules:
- Never invent breakpoints. Fix in-between issues fluidly (clamp, min(), %, wrap, auto-fit).
- No horizontal overflow. `overflow-x: clip` on `<Section>` contains animation offsets. Never put `overflow-x: hidden` on html or body.
- Use `100svh` / `100dvh` (`min-h-svh`), never a raw `100vh`. Use `env(safe-area-inset-*)` for fixed bars.
- Images: `next/image` with a correct `sizes`, plus `aspect-ratio` and `object-cover`.
- Hover-only effects go inside `@media (hover: hover)` (Tailwind v4's `hover:` already does this).

**Audit before calling any UI done:**
```bash
npm run dev   # in another terminal
node ~/.claude/skills/kavan-responsive-skill/scripts/css-lint.mjs .
node ~/.claude/skills/kavan-responsive-skill/scripts/responsive-audit.mjs http://localhost:3000/<page>/ --out ./responsive-audit
# final sign-off: add --edges, and run again with --reduced-motion
```
Fix until there are 0 errors, review the screenshots (at least 1920, 1440, 1280, 1024, 768, 390, 320), then report the per-width table.

---

## 4. Animation and 60fps

Every library has one job. Don't mix them on the same element.

| Tool | Job |
|---|---|
| **CSS** (`motion-safe:animate-rise`, `animate-fade`, transitions) | Above-the-fold load-in (hero) and hover/press states. Visible at first paint, good for LCP. |
| **GSAP + ScrollTrigger + SplitText** | Scroll-linked work: pinned sections, scrubbed timelines, line/word reveals, number count-ups, the hero ledger's verdict chips settling row by row. |
| **Motion** (`m.*` from `motion/react`) | Component state: menus, dropdowns, accordions, tabs, `AnimatePresence`, layout animations, simple in-view reveals (`Reveal`). |
| **Lenis** | Smooth wheel scrolling, driven by the GSAP ticker (one RAF loop). Off for reduced motion. Native touch momentum on phones. |

60fps rules:
1. Animate **only** `transform` and `opacity` (GSAP: `x`, `y`, `scale`, `rotate`, `autoAlpha`). Never animate `width`, `height`, `top`, `left`, `margin`, `box-shadow` or `filter: blur` on large areas.
2. Use `will-change` only while animating (GSAP sets `force3D` itself). Never leave it on permanently.
3. Use one RAF loop. Never call `requestAnimationFrame` loops alongside Lenis. Use `gsap.ticker`.
4. Wrap every GSAP animation in `useGSAP(() => {...}, { scope: ref })`. It reverts on unmount **and** when Next hides a route with `<Activity>`.
5. Branch with `gsap.matchMedia()` using `mediaConditions` (`okMotion` / `reduceMotion`, `desktop` / `mobile`). Pin and scrub on desktop only, and keep phone versions simple.
6. Use `ScrollTrigger` with `once: true` for reveals. Use `scrub: true` only for deliberate story moments.
7. Motion uses `LazyMotion strict`, so write `m.div`, never `motion.div`.
8. Animation start offsets must never cause overflow. `<Section>` clips x, and you must test at 320.
9. Keep durations at 0.3–1.0s and staggers at 0.04–0.14s. Use the shared eases in `src/lib/motion.ts` (`expo.out` / `[0.22,1,0.36,1]`).
10. Keep motion to one memorable beat per section. Don't fade in every block on scroll (the brief asks for restraint).
11. Lazy-load heavy, below-the-fold interactive sections with `next/dynamic`.
12. Verify: Chrome DevTools → Performance → 4× CPU slowdown. There should be no long tasks during scroll and no layout shift.

**Preloader (client request, Nov 13, 2026):** `src/components/layout/preloader.tsx`, mounted once in the root layout.
- **Sequence:** an odometer runs 000 → 100, the channels tick off, and Reconcile → Prove → Act plays. Then five ink shutters split away and a red curtain lifts.
- **CSS only:** it uses pure CSS and transform/opacity only, so it plays and hides itself even without JS. Total length is about 2.85s.
- **When it shows:** once per browser session (an inline script sets `data-intro="skip"` on `<html>`). It is never shown with reduced motion.
- **Scroll:** `PreloaderLock` holds scroll until the CSS animation ends, then sets `data-intro="done"`.
- **Hero timing:** first-paint hero animations add `var(--intro)` to their delay so they play as the curtain lifts. `--intro` is 0s when the preloader is skipped or done.
- **Rules:** never make it longer, never block clicks (`pointer-events: none`), and never gate content on JS.

Entry animations (SFS style): add `data-reveal` (fade up), `data-reveal="card"`, `"tag"`, `"line"` or `"pop"` to any element. Every page **must** wrap its content in `<PageMain>`, which mounts the system after the page hydrates. Never put `data-reveal` on an element that is centred with a Tailwind `translate-*` class: put it on an inner element (GSAP sets `translate: none` while animating).

Scroll helpers: `useLenis()` returns the instance (or `null` when smooth scroll is off). Use `scrollToTarget("#id")` for buttons that scroll. Plain `<a href="#id">` anchors are handled automatically with the header offset.

---

## 5. SEO, AEO and GEO

**Page spine (every page):** keyword H1 → 40–60 word direct answer → proof → questions (FAQ) → one primary CTA.

Technical:
- All page text must be in server-rendered HTML. Never render content only on the client. Client components may animate text, but the text itself must still be in the HTML.
- Metadata: `export const metadata = pageMetadata({ title, description, path })`. The dev console warns when length limits are broken.
- URLs: lowercase, hyphenated, trailing slash (`trailingSlash: true`), no dates. Changing a URL after launch needs a 301 in `next.config.ts`.
- One H1 per page, and headings in order (no skipped levels).
- Images: descriptive `alt`, AVIF/WebP via `next/image`, explicit dimensions. Use `priority` only for the LCP image.
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Never call `new Date()` / `Math.random()` while rendering a Server Component (it breaks Cache Components). Use fixed dates from `site.ts`.

AEO (answer engines):
- Open each section with the answer (40–60 words) before the detail.
- Phrase H2s as questions buyers actually ask: "What is OTA reconciliation?"
- Put comparisons and lists in real `<table>` / `<ul>` elements, never images.
- FAQ visible text and `faqSchema` must match word for word.

GEO (AI search):
- Use the entity sentence (`site.entity`) verbatim on home, About, schema and directories.
- Keep `public/llms.txt` updated with every new page.
- `robots.ts` already allows GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended and Applebot-Extended.
- Write citable facts: specific, sourced and dated. Name systems and deadlines plainly (Expedia, Booking.com, CLC CheckINN, free-cancellation window).
- Planned: an "Aptli for AI" facts page.

Schema map (`src/lib/schema.ts`):

| Schema | Pages |
|---|---|
| Organization, WebSite | Sitewide (already in layout) |
| SoftwareApplication | Home, service pages |
| Service | Each service and solution page |
| FAQPage | Every page with an FAQ |
| BreadcrumbList | Every page below home |
| HowTo | Step-by-step guides |
| DefinedTermSet / DefinedTerm | Glossary |
| Article + author Person | Resources / blog |

Keyword map (one primary keyword per page. Confirm volumes in Semrush before writing):

| Page | Primary keyword | Questions to answer |
|---|---|---|
| `/` | hotel revenue reconciliation | What is Aptli? Where do hotels lose money between the OTA and the PMS? |
| `/reconciliation/` | OTA reconciliation for hotels | What is OTA reconciliation? Daily vs monthly? |
| `/reconciliation/ota-commission/` | OTA commission reconciliation | Can I get commission back on a cancelled booking? How do I report a no-show to Booking.com? |
| `/reconciliation/virtual-card/` | OTA virtual card reconciliation | What is an OTA virtual card? Why do hotels miss VCC payments? When can I charge a VCC? |
| `/reconciliation/clc-direct-bill/` | CLC direct bill reconciliation | How do I improve my CheckINN score? Why are CLC invoices open after payment? |
| `/finance-truth-engine/` | hotel financial intelligence | How do I know a discrepancy is real before I dispute it? |
| `/automation/` | hotel back office automation | Is it safe to automate card charges? What needs approval? |
| `/management-companies/` | revenue assurance for hotel management companies | How do I standardise reconciliation across properties? |
| `/security/` | hotel PMS data security | Does Aptli store card numbers? Who can act in our PMS? |
| `/glossary/` | one term per entry | What does each term mean in plain words? |

**Research before writing each page:** run a live SERP and competitor teardown for the primary keyword (Semrush plus web search). Competitors are x·quic, reconcileOTA, Evention, Otelier and RobosizeME. Note the questions they answer and the gaps they leave (evidence, approval control, CLC coverage), then write to fill those gaps.

---

## 6. Content and copy

**Voice:** plain, specific and calm, like a good controller explaining a variance to an owner. Short sentences. One idea per paragraph.

- **Use hotel words:** folio, night audit, extranet, check-out, AR, GM, no-show, free-cancellation window.
- **Never use internal words:** L0–L4, Exposure, case IDs, engine names, sprint names, client names, "Tier-2", status codes like `UNDER_REVIEW`.
- **Never use hype:** revolutionary, magic, AI-powered, seamless, cutting-edge, game-changing, unlock, supercharge.
- **Sentence case** everywhere.
- **Buttons name the action:** "Get a free leakage review", "See how it works", "Talk to us about your portfolio", "Download the guide". Never "Submit" or "Learn more".
- **Write for both audiences** on every key page: the owner's money question ("what am I losing?") and the GM's workload question ("does this add work for my team?").
- **The three services always appear in this order:** Reconciliation (Reconcile) → Finance Truth Engine (Prove) → Automation Action (Act).

Claims and proof (the site follows the product's own rule: nothing counts as recovered until it is received):
- No averaged savings figures. Use worked examples with real amounts, labelled "Example".
- No PCI or certification claims until they are granted. Say "Only the last four digits of a card are stored."
- Only list live integrations as live. Mark the rest "Rolling out".
- Customer quotes need written approval and a name, title and property type (or an approved anonymised line).
- OTA deadlines and rules must be checked against current partner docs and dated on the page.
- Trademark line in the footer (`trademarkLine` in `site.ts`). Partner logos only with permission.

Message pillars (one per page minimum): proof, not suspicion · you stay in control · recovered means received · one view of OTA, VCC and CLC · built by hotel operators.

---

## 7. Accessibility (WCAG 2.2 AA, non-negotiable)

- Text contrast ≥4.5:1 (large text ≥3:1). The token table above is pre-checked. Don't invent new pairs.
- Visible focus on everything (global `:focus-visible` ring in `brand-600`).
- Real `<button>` / `<a>` / `<label>` elements, a skip link (in layout), `<main id="main">` on every page.
- Tap targets ≥44px at ≤1199 (Button `min-h-11`). **Exception (client request, Nov 13 2026):** the footer's text link lists use compact 24px targets with 6px gaps. That still meets WCAG 2.2 AA target size (2.5.8, 24×24 minimum). Do not go below 24px anywhere.
- Status never shown by colour alone. Decorative SVGs get `aria-hidden`.
- Respect reduced motion (CSS + Motion + GSAP + Lenis all handle it, so keep it that way).
- Forms: 6 fields maximum (first name, last name, work email, phone, number of properties, PMS used), inputs ≥16px, inline errors that are announced to screen readers. Never ask for card numbers or passwords.

---

## 8. Conversion and tracking

- **Primary:** "Get a free leakage review" → short form → book a call → consent and read access → findings walkthrough.
- **Secondary:** download a guide → email nurture. **Portfolio:** "Talk to us about your portfolio". **Partner:** "Partner with Aptli".
- Tracking (when added): GA4 events for CTA click, form start, form submit and call booked. UTM conventions. A cookie banner with a real decline option.

---

## 9. Open decisions (from the brief, these block final copy)

1. Domain (aptli.ai?) and whether "RevAssure" appears as a product name. `NEXT_PUBLIC_SITE_URL` controls the domain.
2. Which PMS connectors are live vs rolling out (choiceADVANTAGE, HotelKey, SynXis, OPERA Cloud, AutoClerk).
3. PCI status wording.
4. Leakage review offer: the period covered, and whether it is free.
5. Pricing: publish it, show "from" pricing, or keep it for the call.
6. Founder story and at least one approved customer quote.
7. CMS / hosting (must serve full HTML).
