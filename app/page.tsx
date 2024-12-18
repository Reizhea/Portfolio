import Certificates from "@/components/Certificates";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import TechnicalSkills from "@/components/TechnicalSkills";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full dark:bg-grid-white/[0.03]">
        <FloatingNav navItems={navItems}/>
        <section id="hero">
          <Hero />
        </section>
        <section id="skills">
          <TechnicalSkills />
        </section>
        <section id="projects">
          <RecentProjects />
        </section>
        <section id="cert">
          <Certificates />
        </section>
        <section id="contact">
          <Footer />
        </section>
      </div>
    </main>
  );
}
