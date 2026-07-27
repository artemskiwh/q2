import { Icon } from "./Icons";
import { withBasePath } from "@/lib/path";
import { formatPrice, TAG_LABELS, type Dish, type DishTag } from "@/lib/menu";

export function DishTags({ tags, max = 2 }: { tags?: DishTag[]; max?: number }) {
  if (!tags?.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {tags.slice(0, max).map((t) => (
        <span key={t} className="tag tag-white">
          {t === "spicy" ? <Icon.Flame className="h-3 w-3" /> : null}
          {t === "veg" ? <Icon.Leaf className="h-3 w-3" /> : null}
          {TAG_LABELS[t]}
        </span>
      ))}
    </span>
  );
}

/**
 * Карточка блюда для витрины на главной.
 * Есть фотография — карточка с фото, нет — аккуратная текстовая карточка.
 */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-white/12 bg-night-card/50 transition-colors duration-500 hover:border-white/35">
      {dish.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(dish.image)}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {dish.tags?.length ? (
            <span className="absolute left-4 top-4">
              <DishTags tags={dish.tags} max={1} />
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        {!dish.image && dish.tags?.length ? (
          <span className="mb-4">
            <DishTags tags={dish.tags} max={1} />
          </span>
        ) : null}
        <h3 className="display-xl text-[1.35rem] text-ink">{dish.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">{dish.description}</p>
        <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
          <span className="text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
            {dish.weight}
          </span>
          <span className="text-[1.05rem] font-medium tabular-nums text-ink">
            {formatPrice(dish.price)}
          </span>
        </div>
      </div>
    </article>
  );
}

/**
 * Строка меню: слева — фотография блюда, если она есть,
 * дальше название, отточие и цена.
 */
export function DishRow({ dish }: { dish: Dish }) {
  return (
    <article className="group flex gap-4 border-b border-white/8 py-6 last:border-b-0 md:gap-6">
      {dish.image ? (
        <div className="h-20 w-20 shrink-0 overflow-hidden md:h-28 md:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBasePath(dish.image)}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-end">
          <h3 className="display-xl text-[1.15rem] leading-tight text-ink md:text-[1.35rem]">
            {dish.name}
          </h3>
          <span className="dotted-leader" />
          <span className="shrink-0 text-[1rem] font-medium tabular-nums text-ink md:text-[1.08rem]">
            {formatPrice(dish.price)}
          </span>
        </div>

        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-ink-dim">
          {dish.description}
        </p>

        {dish.weight ? (
          <span className="mt-3 block text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
            {dish.weight}
          </span>
        ) : null}
      </div>
    </article>
  );
}
