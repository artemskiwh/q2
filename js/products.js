// ===== TYAG МОСКВА — каталог товаров из Telegram-канала =====
// Категории: disposable, pod, mod, accessory, consumable

// Палитра вкусов: hue/hue2 — используется для SVG-иллюстрации вейпа.
// img — путь к фото (если есть), либо null → генерируется SVG-карточка.

const PUFFMI_FLAVORS = [
  { id: 'tobacco',            name: 'Tobacco',                ru: 'Табак',                          hue: 25,  hue2: 35  },
  { id: 'matcha-mint-ice',    name: 'Matcha Mint Ice',        ru: 'Матча, мята, лёд',               hue: 150, hue2: 190 },
  { id: 'acai-peach-pitaya',  name: 'Acai Peach Pitaya',      ru: 'Асаи, персик, питайя',           hue: 280, hue2: 340 },
  { id: 'watermelon-ice',     name: 'Watermelon Ice',         ru: 'Арбуз, лёд',                     hue: 340, hue2: 190 },
  { id: 'razz-cola',          name: 'Razz Cola',              ru: 'Малиновая кола',                 hue: 20,  hue2: 340 },
  { id: 'ginger-beer',        name: 'Ginger Beer',            ru: 'Имбирный эль',                   hue: 40,  hue2: 30  },
  { id: 'apple-pear',         name: 'Apple Pear',             ru: 'Яблоко, груша',                  hue: 80,  hue2: 50  },
  { id: 'salted-lemon',       name: 'Salted Lemon',           ru: 'Солёный лимон',                  hue: 55,  hue2: 35  },
  { id: 'lemon-mint',         name: 'Lemon Mint',             ru: 'Лимон, мята',                    hue: 60,  hue2: 150 },
  { id: 'mojito-lychee',      name: 'Mojito Lychee',          ru: 'Мохито, личи',                   hue: 140, hue2: 340 },
  { id: 'cherry-peach-lemon', name: 'Cherry Peach Lemon',     ru: 'Вишня, персик, лимон',           hue: 350, hue2: 35  },
  { id: 'green-mango',        name: 'Green Mango',            ru: 'Зелёное манго',                  hue: 80,  hue2: 50  },
  { id: 'mixed-prunus',       name: 'Mixed Prunus',           ru: 'Микс косточковых',               hue: 280, hue2: 340 },
  { id: 'strawberry-grapefruit', name: 'Strawberry Grapefruit', ru: 'Клубника, грейпфрут',          hue: 340, hue2: 15  },
  { id: 'mango-guava',        name: 'Mango Guava',            ru: 'Манго, гуава',                   hue: 35,  hue2: 100 },
  { id: 'raspberry-grape',    name: 'Raspberry Grape',        ru: 'Малина, виноград',               hue: 320, hue2: 270 },
  { id: 'pineapple-lemon-watermelon', name: 'Pineapple Lemon Watermelon', ru: 'Ананас, лимон, арбуз', hue: 50,  hue2: 340 },
  { id: 'siberian-berries',   name: 'Siberian Berries',       ru: 'Сибирские ягоды',                hue: 280, hue2: 350 },
  { id: 'apple-guava',        name: 'Apple Guava',            ru: 'Яблоко, гуава',                  hue: 60,  hue2: 100 },
  { id: 'strawberry-sundae',  name: 'Strawberry Sundae',      ru: 'Клубничный десерт',              hue: 340, hue2: 30  },
];

const SNOWWOLF_FLAVORS = [
  { id: 'cool-mint',          ru: 'Прохладная мята',         hue: 150, hue2: 190 },
  { id: 'blueberry-ice',      ru: 'Черника, лёд',            hue: 215, hue2: 250 },
  { id: 'watermelon-ice',     ru: 'Арбуз, лёд',              hue: 340, hue2: 190 },
  { id: 'strawberry-kiwi',    ru: 'Клубника, киви',          hue: 340, hue2: 100 },
  { id: 'mango-peach',        ru: 'Манго, персик',           hue: 35,  hue2: 20  },
  { id: 'grape-ice',          ru: 'Виноград, лёд',           hue: 280, hue2: 200 },
  { id: 'pineapple-coconut',  ru: 'Ананас, кокос',           hue: 50,  hue2: 40  },
  { id: 'energy-drink',       ru: 'Энергетик',               hue: 60,  hue2: 30  },
  { id: 'cherry-cola',        ru: 'Вишнёвая кола',           hue: 0,   hue2: 25  },
  { id: 'passion-fruit',      ru: 'Маракуйя',                hue: 30,  hue2: 60  },
  { id: 'lychee-ice',         ru: 'Личи, лёд',               hue: 340, hue2: 200 },
  { id: 'blackcurrant',       ru: 'Чёрная смородина',        hue: 280, hue2: 320 },
  { id: 'apple-pear',         ru: 'Яблоко, груша',           hue: 80,  hue2: 50  },
  { id: 'tropical-mix',       ru: 'Тропический микс',        hue: 25,  hue2: 320 },
  { id: 'mojito',             ru: 'Мохито',                  hue: 140, hue2: 180 },
];

