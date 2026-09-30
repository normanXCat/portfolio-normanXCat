"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { IconFileText, IconExternalLink } from "@tabler/icons-react";

export type CertificateItem = {
  pdfUrl: string;
  thumbnailUrl: string;
  title: string;
  issuer?: string | null;
  date: string;
  code?: string | null;
  description?: string | null;
  verificationUrl?: string | null;
};

/**
 * Carte de certificat unitaire avec effet de bascule 3D (tilt) au survol,
 * panneau d'informations en surimpression floutée (backdrop-blur)
 * et bascule au tap sur mobile / tactile.
 */
function CertificateCard({
  cert,
  index,
}: {
  cert: CertificateItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Rotation légère (max ~8-9°) pour rester élégant
      setRotateY(x * 16);
      setRotateX(-y * 16);
    },
    [shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  }, []);

  const handleToggleMobile = useCallback(() => {
    setIsOpenMobile((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpenMobile((prev) => !prev);
      }
    },
    []
  );

  const isOverlayActive = isHovered || isOpenMobile;

  return (
    <FadeIn delay={index * 0.08} className="h-full">
      <div
        style={{ perspective: 1000 }}
        className="w-full h-full"
      >
        <div
          ref={cardRef}
          tabIndex={0}
          role="region"
          aria-label={`Certificat ${cert.title}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleToggleMobile}
          onKeyDown={handleKeyDown}
          style={{
            transform:
              shouldReduceMotion || !isHovered
                ? "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
                : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`,
            transformStyle: "preserve-3d",
            transition: isHovered
              ? "transform 0.12s ease-out, box-shadow 0.25s ease"
              : "transform 0.4s ease-out, box-shadow 0.3s ease",
          }}
          className="relative w-full aspect-[4/3] sm:aspect-[1/1.25] rounded-xl overflow-hidden bg-card-bg/60 border border-border/70 shadow-xs hover:shadow-lg hover:border-accent/40 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent select-none group"
        >
          {/* Vignette de la première page du PDF */}
          <div className="relative w-full h-full p-2.5 sm:p-3 flex items-center justify-center bg-card-bg/40">
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xs">
              <Image
                src={cert.thumbnailUrl}
                alt={`Certificat ${cert.title}`}
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="object-contain"
                priority={index === 0}
              />
            </div>
          </div>

          {/* Panneau d'informations en surimpression (flou + fondu 3D) */}
          <div
            style={{
              transform:
                shouldReduceMotion || !isOverlayActive
                  ? "translateZ(0px)"
                  : "translateZ(26px)",
              transition:
                "opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-background/90 dark:bg-card-bg/92 backdrop-blur-md border border-border/60 rounded-xl transition-opacity duration-250 ${
              isOverlayActive
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Haut du panneau : Titre, Organisme, Date, Code, Description */}
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground leading-snug">
                {cert.title}
              </h3>

              {cert.issuer && (
                <p className="text-xs font-medium text-accent mt-1">
                  {cert.issuer}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted/80 font-mono mt-1">
                <span>{cert.date}</span>
                {cert.code && (
                  <>
                    <span className="text-border" aria-hidden="true">·</span>
                    <span>Code : {cert.code}</span>
                  </>
                )}
              </div>

              {cert.description && (
                <p className="text-xs text-foreground/80 mt-2.5 leading-relaxed line-clamp-4">
                  {cert.description}
                </p>
              )}
            </div>

            {/* Bas du panneau : Actions (Ouvrir PDF / Vérifier) */}
            <div
              className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 mt-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton pour ouvrir le PDF original */}
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-accent text-background hover:bg-accent/90 transition-colors"
              >
                <IconFileText size={14} aria-hidden="true" />
                <span>Ouvrir le PDF</span>
              </a>

              {/* Lien externe de vérification si disponible */}
              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline underline-offset-4"
                >
                  <span>Vérifier</span>
                  <IconExternalLink size={13} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/**
 * Section Certifications & Attestations — vignettes avec effet 3D tilt au survol
 * et panneau d'informations en surimpression.
 */
export function Certificates({ data }: { data: CertificateItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      id="certifications"
      className="mb-20 md:mb-28 scroll-mt-24 max-w-[740px] mx-auto w-full"
    >
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8 text-center md:text-left">
        Certifications
      </h2>

      {/* Grille 2 colonnes sur tablette/desktop, 1 colonne sur mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {data.map((cert, index) => (
          <CertificateCard
            key={cert.pdfUrl}
            cert={cert}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
