/**
 * Меню ресторана Pakhlava.
 * В списке только блюда, для которых есть фотографии.
 * Снимок подключается полем `image` — путь от /public.
 * ⚠️ Цены черновые: заменить на фактические.
 */

export type Dish = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle: string;
};

export const categories: MenuCategory[] = [
  { id: "zakuski", name: "Закуски", subtitle: "С чего начинается стол" },
  { id: "salads", name: "Салаты", subtitle: "Свежие и сытные" },
  { id: "soups", name: "Супы", subtitle: "На бульоне и на медленном огне" },
  { id: "mangal", name: "Мангал и гриль", subtitle: "Живые угли и открытый огонь" },
  { id: "hot", name: "Горячие блюда", subtitle: "Казан, горшочек и тандыр" },
  { id: "bread", name: "Выпечка и лепёшки", subtitle: "Тесто ставим с утра" },
  { id: "garnish", name: "Гарниры", subtitle: "К мясу и рыбе" },
];

export const dishes: Dish[] = [
  // ——— Закуски ———
  {
    id: "cheese-sticks",
    category: "zakuski",
    name: "Сырные палочки",
    description: "Хрустящие палочки из сулугуни и кисло-сладкий соус",
    price: 420,
    image: "/img/menu/cheese-sticks.jpg",
  },
  {
    id: "nuggets",
    category: "zakuski",
    name: "Наггетсы",
    description: "Куриные наггетсы в хрустящей панировке",
    price: 390,
    image: "/img/menu/nuggets.jpg",
  },
  {
    id: "rye-croutons",
    category: "zakuski",
    name: "Гренки ржаные",
    description: "Ржаной хлеб с чесноком, подаём с соусом",
    price: 260,
    image: "/img/menu/rye-croutons.jpg",
  },
  {
    id: "dolma",
    category: "zakuski",
    name: "Долма",
    description: "Виноградные листья с мясом и рисом, соус мацони и зёрна граната",
    price: 590,
    image: "/img/menu/dolma.jpg",
  },
  {
    id: "beet-carpaccio",
    category: "zakuski",
    name: "Карпаччо из свёклы",
    description: "Печёная свёкла, томаты, творожный сыр и бальзамик",
    price: 490,
    image: "/img/menu/beet-carpaccio.jpg",
  },

  // ——— Салаты ———
  {
    id: "olivie",
    category: "salads",
    name: "Оливье",
    description: "Отварное мясо, картофель, солёный огурец и яйцо, домашний майонез",
    price: 490,
    image: "/img/menu/olivie.jpg",
  },
  {
    id: "olivie-salmon",
    category: "salads",
    name: "Оливье с лососем",
    description: "Тот же салат, но со слабосолёным лососем и хрустящими чипсами",
    price: 690,
    image: "/img/menu/olivie-salmon.jpg",
  },
  {
    id: "salad-beetroot",
    category: "salads",
    name: "Салат со свёклой и яблоком",
    description: "Печёная свёкла, яблоко, шпинат, грецкий орех и сливочная заправка",
    price: 590,
    image: "/img/menu/salad-beetroot.jpg",
  },
  {
    id: "salad-roastbeef",
    category: "salads",
    name: "Салат с ростбифом",
    description: "Ростбиф, черри, перепелиное яйцо и микс салата",
    price: 690,
    image: "/img/menu/salad-roastbeef.jpg",
  },
  {
    id: "salad-shrimp",
    category: "salads",
    name: "Салат с креветками",
    description: "Тигровые креветки, микс салата, черри и сливочный соус",
    price: 690,
    image: "/img/menu/salad-shrimp.jpg",
  },
  {
    id: "salad-salmon",
    category: "salads",
    name: "Салат с лососем и апельсином",
    description: "Слабосолёный лосось, апельсин, перепелиное яйцо и пармезан",
    price: 690,
    image: "/img/menu/salad-salmon.jpg",
  },
  {
    id: "salad-greek",
    category: "salads",
    name: "Греческий салат",
    description: "Фета, маслины, томаты, огурец и красный лук",
    price: 520,
    image: "/img/menu/salad-greek.jpg",
  },
  {
    id: "salad-caesar",
    category: "salads",
    name: "Цезарь с курицей",
    description: "Куриное филе, микс салата, черри, пармезан и гренки",
    price: 590,
    image: "/img/menu/salad-caesar.jpg",
  },

  // ——— Супы ———
  {
    id: "lagman",
    category: "soups",
    name: "Лагман",
    description: "Вытянутая вручную лапша, мясо, сладкий перец и картофель в наваристом бульоне",
    price: 690,
    image: "/img/menu/lagman.jpg",
  },
  {
    id: "shurpa",
    category: "soups",
    name: "Шурпа",
    description: "Прозрачный бульон с мясом на кости, картофелем и морковью",
    price: 590,
    image: "/img/menu/shurpa.jpg",
  },
  {
    id: "kyufta-bozbash",
    category: "soups",
    name: "Кюфта-бозбаш",
    description: "Крупная тефтеля с рисом, нут и картофель в томатном бульоне",
    price: 590,
    image: "/img/menu/kyufta-bozbash.jpg",
  },
  {
    id: "borsch",
    category: "soups",
    name: "Борщ",
    description: "Наваристый борщ со свёклой и мясом, сметана и ржаные гренки",
    price: 450,
    image: "/img/menu/borsch.jpg",
  },
  {
    id: "tom-yam",
    category: "soups",
    name: "Том-ям",
    description: "Кокосовый бульон с шампиньонами, лаймом и кинзой, рис отдельно",
    price: 690,
    image: "/img/menu/tom-yam.jpg",
  },
  {
    id: "salmon-soup",
    category: "soups",
    name: "Уха из лосося",
    description: "Прозрачный бульон, лосось, картофель и овощи",
    price: 590,
    image: "/img/menu/salmon-soup.jpg",
  },
  {
    id: "pumpkin-soup",
    category: "soups",
    name: "Крем-суп из тыквы",
    description: "Тыква со сливками, свекольный соус и хрустящие тосты",
    price: 450,
    image: "/img/menu/pumpkin-soup.jpg",
  },

  // ——— Мангал и гриль ———
  {
    id: "shashlik-mushrooms",
    category: "mangal",
    name: "Шашлык из шампиньонов",
    description: "Крупные шампиньоны на углях, лаваш, маринованный лук и томатный соус",
    price: 590,
    image: "/img/menu/shashlik-mushrooms.jpg",
  },
  {
    id: "shashlik-shrimp",
    category: "mangal",
    name: "Шашлык из креветок",
    description: "Тигровые креветки на углях, лайм и бальзамический соус",
    price: 890,
    image: "/img/menu/shashlik-shrimp.jpg",
  },
  {
    id: "suluguni-lavash",
    category: "mangal",
    name: "Сулугуни на мангале",
    description: "Сыр в тонком лаваше, обжаренный на углях до румяной корочки",
    price: 590,
    image: "/img/menu/suluguni-lavash.jpg",
  },
  {
    id: "potato-mangal",
    category: "mangal",
    name: "Картофель на мангале",
    description: "Молодой картофель на шампуре, маринованный лук и томатный соус",
    price: 450,
    image: "/img/menu/potato-mangal.jpg",
  },
  {
    id: "veg-mangal",
    category: "mangal",
    name: "Овощи на мангале",
    description: "Баклажан, перец, помидор, кабачок и шампиньоны с дымком",
    price: 590,
    image: "/img/menu/veg-mangal.jpg",
  },
  {
    id: "dorado",
    category: "mangal",
    name: "Дорадо на гриле",
    description: "Дорадо целиком на углях, лайм и зёрна граната",
    price: 1290,
    image: "/img/menu/dorado.jpg",
  },
  {
    id: "seabass",
    category: "mangal",
    name: "Сибас на гриле",
    description: "Сибас целиком на углях, лайм и зёрна граната",
    price: 1290,
    image: "/img/menu/seabass.jpg",
  },
  {
    id: "salmon-steak",
    category: "mangal",
    name: "Стейк из лосося",
    description: "Стейк лосося на гриле, лайм и зёрна граната",
    price: 1190,
    image: "/img/menu/salmon-steak.jpg",
  },

  // ——— Горячие блюда ———
  {
    id: "shah-plov",
    category: "hot",
    name: "Шах-плов",
    description: "Плов с мясом и сухофруктами, запечённый в тонком лаваше",
    price: 990,
    image: "/img/menu/shah-plov.jpg",
  },
  {
    id: "chanakhi",
    category: "hot",
    name: "Чанахи",
    description: "Мясо, баклажан, картофель и томаты, томлённые в глиняном горшочке",
    price: 990,
    image: "/img/menu/chanakhi.jpg",
  },
  {
    id: "khinkal",
    category: "hot",
    name: "Хинкал",
    description: "Тонкие пласты теста, отварное мясо, томатный и чесночный соусы",
    price: 690,
    image: "/img/menu/khinkal.jpg",
  },
  {
    id: "ojakhuri",
    category: "hot",
    name: "Оджахури",
    description: "Мясо с картофелем, болгарским перцем и красным луком",
    price: 790,
    image: "/img/menu/ojakhuri.jpg",
  },
  {
    id: "chakhokhbili",
    category: "hot",
    name: "Чахохбили",
    description: "Мясо в томатном соусе с болгарским перцем и зеленью",
    price: 790,
    image: "/img/menu/chakhokhbili.jpg",
  },
  {
    id: "meat-cheese-pot",
    category: "hot",
    name: "Жаркое в горшочке под сыром",
    description: "Мясо с картофелем и томатами, запечённые под сырной корочкой",
    price: 790,
    image: "/img/menu/meat-cheese-pot.jpg",
  },
  {
    id: "manty",
    category: "hot",
    name: "Манты",
    description: "Сочные манты с рубленым мясом, сметанный соус",
    price: 490,
    image: "/img/menu/manty.jpg",
  },

  // ——— Выпечка и лепёшки ———
  {
    id: "khachapuri-imeretian",
    category: "bread",
    name: "Хачапури по-имеретински",
    description: "Тонкое тесто и щедрая сырная начинка, подаём горячим",
    price: 590,
    image: "/img/menu/khachapuri-imeretian.jpg",
  },
  {
    id: "kutaby",
    category: "bread",
    name: "Кутабы",
    description: "Тонкие лепёшки с начинкой, посыпаем сумахом",
    price: 390,
    image: "/img/menu/kutaby.jpg",
  },
  {
    id: "pite",
    category: "bread",
    name: "Пите",
    description: "Горячая лепёшка с мясом, помидором, огурцом и красным луком",
    price: 690,
    image: "/img/menu/pite.jpg",
  },
  {
    id: "shawarma",
    category: "bread",
    name: "Шаурма",
    description: "Мясо, свежие овощи и соус в тонком лаваше",
    price: 350,
    image: "/img/menu/shawarma.jpg",
  },

  // ——— Гарниры ———
  {
    id: "potato-fries",
    category: "garnish",
    name: "Картофель фри",
    description: "Хрустящий картофель с солью и паприкой",
    price: 250,
    image: "/img/menu/potato-fries.jpg",
  },
  {
    id: "potato-country",
    category: "garnish",
    name: "Картофель по-деревенски",
    description: "Дольки картофеля, запечённые со специями",
    price: 250,
    image: "/img/menu/potato-country.jpg",
  },
];

/** Блюда для витрины на главной. */
export const signatureIds = [
  "shah-plov",
  "khachapuri-imeretian",
  "shashlik-shrimp",
  "lagman",
  "chanakhi",
  "dolma",
];

export const signatureDishes = signatureIds
  .map((id) => dishes.find((d) => d.id === id))
  .filter((d): d is Dish => Boolean(d));

export function dishesByCategory(categoryId: string) {
  return dishes.filter((d) => d.category === categoryId);
}

export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}
