import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BookingSection } from "@/components/BookingSection";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Бронирование стола",
  description:
    "Забронируйте стол в ресторане Pakhlava онлайн: выберите дату, время, зал и количество гостей — подтвердим бронь звонком за 15 минут.",
};

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Онлайн-запись"
        title="Бронирование стола"
        text={`Выберите дату, время и зал — займёт минуту. Подтверждаем звонком, стол держим ${restaurant.booking.holdMinutes} минут.`}
      />
      <BookingSection />
    </>
  );
}
