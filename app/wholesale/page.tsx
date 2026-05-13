import { Icon } from "@/components/Icons";
import { WholesaleForm } from "@/components/WholesaleForm";

export const metadata = {
  title: "Условия опта",
  description:
    "Опт от 10 000 ₽, цены от 100 шт, индивидуальные условия для розничных сетей.",
};

const TIERS = [
  { title: "Старт", from: "от 10 000 ₽", desc: "Базовая цена, отгрузка день-в-день" },
  { title: "Партнёр", from: "от 100 шт", desc: "Сниженная цена и приоритет в очереди" },
  { title: "Сеть", from: "от 1 000 шт", desc: "Индивидуальные условия и менеджер 24/7" },
];

const DELIVERY = [
  { name: "СДЭК", text: "По всей РФ, 1-7 дней" },
  { name: "Боксберри", text: "Пункты выдачи и курьером" },
  { name: "ПЭК", text: "Крупные партии, фуры" },
  { name: "Самовывоз", text: "Москва, склад" },
];

export default function WholesalePage() {
  return (
    <div className="container-page py-8 md:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-bg-line bg-bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
        <span className="chip chip-brand mb-3 w-fit">Опт</span>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Условия для оптовых партнёров
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          Прозрачная сетка цен, оперативная отгрузка и менеджер на связи в Telegram. Чем больше
          объём — тем ниже стоимость единицы.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.title}
            className="relative overflow-hidden rounded-2xl border border-bg-line bg-bg-card p-6"
          >
            <span className="chip chip-neutral mb-3 w-fit">{t.from}</span>
            <h3 className="text-xl font-bold">{t.title}</h3>
            <p className="mt-2 text-sm text-muted">{t.desc}</p>
          </div>
        ))}
      </section>

      <section id="delivery" className="mt-10">
        <h2 className="text-2xl font-bold">Доставка</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {DELIVERY.map((d) => (
            <div
              key={d.name}
              className="flex items-start gap-3 rounded-2xl border border-bg-line bg-bg-card p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon.Truck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-xs text-muted">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-bg-line bg-bg-card p-6 md:p-8">
          <h2 className="text-2xl font-bold">Что входит в опт</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              "Гибкая цена при объёме от 100 шт",
              "Возврат и обмен в течение 14 дней",
              "Фото и описания для маркетплейсов",
              "Помощь с маркировкой Честный знак",
              "Отгрузка день-в-день при заказе до 16:00",
              "Персональный менеджер в Telegram",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                  <Icon.Spark className="h-3 w-3" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <WholesaleForm />
      </section>
    </div>
  );
}
