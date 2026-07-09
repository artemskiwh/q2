// ICON — караоке-ресторан, Ростов-на-Дону
// Данные из карточки 2ГИС и официального меню заведения.

export const RESTAURANT = {
  name: "ICON",
  tagline: "Караоке-ресторан",
  city: "Ростов-на-Дону",
  address: "Социалистическая улица, 80",
  district: "Ленинский район",
  hours: "Ежедневно с 20:00 до 06:00",
  hoursShort: "20:00 – 06:00",
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

// ——— Барная карта (без фото, элегантный список) ———
export type Drink = { name: string; en?: string; price: number; price2?: number };
export type DrinkGroup = { title: string; note?: string; cols?: string; items: Drink[] };

export const BAR: DrinkGroup[] = [
  {
    title: "Авторские коктейли",
    note: "1.0 мл",
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
    title: "Коктейли",
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
      { name: "Aperol Spritz", price: 600 },
      { name: "Daiquiri", price: 600 },
      { name: "Long Island", price: 600 },
      { name: "Orgazm", price: 600 },
    ],
  },
  {
    title: "Шоты",
    items: [
      { name: "Passion Fruit Vanilla", price: 600 },
      { name: "Б-52", price: 600 },
    ],
  },
  {
    title: "Лимонады",
    note: "1.0 л",
    items: [
      { name: "Мохито", price: 750 },
      { name: "Огурец, лайм", price: 750 },
      { name: "Маракуйя, ваниль, ананас", price: 750 },
      { name: "Клубника, апельсин", price: 750 },
    ],
  },
  {
    title: "Безалкогольные",
    note: "1.0 / 0.33 л",
    items: [
      { name: "Сок в ассортименте", price: 600, price2: 200 },
      { name: "Морс", price: 600, price2: 200 },
      { name: "Кола ж/б", price: 250 },
      { name: "Фанта ж/б", price: 250 },
      { name: "Спрайт ж/б", price: 250 },
      { name: "Швепс ж/б", price: 250 },
      { name: "Ред Булл ж/б", price: 350 },
      { name: "Вода минеральная (газ / б.г)", price: 250 },
    ],
  },
  {
    title: "Чай",
    note: "0.45 л · подаётся с мёдом и джемом",
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
    title: "Вино белое / красное",
    note: "0.75 л / 125 мл",
    items: [
      { name: "Пино Гриджо (бел., Италия)", price: 3000, price2: 500 },
      { name: "Маре Гриль Виньо Верде (бел., Португалия)", price: 3000, price2: 500 },
      { name: "Ханс Баер Гевюрцтраминер (бел., Германия)", price: 3600, price2: 600 },
      { name: "Ла Линда Торронтес (бел., Аргентина)", price: 4200, price2: 700 },
      { name: "Шабли Эрве Азо (бел., Франция)", price: 7500, price2: 1250 },
      { name: "Кейп Ориджинал Пинотаж (кр., ЮАР)", price: 3000, price2: 500 },
      { name: "Трапиче Мальбек (кр., Аргентина)", price: 3300, price2: 550 },
      { name: "Ле Гран Нуар Пино Нуар (кр., Франция)", price: 4200, price2: 700 },
      { name: "Тенессети Шираз (кр., Австралия)", price: 6600, price2: 1100 },
      { name: "Кларандель Бай О Брион Бордо (кр.)", price: 7200, price2: 1200 },
    ],
  },
  {
    title: "Шампанское и игристое",
    note: "0.75 л",
    items: [
      { name: "Moët & Chandon (бел. брют)", price: 17000 },
      { name: "Veuve Clicquot (бел. брют)", price: 20000 },
      { name: "Био Био Бабблс (бел. брют, Италия)", price: 3700 },
      { name: "Кава Дос Капричос (бел. брют, Испания)", price: 3700 },
      { name: "Москато де Асти Канти (бел. слад., Италия)", price: 4300 },
      { name: "Вёв Амбаль Гранд Кюве Розе (роз. брют, Франция)", price: 6600 },
    ],
  },
  {
    title: "Виски",
    note: "0.7 л / 50 мл",
    items: [
      { name: "Johnnie Walker Red Label", price: 6300, price2: 450 },
      { name: "Johnnie Walker Black Label 12", price: 7700, price2: 550 },
      { name: "Johnnie Walker Gold Label", price: 14000, price2: 1000 },
      { name: "Jameson", price: 7000, price2: 500 },
      { name: "Chivas Regal 12", price: 9800, price2: 700 },
      { name: "Jack Daniel's", price: 7000, price2: 500 },
      { name: "Jim Beam", price: 7000, price2: 500 },
      { name: "Glenlivet 12", price: 11200, price2: 800 },
      { name: "Singleton 12", price: 14000, price2: 1000 },
      { name: "Glenfiddich", price: 16800, price2: 1200 },
      { name: "Macallan 12", price: 36400, price2: 2600 },
    ],
  },
  {
    title: "Ром / Текила",
    note: "0.7 л / 50 мл",
    items: [
      { name: "Botafogo Space", price: 6300, price2: 450 },
      { name: "Beach House Gold", price: 7000, price2: 500 },
      { name: "Havana Club Añejo", price: 7000, price2: 500 },
      { name: "Don Papa", price: 9100, price2: 650 },
      { name: "Zacapa 23 (Гватемала)", price: 16800, price2: 1200 },
      { name: "Olmeca Silver (Мексика)", price: 6300, price2: 450 },
      { name: "Olmeca Gold (Мексика)", price: 6300, price2: 450 },
      { name: "Espolon Blanco 100% Agava", price: 7700, price2: 550 },
      { name: "Gran Orendain Blanco", price: 9100, price2: 650 },
    ],
  },
  {
    title: "Водка / Джин",
    note: "0.5–0.7 л / 50 мл",
    items: [
      { name: "Beluga Noble", price: 3900, price2: 390 },
      { name: "Beluga Gold", price: 7500, price2: 750 },
      { name: "Органика Трюфель", price: 3700, price2: 370 },
      { name: "Absolut", price: 4500, price2: 450 },
      { name: "Мамонт", price: 4000, price2: 400 },
      { name: "Bittle Gin", price: 4900, price2: 350 },
      { name: "Citadelle", price: 6720, price2: 480 },
      { name: "Beefeater", price: 6300, price2: 450 },
      { name: "Roku", price: 11200, price2: 800 },
      { name: "Bulldog", price: 10500, price2: 750 },
    ],
  },
  {
    title: "Ликёры, вермут, настойки",
    note: "50 мл",
    items: [
      { name: "Jägermeister", price: 450 },
      { name: "Baileys", price: 450 },
      { name: "Absenta", price: 450 },
      { name: "Sambuca", price: 450 },
      { name: "Martini (Bianco / Rosso / Extra Dry)", price: 300 },
      { name: "Aperol", price: 400 },
      { name: "Campari", price: 400 },
      { name: "Настойка Онегин (вишня / курага / смородина / грейпфрут)", price: 450 },
    ],
  },
];

