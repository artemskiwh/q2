import { Icon } from "./Icons";
import { restaurant } from "@/lib/restaurant";

const { lat, lon } = restaurant.address;

/** Живая карта Яндекса с меткой ресторана, в тёмном оформлении. */
const MAP_SRC =
  `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&z=17` +
  `&pt=${lon}%2C${lat}%2Cpm2rdm&l=map&theme=dark`;

export function MapBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-white/12 ${className}`}>
      <iframe
        src={MAP_SRC}
        // если карта не загрузится, служебная страница внутри тоже будет тёмной
        style={{ colorScheme: "dark" }}
        title={`Ресторан Pakhlava на карте: ${restaurant.address.street}, ${restaurant.address.city}`}
        loading="lazy"
        allowFullScreen
        className="h-[340px] w-full border-0 bg-night-card md:h-[460px]"
      />

      {/* Карточка с адресом поверх карты */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-night via-night/85 to-transparent px-5 pb-5 pt-16 md:px-7 md:pb-7">
        <div className="pointer-events-auto">
          <p className="display-xl text-[1.15rem] text-ink md:text-[1.4rem]">
            {restaurant.address.street}
          </p>
          <p className="mt-1 text-[0.82rem] text-ink-dim">{restaurant.address.city}</p>
        </div>

        <a
          href={restaurant.routeUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-white pointer-events-auto px-5 py-3"
        >
          <Icon.Pin className="h-4 w-4" />
          Построить маршрут
        </a>
      </div>
    </div>
  );
}
