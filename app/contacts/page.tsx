import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { MapBlock } from "@/components/MapBlock";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactsBlock } from "@/components/ContactsBlock";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { Rosette } from "@/components/Ornament";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Ресторан Pakhlava: ${restaurant.address.street}, ${restaurant.address.city}. Часы работы, телефон и как нас найти.`,
};

const WAYS = [
  {
    icon: "Pin" as const,
    title: "Пешком",
    text: `${restaurant.address.street} — ищите тёмный фасад с золотой вывеской. Маршрут удобно построить по кнопке на карте выше.`,
  },
  {
    icon: "Arrow" as const,
    title: "На машине",
    text: "Парковка рядом с рестораном. В пятницу и субботу вечером место лучше занять пораньше.",
  },
  {
    icon: "Users" as const,
    title: "Большой компанией",
    text: "Банкеты от 12 гостей согласуем заранее: своё меню, отдельный зал и звук. Позвоните — обсудим.",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Как нас найти"
        text={`${restaurant.address.street}, ${restaurant.address.city}. Работаем ежедневно с 12:00.`}
      />

      <section className="section container-page pt-14 md:pt-20">
        <ContactsBlock />
      </section>

      {/* Карта */}
      <section className="container-page pb-14 md:pb-20">
        <Reveal>
          <MapBlock />
        </Reveal>
      </section>

      {/* Как добраться */}
      <section className="border-y border-accent/12 bg-night-soft/50">
        <div className="section container-page">
          <SectionHeading eyebrow="Дорога" title="Три способа доехать" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WAYS.map((w, i) => {
              const Cmp = Icon[w.icon];
              return (
                <Reveal key={w.title} delay={i * 110}>
                  <div className="flex h-full flex-col border border-accent/12 bg-night-card/40 p-8">
                    <Cmp className="h-6 w-6 text-accent" />
                    <h3 className="display-xl mt-5 text-[1.4rem] text-ink">{w.title}</h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-dim">{w.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Призыв */}
      <section className="container-page flex flex-col items-center py-20 text-center">
        <Reveal className="flex flex-col items-center">
          <Rosette className="h-9 w-9 text-accent" />
          <h2 className="display-xl mt-6 text-[1.9rem] text-ink md:text-[2.5rem]">
            Занять стол
          </h2>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-dim">
            Онлайн — за минуту, по телефону — за один звонок. Как удобнее.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/booking" className="btn btn-white">
              <Icon.Calendar className="h-4 w-4" />
              Забронировать онлайн
            </Link>
            <a href={`tel:${restaurant.phoneHref}`} className="btn btn-ghost">
              <Icon.Phone className="h-4 w-4" />
              {restaurant.phoneLabel}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
