import { OrnamentDivider } from "./Ornament";

/** Компактная шапка внутренних страниц. */
export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-accent/10 pb-16 pt-[140px] md:pb-20 md:pt-[180px]">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 0%, #1a1c22 0%, #101116 55%, #0b0b0e 100%)",
        }}
      />

      <div className="container-page flex flex-col items-center text-center">
        <span className="eyebrow animate-fade-in">{eyebrow}</span>
        <h1 className="display-xl mt-5 animate-reveal-up text-[2.4rem] text-ink md:text-[3.6rem]">
          {title}
        </h1>
        <OrnamentDivider className="mt-7 max-w-[360px]" />
        {text ? (
          <p className="mt-7 max-w-2xl text-[0.98rem] leading-relaxed text-ink-dim">{text}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
