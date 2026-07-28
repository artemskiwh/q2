import Link from "next/link";
import { withBasePath } from "@/lib/path";
import { restaurant } from "@/lib/restaurant";

/** Первый экран: фотография на весь экран, две кнопки и адрес внизу. */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-8 pt-[150px] md:pb-12 md:pt-[190px]">
      {/* Фон */}
      {restaurant.heroImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(restaurant.heroImage)}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <span className="absolute inset-0 -z-10 bg-night/65" />
        </>
      ) : (
        <>
          <span
            className="absolute inset-0 -z-20"
            style={{
              background:
                "radial-gradient(75% 55% at 50% 42%, #1d1d1d 0%, #121212 55%, #0a0a0a 100%)",
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 -z-10 h-[110vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 animate-drift"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.055) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {/* Тонкая рамка по краю экрана */}
      <span className="pointer-events-none absolute inset-4 -z-10 hidden border border-white/[0.07] md:block" />

      <h1 className="sr-only">Pakhlava — ресторан кавказской кухни в Казани</h1>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          className="flex w-full max-w-[340px] animate-reveal-up flex-col items-center gap-4 md:w-auto md:max-w-none md:flex-row md:gap-5"
          style={{ animationDelay: "120ms" }}
        >
          <Link
            href="/menu"
            className="btn btn-outline btn-static btn-hero w-full md:w-[260px]"
          >
            Открыть меню
          </Link>
          <Link
            href="/booking"
            className="btn btn-white btn-static btn-hero w-full md:w-[260px]"
          >
            Забронировать стол
          </Link>
        </div>
      </div>

      {/* Адрес внизу экрана */}
      <div
        className="flex animate-reveal-up flex-col items-center"
        style={{ animationDelay: "260ms" }}
      >
        <a
          href={restaurant.address.mapUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.8rem] text-ink/85 transition-colors hover:text-ink md:text-[0.88rem]"
        >
          <span>{restaurant.address.street}</span>
          <span className="h-3 w-px bg-white/30" />
          <span>{restaurant.address.city}</span>
          <span className="hidden h-3 w-px bg-white/30 sm:block" />
          <span className="hidden sm:inline">ежедневно 10:00 — 23:00</span>
        </a>
      </div>
    </section>
  );
}
