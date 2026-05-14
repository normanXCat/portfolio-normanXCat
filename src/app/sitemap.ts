import { MetadataRoute } from "next";

/**
 * Génère le plan du site (sitemap.xml).
 * 
 * @returns La configuration du sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://norman-x-cat.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
