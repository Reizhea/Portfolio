"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { technicalSkills } from "@/data/index";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

type Skill = { title: string; imageUrl?: string };
type TechnicalSkillsData = { [key: string]: Skill[] };
const typedTechnicalSkills = technicalSkills as TechnicalSkillsData;

const sectionList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
} as const;

const containerVariants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
} as const;

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
} as const;

function useTailwindBreakpoints() {
  const [bp, setBp] = useState<"base" | "sm" | "md" | "lg">("base");

  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const compute = () => {
      if (lg.matches) return "lg";
      if (md.matches) return "md";
      if (sm.matches) return "sm";
      return "base";
    };

    const update = () => setBp(compute());
    update();

    const add = (mql: MediaQueryList, fn: () => void) => {
      if (mql.addEventListener) mql.addEventListener("change", fn);
      else mql.addListener(fn);
    };
    const remove = (mql: MediaQueryList, fn: () => void) => {
      if (mql.removeEventListener) mql.removeEventListener("change", fn);
      else mql.removeListener(fn);
    };

    add(sm, update);
    add(md, update);
    add(lg, update);

    return () => {
      remove(sm, update);
      remove(md, update);
      remove(lg, update);
    };
  }, []);

  return bp;
}

const TabPill = React.memo(function TabPill({
  category,
  active,
  onClick,
}: {
  category: string;
  active: boolean;
  onClick: () => void;
}) {
  const handleClick = useCallback(() => {
    if (navigator.vibrate) navigator.vibrate(5);
    onClick();
  }, [onClick]);

  return (
    <m.button
      onClick={handleClick}
      className={cn(
        "relative px-6 py-3 text-sm md:text-base font-semibold transition-all duration-300 rounded-full mx-1 my-1 z-10",
        "border",
        active
          ? "text-black border-transparent"
          : "text-white/70 hover:text-white/90 border-transparent hover:border-purple/60"
      )}
    >
      {active && (
        <m.span
          layoutId="tab-pill-indicator"
          transition={{ type: "spring", stiffness: 600, damping: 40 }}
          className="absolute inset-0 rounded-full bg-purple shadow-lg shadow-purple/50 z-[-1]"
        />
      )}
      {category}
    </m.button>
  );
});

const SkillCard = React.memo(function SkillCard({
  skill,
  isOtherSkills,
}: {
  skill: Skill;
  isOtherSkills: boolean;
}) {
  return (
    <m.div variants={itemVariants} className="flex-shrink-0 group relative">
      {isOtherSkills ? (
        <HoverBorderGradient
          duration={1.2}
          containerClassName="rounded-lg transition-all duration-300 hover:scale-[1.02]"
          className="relative h-12 rounded-lg bg-slate-950/80 backdrop-blur-xl flex items-center justify-center px-5 border border-white/10 overflow-hidden"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative z-10 text-white text-sm sm:text-base font-semibold text-center">
            {skill.title}
          </span>
        </HoverBorderGradient>
      ) : (
        <HoverBorderGradient
          duration={1.2}
          containerClassName={cn(
            "rounded-xl transition-all duration-300 hover:scale-[1.05]",
            "w-[6.5rem] h-[6.5rem] sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40"
          )}
          className="relative w-full h-full rounded-xl bg-slate-950/80 backdrop-blur-xl flex flex-col items-center justify-center border border-white/10 overflow-hidden"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {!!skill.imageUrl && (
            <img
              src={skill.imageUrl}
              alt={skill.title}
              loading="lazy"
              decoding="async"
              className="relative z-10 w-[52%] h-[52%] object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
            />
          )}

          <span className="relative z-10 text-white text-[0.85rem] sm:text-sm md:text-base font-semibold text-center px-2 mt-0.5 leading-tight">
            {skill.title}
          </span>
        </HoverBorderGradient>
      )}
    </m.div>
  );
});

