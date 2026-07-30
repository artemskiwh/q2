import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Halls } from "@/components/Halls";
import { Gallery, galleryHasPhotos } from "@/components/Gallery";
import { Icon } from "@/components/Icons";
import { Rosette } from "@/components/Ornament";
import { values } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "О ресторане",
  description:
    "История Pakhlava: кавказское застолье, живые угли, тандыр и пахлава по семейному рецепту. Основной зал, терраса и каминный кабинет.",
};

const CRAFT = [
  {
    time: "06:00",
    title: "Заводим тесто",
    text: "Тандыр разогревается два часа. К открытию на полке — лаваш, чуду и самса первой выпечки.",
  },
  {
    time: "09:00",
    title: "Разбираем мясо",
    text: "Баранину привозят утром целыми отрубами. Корейку режем на кости, из обрези рубим фарш на люля.",
  },
  {
    time: "11:00",
    title: "Мелем специи",
    text: "Уцхо-сунели, кориандр, сумах и зира — в ручной мельнице, ровно на сегодняшний сервис.",
  },
  {
    time: "12:00",
    title: "Разжигаем угли",
    text: "Виноградная лоза и дуб. Мангал не гаснет до последнего гостя — иногда до двух ночи.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О нас"
        title="Кухня высоких гор"
        text="Мы собрали рецепты Грузии, Армении, Азербайджана и Дагестана — и готовим их так, как готовят дома, без сокращений."
      />

      {/* История */}
      <section className="section container-page">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="eyebrow">История</span>
            <h2 className="display-xl mt-5 text-[1.7rem] text-ink md:text-[2.2rem]">
              Началось с пахлавы
            </h2>
            <div className="mt-7 space-y-5 text-[0.98rem] leading-relaxed text-ink-dim">
              <p>
                Бабушка нашего шефа пекла пахлаву на весь двор: сорок слоёв теста,
                грецкий орех, мёд с горной пасеки. За ней приходили соседи, а потом
                и весь квартал — так десерт стал именем ресторана.
              </p>
              <p>
                Мы открылись, чтобы это застолье продолжилось в городе. Здесь тот же
                медленный ритм: мясо маринуется сутки, чанахи томится два часа,
                хинкали лепят вручную, а харчо варят на кости с утра.
              </p>
              <p>
                Ничего не разогреваем дважды и не держим полуфабрикатов. Если блюдо
                закончилось — значит, закончилось: завтра приготовим свежее.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative grid aspect-square place-items-center overflow-hidden border border-accent/15 bg-night-card/40">
              <div className="relative z-10 flex flex-col items-center px-10 text-center">
                <Rosette className="h-9 w-9 text-accent" />
                <p className="display-xl mt-6 text-[1.5rem] leading-snug text-ink md:text-[1.85rem]">
                  «Стол должен быть щедрым,
                  <br />а вечер — долгим»
                </p>
                <span className="mt-6 text-[0.66rem] uppercase tracking-wider3 text-accent/80">
                  кавказская поговорка
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* День на кухне */}
      <section className="section container-page">
        <SectionHeading
          eyebrow="Как мы работаем"
          title="Один день на кухне"
          text="Ресторан начинается задолго до того, как в зале зажигают свет."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-accent/10 bg-accent/10 md:grid-cols-4">
          {CRAFT.map((c, i) => (
            <Reveal key={c.time} delay={i * 100}>
              <div className="group h-full bg-night p-8 transition-colors duration-500 hover:bg-night-card">
                <span className="display-xl block text-[1.9rem] leading-none text-accent/40 transition-colors group-hover:text-accent">
                  {c.time}
                </span>
                <h3 className="display-xl mt-5 text-[1.35rem] text-ink">{c.title}</h3>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-ink-dim">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Принципы */}
      <section className="border-y border-accent/10 bg-night-soft/50">
        <div className="section container-page">
          <SectionHeading eyebrow="Принципы" title="Четыре вещи, на которых держится кухня" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 110}>
                <div className="flex h-full gap-5 border border-accent/10 bg-night-card/40 p-7">
                  <Rosette className="h-7 w-7 shrink-0 text-accent" />
                  <div>
                    <h3 className="display-xl text-[1.4rem] text-ink">{v.title}</h3>
                    <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-dim">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Залы */}
      <section className="section container-page" id="halls">
        <SectionHeading
          eyebrow="Залы"
          title="Где накрыть стол"
          text="От шумного зала с открытым мангалом до отдельного кабинета с камином."
        />
        <Halls />
      </section>

      {/* Галерея — показываем только когда есть фотографии */}
      {galleryHasPhotos ? (
        <section className="section container-page pt-0">
          <SectionHeading eyebrow="Атмосфера" title="Как у нас" />
          <Gallery />
        </section>
      ) : null}

      {/* Призыв */}
      <section className="border-t border-accent/10 bg-night-soft/40">
        <div className="container-page flex flex-col items-center py-20 text-center">
          <Reveal className="flex flex-col items-center">
            <Rosette className="h-9 w-9 text-accent" />
            <h2 className="display-xl mt-6 text-[1.6rem] text-ink md:text-[2rem]">
              Приходите на ужин
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="btn btn-white">
                <Icon.Calendar className="h-4 w-4" />
                Забронировать стол
              </Link>
              <Link href="/menu" className="btn btn-ghost">
                Посмотреть меню
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
