import { promises as fs } from "fs";
import path from "path";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Parcours } from "@/components/parcours";
import { Contact } from "@/components/contact";

/**
 * Page d'accueil — une seule page, défilement vertical, sans navbar.
 * Lit les données depuis public/data.json.
 */
export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);

  return (
    <>
      <Hero data={data.hero} />
      <About text={data.about} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Parcours data={data.parcours} />
      <Contact data={data.contact} />
    </>
  );
}
