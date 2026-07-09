import Link from "next/link";

export function Logo({
  size = "md",
  withTagline = true,
}: {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}) {
  const text =
    size === "sm" ? "text-xl" : size === "lg" ? "text-4xl md:text-5xl" : "text-2xl";
  return (
    <Link href="/" className="group inline-flex flex-col items-center leading-none" aria-label="ICON — караоке-ресторан">
      <span className={`brand-word ${text} text-white`}>ICON</span>
      {withTagline && (
        <span className="mt-1 text-[0.5em] font-semibold uppercase tracking-[0.4em] text-gold">
          Karaoke&nbsp;·&nbsp;Restaurant
        </span>
      )}
    </Link>
  );
}
