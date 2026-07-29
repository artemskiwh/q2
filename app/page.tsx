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

      {/* Отзывы */}
      <section className="section container-page border-t border-white/10">
        <SectionHeading eyebrow="Гости" title="Отзывы на 2ГИС" />
        <Reviews />
      </section>
    </>
  );
}
