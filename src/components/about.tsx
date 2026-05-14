"use client";

import { motion } from "framer-motion";

/**
 * Composant de la section "À propos".
 * Affiche une liste de descriptions sur le parcours ou les réalisations.
 * 
 * @param props - Les propriétés du composant.
 * @param props.data - Un tableau de chaînes de caractères contenant les descriptions.
 * @returns Le composant About.
 */
export function About({ data }: { data: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-6 text-foreground">Ce que j&apos;ai fait</h2>
      <ul className="space-y-4">
        {data.map((exp, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            className="text-muted leading-relaxed list-disc list-inside marker:text-muted"
            dangerouslySetInnerHTML={{
              __html: exp.replace(/\*\*(.*?)\*\*/g, '<span class="text-foreground font-semibold">$1</span>'),
            }}
          />
        ))}
      </ul>
    </motion.section>
  );
}
