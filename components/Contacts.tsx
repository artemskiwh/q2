import { RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

export function Contacts() {
  return (
    <section id="contacts" className="relative pb-0 pt-24 md:pt-32">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title">Контакты</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 max-w-3xl space-y-12 text-center">
            <div>
              <p className="serif-thin text-2xl text-white md:text-3xl">Адрес</p>
              <p className="mt-4 text-[17px] text-white/85">{RESTAURANT.address}</p>
              <p className="mt-1.5 text-[15px] text-white/60">
                {RESTAURANT.district}, {RESTAURANT.city}
              </p>
            </div>

            <div>
              <p className="serif-thin text-2xl text-white md:text-3xl">График работы</p>
              <p className="mt-4 text-[17px] text-white/85">{RESTAURANT.hoursShort}</p>
              <p className="mt-1.5 text-[15px] text-white/60">Ежедневно</p>
            </div>

            <div>
              <p className="serif-thin text-2xl text-white md:text-3xl">Номер телефона</p>
              <a
                href={RESTAURANT.phoneHref}
                className="mt-4 inline-block text-lg text-white hover:opacity-70"
              >
                {RESTAURANT.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Yandex Map - Rostov-on-Don, Sotsialisticheskaya 80 */}
      <Reveal delay={200}>
        <div className="mt-20 h-[440px] w-full grayscale">
          <iframe
            title="ICON на Яндекс.Карте"
            src="https://yandex.ru/map-widget/v1/?ll=39.723033%2C47.222082&z=17&mode=search&text=Социалистическая%2080%20Ростов-на-Дону&scheme_level=1"
            width="100%"
            height="100%"
            frameBorder={0}
            allowFullScreen
            className="block"
          />
        </div>
      </Reveal>
    </section>
  );
}
