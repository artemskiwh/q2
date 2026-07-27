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

/** Тонкий разделитель с небольшим ромбом по центру. */
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
      <span className="mx-4 h-1.5 w-1.5 rotate-45 border border-ink/60" />
      <span className="hairline max-w-[220px] flex-1" />
    </div>
  );
}
