"use client";

import Image from "next/image";
import { FadeIn } from "./fade-in";

type HeroData = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  resumeUrl: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
};

/**
 * Section Hero — nom, titre, accroche, localisation, liens texte.
 * Petite photo de profil si disponible.
 */
export function Hero({ data }: { data: HeroData }) {
  return (
    <FadeIn as="section" className="mb-20 md:mb-28">
      {/* Photo discrète */}
      <div className="mb-6">
        <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden bg-border">
          <Image
            src="/profil.norman.jpg"
            alt={`Photo de ${data.name}`}
            fill
            className="object-cover object-[center_15%]"
            priority
          />
        </div>
      </div>

      {/* Nom */}
      <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
        {data.name}
      </h1>

      {/* Titre */}
      <p className="text-muted text-base md:text-lg mt-2 leading-relaxed">
        {data.title}
      </p>

      {/* Accroche */}
      <p className="text-foreground/80 text-base mt-4 leading-relaxed max-w-[560px]">
        {data.tagline}
      </p>

      {/* Localisation */}
      <p className="text-muted text-sm mt-4 tracking-wide">
        {data.location}
      </p>

      {/* Liens */}
      <nav aria-label="Liens personnels" className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm">
        <a
          href={data.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-accent"
        >
          GitHub
        </a>
        <a
          href={data.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-accent"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${data.links.email}`}
          className="link-underline text-accent"
        >
          Email
        </a>
        <span className="text-border" aria-hidden="true">·</span>
        <a
          href={data.resumeUrl}
          download
          className="link-underline text-accent"
        >
          Télécharger mon CV
        </a>
      </nav>

      {/* Lien vers projets */}
      <div className="mt-8">
        <a
          href="#projets"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ↓ Voir mes projets
        </a>
      </div>
    </FadeIn>
  );
}
