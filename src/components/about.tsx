"use client";

import { motion } from "framer-motion";

type AboutData = {
  paragraphs: string[];
  highlights: string[];
};

/**
 * Composant de la section "À propos".
 * Affiche un court paragraphe de présentation, puis une liste de réalisations clés.
 *
 * @param props - Les propriétés du composant.
 * @param props.data - Les paragraphes de présentation et les réalisations clés.
 * @returns Le composant About.
 */
export function About({ data }: { data: AboutData }) {
  return (
    <motion.section
      id="a-propos"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-16 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold mb-6 text-foreground">À propos</h2>

      <div className="space-y-4">
        {data.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-muted leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(
                /\*\*(.*?)\*\*/g,
                '<span class="text-foreground font-semibold">$1</span>',
              ),
            }}
          />
        ))}
      </div>

      <ul className="space-y-4 mt-8">
        {data.highlights.map((exp, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            className="text-muted leading-relaxed list-disc list-inside marker:text-muted"
            dangerouslySetInnerHTML={{
              __html: exp.replace(
                /\*\*(.*?)\*\*/g,
                '<span class="text-foreground font-semibold">$1</span>',
              ),
            }}
          />
        ))}
      </ul>
    </motion.section>
  );
}
