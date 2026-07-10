import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <span className="font-display text-7xl font-light text-[#1a1613]">404</span>
        <h1 className="section-title mt-4 !text-2xl md:!text-3xl">Страница не найдена</h1>
        <p className="mt-3 text-sm text-[#1a1613]/60">
          Возможно, ссылка устарела. Вернитесь на главную и забронируйте вечер в ICON.
        </p>
        <Link href="/" className="btn-white mt-8">
          На главную
        </Link>
      </div>
    </div>
  );
}
