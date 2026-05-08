import type { Metadata } from "next";
import { Pacifico, Source_Code_Pro, Pangolin } from "next/font/google";
import "./globals.css";

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
        className={`${pacifico.variable} ${sourceCodePro.variable} ${pangolin.variable} antialiased`}
      >
        <main className="max-w-2xl mx-auto px-6 py-12 md:py-24">
          {children}
        </main>
      </body>
    </html>
  );
}
