import { withBasePath } from "@/lib/path";
import { formatPrice, type Dish } from "@/lib/menu";

/**
 * Фотография блюда. Пока снимка нет — ровная тёмная плашка того же размера,
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
      className="block h-full w-full bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-white/[0.02] transition-colors duration-500 group-hover:from-white/[0.14]"
    />
  );
}

/**
 * Карточка блюда. На телефоне — строка с квадратным снимком слева,
 * на широком экране — карточка с фотографией сверху.
 */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="lift group flex overflow-hidden border border-white/10 bg-night-card/40 hover:border-white/30 hover:bg-night-card/70 md:flex-col">
      <div className="relative aspect-square w-[116px] shrink-0 overflow-hidden sm:w-[140px] md:aspect-[4/3] md:w-full">
        <DishPhoto dish={dish} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 md:p-6">
        <h3 className="display-xl text-[1.05rem] leading-snug text-ink transition-colors md:text-[1.3rem]">
          {dish.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-[0.82rem] leading-relaxed text-ink-dim md:line-clamp-none md:mt-3 md:text-[0.88rem]">
          {dish.description}
        </p>

        <div className="mt-auto flex items-baseline justify-between gap-3 pt-4 md:mt-6 md:border-t md:border-white/10 md:pt-4">
          <span className="text-[0.66rem] uppercase tracking-wider2 text-ink-mute">
            {dish.weight}
          </span>
          <span className="text-[1rem] font-medium tabular-nums text-ink md:text-[1.05rem]">
            {formatPrice(dish.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
