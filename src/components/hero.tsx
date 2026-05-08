"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 mb-16"
    >
      <div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-display text-white">
          Norman Vonizara
        </h1>
        <p className="text-zinc-400 text-xl mt-2 font-medium">
          Développeur Full-Stack · Frontend Focused
        </p>
      </div>

      <p className="text-zinc-400 max-w-lg leading-relaxed text-lg">
        Passionné par les interfaces utilisateurs, l&apos;électronique embarquée
        et les réseaux. Actuellement en stage chez{" "}
        <a
          href="https://www.mada-digital.net"
          className="text-zinc-200 underline underline-offset-4 hover:text-white transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mada Digital
        </a>
        .
      </p>

      <div className="flex gap-5">
        <a
          href="https://github.com/normanXCat"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-2 text-sm"
        >
          <IconBrandGithub size={18} stroke={1.5} />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/norman-vonizara-07b96b36a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-2 text-sm"
        >
          <IconBrandLinkedin size={18} stroke={1.5} />
          LinkedIn
        </a>
        <a
          href="mailto:normanvonizara@gmail.com"
          className="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-2 text-sm"
        >
          <IconMail size={18} stroke={1.5} />
          Email
        </a>
      </div>

      <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
        Antsiranana, Madagascar · Disponible pour un stage
      </p>
    </motion.section>
  );
}
