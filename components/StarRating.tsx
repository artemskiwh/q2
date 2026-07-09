export function StarRating({
  value = 5,
  size = 16,
  className = "",
}: {
  value?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span className={`stars ${className}`} aria-label={`${value} из 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < value ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className={i < value ? "text-gold" : "text-gold/25"}
        >
          <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3z" />
        </svg>
      ))}
    </span>
  );
}
