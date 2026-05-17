const BRANDS = [
  "DUALL",
  "WAKA",
  "ELFBAR",
  "GEEK BAR",
  "VAPORESSO",
  "GEEKVAPE",
  "VOZOL",
  "FIZZY",
  "PUFFMI",
  "BUBBLE MON",
  "LAISKA",
  "XROS",
];

export function BrandsMarquee() {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="overflow-hidden rounded-2xl border border-bg-line bg-bg-card py-5">
      <div className="flex items-center gap-2 px-5 pb-3">
        <span className="h-px flex-1 bg-bg-line" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
          Бренды в каталоге
        </span>
        <span className="h-px flex-1 bg-bg-line" />
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-card to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-card to-transparent"
          aria-hidden
        />
        <div className="marquee gap-10 px-5 will-change-transform">
          {loop.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="select-none whitespace-nowrap text-[20px] font-black uppercase tracking-[0.16em] text-white/15 transition-colors hover:text-white/55 md:text-[28px]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
