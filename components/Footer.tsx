import Link from "next/link";
import { Icon } from "./Icons";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Каталог",
    links: [
      { href: "/catalog?category=disposable", label: "Одноразки" },
      { href: "/catalog?category=pod", label: "Поды-системы" },
      { href: "/catalog?category=cartridge", label: "Картриджи" },
      { href: "/catalog?category=sale", label: "Распродажа" },
    ],
  },
  {
    title: "Информация",
    links: [
      { href: "/about", label: "О компании" },
      { href: "/wholesale", label: "Условия опта" },
      { href: "/contacts", label: "Контакты" },
      { href: "/wholesale#delivery", label: "Доставка" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-bg-line bg-bg-soft pb-24 lg:pb-12">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo size="md" />
          <p className="text-sm text-muted">
            Оптовая поставка одноразок, под-систем и аксессуаров в розничные сети Москвы и регионов.
            Только сертифицированный товар с маркировкой «Честный знак».
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/tyag_moskva"
              className="grid h-10 w-10 place-items-center rounded-xl border border-bg-line bg-bg-card hover:bg-bg-elev"
              aria-label="Telegram"
            >
              <Icon.Telegram className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/79000000000"
              className="grid h-10 w-10 place-items-center rounded-xl border border-bg-line bg-bg-card hover:bg-bg-elev"
              aria-label="WhatsApp"
            >
              <Icon.Whatsapp className="h-5 w-5" />
            </a>
            <a
              href="tel:+79000000000"
              className="grid h-10 w-10 place-items-center rounded-xl border border-bg-line bg-bg-card hover:bg-bg-elev"
              aria-label="Телефон"
            >
              <Icon.Phone className="h-5 w-5" />
            </a>
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              {col.title}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 transition hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Контакты
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="tel:+79000000000" className="text-white/90 hover:text-brand">
                +7 (900) 000-00-00
              </a>
            </li>
            <li className="text-white/80">opt@tyag-moskva.ru</li>
            <li className="text-muted">
              Москва, склад / самовывоз
              <br />
              Пн–Сб 10:00 — 20:00
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg-line">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted md:flex-row">
          <span>© {new Date().getFullYear()} TYAG Moskva. Только для лиц старше 18 лет.</span>
          <span>Не является публичной офертой. Курение вредит вашему здоровью.</span>
        </div>
      </div>
    </footer>
  );
}
