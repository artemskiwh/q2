"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function Toast({
  message,
  onDone,
}: {
  message: string | null;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [message, onDone]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex justify-center md:bottom-8">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-bg-line bg-bg-elev/95 px-4 py-3 shadow-card backdrop-blur"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/15 text-brand">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
