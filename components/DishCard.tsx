import Link from "next/link";
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
        className="h-full w-full object-cover"
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

/** Карточка не меняет вид ни при наведении, ни при нажатии. */
const CARD =
  "card-static flex h-full flex-col overflow-hidden border border-white/10 bg-night-card/40";

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

      <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-5 md:p-6">
        <h3 className="display-xl text-[0.92rem] leading-snug text-ink sm:text-[1.1rem] md:text-[1.3rem]">
          {dish.name}
        </h3>

        <p className="mt-2 text-[0.76rem] leading-relaxed text-ink-dim sm:text-[0.84rem] md:mt-3 md:text-[0.88rem]">
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
