import { AutoReveal } from "@/components/motion/auto-reveal";

/**
 * Every page renders its content inside <PageMain>. It provides the skip-link target
 * (#main) and mounts the scroll-entry system AFTER the page's own content, so the
 * reveal effect only runs once this page has hydrated (no hydration mismatch).
 */
export function PageMain({ children }: { children: React.ReactNode }) {
  return (
    <main id="main">
      {children}
      <AutoReveal />
    </main>
  );
}
