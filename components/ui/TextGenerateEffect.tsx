"use client";

import { useEffect, type CSSProperties } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  highlightWords?: string[];
};

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.8,
  staggerDelay = 0.085,
  highlightWords,
}: Props) => {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
        transform: "translateY(0px)",
      },
      {
        duration,
        delay: stagger(staggerDelay),
        ease: "easeOut",
      }
    );
  }, [animate, filter, duration, staggerDelay]);

  const isHighlighted = (word: string, idx: number) => {
    if (highlightWords?.length) {
      const normalized = word.replace(/[^\w-]/g, "").toLowerCase();
      return highlightWords.map((w) => w.toLowerCase()).includes(normalized);
    }
    return idx >= Math.min(5, Math.floor(wordsArray.length / 2));
  };

  return (
    <div className={cn("font-semibold", className)}>
      <motion.div ref={scope} className="leading-[1.08] tracking-[-0.02em]">
        {wordsArray.map((word, idx) => {
          const accent = isHighlighted(word, idx);

          return (
            <motion.span
              key={`${word}-${idx}`}
              className={cn(
                "inline-block opacity-0",
                accent ? "text-purple" : "dark:text-white text-black"
              )}
              style={
                {
                  filter: filter ? "blur(12px)" : "none",
                  transform: "translateY(6px)",
                } as CSSProperties
              }
            >
              {word}&nbsp;
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
};