import Link from "next/link";
import { Reveal } from "./Reveal";

const CIRCLES = [
  { label: "Меню кухни", href: "/menu/#kitchen" },
  { label: "Бар", href: "/menu/#bar" },
  { label: "Винная карта", href: "/menu/#wine" },
];

export function Menu() {
  return (
    <section id="menu" className="relative overflow-hidden py-24 md:py-32">
      {/* Faint background photo of dishes */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />

      <div className="container-page relative">
        <Reveal>
          <h2 className="section-title">Меню</h2>
          <p className="section-sub mx-auto mt-4 max-w-md">
            Неожиданные сочетания и подача,
            <br />
            которая удивляет
          </p>
        </Reveal>

        {/* Three intersecting thin circles */}
        <Reveal delay={120}>
          <div className="relative mx-auto mt-14 flex h-[560px] w-full max-w-[420px] flex-col items-center justify-center md:h-[620px]">
            {CIRCLES.map((c, i) => (
              <Link
                key={c.label}
                href={c.href}
                className="group absolute flex aspect-square w-[70%] items-center justify-center rounded-full border border-white/45 transition hover:border-white"
                style={{
                  top: `${i * 26}%`,
                }}
              >
                <span
                  className="text-sm font-semibold uppercase tracking-[0.24em] text-white transition group-hover:text-white md:text-[15px]"
                >
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
