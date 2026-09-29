"use client";

import { FadeIn } from "./fade-in";
import { IconCertificate, IconTrophy, IconAward } from "@tabler/icons-react";

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  description: string | null;
  url: string | null;
};

/**
 * Icône selon le type de certification ou attestation
 */
function getCertIcon(title: string) {
  const iconClass = "w-4 h-4 shrink-0 transition-colors";

  if (title.toLowerCase().includes("hackathon")) {
    return <IconTrophy size={16} className={iconClass} aria-hidden="true" />;
  }

  if (title.toLowerCase().includes("aws") || title.toLowerCase().includes("responsabilité")) {
    return <IconAward size={16} className={iconClass} aria-hidden="true" />;
  }

  return <IconCertificate size={16} className={iconClass} aria-hidden="true" />;
}

/**
 * Section Certifications & Attestations — liste verticale sobre et épurée.
 * Période monospace à gauche, détails, organisme et description courte à droite.
 */
export function Certifications({ data }: { data: CertificationItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <FadeIn
      as="section"
      id="certifications"
      className="mb-20 md:mb-28 scroll-mt-24 max-w-[740px] mx-auto w-full"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8 text-center md:text-left">
        Certifications & Attestations
      </h2>

      <ul role="list" className="space-y-1">
        {data.map((cert, index) => {
          const hasLink = Boolean(cert.url);

          return (
            <FadeIn
              key={`${cert.title}-${index}`}
              as="li"
              delay={index * 0.04}
              className="group -mx-2.5 px-2.5 py-3.5 rounded-lg border-b border-border/50 last:border-b-0 hover:bg-card-bg/60 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                {/* Zone gauche : Date / Période en monospace */}
                <span className="font-mono text-xs text-muted/90 sm:w-[140px] sm:shrink-0 tabular-nums pt-0.5 tracking-tight">
                  {cert.date}
                </span>

                {/* Zone droite : Icône, Titre, Organisme, Description et Lien */}
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span
                    className="text-muted group-hover:text-accent transition-colors pt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    {getCertIcon(cert.title)}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground leading-snug group-hover:text-accent transition-colors">
                      {cert.title}
                    </h3>

                    {cert.issuer && (
                      <p className="text-xs text-muted/80 mt-0.5">
                        {cert.issuer}
                      </p>
                    )}

                    {cert.description && (
                      <p className="text-xs text-foreground/80 mt-1.5 leading-relaxed max-w-[560px]">
                        {cert.description}
                      </p>
                    )}

                    {hasLink && (
                      <div className="mt-2">
                        <a
                          href={cert.url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1"
                        >
                          <span>Voir le certificat</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </ul>
    </FadeIn>
  );
}
