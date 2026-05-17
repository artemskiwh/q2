import { Icon } from "./Icons";

const ITEMS = [
  { icon: <Icon.Truck className="h-5 w-5" />, title: "Доставка от 1 дня", sub: "По Москве и РФ" },
  { icon: <Icon.Shield className="h-5 w-5" />, title: "Только оригинал", sub: "Гарантия от бренда" },
  { icon: <Icon.Coin className="h-5 w-5" />, title: "Опт от 50 шт.", sub: "Цены от 110 ₽" },
];

export function PromoStrip() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {ITEMS.map((it) => (
        <div
          key={it.title}
          className="surface flex items-center gap-2.5 p-3 md:p-3.5"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand md:h-10 md:w-10">
            {it.icon}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold leading-tight text-white md:text-[13px]">
              {it.title}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight text-muted md:text-[11px]">
              {it.sub}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
