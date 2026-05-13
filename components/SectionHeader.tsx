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
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-black tracking-tight text-white md:text-2xl lg:text-[28px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-[13px] text-muted md:text-sm">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold text-white/80 transition hover:text-brand"
        >
          {cta}
          <Icon.Chevron className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
