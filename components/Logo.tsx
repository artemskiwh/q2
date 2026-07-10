import Link from "next/link";

export function Logo({
  showCity = true,
  size = "md",
}: {
  showCity?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href="/"
      aria-label="ICON - караоке-ресторан"
      className="group inline-flex flex-col items-center leading-none"
    >
      <span className={`logo-box ${size === "sm" ? "scale-90" : ""}`}>
        <span className="word">ICON</span>
      </span>
      {showCity && (
        <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.34em] text-white/85">
          <PinIcon className="h-3 w-3" />
          Ростов-на-Дону
        </span>
      )}
    </Link>
  );
}

function PinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}
