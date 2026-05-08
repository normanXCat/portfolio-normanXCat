"use client";

import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import { TechBadge } from "./tech-badge";

const projects = [
  {
    name: "SalonAtlas",
    url: "https://salon-atlas.mada-digital.xyz/",
    description: "Annuaire des salons de coiffure à Madagascar. Réalisé chez Mada Digital.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Skolara",
    url: "https://skolara.vercel.app/",
    description: "Plateforme éducative scolaire & préscolaire : calendrier, actualités, pré-inscription, blog.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "DocuLink",
    url: "#",
    description: "Bibliothèque virtuelle pour consulter et gérer livres, mémoires et thèses.",
    stack: ["Next.js", "Node.js", "MySQL", "API REST"],
  },
  {
    name: "MeetSpace",
    url: "#",
    description: "Prototype de réservation de salles — gestion événements, disponibilité. MVP 48h.",
    stack: ["React", "Node.js"],
  },
  {
    name: "CV Builder",
    url: "#",
    description: "App web de création et export de CV en PDF. Formulaires validés, composants réutilisables.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Hackathon Redshalk",
    url: "#",
    description: "Plateforme de découverte touristique (2ème place). Prototype front-end 48h.",
    stack: ["React", "Tailwind CSS"],
  },
];

export function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-zinc-100">Projets</h2>
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="group relative flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <a
                href={project.url}
                target={project.url !== "#" ? "_blank" : undefined}
                rel={project.url !== "#" ? "noopener noreferrer" : undefined}
                className="text-lg font-bold text-zinc-100 hover:text-white transition-colors flex items-center gap-1.5"
              >
                {project.name}
                {project.url !== "#" && (
                  <IconExternalLink size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                )}
              </a>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
