"use client";

import { useReducedMotion, motion } from "framer-motion";

export type ApproachPillar = {
  number: string;
  title: string;
  description: string;
};

export type ApproachData = {
  label?: string;
  headline: string;
  pillars: ApproachPillar[];
};

/**
 * Met en valeur les termes clés au sein du texte pour renforcer le caractère éditorial.
 */
function formatPillarText(text: string) {
  // Met en valeur les segments clés avec emphase légère
  const highlightedParts = [
    { target: "vrai problème", className: "text-foreground font-medium" },
    { target: "concret, testé et déployé", className: "text-foreground font-medium" },
    { target: "fiables, structurés et pensés pour durer", className: "text-foreground font-medium" },
  ];

  for (const { target, className } of highlightedParts) {
    if (text.includes(target)) {
      const [before, after] = text.split(target);
      return (
        <>
          {before}
          <span className={className}>{target}</span>
          {after}
        </>
      );
    }
  }

  return text;
}

/**
 * Section "Ma façon de travailler" — respiration éditoriale et immersive.
 * 
 * Conception :
 * - Grand titre signature en typographie Cormorant Garamond
 * - Écrin dédié avec liseré estompé et fond délicatement teinté par l'accent
 * - Disposition asymétrique en cascade (offset vertical progressif des 3 piliers)
 * - Grandes numérotations élégantes "01 / 02 / 03" réactives au survol
 * - Révélation cadencée au défilement respectueuse de prefers-reduced-motion
 */
export function Approach({ data }: { data: ApproachData }) {
  const shouldReduceMotion = useReducedMotion();

  if (!data || !data.pillars || data.pillars.length === 0) return null;

  return (
    <section
      id="methode"
      className="mb-24 md:mb-32 scroll-mt-24 max-w-[960px] mx-auto w-full relative"
    >
      {/* Écrin atmosphérique : fond délicatement nuancé et repères graphiques */}
      <div className="relative rounded-2xl md:rounded-3xl border border-border/70 bg-gradient-to-b from-card-bg/70 via-accent/[0.03] to-card-bg/40 p-7 sm:p-10 md:p-12 lg:p-14 overflow-hidden backdrop-blur-xs shadow-xs">
        {/* Voile lumineux diffus d'ambiance */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/[0.08] dark:bg-accent/[0.06] rounded-full blur-3xl -z-10"
          aria-hidden="true"
        />

        {/* Repères graphiques fins aux quatre angles (esprit carnet d'ingénieur / édition) */}
        <span
          className="absolute top-3 left-3 text-[10px] font-mono text-muted/40 select-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute top-3 right-3 text-[10px] font-mono text-muted/40 select-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-3 left-3 text-[10px] font-mono text-muted/40 select-none"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-3 right-3 text-[10px] font-mono text-muted/40 select-none"
          aria-hidden="true"
        >
          +
        </span>

        {/* En-tête éditorial */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent font-medium mb-3">
            {data.label || "Ma façon de travailler"}
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground tracking-tight leading-[1.15]">
            {data.headline}
          </h2>
        </motion.div>

        {/* Ligne séparatrice avec estompement latéral */}
        <div
          className="my-8 md:my-12 h-px w-full bg-gradient-to-r from-transparent via-border/80 to-transparent"
          aria-hidden="true"
        />

        {/* 3 Piliers — disposition asymétrique en cascade diagonale sur desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10 items-start">
          {data.pillars.map((pillar, index) => {
            // Décalage vertical progressif sur grand écran pour créer le rythme en diagonale
            const offsetClasses =
              index === 0
                ? "md:pt-0"
                : index === 1
                ? "md:pt-8 lg:pt-10"
                : "md:pt-16 lg:pt-20";

            return (
              <motion.article
                key={pillar.number}
                initial={
                  shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.55,
                  delay: shouldReduceMotion ? 0 : 0.1 + index * 0.15,
                  ease: "easeOut",
                }}
                className={`group flex flex-col justify-start ${offsetClasses}`}
              >
                {/* Numéro géant serif ultra-fin */}
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-accent/30 dark:text-accent/35 tabular-nums select-none leading-none mb-2.5 group-hover:text-accent transition-colors duration-300">
                  {pillar.number}
                </span>

                {/* Trait dynamique qui s'étire au survol */}
                <div
                  className="w-8 h-px bg-accent/35 group-hover:w-16 group-hover:bg-accent transition-all duration-300 mb-3.5"
                  aria-hidden="true"
                />

                {/* Titre du pilier */}
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground tracking-tight mb-2.5 group-hover:text-accent transition-colors duration-200">
                  {pillar.title}
                </h3>

                {/* Description avec emphase fine */}
                <p className="text-foreground/80 text-sm sm:text-[15px] leading-relaxed">
                  {formatPillarText(pillar.description)}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
