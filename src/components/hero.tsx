"use client";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Pangolin, Advent_Pro } from "next/font/google";
import Image from "next/image";
import { useState } from "react";

const pangolin = Pangolin({
  subsets: ["latin"],
  weight: ["400"],
});

const adventPro = Advent_Pro({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
});

type HeroData = {
  name: string;
  title: string;
  bio: string;
  currentCompany: {
    name: string;
    url: string;
  };
  location: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
};

/**
 * Composant Hero de la page d'accueil.
 * Affiche le nom, le titre, la biographie, la photo de profil et les liens sociaux.
 * 
 * @param props - Les propriétés du composant.
 * @param props.data - Les données du profil pour la section Hero.
 * @returns Le composant Hero.
 */
export function Hero({ data }: { data: HeroData }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 mb-16"
    >
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-8">
        <div>
          <h1
            className={`${adventPro.className} text-5xl md:text-6xl font-semibold tracking-tight text-foreground`}
          >
            {data.name}
          </h1>
          <p className="text-muted text-xl mt-2 font-medium">
            {data.title}
          </p>
        </div>
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-full border-4 border-zinc-50 dark:border-zinc-800 shadow-md bg-zinc-200 dark:bg-zinc-800">
          {!isLoaded && (
            <div className="absolute inset-0 rounded-full animate-pulse bg-zinc-300 dark:bg-zinc-700" />
          )}
          <Image
            src="/profil.norman.jpg"
            alt={data.name}
            fill
            className={`object-cover object-[center_15%] rounded-full transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            priority
          />
        </div>
      </div>

      <p className="text-muted max-w-lg leading-relaxed text-lg mt-2">
        {data.bio}{" "}
        <a
          href={data.currentCompany.url}
          className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.currentCompany.name}
        </a>
        .
      </p>

      <div className="flex gap-5 mt-2">
        <a
          href={data.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <IconBrandGithub size={18} stroke={1.5} />
          GitHub
        </a>
        <a
          href={data.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <IconBrandLinkedin size={18} stroke={1.5} />
          LinkedIn
        </a>
        <a
          href={`mailto:${data.links.email}`}
          className="text-muted hover:text-foreground transition-colors flex items-center gap-2 text-sm"
        >
          <IconMail size={18} stroke={1.5} />
          Email
        </a>
      </div>

      <p className="text-xs text-muted uppercase tracking-widest font-bold mt-2">
        {data.location}
      </p>
    </motion.section>
  );
}
