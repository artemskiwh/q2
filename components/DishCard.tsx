import Link from "next/link";
import { withBasePath } from "@/lib/path";
import { Icon } from "./Icons";
import { formatPrice, type Dish } from "@/lib/menu";

/**
 * Фотография блюда. Пока снимка нет — ровная плашка того же размера,
 * чтобы сетка не прыгала, когда фотографии появятся.
 */
function DishPhoto({ dish }: { dish: Dish }) {
  if (dish.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBasePath(dish.image)}
        alt={dish.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="block h-full w-full bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02]"
    />
  );
}

const CARD =
  "lift group flex h-full flex-col overflow-hidden border border-white/10 bg-night-card/40 hover:border-white/30 hover:bg-night-card/70";

/**
 * Карточка блюда: фотография сверху, ниже название, описание и цена.
 * Одна и та же вёрстка на телефоне и на широком экране — меняются только
 * кегль и отступы, чтобы в строку помещались две карточки.
 *
 * `rank` рисует номер в углу снимка (витрина на главной),
 * `href` делает карточку ссылкой на раздел меню.
 */
export function DishCard({
  dish,
  rank,
  href,
}: {
  dish: Dish;
  rank?: number;
  href?: string;
}) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <DishPhoto dish={dish} />

        {rank ? (
          <span className="absolute left-0 top-0 bg-night/70 px-2.5 py-1 text-[0.62rem] tabular-nums tracking-wider2 text-ink backdrop-blur-sm md:px-3 md:py-1.5 md:text-[0.66rem]">
            {String(rank).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-5 md:p-6">
        <h3 className="display-xl flex items-start gap-2 text-[0.82rem] leading-tight text-ink transition-colors sm:text-[1.1rem] sm:leading-snug md:text-[1.3rem]">
          <span className="min-w-0 flex-1">{dish.name}</span>
          {href ? (
            <Icon.Arrow className="mt-1 hidden h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-70 md:block" />
          ) : null}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[0.7rem] leading-snug text-ink-dim sm:mt-2 sm:line-clamp-none sm:text-[0.84rem] sm:leading-relaxed md:mt-3 md:text-[0.88rem]">
          {dish.description}
        </p>

        <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-white/10 pt-2.5 sm:pt-3 md:pt-4">
          <span className="text-[0.6rem] uppercase tracking-wider2 text-ink-mute md:text-[0.66rem]">
            {dish.weight}
          </span>
          <span className="text-[0.85rem] font-medium tabular-nums text-ink sm:text-[1rem] md:text-[1.05rem]">
            {formatPrice(dish.price)}
          </span>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={CARD}>
        {inner}
      </Link>
    );
  }

  return <article className={CARD}>{inner}</article>;
}
