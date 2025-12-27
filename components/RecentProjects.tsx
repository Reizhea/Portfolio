"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/3d-pin";
import { LazyMotion, domAnimation, m } from "framer-motion";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" } },
} as const;

const card = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} as const;

const RecentProjects = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="py-12 mb-40">
        <m.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="heading text-3xl md:text-4xl lg:text-5xl font-extrabold pb-10"
        >
          A small selection of{" "}
          <span className="text-purple">Recent Projects</span>
        </m.h1>

        <m.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-wrap items-center justify-center p-4 gap-24 xl:gap-36 2xl:gap-36"
        >
          {projects.map((item, index) => (
            <m.div key={item.id} variants={card}>
              <div>
                <div className="lg:min-h-[28rem] flex items-center justify-center sm:w-[550px] w-[80vw] mt-10 md:mb-20 sm:mb-12">
                  <PinContainer title={item.title} gitLink={item.link}>
                    <div className="relative flex items-center justify-center sm:w-[550px] w-[80vw] overflow-hidden h-[18.2vh] sm:h-[20vh] md:h-[22vh] lg:h-[20.2vh] xl:h-[36.5vh] 2xl:h-[31.5vh] mb-10 rounded-lg">
                      <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-transparent">
                      </div>
                      <img
                        src={item.img}
                        alt="cover"
                        className="z-10 absolute bottom-0 rounded-lg"
                      />
                    </div>

                    <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                      {item.title}
                    </h1>

                    <p
                      className="lg:text-xl lg:font-normal font-light text-sm line-clamp-3"
                      style={{
                        color: "#BEC1DD",
                        margin: "1vh 0",
                      }}
                    >
                      {item.des}
                    </p>

                    <div className="flex items-center justify-between mt-7 mb-3">
                      <div className="flex items-center">
                        {item.iconLists.map((icon, iconIndex) => (
                          <div
                            key={iconIndex}
                            className="border border-white/[.2] rounded-full bg-black lg:w-11 lg:h-11 w-8 h-8 flex justify-center items-center"
                            style={{
                              transform: `translateX(-${5 * iconIndex * 2}px)`,
                            }}
                          >
                            <img src={icon} alt="icon" className="p-2" />
                          </div>
                        ))}
                      </div>

                      {index <= 4 && (
                        <div className="flex justify-center items-center">
                          <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                            Check It Out
                          </p>
                          <FaLocationArrow className="ms-3" color="#CBACF9" />
                        </div>
                      )}
                    </div>
                  </PinContainer>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </LazyMotion>
  );
};

export default RecentProjects;
