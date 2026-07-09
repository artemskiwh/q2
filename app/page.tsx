import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
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
      <Menu />
      <Divider />
      <Reviews />
      <Divider />
      <Contacts />
    </>
  );
}
