"use client";

import { Suspense } from "react";
import { BookingForm } from "./BookingForm";

export function BookingSection() {
  return (
    <section className="container-page py-14 pb-28 md:py-20 lg:pb-20">
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
