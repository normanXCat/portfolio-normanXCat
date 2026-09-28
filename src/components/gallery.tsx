"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Galerie d'images responsive avec lightbox maison.
 * Grille : 2 colonnes mobile, 3 desktop.
 * Lightbox : Échap, clic sur fond, flèches clavier, focus piégé, aria-modal.
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
    <section id="galerie" className="mb-20 md:mb-28 scroll-mt-24 max-w-[1100px] mx-auto">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-8">
        Galerie
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, index) => (
          <button
            key={img.src}
            onClick={() => open(index)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-card-bg border border-border hover:border-card-hover-border transition-colors group cursor-pointer"
            aria-label={`Agrandir : ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              loading="lazy"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
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
            onClick={close}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl z-10 p-2"
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Previous */}
          {images.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl z-10 p-2"
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
              width={1200}
              height={800}
              sizes="90vw"
              className="max-h-[80vh] w-auto object-contain rounded"
              priority
            />
            {current.caption && (
              <p className="text-white/70 text-sm text-center max-w-lg">
                {current.caption}
              </p>
            )}
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl z-10 p-2"
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
