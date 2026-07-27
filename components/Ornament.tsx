/**
 * Орнаментальная графика Pakhlava.
 * Мотивы взяты с расписной керамики на фирменных снимках:
 * кавказская розетка, крестообразный цветок, плетёная кайма.
 */

type SvgProps = React.SVGProps<SVGSVGElement>;

/** Фирменный знак: восьмилучевая розетка в ромбе — как над логотипом. */
export function Rosette({ className = "", ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M24 4 L30 10 L24 16 L18 10 Z" />
      <path d="M24 32 L30 38 L24 44 L18 38 Z" />
      <path d="M4 24 L10 18 L16 24 L10 30 Z" />
      <path d="M32 24 L38 18 L44 24 L38 30 Z" />
      <path d="M24 16 L32 24 L24 32 L16 24 Z" />
      <circle cx="24" cy="24" r="2.6" />
      <path d="M13.5 13.5 L18 18 M34.5 13.5 L30 18 M13.5 34.5 L18 30 M34.5 34.5 L30 30" />
    </svg>
  );
}

/** Горизонтальный разделитель с розеткой по центру. */
export function OrnamentDivider({
  className = "",
  width = "w-full",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${width} ${className}`}>
      <span className="hairline max-w-[220px] flex-1" />
      <span className="mx-4 flex items-center gap-2 text-gold">
        <span className="h-1 w-1 rotate-45 bg-gold/60" />
        <Rosette className="h-5 w-5 text-gold/80" />
        <span className="h-1 w-1 rotate-45 bg-gold/60" />
      </span>
      <span className="hairline max-w-[220px] flex-1" />
    </div>
  );
}

/** Угловой завиток для рамок карточек и медальонов. */
export function CornerFlourish({ className = "", ...props }: SvgProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M1 12 C1 5.4 5.4 1 12 1 L26 1" />
      <path d="M1 22 C1 11 11 1 22 1" opacity="0.45" />
      <path d="M8 8 l4 0 0 4" opacity="0.7" />
    </svg>
  );
}

/** Круглая кайма — «ободок тарелки» для заглушек блюд и медальонов. */
export function PlateRing({ className = "", ...props }: SvgProps) {
  const teeth = Array.from({ length: 36 }, (_, i) => i * 10);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" {...props}>
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <g stroke="currentColor" strokeWidth="0.9" opacity="0.65">
        {teeth.map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="12"
            x2="100"
            y2="20"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            d="M100 24 q7 10 0 20 q-7 -10 0 -20"
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Повторяющаяся кайма-плетёнка для верха/низа секции. */
export function OrnamentBand({ className = "" }: { className?: string }) {
  return (
    <div
      className={`ornament-tile h-[30px] w-full opacity-[0.18] ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Заглушка вместо фотографии: «тарелка» с ободком и розеткой.
 * Кольцо всегда круглое — независимо от пропорций контейнера.
 */
export function PlatePlaceholder({
  size = "w-[78%]",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div className={`dish-plate relative h-full w-full overflow-hidden ${className}`}>
      <span
        className={`absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 ${size}`}
      >
        <PlateRing className="h-full w-full text-gold/20 transition-transform duration-[1400ms] group-hover:rotate-45" />
      </span>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Rosette className="h-8 w-8 text-gold/45" />
      </span>
    </div>
  );
}

/** Рамка с золотыми уголками. */
export function FramedCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <CornerFlourish className="absolute left-2 top-2 h-6 w-6 text-gold/45" />
      <CornerFlourish className="absolute right-2 top-2 h-6 w-6 -scale-x-100 text-gold/45" />
      <CornerFlourish className="absolute bottom-2 left-2 h-6 w-6 -scale-y-100 text-gold/45" />
      <CornerFlourish className="absolute bottom-2 right-2 h-6 w-6 -scale-100 text-gold/45" />
    </div>
  );
}
