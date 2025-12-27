"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className = "",
}: {
  navItems: { name: string; link: string; icon?: string }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const config = { damping: 20, stiffness: 300, mass: 0.5 };
  const y = useSpring(0, config);
  const opacity = useTransform(y, [-100, 0], [0, 1]);
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string>("");
  const lastYRef = useRef(0);
  const isHiddenRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pendingYRef = useRef(0);

  useEffect(() => {
    const initial = scrollY.get();
    lastYRef.current = initial;

    isHiddenRef.current = false;
    y.set(0);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollY, y]);

  useMotionValueEvent(scrollY, "change", (current) => {
    pendingYRef.current = current;
    if (rafRef.current != null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;

      const cur = pendingYRef.current;
      const prev = lastYRef.current;
      lastYRef.current = cur;

      if (cur < 50) {
        if (isHiddenRef.current) {
          isHiddenRef.current = false;
          y.set(0);
        }
        return;
      }

      const THRESHOLD = 6;
      const diff = cur - prev;

      if (diff > THRESHOLD && !isHiddenRef.current) {
        isHiddenRef.current = true;
        y.set(-100);
      } else if (diff < -THRESHOLD && isHiddenRef.current) {
        isHiddenRef.current = false;
        y.set(0);
      }
    });
  });

  useEffect(() => {
    const sections = navItems
      .filter((item) => item.link.startsWith("#"))
      .map((item) => document.querySelector(item.link))
      .filter((el): el is Element => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (!visibleEntries.length) return;

        const best = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        const id = best.target.getAttribute("id");
        if (id) setActive(`#${id}`);
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: 0.1 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [navItems]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      e.preventDefault();

      if (link.startsWith("http")) {
        window.open(link, "_blank");
        return;
      }

      const target = document.querySelector(link);
      if (target) {
        setActive(link);
        setHovered("");
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  const selected = useMemo(() => hovered || active, [hovered, active]);

  return (
    <motion.div
      style={{ y, opacity }}
      className={cn(
        "relative transform-gpu will-change-transform",
        "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-6 py-3 rounded-lg items-center justify-center",
        "backdrop-blur-2xl backdrop-saturate-150",
        "bg-[rgba(17,25,40,0.72)]",
        "border border-white/15",
        "shadow-[0_14px_40px_rgba(0,0,0,0.35)]",
        "after:content-[''] after:absolute after:inset-x-3 after:top-[1px] after:h-px after:rounded-full after:bg-white/15",

        className
      )}
    >
      {navItems.map((navItem, idx) => {
        const isSelected = selected === navItem.link;
        return (
          <a
            key={`link-${idx}`}
            href={navItem.link}
            onClick={(e) => handleLinkClick(e, navItem.link)}
            onMouseEnter={() => setHovered(navItem.link)}
            onMouseLeave={() => setHovered("")}
            className={cn(
              "relative flex flex-col items-center justify-center text-center select-none",
              "px-2 py-1.5 rounded-md",
              "text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300",
              "outline-none transition-colors duration-150"
            )}
            target={navItem.link.startsWith("http") ? "_blank" : undefined}
            rel={navItem.link.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {isSelected && (
              <motion.span
                layoutId="floating-nav-pill"
                transition={{ type: "spring", stiffness: 650, damping: 44, mass: 0.6 }}
                className="absolute inset-0 rounded-md -z-10 border border-white/[0.10] bg-white/[0.06] shadow-[0_14px_40px_rgba(0,0,0,0.35)]"
              />
            )}

            {navItem.icon && (
              <img
                src={navItem.icon}
                alt={navItem.name}
                className="relative h-5 w-5 sm:hidden"
                draggable={false}
              />
            )}

            <span className="relative text-[13px] hidden sm:block">
              {navItem.name}
            </span>
          </a>
        );
      })}
    </motion.div>
  );
};