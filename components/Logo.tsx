import Link from "next/link";
import { PlateRing, Rosette } from "./Ornament";

/** Логотип в шапке и подвале. */
export function Logo({
  href = "/",
  size = "md",
}: {
  href?: string | null;
  size?: "sm" | "md";
}) {
  const inner = (
    <span className="flex items-center gap-3">
      <Rosette className={size === "sm" ? "h-6 w-6 text-gold" : "h-7 w-7 text-gold"} />
      <span className="flex flex-col leading-none">
        <span
          className={
            size === "sm"
              ? "wordmark text-[1.35rem] text-ink"
              : "wordmark text-[1.6rem] text-ink md:text-[1.75rem]"
          }
        >
          pakhlava
        </span>
        <span className="mt-1 text-[0.5rem] uppercase tracking-wider3 text-gold/80">
          кухня высоких гор
        </span>
      </span>
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} aria-label="Pakhlava — на главную" className="shrink-0">
      {inner}
    </Link>
  );
}

/** Круглый медальон — центральный элемент первого экрана. */
export function LogoMedallion({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative grid aspect-square place-items-center rounded-full ${className}`}
      style={{
        background:
          "radial-gradient(circle at 38% 26%, #2b2e37 0%, #191b21 42%, #0d0e12 78%, #08080b 100%)",
        boxShadow:
          "0 0 0 1px rgba(201,162,90,0.22), 0 0 90px -10px rgba(201,162,90,0.18), 0 50px 100px -30px rgba(0,0,0,0.95)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
      <PlateRing className="absolute inset-[6%] text-gold/25" />
      <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-gold/20" />

      <span className="relative z-10 flex flex-col items-center px-6 text-center">
        <Rosette className="h-8 w-8 text-ink/90 md:h-10 md:w-10" />
        <span className="wordmark mt-4 text-[2.6rem] leading-none text-ink md:text-[3.6rem]">
          pakhlava
        </span>
        <span className="mt-3 flex items-center gap-2 text-[0.58rem] uppercase tracking-wider3 text-ink/70 md:text-[0.66rem]">
          <span className="h-[3px] w-[3px] rotate-45 bg-gold" />
          кухня высоких гор
          <span className="h-[3px] w-[3px] rotate-45 bg-gold" />
        </span>
      </span>
    </div>
  );
}
