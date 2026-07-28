import { restaurant } from "@/lib/restaurant";

const { lat, lon } = restaurant.address;

/** Живая карта Google с меткой ресторана. */
const MAP_SRC = `https://www.google.com/maps?q=${lat},${lon}&hl=ru&z=17&output=embed`;

export function MapBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-white/12 ${className}`}>
      <iframe
        src={MAP_SRC}
        title={`Ресторан Pakhlava на карте: ${restaurant.address.street}, ${restaurant.address.city}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        // карта Google светлая — приводим её к тёмному виду сайта
        style={{
          colorScheme: "dark",
          filter: "invert(0.92) hue-rotate(180deg) saturate(0.7) contrast(0.9) brightness(1.05)",
        }}
        className="h-[340px] w-full border-0 bg-night-card md:h-[460px]"
      />

      {/* Адрес поверх карты */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/85 to-transparent px-5 pb-5 pt-16 md:px-7 md:pb-7">
        <p className="display-xl text-[1.15rem] text-ink md:text-[1.4rem]">
          {restaurant.address.street}
        </p>
        <p className="mt-1 text-[0.82rem] text-ink-dim">{restaurant.address.city}</p>
      </div>
    </div>
  );
}
