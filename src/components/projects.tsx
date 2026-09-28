"use client";

import { FadeIn } from "./fade-in";

type ProjectData = {
  name: string;
  url: string | null;
  private?: boolean;
  context?: string;
  description: string;
  stack: string[];
};

/**
 * Section Projets — chronologie verticale (timeline) épurée, sans cartes.
 * Colonne de lecture standard (max 740px), ligne fine verticale à gauche,
 * nœuds lumineux s'illuminant au défilement, titres et liens textuels cliquables.
 */
export function Projects({ data }: { data: ProjectData[] }) {
  return (
    <FadeIn as="section" id="projets" className="mb-20 md:mb-28 scroll-mt-24 max-w-[740px] mx-auto">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-10">
        Projets
      </h2>

      {/* Ligne verticale de timeline */}
      <div className="relative pl-6 md:pl-8 border-l border-border space-y-12 md:space-y-14">
        {data.map((project, index) => {
          const hasLink = Boolean(project.url);
          const isGithub = project.url?.includes("github.com");
          const linkLabel = isGithub ? "Code source ↗" : "Voir le projet ↗";

          return (
            <FadeIn key={project.name} delay={index * 0.06} className="group relative">
              {/* Nœud sur la ligne de timeline */}
              <div
                className="absolute -left-[30px] md:-left-[38px] top-1 w-2.5 h-2.5 rounded-full border-2 border-border bg-background group-hover:border-accent group-hover:bg-accent transition-colors duration-300"
                aria-hidden="true"
              />

              {/* Label de contexte / date */}
              {project.context && (
                <p className="text-xs font-mono tracking-tight text-muted mb-1.5 uppercase">
                  {project.context}
                </p>
              )}

              {/* Titre du projet */}
              <div className="flex items-baseline gap-2.5 mb-2">
                {hasLink ? (
                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-2xl font-semibold text-foreground hover:text-accent transition-colors link-underline inline-flex items-center gap-1"
                  >
                    <span>{project.name}</span>
                    <span className="text-xs text-muted/70 group-hover:text-accent font-sans">↗</span>
                  </a>
                ) : (
                  <span className="font-serif text-2xl font-semibold text-foreground">
                    {project.name}
                  </span>
                )}

                {project.private && (
                  <span className="text-xs text-muted italic font-mono">
                    (Dépôt privé)
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-3.5 max-w-[640px]">
                {project.description}
              </p>

              {/* Chips de stack */}
              {project.stack && project.stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-block px-2.5 py-0.5 text-[11px] font-mono tracking-tight rounded-md bg-chip-bg text-accent border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Lien explicite vers le projet ou le code */}
              {hasLink && (
                <div>
                  <a
                    href={project.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-accent hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    {linkLabel}
                  </a>
                </div>
              )}
            </FadeIn>
          );
        })}
      </div>
    </FadeIn>
  );
}
