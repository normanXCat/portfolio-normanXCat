"use client";

import { FadeIn } from "./fade-in";

type ProjectData = {
  name: string;
  url: string | null;
  private?: boolean;
  description: string;
  stack: string;
};

/**
 * Section Projets — liste épurée, pas de cartes ni de captures.
 * Titre (lien si disponible), description 1–2 lignes, stack en texte simple.
 */
export function Projects({ data }: { data: ProjectData[] }) {
  return (
    <FadeIn as="section" id="projets" className="mb-20 md:mb-28 scroll-mt-24">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8">
        Projets
      </h2>

      <div className="space-y-8">
        {data.map((project, index) => (
          <FadeIn key={project.name} delay={index * 0.06} className="group">
            {/* Titre + mention privée */}
            <div className="flex items-baseline gap-2 mb-1">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl font-semibold text-foreground link-underline"
                >
                  {project.name}
                </a>
              ) : (
                <span className="font-serif text-xl font-semibold text-foreground">
                  {project.name}
                </span>
              )}
              {project.private && (
                <span className="text-xs text-muted italic">
                  Dépôt privé
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted text-sm leading-relaxed mb-1.5">
              {project.description}
            </p>

            {/* Stack en texte simple */}
            {project.stack && (
              <p className="text-xs text-muted/70">
                {project.stack}
              </p>
            )}
          </FadeIn>
        ))}
      </div>
    </FadeIn>
  );
}
