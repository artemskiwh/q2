// ICON - караоке-ресторан, Ростов-на-Дону
// Данные из карточки 2ГИС и официального меню заведения.

export const RESTAURANT = {
  name: "ICON",
  tagline: "Караоке-ресторан",
  city: "Ростов-на-Дону",
  address: "Социалистическая улица, 80",
  district: "Ленинский район",
  hours: "Ежедневно с 20:00 до 06:00",
  hoursShort: "20:00 - 06:00",
  rating: 4.8,
  ratingCount: 237,
  reviewsCount: 224,
  phone: "+7 (961) 301-10-08",
  phoneHref: "tel:+79613011008",
  whatsapp: "https://wa.me/79613011008",
  telegram: "",
  instagram: "",
  gis: "https://go.2gis.com/R9af4",
};

export type Dish = {
  name: string;
  price: number;
  weight?: string;
  desc?: string;
  img: string; // slug -> /dishes/<slug>.webp
};

export type FoodCategory = {
  id: string;
  title: string;
  en: string;
  items: Dish[];
};

export const FOOD: FoodCategory[] = [
  {
    id: "starts",
    title: "Закуски",
    en: "Starts",
    items: [
      {
        name: "Брускетта с лососем, обожжённой моцареллой и томатами",
        price: 550,
        weight: "150 г",
        img: "bruschetta-salmon",
      },
      {
        name: "Брускетта с креветочным патэ и рукколой",
        price: 550,
        weight: "50 г",
        img: "bruschetta-shrimp",
      },
      {
        name: "Брускетта с рикоттой, грушей и орехами",
        price: 550,
        weight: "75 г",
        img: "bruschetta-ricotta",
      },
      {
        name: "Брускетта Ассорти",
        price: 1650,
        desc: "С лососем и моцареллой, с креветочным патэ и рукколой, с рикоттой, грушей и орехами",
        img: "bruschetta-assorti",
      },
      {
        name: "Креветочный паштет с хрустящей чиабаттой",
        price: 550,
        weight: "140 г",
        img: "shrimp-pate",
      },
      { name: "Спайси креветка", price: 550, weight: "150 г", img: "spicy-shrimp" },
      {
        name: "Ванголе в сырном соусе",
        price: 1300,
        weight: "340 г",
        img: "vongole-cheese",
      },
      {
        name: "Ванголе с томатами и травами",
        price: 1300,
        weight: "340 г",
        img: "vongole-tomato",
      },
      {
        name: "Жареный халуми с соусом из голубики",
        price: 900,
        weight: "150 г",
        img: "halloumi",
      },
      {
        name: "Сырное плато",
        price: 1500,
        weight: "350 г",
        desc: "Пармезан, пажитник, чеддер, дор блю, мёд, грецкий орех, виноград",
        img: "cheese-plate",
      },
      {
        name: "Фруктовое плато",
        price: 3500,
        weight: "1 кг",
        desc: "Инжир, голубика, дыня, виноград тёмный и зелёный, нектарины, красная смородина",
        img: "fruit-plate",
      },
      {
        name: "Мясное плато",
        price: 2500,
        weight: "300 г",
        desc: "Свинина, говядина, утка, курица, баранина вяленые, бастурма, обожжённая чиабатта",
        img: "meat-plate",
      },
      {
        name: "Соленья",
        price: 1000,
        weight: "400 г",
        desc: "Солёные огурцы и помидоры, квашеная капуста, перец цицак, чеснок",
        img: "pickles",
      },
    ],
  },
  {
    id: "salads",
    title: "Салаты",
    en: "Salads",
    items: [
      {
        name: "Боул с сёмгой",
        price: 550,
        weight: "240 г",
        desc: "Кус-кус, омлет, сырный мусс, битые огурцы, чука, томаты, устричный соус, чили, кунжут",
        img: "bowl-salmon",
      },
      { name: "Салат с копчёным беконом", price: 550, weight: "220 г", img: "salad-bacon" },
      {
        name: "Салат с хрустящими баклажанами, бураттой и грушами",
        price: 950,
        weight: "280 г",
        img: "salad-eggplant",
      },
      {
        name: "Вальдорф",
        price: 550,
        weight: "160 г",
        desc: "Яблоко, инжир, сельдерей, салат, виноград, орехи, заправка",
        img: "waldorf",
      },
      {
        name: "Боул с креветками",
        price: 550,
        weight: "250 г",
        desc: "Кус-кус, омлет, сырный мусс, битые огурцы, чука, томаты, устричный соус, чили, кунжут",
        img: "bowl-shrimp",
      },
    ],
  },
  {
    id: "pasta",
    title: "Паста",
    en: "Pasta",
    items: [
      { name: "Ризотто с морепродуктами", price: 900, weight: "300 г", img: "risotto" },
      {
        name: "Тальятелле с лососем и горошком",
        price: 900,
        weight: "340 г",
        img: "tagliatelle",
      },
      { name: "Карбонара", price: 550, weight: "240 г", img: "carbonara" },
      { name: "Паста с креветками", price: 750, weight: "270 г", img: "pasta-shrimp" },
    ],
  },
  {
    id: "hot",
    title: "Горячее",
    en: "Hot dishes",
    items: [
      {
        name: "Стейк из говядины с соусом из голубики",
        price: 950,
        weight: "340 г",
        img: "beef-steak",
      },
      {
        name: "Лосось су-вид со спайси соусом, бураттой и томатами",
        price: 1300,
        weight: "300 г",
        img: "salmon-sousvide",
      },
    ],
  },
  {
    id: "deserts",
    title: "Десерты",
    en: "Deserts",
    items: [
      { name: "Наполеон домашний", price: 550, weight: "300 г", img: "napoleon" },
      { name: "Мороженое", price: 550, weight: "200 г", img: "ice-cream" },
      { name: "Конфеты", price: 1000, img: "candy" },
    ],
  },
];

