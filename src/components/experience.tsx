"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Stage — Mada Digital",
    location: "Antananarivo",
    period: "2025 – présent",
    description:
      "Développement front-end (SalonAtlas, Skolara), intégration de maquettes, déploiement.",
    link: "mada-digital.net",
  },
  {
    role: "Stage — Nisasarana SARLU",
    location: "Ivato Antananarivo",
    period: "11/2025 – 12/2025",
    description:
      "Développement front-end, maintenance informatique, certification interne obtenue.",
  },
  {
    role: "Hackathon Redshalk",
    location: "Antsiranana",
    period: "08/2025",
    description: "Développeur front-end principal. 2ème place.",
  },
  {
    role: "Atelier Arduino INNOVA-DAYS",
    location: "ESP",
    period: "03/2025",
    description: "Programmation embarquée Arduino C/C++.",
  },
];

export function Experience() {
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
        {experiences.map((exp, index) => (
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
