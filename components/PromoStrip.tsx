import { Icon } from "./Icons";

const ITEMS = [
  { icon: <Icon.Truck className="h-5 w-5" />, title: "Доставка от 1 дня", sub: "По Москве и РФ" },
  { icon: <Icon.Shield className="h-5 w-5" />, title: "Только оригинал", sub: "Гарантия от бренда" },
  { icon: <Icon.Coin className="h-5 w-5" />, title: "Опт от 50 шт.", sub: "Цены от 110 ₽" },
  { icon: <Icon.Headphones className="h-5 w-5" />, title: "Менеджер 24/7", sub: "Ответим за 5 мин" },
];

export function PromoStrip() {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {ITEMS.map((it) => (
        <div
          key={it.title}
          className="surface flex items-center gap-3 p-3.5 md:p-4"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
            {it.icon}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-white md:text-sm">{it.title}</p>
            <p className="truncate text-[11px] text-muted md:text-xs">{it.sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
