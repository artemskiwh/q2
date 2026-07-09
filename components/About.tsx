import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative pb-24 pt-8 md:pb-32 md:pt-14">
      {/* Full-width interior photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/9]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
      </div>

      <div className="container-page mt-16 md:mt-24">
        <Reveal>
          <h2 className="section-title">О ресторане</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-2xl space-y-6 text-[15px] leading-[1.85] text-white/80 md:text-base">
            <p>
              ICON — это караоке-ресторан нового формата в самом центре Ростова-на-Дону. Место, где встречаются
              безупречная акустика, авторская кухня и атмосфера, ради которой хочется возвращаться. Вечер начинается
              с бокала вина, продолжается любимой песней у микрофона и заканчивается сильным послевкусием — не только
              от блюд, но и от того, как вас здесь встретили.
            </p>
            <p>
              Мы верим, что вечер должен запоминаться каждой деталью: настройкой звука, светом, вкусом закуски и тем,
              как звучит ваш голос со сцены. Наши гости — гости во всех смыслах: их встречают, о них заботятся, для них
              подстраивают всё до мелочей. Приходите большой компанией на день рождения, вдвоём на свидание или одни —
              просто выпить бокал и послушать город.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
