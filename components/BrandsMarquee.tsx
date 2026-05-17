"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BRANDS = [
  "DUALL",
  "WAKA",
  "ELFBAR",
  "GEEK BAR",
  "VAPORESSO",
  "GEEKVAPE",
  "VOZOL",
  "FIZZY",
  "PUFFMI",
  "BUBBLE MON",
  "LAISKA",
  "XROS",
];

export function BrandsMarquee() {
  // Triple-loop so the strip never runs out of brands when scrolled to the end.
  const loop = [...BRANDS, ...BRANDS, ...BRANDS];

  const ref = useRef<HTMLDivElement>(null);
  // Drive the strip purely from page scroll — leftward as the user scrolls down.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section
      ref={ref}
      className="overflow-hidden rounded-2xl border border-bg-line bg-bg-card py-5"
    >
      <div className="flex items-center gap-2 px-5 pb-3">
        <span className="h-px flex-1 bg-bg-line" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Бренды в каталоге
        </span>
        <span className="h-px flex-1 bg-bg-line" />
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-card to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-card to-transparent"
          aria-hidden
        />
        <motion.div
          style={{ x }}
          className="flex gap-10 whitespace-nowrap px-5 will-change-transform"
        >
          {loop.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="select-none text-[20px] font-black uppercase tracking-[0.16em] text-white/15 transition-colors hover:text-white/55 md:text-[28px]"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
