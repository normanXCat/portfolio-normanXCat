"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const motionElements = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  footer: motion.footer,
} as const;

type MotionTag = keyof typeof motionElements;

/**
 * Enveloppe d'animation : léger fondu + translation à l'apparition.
 * Respecte `prefers-reduced-motion` : aucune animation si activé.
 */
export function FadeIn({
  children,
  delay = 0,
  as = "div",
  className,
  id,
}: {
  children: ReactNode;
  delay?: number;
  as?: MotionTag;
  className?: string;
  id?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motionElements[as];

  return (
    <Component
      id={id}
      className={className}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
