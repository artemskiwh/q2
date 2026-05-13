import { Icon } from "./Icons";

const ITEMS = [
  { Icon: Icon.Truck, title: "Доставка по РФ", text: "СДЭК, Боксберри, ПЭК" },
  { Icon: Icon.Shield, title: "Честный знак", text: "Все товары промаркированы" },
  { Icon: Icon.Spark, title: "Опт от 10 000 ₽", text: "Гибкие цены от 100 шт" },
  { Icon: Icon.Phone, title: "Поддержка 7 дней", text: "Telegram, WhatsApp, звонок" },
];

export function InfoStrip() {
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {ITEMS.map(({ Icon: I, title, text }) => (
        <li
          key={title}
          className="flex items-center gap-3 rounded-2xl border border-bg-line bg-bg-card p-3.5 transition hover:border-bg-line/80"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
            <I className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{title}</p>
            <p className="truncate text-xs text-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
