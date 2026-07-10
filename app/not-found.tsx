import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <span className="serif-thin text-7xl text-black">404</span>
        <h1 className="section-title mt-6 !text-3xl">Страница не найдена</h1>
        <p className="section-sub mx-auto mt-4 max-w-sm">
          Возможно, ссылка устарела. Вернитесь на главную и забронируйте вечер в ICON.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-white">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
