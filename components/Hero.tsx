import { RESTAURANT } from "@/lib/icon-data";
import { StarRating } from "./StarRating";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 text-center">
      {/* Ambient glow + texture */}
      <div className="pointer-events-none absolute inset-0 grain opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* Rotating faint ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-gold/[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/[0.05]" />

      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        <span className="eyebrow mb-7">Karaoke · Restaurant</span>

        {/* Framed wordmark like the printed ICON menu */}
        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden h-px w-16 bg-gold-line md:block md:w-28" />
          <h1 className="brand-word text-[19vw] leading-none text-white sm:text-[15vw] md:text-[150px] lg:text-[190px]">
            ICON
          </h1>
          <span className="hidden h-px w-16 bg-gold-line md:block md:w-28" />
        </div>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Караоке-ресторан в сердце Ростова-на-Дону. Безупречный звук,
          авторская кухня и атмосфера, ради которой возвращаются.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-gold-light">
          <span>{RESTAURANT.city}</span>
          <span className="text-gold/40">·</span>
          <span>{RESTAURANT.address}</span>
          <span className="text-gold/40">·</span>
          <span>{RESTAURANT.hoursShort}</span>
        </div>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a href="#book" className="btn-gold px-8 py-3.5 text-[15px]">
            Забронировать стол
          </a>
          <a href="#menu" className="btn-outline px-8 py-3.5 text-[15px]">
            Смотреть меню
          </a>
        </div>

        <div className="mt-9 flex items-center gap-2.5 text-sm">
          <StarRating value={5} size={18} />
          <span className="font-semibold text-white">{RESTAURANT.rating}</span>
          <span className="text-muted">· {RESTAURANT.ratingCount} оценок в 2ГИС</span>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Листать вниз"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-gold/60 transition hover:text-gold md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Листайте</span>
        <span className="h-9 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  );
}