// --- Барная карта (без фото, элегантный список) ---
export type Drink = { name: string; en?: string; price: number; price2?: number };
export type DrinkGroup = {
  title: string;
  note?: string;
  kind?: "bar" | "wine";
  items: Drink[];
};

export const BAR: DrinkGroup[] = [
  {
    title: "Авторские коктейли",
    note: "1.0 мл",
    kind: "bar",
    items: [
      { name: "Honey Ginger Sour", price: 700 },
      { name: "Pomegranate Negroni", price: 700 },
      { name: "Hibiscus Porn Star", price: 700 },
      { name: "Popcorn", price: 700 },
      { name: "Lychee Spritz", price: 700 },
      { name: "Vanilla Espresso Martini", price: 700 },
      { name: "Strawberry Punch", price: 700 },
      { name: "Apple Sour", price: 700 },
      { name: "Berries Exotic", price: 700 },
      { name: "Peach Spritz", price: 700 },
    ],
  },
  {
    title: "Коктейльная карта",
    kind: "bar",
    items: [
      { name: "Americano", price: 600 },
      { name: "Negroni", price: 600 },
      { name: "Negroni Sbalyatto", price: 600 },
      { name: "White Russian", price: 600 },
      { name: "Manhattan", price: 600 },
      { name: "Bulvardie", price: 600 },
      { name: "Singapore Sling", price: 600 },
      { name: "Mary Pickford", price: 600 },
      { name: "Whiskey Sauer", price: 600 },
      { name: "Queen of Palm Trees", price: 600 },
      { name: "Aperol", price: 600 },
      { name: "Daiquiri", price: 600 },
      { name: "Long Island", price: 600 },
      { name: "Orgazm", price: 600 },
    ],
  },
  {
    title: "Шоты",
    kind: "bar",
    items: [
      { name: "Passion Fruit Vanilla", price: 600 },
      { name: "Б-52", price: 600 },
    ],
  },
  {
    title: "Лимонады",
    note: "1.0 л",
    kind: "bar",
    items: [
      { name: "Мохито", price: 750 },
      { name: "Огурец, лайм", price: 750 },
      { name: "Маракуйя, ваниль, ананас", price: 750 },
      { name: "Клубника, апельсин", price: 750 },
    ],
  },
  {
    title: "Чай",
    note: "0.45 л · с мёдом и джемом",
    kind: "bar",
    items: [
      { name: "Чёрный классический ассам", price: 500 },
      { name: "Чёрный с чабрецом", price: 500 },
      { name: "Зелёный классический", price: 500 },
      { name: "Зелёный с жасмином", price: 500 },
      { name: "Молочный улун", price: 500 },
      { name: "Наглый фрукт", price: 500 },
      { name: "Горный травяной", price: 500 },
      { name: "Матча", price: 500 },
    ],
  },
  {
    title: "Кофе",
    kind: "bar",
    items: [
      { name: "Espresso", price: 200 },
      { name: "Dopio Espresso", price: 250 },
      { name: "Americano", price: 200 },
      { name: "Cappuccino", price: 250 },
      { name: "Flat White", price: 300 },
      { name: "Latte", price: 300 },
      { name: "Raf", price: 300 },
      { name: "Ice Latte", price: 350 },
      { name: "Glacé", price: 350 },
    ],
  },
  {
    title: "Безалкогольные",
    note: "1.0 / 0.33 л",
    kind: "bar",
    items: [
      { name: "Сок в ассортименте", price: 600, price2: 200 },
      { name: "Морс", price: 600, price2: 200 },
      { name: "Кола ж/б", price: 250 },
      { name: "Фанта ж/б", price: 250 },
      { name: "Спрайт ж/б", price: 250 },
      { name: "Швепс ж/б", price: 250 },
      { name: "Ред Булл ж/б", price: 350 },
      { name: "Вода минеральная (газ / б/г)", price: 250 },
      { name: "Пиво в ассортименте (0.5 л)", price: 500 },
    ],
  },
  {
    title: "Виски · Johnnie Walker",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Джони Уокер Ред Лейбл", price: 6300, price2: 450 },
      { name: "Джони Уокер Блэк Лейбл 12 лет", price: 7700, price2: 550 },
      { name: "Джони Уокер Голд Лейбл", price: 14000, price2: 1000 },
    ],
  },
  {
    title: "Виски · Армения",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Бонкерс", price: 6300, price2: 450 },
      { name: "Бонкерс Эликсир 52", price: 6300, price2: 450 },
      { name: "Бонкерс Мёд Имбирь", price: 6300, price2: 450 },
    ],
  },
  {
    title: "Виски · Ирландия",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Джемесон", price: 7000, price2: 500 },
      { name: "Джемесон Апельсин", price: 7000, price2: 500 },
      { name: "Джемесон Блэк Баррел", price: 9100, price2: 650 },
      { name: "Прокламэйшн", price: 8400, price2: 600 },
      { name: "Наттер Джек", price: 7700, price2: 500 },
      { name: "Кёрреч", price: 9520, price2: 680 },
      { name: "Хайд 3", price: 7700, price2: 550 },
    ],
  },
  {
    title: "Виски · Шотландия",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Олд Смаглер", price: 6300, price2: 450 },
      { name: "Баллантайнс", price: 6300, price2: 450 },
      { name: "Чивас Ригал 12", price: 9800, price2: 700 },
    ],
  },
  {
    title: "Виски · Single Malts",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Гленливет 12", price: 11200, price2: 800 },
      { name: "Акентошн", price: 11200, price2: 800 },
      { name: "Блэднок", price: 14000, price2: 1000 },
      { name: "Синглтон 12", price: 14000, price2: 1000 },
      { name: "Гленфидик", price: 16800, price2: 1200 },
      { name: "Макаллан 12", price: 36400, price2: 2600 },
    ],
  },
  {
    title: "Виски · Америка",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Фрэнкс Фидл", price: 6300, price2: 450 },
      { name: "Джек Дэниелс", price: 7000, price2: 500 },
      { name: "Джек Дэниелс Хани", price: 7700, price2: 550 },
      { name: "Джек Дэниелс Джентельмен Джек", price: 9800, price2: 700 },
      { name: "Джек Дэниелс Эппл", price: 7000, price2: 500 },
      { name: "Джим Бим", price: 7000, price2: 500 },
      { name: "Джим Бим Ред Стаг", price: 7700, price2: 550 },
    ],
  },
  {
    title: "Ром",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Ботафого Спайсс", price: 6300, price2: 450 },
      { name: "Ботафого Блэк", price: 6300, price2: 450 },
      { name: "Бич Хаус Голд", price: 7000, price2: 500 },
      { name: "Бич Хаус Пинк", price: 7000, price2: 500 },
      { name: "Гавана Клаб Аньехо", price: 7000, price2: 500 },
      { name: "Легендарио Элексир", price: 6300, price2: 450 },
      { name: "Дон Папа", price: 9100, price2: 650 },
      { name: "Закапа 23 (Гватемала)", price: 16800, price2: 1200 },
    ],
  },
  {
    title: "Текила",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Диего Мария", price: 5600, price2: 400 },
      { name: "Ольмека Серебро (Мексика)", price: 6300, price2: 450 },
      { name: "Ольмека Голд (Мексика)", price: 6300, price2: 450 },
      { name: "Эсполон Бланко 100% Агава", price: 7700, price2: 550 },
      { name: "Эсполон Репосадо 100% Агава", price: 7700, price2: 550 },
      { name: "Батанга Бланко", price: 7000, price2: 500 },
      { name: "Курадо Бланко", price: 8400, price2: 600 },
      { name: "Курадо Бланко Куприата", price: 8400, price2: 600 },
      { name: "Гран Орендайн Бланко", price: 9100, price2: 650 },
    ],
  },
  {
    title: "Джин",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Битли", price: 4900, price2: 350 },
      { name: "Цитадель", price: 6720, price2: 480 },
      { name: "Биффитер", price: 6300, price2: 450 },
      { name: "Малфи Джин Кон Оранча", price: 6300, price2: 450 },
      { name: "Малфи Джин Роза", price: 6300, price2: 450 },
      { name: "Року", price: 11200, price2: 800 },
      { name: "Бульдог", price: 10500, price2: 750 },
      { name: "Портобелло Роуд", price: 11200, price2: 800 },
    ],
  },
  {
    title: "Водка",
    note: "0.5-0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Белуга Нобл", price: 3900, price2: 390 },
      { name: "Белуга Голд", price: 7500, price2: 750 },
      { name: "Органика Трюфель", price: 3700, price2: 370 },
      { name: "Органика Арктика Сибирь", price: 3500, price2: 350 },
      { name: "Органика Лайф", price: 6300, price2: 450 },
      { name: "Романов", price: 3500, price2: 350 },
      { name: "Мамонт", price: 4000, price2: 400 },
      { name: "Абсолют", price: 4500, price2: 450 },
      { name: "Абсолют Груша", price: 6300, price2: 450 },
      { name: "Абсолют Блэк Курантс", price: 6300, price2: 450 },
      { name: "Мон Блан", price: 5000, price2: 500 },
      { name: "Онегин", price: 4500, price2: 450 },
    ],
  },
  {
    title: "Настойки Онегин",
    note: "0.5 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Вишня", price: 4500, price2: 450 },
      { name: "Курага", price: 4500, price2: 450 },
      { name: "Черноплодка", price: 4500, price2: 450 },
      { name: "Смородина", price: 4500, price2: 450 },
      { name: "Грейпфрут", price: 4500, price2: 450 },
    ],
  },
  {
    title: "Ликёры",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Нива Кофе", price: 4900, price2: 350 },
      { name: "Нива Триппл Сек", price: 4900, price2: 350 },
      { name: "Нива Блю Кюрасао", price: 4900, price2: 350 },
      { name: "Ягермастер", price: 6300, price2: 450 },
      { name: "Бейлис", price: 6300, price2: 450 },
      { name: "Абсент", price: 6300, price2: 450 },
      { name: "Самбука", price: 6300, price2: 450 },
    ],
  },
  {
    title: "Вермут",
    note: "1.0 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Мартини Бьянко", price: 6000, price2: 300 },
      { name: "Мартини Экстра Драй", price: 6000, price2: 300 },
      { name: "Мартини Россо", price: 6000, price2: 300 },
      { name: "Мартини Росато", price: 6000, price2: 300 },
      { name: "Мартини Фиеро", price: 6000, price2: 300 },
      { name: "Чинзано Бьянко", price: 6000, price2: 300 },
      { name: "Чинзано Экстра Драй", price: 6000, price2: 300 },
      { name: "Чинзано Россо", price: 6000, price2: 300 },
    ],
  },
  {
    title: "Аперитивы",
    note: "1.0/0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Апероль", price: 8000, price2: 400 },
      { name: "Кампари", price: 8000, price2: 400 },
      { name: "Чемер", price: 4900, price2: 350 },
    ],
  },
  {
    title: "Коньяк · Франция",
    note: "0.7 л / 50 мл",
    kind: "bar",
    items: [
      { name: "Мартель ВС", price: 11200, price2: 800 },
      { name: "Мартель ВСОП", price: 18200, price2: 1300 },
      { name: "Мерле ВС", price: 7000, price2: 500 },
      { name: "Мерле ВСОП", price: 8400, price2: 600 },
      { name: "Бисквит ВС", price: 11200, price2: 800 },
      { name: "Бисквит ВСОП", price: 16800, price2: 1200 },
    ],
  },
  {
    title: "Белое вино",
    note: "0.75 л / 125 мл",
    kind: "wine",
    items: [
      { name: "Пино Гриджо (п/сух, Италия)", price: 3000, price2: 500 },
      { name: "Маре Гриль Виньо Верде (п/сух, Португалия)", price: 3000, price2: 500 },
      { name: "Ханс Баер Гевюрцтраминер (п/сл, Германия)", price: 3600, price2: 600 },
      { name: "Ла Линда Торронтес (сух, Аргентина)", price: 4200, price2: 700 },
      { name: "Шабли Эрве Азо (сух, Франция)", price: 7500, price2: 1250 },
    ],
  },
  {
    title: "Красное вино",
    note: "0.75 л / 125 мл",
    kind: "wine",
    items: [
      { name: "Кейп Ориджинал Пинотаж (сух, ЮАР)", price: 3000, price2: 500 },
      { name: "Трапиче Мальбек (сух, Аргентина)", price: 3300, price2: 550 },
      { name: "Ле Гран Нуар Пино Нуар (п/сух, Франция)", price: 4200, price2: 700 },
      { name: "Тенессети Шираз (сух, Австралия)", price: 6600, price2: 1100 },
      { name: "Кларандель Бай о Брион Бордо (сух)", price: 7200, price2: 1200 },
    ],
  },
  {
    title: "Розовое вино",
    note: "0.75 л / 125 мл",
    kind: "wine",
    items: [
      { name: "Розе Ригале Бракетто Де'Акве (сладкое)", price: 7500, price2: 1250 },
      { name: "Маре Гриль Виньо Верде (п/сух, Португалия)", price: 3600, price2: 600 },
    ],
  },
  {
    title: "Шампанское",
    note: "0.75 л",
    kind: "wine",
    items: [
      { name: "Моёт и Шандон (бел. брют)", price: 17000 },
      { name: "Вдова Клико (бел. брют)", price: 20000 },
    ],
  },
  {
    title: "Игристое",
    note: "0.75 л",
    kind: "wine",
    items: [
      { name: "Био Био Баблс (бел. брют, Италия)", price: 3700 },
      { name: "Кава Дос Капричос (бел. брют, Испания)", price: 3700 },
      { name: "Москато де Асти Канти (бел. слад., Италия)", price: 4300 },
      { name: "Вёв Амбаль Гранд Кюве Розе (роз. брют, Франция)", price: 6600 },
    ],
  },
];

