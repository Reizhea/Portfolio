"use client";
import React from "react";
import { technicalSkills } from "@/data/index";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const TechnicalSkills = () => {
  return (
    <section className="my-12">
      <h2 className="heading text-3xl md:text-4xl lg:text-5xl font-extrabold pt-10 pb-10">
        TECHNICAL SKILLS
      </h2>

      <div className="space-y-6">
        {Object.entries(technicalSkills).map(([skillType, skillList], index) => (
          <div key={index}>
            <h3 className="text-2xl font-semibold mb-2 text-white">
              {skillType}
            </h3>

            {skillType === "Other Skills" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {skillList.map((skill, idx) => (
                  <HoverBorderGradient
                    key={idx}
                    duration={1}
                    containerClassName="rounded-md w-full"
                    className="w-full h-[3rem] rounded-md bg-[#090A1A] flex items-center justify-center"
                  >
                    <span className="text-white text-base font-bold">
                      {skill.title}
                    </span>
                  </HoverBorderGradient>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-3">
                {skillList.map((skill, idx) => (
                  <HoverBorderGradient
                    key={idx}
                    duration={1}
                    containerClassName="rounded-full w-24 h-24 sm:w-28 sm:h-28 overflow-hidden"
                  >
                    <div className="relative group w-full h-full flex items-center justify-center">
                      <img
                        src={skill.imageUrl}
                        alt={skill.title}
                        className="w-full h-full object-cover scale-90 transition-all duration-500 ease-in-out group-hover:blur-lg"
                      />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                        <span className="text-white text-sm sm:text-base font-bold">
                          {skill.title}
                        </span>
                      </div>
                    </div>
                  </HoverBorderGradient>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalSkills;
