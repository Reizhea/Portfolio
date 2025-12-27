"use client";

import { memo, useMemo } from "react";
import { experiences } from "@/data";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Briefcase, CalendarDays } from "lucide-react";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const card = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" } },
};

const focusWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
};

const focusChip = {
  hidden: { opacity: 0, x: 14, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.24, ease: "easeOut" },
  },
};

const techWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
};

const techChip = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

const bulletsWrap = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const bullet = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

type Exp = {
  id?: string | number;
  role: string;
  company: string;
  dateRange: string;
  highlights?: string[];
  tech?: string[];
  bullets: string[];
};

const ExperienceCard = memo(function ExperienceCard({
  exp,
  idx,
  lineClassName,
}: {
  exp: Exp;
  idx: number;
  lineClassName: string;
}) {
  const num = useMemo(() => String(idx + 1).padStart(2, "0"), [idx]);

  return (
    <m.div variants={card} className="flex gap-6">
      <div className="relative hidden sm:flex flex-col items-center">
        <div className="h-4 w-4 rounded-full bg-purple shadow-[0_0_18px_rgba(168,85,247,0.65)]" />
        <div className={["mt-2 w-px flex-1", lineClassName].join(" ")} />
      </div>

      <HoverBorderGradient
        as="div"
        duration={1.2}
        containerClassName="rounded-3xl w-full"
        className="rounded-3xl bg-[#090A1A] w-full"
      >
        <m.div
          whileHover={{ scale: 1.005 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={[
            "relative overflow-hidden rounded-3xl border border-white/10",
            "transition-shadow duration-200 ease-out",
            "hover:shadow-[0_10px_40px_rgba(168,85,247,0.20)]",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-purple via-purple/35 to-transparent" />
          <div className="pointer-events-none absolute right-6 top-6 text-white/[0.06] font-extrabold tracking-tight text-6xl md:text-8xl select-none">
            {num}
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.14),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
          </div>

          <div className="relative p-7 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <m.p
                  variants={fadeUp}
                  className="text-[11px] font-bold tracking-[0.22em] text-white/45"
                >
                  EXPERIENCE
                </m.p>

                <div className="mt-4 flex items-start gap-4">
                  <m.span
                    variants={fadeUp}
                    className="mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                  >
                    <Briefcase className="h-6 w-6 text-purple" />
                  </m.span>

                  <div className="min-w-0">
                    <m.h2
                      variants={fadeUp}
                      className="text-2xl md:text-4xl font-extrabold tracking-tight text-white"
                    >
                      {exp.role}
                    </m.h2>
                    <m.p
                      variants={fadeUp}
                      className="mt-2 text-sm md:text-base font-semibold text-white/70"
                    >
                      {exp.company}
                    </m.p>

                    <m.div
                      variants={fadeUp}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/60"
                    >
                      <CalendarDays className="h-4 w-4" />
                      <span>{exp.dateRange}</span>
                    </m.div>
                  </div>
                </div>
              </div>

              {!!exp.highlights?.length && (
                <div className="md:w-[360px] md:shrink-0">
                  <div className="flex items-center justify-between md:justify-end">
                    <m.p
                      variants={fadeUp}
                      className="text-[11px] font-bold tracking-[0.22em] text-white/45 md:text-right w-full"
                    >
                      FOCUS
                    </m.p>
                  </div>

                  <m.div
                    variants={focusWrap}
                    className="mt-3 flex flex-wrap gap-2 md:justify-end"
                  >
                    {exp.highlights.map((h: string, i: number) => (
                      <m.span
                        key={`${h}-${i}`}
                        variants={focusChip}
                        whileHover={{ y: -1, scale: 1.02 }}
                        transition={{ duration: 0.16 }}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/70 hover:bg-white/[0.06] hover:border-white/20"
                      >
                        {h}
                      </m.span>
                    ))}
                  </m.div>
                </div>
              )}
            </div>

            {!!exp.tech?.length && (
              <div className="mt-8">
                <m.div variants={fadeUp} className="flex items-center gap-4">
                  <p className="text-[11px] font-bold tracking-[0.22em] text-white/45">
                    STACK
                  </p>
                  <div className="h-px flex-1 bg-white/10" />
                </m.div>

                <m.div variants={techWrap} className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map((t: string, i: number) => (
                    <m.span
                      key={`${t}-${i}`}
                      variants={techChip}
                      whileHover={{ y: -1, scale: 1.02 }}
                      transition={{ duration: 0.16 }}
                      className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-white/70 hover:border-purple/40 hover:text-white"
                    >
                      {t}
                    </m.span>
                  ))}
                </m.div>
              </div>
            )}

            <m.div className="mt-8">
              <m.div variants={fadeUp} className="flex items-center gap-4">
                <p className="text-[11px] font-bold tracking-[0.22em] text-white/45">
                  HIGHLIGHTS
                </p>
                <div className="h-px flex-1 bg-white/10" />
              </m.div>

              <m.div
                variants={bulletsWrap}
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4"
              >
                {exp.bullets.map((b: string, i: number) => (
                  <m.div
                    key={i}
                    variants={bullet}
                    className="group flex gap-3 rounded-2xl border border-white/0 hover:border-white/10 hover:bg-white/[0.02] p-3 -m-3 transition"
                  >
                    <span className="mt-[9px] h-2 w-2 rounded-full bg-purple/85 shrink-0 shadow-[0_0_18px_rgba(168,85,247,0.35)]" />
                    <p className="text-sm md:text-[15px] leading-relaxed text-white/72 group-hover:text-white/80 transition">
                      {b}
                    </p>
                  </m.div>
                ))}
              </m.div>
            </m.div>

            <div className="mt-10 h-px bg-gradient-to-r from-transparent via-purple/35 to-transparent" />
          </div>
        </m.div>
      </HoverBorderGradient>
    </m.div>
  );
});

export default function Experience() {
  const total = experiences.length;

  const lineClasses = useMemo(() => {
    return experiences.map((_, idx) =>
      idx === total - 1
        ? "bg-gradient-to-b from-white/10 to-transparent"
        : "bg-gradient-to-b from-purple/60 via-white/10 to-white/5"
    );
  }, [total]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="py-12 mb-10">
        <m.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="heading text-3xl md:text-4xl lg:text-5xl font-extrabold pb-10"
        >
          My <span className="text-purple">Work Experience</span>
        </m.h1>

        <m.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col gap-8"
        >
          {experiences.map((exp: any, idx: number) => (
            <ExperienceCard
              key={exp.id ?? idx}
              exp={exp}
              idx={idx}
              lineClassName={lineClasses[idx]}
            />
          ))}
        </m.div>
      </div>
    </LazyMotion>
  );
}