import Link from "next/link";
import { Icon } from "@/components/Icons";

export const metadata = {
  title: "Избранное",
  description: "Сохранённые товары TYAG Moskva.",
};

export default function FavoritesPage() {
  return (
    <div className="container-page py-16 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand">
        <Icon.Heart className="h-7 w-7" />
      </span>
      <h1 className="mt-5 text-2xl font-bold">В избранном пока пусто</h1>
      <p className="mt-2 text-sm text-muted">
        Сохраняйте товары — будем держать актуальную цену для опта.
      </p>
      <Link href="/catalog" className="btn-primary mx-auto mt-6 w-fit">
        Перейти в каталог
      </Link>
    </div>
  );
}
