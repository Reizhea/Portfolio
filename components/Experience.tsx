"use client";

import React from "react";
import { experiences } from "@/data";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { motion } from "framer-motion";
import { Briefcase, CalendarDays } from "lucide-react";

const Experience = () => {
  return (
    <div className="py-20" id="experience">
      <h1 className="heading">
        My <span className="text-purple">Work Experience</span>
      </h1>

      <div className="mt-12 flex flex-col gap-8">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.05 }}
            className="flex gap-6"
          >
            <div className="relative hidden sm:flex flex-col items-center">
              <div className="h-4 w-4 rounded-full bg-purple shadow-[0_0_18px_rgba(168,85,247,0.65)]" />
              <div
                className={[
                  "mt-2 w-px flex-1",
                  idx === experiences.length - 1
                    ? "bg-gradient-to-b from-white/10 to-transparent"
                    : "bg-gradient-to-b from-purple/60 via-white/10 to-white/5",
                ].join(" ")}
              />
            </div>

            <HoverBorderGradient
              as="div"
              duration={1.2}
              containerClassName="rounded-2xl w-full"
              className="rounded-2xl bg-[#090A1A] w-full"
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple" />
                      <h2 className="text-xl md:text-2xl font-extrabold text-white">
                        {exp.role}
                      </h2>
                    </div>

                    <p className="text-base md:text-lg font-semibold text-white/80">
                      {exp.company}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <CalendarDays className="h-4 w-4" />
                      <span>{exp.dateRange}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {exp.highlights?.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full text-xs font-semibold
                                   bg-white/5 text-white/80 border border-white/10
                                   hover:border-white/20 hover:bg-white/10 transition"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {!!exp.tech?.length && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs font-bold
                                   bg-black/40 text-white/80 border border-white/10
                                   hover:border-purple/40 hover:text-white transition"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="mt-6 space-y-3">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-purple/80 shrink-0" />
                      <p className="text-sm md:text-[15px] leading-relaxed text-white/80">
                        {b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </HoverBorderGradient>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;