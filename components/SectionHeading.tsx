import { Reveal } from "./Reveal";
import { OrnamentDivider } from "./Ornament";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  divider = true,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  divider?: boolean;
}) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "flex flex-col items-center text-center" : "flex flex-col"}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="display-xl mt-4 text-balance text-[1.6rem] leading-tight text-ink md:text-[2.2rem]">
        {title}
      </h2>
      {divider ? (
        <OrnamentDivider
          className={`rule-draw ${
            centered ? "mt-6 max-w-[420px]" : "mt-6 max-w-[280px] justify-start"
          }`}
        />
      ) : null}
      {text ? (
        <p
          className={`mt-6 text-[0.98rem] leading-relaxed text-ink-dim ${
            centered ? "max-w-2xl" : "max-w-xl"
          }`}
        >
          {text}
        </p>
      ) : null}
    </Reveal>
  );
}
