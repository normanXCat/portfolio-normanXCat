"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Pangolin, Advent_Pro } from "next/font/google";

const pangolin = Pangolin({
  subsets: ["latin"],
  weight: ["400"],
});

const adventPro = Advent_Pro({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 mb-16"
    >
      <div>
        <h1
          className={`${adventPro.className} text-5xl md:text-6xl font-semibold tracking-tight text-foreground`}
        >
          Norman Vonizara
        </h1>
        <p className="text-muted text-xl mt-2 font-medium">
          Développeur Full-Stack · Frontend Focused
        </p>
      </div>

      <p className="text-muted max-w-lg leading-relaxed text-lg">
        Passionné par les interfaces utilisateurs, l&apos;électronique embarquée
        et les réseaux. Actuellement en stage chez{" "}
        <a
          href="https://www.mada-digital.net"
          className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
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
          className="text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <IconBrandGithub size={18} stroke={1.5} />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/norman-vonizara-07b96b36a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <IconBrandLinkedin size={18} stroke={1.5} />
          LinkedIn
        </a>
        <a
          href="mailto:normanvonizara@gmail.com"
          className="text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <IconMail size={18} stroke={1.5} />
          Email
        </a>
      </div>

      <p className="text-xs text-muted uppercase tracking-widest font-bold">
        Antsiranana, Madagascar · Disponible pour un stage
      </p>
    </motion.section>
  );
}
