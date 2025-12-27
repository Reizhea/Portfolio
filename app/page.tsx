import Certificates from "@/components/Certificates";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import TechnicalSkills from "@/components/TechnicalSkills";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { Vortex } from "@/components/ui/vortex";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 dark:bg-grid-white/[0.03] flex min-h-screen flex-col items-center justify-start overflow-x-hidden px-5 sm:px-10">
      <div className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-7xl">
          <FloatingNav navItems={navItems} />
        </div>

        <section id="hero" className="relative w-full overflow-hidden">
          <div className="mx-auto w-full max-w-[90rem]">
            <Vortex
              backgroundColor="rgba(0,0,0,0)"
              containerClassName="h-auto w-full"
              className="w-full"
            >
              <div className="mx-auto w-full max-w-7xl">
                <Hero />
              </div>
            </Vortex>
          </div>
        </section>

        <div className="mx-auto w-full max-w-7xl">
          <section id="skills">
            <TechnicalSkills />
          </section>

          <section id="experience">
            <Experience />
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
      </div>
    </main>
  );
}