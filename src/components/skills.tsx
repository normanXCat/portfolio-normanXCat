"use client";

import { motion } from "framer-motion";
import {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandNodejs,
  IconDatabase,
  IconBrandPython,
  IconCpu,
  IconSchema,
  IconComponents,
  IconBrandDocker,
  IconBrain,
} from "@tabler/icons-react";
import React from "react";

const iconMap: Record<string, React.ElementType> = {
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandNodejs,
  IconDatabase,
  IconBrandPython,
  IconCpu,
  IconSchema,
  IconComponents,
  IconBrandDocker,
  IconBrain,
};

type SkillData = {
  name: string;
  desc: string;
  icon: string;
};

/**
 * Composant de la section "Tech" (Compétences).
 * Affiche une grille de compétences avec icônes, noms et descriptions.
 * 
 * @param props - Les propriétés du composant.
 * @param props.data - Un tableau d'objets contenant les informations sur les compétences techniques.
 * @returns Le composant Skills.
 */
export function Skills({ data }: { data: SkillData[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-foreground">Tech</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((skill, index) => {
          const IconComponent = iconMap[skill.icon] || IconComponents;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
              className="flex items-center gap-4 group"
            >
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-border text-zinc-500 dark:text-muted group-hover:text-foreground group-hover:border-zinc-400 dark:group-hover:border-zinc-700 transition-all">
                <IconComponent size={20} stroke={1.5} />
              </div>
              <div>
                <h3 className="text-foreground font-bold text-lg font-source-code">
                  {skill.name}
                </h3>
                <p className="text-muted text-xs">{skill.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
