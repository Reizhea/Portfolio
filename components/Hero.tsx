import MagicButton from "./ui/MagicButton";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="relative">
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-transparent">
        <div className="relative flex flex-col justify-center items-center z-10 text-center px-4">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] px-4 py-2 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.7)]" />
            <p className="uppercase tracking-[0.22em] text-[11px] md:text-xs text-black/70 dark:text-blue-100">
              Full-stack developer
            </p>
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.7)]" />
            <p className="uppercase tracking-[0.22em] text-[11px] md:text-xs text-black/70 dark:text-blue-100">
              building real products
            </p>
          </div>

          <TextGenerateEffect
            words="Specialist in Full-Stack Development for Real-World Problem Solving"
            className="text-[30px] md:text-5xl lg:text-6xl leading-tight"
            highlightWords={["Real-World", "Problem", "Solving"]}
          />

          <p className="mt-4 mb-3 max-w-2xl tracking-wide text-sm md:text-lg lg:text-xl text-black/70 dark:text-white/80">
            Hi! I'm Nawang, a developer passionate about turning visions into reality through clean, intuitive code.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a href="#projects">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
                otherClasses="bg-slate-950/85"
              />
            </a>
            <a href="#contact">
              <MagicButton
                title="Let's talk"
                icon={<FaLocationArrow />}
                position="right"
                otherClasses="bg-slate-950/85"
              />
            </a>
          </div>

          <div className="flex items-center justify-center mt-7 space-x-3">
            <a
              href="https://github.com/Reizhea"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl transition-all duration-200 hover:translate-y-[-1px] hover:bg-white/70 dark:hover:bg-white/[0.06]"
              aria-label="GitHub"
            >
              <FaGithub className="w-6 h-6 text-black/70 dark:text-white/75 transition-colors group-hover:text-black dark:group-hover:text-white" />
            </a>

            <a
              href="https://linkedin.com/in/nawang-dorjee"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl transition-all duration-200 hover:translate-y-[-1px] hover:bg-white/70 dark:hover:bg-white/[0.06]"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-6 h-6 text-black/70 dark:text-white/75 transition-colors group-hover:text-black dark:group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;