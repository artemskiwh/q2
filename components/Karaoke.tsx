"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { BookingModal } from "./BookingModal";

const FEATURES = [
  {
    title: "Звук концертного качества",
    text: "Настройка сцены под каждый вечер и голос — гости называют звук ICON лучшим в городе.",
  },
  {
    title: "Каталог песен",
    text: "Русская и зарубежная классика, свежие хиты и любимые баллады — найдётся композиция для каждого.",
  },
  {
    title: "Залы под компании",
    text: "Уютный основной зал и вип-зона — комфортно и вдвоём, и большой компанией.",
  },
  {
    title: "Бар и кухня у сцены",
    text: "Авторские коктейли и закуски приносят прямо к микрофону — вечер не прерывается ни на минуту.",
  },
];

export function Karaoke() {
  const [booking, setBooking] = useState(false);

  return (
    <>
      <section id="karaoke" className="relative overflow-hidden py-24 md:py-32">
        {/* Background image */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516981879613-9f5da904015f?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

        <div className="container-page relative">
          <Reveal>
            <h2 className="section-title">Караоке</h2>
            <p className="section-sub mx-auto mt-4 max-w-md">
              Главное шоу вечера — на сцене вы
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="border border-white/20 bg-white/[0.02] p-7 backdrop-blur-sm md:p-8"
                >
                  <h3 className="serif-thin text-xl text-white md:text-2xl">{f.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/70">{f.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mx-auto mt-14 max-w-2xl text-center">
              <p className="text-[15px] leading-relaxed text-white/75">
                Мы работаем ежедневно с&nbsp;20:00 до&nbsp;06:00. Вечера расписаны быстро — бронируйте стол заранее,
                чтобы ваш любимый уголок ждал именно вас.
              </p>
              <button onClick={() => setBooking(true)} className="btn-white mt-8">
                Забронировать стол
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  );
}
