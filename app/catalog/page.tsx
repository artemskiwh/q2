import { Suspense } from "react";
import { CatalogView } from "@/components/CatalogView";

export const metadata = {
  title: "Каталог — одноразки, поды, картриджи",
  description:
    "Полный каталог TYAG Moskva: одноразки, под-системы, картриджи, аксессуары и распродажа.",
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="container-page py-10 text-muted">Загрузка каталога…</div>
      }
    >
      <CatalogView />
    </Suspense>
  );
}
