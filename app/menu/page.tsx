import type { Metadata } from "next";
import { MenuPage } from "@/components/MenuPage";

export const metadata: Metadata = {
  title: "Меню — авторская кухня, бар и винная карта",
  description:
    "Меню караоке-ресторана ICON: закуски, салаты, паста, горячее и десерты, авторские коктейли и винная карта. Ростов-на-Дону.",
};

export default function Page() {
  return <MenuPage />;
}
