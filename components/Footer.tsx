import Link from "next/link";
import { Logo } from "./Logo";
import { Icon } from "./Icons";
import { restaurant } from "@/lib/restaurant";

const NAV_COLUMNS = [
  {
    title: "Ресторан",
    links: [
      { href: "/", label: "Главная" },
      { href: "/menu", label: "Меню" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
  {
    title: "Гостям",
    links: [
      { href: "/booking", label: "Забронировать стол" },
      { href: "/menu#mangal", label: "Мангал и гриль" },
      { href: "/menu#soups", label: "Супы" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-accent/15 bg-night-soft/70">
      <div className="container-page grid gap-12 pb-12 pt-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:gap-8">
        <div>
          <Logo size="sm" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-dim">
            {restaurant.description}
          </p>
          <div className="mt-6 flex gap-3">
            {restaurant.socials.map((s) => {
              const Cmp = Icon[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center border border-accent/20 text-ink/80 transition-all hover:border-accent/60 hover:text-accent"
                >
                  <Cmp className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>

        {NAV_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="eyebrow">{col.title}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-dim transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="eyebrow">Мы рядом</h3>
          <ul className="mt-5 space-y-4 text-sm text-ink-dim">
            <li className="flex gap-3">
              <Icon.Pin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {restaurant.address.street}
                <br />
                {restaurant.address.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon.Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${restaurant.phoneHref}`} className="hover:text-accent">
                {restaurant.phoneLabel}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon.Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {restaurant.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-mute md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {restaurant.legalName}
          </span>
          <span>Сайт-черновик · фотографии блюд добавляются</span>
        </div>
      </div>
    </footer>
  );
}
