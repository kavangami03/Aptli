import Image from "next/image";
import { site } from "@/lib/site";
import { PreloaderLock } from "./preloader-lock";

const channels = ["Booking.com", "Expedia", "Hotels.com", "Virtual cards", "CLC", "Your PMS"];
const words = ["Reconcile", "Prove", "Act"];

/**
 * First-visit intro: "the ledger checks itself, then lifts away".
 *   0.1–1.6s  counter ticks 000 → 100, channels tick off one by one, Reconcile → Prove → Act
 *   1.7s      the stage drifts up and fades
 *   1.85s     five ink shutters split away (alternating up/down), a red curtain follows
 *   ~2.15s    the hero headline starts rising as the curtain lifts (via --intro)
 * Pure CSS + transform/opacity, so it runs before hydration and never depends on JS to finish.
 * Shown once per session; skipped for reduced motion (see globals.css "Preloader").
 */
export function Preloader() {
  return (
    <>
      {/* Runs during HTML parse, before first paint: skip on repeat visits in this session. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{var d=document.documentElement;if(sessionStorage.getItem("aptli-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="skip"}else{sessionStorage.setItem("aptli-intro","1")}}catch(e){}`,
        }}
      />
      <div className="preloader" aria-hidden="true">
        <div className="pl-curtain" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="pl-panel" style={{ "--i": i } as React.CSSProperties} />
        ))}

        <div className="pl-stage">
          <div className="pl-top">
            <Image src={site.logoOnDark} alt="" width={1280} height={371} loading="eager" sizes="160px" className="pl-logo" />
            <p className="pl-caption">
              <span className="pl-live" />
              Revenue assurance for hotels
            </p>
          </div>

          <div className="pl-center">
            {/* Crisp 000 → 100 counter: an animated integer (@property) shown via a 3-digit counter style */}
            <p className="pl-count">
              <span className="pl-num" />
              <span className="pl-pct">%</span>
            </p>

            <ul className="pl-chips">
              {channels.map((c, i) => (
                <li key={c} className="pl-chip" style={{ "--d": `${0.3 + i * 0.2}s` } as React.CSSProperties}>
                  <span className="pl-tick">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  </span>
                  <span className="pl-chip-label">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pl-bottom">
            <span className="pl-bar" />
            <div className="pl-bottom-row">
              <span className="pl-words">
                <span className="pl-words-strip">
                  {words.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </span>
              </span>
              <span className="pl-note">Every dollar, checked against your PMS</span>
            </div>
          </div>
        </div>
      </div>
      <PreloaderLock />
    </>
  );
}
