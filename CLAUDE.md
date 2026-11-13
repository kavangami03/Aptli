@AGENTS.md
@WEBSITE-STANDARDS.md

# Working on this project

- Aptli marketing website (hotel revenue reconciliation). Read WEBSITE-STANDARDS.md before any page or section work; its "Definition of done" applies to every page.
- Load the `kavan-responsive-skill` for any UI work and run its audit to 0 errors before calling a page done.
- Brand facts, nav and the launch page list live in `src/lib/site.ts`. Do not hard-code them elsewhere.
- Design tokens live only in `src/app/globals.css` (`@theme`). Do not hard-code colours or font sizes in components.
