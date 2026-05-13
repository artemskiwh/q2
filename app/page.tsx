import { AdvantagesSection } from "@/components/AdvantagesSection";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { CTABanner } from "@/components/CTABanner";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { PromoStrip } from "@/components/PromoStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const hot = PRODUCTS.filter((p) => p.isHot).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const featured = PRODUCTS.slice(0, 12);

  return (
    <div className="container-page space-y-10 py-4 md:space-y-14 md:py-8">
      <Hero />

      <PromoStrip />

      <section>
        <SectionHeader
          title="КАТЕГОРИИ"
          subtitle="Подберите категорию под формат вашего магазина"
          href="/catalog"
        />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:px-0 md:pb-0 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
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

      {hot.length > 0 && (
        <section>
          <SectionHeader
            title="ХИТЫ ПРОДАЖ"
            subtitle="Лучше всего покупают розничные магазины"
            href="/catalog?sort=popular"
            cta="Все хиты"
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {hot.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <BrandsMarquee />

      <section>
        <SectionHeader
          title="КАТАЛОГ"
          subtitle="36 моделей в наличии — от 110 ₽ оптом"
          href="/catalog"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <AdvantagesSection />

      {newArrivals.length > 0 && (
        <section>
          <SectionHeader
            title="НОВИНКИ"
            subtitle="Только что добавили на склад"
            href="/catalog?sort=new"
            cta="Все новинки"
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}
