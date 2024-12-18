"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/3d-pin";

const RecentProjects = () => {
  return (
    <div className="py-12">
      <h1 className="heading text-3xl md:text-4xl lg:text-5xl font-extrabold pb-10">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-24">
        {projects.slice(0, 2).map((item, index) => (
          <div key={item.id}>
            <div
              className="lg:min-h-[28rem] flex items-center justify-center sm:w-[550px] w-[80vw] mt-10 md:mb-12 sm:mb-12"
            >
              <PinContainer title={item.title} gitLink={index <= 1 ? item.link : ""}>
                <div className="relative flex items-center justify-center sm:w-[550px] w-[80vw] overflow-hidden h-[18.2vh] sm:h-[41vh] md:h-[23.5vh] lg:h-[20.2vh] xl:h-[37vh] 2xl:h-[31.5vh] mb-10 rounded-lg">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162D]"
                  >
                    <img src="/images/bg.png" alt="bgimg" />
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

                  {index <= 1 && (
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
        ))}
      </div>

      <div className="flex justify-center items-center w-full mt-20">
        <h2 className="text-3xl lg:text-4xl font-semibold text-white text-center">
          Upcoming works
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center p-4 gap-24 mt-5">
        {projects.slice(2).map((item, index) => (
          <div key={item.id}>
            <div
              className="lg:min-h-[28rem] flex items-center justify-center sm:w-[550px] w-[80vw] mt-10 md:mb-12 sm:mb-12"
            >
              <PinContainer title={item.title} gitLink={index <= 1 ? item.link : ""}>
                <div className="relative flex items-center justify-center sm:w-[550px] w-[80vw] overflow-hidden h-[18.2vh] sm:h-[41vh] md:h-[23.5vh] lg:h-[20.2vh] xl:h-[37vh] 2xl:h-[31.5vh] mb-10 rounded-lg">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162D]"
                  >
                    <img src="/images/bg.png" alt="bgimg" />
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
                </div>
              </PinContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
