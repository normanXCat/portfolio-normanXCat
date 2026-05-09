"use client";

import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";
import { TechBadge } from "./tech-badge";

type ProjectData = {
  name: string;
  url: string;
  description: string;
  stack: string[];
};

export function Projects({ data }: { data: ProjectData[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
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
            <div className="flex items-center justify-between">
              <a
                href={project.url}
                target={project.url !== "#" ? "_blank" : undefined}
                rel={project.url !== "#" ? "noopener noreferrer" : undefined}
                className="text-lg font-bold text-foreground hover:opacity-80 transition-opacity flex items-center gap-1.5"
              >
                {project.name}
                {project.url !== "#" && (
                  <IconExternalLink size={16} className="text-muted group-hover:text-foreground transition-colors" />
                )}
              </a>
            </div>
            <p className="text-muted text-sm leading-relaxed">
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
