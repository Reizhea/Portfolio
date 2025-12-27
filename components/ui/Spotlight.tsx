"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
  size?: number;
  intensity?: number;
};

export const Spotlight = ({
  className,
  fill,
  size = 280,
  intensity = 0.32,
}: SpotlightProps) => {
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    target.current = { ...pos.current };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;

      const el = elRef.current;
      if (el) {
        el.style.setProperty("--sx", `${pos.current.x}px`);
        el.style.setProperty("--sy", `${pos.current.y}px`);
      }

      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={elRef}
      className={cn("pointer-events-none fixed inset-0 z-[1]", className)}
      style={
        {
          "--sx": "0px",
          "--sy": "0px",
          background: `radial-gradient(${size}px circle at var(--sx) var(--sy),
            ${fill || `rgba(129, 140, 248, ${intensity})`},
            transparent 62%)`,
        } as React.CSSProperties
      }
    />
  );
};