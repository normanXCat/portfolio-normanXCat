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
  title: "Norman Vonizara — Développeur Full-Stack",
  description:
    "Portfolio de Norman Vonizara, développeur full-stack frontend spécialisé Next.js, React et TypeScript.",
  openGraph: {
    title: "Norman Vonizara — Développeur Full-Stack",
    description: "Portfolio de Norman Vonizara.",
    url: "https://normanvonizara.dev",
    locale: "fr_FR",
    type: "website",
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
