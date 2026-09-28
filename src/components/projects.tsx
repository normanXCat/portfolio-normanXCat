"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useInView, useReducedMotion } from "framer-motion";

type ProjectData = {
  name: string;
  url: string | null;
  private?: boolean;
  context?: string;
  description: string;
  stack: string[];
};

/**
 * Entrée unitaire de la timeline.
 * Alternance desktop : impaires (1ère, 3ème...) à gauche, paires (2ème, 4ème...) à droite.
 * Sur mobile : ligne à gauche, contenu toujours à droite.
 */
function TimelineItem({
  project,
  index,
  shouldReduceMotion,
}: {
  project: ProjectData;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-12% 0px -12% 0px" });
  const isLit = shouldReduceMotion || isInView;
  const isLeft = index % 2 === 0; // 0 = 1er = gauche, 1 = 2ème = droite

  const hasLink = Boolean(project.url);
  const isGithub = project.url?.includes("github.com");
  const linkLabel = isGithub ? "Code source ↗" : "Voir le projet ↗";

  const initialX = shouldReduceMotion ? 0 : isLeft ? -28 : 28;

  return (
    <motion.li
      ref={itemRef}
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      className={`relative group flex flex-col ${
        isLeft ? "md:flex-row-reverse" : "md:flex-row"
      } md:items-start pl-10 md:pl-0`}
    >
      {/* Nœud lumineux sur la ligne */}
      <div
        className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-500 z-10 ${
          isLit
            ? "border-accent bg-accent shadow-[0_0_10px_var(--accent)]"
            : "border-border bg-background group-hover:border-accent"
        }`}
        aria-hidden="true"
      />

      {/* Trait connecteur horizontal (mobile) */}
      <div
        className="absolute left-4 top-3 w-5 h-px bg-border md:hidden"
        aria-hidden="true"
      />

      {/* Trait connecteur horizontal (desktop) */}
      <div
        className={`hidden md:block absolute top-3 h-px bg-border group-hover:bg-accent/60 transition-colors ${
          isLeft ? "right-1/2 w-8" : "left-1/2 w-8"
        }`}
        aria-hidden="true"
      />

      {/* Colonne Date / Contexte (opposée au contenu sur desktop) */}
      <div
        className={`w-full md:w-1/2 pt-0.5 ${
          isLeft ? "md:pl-12 md:text-left" : "md:pr-12 md:text-right"
        }`}
      >
        {project.context && (
          <p className="text-xs font-mono tracking-tight text-muted/80 uppercase mb-2 md:mb-0">
            {project.context}
          </p>
        )}
      </div>

      {/* Colonne Contenu du projet */}
      <div
        className={`w-full md:w-1/2 flex flex-col ${
          isLeft
            ? "md:pr-12 md:text-right md:items-end"
            : "md:pl-12 md:text-left md:items-start"
        }`}
      >
        {/* Titre du projet */}
        <div className="flex items-baseline gap-2.5 mb-2 flex-wrap">
          {hasLink ? (
            <a
              href={project.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-2xl font-semibold text-foreground hover:text-accent transition-colors link-underline inline-flex items-center gap-1"
            >
              <span>{project.name}</span>
              <span className="text-xs text-muted/70 group-hover:text-accent font-sans">
                ↗
              </span>
            </a>
          ) : (
            <span className="font-serif text-2xl font-semibold text-foreground">
              {project.name}
            </span>
          )}

          {project.private && (
            <span className="text-xs text-muted italic font-mono shrink-0">
              (Dépôt privé)
            </span>
          )}
        </div>

        {/* Description */}
        <p
          className={`text-foreground/80 text-sm leading-relaxed mb-3.5 max-w-[420px] ${
            isLeft ? "md:text-right" : "md:text-left"
          }`}
        >
          {project.description}
        </p>

        {/* Chips de stack */}
        {project.stack && project.stack.length > 0 && (
          <div
            className={`flex flex-wrap gap-1.5 mb-3.5 max-w-[420px] ${
              isLeft ? "md:justify-end" : "md:justify-start"
            }`}
          >
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

        {/* Liens d'action */}
        {hasLink && (
          <div className={isLeft ? "md:text-right" : "md:text-left"}>
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
      </div>
    </motion.li>
  );
}

/**
 * Section Projets — chronologie verticale centrée avec entrées alternées (gauche / droite).
 * Conteneur élargi (max 960px). Ligne progressive et nœuds lumineux au défilement.
 */
export function Projects({ data }: { data: ProjectData[] }) {
  const containerRef = useRef<HTMLOListElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Animation progressive du tracé de la ligne liée au scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="projets"
      className="mb-24 md:mb-32 scroll-mt-24 max-w-[960px] mx-auto w-full"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-12 text-center md:text-left">
        Projets
      </h2>

      {/* Conteneur de la timeline */}
      <ol ref={containerRef} className="relative space-y-16 md:space-y-20">
        {/* Tracé de fond de la ligne : à gauche sur mobile (left-4), centré sur desktop (left-1/2) */}
        <div
          className="absolute top-2 bottom-2 left-4 md:left-1/2 -translate-x-1/2 w-px bg-border/80"
          aria-hidden="true"
        />

        {/* Ligne animée active se dessinant au défilement */}
        <motion.div
          style={
            shouldReduceMotion
              ? { scaleY: 1 }
              : { scaleY, originY: 0 }
          }
          className="absolute top-2 bottom-2 left-4 md:left-1/2 -translate-x-1/2 w-[2px] bg-accent/70"
          aria-hidden="true"
        />

        {/* Entrées alternées de la timeline */}
        {data.map((project, index) => (
          <TimelineItem
            key={project.name}
            project={project}
            index={index}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </ol>
    </section>
  );
}
