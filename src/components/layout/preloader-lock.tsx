"use client";

import { useEffect } from "react";
import { lenisStore } from "@/lib/lenis-store";

/** After the preloader ends, how long the hero's own entry still runs (its delays use --intro). */
const HERO_SETTLE_MS = 1800;

/**
 * Holds scrolling while the CSS preloader plays and releases it when that animation really ends
 * (`animationend` of pl-gone), then marks the intro "done" so --intro drops to 0s: a later
 * client-side visit to the home page must not wait for a preloader that is not there.
 * Purely an enhancement: without JS the CSS intro still plays and hides itself.
 */
export function PreloaderLock() {
  useEffect(() => {
    const html = document.documentElement;
    const el = document.querySelector<HTMLElement>(".preloader");
    if (!el || html.dataset.intro === "skip" || html.dataset.intro === "done") return;

    const stop = () => lenisStore.get()?.stop();
    const unsub = lenisStore.subscribe(stop);
    let settle: ReturnType<typeof setTimeout> | undefined;
    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      unsub();
      html.classList.remove("pl-lock");
      lenisStore.get()?.start();
      settle = setTimeout(() => (html.dataset.intro = "done"), HERO_SETTLE_MS);
    };

    const anims = el.getAnimations();
    const ended = anims.length > 0 && anims.every((a) => a.playState === "finished");
    if (ended) {
      release();
    } else {
      html.classList.add("pl-lock");
      stop();
      el.addEventListener("animationend", (e) => e.animationName === "pl-gone" && release());
    }

    return () => {
      clearTimeout(settle);
      if (!released) {
        unsub();
        html.classList.remove("pl-lock");
        lenisStore.get()?.start();
      }
    };
  }, []);

  return null;
}
