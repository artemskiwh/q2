import type { Metadata } from "next";
import { BookingSection } from "@/components/BookingSection";

export const metadata: Metadata = {
  title: "Бронирование стола",
  description:
    "Забронируйте стол в ресторане Pakhlava онлайн: дата, время и количество гостей — подтвердим бронь звонком за 15 минут.",
};

export default function BookingPage() {
  return (
    <>
      <BookingSection />
    </>
  );
}
