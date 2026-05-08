"use client";

import { motion } from "framer-motion";

const experiences = [
  "Actuellement en stage chez **Mada Digital** (Antananarivo) — développement de SalonAtlas et Skolara",
  "Développé et déployé **SalonAtlas** — annuaire de salons de coiffure à Madagascar",
  "Développé **Skolara** — plateforme éducative scolaire et préscolaire (Next.js, blog, pré-inscription)",
  "**2ème place au Hackathon Redshalk 2025** — prototype plateforme tourisme, rôle front-end principal",
  "Stage **Nisasarana SARLU** (Antananarivo) — développement front-end, certifié en interne",
  "Atelier **Arduino INNOVA-DAYS** — programmation embarquée C/C++",
  "Étudiant en **Master 1 Mention STIC**, parcours Télécommunications et Réseaux, ESP Antsiranana",
];

export function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-6 text-zinc-100">Ce que j&apos;ai fait</h2>
      <ul className="space-y-4">
        {experiences.map((exp, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            className="text-zinc-400 leading-relaxed list-disc list-inside marker:text-zinc-600"
            dangerouslySetInnerHTML={{
              __html: exp.replace(/\*\*(.*?)\*\*/g, '<span class="text-zinc-200 font-medium">$1</span>'),
            }}
          />
        ))}
      </ul>
    </motion.section>
  );
}
