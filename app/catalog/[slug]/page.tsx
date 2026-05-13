import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProduct, getRelated, CATEGORY_LABEL } from "@/lib/products";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { AddToCartPanel } from "@/components/AddToCartPanel";
import { Icon } from "@/components/Icons";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return {};
  return {
    title: `${p.name} — оптом`,
    description: p.shortDesc ?? p.description ?? "",
    openGraph: {
      title: `${p.name} — оптом`,
      description: p.shortDesc ?? p.description ?? "",
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return notFound();

  const related = getRelated(product.slug);

  return (
    <div className="container-page py-6 md:py-10">
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link href="/" className="hover:text-white">Главная</Link>
        <Icon.Chevron className="h-3 w-3" />
        <Link href="/catalog" className="hover:text-white">Каталог</Link>
        <Icon.Chevron className="h-3 w-3" />
        <Link
          href={`/catalog?category=${product.category}`}
          className="hover:text-white"
        >
          {CATEGORY_LABEL[product.category]}
        </Link>
        <Icon.Chevron className="h-3 w-3" />
        <span className="truncate text-white/70">{product.name}</span>
      </nav>

      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-3xl border border-bg-line bg-bg-card p-4">
            <ProductVisual product={product} variant="hero" />
          </div>
          <div className="absolute left-6 top-6 flex flex-wrap gap-2">
            {product.isHot && <span className="chip chip-brand">Хит</span>}
            {product.isNew && <span className="chip chip-accent">Новинка</span>}
            {product.isSale && product.oldPrice && (
              <span className="chip chip-brand">
                −{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
            {product.brand}
          </span>
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {product.name}
          </h1>
          {product.shortDesc && (
            <p className="mt-3 text-base text-muted">{product.shortDesc}</p>
          )}

          {(product.tags?.length || product.strength) && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.strength && (
                <span className="chip chip-neutral">Никотин {product.strength}</span>
              )}
              {product.puffs && (
                <span className="chip chip-neutral">
                  {product.puffs.toLocaleString("ru-RU")} затяжек
                </span>
              )}
              {product.tags?.map((t) => (
                <span key={t} className="chip chip-neutral">{t}</span>
              ))}
            </div>
          )}

          {product.features?.length && (
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent">
                    <Icon.Spark className="h-3.5 w-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <AddToCartPanel product={product} />
          </div>
        </div>
      </div>

      {product.description && (
        <section className="mt-12 rounded-2xl border border-bg-line bg-bg-card p-6 md:p-8">
          <h2 className="text-lg font-bold">Описание</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base">
            {product.description}
          </p>
        </section>
      )}

      {product.flavors && product.flavors.length > 0 && (
        <section className="mt-8">
          <SectionHeader title={`Вкусы (${product.flavors.length})`} />
          <div className="flex flex-wrap gap-2">
            {product.flavors.map((f) => (
              <span
                key={f}
                className="rounded-full border border-bg-line bg-bg-card px-3 py-1.5 text-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <SectionHeader title="Похожие товары" href="/catalog" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
