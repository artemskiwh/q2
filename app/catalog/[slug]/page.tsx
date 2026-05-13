import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getProduct, getRelated, CATEGORY_LABEL } from "@/lib/products";
import { computeSpecs } from "@/lib/specs";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductBuyPanel } from "@/components/ProductBuyPanel";
import { SpecsTable } from "@/components/SpecsTable";
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
  const specs = computeSpecs(product);

  return (
    <div className="container-page py-5 md:py-10">
      <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-[11px] text-muted md:mb-6 md:text-xs">
        <Link href="/" className="hover:text-white">
          Главная
        </Link>
        <Icon.Chevron className="h-3 w-3" />
        <Link href="/catalog" className="hover:text-white">
          Каталог
        </Link>
        <Icon.Chevron className="h-3 w-3" />
        <Link href={`/catalog?category=${product.category}`} className="hover:text-white">
          {CATEGORY_LABEL[product.category]}
        </Link>
        <Icon.Chevron className="h-3 w-3" />
        <span className="truncate text-white/70">{product.name}</span>
      </nav>

      <div className="grid gap-5 md:grid-cols-2 md:gap-10">
        <ProductGallery product={product} />

        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
            {product.brand}
          </span>
          <h1 className="mt-1.5 text-[22px] font-black leading-[1.15] tracking-tight text-white md:mt-2 md:text-[36px] lg:text-[40px]">
            {product.name}
          </h1>

          <div className="mt-5 md:mt-6">
            <ProductBuyPanel product={product} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-[1.2fr_1fr] md:gap-6">
        {product.description ? (
          <section className="surface p-5 md:p-6">
            <h2 className="text-lg font-black text-white md:text-xl">Описание</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-white/80 md:text-[15px]">
              {product.description}
            </p>
            {product.features?.length && (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] md:text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                      <Icon.Check className="h-3 w-3" />
                    </span>
                    <span className="text-white/85">{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <div />
        )}

        <SpecsTable specs={specs} />
      </div>

      {related.length > 0 && (
        <section className="mt-10 md:mt-14">
          <SectionHeader title="ПОХОЖИЕ ТОВАРЫ" href="/catalog" cta="Весь каталог" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
