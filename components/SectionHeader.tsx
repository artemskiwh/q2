import Link from "next/link";
import { Icon } from "./Icons";

export function SectionHeader({
  title,
  href,
  cta = "Смотреть все",
}: {
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h2>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-brand"
        >
          {cta}
          <Icon.Chevron className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
