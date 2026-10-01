"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { FadeIn } from "./fade-in";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  order?: number;
};

/**
 * Section Galerie — agencement Masonry naturel (façon Pinterest) avec CSS columns.
 * Chaque image conserve ses dimensions et son ratio natifs (aucun recadrage, aucune tête coupée).
 * Lightbox accessible plein écran au clic.
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

      {/* Masonry naturel via CSS columns : 4 cols desktop, 3 tablette, 2 mobile */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 md:gap-6">
        {images.map((img, index) => (
          <div
            key={img.src}
            className="break-inside-avoid mb-4 sm:mb-5 md:mb-6"
          >
            <FadeIn delay={index * 0.04}>
              <button
                type="button"
                onClick={() => open(index)}
                className="group relative w-full rounded-xl overflow-hidden bg-card-bg/40 border border-border/70 hover:border-accent/40 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent block"
                aria-label={`Agrandir : ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index < 4 ? "eager" : "lazy"}
                  className="w-full h-auto object-contain block group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Voile d'ombrage au survol et légende éventuelle */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-3 sm:p-4"
                  aria-hidden="true"
                >
                  {img.caption && (
                    <p className="text-white text-xs font-medium line-clamp-2 drop-shadow-xs text-left">
                      {img.caption}
                    </p>
                  )}
                </div>
              </button>
            </FadeIn>
          </div>
        ))}
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
