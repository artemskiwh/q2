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
      <SectionDivider />
      <About />
      <SectionDivider />
      <Menu />
      <SectionDivider />
      <Karaoke />
      <SectionDivider />
      <Reviews />
      <SectionDivider />
      <Contacts />
    </>
  );
}

function SectionDivider() {
  return (
    <div className="container-page">
      <div className="mx-auto h-px w-full max-w-4xl bg-gold-line opacity-40" />
    </div>
  );
}
