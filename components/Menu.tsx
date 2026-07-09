import Link from "next/link";
import { Reveal } from "./Reveal";

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

        {/* Single circle → full menu */}
        <Reveal delay={120}>
          <div className="mt-16 flex justify-center">
            <Link
              href="/menu/"
              className="group flex aspect-square w-[240px] items-center justify-center rounded-full border border-white/45 transition hover:border-white md:w-[300px]"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white md:text-base">
                Меню
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
