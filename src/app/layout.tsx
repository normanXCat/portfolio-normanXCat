import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Franklin } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-libre-franklin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norman-x-cat.vercel.app"),

  title: {
    default: "Norman Vonizara — Développeur Full-Stack",
    template: "%s | Norman Vonizara",
  },

  description:
    "Portfolio de Norman Vonizara — Développeur Full-Stack & Réseaux, Télécommunications, IA & DevOps. Master 1 STIC — ESP Antsiranana.",

  authors: [
    { name: "Norman Vonizara", url: "https://norman-x-cat.vercel.app" },
  ],
  creator: "Norman Vonizara",

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://norman-x-cat.vercel.app",
    siteName: "Norman Vonizara",
    title: "Norman Vonizara — Développeur Full-Stack",
    description:
      "Portfolio de Norman Vonizara — Développeur Full-Stack & Réseaux, Télécommunications, IA & DevOps.",
  },

  twitter: {
    card: "summary",
    title: "Norman Vonizara — Développeur Full-Stack",
    description:
      "Portfolio de Norman Vonizara — Développeur Full-Stack & Réseaux, Télécommunications, IA & DevOps.",
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

/**
 * Layout racine — structure minimale, deux polices, pas de navbar ni de toggle de thème.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} ${libreFranklin.variable} antialiased`}
      >
        <main className="max-w-[740px] mx-auto px-6 py-16 md:py-28">
          {children}
        </main>
      </body>
    </html>
  );
}
