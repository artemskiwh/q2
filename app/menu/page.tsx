import type { Metadata } from "next";
import Link from "next/link";
import { MenuView } from "@/components/MenuView";
import { Icon } from "@/components/Icons";
import { Rosette } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Меню",
  description:
    "Меню ресторана Pakhlava: хинкали ручной лепки, шашлык на живых углях, хачапури из тандыра, харчо, чанахи и домашняя пахлава.",
};

export default function MenuPage() {
  return (
    <>
      <MenuView />

      <section className="border-t border-white/10 bg-night-soft/50">
        <div className="container-page py-14 md:py-20">
          <Reveal className="flex flex-col gap-8 border border-white/10 bg-night-card/30 p-7 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="flex items-start gap-5">
              <Rosette className="mt-1 hidden h-9 w-9 shrink-0 text-ink/70 sm:block" />
              <div>
                <h2 className="display-xl text-[1.4rem] text-ink md:text-[1.8rem]">
                  Понравилось меню?
                </h2>
                <p className="mt-2 max-w-md text-[0.9rem] leading-relaxed text-ink-dim">
                  Займите стол заранее — вечером пятницы свободных мест почти
                  не остаётся.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link href="/booking" className="btn btn-white">
                <Icon.Calendar className="h-4 w-4" />
                Забронировать стол
              </Link>
              <a href={`tel:${restaurant.phoneHref}`} className="btn btn-outline">
                <Icon.Phone className="h-4 w-4" />
                {restaurant.phoneLabel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
