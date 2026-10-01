"use client";

import Image from "next/image";
import { FadeIn } from "./fade-in";
import { IconBrain, IconCode, IconNetwork } from "@tabler/icons-react";

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
 * Section Hero — photo de profil stylisée en cercle parfait,
 * entourée d'un anneau délicat, d'un anneau en pointillés tournant lentement,
 * d'un halo doux et de bulles flottantes décoratives (code, réseau, IA).
 */
export function Hero({ data }: { data: HeroData }) {
  return (
    <FadeIn as="section" className="mb-20 md:mb-28 max-w-[740px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
        {/* Photo de profil stylée en cercle avec anneaux et bulles flottantes */}
        <div className="order-1 md:order-2 shrink-0 self-center md:self-auto py-3">
          <div className="relative flex items-center justify-center">
            {/* Halo / lueur diffuse d'arrière-plan */}
            <div
              className="absolute -inset-4 md:-inset-6 rounded-full bg-accent/20 blur-xl md:blur-2xl -z-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Anneau en pointillés tournant très lentement autour */}
            <div
              className="absolute -inset-2.5 md:-inset-3.5 rounded-full border border-dashed border-accent/40 animate-spin-slow pointer-events-none"
              aria-hidden="true"
            />

            {/* Conteneur principal de la photo en cercle parfait avec anneau fin */}
            <div className="relative w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full p-1 border-2 border-accent/40 bg-card-bg/60 shadow-xs">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/profil.norman.jpeg"
                  alt={`Photo de profil de ${data.name}`}
                  fill
                  className="object-cover object-[center_15%]"
                  priority
                />
              </div>
            </div>

            {/* ── Bulles décoratives animées en périphérie ── */}

            {/* Bulle 1 : Haut-droit — IA (cerveau) */}
            <div
              className="absolute -top-1.5 -right-1.5 md:-top-2.5 md:-right-2.5 w-7 h-7 md:w-8 md:h-8 rounded-full border border-accent/35 bg-card-bg/90 backdrop-blur-xs text-accent shadow-xs flex items-center justify-center animate-float-1 pointer-events-none"
              aria-hidden="true"
            >
              <IconBrain size={15} stroke={1.8} />
            </div>

            {/* Bulle 2 : Bas-gauche — Code (balises) */}
            <div
              className="absolute -bottom-1.5 -left-1.5 md:-bottom-2.5 md:-left-2.5 w-7 h-7 md:w-8 md:h-8 rounded-full border border-accent/35 bg-card-bg/90 backdrop-blur-xs text-accent shadow-xs flex items-center justify-center animate-float-2 pointer-events-none"
              aria-hidden="true"
            >
              <IconCode size={14} stroke={1.8} />
            </div>

            {/* Bulle 3 : Bas-droit — Réseau & DevOps */}
            <div
              className="absolute bottom-1 -right-2 md:bottom-2 md:-right-3 w-6 h-6 md:w-7 md:h-7 rounded-full border border-accent/30 bg-card-bg/90 backdrop-blur-xs text-accent shadow-xs flex items-center justify-center animate-float-4 pointer-events-none"
              aria-hidden="true"
            >
              <IconNetwork size={13} stroke={1.8} />
            </div>

            {/* Bulle 4 : Haut-gauche — Petite orbe lumineuse */}
            <div
              className="absolute top-1 -left-2 md:top-2 md:-left-3 w-3 h-3 md:w-4 md:h-4 rounded-full border border-accent/40 bg-accent/25 shadow-xs animate-float-3 pointer-events-none"
              aria-hidden="true"
            />

            {/* Bulle 5 : Milieu-gauche — Point accent discret */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-4 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-accent/50 animate-float-5 pointer-events-none"
              aria-hidden="true"
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
          <nav
            aria-label="Liens personnels"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 text-sm"
          >
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
            <span className="text-border" aria-hidden="true">
              ·
            </span>
            <a
              href={data.resumeUrl}
              download
              className="link-underline text-accent"
            >
              Télécharger le CV
            </a>
          </nav>

          {/* Lien vers projets */}
          <div className="mt-8">
            <a
              href="#projets"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              ↓ Voir les projets
            </a>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
