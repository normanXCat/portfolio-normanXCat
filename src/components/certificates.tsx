"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { FadeIn } from "./fade-in";
import { IconFileText, IconExternalLink, IconAward } from "@tabler/icons-react";

export type CertificateItem = {
  pdfUrl: string;
  thumbnailUrl: string;
  title: string;
  issuer?: string | null;
  date: string;
  code?: string | null;
  description?: string | null;
  verificationUrl?: string | null;
  width?: number;
  height?: number;
};

/**
 * Calcule les classes Tailwind de span bento selon le ratio réel du PDF (width / height)
 * et le nombre d'éléments pour garantir une mosaïque dense et sans espace vide.
 */
function getBentoSpanClasses(cert: CertificateItem, totalCount: number): string {
  const width = cert.width || 1241;
  const height = cert.height || 1754;
  const ratio = width / height;

  if (ratio > 1.15) {
    // Format Paysage : 2 colonnes sur desktop
    // Sur tablette (2 colonnes) : 1 colonne si 2 certificats pour remplir la rangée 1+1 sans trou
    return totalCount === 2
      ? "col-span-1 md:col-span-1 lg:col-span-2"
      : "col-span-1 md:col-span-2 lg:col-span-2";
  }

  // Format Portrait ou Carré : 1 colonne
  return "col-span-1";
}

/**
 * Carte de certificat bento avec effet de bascule 3D (tilt) au survol,
 * liseré décoratif intérieur façon diplôme, badge de sceau d'attestation,
 * reflet lumineux (glare) subtil et panneau d'informations en surimpression floutée.
 */
function CertificateCard({
  cert,
  index,
  totalCount,
}: {
  cert: CertificateItem;
  index: number;
  totalCount: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const width = cert.width || 1241;
  const height = cert.height || 1754;
  const isLandscape = width > height;
  const spanClasses = getBentoSpanClasses(cert, totalCount);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // Rotation légère (max ~8-9°) pour préserver l'élégance
      setRotateY(x * 16);
      setRotateX(-y * 16);

      // Calcul de la position du reflet lumineux
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      setGlarePos({ x: Math.round(px), y: Math.round(py) });
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
    setGlarePos({ x: 50, y: 50 });
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
    <FadeIn delay={index * 0.08} className={`w-full ${spanClasses}`}>
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
                : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            transformStyle: "preserve-3d",
            transition: isHovered
              ? "transform 0.12s ease-out, box-shadow 0.25s ease"
              : "transform 0.4s ease-out, box-shadow 0.3s ease",
          }}
          className="relative w-full h-[360px] sm:h-[420px] md:h-[440px] rounded-xl overflow-hidden bg-card-bg/75 border border-border/80 shadow-md shadow-foreground/[0.03] dark:shadow-black/25 hover:shadow-2xl hover:shadow-accent/15 dark:hover:shadow-black/50 hover:border-accent/50 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent select-none group"
        >
          {/* Badge de sceau permanent dans le coin supérieur */}
          <div
            aria-hidden="true"
            className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-background/85 dark:bg-card-bg/90 backdrop-blur-md border border-border/80 text-accent flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:border-accent/60"
            title="Certificat"
          >
            <IconAward size={15} strokeWidth={2} />
          </div>

          {/* Vignette de la première page du PDF avec cadre décoratif façon diplôme */}
          <div className="relative w-full h-full p-2.5 sm:p-3 flex items-center justify-center bg-card-bg/40">
            <div className="relative w-full h-full rounded-lg overflow-hidden p-1.5 border border-border/60 bg-background/50 dark:bg-card-bg/50 shadow-inner flex items-center justify-center">
              {/* Liseré fin intérieur décoratif */}
              <div
                aria-hidden="true"
                className="absolute inset-1 rounded-[6px] border border-border/40 dark:border-border/60 pointer-events-none z-1"
              />

              <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                <Image
                  src={cert.thumbnailUrl}
                  alt={`Certificat ${cert.title}`}
                  fill
                  sizes={
                    isLandscape
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 680px"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                  }
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </div>
          </div>

          {/* Reflet lumineux subtil suivant le curseur */}
          {!shouldReduceMotion && isHovered && (
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
              style={{
                background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%)`,
              }}
            />
          )}

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
            className={`absolute inset-0 ${
              isLandscape ? "p-4 sm:p-6" : "p-5 sm:p-6"
            } flex flex-col justify-between bg-background/92 dark:bg-card-bg/94 backdrop-blur-md border border-border/70 rounded-xl z-20 transition-opacity duration-250 overflow-y-auto ${
              isOverlayActive
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Haut du panneau : Titre, Organisme, Date, Code, Description */}
            <div>
              <h3
                className={`font-serif ${
                  isLandscape ? "text-lg sm:text-2xl" : "text-lg sm:text-xl"
                } font-semibold text-foreground leading-snug`}
              >
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
                <p
                  className={`text-xs text-foreground/80 ${
                    isLandscape ? "mt-2 line-clamp-3 sm:line-clamp-4 max-w-[540px]" : "mt-2.5 line-clamp-4"
                  } leading-relaxed`}
                >
                  {cert.description}
                </p>
              )}
            </div>

            {/* Bas du panneau : Actions (Ouvrir PDF / Vérifier) */}
            <div
              className={`${
                isLandscape ? "pt-3" : "pt-3"
              } border-t border-border/50 flex flex-wrap items-center justify-between gap-2 mt-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton pour ouvrir le PDF original */}
              <a
                href={cert.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-accent text-background hover:bg-accent/90 transition-colors shadow-xs"
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
 * Section Certifications & Attestations — mosaïque dense Bento Grid (sans espace vide),
 * chaque carte occupant un span horizontal/vertical adapté à son ratio PDF réel.
 */
export function Certificates({ data }: { data: CertificateItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      id="certifications"
      className="mb-20 md:mb-28 scroll-mt-24 max-w-[1040px] mx-auto w-full"
    >
      <FadeIn>
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8 text-center md:text-left">
          Certifications
        </h2>
      </FadeIn>

      {/* Bento Grid : 3 colonnes desktop, 2 colonnes tablette, 1 colonne mobile avec flux dense */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 [grid-auto-flow:dense]">
        {data.map((cert, index) => (
          <CertificateCard
            key={cert.pdfUrl}
            cert={cert}
            index={index}
            totalCount={data.length}
          />
        ))}
      </div>
    </section>
  );
}
