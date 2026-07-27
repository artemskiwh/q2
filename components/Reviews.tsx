import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { Rosette } from "./Ornament";
import { restaurant, reviews } from "@/lib/restaurant";

export function Reviews() {
  return (
    <>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
      {reviews.map((r, i) => (
        <Reveal key={r.name} as="article" delay={i * 110}>
          <figure className="relative flex h-full flex-col border border-accent/12 bg-night-card/40 p-8">
            <Rosette className="absolute right-6 top-6 h-8 w-8 text-accent/12" />

            <div className="flex gap-1 text-accent">
              {Array.from({ length: r.rating }).map((_, s) => (
                <Icon.Star key={s} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>

            <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-ink-dim">
              «{r.text}»
            </blockquote>

            <figcaption className="mt-6 border-t border-accent/12 pt-5">
              <span className="block text-ink">{r.name}</span>
              <span className="mt-1 block text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
                {r.source}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <a
          href={restaurant.reviewsUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-outline"
        >
          Все отзывы на 2ГИС
          <Icon.Arrow className="h-4 w-4" />
        </a>
      </Reveal>
    </>
  );
}
