import { RESTAURANT } from "@/lib/icon-data";
import { Reveal } from "./Reveal";

export function Contacts() {
  return (
    <section id="contacts" className="relative py-24 md:py-32">
      <div className="container-page">
        <Reveal className="text-center">
          <span className="eyebrow mb-6">Контакты</span>
          <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
            Ждём вас в <span className="text-gold-gradient">ICON</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          {/* Info */}
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <InfoCard title="Адрес" className="sm:col-span-2">
              <p className="text-lg text-white">{RESTAURANT.address}</p>
              <p className="mt-1 text-sm text-muted">
                {RESTAURANT.district}, {RESTAURANT.city}
              </p>
            </InfoCard>

            <InfoCard title="Часы работы">
              <p className="text-lg text-white">{RESTAURANT.hoursShort}</p>
              <p className="mt-1 text-sm text-muted">Ежедневно</p>
            </InfoCard>

            <InfoCard title="Телефон">
              <a href={RESTAURANT.phoneHref} className="text-lg text-white hover:text-gold">
                {RESTAURANT.phone}
              </a>
              <p className="mt-1 text-sm text-muted">Бронь и вопросы</p>
            </InfoCard>

            <div className="gold-frame flex flex-col justify-center gap-3 bg-ink-card/50 p-6 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
                Связаться
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#book" className="btn-gold">Забронировать стол</a>
                <a href={RESTAURANT.whatsapp} target="_blank" rel="noreferrer" className="btn-outline">
                  WhatsApp
                </a>
                <a href={RESTAURANT.gis} target="_blank" rel="noreferrer" className="btn-outline">
                  2ГИС
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map placeholder (interactive maps blocked) */}
          <Reveal delay={120}>
            <a
              href={RESTAURANT.gis}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-gold/15 bg-ink-card"
            >
              <MapBackdrop />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-gradient text-ink shadow-gold">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2.2" />
                  </svg>
                </span>
                <p className="font-display text-xl text-white">{RESTAURANT.address}</p>
                <span className="text-sm text-gold transition group-hover:text-gold-light">
                  Открыть на карте 2ГИС →
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`gold-frame bg-ink-card/50 p-6 ${className}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
        {title}
      </p>
      {children}
    </div>
  );
}

function MapBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-70">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,162,75,0.14),transparent_60%)]" />
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="streets" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M0 20h140M0 50h140M20 0v140M50 0v140" stroke="rgba(201,162,75,0.12)" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#streets)" />
        <path d="M-20 90 L400 40" stroke="rgba(201,162,75,0.2)" strokeWidth="2" fill="none" />
        <path d="M60 -20 L120 400" stroke="rgba(201,162,75,0.16)" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
