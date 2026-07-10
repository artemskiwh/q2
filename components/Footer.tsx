import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-black/10 bg-white">
      <div className="container-page py-14 text-center">
        <div className="flex justify-center">
          <Logo showCity />
        </div>

        <ul className="mx-auto mt-10 space-y-3 text-sm text-black/60">
          <li>
            <a href="#" className="hover:text-black">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="#" className="hover:text-black">Согласие на обработку персон. данных</a>
          </li>
        </ul>

        <p className="mt-10 text-xs text-black/45">
          © {new Date().getFullYear()} ICON. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
