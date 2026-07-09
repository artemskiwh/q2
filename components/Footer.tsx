import { Logo } from "./Logo";
import { RESTAURANT } from "@/lib/icon-data";

const NAV = [
  { href: "#about", label: "О ресторане" },
  { href: "#menu", label: "Меню" },
  { href: "#karaoke", label: "Караоке" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-ink-soft">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Караоке-ресторан ICON — безупречный звук, авторская кухня и
              атмосфера в самом центре Ростова-на-Дону.
            </p>
            <a href="#book" className="btn-gold mt-6">
              Забронировать стол
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
              Навигация
            </p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-muted transition hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
              Контакты
            </p>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>{RESTAURANT.address}</li>
              <li>
                {RESTAURANT.district}, {RESTAURANT.city}
              </li>
              <li>
                <a href={RESTAURANT.phoneHref} className="hover:text-gold">
                  {RESTAURANT.phone}
                </a>
              </li>
              <li className="text-gold">{RESTAURANT.hoursShort}, ежедневно</li>
              <li>
                <a href={RESTAURANT.gis} target="_blank" rel="noreferrer" className="hover:text-gold">
                  Профиль в 2ГИС →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gold/10 pt-6 text-xs text-mute2 md:flex-row">
          <p>© {new Date().getFullYear()} ICON — караоке-ресторан. Все права защищены.</p>
          <p>Ростов-на-Дону · {RESTAURANT.address}</p>
        </div>
      </div>
    </footer>
  );
}
