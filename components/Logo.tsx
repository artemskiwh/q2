import Link from "next/link";
import { Rosette } from "./Ornament";
import { restaurant } from "@/lib/restaurant";

const SIZES = {
  sm: { mark: "h-4 w-4", word: "text-[1.5rem]", tag: "text-[0.44rem]", gap: "mt-1.5" },
  md: {
    mark: "h-5 w-5 md:h-6 md:w-6",
    word: "text-[1.9rem] md:text-[2.3rem]",
    tag: "text-[0.5rem] md:text-[0.56rem]",
    gap: "mt-2 md:mt-2.5",
  },
  lg: { mark: "h-7 w-7", word: "text-[2.8rem]", tag: "text-[0.6rem]", gap: "mt-3" },
} as const;

/**
 * Фирменный знак: розетка, ниже — «pakhlava» светлой антиквой,
 * под ней разряжённая подпись. Повторяет вывеску ресторана.
 */
export function Logo({
  href = "/",
  size = "md",
  withTagline = true,
}: {
  href?: string | null;
  size?: keyof typeof SIZES;
  withTagline?: boolean;
}) {
  const s = SIZES[size];

  const inner = (
    <span className="flex flex-col items-center leading-none">
      <Rosette className={`${s.mark} text-ink/90`} />
      <span className={`wordmark mt-2 text-ink ${s.word}`}>pakhlava</span>
      {withTagline ? (
        <span
          className={`${s.gap} flex items-center gap-1.5 uppercase tracking-wider3 text-ink/65 ${s.tag}`}
        >
          <span className="h-[3px] w-[3px] rotate-45 bg-ink/60" />
          {restaurant.tagline}
          <span className="h-[3px] w-[3px] rotate-45 bg-ink/60" />
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      aria-label="Pakhlava — на главную"
      className="shrink-0 transition-opacity hover:opacity-80"
    >
      {inner}
    </Link>
  );
}
