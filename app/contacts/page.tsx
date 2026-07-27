import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactsBlock } from "@/components/ContactsBlock";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { PlateRing, Rosette } from "@/components/Ornament";
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
          <a
            href={restaurant.address.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative grid h-[320px] place-items-center overflow-hidden border border-gold/15 bg-night-card/40 md:h-[420px]"
          >
            <PlateRing className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-gold/[0.07] transition-transform duration-[2000ms] group-hover:rotate-45" />
            <div
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,162,90,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,90,0.5) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 bg-night/80">
                <Icon.Pin className="h-6 w-6 text-gold" />
              </span>
              <span className="display-xl mt-5 text-[1.6rem] text-ink md:text-[2rem]">
                {restaurant.address.street}
              </span>
              <span className="mt-2 text-sm text-ink-dim">{restaurant.address.city}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-wider2 text-gold transition-all group-hover:gap-3">
                Построить маршрут
                <Icon.Arrow className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        </Reveal>
      </section>

      {/* Как добраться */}
      <section className="border-y border-gold/12 bg-night-soft/50">
        <div className="section container-page">
          <SectionHeading eyebrow="Дорога" title="Три способа доехать" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {WAYS.map((w, i) => {
              const Cmp = Icon[w.icon];
              return (
                <Reveal key={w.title} delay={i * 110}>
                  <div className="flex h-full flex-col border border-gold/12 bg-night-card/40 p-8">
                    <Cmp className="h-6 w-6 text-gold" />
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
          <Rosette className="h-9 w-9 text-gold" />
          <h2 className="display-xl mt-6 text-[1.9rem] text-ink md:text-[2.5rem]">
            Занять стол
          </h2>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink-dim">
            Онлайн — за минуту, по телефону — за один звонок. Как удобнее.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/booking" className="btn btn-gold">
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
