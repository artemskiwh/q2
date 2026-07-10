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
        <div className="pointer-events-none absolute inset-0 bg-white/55" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-white to-transparent" />

        <div className="animate-fade-in-up absolute inset-x-0 bottom-28 z-10 flex flex-col items-center gap-4 px-6 md:bottom-32">
          <div className="flex w-full max-w-[460px] flex-col gap-4">
            <Link href="/menu/" className="btn-ghost !min-w-0 w-full">
              Открыть меню
            </Link>
            <button onClick={() => setBooking(true)} className="btn-white !min-w-0 w-full">
              Забронировать стол
            </button>
          </div>
        </div>

        {/* Bottom address strip */}
        <div className="absolute inset-x-0 bottom-6 z-10 px-4 text-center">
          <p className="text-[11px] text-black/75 md:text-xs">
            {RESTAURANT.address}
            <span className="mx-3 text-black/40">|</span>
            {RESTAURANT.district}, {RESTAURANT.city}
          </p>
        </div>
      </section>

      <BookingModal open={booking} onClose={() => setBooking(false)} />
    </>
  );
}
