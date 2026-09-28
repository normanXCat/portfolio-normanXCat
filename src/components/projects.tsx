"use client";

import { FadeIn } from "./fade-in";

type ProjectData = {
  name: string;
  url: string | null;
  private?: boolean;
  description: string;
  stack: string[];
};

/**
 * Section Projets — grille 2 colonnes dès md, conteneur élargi (max-w-[1100px]).
 * Cartes sobres avec padding généreux, fond légèrement contrasté,
 * pastilles (chips) de technologies stylées et carte cliquable.
 */
export function Projects({ data }: { data: ProjectData[] }) {
  return (
    <FadeIn as="section" id="projets" className="mb-20 md:mb-28 scroll-mt-24 max-w-[1100px] mx-auto">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8">
        Projets
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data.map((project, index) => {
          const hasLink = Boolean(project.url);
          const isGithub = project.url?.includes("github.com");
          const linkText = isGithub ? "Code source ↗" : "Voir le projet ↗";

          const cardContent = (
            <div className="flex flex-col justify-between h-full p-6 md:p-7">
              <div>
                {/* En-tête : Titre + badge privé */}
                <div className="flex items-baseline justify-between gap-3 mb-2.5">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                  {project.private && (
                    <span className="text-xs text-muted/80 italic font-mono shrink-0">
                      Dépôt privé
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Chips de stack */}
                {project.stack && project.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-2.5 py-0.5 text-[11px] font-mono tracking-tight rounded-md bg-chip-bg text-accent border border-accent/20 transition-colors group-hover:border-accent/35"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Lien textuel en bas de carte */}
                {hasLink && (
                  <div className="text-xs font-medium text-accent flex items-center gap-1 group-hover:underline underline-offset-4">
                    <span>{linkText}</span>
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <FadeIn key={project.name} delay={index * 0.05} className="h-full">
              {hasLink ? (
                <a
                  href={project.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl border border-border bg-card-bg hover:border-card-hover-border hover:-translate-y-1 transition-all duration-200"
                >
                  {cardContent}
                </a>
              ) : (
                <div className="group h-full rounded-xl border border-border bg-card-bg">
                  {cardContent}
                </div>
              )}
            </FadeIn>
          );
        })}
      </div>
    </FadeIn>
  );
}
