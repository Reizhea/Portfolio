"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { certificates } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Terminal,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Info,
  Maximize2,
} from "lucide-react";

type Cert = {
  title: string;
  img: string;
  issuer?: string;
  issueDate?: string;
  verifyLink?: string;
};

type Line = { id: string; kind: "sys" | "cmd" | "out"; text: string };

const MAX_LINES = 240;

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
} as const;

const shellEnter = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.44, ease: "easeOut" } },
} as const;

const colEnter = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } },
} as const;

function uid() {
  return Math.random().toString(16).slice(2);
}
function s(v: any, fb = "") {
  return typeof v === "string" ? v : fb;
}
function parseDateSafe(raw?: string) {
  const t = Date.parse(raw || "");
  return Number.isFinite(t) ? t : 0;
}
function fmtDate(raw?: string) {
  const v = s(raw, "");
  if (!v) return "";
  const t = Date.parse(v);
  if (!Number.isFinite(t)) return v;
  return new Date(t).toLocaleString(undefined, { month: "short", year: "numeric" });
}
function pushLines(setLines: React.Dispatch<React.SetStateAction<Line[]>>, next: Line[]) {
  setLines((prev) => {
    const merged = [...prev, ...next];
    return merged.length > MAX_LINES ? merged.slice(merged.length - MAX_LINES) : merged;
  });
}

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative mx-3 sm:mx-4 w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.60)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/50 text-white/70 hover:bg-white hover:text-black transition z-50"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
          <img src={cert.img} alt={cert.title} className="h-[78vh] w-full object-contain" />
        </div>
      </div>
    </div>
  );
}

