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
} from "@tabler/icons-react";

const skills = [
  {
    name: "Next.js",
    desc: "Framework principal, App Router",
    icon: IconBrandNextjs,
  },
  { name: "React.js", desc: "UI composant-driven", icon: IconBrandReact },
  {
    name: "TypeScript",
    desc: "JavaScript robuste et typé",
    icon: IconBrandTypescript,
  },
  {
    name: "Tailwind CSS",
    desc: "Styling rapide et cohérent",
    icon: IconBrandTailwind,
  },
  {
    name: "UI Components",
    desc: "Composants sur mesure et réutilisables",
    icon: IconComponents,
  },
  { name: "Node.js", desc: "APIs REST backend", icon: IconBrandNodejs },
  { name: "MySQL", desc: "Base de données relationnelle", icon: IconDatabase },
  { name: "Python", desc: "Scripts et automatisation", icon: IconBrandPython },
  { name: "Arduino C/C++", desc: "Électronique embarquée", icon: IconCpu },
  { name: "UML / Merise", desc: "Modélisation applicative", icon: IconSchema },
];

export function Skills() {
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
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            className="flex items-center gap-4 group"
          >
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-border text-zinc-500 dark:text-muted group-hover:text-foreground group-hover:border-zinc-400 dark:group-hover:border-zinc-700 transition-all">
              <skill.icon size={20} stroke={1.5} />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg font-source-code">
                {skill.name}
              </h3>
              <p className="text-muted text-xs">{skill.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
