import { dishes } from "@/lib/menu";

const WORDS = [
  "Хинкали ручной лепки",
  "Мангал на живых углях",
  "Хачапури из тандыра",
  "Харчо на кости",
  "Плов в казане",
  "Пахлава по семейному рецепту",
  "Горный чай",
  "Соленья бочковые",
];

/** Бегущая строка между разделами — задаёт странице ритм. */
export function Marquee() {
  const items = WORDS.length ? WORDS : dishes.slice(0, 8).map((d) => d.name);
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-5">
      <div className="marquee-track flex w-max gap-10">
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="flex shrink-0 items-center gap-10 text-[0.72rem] uppercase tracking-wider2 text-ink/55"
          >
            {word}
            <span className="h-1 w-1 rotate-45 bg-white/40" />
          </span>
        ))}
      </div>

      {/* Плавное затухание по краям */}
      <span className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-night to-transparent" />
      <span className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-night to-transparent" />
    </div>
  );
}
