"use client";

import { motion } from "framer-motion";
import {
  IconMail,
  IconPhone,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-16"
    >
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-zinc-100">Langues</h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span>🇲🇬</span>
            <span className="text-zinc-400">Malagasy — <span className="text-zinc-200">Natif</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span>🇫🇷</span>
            <span className="text-zinc-400">Français — <span className="text-zinc-200">Courant</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span>🇬🇧</span>
            <span className="text-zinc-400">Anglais — <span className="text-zinc-200">Intermédiaire</span></span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-zinc-100 italic">Get in touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="mailto:normanvonizara@gmail.com"
          className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
        >
          <IconMail size={20} className="text-zinc-500 group-hover:text-zinc-200" />
          <span className="text-zinc-400 group-hover:text-zinc-200 text-sm">normanvonizara@gmail.com</span>
        </a>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-sm">
          <IconPhone size={20} className="text-zinc-500" />
          <span className="text-zinc-400">+261 34 30 638 17</span>
        </div>
        <a
          href="https://github.com/normanXCat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
        >
          <IconBrandGithub size={20} className="text-zinc-500 group-hover:text-zinc-200" />
          <span className="text-zinc-400 group-hover:text-zinc-200 text-sm">github.com/normanXCat</span>
        </a>
        <a
          href="https://linkedin.com/in/norman-vonizara-07b96b36a/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
        >
          <IconBrandLinkedin size={20} className="text-zinc-500 group-hover:text-zinc-200" />
          <span className="text-zinc-400 group-hover:text-zinc-200 text-sm">linkedin.com/in/norman-vonizara...</span>
        </a>
      </div>
    </motion.section>
  );
}
