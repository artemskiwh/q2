/**
 * Меню ресторана Pakhlava.
 * Фотография блюда добавляется полем `image` — путь от /public,
 * например "/img/menu/lagman.jpg". Пока снимка нет, карточка
 * показывает ровную плашку того же размера.
 */

export type DishTag = "hit" | "spicy" | "veg" | "new" | "chef";

export const TAG_LABELS: Record<DishTag, string> = {
  hit: "Хит",
  spicy: "Остро",
  veg: "Вегетарианское",
  new: "Новинка",
  chef: "Выбор шефа",
};

export type Dish = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  weight?: string;
  tags?: DishTag[];
  image?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle: string;
};

export const categories: MenuCategory[] = [
  { id: "zakuski", name: "Закуски с гор", subtitle: "Соленья, сыры и то, с чего начинается стол" },
  { id: "salads", name: "Салаты", subtitle: "Зелень, гранат и грецкий орех" },
  { id: "soups", name: "Супы", subtitle: "На кости, на бульоне, на медленном огне" },
  { id: "khinkali", name: "Хинкали", subtitle: "Лепим вручную, двадцать складок на каждом" },
  { id: "mangal", name: "Мангал", subtitle: "Живые угли виноградной лозы и дуба" },
  { id: "hot", name: "Горячие блюда", subtitle: "Казан, кеци и чугунная сковорода" },
  { id: "bread", name: "Тандыр и хачапури", subtitle: "Тесто ставим в шесть утра" },
  { id: "desserts", name: "Десерты", subtitle: "Пахлава, за которой мы назвались" },
  { id: "drinks", name: "Напитки", subtitle: "Горные травы, компоты и вино" },
];

