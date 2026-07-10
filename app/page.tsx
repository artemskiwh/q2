import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { Contacts } from "@/components/Contacts";
import { Divider } from "@/components/Divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Gallery />
      <Divider />
      <Menu />
      <Divider />
      <Reviews />
      <Divider />
      <Contacts />
    </>
  );
}
