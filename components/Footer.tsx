import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="container-page py-14 text-center">
        <div className="flex justify-center">
          <Logo showCity />
        </div>

        <ul className="mx-auto mt-10 space-y-3 text-sm text-white/70">
          <li>
            <a href="#" className="hover:text-white">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="#" className="hover:text-white">Согласие на обработку персон. данных</a>
          </li>
        </ul>

        <p className="mt-10 text-xs text-white/45">
          © {new Date().getFullYear()} ICON. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
