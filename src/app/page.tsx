import { promises as fs } from "fs";
import path from "path";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Separator } from "@/components/separator";

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);

  return (
    <>
      <Hero data={data.hero} />
      <Separator />
      <About data={data.about} />
      <Separator />
      <Projects data={data.projects} />
      <Separator />
      <Experience data={data.experience} />
      <Separator />
      <Skills data={data.skills} />
      <Separator />
      <Education data={data.education} />
      <Separator />
      <Contact data={data.contact} />

      <footer className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between gap-4 text-xs text-muted font-medium uppercase tracking-widest">
        <span>© {new Date().getFullYear()} Norman Vonizara</span>
        <span>B.P 201, Antsiranana, Madagascar</span>
      </footer>
    </>
  );
}