export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

// Реальные отзывы из карточки 2ГИС (рейтинг 4.8).
export const REVIEWS: Review[] = [
  {
    name: "Александр",
    date: "6 июля 2026",
    rating: 5,
    text: "Приехали из другого города, хотелось в караоке — и мы ни капли не прогадали с выбором! Оооочень красивая летняя веранда, отличный звук и атмосфера.",
  },
  {
    name: "Ангелина Скилкова",
    date: "6 июля 2026",
    rating: 5,
    text: "Безумно понравилась администратор Варвара ❤️ Невероятно красивая, нежная и очень добрая с гостями. Хочется ходить сюда снова и снова.",
  },
  {
    name: "Ширин Чумахидзе",
    date: "6 июля 2026",
    rating: 5,
    text: "Спасибо администратору Варваре, очень помогла со всеми вопросами! Всё на высшем уровне.",
  },
  {
    name: "Арина Биктимирова",
    date: "24 мая 2026",
    rating: 5,
    text: "Отличное место, прекрасная атмосфера, звук и музыка 🔥",
  },
  {
    name: "Елена Арепьева",
    date: "9 марта 2026",
    rating: 5,
    text: "Лучшее караоке в Ростове! Отметили 8 марта 🥰 Обязательно вернёмся.",
  },
  {
    name: "Саша Зайцева",
    date: "15 февраля 2026",
    rating: 5,
    text: "Хорошее место, красивый интерьер, вежливый и внимательный персонал. Еда вкусная, напитки хорошие. Можно и потанцевать, и попеть.",
  },
  {
    name: "Городской житель",
    date: "10 января 2026",
    rating: 5,
    text: "Всё супер. Отличная обстановка, доброжелательный персонал, хороший контингент. Рекомендую!",
  },
  {
    name: "Ekaterina Kirienko",
    date: "9 января 2026",
    rating: 5,
    text: "Посетила заведение с подружками и осталась в полном восторге! Музыкальное сопровождение на уровне, как и настройка звука.",
  },
  {
    name: "Дмитрий Иванов",
    date: "5 января 2026",
    rating: 5,
    text: "Замечательное заведение. Отличный персонал и классная музыка!",
  },
  {
    name: "Лилия Касперская",
    date: "18 сентября 2025",
    rating: 5,
    text: "Самый лучший звук в городе! Для настоящих ценителей и эстетов. Любим собираться здесь с друзьями попеть и классно провести вечер.",
  },
  {
    name: "Алина Черкашина",
    date: "15 ноября 2025",
    rating: 5,
    text: "Великолепное заведение, вкусная кухня, отличная акустика, быстрый и качественный сервис. 5 ⭐",
  },
  {
    name: "Евгения Сомова",
    date: "24 мая 2025",
    rating: 5,
    text: "Всё, что нужно для отличного вечера. Отметили день рождения, спели старые-добрые песни — всё уютно и на уровне.",
  },
];

// Форматирование цены: 1650 -> «1 650»
export function formatPrice(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
