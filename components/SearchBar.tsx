"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icons";

export function SearchBar({ size = "md" }: { size?: "sm" | "md" }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const pad = size === "sm" ? "py-2 pl-9 pr-3 text-sm" : "py-2.5 pl-10 pr-3 text-sm";
  const iconPos = size === "sm" ? "left-2.5" : "left-3";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/catalog?q=${encodeURIComponent(q.trim())}`);
      }}
      role="search"
      className="relative w-full"
    >
      <Icon.Search
        className={`pointer-events-none absolute ${iconPos} top-1/2 h-4 w-4 -translate-y-1/2 text-muted`}
      />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Поиск по каталогу"
        className={`w-full rounded-xl border border-bg-line bg-bg-soft text-white placeholder:text-muted focus:border-brand/60 focus:bg-bg-card focus:outline-none ${pad}`}
      />
    </form>
  );
}
