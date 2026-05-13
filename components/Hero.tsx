import Link from "next/link";
import { Icon } from "./Icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-bg-line bg-bg-card">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-brand/30 blur-[120px]" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="relative grid gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:gap-10 md:p-10">
        <div className="flex flex-col justify-center gap-5">
          <span className="chip chip-brand w-fit"><Icon.Spark className="h-3 w-3" /> Поставка от 1 ящика</span>
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Оптовая поставка вейпов
            <br />
            <span className="text-brand">с маркировкой</span> Честный знак
          </h1>
          <p className="max-w-xl text-sm text-muted md:text-base">
            Прямые контракты с производителями. Одноразки, под-системы, картриджи и аксессуары —
            всегда в наличии. Гибкие цены при объёме от 100 шт.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">
              Смотреть каталог
              <Icon.Chevron className="h-4 w-4" />
            </Link>
            <Link href="/wholesale" className="btn-secondary">
              Стать партнёром
            </Link>
          </div>

          <dl className="mt-2 grid grid-cols-3 gap-3 text-center md:text-left">
            <div className="rounded-xl border border-bg-line bg-bg-soft p-3">
              <dt className="text-[10px] uppercase tracking-wider text-muted">Брендов</dt>
              <dd className="mt-1 text-lg font-bold">12+</dd>
            </div>
            <div className="rounded-xl border border-bg-line bg-bg-soft p-3">
              <dt className="text-[10px] uppercase tracking-wider text-muted">Позиций</dt>
              <dd className="mt-1 text-lg font-bold">300+</dd>
            </div>
            <div className="rounded-xl border border-bg-line bg-bg-soft p-3">
              <dt className="text-[10px] uppercase tracking-wider text-muted">Доставка</dt>
              <dd className="mt-1 text-lg font-bold">по РФ</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden items-center justify-center md:flex">
          <div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-gradient-to-br from-brand/40 to-transparent blur-2xl" />
          <div className="relative grid h-80 w-80 grid-cols-3 gap-3 [transform:perspective(900px)_rotateY(-12deg)_rotateX(8deg)]">
            {[
              "linear-gradient(160deg,#e94e3c,#1a0a08)",
              "linear-gradient(160deg,#0ea5a8,#08161e)",
              "linear-gradient(160deg,#9333ea,#0f0420)",
              "linear-gradient(160deg,#f59e0b,#1a0c02)",
              "linear-gradient(160deg,#22c55e,#05140c)",
              "linear-gradient(160deg,#ec4899,#1a0512)",
            ].map((g, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 shadow-card"
                style={{ background: g }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
