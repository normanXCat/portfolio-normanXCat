"use client";

import type { ReactNode } from "react";
import { FadeIn } from "./fade-in";
import { IconTarget, IconRocket, IconSettings } from "@tabler/icons-react";

export type ApproachItem = {
  icon: string;
  title: string;
  description: string;
};

/**
 * Associe chaque clé d'icône à son équivalent Tabler monochrome.
 */
function getApproachIcon(icon: string): ReactNode {
  const iconClass = "w-4 h-4 text-accent shrink-0";

  switch (icon) {
    case "target":
      return <IconTarget size={18} className={iconClass} aria-hidden="true" />;
    case "rocket":
      return <IconRocket size={18} className={iconClass} aria-hidden="true" />;
    case "settings":
      return <IconSettings size={18} className={iconClass} aria-hidden="true" />;
    default:
      return null;
  }
}

/**
 * Section Approche — 3 piliers exprimant l'état d'esprit et la rigueur d'ingénieur.
 * Style sobre et aéré dans l'esprit de la section À propos, sans cartes lourdes.
 */
export function Approach({ data }: { data: ApproachItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      id="approche"
      className="mb-20 md:mb-28 scroll-mt-24 max-w-[740px] mx-auto w-full"
    >
      <FadeIn>
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8 text-center md:text-left">
          Approche
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {data.map((item, index) => (
          <FadeIn
            key={item.title}
            delay={index * 0.1}
            className="flex flex-col justify-start"
          >
            <div className="flex items-center gap-2 text-foreground font-medium text-sm mb-2.5">
              {getApproachIcon(item.icon)}
              <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed">
              {item.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
