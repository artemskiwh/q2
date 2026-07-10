import Link from "next/link";
import { Reveal } from "./Reveal";

export function Menu() {
  return (
    <section id="menu" className="relative py-24 md:py-32">
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
              className="group flex aspect-square w-[240px] items-center justify-center rounded-full border border-[#1a1613]/40 outline-none transition-colors hover:border-[#1a1613] hover:bg-[#1a1613]/[0.03] focus:outline-none focus-visible:outline-none md:w-[300px]"
            >
              <span className="text-center text-sm font-semibold uppercase tracking-[0.28em] text-[#1a1613] md:text-base">
                Полное
                <br />
                меню
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
