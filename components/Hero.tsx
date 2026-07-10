"use client";

import { useState } from "react";
import Link from "next/link";
import { RESTAURANT } from "@/lib/icon-data";
import { BookingModal } from "./BookingModal";
import { useOpenBooking } from "@/lib/use-open-booking";

export function Hero() {
  const [booking, setBooking] = useState(false);
  useOpenBooking(() => setBooking(true));

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* soft warm highlights */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 12%, rgba(255,255,255,0.9) 0%, rgba(245,242,236,0) 60%), radial-gradient(60% 50% at 50% 100%, rgba(26,22,19,0.05) 0%, rgba(245,242,236,0) 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center pt-28 md:pt-24 animate-fade-in-up">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#1a1613]/55">
            Караоке · Ресторан
          </span>

          <span className="my-6 flex items-center gap-3 text-[#1a1613]/30">
            <span className="h-px w-10 bg-[#1a1613]/25" />
            <span className="text-[9px]">◆</span>
            <span className="h-px w-10 bg-[#1a1613]/25" />
          </span>

          <h1 className="font-display font-light leading-[1.05] text-[#1a1613]" style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)" }}>
            Место, где вечер
            <br />
            становится сценой
          </h1>

          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[#1a1613]/60 md:text-base">
            Безупречный звук, авторская кухня и атмосфера до&nbsp;утра —
            в&nbsp;самом центре Ростова-на-Дону.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/menu/" className="btn-ghost">
              Открыть меню
            </Link>
            <button onClick={() => setBooking(true)} className="btn-white">
              Забронировать стол
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 px-4 text-center">
          <p className="text-xs text-[#1a1613]/70 md:text-sm">
            {RESTAURANT.address}
            <span className="mx-3 text-[#1a1613]/35">|</span>
            {RESTAURANT.district}, {RESTAURANT.city}
          </p>
        </div>
      </section>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  );
}
