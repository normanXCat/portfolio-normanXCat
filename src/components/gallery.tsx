"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { FadeIn } from "./fade-in";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

/**
 * Calcule dynamiquement les spans Bento Grid selon le ratio réel de chaque image.
 * - Format Portrait (ratio < 0.85) : 1 colonne x 2 rangées (hauteur doublée).
 * - Première image Paysage (vedette) : 2 colonnes x 2 rangées sur desktop, 2x1 sur mobile.
 * - Autres images Paysage : 2 colonnes x 1 rangée.
 * - Carré ou standard : 1x1.
 */
function getGalleryBentoSpan(
  img: GalleryImage,
  index: number,
  allImages: GalleryImage[]
): string {
  const width = img.width || 1200;
  const height = img.height || 800;
  const ratio = width / height;

  // Portrait (ex: photo verticale) -> 1 col, 2 rangées
  if (ratio < 0.85) {
    return "col-span-1 row-span-2";
  }

  // Première image paysage : mise en valeur majeure (2x2 sur desktop)
  const firstLandscapeIndex = allImages.findIndex((item) => {
    const w = item.width || 1200;
    const h = item.height || 800;
    return w / h >= 1.2;
  });

  if (index === firstLandscapeIndex) {
    return "col-span-2 row-span-1 md:col-span-2 md:row-span-2";
  }

  // Autres images paysage -> 2 colonnes x 1 rangée
  if (ratio > 1.2) {
    return "col-span-2 row-span-1 md:col-span-2 md:row-span-1";
  }

  // Carré ou standard
  return "col-span-1 row-span-1";
}

/**
 * Section Galerie — mosaïque Bento Grid dense (sans espace vide)
 * avec spans adaptatifs calculés au build selon les dimensions réelles,
 * et lightbox accessible plein écran au clic.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = lightboxIndex !== null;

  const open = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
    document.documentElement.setAttribute("data-lightbox-open", "true");
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setLightboxIndex(null);
    document.documentElement.removeAttribute("data-lightbox-open");
    document.body.style.overflow = "";
    previousFocusRef.current?.focus();
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  /* Keyboard navigation */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") {
        /* Trap focus inside lightbox */
        e.preventDefault();
        overlayRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, close, prev, next]);

  /* Focus the overlay on open */
  useEffect(() => {
    if (isOpen) overlayRef.current?.focus();
  }, [isOpen]);

  if (images.length === 0) return null;

  const current = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <section id="galerie" className="mb-20 md:mb-28 scroll-mt-24 max-w-[1040px] mx-auto w-full">
      <FadeIn>
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8 text-center md:text-left">
          Galerie
        </h2>
      </FadeIn>

      {/* Mosaïque Bento Grid dense : 4 colonnes desktop, 2 colonnes mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[190px] md:auto-rows-[220px] gap-4 sm:gap-5 md:gap-6 [grid-auto-flow:dense]">
        {images.map((img, index) => {
          const spanClass = getGalleryBentoSpan(img, index, images);

          return (
            <FadeIn
              key={img.src}
              delay={index * 0.05}
              className={`h-full ${spanClass}`}
            >
              <button
                type="button"
                onClick={() => open(index)}
                className="group relative w-full h-full rounded-xl overflow-hidden bg-card-bg/40 border border-border/75 hover:border-accent/50 transition-all duration-300 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-accent block"
                aria-label={`Agrandir : ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                />

                {/* Voile d'ombrage au survol et légende éventuelle */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-3 sm:p-4"
                  aria-hidden="true"
                >
                  {img.caption && (
                    <p className="text-white text-xs font-medium truncate drop-shadow-xs">
                      {img.caption}
                    </p>
                  )}
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>

      {/* Lightbox accessible plein écran */}
      {isOpen && current && (
        <div
          ref={overlayRef}
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Image : ${current.alt}`}
          tabIndex={-1}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl z-10 p-2 cursor-pointer"
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl z-10 p-2 cursor-pointer"
              aria-label="Image précédente"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div className="flex flex-col items-center gap-3 max-w-[90vw]">
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width || 1200}
              height={current.height || 800}
              sizes="90vw"
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              priority
            />
            {current.caption && (
              <p className="text-white/80 text-sm text-center max-w-lg">
                {current.caption}
              </p>
            )}
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl z-10 p-2 cursor-pointer"
              aria-label="Image suivante"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}
