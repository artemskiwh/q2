import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingSection } from "@/components/BookingSection";

export const metadata: Metadata = {
  title: "Бронирование стола",
  description:
    "Забронируйте стол в ресторане Pakhlava онлайн: дата, время и количество гостей — подтвердим бронь звонком за 15 минут.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Онлайн-запись"
        title="Бронирование стола"
      />
      <BookingSection />
    </>
  );
}
