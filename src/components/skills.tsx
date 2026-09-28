"use client";

import { FadeIn } from "./fade-in";

/**
 * Section Compétences — 5 lignes maximum, label à gauche, valeurs à droite.
 * Pas de badges, pas d'icônes, pas de barres.
 */
export function Skills({ data }: { data: Record<string, string> }) {
  const entries = Object.entries(data);

  return (
    <FadeIn as="section" id="competences" className="mb-20 md:mb-28 scroll-mt-24 max-w-[740px] mx-auto">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-6">
        Compétences
      </h2>

      <dl className="space-y-2.5">
        {entries.map(([category, items]) => (
          <div key={category} className="flex flex-col sm:flex-row sm:gap-4 text-sm">
            <dt className="text-foreground font-medium sm:min-w-[140px] sm:shrink-0">
              {category}
            </dt>
            <dd className="text-muted">
              {items}
            </dd>
          </div>
        ))}
      </dl>
    </FadeIn>
  );
}
