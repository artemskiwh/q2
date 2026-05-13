import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeader } from "@/components/SectionHeader";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 12);

  return (
    <div className="container-page space-y-12 py-6 md:py-10">
      <Hero />
      <InfoStrip />

      <section>
        <SectionHeader title="Категории" href="/catalog" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <CategoryCard
              key={c.id}
              id={c.id}
              label={c.label}
              subtitle={c.subtitle}
              icon={c.icon}
              index={i}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Каталог" href="/catalog" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-bg-line bg-gradient-to-br from-brand/15 to-bg-card p-6 md:p-8">
          <span className="chip chip-brand mb-3">Опт</span>
          <h3 className="text-2xl font-bold leading-tight md:text-3xl">
            Цены ниже при заказе от 100 шт
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted">
            Свяжитесь с менеджером — соберём для вас миксы вкусов, согласуем условия доставки и
            расскажем про эксклюзивы.
          </p>
          <a href="/wholesale" className="btn-primary mt-5 w-fit">
            Условия опта
          </a>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-bg-line bg-gradient-to-br from-accent/10 to-bg-card p-6 md:p-8">
          <span className="chip chip-accent mb-3">Новинки</span>
          <h3 className="text-2xl font-bold leading-tight md:text-3xl">
            WAKA · GEEKBAR · ELFBAR 25k–60k
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted">
            Свежие поступления одноразок с увеличенным ресурсом — от 20 000 до 60 000 затяжек.
            Уже на складе в Москве.
          </p>
          <a href="/catalog?category=disposable" className="btn-secondary mt-5 w-fit">
            К новинкам
          </a>
        </div>
      </section>
    </div>
  );
}
