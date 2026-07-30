import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { restaurant } from "@/lib/restaurant";

export function ContactsBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Reveal>
        <div className="lift flex h-full flex-col border border-white/10 bg-night-card/40 p-8">
          <Icon.Pin className="h-6 w-6 text-accent" />
          <h3 className="eyebrow mt-5">Адрес</h3>
          <p className="mt-3 text-lg text-ink">{restaurant.address.street}</p>
          <p className="text-ink-dim">{restaurant.address.city}</p>
          <a
            href={restaurant.address.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.7rem] uppercase tracking-wider2 text-accent transition-all hover:gap-3"
          >
            Открыть на карте
            <Icon.Arrow className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>

      <Reveal delay={110}>
        <div className="lift flex h-full flex-col border border-white/10 bg-night-card/40 p-8">
          <Icon.Clock className="h-6 w-6 text-accent" />
          <h3 className="eyebrow mt-5">Часы работы</h3>
          <ul className="mt-3 space-y-2.5">
            {restaurant.hours.map((h) => (
              <li key={h.days} className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-ink-dim">{h.days}</span>
                <span className="text-sm text-ink">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-6 text-xs leading-relaxed text-ink-mute">
            Кухня принимает последний заказ за 45 минут до закрытия.
          </p>
        </div>
      </Reveal>

      <Reveal delay={220}>
        <div className="lift flex h-full flex-col border border-white/10 bg-night-card/40 p-8">
          <Icon.Phone className="h-6 w-6 text-accent" />
          <h3 className="eyebrow mt-5">Связь</h3>
          <a
            href={`tel:${restaurant.phoneHref}`}
            className="mt-3 text-lg text-ink transition-colors hover:text-accent"
          >
            {restaurant.phoneLabel}
          </a>
          <a
            href={`mailto:${restaurant.email}`}
            className="mt-1 text-sm text-ink-dim transition-colors hover:text-accent"
          >
            {restaurant.email}
          </a>
          <a
            href={restaurant.reviewsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-accent transition-all hover:gap-3"
          >
            Отзывы на 2ГИС
            <Icon.Arrow className="h-3.5 w-3.5" />
          </a>
          <div className="mt-auto flex gap-3 pt-6">
            {restaurant.socials.map((s) => {
              const Cmp = Icon[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center border border-accent/20 text-ink/80 transition-all hover:border-accent/60 hover:text-accent"
                >
                  <Cmp className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
