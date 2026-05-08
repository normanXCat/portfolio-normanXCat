"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "Master 1 — Mention STIC",
    period: "2025 – en cours",
    specialization: "Parcours : Télécommunications et Réseaux",
    school: "Ecole Supérieure Polytechnique, Antsiranana",
  },
  {
    degree: "Licence — Génie Électrique et Technologie",
    period: "2022 – 2025",
    specialization: "Parcours : Electronique Informatique et Technologie",
    school: "Ecole Supérieure Polytechnique, Antsiranana",
  },
  {
    degree: "Baccalauréat Série D",
    period: "2020",
    specialization: "Collège Saint Joseph, Fianarantsoa",
    school: "",
  },
];

export function Education() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-zinc-100">Formation</h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            className="flex flex-col gap-1"
          >
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="text-zinc-100 font-bold text-lg font-source-code">
                {edu.degree}
              </h3>
              <span className="text-zinc-500 text-sm whitespace-nowrap">
                {edu.period}
              </span>
            </div>
            <p className="text-zinc-400 text-sm">{edu.specialization}</p>
            {edu.school && (
              <p className="text-zinc-500 text-xs italic">{edu.school}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
