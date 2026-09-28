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
 * Section Hero — photo de profil agrandie (140px mobile / 200px desktop),
 * disposition responsive (photo au-dessus en mobile, à côté en desktop),
 * nom, titre, accroche, localisation et liens texte.
 */
export function Hero({ data }: { data: HeroData }) {
  return (
    <FadeIn as="section" className="mb-20 md:mb-28 max-w-[740px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-10">
        {/* Photo de profil (au-dessus sur mobile, à droite sur desktop) */}
        <div className="order-1 md:order-2 shrink-0">
          <div className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden border border-border shadow-xs bg-card-bg">
            <Image
              src="/profil.norman.jpg"
              alt={`Photo de profil de ${data.name}`}
              fill
              className="object-cover object-[center_15%]"
              priority
            />
          </div>
        </div>

        {/* Contenu textuel */}
        <div className="order-2 md:order-1 flex-1">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
            {data.name}
          </h1>

          <p className="text-muted text-base md:text-lg mt-2 leading-relaxed">
            {data.title}
          </p>

          <p className="text-foreground/80 text-base mt-4 leading-relaxed max-w-[520px]">
            {data.tagline}
          </p>

          <p className="text-muted text-sm mt-3 tracking-wide">
            {data.location}
          </p>

          {/* Liens personnels */}
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
        </div>
      </div>
    </FadeIn>
  );
}
