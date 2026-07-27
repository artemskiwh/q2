import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MenuView } from "@/components/MenuView";
import { Icon } from "@/components/Icons";
import { Rosette } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Меню",
  description:
    "Меню ресторана Pakhlava: хинкали ручной лепки, шашлык на живых углях, хачапури из тандыра, харчо, чанахи и домашняя пахлава.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Кухня высоких гор"
        title="Меню"
        text="Больше пятидесяти блюд Грузии, Армении, Азербайджана и Дагестана. Мангал работает до последнего гостя."
      />

      <MenuView />

      <section className="border-t border-accent/12 bg-night-soft/50">
        <div className="container-page flex flex-col items-center py-20 text-center">
          <Reveal className="flex flex-col items-center">
            <Rosette className="h-9 w-9 text-accent" />
            <h2 className="display-xl mt-6 text-[1.9rem] text-ink md:text-[2.5rem]">
              Понравилось меню?
            </h2>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-dim">
              Займите стол заранее — вечером пятницы свободных мест почти
              не остаётся.
            </p>
            <Link href="/booking" className="btn btn-white mt-8">
              <Icon.Calendar className="h-4 w-4" />
              Забронировать стол
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
