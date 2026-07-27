import Link from "next/link";
import { Hero } from "@/components/Hero";
import { QuickBooking } from "@/components/QuickBooking";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DishCard } from "@/components/DishCard";
import { Reviews } from "@/components/Reviews";
import { ContactsBlock } from "@/components/ContactsBlock";
import { Icon } from "@/components/Icons";
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
      <section className="relative overflow-hidden border-y border-white/10 bg-night-soft/60">
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
                  <span className="text-[0.7rem] tabular-nums text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="display-xl block text-[1.5rem] text-ink transition-colors group-hover:text-ink-light">
                      {c.name}
                    </span>
                    <span className="mt-1 block truncate text-[0.82rem] text-ink-mute">
                      {c.subtitle}
                    </span>
                  </span>
                  <Icon.Arrow className="h-4 w-4 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-ink" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="section container-page">
        <SectionHeading eyebrow="Гости" title="Отзывы на 2ГИС" />
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
