import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <span className="brand-word text-7xl text-gold-gradient">404</span>
        <h1 className="mt-4 font-display text-3xl text-white">Страница не найдена</h1>
        <p className="mt-2 text-sm text-muted">
          Возможно, ссылка устарела. Вернитесь на главную и забронируйте вечер в ICON.
        </p>
        <Link href="/" className="btn-gold mt-8 w-fit">
          На главную
        </Link>
      </div>
    </div>
  );
}
