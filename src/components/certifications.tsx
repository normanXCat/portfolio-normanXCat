"use client";

import { motion } from "framer-motion";
import { IconCertificate } from "@tabler/icons-react";

type CertificationData = {
  title: string;
  detail?: string;
  period?: string;
};

/**
 * Composant de la section "Certifications & Attestations".
 * Affiche les certificats et attestations obtenus, sous forme de cartes.
 *
 * @param props - Les propriétés du composant.
 * @param props.data - Un tableau d'objets contenant les certifications et attestations.
 * @returns Le composant Certifications.
 */
export function Certifications({ data }: { data: CertificationData[] }) {
  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-16 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold mb-8 text-foreground">
        Certifications &amp; Attestations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((certification, index) => (
          <motion.div
            key={certification.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-zinc-500/5 dark:bg-white/5 border border-border hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group"
          >
            <IconCertificate
              size={20}
              stroke={1.5}
              className="text-muted group-hover:text-foreground shrink-0 mt-0.5"
            />
            <div className="flex flex-col gap-1">
              <span className="text-foreground text-sm font-bold font-source-code">
                {certification.title}
              </span>
              {certification.detail && (
                <span className="text-muted text-xs">
                  {certification.detail}
                </span>
              )}
              {certification.period && (
                <span className="text-muted text-xs uppercase tracking-widest font-bold">
                  {certification.period}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
