import { Icon } from "./Icons";

const ITEMS = [
  {
    icon: <Icon.Box className="h-6 w-6" />,
    title: "Склад в Москве",
    text: "Более 5 000 устройств в наличии. Отгрузка день в день при заказе до 14:00.",
    accent: "from-brand to-[#ff7a5e]",
  },
  {
    icon: <Icon.Shield className="h-6 w-6" />,
    title: "Только оригинал",
    text: "Работаем напрямую с производителями — DUALL, WAKA, ELFBAR, GEEK BAR, Vaporesso.",
    accent: "from-accent to-[#67e8f9]",
  },
  {
    icon: <Icon.Coin className="h-6 w-6" />,
    title: "Прозрачный прайс",
    text: "Цены от 110 ₽ за устройство. Доп. скидки от 200, 500 и 1 000 штук.",
    accent: "from-gold to-[#fcd34d]",
  },
  {
    icon: <Icon.Truck className="h-6 w-6" />,
    title: "Доставка по РФ",
    text: "СДЭК, ПЭК, Boxberry — отправка в день оплаты. По Москве — собственный курьер.",
    accent: "from-[#a855f7] to-[#c084fc]",
  },
  {
    icon: <Icon.Headphones className="h-6 w-6" />,
    title: "Личный менеджер",
    text: "Закреплённый партнёрский менеджер. Связь в Telegram, WhatsApp и по телефону.",
    accent: "from-[#10b981] to-[#34d399]",
  },
  {
    icon: <Icon.Star className="h-6 w-6" />,
    title: "Программа лояльности",
    text: "Накопительные бонусы, эксклюзивные новинки и приоритетная отгрузка.",
    accent: "from-[#f59e0b] to-[#fbbf24]",
  },
];

export function AdvantagesSection() {
  return (
    <section className="space-y-5 md:space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand md:text-[11px]">
            Почему мы
          </p>
          <h2 className="mt-1.5 text-xl font-black text-white md:mt-2 md:text-3xl">
            Партнёрам — лучшие условия
          </h2>
        </div>
        <p className="max-w-md text-[13px] text-muted md:text-sm">
          Десятки оптовых клиентов в Москве, СПб и регионах. Прозрачные условия и стабильные
          поставки.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it) => (
          <div
            key={it.title}
            className="surface group relative overflow-hidden p-4 transition-colors hover:border-brand/30 md:p-5"
          >
            <div
              className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${it.accent} text-white md:h-12 md:w-12`}
            >
              {it.icon}
            </div>
            <h3 className="mt-3 text-[15px] font-bold text-white md:mt-4 md:text-base">
              {it.title}
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-muted md:text-sm">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
