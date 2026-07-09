import { REVIEWS, RESTAURANT } from "@/lib/icon-data";
import { StarRating } from "./StarRating";
import { Reveal } from "./Reveal";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          {/* Rating summary */}
          <Reveal className="lg:sticky lg:top-28">
            <span className="eyebrow only-after mb-6">Отзывы</span>
            <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
              Нас любят <span className="text-gold-gradient">гости</span>
            </h2>

            <div className="mt-8 gold-frame flex items-center gap-6 bg-ink-card/50 px-7 py-7">
              <div className="text-center">
                <div className="font-display text-6xl text-gold-gradient">
                  {RESTAURANT.rating}
                </div>
                <StarRating value={5} size={16} className="mt-2 justify-center" />
              </div>
              <div className="h-16 w-px bg-gold/20" />
              <div className="text-sm text-muted">
                <p className="text-white">{RESTAURANT.ratingCount} оценок</p>
                <p className="mt-1">{RESTAURANT.reviewsCount} отзыва в 2ГИС</p>
                <a
                  href={RESTAURANT.gis}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-gold hover:text-gold-light"
                >
                  Смотреть в 2ГИС →
                </a>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Отзывы реальных гостей ICON из карточки 2ГИС. Мы благодарны каждому,
              кто делится впечатлениями и возвращается снова.
            </p>
          </Reveal>

          {/* Reviews masonry */}
          <div className="columns-1 gap-5 sm:columns-2 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name + i} delay={(i % 4) * 60} as="article">
                <div className="rounded-2xl border border-gold/12 bg-ink-card/50 p-6 transition-colors hover:border-gold/30">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-sm font-bold text-ink">
                      {initials(r.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{r.name}</p>
                      <p className="text-xs text-mute2">{r.date}</p>
                    </div>
                  </div>
                  <StarRating value={r.rating} size={14} className="mt-4" />
                  <p className="mt-3 text-sm leading-relaxed text-white/85">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
