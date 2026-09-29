import { promises as fs } from "fs";
import path from "path";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Gallery } from "@/components/gallery";
import { Skills } from "@/components/skills";
import { Parcours } from "@/components/parcours";
import { Certifications } from "@/components/certifications";
import { Contact } from "@/components/contact";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Lit dynamiquement les images du dossier public/gallery/ au build.
 * Filtre les extensions valides, trie par ordre alphabétique,
 * et associe les légendes de captions.json si présent.
 */
async function getGalleryImages(): Promise<GalleryImage[]> {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  try {
    const files = await fs.readdir(galleryDir);
    const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
    const imageFiles = files
      .filter((file) => validExtensions.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    if (imageFiles.length === 0) return [];

    let captions: Record<string, string> = {};
    const captionsFile = path.join(galleryDir, "captions.json");
    try {
      const captionsContent = await fs.readFile(captionsFile, "utf8");
      captions = JSON.parse(captionsContent);
    } catch {
      // captions.json optionnel
    }

    return imageFiles.map((file) => {
      const nameWithoutExt = path.parse(file).name.replace(/[-_]/g, " ");
      return {
        src: `/gallery/${file}`,
        alt: captions[file] || nameWithoutExt,
        caption: captions[file],
      };
    });
  } catch {
    return [];
  }
}

/**
 * Page d'accueil — une seule page, défilement vertical, sans navbar.
 * Lit les données depuis public/data.json et les images de public/gallery/.
 */
export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);

  const galleryImages = await getGalleryImages();

  return (
    <>
      <Hero data={data.hero} />
      <About text={data.about} />
      <Projects data={data.projects} />
      {galleryImages.length > 0 && <Gallery images={galleryImages} />}
      <Skills data={data.skills} />
      <Parcours data={data.parcours} />
      {data.certifications && data.certifications.length > 0 && (
        <Certifications data={data.certifications} />
      )}
      <Contact data={data.contact} />
    </>
  );
}
