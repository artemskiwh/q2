import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 12);

  return (
    <div className="container-page space-y-8 py-4 md:space-y-10 md:py-8">
      <section>
        <SectionHeader title="КАТЕГОРИИ" href="/catalog" />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-5 md:px-0 md:pb-0">
          {CATEGORIES.slice(0, 5).map((c, i) => (
            <div key={c.id} className="w-[40%] shrink-0 md:w-auto">
              <CategoryCard
                id={c.id}
                label={c.label}
                subtitle={c.subtitle}
                icon={c.icon}
                index={i}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="КАТАЛОГ" href="/catalog" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
