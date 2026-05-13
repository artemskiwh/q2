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
  const catalog = PRODUCTS.slice(0, 12);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="container-page space-y-8 py-4 md:space-y-14 md:py-8">
      <Hero />

      <PromoStrip />

      <section>
        <SectionHeader
          title="КАТЕГОРИИ"
          subtitle="Подберите категорию под формат вашего магазина"
          href="/catalog"
          cta="Все категории"
        />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:px-0 md:pb-0 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <div key={c.id} className="w-[42%] shrink-0 md:w-auto">
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
        <SectionHeader
          title="КАТАЛОГ"
          subtitle="Лучшие модели в наличии — от 110 ₽ оптом"
          href="/catalog"
          cta="Весь каталог"
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {catalog.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <BrandsMarquee />

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
            {newArrivals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}
