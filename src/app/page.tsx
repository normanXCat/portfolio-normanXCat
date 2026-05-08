import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Separator } from "@/components/separator";


export default function Home() {
  return (
    <>
      <Hero />
      <Separator className="opacity-20" />
      <About />
      <Separator className="opacity-20" />
      <Projects />
      <Separator className="opacity-20" />
      <Experience />
      <Separator className="opacity-20" />
      <Skills />
      <Separator className="opacity-20" />
      <Education />
      <Separator className="opacity-20" />
      <Contact />
      
      <footer className="mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between gap-4 text-xs text-zinc-600 font-medium uppercase tracking-widest">
        <span>© 2025 Norman Vonizara</span>
        <span>Antsiranana, Madagascar</span>
      </footer>
    </>
  );
}
