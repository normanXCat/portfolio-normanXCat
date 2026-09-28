"use client";

import { FadeIn } from "./fade-in";

type ParcoursEntry = {
  period: string;
  title: string;
  location: string;
};

type ParcoursData = {
  experience: ParcoursEntry[];
  formation: ParcoursEntry[];
};

/**
 * Section Parcours — expérience et formation en listes chronologiques sobres.
 * Une ligne par entrée : période, intitulé, lieu.
 * Renvoie vers le CV pour les attestations.
 */
export function Parcours({ data }: { data: ParcoursData }) {
  return (
    <FadeIn as="section" id="parcours" className="mb-20 md:mb-28 scroll-mt-24">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8">
        Parcours
      </h2>

      {/* Expérience */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Expérience
        </h3>
        <ul className="space-y-3">
          {data.experience.map((entry, index) => (
            <FadeIn key={index} as="li" delay={index * 0.05} className="text-sm flex flex-col sm:flex-row sm:gap-2">
              <span className="text-muted sm:min-w-[160px] sm:shrink-0 tabular-nums">
                {entry.period}
              </span>
              <span className="text-foreground/85">
                {entry.title}
                <span className="text-muted"> · {entry.location}</span>
              </span>
            </FadeIn>
          ))}
        </ul>
      </div>

      {/* Formation */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-4">
          Formation
        </h3>
        <ul className="space-y-3">
          {data.formation.map((entry, index) => (
            <FadeIn key={index} as="li" delay={index * 0.05} className="text-sm flex flex-col sm:flex-row sm:gap-2">
              <span className="text-muted sm:min-w-[160px] sm:shrink-0 tabular-nums">
                {entry.period}
              </span>
              <span className="text-foreground/85">
                {entry.title}
                <span className="text-muted"> · {entry.location}</span>
              </span>
            </FadeIn>
          ))}
        </ul>
      </div>

      {/* Attestations */}
      <p className="text-xs text-muted italic">
        Attestations disponibles dans mon CV.
      </p>
    </FadeIn>
  );
}
