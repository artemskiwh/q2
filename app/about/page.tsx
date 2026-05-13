import Link from "next/link";
import { Icon } from "@/components/Icons";

export const metadata = {
  title: "О компании",
  description:
    "TYAG Moskva — оптовая поставка одноразок, под-систем и аксессуаров для розничных сетей.",
};

const STATS = [
  { label: "Лет на рынке", value: "5+" },
  { label: "Партнёров по РФ", value: "300+" },
  { label: "Заказов в месяц", value: "1 200" },
  { label: "Возвраты", value: "<1%" },
];

const VALUES = [
  {
    icon: Icon.Shield,
    title: "Только оригинал",
    text: "Прямые контракты с производителями и официальными представителями.",
  },
  {
    icon: Icon.Truck,
    title: "Быстрая доставка",
    text: "Отгрузка день-в-день при заказе до 16:00. СДЭК, Боксберри, ПЭК.",
  },
  {
    icon: Icon.Spark,
    title: "Гибкие условия",
    text: "Индивидуальные цены, рассрочка крупным партнёрам, выгрузка по запросу.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-8 md:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-bg-line bg-bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand/25 blur-[120px]" />
        <span className="chip chip-brand mb-3 w-fit">О компании</span>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Поставляем вейпы оптом в розничные сети Москвы и регионов
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted">
          TYAG Moskva — это команда, которая знает рынок изнутри. Мы открываем магазины и видим
          ситуацию глазами ритейлера. Поэтому собираем под наших партнёров оптимальный ассортимент,
          держим цены ниже маркетплейсов и страхуем стоки.
        </p>
      </section>

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-bg-line bg-bg-card p-5 text-center"
          >
            <dt className="text-xs uppercase tracking-wider text-muted">{s.label}</dt>
            <dd className="mt-1 text-3xl font-bold">{s.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {VALUES.map(({ icon: I, title, text }) => (
          <div key={title} className="rounded-2xl border border-bg-line bg-bg-card p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
              <I className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-bg-line bg-bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold md:text-2xl">Как мы работаем</h2>
          <ol className="mt-5 space-y-4 text-sm">
            {[
              "Знакомимся, обсуждаем регион и формат бизнеса.",
              "Подбираем стартовый ассортимент и согласуем цены.",
              "Отгружаем заказ — в этот же день или на следующий.",
              "Сопровождаем: помогаем с фото, описаниями и марками.",
            ].map((t, i) => (
              <li key={t} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                  {i + 1}
                </span>
                <span className="pt-1 text-white/85">{t}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-bg-line bg-gradient-to-br from-brand/15 to-bg-card p-6 md:p-8">
          <h3 className="text-xl font-bold">Готовы стать партнёром?</h3>
          <p className="mt-2 text-sm text-muted">
            Оставьте заявку — менеджер свяжется в течение часа и пришлёт прайс.
          </p>
          <Link href="/wholesale" className="btn-primary mt-5 w-fit">
            Заполнить заявку
          </Link>
        </div>
      </section>
    </div>
  );
}
