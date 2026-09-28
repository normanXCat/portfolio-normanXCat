"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Provider de thème basé sur next-themes.
 * Gère le thème système par défaut, mémorise le choix dans localStorage,
 * et applique la classe .dark sans flash au chargement.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
