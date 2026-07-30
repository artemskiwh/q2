import Link from "next/link";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { withBasePath } from "@/lib/path";
import { halls } from "@/lib/restaurant";

export function Halls() {
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {halls.map((hall, i) => (
        <Reveal key={hall.id} as="article" delay={i * 110}>
          <div className="lift group flex h-full flex-col overflow-hidden border border-white/10 bg-night-card/50 hover:border-white/35">
            {hall.image ? (
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBasePath(hall.image)}
                  alt={hall.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 tag tag-white">{hall.seats}</span>
              </div>
            ) : null}

            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-xl text-[1.5rem] text-ink">{hall.name}</h3>
                {!hall.image ? (
                  <span className="shrink-0 text-[0.68rem] uppercase tracking-wider2 text-ink-mute">
                    {hall.seats}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{hall.description}</p>
              <ul className="mt-5 space-y-2">
                {hall.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.85rem] text-ink-dim">
                    <Icon.Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/booking"
                className="mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-wider2 text-ink transition-all hover:gap-3"
              >
                Забронировать
                <Icon.Arrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
