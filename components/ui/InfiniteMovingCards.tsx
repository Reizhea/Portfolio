"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    img: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      setAnimationProperties();
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      if (scrollerRef.current) {
        scrollerRef.current.style.animationPlayState = "paused";
      }
    } else {
      document.body.style.overflow = "auto";
      if (scrollerRef.current) {
        scrollerRef.current.style.animationPlayState = "running"; 
      }
    }

    return () => {
      document.body.style.overflow = "auto";
      if (scrollerRef.current) {
        scrollerRef.current.style.animationPlayState = "running";
      }
    };
  }, [selectedImage]);

  const setAnimationProperties = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast"
          ? "30s"
          : speed === "normal"
          ? "25s"
          : "25s";
      containerRef.current.style.setProperty("--animation-duration", duration);
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const openModal = (img: string) => {
    const certsSection = document.getElementById("cert");
    if (certsSection) {
      certsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setTimeout(() => {
      setSelectedImage(img);
    }, 500);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative z-20 max-w-7xl overflow-hidden", className)}
    >
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
          onClick={closeModal} 
        >
          <img
            src={selectedImage}
            alt="Certificate"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg cursor-pointer"
            onClick={closeModal} 
          />
        </div>
      )}

      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `scroll var(--animation-duration) linear infinite var(--animation-direction)`,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.title}-${idx}`}
            className="w-[500px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-8 md:w-[600px] cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
            onClick={() => openModal(item.img)} 
          >
            <div className="flex flex-col items-center">
              <div className="relative z-20 mb-6">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
              </div>
              <span className="relative z-20 text-center text-xl leading-[1.6] text-gray-100 font-medium mt-4">
                {item.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .hover\\:paused:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};
