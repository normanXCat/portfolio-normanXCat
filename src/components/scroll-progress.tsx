"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Composant de barre de progression de défilement.
 * Affiche une barre en haut de la page qui indique la progression du défilement de l'utilisateur.
 * 
 * @returns Le composant ScrollProgress.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none">
      {/* Soft Bloom Background */}
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="absolute inset-0 bg-zinc-900/10 dark:bg-white/20 blur-[4px]"
      />

      {/* Main Progress Line */}
      <motion.div
        style={{ scaleX, originX: 0 }}
        className="relative h-full w-full bg-gradient-to-r from-zinc-400 via-zinc-800 to-black dark:from-zinc-600 dark:via-zinc-100 dark:to-white shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
      >
        {/* Luminous Flare at the tip */}
        <div className="absolute right-0 top-0 h-full w-[30px] bg-gradient-to-r from-transparent to-black/20 dark:to-white blur-[1px]" />
      </motion.div>
    </div>
  );
}