export const dishes: Dish[] = [
  // ——— Закуски ———
  {
    id: "cheese-batter",
    category: "zakuski",
    name: "Сыр в кляре",
    description: "Сулугуни в хрустящем кляре, подаём горячим",
    price: 520,
    weight: "180 г",
    image: "/img/menu/cheese-batter.jpg",
  },
  {
    id: "pkhali",
    category: "zakuski",
    name: "Ассорти пхали",
    description: "Шпинат, свёкла и молодая крапива с грецким орехом, гранатовые зёрна",
    price: 690,
    weight: "260 г",
    tags: ["veg", "hit"],
  },
  {
    id: "sulguni",
    category: "zakuski",
    name: "Сыры Кавказа",
    description: "Сулугуни, копчёный чечил, имеретинский и надуги с мятой, мёд и орех",
    price: 890,
    weight: "300 г",
    tags: ["veg"],
  },
  {
    id: "solenya",
    category: "zakuski",
    name: "Соленья бочковые",
    description: "Джонджоли, черемша, огурцы, помидоры и острый перец домашнего засола",
    price: 540,
    weight: "320 г",
    tags: ["veg", "spicy"],
  },
  {
    id: "badrijani",
    category: "zakuski",
    name: "Бадриджани",
    description: "Баклажаны с ореховой пастой, чесноком и кинзой, свёрнутые рулетами",
    price: 620,
    weight: "220 г",
    tags: ["veg"],
  },
  {
    id: "basturma",
    category: "zakuski",
    name: "Бастурма и суджук",
    description: "Вяленая говядина в чамане, острая колбаса, тонкий лаваш",
    price: 780,
    weight: "180 г",
    tags: ["spicy"],
  },
  {
    id: "dolma-cold",
    category: "zakuski",
    name: "Долма в виноградном листе",
    description: "Говядина с рисом и зеленью, соус мацони с чесноком",
    price: 720,
    weight: "250 г",
    tags: ["hit"],
  },

  // ——— Салаты ———
  {
    id: "olivie",
    category: "salads",
    name: "Оливье",
    description: "Отварная говядина, картофель, солёный огурец и яйцо, домашний майонез",
    price: 490,
    weight: "250 г",
    image: "/img/menu/olivie.jpg",
  },
  {
    id: "olivie-salmon",
    category: "salads",
    name: "Оливье с лососем",
    description: "Тот же салат, но со слабосолёным лососем и хрустящими чипсами из водорослей",
    price: 690,
    weight: "250 г",
    image: "/img/menu/olivie-salmon.jpg",
  },
  {
    id: "salad-beetroot",
    category: "salads",
    name: "Салат со свёклой и яблоком",
    description: "Печёная свёкла, яблоко, шпинат, грецкий орех и сливочная заправка",
    price: 590,
    weight: "240 г",
    image: "/img/menu/salad-beetroot.jpg",
  },
  {
    id: "salad-tbilisi",
    category: "salads",
    name: "Тбилисский с говядиной",
    description: "Отварная говядина, редис, помидор, яйцо и зелень — тот самый, с фирменного фото",
    price: 790,
    weight: "290 г",
    tags: ["hit", "chef"],
  },
  {
    id: "salad-village",
    category: "salads",
    name: "Деревенский с сулугуни",
    description: "Помидоры бычье сердце, огурцы, красный лук, сулугуни и нерафинированное масло",
    price: 640,
    weight: "300 г",
    tags: ["veg"],
  },
  {
    id: "salad-nut",
    category: "salads",
    name: "Салат с ореховой заправкой",
    description: "Молодая капуста, зелёная фасоль, грецкий орех, винный уксус",
    price: 590,
    weight: "260 г",
    tags: ["veg"],
  },
  {
    id: "salad-lamb",
    category: "salads",
    name: "Тёплый салат с бараниной",
    description: "Обжаренная корейка, печёный перец, руккола, гранатовый соус наршараб",
    price: 890,
    weight: "280 г",
    tags: ["new"],
  },

  // ——— Супы ———
  {
    id: "lagman",
    category: "soups",
    name: "Лагман",
    description: "Вытянутая вручную лапша, говядина, сладкий перец и картофель в наваристом бульоне",
    price: 690,
    weight: "400 г",
    image: "/img/menu/lagman.jpg",
  },
  {
    id: "kharcho",
    category: "soups",
    name: "Харчо",
    description: "Говядина на кости, рис, тклапи и грецкий орех, много чеснока и кинзы",
    price: 620,
    weight: "350 г",
    tags: ["spicy", "hit"],
  },
  {
    id: "chikhirtma",
    category: "soups",
    name: "Чихиртма",
    description: "Куриный бульон, загущённый яйцом, с кинзой и белым винным уксусом",
    price: 540,
    weight: "350 г",
  },
  {
    id: "khash",
    category: "soups",
    name: "Хаш",
    description: "Наваристый бульон томим двенадцать часов. Подаём по субботам с утра",
    price: 690,
    weight: "400 г",
  },
  {
    id: "lentil",
    category: "soups",
    name: "Чечевичный с копчёностями",
    description: "Красная чечевица, томлёный лук, сумах и мята",
    price: 480,
    weight: "330 г",
  },

  // ——— Хинкали ———
  {
    id: "khinkali-beef",
    category: "khinkali",
    name: "Хинкали с говядиной и свининой",
    description: "Классические, с бульоном внутри. Чёрный перец подаём отдельно",
    price: 130,
    weight: "1 шт. / 90 г",
    tags: ["hit"],
  },
  {
    id: "khinkali-lamb",
    category: "khinkali",
    name: "Хинкали с бараниной",
    description: "Рубленая баранина с курдюком, зира и много зелени",
    price: 150,
    weight: "1 шт. / 90 г",
  },
  {
    id: "khinkali-cheese",
    category: "khinkali",
    name: "Хинкали с сулугуни",
    description: "Тянущийся сыр и топлёное масло",
    price: 130,
    weight: "1 шт. / 85 г",
    tags: ["veg"],
  },
  {
    id: "khinkali-mushroom",
    category: "khinkali",
    name: "Хинкали с грибами",
    description: "Белые грибы, лук и тимьян, сметанный соус",
    price: 140,
    weight: "1 шт. / 85 г",
    tags: ["veg", "new"],
  },
  {
    id: "khinkali-fried",
    category: "khinkali",
    name: "Жареные хинкали",
    description: "Вчерашние — по традиции обжариваем до хруста. Подаём с мацони",
    price: 160,
    weight: "1 шт. / 90 г",
  },

  // ——— Мангал ———
  {
    id: "shashlik-mushrooms",
    category: "mangal",
    name: "Шашлык из шампиньонов",
    description: "Крупные шампиньоны на углях, лаваш, маринованный лук и томатный соус",
    price: 590,
    weight: "220 г",
    image: "/img/menu/shashlik-mushrooms.jpg",
  },
  {
    id: "shashlik-shrimp",
    category: "mangal",
    name: "Шашлык из креветок",
    description: "Тигровые креветки на углях, лайм и бальзамический соус",
    price: 890,
    weight: "180 г",
    image: "/img/menu/shashlik-shrimp.jpg",
  },
  {
    id: "suluguni-lavash",
    category: "mangal",
    name: "Сулугуни на мангале",
    description: "Сыр в тонком лаваше, обжаренный на углях до румяной корочки",
    price: 590,
    weight: "200 г",
    image: "/img/menu/suluguni-lavash.jpg",
  },
  {
    id: "potato-mangal",
    category: "mangal",
    name: "Картофель на мангале",
    description: "Молодой картофель на шампуре, маринованный лук и томатный соус",
    price: 450,
    weight: "250 г",
    image: "/img/menu/potato-mangal.jpg",
  },
  {
    id: "shashlik-lamb",
    category: "mangal",
    name: "Шашлык из бараньей корейки",
    description: "Каре на кости, маринад из лука и горных трав, печёный лук и наршараб",
    price: 1290,
    weight: "250 г",
    tags: ["hit", "chef"],
  },
  {
    id: "shashlik-pork",
    category: "mangal",
    name: "Шашлык из свиной шеи",
    description: "Сутки в луковом маринаде, подаём с томатным соусом и лавашом",
    price: 890,
    weight: "250 г",
  },
  {
    id: "lula-lamb",
    category: "mangal",
    name: "Люля-кебаб из баранины",
    description: "Рубленое мясо с курдюком, лук и зира, сумах на срезе",
    price: 790,
    weight: "220 г",
    tags: ["hit"],
  },
  {
    id: "lula-chicken",
    category: "mangal",
    name: "Люля-кебаб из курицы",
    description: "Нежное филе с зеленью и паприкой, соус мацони",
    price: 620,
    weight: "220 г",
  },
  {
    id: "chicken-tabaka",
    category: "mangal",
    name: "Цыплёнок табака",
    description: "Под прессом до хрустящей корочки, чесночный соус ниорцкали",
    price: 1150,
    weight: "550 г",
  },
  {
    id: "sturgeon",
    category: "mangal",
    name: "Осетрина на углях",
    description: "Стейк осетра, лимон, соус ткемали из зелёной алычи",
    price: 1690,
    weight: "230 г",
    tags: ["chef"],
  },
  {
    id: "veg-mangal",
    category: "mangal",
    name: "Овощи с мангала",
    description: "Баклажан, перец, помидор, кабачок и шампиньоны с дымком",
    price: 590,
    weight: "300 г",
    image: "/img/menu/veg-mangal.jpg",
    tags: ["veg"],
  },
  {
    id: "mangal-set",
    category: "mangal",
    name: "Ассорти мангала на компанию",
    description: "Корейка, люля, свиная шея, куриное бедро, овощи и лаваш",
    price: 3900,
    weight: "1200 г",
    tags: ["hit"],
  },

  // ——— Горячие блюда ———
  {
    id: "khinkal",
    category: "hot",
    name: "Хинкал",
    description: "Тонкие пласты теста, отварное мясо, томатный и чесночный соусы",
    price: 690,
    weight: "400 г",
    image: "/img/menu/khinkal.jpg",
  },
  {
    id: "chanakhi",
    category: "hot",
    name: "Чанахи в глиняном горшочке",
    description: "Баранина, баклажан, картофель и томаты, томлённые в печи два часа",
    price: 990,
    weight: "450 г",
    image: "/img/menu/chanakhi.jpg",
    tags: ["chef"],
  },
  {
    id: "chakhokhbili",
    category: "hot",
    name: "Чахохбили",
    description: "Курица в томатах с луком, кинзой и хмели-сунели",
    price: 820,
    weight: "400 г",
  },
  {
    id: "ojakhuri",
    category: "hot",
    name: "Оджахури",
    description: "Свинина с картофелем на кеци, маринованный лук и острый перец",
    price: 890,
    weight: "420 г",
    tags: ["spicy"],
  },
  {
    id: "plov",
    category: "hot",
    name: "Плов с бараниной",
    description: "Девзира, курдюк, айва и головка чеснока. Готовим в казане партиями",
    price: 890,
    weight: "400 г",
    tags: ["hit"],
  },
  {
    id: "dolma-hot",
    category: "hot",
    name: "Долма по-домашнему",
    description: "Молодой виноградный лист, говядина с рисом, топлёное масло",
    price: 780,
    weight: "320 г",
  },
  {
    id: "kupaty",
    category: "hot",
    name: "Купаты",
    description: "Домашние колбаски со специями, обжаренные до румяной корочки",
    price: 690,
    weight: "260 г",
    tags: ["spicy"],
  },

  // ——— Тандыр и хачапури ———
  {
    id: "pite",
    category: "bread",
    name: "Пите",
    description: "Горячая лепёшка с мясом, помидором, огурцом и красным луком, обжаренная на гриле",
    price: 690,
    weight: "350 г",
    image: "/img/menu/pite.jpg",
  },
  {
    id: "khachapuri-adjarian",
    category: "bread",
    name: "Хачапури по-аджарски",
    description: "Лодочка с имеретинским сыром, желток и кусок сливочного масла",
    price: 690,
    weight: "380 г",
    tags: ["hit", "veg"],
  },
  {
    id: "khachapuri-imeretian",
    category: "bread",
    name: "Хачапури по-имеретински",
    description: "Круглый, с тонким тестом и щедрым сыром",
    price: 620,
    weight: "400 г",
    tags: ["veg"],
  },
  {
    id: "khachapuri-megrelian",
    category: "bread",
    name: "Хачапури по-мегрельски",
    description: "С сыром внутри и румяной сырной шапкой сверху",
    price: 720,
    weight: "420 г",
    tags: ["veg"],
  },
  {
    id: "chudu",
    category: "bread",
    name: "Чуду с мясом",
    description: "Тонкая дагестанская лепёшка с рубленой бараниной и луком",
    price: 480,
    weight: "250 г",
  },
  {
    id: "lavash",
    category: "bread",
    name: "Лаваш из тандыра",
    description: "Тонкий, горячий, с кунжутом. Приносим сразу из печи",
    price: 180,
    weight: "200 г",
    tags: ["veg"],
  },
  {
    id: "samsa",
    category: "bread",
    name: "Самса с бараниной",
    description: "Слоёное тесто, рубленое мясо и курдюк, чёрный тмин",
    price: 320,
    weight: "1 шт. / 150 г",
  },

  // ——— Десерты ———
  {
    id: "baklava",
    category: "desserts",
    name: "Пахлава Pakhlava",
    description: "Сорок слоёв теста вручную, грецкий орех и горный мёд. Наш автограф",
    price: 480,
    weight: "180 г",
    tags: ["hit", "chef"],
  },
  {
    id: "churchkhela",
    category: "desserts",
    name: "Чурчхела",
    description: "Виноградный сок и орехи, вялим сами — три вкуса на выбор",
    price: 320,
    weight: "120 г",
    tags: ["veg"],
  },
  {
    id: "pelamushi",
    category: "desserts",
    name: "Пеламуши",
    description: "Густой виноградный крем с кукурузной мукой и орехом",
    price: 390,
    weight: "160 г",
    tags: ["veg"],
  },
  {
    id: "napoleon-kavkaz",
    category: "desserts",
    name: "Медовик на горном мёде",
    description: "Тонкие коржи, сметанный крем, грецкий орех",
    price: 420,
    weight: "170 г",
    tags: ["veg"],
  },
  {
    id: "ice-mulberry",
    category: "desserts",
    name: "Мороженое на тутовом сиропе",
    description: "Домашнее сливочное с шелковицей и фисташкой",
    price: 360,
    weight: "150 г",
    tags: ["veg", "new"],
  },

  // ——— Напитки ———
  {
    id: "tea-mountain",
    category: "drinks",
    name: "Горный чай в чайнике",
    description: "Чабрец, душица, шиповник и мята — на двоих",
    price: 590,
    weight: "800 мл",
    tags: ["veg", "hit"],
  },
  {
    id: "compote",
    category: "drinks",
    name: "Компот из кизила",
    description: "Домашний, с корицей. Подаём холодным в графине",
    price: 420,
    weight: "700 мл",
    tags: ["veg"],
  },
  {
    id: "tarhun",
    category: "drinks",
    name: "Лимонад тархун",
    description: "На настоящем эстрагоне, без красителей",
    price: 350,
    weight: "400 мл",
    tags: ["veg"],
  },
  {
    id: "ayran",
    category: "drinks",
    name: "Айран",
    description: "Домашний, с солью и мятой",
    price: 280,
    weight: "300 мл",
    tags: ["veg"],
  },
  {
    id: "wine-saperavi",
    category: "drinks",
    name: "Саперави, Кахетия",
    description: "Сухое красное, бокал / бутылка 750 мл — 2900 ₽",
    price: 590,
    weight: "150 мл",
  },
  {
    id: "wine-rkatsiteli",
    category: "drinks",
    name: "Ркацители квеври",
    description: "Оранжевое, выдержка в квеври. Бокал / бутылка 750 мл — 3400 ₽",
    price: 690,
    weight: "150 мл",
    tags: ["chef"],
  },
  {
    id: "chacha",
    category: "drinks",
    name: "Чача домашняя",
    description: "Настаиваем на кизиле или на груше",
    price: 390,
    weight: "50 мл",
  },
];

/** Блюда для витрины на главной. */
export const signatureIds = [
  "chanakhi",
  "khinkal",
  "lagman",
  "shashlik-shrimp",
  "olivie",
  "suluguni-lavash",
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
