import { promises as fs } from "fs";
import path from "path";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Projects } from "@/components/projects";
import { Gallery } from "@/components/gallery";
import { Skills } from "@/components/skills";
import { Parcours } from "@/components/parcours";
import { Certificates, type CertificateItem } from "@/components/certificates";
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
 * Lit dynamiquement les certificats PDF du dossier public/certificates/ au build.
 * Pour chaque PDF trouvé, vérifie si une vignette image compagnon (.png, .webp, .jpg) existe.
 * Associe les métadonnées de meta.json si présent.
 */
async function getCertificates(): Promise<CertificateItem[]> {
  const certDir = path.join(process.cwd(), "public", "certificates");
  try {
    const files = await fs.readdir(certDir);
    const pdfFiles = files
      .filter((file) => path.extname(file).toLowerCase() === ".pdf")
      .sort((a, b) => a.localeCompare(b));

    if (pdfFiles.length === 0) return [];

    let meta: Record<string, Partial<CertificateItem>> = {};
    const metaFile = path.join(certDir, "meta.json");
    try {
      const metaContent = await fs.readFile(metaFile, "utf8");
      meta = JSON.parse(metaContent);
    } catch {
      // meta.json optionnel
    }

    const validImageExts = [".png", ".webp", ".jpg", ".jpeg"];

    return pdfFiles.map((pdfFile) => {
      const baseName = path.parse(pdfFile).name;
      const fileMeta = meta[pdfFile] || {};

      // Cherche une vignette compagnon dans public/certificates/
      let thumbnail = `/certificates/${baseName}.png`;
      for (const ext of validImageExts) {
        if (files.includes(`${baseName}${ext}`)) {
          thumbnail = `/certificates/${baseName}${ext}`;
          break;
        }
      }

      const formattedTitle = baseName
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      return {
        pdfUrl: `/certificates/${pdfFile}`,
        thumbnailUrl: thumbnail,
        title: fileMeta.title || formattedTitle,
        issuer: fileMeta.issuer ?? null,
        date: fileMeta.date || "",
        code: fileMeta.code ?? null,
        description: fileMeta.description ?? null,
        verificationUrl: fileMeta.verificationUrl ?? null,
        width: typeof fileMeta.width === "number" ? fileMeta.width : 1241,
        height: typeof fileMeta.height === "number" ? fileMeta.height : 1754,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Page d'accueil — une seule page, défilement vertical, sans navbar.
 * Lit les données depuis public/data.json, les images de public/gallery/ et les certificats de public/certificates/.
 */
export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);

  const galleryImages = await getGalleryImages();
  const certificates = await getCertificates();

  return (
    <>
      <Hero data={data.hero} />
      <About text={data.about} />
      <Projects data={data.projects} />
      {data.approach && <Approach data={data.approach} />}
      {galleryImages.length > 0 && <Gallery images={galleryImages} />}
      <Skills data={data.skills} />
      <Parcours data={data.parcours} />
      {certificates.length > 0 && <Certificates data={certificates} />}
      <Contact data={data.contact} />
    </>
  );
}
