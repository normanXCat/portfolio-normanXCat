"use client";

import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import { TechBadge } from "./tech-badge";

type ProjectData = {
  name: string;
  url: string;
  role: string;
  description: string;
  stack: string[];
};

const hasLink = (url: string) => Boolean(url) && url !== "#";

/**
 * Composant de la section "Projets".
 * Affiche une liste de projets avec leur rôle, description, lien de démo et pile technologique.
 *
 * @param props - Les propriétés du composant.
 * @param props.data - Un tableau d'objets contenant les informations sur les projets.
 * @returns Le composant Projects.
 */
export function Projects({ data }: { data: ProjectData[] }) {
  return (
    <motion.section
      id="projets"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold mb-8 text-foreground">Projets</h2>
      <div className="grid gap-8">
        {data.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="group relative flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              {hasLink(project.url) ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-foreground hover:opacity-80 transition-opacity flex items-center gap-1.5"
                >
                  {project.name}
                  <IconExternalLink
                    size={16}
                    className="text-muted group-hover:text-foreground transition-colors"
                  />
                </a>
              ) : (
                <span className="text-lg font-bold text-foreground">
                  {project.name}
                </span>
              )}
              {!hasLink(project.url) && <TechBadge>Bientôt disponible</TechBadge>}
            </div>

            {project.role && (
              <p className="text-xs text-muted uppercase tracking-widest font-bold">
                {project.role}
              </p>
            )}

            <p className="text-muted text-sm leading-relaxed">
              {project.description}
            </p>

            {project.stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
