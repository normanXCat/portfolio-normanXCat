import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${dmSerif.variable} ${dmSans.variable} antialiased`}
      >
        <main className="max-w-2xl mx-auto px-6 py-12 md:py-24">
          {children}
        </main>
      </body>
    </html>
  );
}
