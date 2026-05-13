import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? "h-8" : size === "lg" ? "h-12" : "h-10";
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${dim}`}
      aria-label="TYAG Moskva — главная"
    >
      <span className="relative flex h-full aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[#a82618] shadow-glow">
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 text-white" fill="none">
          <path
            d="M5 4h14M12 4v12M8 16c0 3 2 4 4 4s4-1 4-4"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -inset-0.5 rounded-xl bg-brand/30 opacity-0 blur-md transition group-hover:opacity-100" />
      </span>
      <span className={`flex flex-col leading-none ${text}`}>
        <span className="font-bold tracking-wider">TYAG</span>
        <span className="text-[0.55em] font-medium uppercase tracking-[0.3em] text-muted">
          Moskva
        </span>
      </span>
    </Link>
  );
}
