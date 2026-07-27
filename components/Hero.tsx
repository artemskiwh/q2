import Link from "next/link";
import { withBasePath } from "@/lib/path";
import { restaurant } from "@/lib/restaurant";

/** Первый экран: заголовок, две кнопки, адрес и подсказка прокрутки. */
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
          <span className="absolute inset-0 -z-10 bg-night/60" />
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
          {/* Медленно дрейфующее световое пятно — экран «дышит» */}
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

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="eyebrow animate-reveal-up" style={{ animationDelay: "60ms" }}>
          Ресторан кавказской кухни
        </p>

        <h1
          className="display-xl mt-6 max-w-[16ch] animate-reveal-up text-[2.6rem] text-ink sm:text-[3.4rem] md:mt-8 md:text-[4.6rem]"
          style={{ animationDelay: "160ms" }}
        >
          Кавказская кухня
        </h1>

        <p
          className="mt-6 max-w-[46ch] animate-reveal-up text-[0.95rem] leading-relaxed text-ink-dim md:mt-7 md:text-[1.05rem]"
          style={{ animationDelay: "280ms" }}
        >
          Мангал на живых углях, тандыр с раннего утра и пахлава по рецепту,
          который в семье не меняли сто лет.
        </p>

        <div
          className="mt-10 flex w-full max-w-[340px] animate-reveal-up flex-col items-center gap-4 md:mt-12 md:w-auto md:max-w-none md:flex-row md:gap-5"
          style={{ animationDelay: "400ms" }}
        >
          <Link href="/menu" className="btn btn-outline w-full md:w-[240px]">
            Открыть меню
          </Link>
          <Link href="/booking" className="btn btn-white w-full md:w-[240px]">
            Забронировать
          </Link>
        </div>
      </div>

      {/* Низ экрана: подсказка прокрутки и адрес */}
      <div
        className="flex animate-reveal-up flex-col items-center gap-5"
        style={{ animationDelay: "560ms" }}
      >
        <span className="h-10 w-px animate-scroll-hint bg-white/50" aria-hidden="true" />

        <a
          href={restaurant.address.mapUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[0.8rem] text-ink/75 transition-colors hover:text-ink md:text-[0.88rem]"
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
