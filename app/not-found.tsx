import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid place-items-center py-24 text-center">
      <span className="text-7xl font-black text-brand">404</span>
      <h1 className="mt-3 text-2xl font-bold">Страница не найдена</h1>
      <p className="mt-2 text-sm text-muted">Возможно, ссылка устарела или товар снят с продажи.</p>
      <Link href="/" className="btn-primary mt-6 w-fit">
        На главную
      </Link>
    </div>
  );
}