const PRODUCTS = [
  // ===== INFLAVE AIR 6000 =====
  { id: 'inflave-air-6000-strawberry-miracle', name: 'INFLAVE AIR 6000', flavor: 'Клубничное чудо', price: 1190, category: 'disposable', brand: 'INFLAVE', puffs: 6000, hue: 340, hue2: 0, popular: true, deviceStyle: 'rounded-pod', shellColor: '#1a0a18', accent: '#FF3D78' },
  { id: 'inflave-air-6000-ripe-raspberry', name: 'INFLAVE AIR 6000', flavor: 'Спелая малина', price: 1190, category: 'disposable', brand: 'INFLAVE', puffs: 6000, hue: 320, hue2: 350, deviceStyle: 'rounded-pod', shellColor: '#1d0a18', accent: '#FF1A7A' },

  // ===== INFLAVE OMEGA 10000 =====
  { id: 'inflave-omega-10000-cranberry-mint', name: 'INFLAVE OMEGA 10000', flavor: 'Клюква, мята', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, hue: 165, hue2: 350, popular: true, deviceStyle: 'omega-bar', shellColor: '#003a36', accent: '#22D3C7' },
  { id: 'inflave-omega-10000-grape-aloe', name: 'INFLAVE OMEGA 10000', flavor: 'Виноград, алоэ', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, hue: 100, hue2: 280, deviceStyle: 'omega-bar', shellColor: '#1a3d10', accent: '#9BE026' },
  { id: 'inflave-omega-10000-strawberry-glow', name: 'INFLAVE OMEGA 10000', flavor: 'Клубничный взрыв', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, hue: 340, hue2: 15, deviceStyle: 'omega-bar', shellColor: '#3a0a18', accent: '#FF2E5C' },
  { id: 'inflave-omega-10000-mango', name: 'INFLAVE OMEGA 10000', flavor: 'Сочное манго', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, hue: 30, hue2: 50, deviceStyle: 'omega-bar', shellColor: '#3a2008', accent: '#FFA014' },

  // ===== ALOK 50000 =====
  { id: 'alok-50000-cranberry-ice', name: 'ALOK 50000', flavor: 'Клюква со льдом', price: 1990, category: 'disposable', brand: 'ALOK', puffs: 50000, hue: 0, hue2: 200, popular: true, deviceStyle: 'big-screen', shellColor: '#2a0a10', accent: '#E81E63' },
  { id: 'alok-50000-sour-peach-watermelon', name: 'ALOK 50000', flavor: 'Кислый персик, арбуз', price: 1990, category: 'disposable', brand: 'ALOK', puffs: 50000, hue: 30, hue2: 340, deviceStyle: 'big-screen', shellColor: '#2a1a08', accent: '#FF7A14' },
  { id: 'alok-60000-strawberry-watermelon', name: 'ALOK 60000', flavor: 'Strawberry Watermelon', price: 2190, category: 'disposable', brand: 'ALOK', puffs: 60000, hue: 340, hue2: 0, deviceStyle: 'big-screen', shellColor: '#280a18', accent: '#FF1A52' },

  // ===== WAKA =====
  { id: 'waka-somatch-mini', name: 'WAKA SoMatch Mini', flavor: 'Многоразовая система', price: 890, category: 'disposable', brand: 'WAKA', puffs: 1800, deviceStyle: 'slim-stick', shellColor: '#FAFAFA', accent: '#0EA5E9' },
  { id: 'waka-mystic-compact', name: 'WAKA Mystic Compact', flavor: 'Компактная одноразка', price: 690, category: 'disposable', brand: 'WAKA', puffs: 700, deviceStyle: 'slim-stick', shellColor: '#F0F0F0', accent: '#22D3EE' },
  { id: 'waka-sopro-pa10000', name: 'WAKA SoPro PA10000', flavor: '10 вкусов на выбор', price: 1490, category: 'disposable', brand: 'WAKA', puffs: 10000, deviceStyle: 'pod-screen', shellColor: '#101418', accent: '#06B6D4' },

  // ===== PUFFMI 9000 (одна модель — 20 вкусов) =====
  { id: 'puffmi-9000', name: 'PUFFMI 9000', flavor: '20 вкусов на выбор · смарт-дисплей', price: 1290, category: 'disposable', brand: 'PUFFMI', puffs: 9000, popular: true, deviceStyle: 'pod-screen', shellColor: '#0E0E14', accent: '#6BE3C8', flavors: PUFFMI_FLAVORS, hue: 165, hue2: 280 },

  // ===== SNOWWOLF SMART iC 15K =====
  { id: 'snowwolf-smart-ic-15k', name: 'SNOWWOLF SMART iC 15K', flavor: '15 вкусов · IPS-дисплей', price: 1690, category: 'disposable', brand: 'SNOWWOLF', puffs: 15000, popular: true, deviceStyle: 'big-screen', shellColor: '#10141C', accent: '#22D3C7', flavors: SNOWWOLF_FLAVORS, hue: 200, hue2: 280 },

  // ===== GEEK BAR =====
  { id: 'geek-bar-pulse-r', name: 'GEEK BAR PULSE R', flavor: 'Северное сияние · 25000 затяжек', price: 1990, category: 'disposable', brand: 'GEEK BAR', puffs: 25000, deviceStyle: 'big-screen', shellColor: '#0a1428', accent: '#7C3AED', hue: 230, hue2: 280 },
  { id: 'geek-bar-50000', name: 'GEEK BAR 50000', flavor: 'Двойной режим · 16K + 32K затяжек', price: 2390, category: 'disposable', brand: 'GEEK BAR', puffs: 50000, deviceStyle: 'big-screen', shellColor: '#0a1428', accent: '#3B82F6', hue: 215, hue2: 200 },

  // ===== GEEKVAPE PODS =====
  { id: 'geekvape-aegis-hero-5', name: 'GEEKVAPE AEGIS HERO 5', flavor: 'Pod-мод · защита IP68', price: 3290, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#E03020', accent: '#FF3D2E' },
  { id: 'geekvape-aegis-luxury', name: 'GEEKVAPE AEGIS LUXURY EDITION', flavor: 'Midnight Green · 1500 mAh', price: 3490, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#0F2A1E', accent: '#10B981' },
  { id: 'geekvape-aegis-boost-iii', name: 'GEEKVAPE AEGIS BOOST III KIT', flavor: 'Sapphire Blue · 5мл · 60W', price: 3690, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#0A1A3A', accent: '#3B82F6' },
  { id: 'geekvape-h45', name: 'GEEKVAPE H45', flavor: 'Light Green · 4мл · 45W', price: 2890, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#1F3A20', accent: '#7EE07A' },
  { id: 'geekvape-h45-classic', name: 'GEEKVAPE H45 CLASSIC', flavor: 'Sakura · 45W · 4мл', price: 2890, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#5C2A38', accent: '#F8A6BD' },
  { id: 'geekvape-aegis', name: 'GEEKVAPE AEGIS', flavor: 'Red & White · 1200 mAh', price: 3190, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#B22030', accent: '#FFFFFF' },

  // ===== АКСЕССУАРЫ =====
  { id: 'usb-c-cable', name: 'Кабель USB Type-C', flavor: 'Зарядка для вейпов · 1м', price: 290, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#1a1a1a', accent: '#9CA3AF' },
  { id: 'lanyard-strap', name: 'Шнурок-держатель', flavor: 'Универсальный, чёрный', price: 350, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#0c0c0c', accent: '#22D3C7' },
  { id: 'silicone-case', name: 'Силиконовый чехол', flavor: 'На одноразку · цвета на выбор', price: 450, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#1f1230', accent: '#A78BFA' },
  { id: 'cleaning-kit', name: 'Набор для чистки', flavor: 'Щёточки + микрофибра', price: 390, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#0a1a18', accent: '#22D3C7' },

  // ===== РАСХОДНИКИ =====
  { id: 'aegis-pod-cart', name: 'Картридж AEGIS', flavor: '0.4 Ом · 3 шт', price: 790, category: 'consumable', brand: 'GEEKVAPE', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#22D3C7' },
  { id: 'h45-pod-cart',   name: 'Картридж H45',   flavor: '0.8 Ом · 3 шт', price: 690, category: 'consumable', brand: 'GEEKVAPE', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#7EE07A' },
  { id: 'boost-pod-cart', name: 'Картридж BOOST', flavor: '0.4/0.6 Ом · 3 шт', price: 750, category: 'consumable', brand: 'GEEKVAPE', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#3B82F6' },
  { id: 'cotton-bacon',   name: 'Хлопок Cotton Bacon', flavor: 'Премиум · 10г', price: 490, category: 'consumable', brand: 'COTTON', deviceStyle: 'consumable', shellColor: '#181410', accent: '#F5C147' },
];

const CATEGORIES = [
  { id: 'disposable', title: 'Одноразовые',  icon: 'disposable' },
  { id: 'pod',        title: 'Многоразовые', icon: 'pod'        },
  { id: 'liquid',     title: 'Жидкости',     icon: 'liquid'     },
  { id: 'accessory',  title: 'Аксессуары',   icon: 'accessory'  },
  { id: 'consumable', title: 'Расходники',   icon: 'consumable' },
];

function getCategoryCount(catId) {
  return PRODUCTS.filter(p => p.category === catId).length;
}

function formatPrice(p) {
  return p.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽';
}

function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
