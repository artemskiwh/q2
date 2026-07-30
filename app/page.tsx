import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { DishCard } from "@/components/DishCard";
import { Reviews } from "@/components/Reviews";
import { Icon } from "@/components/Icons";
import { signatureDishes } from "@/lib/menu";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Витрина блюд */}
      <section className="section container-page">
        <SectionHeading
          eyebrow="Выбор шефа"
          title="Что заказывают чаще всего"
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-14 lg:grid-cols-3">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.id} className="h-full" delay={(i % 2) * 120} variant="zoom">
              <DishCard dish={dish} rank={i + 1} href={`/menu#${dish.category}`} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 md:mt-12">
          <Link
            href="/menu"
            className="group flex items-center justify-between gap-4 border border-white/15 px-5 py-5 transition-colors hover:border-white/45 hover:bg-white/[0.03] md:px-8 md:py-6"
          >
            <span>
              <span className="block text-[0.66rem] uppercase tracking-wider2 text-ink-mute">
                Все разделы
              </span>
              <span className="display-xl mt-1 block text-[1.1rem] text-ink md:text-[1.4rem]">
                Смотреть всё меню
              </span>
            </span>
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/25 text-ink transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-night md:h-14 md:w-14">
              <Icon.Arrow className="h-4 w-4 md:h-5 md:w-5" />
            </span>
          </Link>
        </Reveal>
      </section>

      {/* Отзывы */}
      <section className="section container-page border-t border-white/10">
        <SectionHeading eyebrow="Гости" title="Отзывы на 2ГИС" />
        <Reviews />
      </section>
    </>
  );
}
