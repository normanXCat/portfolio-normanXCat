"use client";

import { motion } from "framer-motion";
import {
  IconMail,
  IconPhone,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

type ContactData = {
  languages: {
    flag: string;
    name: string;
    level: string;
  }[];
  phone: string;
};

/**
 * Composant de la section "Contact" et "Langues".
 * Affiche les langues parlées et les différents moyens de contact (email, téléphone, liens sociaux).
 * 
 * @param props - Les propriétés du composant.
 * @param props.data - Les données de contact et de langues.
 * @returns Le composant Contact.
 */
export function Contact({ data }: { data: ContactData }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-16"
    >
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Langues</h2>
        <div className="flex gap-6 text-sm">
          {data.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span className="text-muted">
                {lang.name} — <span className="text-foreground">{lang.level}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-foreground italic">Get in touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href="mailto:normanvonizara@gmail.com"
          className="flex items-center gap-3 p-4 rounded-xl bg-zinc-500/5 dark:bg-white/5 border border-border hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group"
        >
          <IconMail size={20} className="text-muted group-hover:text-foreground" />
          <span className="text-muted group-hover:text-foreground text-sm">normanvonizara@gmail.com</span>
        </a>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-500/5 dark:bg-white/5 border border-border text-sm">
          <IconPhone size={20} className="text-muted" />
          <span className="text-muted">{data.phone}</span>
        </div>
        <a
          href="https://github.com/normanXCat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-zinc-500/5 dark:bg-white/5 border border-border hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group"
        >
          <IconBrandGithub size={20} className="text-muted group-hover:text-foreground" />
          <span className="text-muted group-hover:text-foreground text-sm">github.com/normanXCat</span>
        </a>
        <a
          href="https://linkedin.com/in/norman-vonizara-07b96b36a/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl bg-zinc-500/5 dark:bg-white/5 border border-border hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group"
        >
          <IconBrandLinkedin size={20} className="text-muted group-hover:text-foreground" />
          <span className="text-muted group-hover:text-foreground text-sm">linkedin.com/in/norman-vonizara...</span>
        </a>
      </div>
    </motion.section>
  );
}
