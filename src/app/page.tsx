import { promises as fs } from "fs";
import path from "path";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Approach } from "@/components/approach";
import { Projects } from "@/components/projects";
import { Gallery, type GalleryImage } from "@/components/gallery";
import { Skills } from "@/components/skills";
import { Parcours } from "@/components/parcours";
import { Certificates, type CertificateItem } from "@/components/certificates";
import { Contact } from "@/components/contact";

/**
 * Extrait les dimensions réelles (width, height) depuis les en-têtes binaires
 * des formats d'image courants (JPEG, PNG, GIF, WebP) sans dépendance externe.
 */
function getImageDimensions(buffer: Buffer): { width: number; height: number } | null {
  // PNG : signature 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // GIF : GIF87a ou GIF89a
  if (
    buffer.length >= 10 &&
    (buffer.toString("ascii", 0, 6) === "GIF87a" || buffer.toString("ascii", 0, 6) === "GIF89a")
  ) {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  // WebP
  if (
    buffer.length >= 30 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunkType = buffer.toString("ascii", 12, 16);
    if (chunkType === "VP8 ") {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunkType === "VP8L") {
      const b0 = buffer[21];
      const b1 = buffer[22];
      const b2 = buffer[23];
      const b3 = buffer[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      return { width, height };
    }
    if (chunkType === "VP8X") {
      const width = 1 + buffer.readUIntLE(24, 3);
      const height = 1 + buffer.readUIntLE(27, 3);
      return { width, height };
    }
  }

  // JPEG : marqueur de début FF D8
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length - 8) {
      if (buffer[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buffer[offset + 1];
      if (
        (marker >= 0xc0 && marker <= 0xc3) ||
        (marker >= 0xc5 && marker <= 0xc7) ||
        (marker >= 0xc9 && marker <= 0xcb) ||
        (marker >= 0xcd && marker <= 0xcf)
      ) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }
      const length = buffer.readUInt16BE(offset + 2);
      offset += 2 + length;
    }
  }

  return null;
}

/**
 * Hash déterministe pour mélanger harmonieusement les images
 * de manière stable d'un build à l'autre.
 */
function hashDeterministic(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Lit dynamiquement les images du dossier public/gallery/ au build.
 * Filtre les extensions valides, applique un ordonnancement naturel déterministe,
 * extrait les dimensions exactes et associe les légendes de captions.json.
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

    type RawMetaEntry =
      | string
      | {
          caption?: string;
          order?: number;
        };

    let metaMap: Record<string, RawMetaEntry> = {};
    const captionsFile = path.join(galleryDir, "captions.json");
    try {
      const captionsContent = await fs.readFile(captionsFile, "utf8");
      metaMap = JSON.parse(captionsContent);
    } catch {
      // captions.json optionnel
    }

    // Mélange déterministe ou tri selon l'ordre personnalisé
    const sortedFiles = [...imageFiles].sort((a, b) => {
      const entryA = metaMap[a];
      const entryB = metaMap[b];
      const orderA = typeof entryA === "object" && entryA?.order !== undefined ? entryA.order : null;
      const orderB = typeof entryB === "object" && entryB?.order !== undefined ? entryB.order : null;
      if (orderA !== null && orderB !== null) return orderA - orderB;
      if (orderA !== null) return -1;
      if (orderB !== null) return 1;
      return hashDeterministic(a) - hashDeterministic(b);
    });

    return Promise.all(
      sortedFiles.map(async (file) => {
        const nameWithoutExt = path.parse(file).name.replace(/[-_]/g, " ");
        let width = 1200;
        let height = 800;
        try {
          const filePath = path.join(galleryDir, file);
          const buf = await fs.readFile(filePath);
          const dims = getImageDimensions(buf);
          if (dims && dims.width > 0 && dims.height > 0) {
            width = dims.width;
            height = dims.height;
          }
        } catch {
          // fallback par défaut
        }

        const entry = metaMap[file];
        const caption = typeof entry === "string" ? entry : entry?.caption;
        const order = typeof entry === "object" ? entry?.order : undefined;

        return {
          src: `/gallery/${file}`,
          alt: caption || nameWithoutExt,
          caption,
          width,
          height,
          order,
        };
      })
    );
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
