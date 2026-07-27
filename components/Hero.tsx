import Link from "next/link";
import { LogoMedallion } from "./Logo";
import { PlateRing, OrnamentDivider } from "./Ornament";
import { Icon } from "./Icons";
import { restaurant } from "@/lib/restaurant";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-32 md:pt-36">
      {/* Каменный фон и золотое свечение */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 34%, #1c1e25 0%, #101116 45%, #0b0b0e 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(38% 30% at 50% 38%, rgba(201,162,90,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Огромное орнаментальное кольцо, медленно вращается */}
      <PlateRing className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(150vw,1100px)] w-[min(150vw,1100px)] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold/[0.07]" />
      <PlateRing className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(96vw,720px)] w-[min(96vw,720px)] -translate-x-1/2 -translate-y-1/2 text-gold/[0.05]" />

      <p className="eyebrow animate-fade-in text-center">
        {restaurant.address.city} · {restaurant.address.street}
      </p>

      <LogoMedallion className="mt-8 w-[min(78vw,340px)] animate-fade-in md:mt-10 md:w-[440px]" />

      <h1 className="sr-only">
        Pakhlava — ресторан кавказской кухни в Москве
      </h1>

      <OrnamentDivider className="mt-10 max-w-[380px]" />

      <p className="mt-7 max-w-xl text-center text-[0.98rem] leading-relaxed text-ink-dim md:text-[1.05rem]">
        Мангал на живых углях виноградной лозы, тандыр с шести утра
        и пахлава по рецепту, который в семье не меняли сто лет.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/booking" className="btn btn-gold">
          <Icon.Calendar className="h-4 w-4" />
          Забронировать стол
        </Link>
        <Link href="/menu" className="btn btn-outline">
          Смотреть меню
        </Link>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
        <span className="flex items-center gap-2">
          <Icon.Clock className="h-3.5 w-3.5 text-gold/70" />
          ежедневно с 12:00
        </span>
        <span className="hidden h-3 w-px bg-gold/20 sm:block" />
        <a
          href={restaurant.address.mapUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-2 transition-colors hover:text-gold"
        >
          <Icon.Pin className="h-3.5 w-3.5 text-gold/70" />
          смотреть на карте
        </a>
        <span className="hidden h-3 w-px bg-gold/20 sm:block" />
        <a
          href={`tel:${restaurant.phoneHref}`}
          className="flex items-center gap-2 transition-colors hover:text-gold"
        >
          <Icon.Phone className="h-3.5 w-3.5 text-gold/70" />
          {restaurant.phoneLabel}
        </a>
      </div>
    </section>
  );
}
