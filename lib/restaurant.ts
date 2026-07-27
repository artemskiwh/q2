/**
 * Единый конфиг ресторана.
 * ⚠️ Черновые данные — замените на реальные адрес, телефон и ссылки.
 */

export const restaurant = {
  name: "Pakhlava",
  tagline: "кухня высоких гор",
  legalName: "Ресторан кавказской кухни «Pakhlava»",
  description:
    "Ресторан кавказской кухни: мангал на живых углях, тандыр, домашние соленья и десерты по семейным рецептам.",

  phoneLabel: "+7 (495) 123-45-67",
  phoneHref: "+74951234567",

  email: "hello@pakhlava.ru",

  address: {
    street: "ул. Пятницкая, 12, стр. 1",
    city: "Москва",
    metro: "м. Новокузнецкая — 4 минуты пешком",
    mapUrl: "https://yandex.ru/maps/?text=Москва, улица Пятницкая, 12с1",
  },

  hours: [
    { days: "Понедельник — четверг", time: "12:00 — 00:00" },
    { days: "Пятница — суббота", time: "12:00 — 02:00" },
    { days: "Воскресенье", time: "12:00 — 23:00" },
  ],

  /** Последний слот бронирования — за час до закрытия. */
  booking: {
    openHour: 12,
    lastSlotHour: 22,
    slotStepMinutes: 30,
    maxGuestsOnline: 10,
    maxDaysAhead: 60,
    holdMinutes: 20,
  },

  socials: [
    { label: "Telegram", href: "https://t.me/", icon: "Telegram" as const },
    { label: "WhatsApp", href: "https://wa.me/74951234567", icon: "Whatsapp" as const },
    { label: "Instagram", href: "https://instagram.com/", icon: "Instagram" as const },
  ],
};

export type Hall = {
  id: string;
  name: string;
  seats: string;
  description: string;
  features: string[];
  image?: string;
};

export const halls: Hall[] = [
  {
    id: "main",
    name: "Основной зал",
    seats: "60 гостей",
    description:
      "Тёмный камень, тёплый свет ламп и открытый мангал — сердце ресторана, где слышно, как шипят угли.",
    features: ["Открытая кухня", "Живая музыка по пятницам", "Столы на 2–8 гостей"],
  },
  {
    id: "terrace",
    name: "Терраса",
    seats: "28 гостей",
    description:
      "Летняя веранда под виноградными лозами: пледы, лампы-гирлянды и вид на тихий переулок.",
    features: ["Работает с апреля по октябрь", "Можно с питомцами", "Зона для курения кальяна"],
  },
  {
    id: "private",
    name: "Каминный кабинет",
    seats: "до 16 гостей",
    description:
      "Отдельная комната с камином и большим общим столом — для семейных застолий и переговоров.",
    features: ["Отдельный вход", "Своё меню банкета", "Проектор и звук"],
  },
];

export type Occasion = { id: string; label: string };

export const occasions: Occasion[] = [
  { id: "none", label: "Просто ужин" },
  { id: "birthday", label: "День рождения" },
  { id: "date", label: "Свидание" },
  { id: "family", label: "Семейное застолье" },
  { id: "business", label: "Деловая встреча" },
  { id: "banquet", label: "Банкет" },
];

export type Value = { title: string; text: string };

export const values: Value[] = [
  {
    title: "Мангал на живых углях",
    text: "Только виноградная лоза и дуб. Мясо маринуем сутки — по рецепту, который повар привёз из Кахетии.",
  },
  {
    title: "Тандыр каждое утро",
    text: "Лаваш, чуду и самса выпекаются с шести утра. К вечернему столу приносим второй, свежий замес.",
  },
  {
    title: "Специи с рынка",
    text: "Уцхо-сунели, сумах, тархун и барбарис привозим напрямую — мелем перед сервисом, не храним молотыми.",
  },
  {
    title: "Пахлава дома",
    text: "Сорок слоёв теста вручную, грецкий орех и мёд из горных пасек. Отсюда и название.",
  },
];

export type Review = {
  name: string;
  text: string;
  source: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    name: "Марина К.",
    text: "Хинкали такие, что бульон приходится ловить. Каминный кабинет забронировали на десятерых — обслуживали так, будто мы одни в ресторане.",
    source: "Яндекс Карты",
    rating: 5,
  },
  {
    name: "Артём Д.",
    text: "Пришли за шашлыком, остались из-за пахлавы. Заказал столик онлайн за час — подтвердили за пару минут.",
    source: "2ГИС",
    rating: 5,
  },
  {
    name: "Нина С.",
    text: "Аджарский хачапури с настоящим сулугуни, а не с сырной смесью. Терраса вечером — отдельная история.",
    source: "Google",
    rating: 5,
  },
];
