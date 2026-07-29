import { withBasePath } from "@/lib/path";
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

/**
 * Карточка блюда: фотография сверху, ниже название, описание и цена.
 * Одинаковая на телефоне и на широком экране — меняются только
 * кегль и отступы, чтобы в строку помещались две карточки.
 */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="lift group flex h-full flex-col overflow-hidden border border-white/10 bg-night-card/40 hover:border-white/30 hover:bg-night-card/70">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <DishPhoto dish={dish} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-5 md:p-6">
        <h3 className="display-xl text-[0.92rem] leading-snug text-ink transition-colors sm:text-[1.1rem] md:text-[1.3rem]">
          {dish.name}
        </h3>

        <p className="mt-2 line-clamp-3 text-[0.76rem] leading-relaxed text-ink-dim sm:line-clamp-none sm:text-[0.84rem] md:mt-3 md:text-[0.88rem]">
          {dish.description}
        </p>

        <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-white/10 pt-3 md:pt-4">
          <span className="text-[0.62rem] uppercase tracking-wider2 text-ink-mute md:text-[0.66rem]">
            {dish.weight}
          </span>
          <span className="text-[0.92rem] font-medium tabular-nums text-ink sm:text-[1rem] md:text-[1.05rem]">
            {formatPrice(dish.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
