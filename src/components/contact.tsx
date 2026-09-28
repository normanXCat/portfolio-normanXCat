"use client";

import { motion } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

type ContactData = {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  availability: string;
  languages: {
    flag: string;
    name: string;
    level: string;
  }[];
};

const cardClass =
  "flex items-center gap-3 p-4 rounded-xl bg-zinc-500/5 dark:bg-white/5 border border-border text-sm";

/**
 * Composant de la section "Contact" et "Langues".
 * Affiche la disponibilité, les langues parlées et les moyens de contact (email, téléphone, localisation, liens).
 *
 * @param props - Les propriétés du composant.
 * @param props.data - Les données de contact, de disponibilité et de langues.
 * @returns Le composant Contact.
 */
export function Contact({ data }: { data: ContactData }) {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-16 scroll-mt-24"
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

      <h2 className="text-2xl font-bold mb-4 text-foreground italic">
        Get in touch
      </h2>
      <p className="text-muted text-sm mb-8">{data.availability}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a
          href={`mailto:${data.email}`}
          className={`${cardClass} hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group`}
        >
          <IconMail size={20} className="text-muted group-hover:text-foreground" />
          <span className="text-muted group-hover:text-foreground text-sm">
            {data.email}
          </span>
        </a>
        <div className={cardClass}>
          <IconPhone size={20} className="text-muted" />
          <span className="text-muted">{data.phone}</span>
        </div>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardClass} hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group`}
        >
          <IconBrandGithub
            size={20}
            className="text-muted group-hover:text-foreground"
          />
          <span className="text-muted group-hover:text-foreground text-sm">
            {data.github.replace("https://", "")}
          </span>
        </a>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cardClass} hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-500/10 dark:hover:bg-white/10 transition-all group`}
        >
          <IconBrandLinkedin
            size={20}
            className="text-muted group-hover:text-foreground"
          />
          <span className="text-muted group-hover:text-foreground text-sm">
            {data.linkedin.replace("https://", "")}
          </span>
        </a>
        <div className={cardClass}>
          <IconMapPin size={20} className="text-muted" />
          <span className="text-muted">{data.location}</span>
        </div>
      </div>
    </motion.section>
  );
}
