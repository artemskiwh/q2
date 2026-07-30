"use client";

import { Suspense } from "react";
import { BookingForm } from "./BookingForm";
import { OrnamentDivider } from "./Ornament";
import { Reveal } from "./Reveal";

export function BookingSection() {
  return (
    <section className="container-page pb-28 pt-[130px] md:pt-[165px] lg:pb-20">
      <Reveal className="mb-12 flex flex-col items-center text-center md:mb-16">
        <h1 className="display-xl text-[1.8rem] leading-none text-ink md:text-[2.6rem]">
          Бронирование стола
        </h1>
        <OrnamentDivider className="rule-draw mt-6 max-w-[360px] md:mt-8" />
      </Reveal>

      <Suspense fallback={<FormSkeleton />}>
        <BookingForm />
      </Suspense>
    </section>
  );
}

function FormSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="h-24 animate-pulse bg-white/5" />
        <div className="h-28 animate-pulse bg-white/5" />
        <div className="h-20 animate-pulse bg-white/5" />
      </div>
      <div className="h-80 animate-pulse bg-white/5" />
    </div>
  );
}
