"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Fournisseur de thème utilisant next-themes.
 * Permet de gérer les thèmes clair/sombre dans toute l'application.
 * 
 * @param props - Les propriétés du composant, incluant children et les options de next-themes.
 * @returns Le composant ThemeProvider.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
