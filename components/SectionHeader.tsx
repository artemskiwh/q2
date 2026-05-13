import Link from "next/link";
import { Icon } from "./Icons";

export function SectionHeader({
  title,
  subtitle,
  href,
  cta = "Смотреть все",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3 md:mb-5">
      <div className="min-w-0">
        <h2 className="truncate text-lg font-black tracking-tight text-white md:text-2xl lg:text-[28px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 line-clamp-1 text-[12px] text-muted md:mt-1 md:text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg text-[12px] font-semibold text-white/80 transition hover:text-brand md:text-sm"
        >
          {cta}
          <Icon.Chevron className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 md:h-4 md:w-4" />
        </Link>
      )}
    </div>
  );
}
