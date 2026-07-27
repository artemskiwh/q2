import Link from "next/link";
import { withBasePath } from "@/lib/path";
import { restaurant } from "@/lib/restaurant";

/**
 * Первый экран: фон на всю высоту, две кнопки по центру и адрес внизу.
 * Логотип и город стоят в шапке — как на вывеске.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-[150px] md:pb-14">
      {/* Фон: фотография, если она задана, иначе — глубокий чёрный */}
      {restaurant.heroImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(restaurant.heroImage)}
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <span className="absolute inset-0 -z-10 bg-night/55" />
        </>
      ) : (
        <span
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, #1a1a1a 0%, #101010 55%, #0a0a0a 100%)",
          }}
        />
      )}

      {/* Кнопки по центру экрана */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-[340px] animate-fade-in flex-col items-center gap-4 md:w-auto md:max-w-none md:flex-row md:gap-5">
          <Link href="/menu" className="btn btn-outline w-full md:w-[260px]">
            Открыть меню
          </Link>
          <Link href="/booking" className="btn btn-white w-full md:w-[260px]">
            Забронировать
          </Link>
        </div>
      </div>

      <h1 className="sr-only">Pakhlava — ресторан кавказской кухни в Казани</h1>

      {/* Адрес внизу экрана */}
      <a
        href={restaurant.address.mapUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.82rem] text-ink/80 transition-colors hover:text-ink md:text-[0.9rem]"
      >
        <span>{restaurant.address.street}</span>
        <span className="h-3 w-px bg-white/30" />
        <span>{restaurant.address.city}</span>
      </a>
    </section>
  );
}
