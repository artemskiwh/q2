import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Karaoke } from "@/components/Karaoke";
import { Reviews } from "@/components/Reviews";
import { Contacts } from "@/components/Contacts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Karaoke />
      <Reviews />
      <Contacts />
    </>
  );
}
