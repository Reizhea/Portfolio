import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaLocationArrow, FaGithub, FaLinkedin } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="relative">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div
        className={`relative flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-black-100 dark:bg-grid-white/[0.03]`}
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white
          [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />

        <div className="relative flex flex-col justify-center items-center z-10 text-center">
          <p className="uppercase tracking-widest text-m text-blue-100 max-w-90">
            A dedicated full-stack developer
          </p>

          <TextGenerateEffect
            words="Specialist in Full-Stack Development for Real-World Problem Solving"
            className="text-[30px] md:text-4xl lg:text-6xl leading-tight px-4"
          />

          <p className="tracking-wide mb-4 text-sm md:text-lg lg:text-xl">
            Hi! I&apos;m Nawang, a developer passionate about turning visions
            into reality through clean, intuitive code.
          </p>

          <a href="#projects">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>

          <div className="flex items-center justify-center mt-6 space-x-6">
            <a
              href="https://github.com/your-github-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-300 transition-colors duration-300"
            >
              <FaGithub className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-300 transition-colors duration-300"
            >
              <FaLinkedin className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
