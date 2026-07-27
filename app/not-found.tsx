import Link from "next/link";
import { OrnamentDivider, PlateRing, Rosette } from "@/components/Ornament";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-5 py-32">
      <PlateRing className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold/[0.06]" />

      <div className="relative flex flex-col items-center text-center">
        <Rosette className="h-10 w-10 text-gold" />
        <span className="display-xl mt-8 text-[4.5rem] leading-none text-gold-gradient md:text-[6rem]">
          404
        </span>
        <h1 className="display-xl mt-4 text-[1.9rem] text-ink md:text-[2.4rem]">
          Такого блюда нет в меню
        </h1>
        <OrnamentDivider className="mt-7 max-w-[320px]" />
        <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-dim">
          Страница потерялась по дороге с гор. Вернитесь на главную — или сразу
          посмотрите, что сегодня на мангале.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-gold">
            На главную
          </Link>
          <Link href="/menu" className="btn btn-outline">
            Смотреть меню
          </Link>
        </div>
      </div>
    </section>
  );
}
