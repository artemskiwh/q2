import type { Metadata } from "next";
import { MapBlock } from "@/components/MapBlock";
import { ContactsBlock } from "@/components/ContactsBlock";
import { Reveal } from "@/components/Reveal";
import { restaurant } from "@/lib/restaurant";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Ресторан Pakhlava: ${restaurant.address.street}, ${restaurant.address.city}. Часы работы, телефон и как нас найти.`,
};

export default function ContactsPage() {
  return (
    <>
      <h1 className="sr-only">Контакты ресторана Pakhlava</h1>

      {/* Карточки: адрес, часы работы, связь */}
      <section className="container-page pb-12 pt-[150px] md:pb-16 md:pt-[185px]">
        <ContactsBlock />
      </section>

      {/* Карта */}
      <section className="container-page pb-14 md:pb-20">
        <Reveal>
          <MapBlock />
        </Reveal>
      </section>
    </>
  );
}
