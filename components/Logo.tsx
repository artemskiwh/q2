import Link from "next/link";
import { Icon } from "./Icons";
import { restaurant } from "@/lib/restaurant";

/**
 * Логотип-вывеска: разряжённые прописные в тонкой рамке,
 * под рамкой — город с иконкой метки.
 */
export function Logo({
  href = "/",
  size = "md",
  withCity = true,
}: {
  href?: string | null;
  size?: "sm" | "md" | "lg";
  withCity?: boolean;
}) {
  const box =
    size === "sm"
      ? "border px-3 py-1.5 text-[0.85rem]"
      : size === "lg"
        ? "border px-6 py-3 text-[1.5rem] md:px-8 md:py-3.5 md:text-[2rem]"
        : "border px-4 py-2 text-[1.05rem] md:text-[1.2rem]";

  const inner = (
    <span className="flex flex-col items-center">
      <span className={`wordmark border-ink/85 leading-none text-ink ${box}`}>
        Pakhlava
      </span>
      {withCity ? (
        <span
          className={`mt-2 flex items-center gap-1.5 uppercase tracking-wider2 text-ink/85 ${
            size === "sm" ? "text-[0.55rem]" : "text-[0.62rem] md:text-[0.7rem]"
          }`}
        >
          <Icon.Pin className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
          {restaurant.address.shortCity}
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} aria-label="Pakhlava — на главную" className="shrink-0">
      {inner}
    </Link>
  );
}
