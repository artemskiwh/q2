import { REVIEWS, RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export function Reviews() {
  return (
    <section id="reviews" className="relative py-24 md:py-32">
      <div className="container-page">
        <Reveal>
          <h2 className="section-title">Отзывы</h2>
          <p className="section-sub mx-auto mt-4 max-w-md">
            Живые впечатления гостей ICON
            <br />из карточки 2ГИС
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-14 flex max-w-2xl items-center justify-center gap-8">
            <div className="text-center">
              <div className="serif text-6xl text-white md:text-7xl">{RESTAURANT.rating}</div>
              <Stars className="mt-2 justify-center" />
            </div>
            <div className="h-16 w-px bg-white/25" />
            <div className="text-sm text-white/70">
              <p className="text-white">{RESTAURANT.ratingCount} оценок</p>
              <p className="mt-1">{RESTAURANT.reviewsCount} отзыва</p>
              <a
                href={RESTAURANT.gis}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-white underline underline-offset-4 hover:text-white/70"
              >
                Смотреть в 2ГИС →
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-6xl columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {REVIEWS.slice(0, 8).map((r, i) => (
            <Reveal key={r.name + i} delay={(i % 4) * 60} as="article">
              <div className="border border-white/15 bg-white/[0.02] p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/50 text-sm font-medium text-white">
                    {initials(r.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{r.name}</p>
                    <p className="text-xs text-white/50">{r.date}</p>
                  </div>
                </div>
                <Stars className="mt-4" />
                <p className="mt-3 text-sm leading-relaxed text-white/80">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex gap-[3px] text-white ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M12 2l2.9 6.9 7.5.6-5.7 4.9 1.8 7.4L12 17.9 5.5 21.8l1.8-7.4L1.6 9.5l7.5-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}