const TechnicalSkills = () => {
  const categories = useMemo(() => Object.keys(typedTechnicalSkills), []);
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  const isOtherSkills = activeCategory === "Other Skills";

  const activeSkills = useMemo(
    () => typedTechnicalSkills[activeCategory] || [],
    [activeCategory]
  );

  const bp = useTailwindBreakpoints();
  const maxMinHeightByBp = useMemo(() => {
    const calc = (count: number, isOther: boolean, which: "sm" | "md" | "lg") => {
      const cols =
        isOther
          ? which === "lg"
            ? 5
            : 4
          : which === "lg"
          ? 5
          : which === "md"
          ? 4
          : 3;

      const rows = Math.max(1, Math.ceil(count / cols));

      const itemH = isOther ? 48 : which === "lg" ? 160 : which === "md" ? 144 : 128;
      const gap = isOther ? 16 : which === "lg" ? 24 : 20;

      const pt = 16;
      const buffer = 8;

      return rows * itemH + (rows - 1) * gap + pt + buffer;
    };

    const out: Record<"sm" | "md" | "lg", number> = { sm: 0, md: 0, lg: 0 };

    for (const cat of categories) {
      const skills = typedTechnicalSkills[cat] || [];
      const other = cat === "Other Skills";

      out.sm = Math.max(out.sm, calc(skills.length, other, "sm"));
      out.md = Math.max(out.md, calc(skills.length, other, "md"));
      out.lg = Math.max(out.lg, calc(skills.length, other, "lg"));
    }

    return out;
  }, [categories]);

  const contentMinHeightPx = useMemo(() => {
    if (bp === "base") return undefined;
    if (bp === "lg") return maxMinHeightByBp.lg;
    if (bp === "md") return maxMinHeightByBp.md;
    return maxMinHeightByBp.sm;
  }, [bp, maxMinHeightByBp]);

  const setCategory = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const skillNodes = useMemo(() => {
    return activeSkills.map((skill) => (
      <SkillCard key={skill.title} skill={skill} isOtherSkills={isOtherSkills} />
    ));
  }, [activeSkills, isOtherSkills]);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        variants={sectionList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="py-12"
      >
        <m.h1 variants={fadeUp} className="heading mb-16 text-center">
          My <span className="text-purple"> Core </span> Proficiencies
        </m.h1>

        <div className="max-w-7xl mx-auto mb-60">
          <m.div
            variants={fadeUp}
            className="flex flex-wrap justify-center mb-20 p-2 border border-white/10 rounded-3xl sm:rounded-full bg-black-100/50 backdrop-blur-md"
          >
            {categories.map((category) => (
              <TabPill
                key={category}
                category={category}
                active={activeCategory === category}
                onClick={() => setCategory(category)}
              />
            ))}
          </m.div>

          <m.div variants={fadeUp} className="relative" style={contentMinHeightPx ? { minHeight: `${contentMinHeightPx}px` } : undefined}>
            <AnimatePresence mode="popLayout" initial={false} presenceAffectsLayout={false}>
              {activeCategory && (
                <m.div
                  key={activeCategory}
                  layout
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  exit="hidden"
                >
                  <div
                    className={cn(
                      "mx-auto flex flex-wrap justify-center content-start pt-4 mb-30",
                      isOtherSkills ? "gap-3 sm:gap-4" : "gap-3 sm:gap-5 lg:gap-6",
                      isOtherSkills
                        ? "max-w-[calc(3*10rem+2*0.75rem)] sm:max-w-[calc(4*10rem+3*1rem)] lg:max-w-[calc(5*10rem+4*1.5rem)]"
                        : "max-w-[calc(3*6.5rem+2*0.75rem)] sm:max-w-[calc(3*8rem+2*1.25rem)] md:max-w-[calc(4*9rem+3*1.25rem)] lg:max-w-[calc(5*10rem+4*1.5rem)]"
                    )}
                  >
                    {skillNodes}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default TechnicalSkills;