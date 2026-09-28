"use client";

import { FadeIn } from "./fade-in";

/**
 * Section À propos — 3 phrases maximum, pas de liste.
 */
export function About({ text }: { text: string }) {
  return (
    <FadeIn as="section" id="a-propos" className="mb-20 md:mb-28 scroll-mt-24">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-6">
        À propos
      </h2>
      <p className="text-foreground/85 leading-relaxed text-base">
        {text}
      </p>
    </FadeIn>
  );
}
