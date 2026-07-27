"use client";

import { Suspense, useState } from "react";
import { BookingForm } from "./BookingForm";
import { MyBookings } from "./MyBookings";
import { SectionHeading } from "./SectionHeading";

export function BookingSection() {
  const [version, setVersion] = useState(0);

  return (
    <>
      <section className="container-page py-14 md:py-20">
        <Suspense fallback={<FormSkeleton />}>
          <BookingForm onCreated={() => setVersion((v) => v + 1)} />
        </Suspense>
      </section>

      <section id="my" className="border-t border-accent/12 bg-night-soft/40">
        <div className="container-page section">
          <SectionHeading
            eyebrow="История"
            title="Мои брони"
            text="Список хранится только в вашем браузере — мы никуда его не передаём."
          />
          <div className="mt-12">
            <MyBookings version={version} />
          </div>
        </div>
      </section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr]">
      <div className="space-y-6">
        <div className="h-9 w-2/3 animate-pulse bg-white/5" />
        <div className="h-28 animate-pulse bg-white/5" />
        <div className="h-20 animate-pulse bg-white/5" />
      </div>
      <div className="h-80 animate-pulse bg-white/5" />
    </div>
  );
}
