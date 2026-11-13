# Aptli website

Marketing website for **Aptli**, the revenue assurance platform for hotels: Reconcile → Prove → Act.

**Before building anything, read [WEBSITE-STANDARDS.md](WEBSITE-STANDARDS.md).** Its "Definition of done" applies to every page.

## Stack
Next.js 16 (App Router, Cache Components) · Tailwind CSS v4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis · Motion (Framer Motion) · TypeScript.

## Commands
```bash
npm run dev               # http://localhost:3000  (design tokens preview: /design-system/)
npm run build             # production build
npm run check             # typecheck + lint
npm run format            # prettier (+ Tailwind class sorting)
npm run audit:responsive  # kavan responsive audit at 17 widths (dev server must be running)
```

## Config
- `NEXT_PUBLIC_SITE_URL`: canonical domain (default `https://aptli.ai`, still to be confirmed).

## Docs
- `docs/website-brief.docx`: the original brief. `docs/sitemap.png`: the 14-page sitemap.
- Product wireframe: https://revassure-wireframe.vercel.app/
