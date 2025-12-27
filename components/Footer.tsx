"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { socialMedia } from "@/data";
import { technicalSkills } from "@/data/index";

const EMAIL = "nawangdorjee798@gmail.com";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL
)}`;

type Skill = { title?: string; imageUrl?: string };
type TechnicalSkillsData = Record<string, Skill[]>;

const sectionList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
} as const;

const fadeUpSoft = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: "easeOut" } },
} as const;

const card = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
} as const;

const rowStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const marquee = useMemo(() => {
    const typed = technicalSkills as unknown as TechnicalSkillsData;
    const titles = Object.values(typed)
      .flat()
      .map((s) => (s?.title || "").trim())
      .filter(Boolean);

    return Array.from(new Set(titles)).slice(0, 36);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <motion.footer
      id="contact"
      className="w-full pt-20 pb-10"
      variants={sectionList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      <motion.div variants={fadeUp} className="flex flex-col items-center text-center mb-10">
        <h2 className="heading mt-2">Contact Me</h2>
      </motion.div>

      <div className="relative flex flex-col gap-10">
        <motion.div
          variants={card}
          className="relative rounded-[28px] border border-white/10 bg-black-200/38 backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="p-7 sm:p-10 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
              <motion.div variants={fadeUpSoft} className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black-300/18 px-3 py-1.5 text-xs text-white-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.45)]" />
                  open to projects
                </div>

                <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Make it{" "}
                  <span className="bg-gradient-to-r from-purple via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                    modern
                  </span>
                  . Make it{" "}
                  <span className="bg-gradient-to-r from-indigo-400 via-purple to-fuchsia-400 bg-clip-text text-transparent">
                    fast
                  </span>
                  .
                </h2>

                <p className="mt-4 text-base sm:text-lg text-white-200">
                  I build clean UI and solid backend that scales. If you want something sleek,
                  polished, and production ready, let's do it.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 rounded-2xl border border-white/10 bg-black-300/18 px-5 py-4">
                    <div className="text-xs text-white/60">Email</div>
                    <div className="mt-1 text-sm sm:text-base font-semibold text-white">
                      {EMAIL}
                    </div>
                  </div>

                  <div className="relative">
                    <button
                      onClick={copyEmail}
                      aria-label="Copy email"
                      className="group inline-flex h-full min-h-[56px] w-full sm:w-[64px] items-center justify-center rounded-2xl
                                 border border-white/10 bg-black-300/24 text-white backdrop-blur-xl
                                 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black-300/34 hover:border-white/20"
                    >
                      <FaRegCopy className="opacity-90 group-hover:opacity-100" />
                    </button>

                    <AnimatePresence>
                      {copied && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black-200/70 px-3 py-1 text-xs text-white backdrop-blur-xl"
                        >
                          copied
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { k: "Style", v: "Sleek and consistent" },
                    { k: "Speed", v: "Ship and iterate" },
                    { k: "Stack", v: "React, Next, Node" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-2xl border border-white/10 bg-black-300/18 p-5 transition-colors hover:bg-black-300/26"
                    >
                      <div className="text-xs text-white/60">{x.k}</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {x.v}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUpSoft} className="w-full">
                <div className="rounded-3xl border border-white/10 bg-black-300/16 p-6 sm:p-7 backdrop-blur-xl">
                  <div className="text-xs text-white/60">Quick actions</div>

                  <div className="mt-5 flex flex-col gap-4">
                    <div className="w-full flex justify-center">
                      <a href={`mailto:${EMAIL}`} className="block">
                        <MagicButton
                          title="Let's Talk"
                          icon={<FaLocationArrow />}
                          position="right"
                          otherClasses="!w-full md:!w-full md:mt-0"
                        />
                      </a>
                    </div>

                    <div className="w-full flex justify-center">
                      <a
                        href={GMAIL_COMPOSE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <MagicButton
                          title="Open Gmail"
                          icon={<FaLocationArrow />}
                          position="right"
                          otherClasses="!w-full md:!w-full md:mt-0"
                        />
                      </a>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="text-xs text-white/60 mb-3">Social</div>

                    <motion.div variants={rowStagger} className="flex flex-wrap gap-3">
                      {socialMedia.map((p) => (
                        <motion.a
                          key={p.id}
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${p.id}`}
                          variants={fadeUpSoft}
                          whileHover={{ y: -6, scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative w-12 h-12 rounded-2xl border border-white/10 bg-black-200/34 backdrop-blur-lg
                                     flex items-center justify-center transition-all duration-200 hover:border-white/20 hover:bg-black-200/50"
                        >
                          <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                           shadow-[0_0_0_1px_rgba(168,85,247,0.30),0_0_26px_rgba(168,85,247,0.14)]" />
                          <img
                            src={p.img}
                            width={20}
                            height={20}
                            alt={`${p.id} icon`}
                            className="opacity-85 transition-opacity duration-200 group-hover:opacity-100"
                          />
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div variants={fadeUpSoft} className="mt-7 flex flex-wrap gap-2 justify-center">
                    {[
                      { label: "Skills", href: "#skills" },
                      { label: "Experience", href: "#experience" },
                      { label: "Projects", href: "#projects" },
                      { label: "Certificates", href: "#cert" },
                    ].map((l) => (
                      <a
                        key={l.label}
                        href={l.href}
                        className="rounded-full border border-white/10 bg-black-200/20 px-4 py-2 text-xs text-white/80
                                   transition-all duration-200 hover:bg-black-200/30 hover:border-white/20"
                      >
                        {l.label}
                      </a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
        </motion.div>

        <motion.div
          variants={fadeUpSoft}
          className="w-full rounded-2xl border border-white/10 bg-black-200/25 backdrop-blur-xl overflow-hidden"
        >
          <div
            className="flex w-max items-center gap-3 py-3 px-4 animate-scroll"
            style={
              {
                ["--animation-duration" as any]: "22s",
                ["--animation-direction" as any]: "normal",
              } as React.CSSProperties
            }
          >
            {[...marquee, ...marquee].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="shrink-0 rounded-full border border-white/10 bg-black-300/10 px-3 py-1 text-xs text-white/75"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUpSoft} className="w-full">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white-200 text-sm text-center md:text-left">
              © {year} Nawang Dorjee | Built with Next.js and Tailwind
            </div>
            <div className="text-xs text-white/50 text-center md:text-right">
              Designed to feel premium. Built to run smooth.
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}