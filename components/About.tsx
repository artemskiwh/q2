import { RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

const STATS = [
  { value: "4.8", label: "рейтинг в 2ГИС" },
  { value: "237", label: "оценок гостей" },
  { value: "6:00", label: "поём до утра" },
  { value: "№1", label: "звук в городе" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <span className="eyebrow only-after mb-6">О ресторане</span>
            <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
              Место, где вечер
              <br />
              <span className="text-gold-gradient">становится сценой</span>
            </h2>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-muted md:text-base">
              <p>
                <span className="text-white">ICON</span> — это караоке-ресторан
                нового формата в Ростове-на-Дону. Мы соединили безупречную
                акустику профессиональной сцены, авторскую кухню и
                интерьер, в котором хочется остаться до рассвета.
              </p>
              <p>
                Здесь каждый гость — звезда. Возьмите микрофон и спойте любимую
                песню, соберитесь большой компанией за плато и бокалом вина или
                просто наслаждайтесь живой атмосферой. Вежливый персонал
                позаботится о том, чтобы вечер прошёл идеально.
              </p>
              <p>
                Нас выбирают за настоящий звук, вкусную еду и то самое
                настроение, ради которого возвращаются снова и снова.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#menu" className="btn-gold">Открыть меню</a>
              <a href="#book" className="btn-outline">Забронировать</a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="gold-frame flex flex-col items-center justify-center gap-2 bg-ink-card/60 px-4 py-9 text-center"
                >
                  <span className="font-display text-4xl text-gold-gradient md:text-5xl">
                    {s.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-muted md:text-[13px]">
                    {s.label}
                  </span>
                </div>
              ))}
              <p className="col-span-2 mt-1 text-center text-sm text-muted">
                {RESTAURANT.address}, {RESTAURANT.city} · {RESTAURANT.hours}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
