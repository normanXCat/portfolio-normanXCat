"use client";

import { motion } from "framer-motion";

type ExperienceData = {
  role: string;
  location: string;
  period: string;
  description: string;
  link?: string;
};

/**
 * Composant de la section "Expérience".
 * Affiche le parcours professionnel sous forme de chronologie.
 * 
 * @param props - Les propriétés du composant.
 * @param props.data - Un tableau d'objets contenant les informations sur les expériences professionnelles.
 * @returns Le composant Experience.
 */
export function Experience({ data }: { data: ExperienceData[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-foreground">Expérience</h2>
      <div className="space-y-10">
        {data.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            className="relative pl-6 border-l border-border"
          >
            <div className="absolute w-2 h-2 bg-muted rounded-full -left-[4.5px] top-2" />
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 mb-2">
              <h3 className="text-foreground font-bold font-source-code text-lg">
                {exp.role}
              </h3>
              <span className="text-muted text-sm font-medium">
                {exp.period}
              </span>
            </div>
            <p className="text-muted text-sm mb-2">{exp.description}</p>
            {exp.link && (
              <a
                href={`https://${exp.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:opacity-80 text-xs transition-opacity underline underline-offset-4"
              >
                {exp.link}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
