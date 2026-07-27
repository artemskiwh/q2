import Link from "next/link";
import { Hero } from "@/components/Hero";
import { QuickBooking } from "@/components/QuickBooking";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DishCard } from "@/components/DishCard";
import { Halls } from "@/components/Halls";
import { Reviews } from "@/components/Reviews";
import { ContactsBlock } from "@/components/ContactsBlock";
import { Icon } from "@/components/Icons";
import { OrnamentBand, PlateRing, Rosette } from "@/components/Ornament";
import { categories, signatureDishes } from "@/lib/menu";
import { values } from "@/lib/restaurant";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Быстрая бронь — сразу под первым экраном */}
      <section className="container-page relative z-20 -mt-10 md:-mt-14">
        <QuickBooking />
      </section>

      {/* Философия */}
      <section className="section container-page">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <span className="eyebrow">О ресторане</span>
            <h2 className="display-xl mt-5 text-[2.2rem] text-ink md:text-[3.1rem]">
              Кухня, которая
              <br />
              спустилась с гор
            </h2>
            <div className="mt-7 space-y-5 text-[0.98rem] leading-relaxed text-ink-dim">
              <p>
                Pakhlava — про застолье, которое не торопится. Мы собрали рецепты
                Грузии, Армении, Азербайджана и Дагестана и готовим их так, как
                готовят дома: долго, на живом огне и без сокращений.
              </p>
              <p>
                Тесто ставим с шести утра, мясо маринуем сутки, специи мелем
                перед сервисом. Всё остальное — дело углей и времени.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-gold transition-all hover:gap-3"
            >
              Наша история
              <Icon.Arrow className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          <div className="grid gap-px overflow-hidden border border-gold/12 bg-gold/12 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group relative h-full bg-night p-7 transition-colors duration-500 hover:bg-night-card">
                  <span className="display-xl block text-[2rem] leading-none text-gold/30 transition-colors group-hover:text-gold/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-xl mt-4 text-[1.35rem] text-ink">{v.title}</h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-dim">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <OrnamentBand />

      {/* Витрина блюд */}
      <section className="section container-page">
        <SectionHeading
          eyebrow="Выбор шефа"
          title="Что заказывают чаще всего"
          text="Шесть блюд, с которых стоит начать знакомство. Полное меню — больше пятидесяти позиций."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.id} delay={(i % 3) * 110}>
              <DishCard dish={dish} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/menu" className="btn btn-outline">
            Всё меню
            <Icon.Arrow className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Разделы меню — типографикой */}
      <section className="relative overflow-hidden border-y border-gold/12 bg-night-soft/60">
        <PlateRing className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 text-gold/[0.05]" />
        <div className="section container-page relative">
          <SectionHeading
            eyebrow="Меню"
            title="Разделы стола"
            align="left"
            text="От солений и пхали до пахлавы — всё, что мы ставим на стол."
          />

          <div className="mt-12 grid gap-x-12 md:grid-cols-2">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={(i % 5) * 70}>
                <Link
                  href={`/menu#${c.id}`}
                  className="group flex items-center gap-5 border-b border-white/5 py-5 transition-colors hover:border-gold/30"
                >
                  <span className="text-[0.7rem] tabular-nums text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="display-xl block text-[1.5rem] text-ink transition-colors group-hover:text-gold-light">
                      {c.name}
                    </span>
                    <span className="mt-1 block truncate text-[0.82rem] text-ink-mute">
                      {c.subtitle}
                    </span>
                  </span>
                  <Icon.Arrow className="h-4 w-4 shrink-0 text-gold/40 transition-all group-hover:translate-x-1 group-hover:text-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Залы */}
      <section className="section container-page" id="halls">
        <SectionHeading
          eyebrow="Пространство"
          title="Три зала под разный вечер"
          text="Шумный основной зал с открытым мангалом, тихая терраса и каминный кабинет для своих."
        />
        <Halls />
      </section>

      {/* Бронирование — крупный призыв */}
      <section className="relative overflow-hidden border-y border-gold/12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 50%, #1a1c22 0%, #0e0f13 60%, #0b0b0e 100%)",
          }}
        />
        <PlateRing className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold/[0.06]" />

        <div className="container-page relative flex flex-col items-center py-24 text-center md:py-32">
          <Reveal className="flex flex-col items-center">
            <Rosette className="h-10 w-10 text-gold" />
            <h2 className="display-xl mt-7 max-w-2xl text-[2.2rem] text-ink md:text-[3.2rem]">
              Стол ждёт вас сегодня вечером
            </h2>
            <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink-dim">
              Бронь занимает минуту: выберите дату, время и зал — мы перезвоним
              для подтверждения в течение пятнадцати минут.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="btn btn-gold">
                <Icon.Calendar className="h-4 w-4" />
                Забронировать стол
              </Link>
              <Link href="/contacts" className="btn btn-ghost">
                Как нас найти
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Отзывы */}
      <section className="section container-page">
        <SectionHeading eyebrow="Гости" title="Что о нас говорят" />
        <Reviews />
      </section>

      {/* Контакты */}
      <section className="section container-page pt-0">
        <SectionHeading eyebrow="Контакты" title="Приходите" />
        <ContactsBlock />
      </section>
    </>
  );
}
