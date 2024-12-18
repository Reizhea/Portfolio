"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className = "", // Optional className for the container
}: {
  navItems: {
    name: string;
    link: string;
    icon?: string; // Icon as a string for image src
  }[];
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [manualHide, setManualHide] = useState(false);

  React.useEffect(() => {
    const handleInitialScroll = () => {
      if (scrollY.get() === 0) {
        setVisible(true);
      }
    };

    handleInitialScroll();
    const unsubscribe = scrollY.onChange(() => {
      if (scrollY.get() === 0) {
        setVisible(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;

    if (!manualHide) {
      if (current > 0) {
        if (current < previous) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();

    if (link.startsWith("http")) {
      window.open(link, "_blank");
      return;
    }

    const targetSection = document.querySelector(link);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });

      setVisible(false);
      setManualHide(true);

      setTimeout(() => {
        setManualHide(false);
      }, 700);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/10 shadow-lg items-center justify-center space-x-4",
            className // Append custom container className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
        >
          {navItems.map((navItem, idx: number) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              onClick={(e) => handleLinkClick(e, navItem.link)}
              className="relative flex flex-col items-center text-center space-y-1 text-neutral-600 dark:text-neutral-50 hover:text-neutral-500 dark:hover:text-neutral-300"
              target={navItem.link.startsWith("http") ? "_blank" : undefined}
              rel={navItem.link.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {/* Render icon only on small devices */}
              {navItem.icon && (
                <img
                  src={navItem.icon}
                  alt=""
                  className="h-6 w-6 sm:hidden" // Visible only on small devices
                />
              )}

              {/* Render text only on larger devices */}
              <span className="text-sm hidden sm:block">{navItem.name}</span>
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
