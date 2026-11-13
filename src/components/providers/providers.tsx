"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ease } from "@/lib/motion";
import { SmoothScroll } from "./smooth-scroll";

/**
 * Client providers for the whole site.
 * - LazyMotion + `m.*` components keep Motion's bundle small (strict: `motion.*` is an error).
 * - MotionConfig reducedMotion="user" disables transform animations for users who ask.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.6, ease: ease.out }}>
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  );
}
