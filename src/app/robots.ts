import { MetadataRoute } from "next";

/**
 * Génère la configuration du fichier robots.txt.
 * 
 * @returns La configuration robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://norman-x-cat.vercel.app/sitemap.xml",
  };
}