export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
  count?: string; // author's review count as shown on 2GIS
};

// Реальные отзывы из карточки 2ГИС (рейтинг 4.8).
export const REVIEWS: Review[] = [
  { name: "Александр житель", date: "6 июля 2026", rating: 5, count: "1 отзыв",
    text: "Приехали из другого города, хотелось в караоке - и мы ни капли не прогадали с выбором! Оооочень красивая летняя веранда, отличный звук и атмосфера." },
  { name: "Ангелина Скилкова", date: "6 июля 2026", rating: 5, count: "1 отзыв",
    text: "Безумно понравилась администратор Варвара ❤️ Невероятно красивая, нежная и очень добрая с гостями. Хочется ходить сюда снова и снова." },
  { name: "Ширин Чумахидзе", date: "6 июля 2026", rating: 5, count: "1 отзыв",
    text: "Спасибо администратору Варваре, очень помогла со всеми вопросами! Всё на высшем уровне." },
  { name: "Софья Гуц", date: "24 мая 2026", rating: 5, count: "1 отзыв",
    text: "Отличное место, приятная атмосфера и музыка!" },
  { name: "Арина Биктимирова", date: "24 мая 2026", rating: 5, count: "1 отзыв",
    text: "Отличное место, прекрасная атмосфера, звук и музыка 🔥" },
  { name: "Виктория Жиманова", date: "7 мая 2026", rating: 5, count: "1 отзыв",
    text: "Пришла сюда с девочками в первый раз, очень довольна персоналом - весёлые, красивые, вежливые, внимательные. Место крутое, обязательно вернёмся!" },
  { name: "Елизавета Ничеговская", date: "9 марта 2026", rating: 5, count: "3 отзыва",
    text: "Отдыхали с подружкой!! Лучшее заведение ❤️" },
  { name: "Елена Арепьева", date: "9 марта 2026", rating: 5, count: "1 отзыв",
    text: "Лучшее караоке в Ростове! Отметили 8 марта 🥰 Обязательно вернёмся." },
  { name: "Саша Зайцева", date: "15 февраля 2026", rating: 5, count: "2 отзыва",
    text: "Хорошее место, красивый интерьер, вежливый и внимательный персонал. Еда вкусная, напитки хорошие. Можно и потанцевать, и попеть." },
  { name: "Ирина Кумпан", date: "18 января 2026", rating: 5, count: "2 отзыва",
    text: "Персонал вежливый и приятный! Обязательно вернёмся снова 🙏😉" },
  { name: "Городской житель", date: "10 января 2026", rating: 5, count: "1 отзыв",
    text: "Всё супер. Отличная обстановка, доброжелательный персонал, хороший контингент. Рекомендую!" },
  { name: "Варюша", date: "9 января 2026", rating: 5, count: "1 отзыв",
    text: "Моё любимое караоке в Ростове! Частенько прихожу сюда с подружками 🥰 Приятный и вежливый персонал, кухня радует." },
  { name: "Ekaterina Kirienko", date: "9 января 2026", rating: 5, count: "1 отзыв",
    text: "Посетила заведение с подружками и осталась в полном восторге! Музыкальное сопровождение на уровне, как и настройка звука." },
  { name: "Дмитрий Иванов", date: "5 января 2026", rating: 5, count: "3 отзыва",
    text: "Замечательное заведение. Отличный персонал и классная музыка!" },
  { name: "Светлана Смоляниченко", date: "5 января 2026", rating: 5, count: "1 отзыв",
    text: "Классное место, приезжаем с друзьями не первый раз ;)" },
  { name: "Валерия Ковтун", date: "23 декабря 2025", rating: 5, count: "1 отзыв",
    text: "Замечательное место, пленительная атмосфера! Спасибо 🥰" },
  { name: "Алина Черкашина", date: "15 ноября 2025", rating: 5, count: "1 отзыв",
    text: "Великолепное заведение, вкусная кухня, отличная акустика, быстрый и качественный сервис. 5 ⭐" },
  { name: "Анастасия Чмелева", date: "12 ноября 2025", rating: 5, count: "1 отзыв",
    text: "Всё отлично, хорошая атмосфера 👌" },
  { name: "Елена Z", date: "27 сентября 2025", rating: 5, count: "15 отзывов",
    text: "Звук отличный) отдохнули хорошо. Думаю, вернёмся ещё." },
  { name: "Лилия Касперская", date: "18 сентября 2025", rating: 5, count: "1 отзыв",
    text: "Самый лучший звук в городе! Для настоящих ценителей и эстетов. Любим собираться здесь с друзьями попеть и классно провести вечер." },
  { name: "Алексей Гурьянов", date: "4 июля 2025", rating: 5, count: "6 отзывов",
    text: "Хорошая атмосфера." },
  { name: "Евгения Сомова", date: "24 мая 2025", rating: 5, count: "8 отзывов",
    text: "Всё, что нужно для отличного вечера. Посидели у друга на дне рождения, спели старые-добрые песни - всё уютно и на уровне." },
];

// Форматирование цены: 1650 -> «1 650»
export function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
