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
      <section
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center"
      >
        {/* Background photo of the interior */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 pb-24 pt-40 md:pt-52 animate-fade-in-up">
          <Link href="/menu/" className="btn-ghost">
            Открыть меню
          </Link>
          <button onClick={() => setBooking(true)} className="btn-white">
            Забронировать
          </button>
        </div>

        {/* Bottom address strip */}
        <div className="absolute inset-x-0 bottom-8 z-10 px-4 text-center">
          <p className="text-xs text-white/85 md:text-sm">
            {RESTAURANT.address}
            <span className="mx-3 text-white/40">|</span>
            {RESTAURANT.district}, {RESTAURANT.city}
          </p>
        </div>
      </section>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  );
}
