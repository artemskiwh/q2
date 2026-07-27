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
import { Rosette } from "@/components/Ornament";
import { categories, signatureDishes } from "@/lib/menu";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Быстрая бронь — сразу под первым экраном */}
      <section className="container-page py-14 md:py-20">
        <QuickBooking />
      </section>

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
      <section className="relative overflow-hidden border-y border-accent/12 bg-night-soft/60">
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
                  className="group flex items-center gap-5 border-b border-white/5 py-5 transition-colors hover:border-accent/30"
                >
                  <span className="text-[0.7rem] tabular-nums text-accent/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="display-xl block text-[1.5rem] text-ink transition-colors group-hover:text-accent-light">
                      {c.name}
                    </span>
                    <span className="mt-1 block truncate text-[0.82rem] text-ink-mute">
                      {c.subtitle}
                    </span>
                  </span>
                  <Icon.Arrow className="h-4 w-4 shrink-0 text-accent/40 transition-all group-hover:translate-x-1 group-hover:text-accent" />
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
      <section className="relative overflow-hidden border-y border-accent/12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 50% 50%, #1a1c22 0%, #0e0f13 60%, #0b0b0e 100%)",
          }}
        />

        <div className="container-page relative flex flex-col items-center py-24 text-center md:py-32">
          <Reveal className="flex flex-col items-center">
            <Rosette className="h-10 w-10 text-accent" />
            <h2 className="display-xl mt-7 max-w-2xl text-[2.2rem] text-ink md:text-[3.2rem]">
              Стол ждёт вас сегодня вечером
            </h2>
            <p className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-ink-dim">
              Бронь занимает минуту: выберите дату, время и зал — мы перезвоним
              для подтверждения в течение пятнадцати минут.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="btn btn-white">
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