function PreviewPassport({
  cert,
  onOpen,
  onVerify,
}: {
  cert: Cert;
  onOpen: () => void;
  onVerify: () => void;
}) {
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      whileTap={{ scale: 0.995 }}
      className="group relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-black text-left cursor-pointer"
    >
      <img
        src={cert.img}
        alt={cert.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      <div className="absolute left-0 right-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end z-10">
        <p className="text-lg sm:text-xl font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
          {cert.title}
        </p>
        <p className="mt-1.5 text-sm font-medium text-white/80 line-clamp-1 drop-shadow-sm">
          {(cert.issuer || "—") + (cert.issueDate ? ` • ${fmtDate(cert.issueDate)}` : "")}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors"
          >
            Open <Maximize2 className="h-3.5 w-3.5" />
          </button>

          {cert.verifyLink ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onVerify();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-purple-500/20 px-4 py-2 text-xs font-semibold text-purple-200 hover:bg-purple-500 hover:text-white transition-colors"
            >
              Verify <ExternalLink className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold text-white/50">
              Proof only
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificatesShellPassportPreview() {
  const all = useMemo(() => {
    const list = (certificates as any[]).map((c) => ({
      title: s(c?.title, "Untitled"),
      img: s(c?.img, ""),
      issuer: s(c?.issuer, ""),
      issueDate: s(c?.issueDate, ""),
      verifyLink: s(c?.verifyLink, ""),
    })) as Cert[];

    return list.slice().sort((a, b) => parseDateSafe(b.issueDate) - parseDateSafe(a.issueDate));
  }, []);

  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return all;
    return all.filter((c) => `${c.title} ${c.issuer} ${c.issueDate}`.toLowerCase().includes(t));
  }, [all, q]);

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (filtered.length === 0) return setIdx(0);
    setIdx((i) => (i >= filtered.length ? 0 : i));
  }, [filtered.length]);

  const active = filtered[idx] || null;
  const [open, setOpen] = useState<Cert | null>(null);

  const [lines, setLines] = useState<Line[]>(() => [
    { id: uid(), kind: "sys", text: "certs.shell online" },
    { id: uid(), kind: "out", text: `loaded ${all.length} certs` },
    {
      id: uid(),
      kind: "out",
      text: "commands: help | list | search <text> | open <n> | next | prev | info | verify | clear | cls",
    },
    { id: uid(), kind: "out", text: "tip: open1 / open#1 also works" },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines]);

  const goNext = useCallback(() => {
    const len = filtered.length;
    if (!len) return;
    setIdx((i) => (i + 1) % len);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    const len = filtered.length;
    if (!len) return;
    setIdx((i) => (i - 1 + len) % len);
  }, [filtered.length]);

  function out(text: string) {
    pushLines(setLines, [{ id: uid(), kind: "out", text }]);
  }
  function cmd(text: string) {
    pushLines(setLines, [{ id: uid(), kind: "cmd", text: `> ${text}` }]);
  }

  function openVerify(link?: string) {
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  }

  function openByIndex(n: number) {
    if (n < 1 || n > filtered.length) return out(`invalid index (1..${filtered.length})`);
    setIdx(n - 1);
    const c = filtered[n - 1];
    if (c) setOpen(c);
  }

  function info() {
    if (!active) return out("no active cert");
    out(`title: ${active.title}`);
    out(`issuer: ${active.issuer || "—"}`);
    out(`issued: ${active.issueDate ? fmtDate(active.issueDate) : "—"}`);
    out(`verify: ${active.verifyLink ? "available" : "—"}`);
  }

  function run(raw: string) {
    const t = raw.trim();
    if (!t) return;

    const openQuick = t.match(/^open\s*#?\s*(\d+)$/i) || t.match(/^open(\d+)$/i);
    if (openQuick) {
      const n = parseInt(openQuick[1], 10);
      cmd(t);
      if (!Number.isFinite(n)) return out("usage: open <n>");
      openByIndex(n);
      return;
    }

    cmd(t);

    const [head, ...rest] = t.split(" ");
    const arg = rest.join(" ").trim();
    const h = head.toLowerCase();

    switch (h) {
      case "help":
        out("help: (displays all commands)");
        out("list (list all certificates)");
        out("search <text> (search for certificates)");
        out("open <n> | open<n> | open#<n> (opens certificate number <n>)");
        out("next | prev (wraps around)");
        out("info (displays info about the previewed certificate)");
        out("verify (opens verification link for the previewed certificate)");
        out("clear (clears all filters)");
        out("cls (clears the terminal log)");
        return;

      case "list": {
        const lim = Math.min(20, filtered.length);
        out(`showing ${lim}/${filtered.length}`);
        for (let i = 0; i < lim; i++) {
          const c = filtered[i];
          out(`${String(i + 1).padStart(2, "0")}. ${c.title}${c.issuer ? ` — ${c.issuer}` : ""}`);
        }
        return;
      }

      case "search":
        setQ(arg);
        setIdx(0);
        out(arg ? `filter: "${arg}"` : "filter cleared");
        return;

      case "clear":
        setQ("");
        setIdx(0);
        out("filter cleared");
        return;

      case "open": {
        const n = parseInt(arg, 10);
        if (!Number.isFinite(n)) return out("usage: open <n>");
        openByIndex(n);
        return;
      }

      case "next":
        goNext();
        return;

      case "prev":
        goPrev();
        return;

      case "info":
        info();
        return;

      case "verify":
        if (!active) return out("no active cert");
        if (!active.verifyLink) return out("no verify link");
        openVerify(active.verifyLink);
        return;

      case "cls":
        setLines([]);
        return;

      default:
        out(`unknown command: ${head}`);
        return;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const v = input.trim();
      if (v) run(v);
      setInput("");
    }
  }

  const verifiedCount = useMemo(() => filtered.filter((c) => !!c.verifyLink).length, [filtered]);

  return (
    <motion.section
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className="py-8 sm:py-12 overflow-visible min-h-[90svh]"
    >
      <motion.h1
        variants={fadeUp}
        className="heading text-3xl md:text-4xl lg:text-5xl font-extrabold pb-10"
      >
        Certificates <span className="text-purple">Shell</span>
      </motion.h1>

      <motion.div
        variants={shellEnter}
        className="mx-auto w-full max-w-7xl 2xl:max-w-[90rem] px-0 sm:px-3"
      >
        <div className="group relative rounded-[26px] sm:rounded-[32px] border border-white/10 bg-[#090A1A] shadow-[0_18px_70px_rgba(0,0,0,0.55)] overflow-hidden h-full max-h-[84vh] lg:h-[660px] lg:max-h-none transition-[box-shadow,border-color,transform] duration-700 ease-out hover:shadow-[0_18px_85px_rgba(168,85,247,0.18)] hover:border-white/16">
          <div className="pointer-events-none absolute inset-0 rounded-[26px] sm:rounded-[32px] opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
            <div className="absolute inset-0 rounded-[26px] sm:rounded-[32px] ring-1 ring-inset ring-purple/30" />
            <div className="absolute -inset-[2px] rounded-[28px] sm:rounded-[34px] bg-[radial-gradient(1200px_460px_at_50%_0%,rgba(168,85,247,0.22),transparent_62%)] blur-xl" />
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.14),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
          </div>

          <div className="relative h-full min-h-0 grid grid-cols-1 lg:grid-cols-[0.78fr_1.22fr]">
            <motion.div
              variants={colEnter}
              className="min-h-0 flex flex-col order-1 lg:order-2 border-b lg:border-b-0 lg:border-l border-white/10 h-[50vh] max-h-[360px] lg:h-full lg:max-h-none"
            >
              <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2 text-white/70">
                  <Info className="h-4 w-4 text-purple" />
                  <p className="text-[11px] font-bold tracking-[0.22em]">PREVIEW</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                    <Search className="h-4 w-4 text-purple" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="filter…"
                      className="w-44 bg-transparent text-xs text-white/80 placeholder:text-white/35 outline-none"
                      spellCheck={false}
                      autoCapitalize="none"
                      autoCorrect="off"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/75 transition-colors duration-300 hover:bg-white/[0.07]"
                    aria-label="Prev"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/75 transition-colors duration-300 hover:bg-white/[0.07]"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 p-2 sm:p-4">
                {active ? (
                  <PreviewPassport
                    cert={active}
                    onOpen={() => setOpen(active)}
                    onVerify={() => openVerify(active.verifyLink)}
                  />
                ) : (
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/55">
                    No results.
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={colEnter}
              className="min-h-0 flex flex-col order-2 lg:order-1 h-auto max-h-[36vh] lg:h-full lg:max-h-none"
            >
              <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2 text-white/70">
                  <Terminal className="h-4 w-4 text-purple" />
                  <p className="text-[11px] font-bold tracking-[0.22em]">TERMINAL</p>
                </div>

                <div className="text-xs text-white/50 font-semibold">
                  {String(filtered.length ? idx + 1 : 0).padStart(2, "0")}/{String(filtered.length).padStart(2, "0")}
                  {verifiedCount ? <span className="ml-2 text-purple/70">• {verifiedCount} verified</span> : null}
                </div>
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto px-4 sm:px-5 py-3 sm:py-4"
                onMouseDown={() => inputRef.current?.focus()}
                onTouchStart={() => inputRef.current?.focus()}
              >
                <div ref={logRef} className="max-h-full overflow-y-auto">
                  {lines.map((l) => (
                    <div
                      key={l.id}
                      className={cn(
                        "text-sm leading-relaxed whitespace-pre-wrap",
                        l.kind === "sys" && "text-white/45",
                        l.kind === "cmd" && "text-purple/80",
                        l.kind === "out" && "text-white/70"
                      )}
                    >
                      {l.text}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="border-t border-white/10 px-4 sm:px-5 py-3 sm:py-4"
                onMouseDown={() => inputRef.current?.focus()}
                onTouchStart={() => inputRef.current?.focus()}
              >
                <div className="flex items-center gap-3">
                  <span className="text-purple/85 text-sm font-semibold">{">"}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="search infosys | list | help | open 2 | info | verify"
                    className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/35 outline-none"
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { t: "list", v: "list" },
                    { t: "prev", v: "prev" },
                    { t: "next", v: "next" },
                    { t: "verify", v: "verify" },
                    { t: "clear", v: "clear" },
                  ].map((b) => (
                    <button
                      key={b.t}
                      type="button"
                      onClick={() => run(b.v)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/70 transition-colors duration-300 hover:bg-white/[0.07]"
                    >
                      {b.t}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open ? <CertModal cert={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </motion.section>
  );
}