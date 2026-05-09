import type { Metadata } from "next";
import { Pacifico, Source_Code_Pro, Pangolin, Advent_Pro } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { IconNetwork } from "@tabler/icons-react";

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
  title: "Norman Vonizara | Développeur Full-Stack & Télécommunications",
  description:
    "Portfolio de Norman Vonizara. Expertises en Développement Web & Mobile, Télécommunications, Réseaux, DevOps, Machine Learning et systèmes embarqués (Arduino).",
  keywords: [
    "Norman Vonizara",
    "Développeur Full-Stack",
    "Frontend",
    "Next.js",
    "React",
    "Télécommunications",
    "Réseaux",
    "DevOps",
    "Machine Learning",
    "Arduino",
    "Madagascar",
    "Antsiranana"
  ],
  authors: [{ name: "Norman Vonizara" }],
  creator: "Norman Vonizara",
  openGraph: {
    title: "Norman Vonizara — Développeur Full-Stack",
    description:
      "Découvrez mes projets et compétences en développement Web/Mobile, Télécommunications, DevOps et Machine Learning.",
    url: "https://normanvonizara.dev",
    siteName: "Portfolio Norman Vonizara",
    images: [
      {
        url: "/profil.norman.jpg",
        width: 800,
        height: 800,
        alt: "Photo de profil de Norman Vonizara",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Norman Vonizara — Développeur Full-Stack",
    description:
      "Découvrez mes projets et compétences en développement Web/Mobile, Télécommunications, DevOps et Machine Learning.",
    images: ["/profil.norman.jpg"],
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
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
