"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/lib/types";

const ICON_BG: Record<Category, string> = {
  disposable: "linear-gradient(135deg, #e94e3c, #1c0808)",
  pod: "linear-gradient(135deg, #0ea5e9, #061826)",
  cartridge: "linear-gradient(135deg, #10b981, #02201a)",
  liquid: "linear-gradient(135deg, #a855f7, #160426)",
  accessory: "linear-gradient(135deg, #f59e0b, #1a0c02)",
  sale: "linear-gradient(135deg, #ef4444, #1a0a0a)",
};

export function CategoryCard({
  id,
  label,
  subtitle,
  icon,
  index = 0,
}: {
  id: Category;
  label: string;
  subtitle: string;
  icon: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.32, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link
        href={`/catalog?category=${id}`}
        className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-bg-line bg-bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
      >
        <div
          className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl"
          style={{ background: ICON_BG[id] }}
        >
          <span className="text-4xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/10" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="mt-0.5 text-xs text-muted">{subtitle}</p>
        </div>
      </Link>
    </motion.div>
  );
}
