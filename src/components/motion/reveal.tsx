/**
 * Thin wrappers over the site-wide `data-reveal` system (see auto-reveal.tsx).
 * Server-rendered divs: the text is in the HTML, GSAP animates it in on scroll.
 */
type DivProps = React.HTMLAttributes<HTMLDivElement> & { delay?: number; y?: number };

/** Fade-up block. `y`/`delay` are accepted for older call sites and ignored (batch handles timing). */
export function Reveal({ children, delay: _d, y: _y, ...props }: DivProps) {
  void _d;
  void _y;
  return (
    <div data-reveal="card" {...props}>
      {children}
    </div>
  );
}

/** Plain container; its RevealItems stagger in automatically when they enter together. */
export function RevealGroup({ children, stagger: _s, ...props }: React.HTMLAttributes<HTMLDivElement> & { stagger?: number }) {
  void _s;
  return <div {...props}>{children}</div>;
}

export function RevealItem({ children, y: _y, ...props }: DivProps) {
  void _y;
  return (
    <div data-reveal="card" {...props}>
      {children}
    </div>
  );
}
