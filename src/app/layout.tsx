import type { Metadata } from "next";
import {
  Pacifico,
  Source_Code_Pro,
  Pangolin,
  Advent_Pro,
} from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  variable: "--font-source-code",
});

const pangolin = Pangolin({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pangolin",
});

const adventPro = Advent_Pro({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--font-advent-pro",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norman-x-cat.vercel.app"),

  title: {
    default: "Norman Vonizara | Développeur Full-Stack",
    template: "%s | Norman Vonizara",
  },

  description:
    "Portfolio de Norman Vonizara, développeur Full-Stack orienté Frontend. Master 1 STIC Télécommunications & Réseaux — ESP Antsiranana.",

  authors: [
    { name: "Norman Vonizara", url: "https://norman-x-cat.vercel.app" },
  ],
  creator: "Norman Vonizara",
  publisher: "Norman Vonizara",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://norman-x-cat.vercel.app",
    siteName: "Norman Vonizara",
    title: "Norman Vonizara | Développeur Full-Stack",
    description:
      "Portfolio de Norman Vonizara, développeur Full-Stack orienté Frontend.",
    images: [
      {
        url: "/og-image.png", // ajoute une image dans public/
        width: 1200,
        height: 630,
        alt: "Norman Vonizara — Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Norman Vonizara | Développeur Full-Stack",
    description: "Portfolio de Norman Vonizara.",
  },

  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
};

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Composant de mise en page racine de l'application.
 * Définit la structure HTML de base, les polices, le thème et les composants globaux.
 * 
 * @param props - Les propriétés du composant.
 * @param props.children - Le contenu à afficher à l'intérieur de la mise en page.
 * @returns Le composant RootLayout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${pacifico.variable} ${sourceCodePro.variable} ${pangolin.variable} ${adventPro.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeToggle />
          <ScrollProgress />
          <div className="grid-background" aria-hidden="true" />

          <main className="max-w-2xl mx-auto px-6 py-12 md:py-24 relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
