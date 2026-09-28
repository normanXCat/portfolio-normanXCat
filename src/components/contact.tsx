"use client";

import { FadeIn } from "./fade-in";

type ContactData = {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  availability: string;
  languages: string;
};

/**
 * Section Contact & Footer — invitation, email, téléphone, liens, langues, disponibilité, copyright.
 */
export function Contact({ data }: { data: ContactData }) {
  return (
    <FadeIn as="footer" id="contact" className="scroll-mt-24 max-w-[740px] mx-auto">
      <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted mb-6">
        Contact
      </h2>

      <p className="text-foreground/85 text-base mb-6">
        Un projet en tête ou envie d&apos;échanger ? N&apos;hésitez pas à me contacter.
      </p>

      {/* Coordonnées */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-4">
        <a
          href={`mailto:${data.email}`}
          className="link-underline text-accent"
        >
          {data.email}
        </a>
        <span className="text-border" aria-hidden="true">·</span>
        <span className="text-muted">{data.phone}</span>
        <span className="text-border" aria-hidden="true">·</span>
        <a
          href={data.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-accent"
        >
          LinkedIn
        </a>
        <span className="text-border" aria-hidden="true">·</span>
        <a
          href={data.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-accent"
        >
          GitHub
        </a>
      </div>

      {/* Langues */}
      <p className="text-sm text-muted mb-2">
        {data.languages}
      </p>

      {/* Disponibilité */}
      <p className="text-sm text-muted mb-10">
        {data.availability}
      </p>

      {/* Copyright */}
      <p className="text-xs text-muted/60 border-t border-border pt-6">
        © {new Date().getFullYear()} Norman Vonizara
      </p>
    </FadeIn>
  );
}
