import { Reveal } from "./Reveal";
import { withBasePath } from "@/lib/path";

/**
 * Галерея интерьера и подачи.
 * Плитка появляется только тогда, когда для неё указана фотография —
 * пустых заглушек на странице не остаётся.
 */
const TILES: { id: string; caption: string; span: string; image?: string }[] = [
  { id: "hall", caption: "Основной зал", span: "md:col-span-2 md:row-span-2" },
  { id: "mangal", caption: "Мангал на живых углях", span: "" },
  { id: "tandyr", caption: "Тандыр", span: "" },
  { id: "table", caption: "Стол на компанию", span: "md:col-span-2" },
  { id: "dessert", caption: "Пахлава", span: "md:col-span-2" },
  { id: "terrace", caption: "Терраса", span: "" },
  { id: "tea", caption: "Горный чай", span: "" },
];

export const galleryHasPhotos = TILES.some((t) => t.image);

export function Gallery() {
  const tiles = TILES.filter((t) => t.image);
  if (!tiles.length) return null;

  return (
    <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-3 md:auto-rows-[210px] md:grid-cols-4">
      {tiles.map((tile, i) => (
        <Reveal key={tile.id} delay={(i % 4) * 90} className={tile.span}>
          <figure className="group relative h-full overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath(tile.image)}
              alt={tile.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night to-transparent px-5 pb-4 pt-10 text-[0.68rem] uppercase tracking-wider2 text-ink/85">
              {tile.caption}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
