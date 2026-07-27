import { PlatePlaceholder, FramedCorners } from "./Ornament";
import { Icon } from "./Icons";
import { withBasePath } from "@/lib/path";
import { formatPrice, TAG_LABELS, type Dish, type DishTag } from "@/lib/menu";

const TAG_CLASS: Record<DishTag, string> = {
  hit: "tag-gold",
  chef: "tag-gold",
  spicy: "tag-pom",
  veg: "tag-turq",
  new: "tag-mute",
};

export function DishTags({ tags, max = 2 }: { tags?: DishTag[]; max?: number }) {
  if (!tags?.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {tags.slice(0, max).map((t) => (
        <span key={t} className={`tag ${TAG_CLASS[t]}`}>
          {t === "spicy" ? <Icon.Flame className="h-3 w-3" /> : null}
          {t === "veg" ? <Icon.Leaf className="h-3 w-3" /> : null}
          {t === "chef" ? <Icon.Sparkle className="h-3 w-3" /> : null}
          {TAG_LABELS[t]}
        </span>
      ))}
    </span>
  );
}

/** Визуал блюда: фотография, если она есть, иначе — орнаментальная «тарелка». */
export function DishVisual({ dish, className = "" }: { dish: Dish; className?: string }) {
  if (dish.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={withBasePath(dish.image)}
        alt={dish.name}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${className}`}
      />
    );
  }

  return <PlatePlaceholder className={className} />;
}

/** Карточка блюда — для витрины на главной. */
export function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-gold/12 bg-night-card/60 transition-all duration-500 hover:border-gold/35 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <DishVisual dish={dish} />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-card/90 via-transparent to-transparent" />
        {dish.tags?.length ? (
          <span className="absolute left-4 top-4">
            <DishTags tags={dish.tags} max={1} />
          </span>
        ) : null}
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <FramedCorners className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <h3 className="display-xl text-[1.45rem] text-ink">{dish.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">{dish.description}</p>
        <div className="mt-5 flex items-baseline justify-between border-t border-gold/12 pt-4">
          <span className="text-[0.7rem] uppercase tracking-wider2 text-ink-mute">
            {dish.weight}
          </span>
          <span className="text-[1.05rem] font-medium tabular-nums text-gold-light">
            {formatPrice(dish.price)}
          </span>
        </div>
      </div>
    </article>
  );
}

/** Строка меню в классической ресторанной вёрстке — с отточием до цены. */
export function DishRow({ dish }: { dish: Dish }) {
  return (
    <article className="group flex gap-5 border-b border-white/5 py-6 last:border-b-0">
      {dish.image ? (
        <div className="hidden h-[86px] w-[86px] shrink-0 overflow-hidden sm:block">
          <DishVisual dish={dish} />
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="flex items-end">
          <h3 className="display-xl text-[1.3rem] leading-tight text-ink transition-colors group-hover:text-gold-light md:text-[1.45rem]">
            {dish.name}
          </h3>
          <span className="dotted-leader" />
          <span className="shrink-0 text-[1.02rem] font-medium tabular-nums text-gold-light md:text-[1.08rem]">
            {formatPrice(dish.price)}
          </span>
        </div>

        <p className="mt-2 max-w-2xl text-[0.9rem] leading-relaxed text-ink-dim">
          {dish.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {dish.weight ? (
            <span className="text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
              {dish.weight}
            </span>
          ) : null}
          <DishTags tags={dish.tags} max={3} />
        </div>
      </div>
    </article>
  );
}
