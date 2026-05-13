import type { Product, ProductSpecs } from "./types";

function brandColor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("красн") || n.includes("вишн") || n.includes("малин")) return "Красный";
  if (n.includes("зелён") || n.includes("ябл")) return "Зелёный";
  if (n.includes("сини") || n.includes("черн")) return "Синий";
  if (n.includes("фиолет") || n.includes("виноград")) return "Фиолетовый";
  if (n.includes("жёлт") || n.includes("банан")) return "Жёлтый";
  return "В ассортименте";
}

/** Compute a complete display-ready spec object, merging product overrides
 *  with category-appropriate defaults. */
export function computeSpecs(product: Product): Record<string, string> {
  const s: ProductSpecs = product.specs ?? {};
  const k = product.puffs ?? 0;

  const weight =
    s.weight ??
    (product.category === "cartridge"
      ? "12 г"
      : k >= 40000
        ? "120 г"
        : k >= 25000
          ? "95 г"
          : k >= 10000
            ? "55 г"
            : "45 г");

  const power =
    s.power ??
    (product.category === "pod" ? "до 18 Вт" : k >= 25000 ? "до 22 Вт" : "до 15 Вт");

  const tankVolume =
    s.tankVolume ??
    (product.category === "cartridge"
      ? "2.0 мл"
      : k >= 40000
        ? "20 мл"
        : k >= 25000
          ? "16 мл"
          : k >= 10000
            ? "9 мл"
            : "4.5 мл");

  const chargePort = s.chargePort ?? (product.category === "cartridge" ? "—" : "Type-C");

  const dimensions =
    s.dimensions ??
    (product.category === "cartridge"
      ? "20×12×60 мм"
      : product.category === "pod"
        ? "98×24×14 мм"
        : k >= 25000
          ? "92×52×28 мм"
          : "74,5×40,5×20 мм");

  const resistance = s.resistance ?? (product.category === "pod" ? "0.6 Ом" : "0.8 Ом");
  const color = s.color ?? brandColor(product.name);

  const battery =
    s.battery ??
    (product.category === "cartridge"
      ? "—"
      : k >= 40000
        ? "1500 mAh"
        : k >= 25000
          ? "1100 mAh"
          : k >= 10000
            ? "850 mAh"
            : "650 mAh");

  const out: Record<string, string> = {
    Вес: weight,
    Мощность: power,
    "Объём картриджа": tankVolume,
    "Порт для зарядки": chargePort,
    Размеры: dimensions,
    Сопротивление: resistance,
    Цвет: color,
    "Ёмкость аккумулятора": battery,
  };
  if (product.puffs) out["Затяжек"] = product.puffs.toLocaleString("ru-RU");
  if (product.strength) out["Никотин"] = product.strength;

  return out;
}
