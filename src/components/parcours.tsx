"use client";

import type { ReactNode } from "react";
import { FadeIn } from "./fade-in";
import { IconBriefcase, IconSchool, IconTrophy } from "@tabler/icons-react";

type ParcoursEntry = {
  period: string;
  title: string;
  location: string;
};

type ParcoursData = {
  experience: ParcoursEntry[];
  formation: ParcoursEntry[];
};

/**
 * Détermine l'icône appropriée selon le contenu de l'entrée.
 */
function getParcoursIcon(title: string, isFormation: boolean): ReactNode {
  const iconClass = "w-4 h-4 shrink-0 transition-colors";

  if (isFormation) {
    return <IconSchool size={16} className={iconClass} aria-hidden="true" />;
  }

  if (title.toLowerCase().includes("hackathon")) {
    return <IconTrophy size={16} className={iconClass} aria-hidden="true" />;
  }

  return <IconBriefcase size={16} className={iconClass} aria-hidden="true" />;
}

/**
 * Entrée unitaire d'expérience ou formation.
 * Structure à deux zones : période monospace à gauche, détails et icône à droite.
 */
function EntryItem({
  entry,
  isFormation,
  index,
}: {
  entry: ParcoursEntry;
  isFormation: boolean;
  index: number;
}) {
  const isHackathon = entry.title.toLowerCase().includes("hackathon");

  return (
    <FadeIn
      as="li"
      delay={index * 0.05}
      className="group -mx-2.5 px-2.5 py-3.5 rounded-lg border-b border-border/50 last:border-b-0 hover:bg-card-bg/60 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
        {/* Zone gauche : période en police monospace */}
        <span className="font-mono text-xs text-muted/90 sm:w-[130px] sm:shrink-0 tabular-nums pt-0.5 tracking-tight">
          {entry.period}
        </span>

        {/* Zone droite : icône, intitulé, lieu et précisions */}
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <span
            className="text-muted group-hover:text-accent transition-colors pt-0.5 shrink-0"
            aria-hidden="true"
          >
            {getParcoursIcon(entry.title, isFormation)}
          </span>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-accent transition-colors">
              {entry.title}
            </h4>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-muted/80">
                {entry.location}
              </span>

              {isHackathon && (
                <span className="inline-block px-1.5 py-0.2 text-[10px] font-mono tracking-tight rounded bg-chip-bg text-accent border border-accent/25">
                  2ᵉ place
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/**
 * Section Parcours — deux colonnes structurées côte à côte (Expérience & Formation).
 * Pas de cartes, pas de ligne verticale de timeline : liste épurée avec périodes en colonne.
 */
export function Parcours({ data }: { data: ParcoursData }) {
  return (
    <FadeIn
      as="section"
      id="parcours"
      className="mb-20 md:mb-28 scroll-mt-24 max-w-[880px] mx-auto w-full"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-10 text-center md:text-left">
        Parcours
      </h2>

      {/* Grille 2 colonnes sur desktop (>= 768px), empilée sur mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
        {/* Colonne 1 : Expérience Professionnelle */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/90 mb-5 flex items-center gap-2 pb-2 border-b border-border/80">
            <IconBriefcase size={15} className="text-accent" aria-hidden="true" />
            <span>Expérience Professionnelle</span>
          </h3>

          <ul role="list" className="space-y-1">
            {data.experience.map((entry, index) => (
              <EntryItem
                key={`${entry.title}-${index}`}
                entry={entry}
                isFormation={false}
                index={index}
              />
            ))}
          </ul>
        </div>

        {/* Colonne 2 : Formation Académique */}
        <div>
          <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground/90 mb-5 flex items-center gap-2 pb-2 border-b border-border/80">
            <IconSchool size={15} className="text-accent" aria-hidden="true" />
            <span>Formation Académique</span>
          </h3>

          <ul role="list" className="space-y-1">
            {data.formation.map((entry, index) => (
              <EntryItem
                key={`${entry.title}-${index}`}
                entry={entry}
                isFormation={true}
                index={index}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Mention discrète vers le CV */}
      <div className="mt-8 pt-4 border-t border-border/50 flex items-center justify-between flex-wrap gap-2 text-xs text-muted/70 italic">
        <span>Attestations et détails complets disponibles dans le CV.</span>
        <a
          href="/curriculum_vitae_normaXCat.pdf"
          download
          className="link-underline text-accent not-italic font-sans text-xs font-medium"
        >
          Télécharger le CV PDF ↗
        </a>
      </div>
    </FadeIn>
  );
}
