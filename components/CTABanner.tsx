import Link from "next/link";
import { Icon } from "./Icons";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-brand/25 md:rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-brand/25 via-bg-card to-bg-card" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-40 bg-brand/40 blur-3xl" />

      <div className="relative flex flex-col items-start gap-5 p-5 md:flex-row md:items-center md:justify-between md:gap-6 md:p-10">
        <div className="max-w-xl">
          <span className="chip chip-brand">
            <Icon.Bolt className="h-3 w-3" /> Оптовый прайс
          </span>
          <h2 className="mt-2.5 text-xl font-black leading-tight text-white md:mt-3 md:text-3xl lg:text-4xl">
            Получите оптовый прайс <br className="hidden md:block" />и стартовую скидку 10%
          </h2>
          <p className="mt-2.5 text-[13px] text-white/70 md:mt-3 md:text-base">
            Оставьте заявку — менеджер пришлёт актуальный прайс в Telegram или WhatsApp в течение
            5 минут.
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-3">
          <Link href="/wholesale" className="btn-primary flex-1 md:flex-none">
            <Icon.Handshake className="h-4 w-4" />
            Стать партнёром
          </Link>
          <a
            href="https://t.me/tyag_moskva"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost flex-1 md:flex-none"
          >
            <Icon.Telegram className="h-4 w-4" />
            Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
