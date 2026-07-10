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

        {/* Three circles → menu sections */}
        <Reveal delay={120}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { href: "/menu/#kitchen", label: ["Меню", "кухни"] },
              { href: "/menu/#bar", label: ["Бар"] },
              { href: "/menu/#wine", label: ["Винная", "карта"] },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex aspect-square w-[150px] items-center justify-center rounded-full border border-white/45 outline-none transition hover:border-white focus:outline-none focus-visible:outline-none sm:w-[180px] md:w-[210px]"
              >
                <span className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-white md:text-sm">
                  {c.label.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < c.label.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
