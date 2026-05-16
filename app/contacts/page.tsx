import { Icon } from "@/components/Icons";

export const metadata = {
  title: "Контакты",
  description: "Связаться с TYAG Moskva: Telegram, WhatsApp, телефон, e-mail, склад в Москве.",
};

const CHANNELS = [
  {
    icon: Icon.Telegram,
    label: "Telegram",
    value: "@Weyalzo",
    href: "https://t.me/Weyalzo",
  },
  {
    icon: Icon.Whatsapp,
    label: "WhatsApp",
    value: "+7 900 000-00-00",
    href: "https://wa.me/79000000000",
  },
  {
    icon: Icon.Phone,
    label: "Телефон",
    value: "+7 (900) 000-00-00",
    href: "tel:+79000000000",
  },
  {
    icon: Icon.User,
    label: "E-mail",
    value: "opt@tyag-moskva.ru",
    href: "mailto:opt@tyag-moskva.ru",
  },
];

export default function ContactsPage() {
  return (
    <div className="container-page py-8 md:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-bg-line bg-bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-brand/25 blur-[120px]" />
        <span className="chip chip-brand mb-3 w-fit">Контакты</span>
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Связаться с нами</h1>
        <p className="mt-3 max-w-xl text-muted">
          Мы на связи 7 дней в неделю с 10:00 до 22:00 по МСК. Среднее время ответа — 15 минут.
        </p>
      </section>

      <section className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map(({ icon: I, label, value, href }) => (
          <a
            key={label}
            href={href}
            className="group flex items-start gap-3 rounded-2xl border border-bg-line bg-bg-card p-5 transition hover:-translate-y-1 hover:border-brand/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
              <I className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
              <p className="mt-0.5 truncate text-base font-semibold transition group-hover:text-brand">
                {value}
              </p>
            </div>
          </a>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-bg-line bg-bg-card p-6">
          <h3 className="text-lg font-bold">Склад и самовывоз</h3>
          <p className="mt-2 text-sm text-muted">
            Москва, ул. Складская, 12, корпус 3.
            <br />
            Пн–Сб 10:00 — 20:00. Самовывоз — по согласованию.
          </p>
        </div>
        <div className="rounded-2xl border border-bg-line bg-bg-card p-6">
          <h3 className="text-lg font-bold">Реквизиты</h3>
          <p className="mt-2 text-sm text-muted">
            ИП Иванов И.И., ИНН 770000000000.
            <br />
            Работаем с НДС и без — на выбор партнёра.
          </p>
        </div>
      </section>
    </div>
  );
}
