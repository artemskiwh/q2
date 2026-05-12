// ===== TYAG МОСКВА — каталог товаров из Telegram-канала =====
// Категории: disposable, pod, liquid, accessory, consumable

// --- Вкусы для DUALL SALT (38 вкусов, 2% и 5%) ---
const DUALL_FLAVORS = [
  { id: 'sprite-watermelon-lime',   ru: 'Спрайт, арбуз, лайм',         hue: 100, hue2: 350 },
  { id: 'frosty-lychee',            ru: 'Морозный личи',               hue: 340, hue2: 200 },
  { id: 'cookie-caramel',           ru: 'Печенье, карамель',           hue: 30,  hue2: 25  },
  { id: 'frosty-melon',             ru: 'Морозная дыня',               hue: 55,  hue2: 180 },
  { id: 'lychee-guava',             ru: 'Личи, гуава',                 hue: 340, hue2: 100 },
  { id: 'tobacco-cookie',           ru: 'Табак, печенье',              hue: 25,  hue2: 35  },
  { id: 'raspberry-yogurt',         ru: 'Малиновый йогурт',            hue: 340, hue2: 50  },
  { id: 'mint-lollipop-eucalyptus', ru: 'Мятные леденцы, эвкалипт',    hue: 150, hue2: 180 },
  { id: 'melon-passionfruit',       ru: 'Дыня, маракуйя',              hue: 55,  hue2: 35  },
  { id: 'strawberry-icecream',      ru: 'Клубничное мороженое',        hue: 340, hue2: 30  },
  { id: 'kiwi-guava',               ru: 'Киви, гуава',                 hue: 80,  hue2: 100 },
  { id: 'berry-tea',                ru: 'Ягодный чай',                 hue: 350, hue2: 25  },
  { id: 'pineapple-kiwi',           ru: 'Ананас, киви',                hue: 50,  hue2: 80  },
  { id: 'frosty-blackcurrant',      ru: 'Холодная смородина',          hue: 280, hue2: 200 },
  { id: 'mango-pineapple',          ru: 'Манго, ананас',               hue: 35,  hue2: 50  },
  { id: 'blackcurrant-raspberry-apple', ru: 'Смородина, малина, яблоко', hue: 280, hue2: 100 },
  { id: 'strawberry-orange-passionfruit', ru: 'Клубника, апельсин, маракуйя', hue: 340, hue2: 25 },
  { id: 'mint-gum',                 ru: 'Мятная жвачка',               hue: 150, hue2: 170 },
  { id: 'berry-mors',               ru: 'Ягодный морс',                hue: 340, hue2: 350 },
  { id: 'icy-watermelon-melon',     ru: 'Ледяной арбуз, дыня',         hue: 340, hue2: 55  },
  { id: 'frosty-redbull',           ru: 'Морозный ред булл',           hue: 200, hue2: 220 },
  { id: 'frosty-pineapple',         ru: 'Морозный ананас',             hue: 50,  hue2: 200 },
  { id: 'yogurt-peach-passionfruit', ru: 'Йогурт, персик, маракуйя',   hue: 25,  hue2: 35  },
  { id: 'mango-orange-mint',        ru: 'Манго, апельсин, мята',       hue: 30,  hue2: 150 },
  { id: 'sour-lemon-kiwi',          ru: 'Кислый лимон, киви',          hue: 60,  hue2: 80  },
  { id: 'lemonade-grapefruit',      ru: 'Лимонад с грейпфрутом',       hue: 55,  hue2: 350 },
  { id: 'icy-tarhun',               ru: 'Ледяной тархун',              hue: 130, hue2: 180 },
  { id: 'mango-kumquat',            ru: 'Манго, кумкват',              hue: 30,  hue2: 45  },
  { id: 'fruit-marmalade',          ru: 'Фруктовый мармелад',          hue: 0,   hue2: 50  },
  { id: 'apple-grape',              ru: 'Яблоко, виноград',            hue: 80,  hue2: 280 },
  { id: 'icy-cola',                 ru: 'Ледяная кола',                hue: 15,  hue2: 200 },
  { id: 'exotic-fruits',            ru: 'Экзотические фрукты',         hue: 25,  hue2: 320 },
  { id: 'apple-raspberry',          ru: 'Яблоко, малина',              hue: 80,  hue2: 340 },
  { id: 'icy-mango',                ru: 'Ледяное манго',               hue: 35,  hue2: 200 },
  { id: 'tea-grapefruit-berries',   ru: 'Чай, грейпфрут, ягоды',       hue: 350, hue2: 0   },
  { id: 'strawberry-yogurt',        ru: 'Клубничный йогурт',           hue: 340, hue2: 30  },
  { id: 'icy-mango-orange',         ru: 'Ледяное манго, апельсин',     hue: 30,  hue2: 200 },
  { id: 'blueberry-cheesecake',     ru: 'Черничный чизкейк',           hue: 215, hue2: 40  },
];

// --- Вкусы для FIZZY Great 10000 (20 вкусов) ---
const FIZZY_FLAVORS = [
  { id: 'banana',                   ru: 'Банан',                       hue: 55,  hue2: 30  },
  { id: 'blackcurrant',             ru: 'Чёрная смородина',            hue: 280, hue2: 320 },
  { id: 'red-apple-berries',        ru: 'Красное яблоко, ягоды',       hue: 0,   hue2: 340 },
  { id: 'aloe-mango-melon',         ru: 'Алоэ, манго, дыня',           hue: 100, hue2: 50  },
  { id: 'blueberry-pomegranate',    ru: 'Черника, гранат',             hue: 215, hue2: 350 },
  { id: 'pineapple',                ru: 'Ананас',                      hue: 50,  hue2: 60  },
  { id: 'lychee-lemon',             ru: 'Личи, лимон',                 hue: 340, hue2: 55  },
  { id: 'orange-pomegranate',       ru: 'Апельсин, гранат',            hue: 25,  hue2: 350 },
  { id: 'watermelon',               ru: 'Арбуз',                       hue: 340, hue2: 0   },
  { id: 'cappuccino',               ru: 'Капучино',                    hue: 25,  hue2: 30  },
  { id: 'grape-pineapple-ice',      ru: 'Виноград, ананасовый лёд',    hue: 280, hue2: 50  },
  { id: 'blackberry-mulberry',      ru: 'Ежевика, шелковица',          hue: 280, hue2: 320 },
  { id: 'energy-drink',             ru: 'Энергетик',                   hue: 60,  hue2: 30  },
  { id: 'blueberry-raspberry-cherry', ru: 'Черника, малина, вишня',    hue: 215, hue2: 340 },
  { id: 'green-olive-mint',         ru: 'Зелёная оливковая мята',      hue: 80,  hue2: 150 },
  { id: 'rainbow-candy',            ru: 'Радужная конфета',            hue: 320, hue2: 50  },
  { id: 'peach',                    ru: 'Персик',                      hue: 25,  hue2: 35  },
  { id: 'cranberry-soda',           ru: 'Клюквенная сода',             hue: 340, hue2: 200 },
  { id: 'pineapple-peach-passionfruit', ru: 'Ананас, персик, маракуйя', hue: 50, hue2: 30 },
  { id: 'raspberry-strawberry-orange', ru: 'Малина, клубника, апельсин', hue: 340, hue2: 25 },
];

// --- Вкусы для ELFBAR Monnight 25000 (15 вкусов) ---
const ELFBAR_MONNIGHT_FLAVORS = [
  { id: 'peach-ice',          ru: 'Персик, холодок',            hue: 25,  hue2: 200 },
  { id: 'grape-ice',          ru: 'Виноград, холодок',          hue: 280, hue2: 200 },
  { id: 'sweet-mint',         ru: 'Сладкая мята',               hue: 150, hue2: 170 },
  { id: 'double-apple',       ru: 'Двойное яблоко',             hue: 80,  hue2: 100 },
  { id: 'cherry-watermelon',  ru: 'Вишня, арбуз',               hue: 0,   hue2: 340 },
  { id: 'lemon-lime',         ru: 'Лимон, лайм',                hue: 55,  hue2: 100 },
  { id: 'watermelon-ice',     ru: 'Арбуз, холодок',             hue: 340, hue2: 200 },
  { id: 'cola-lime',          ru: 'Кола, лайм',                 hue: 15,  hue2: 100 },
  { id: 'pomegranate-splash', ru: 'Гранатовый всплеск',         hue: 350, hue2: 0   },
  { id: 'grape-raspberry',    ru: 'Виноград, малина',           hue: 280, hue2: 340 },
  { id: 'kiwi-passion-guava', ru: 'Киви, маракуйя, гуава',      hue: 80,  hue2: 100 },
  { id: 'strawberry-kiwi-ice', ru: 'Клубника, киви, холодок',   hue: 340, hue2: 200 },
  { id: 'mango-peach-watermelon', ru: 'Манго, персик, арбуз',   hue: 35,  hue2: 340 },
  { id: 'blueberry-raspberry-ice', ru: 'Черника, малина, холодок', hue: 215, hue2: 200 },
  { id: 'watermelon-cantaloupe-guava', ru: 'Арбуз, канталупа, гуава', hue: 340, hue2: 80 },
];

// --- Вкусы для Bubble Mon 30000 (20 вкусов, два вкуса в одном) ---
const BUBBLEMON_FLAVORS = [
  { id: 'berry-ice',                 ru: 'Berry Ice · Ягода со льдом',     hue: 340, hue2: 200 },
  { id: 'blackberry-kiwi',           ru: 'Blackberry Kiwi Fruit',          hue: 280, hue2: 80  },
  { id: 'blackberry-sweet-orange',   ru: 'Blackberry Sweet Orange',        hue: 280, hue2: 25  },
  { id: 'black-grape',               ru: 'Black Grape · Чёрный виноград',  hue: 280, hue2: 300 },
  { id: 'cantaloupe',                ru: 'Cantaloupe · Дыня',              hue: 35,  hue2: 50  },
  { id: 'coconut',                   ru: 'Coconut · Кокос',                hue: 30,  hue2: 50  },
  { id: 'cranberry-grape',           ru: 'Cranberry Grape',                hue: 340, hue2: 280 },
  { id: 'guava',                     ru: 'Guava · Гуава',                  hue: 340, hue2: 100 },
  { id: 'lemon-blueberry',           ru: 'Lemon Blueberry · Лимон, черника', hue: 55, hue2: 215 },
  { id: 'lemon-passion-peach',       ru: 'Lemon Passion Fruit Peach',      hue: 55,  hue2: 30  },
  { id: 'orange-mango',              ru: 'Orange Mango · Апельсин, манго', hue: 25,  hue2: 35  },
  { id: 'orange',                    ru: 'Orange · Апельсин',              hue: 25,  hue2: 30  },
  { id: 'pear-mango',                ru: 'Pear Mango · Груша, манго',      hue: 80,  hue2: 35  },
  { id: 'pineapple-coconut',         ru: 'Pineapple Coconut',              hue: 50,  hue2: 40  },
  { id: 'pink-lemonade',             ru: 'Pink Lemonade · Розовый лимонад', hue: 340, hue2: 55 },
  { id: 'red-peach',                 ru: 'Red Peach · Красный персик',     hue: 0,   hue2: 25  },
  { id: 'strawberry-watermelon',     ru: 'Strawberry Watermelon',          hue: 340, hue2: 0   },
  { id: 'shiny-strawberry',          ru: 'Блестящая клубника',             hue: 340, hue2: 30  },
  { id: 'strawberry-muscat',         ru: 'Клубничный мускат',              hue: 340, hue2: 280 },
  { id: 'lychee',                    ru: 'Личи',                           hue: 340, hue2: 320 },
];

// --- Вкусы для Laiska Queen 10000 (12 вкусов) ---
const LAISKA_FLAVORS = [
  { id: 'chewing-candy',     ru: 'Жевательные конфеты',       hue: 320, hue2: 50  },
  { id: 'apple-pear',        ru: 'Яблочная груша',            hue: 80,  hue2: 100 },
  { id: 'blueberry-energy',  ru: 'Черничный энергетик',       hue: 215, hue2: 60  },
  { id: 'cherry-soda',       ru: 'Вишнёвая газировка',        hue: 0,   hue2: 350 },
  { id: 'blueberry-raspberry-lemon', ru: 'Черника, малина, лимон', hue: 215, hue2: 55 },
  { id: 'icy-watermelon',    ru: 'Ледяной арбуз',             hue: 340, hue2: 200 },
  { id: 'raspberry-lime',    ru: 'Малина, лайм',              hue: 340, hue2: 100 },
  { id: 'cheesecake',        ru: 'Чизкейк',                   hue: 35,  hue2: 25  },
  { id: 'cranberry-grape',   ru: 'Клюква, виноград',          hue: 340, hue2: 280 },
  { id: 'blackberry-tea',    ru: 'Ежевичный чай',             hue: 280, hue2: 25  },
  { id: 'lemon-sea-salt',    ru: 'Лимон, морская соль',       hue: 55,  hue2: 200 },
  { id: 'fantasy',           ru: 'Фантазия',                  hue: 280, hue2: 60  },
];

// Полный список товаров
const PRODUCTS = [
  // ============ ОДНОРАЗОВЫЕ ============

  // INFLAVE
  { id: 'inflave-air-6000-strawberry-miracle', name: 'INFLAVE AIR 6000', flavor: 'Клубничное чудо', price: 1190, category: 'disposable', brand: 'INFLAVE', puffs: 6000, deviceStyle: 'rounded-pod', shellColor: '#1a0a18', accent: '#FF3D78', hue: 340, hue2: 0 },
  { id: 'inflave-air-6000-ripe-raspberry', name: 'INFLAVE AIR 6000', flavor: 'Спелая малина', price: 1190, category: 'disposable', brand: 'INFLAVE', puffs: 6000, deviceStyle: 'rounded-pod', shellColor: '#1d0a18', accent: '#FF1A7A', hue: 320, hue2: 350 },
  { id: 'inflave-omega-10000-cranberry-mint', name: 'INFLAVE OMEGA 10000', flavor: 'Клюква, мята', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, deviceStyle: 'omega-bar', shellColor: '#003a36', accent: '#22D3C7', hue: 165, hue2: 350 },
  { id: 'inflave-omega-10000-grape-aloe', name: 'INFLAVE OMEGA 10000', flavor: 'Виноград, алоэ', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, deviceStyle: 'omega-bar', shellColor: '#1a3d10', accent: '#9BE026', hue: 100, hue2: 280 },
  { id: 'inflave-omega-10000-strawberry-glow', name: 'INFLAVE OMEGA 10000', flavor: 'Клубничный взрыв', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, deviceStyle: 'omega-bar', shellColor: '#3a0a18', accent: '#FF2E5C', hue: 340, hue2: 15 },
  { id: 'inflave-omega-10000-mango', name: 'INFLAVE OMEGA 10000', flavor: 'Сочное манго', price: 1390, category: 'disposable', brand: 'INFLAVE', puffs: 10000, deviceStyle: 'omega-bar', shellColor: '#3a2008', accent: '#FFA014', hue: 30, hue2: 50 },

  // ALOK
  { id: 'alok-50000-cranberry-ice', name: 'ALOK 50000', flavor: 'Клюква со льдом', price: 1990, category: 'disposable', brand: 'ALOK', puffs: 50000, deviceStyle: 'big-screen', shellColor: '#2a0a10', accent: '#E81E63', hue: 0, hue2: 200 },
  { id: 'alok-50000-sour-peach-watermelon', name: 'ALOK 50000', flavor: 'Кислый персик, арбуз', price: 1990, category: 'disposable', brand: 'ALOK', puffs: 50000, deviceStyle: 'big-screen', shellColor: '#2a1a08', accent: '#FF7A14', hue: 30, hue2: 340 },
  { id: 'alok-60000-strawberry-watermelon', name: 'ALOK 60000', flavor: 'Strawberry Watermelon', price: 2190, category: 'disposable', brand: 'ALOK', puffs: 60000, deviceStyle: 'big-screen', shellColor: '#280a18', accent: '#FF1A52', hue: 340, hue2: 0 },

  // WAKA (новый прайс)
  { id: 'waka-8000', name: 'WAKA 8000', flavor: 'Микс вкусов · 8000 затяжек', price: 520, category: 'disposable', brand: 'WAKA', puffs: 8000, popular: true, deviceStyle: 'pod-screen', shellColor: '#101418', accent: '#06B6D4', hue: 200, hue2: 220 },
  { id: 'waka-20000', name: 'WAKA 20000', flavor: 'Микс вкусов · 20000 затяжек', price: 750, category: 'disposable', brand: 'WAKA', puffs: 20000, popular: true, deviceStyle: 'big-screen', shellColor: '#10141C', accent: '#22D3EE', hue: 200, hue2: 240 },
  { id: 'waka-25000', name: 'WAKA 25000', flavor: 'Микс вкусов · 25000 затяжек', price: 770, category: 'disposable', brand: 'WAKA', puffs: 25000, deviceStyle: 'big-screen', shellColor: '#10141C', accent: '#0EA5E9', hue: 215, hue2: 260 },
  { id: 'waka-60000', name: 'WAKA 60000', flavor: 'Микс вкусов · 60000 затяжек', price: 1020, category: 'disposable', brand: 'WAKA', puffs: 60000, popular: true, deviceStyle: 'big-screen', shellColor: '#10141C', accent: '#3B82F6', hue: 215, hue2: 280 },

  // FIZZY Great 10000
  { id: 'fizzy-great-10000', name: 'FIZZY Great 10000', flavor: '20 вкусов на выбор', price: 280, category: 'disposable', brand: 'FIZZY', puffs: 10000, popular: true, deviceStyle: 'pod-screen', shellColor: '#1a0a28', accent: '#A78BFA', flavors: FIZZY_FLAVORS, hue: 280, hue2: 320 },

  // ELFBAR Monnight 25000
  { id: 'elfbar-monnight-25000', name: 'ELFBAR Monnight 25000', flavor: '15 вкусов · 5% · Русский язык', price: 610, category: 'disposable', brand: 'ELFBAR', puffs: 25000, popular: true, deviceStyle: 'big-screen', shellColor: '#0E0E1C', accent: '#7C3AED', flavors: ELFBAR_MONNIGHT_FLAVORS, hue: 270, hue2: 220 },

  // GEEKBAR
  { id: 'geekbar-32000', name: 'GEEKBAR 32000', flavor: '15 вкусов · 5% · Честный знак', price: 550, category: 'disposable', brand: 'GEEKBAR', puffs: 32000, deviceStyle: 'big-screen', shellColor: '#0a1428', accent: '#3B82F6', hue: 215, hue2: 200 },
  { id: 'geekbar-40000', name: 'GEEKBAR 40000', flavor: '15 вкусов · 5% · Честный знак', price: 650, category: 'disposable', brand: 'GEEKBAR', puffs: 40000, popular: true, deviceStyle: 'big-screen', shellColor: '#0a1428', accent: '#6366F1', hue: 230, hue2: 240 },
  { id: 'geekbar-50000', name: 'GEEKBAR 50000', flavor: '15 вкусов · 5% · Честный знак', price: 670, category: 'disposable', brand: 'GEEKBAR', puffs: 50000, popular: true, deviceStyle: 'big-screen', shellColor: '#0a1428', accent: '#8B5CF6', hue: 240, hue2: 270 },

  // Vozol Shisha 25000
  { id: 'vozol-shisha-25000', name: 'Vozol Shisha 25000', flavor: '20 вкусов · 2% · Честный знак', price: 550, category: 'disposable', brand: 'VOZOL', puffs: 25000, deviceStyle: 'big-screen', shellColor: '#28140a', accent: '#F59E0B', hue: 30, hue2: 350 },

  // Bubble Mon 30000
  { id: 'bubble-mon-30000', name: 'Bubble Mon 30000', flavor: 'Корея · 2 вкуса в одном · 5%', price: 400, category: 'disposable', brand: 'BUBBLE MON', puffs: 30000, popular: true, deviceStyle: 'big-screen', shellColor: '#1a0a28', accent: '#EC4899', flavors: BUBBLEMON_FLAVORS, hue: 320, hue2: 200 },

  // Puffmi
  { id: 'puffmi-pure-12000', name: 'Puffmi Pure 12000', flavor: '20 вкусов · 5% · Русский язык', price: 350, category: 'disposable', brand: 'PUFFMI', puffs: 12000, popular: true, deviceStyle: 'pod-screen', shellColor: '#0E0E14', accent: '#6BE3C8', hue: 165, hue2: 280 },

  // Laiska Queen 10000
  { id: 'laiska-queen-10000', name: 'Laiska Queen 10000', flavor: '12 вкусов · 5%', price: 350, category: 'disposable', brand: 'LAISKA', puffs: 10000, deviceStyle: 'pod-screen', shellColor: '#2a0a28', accent: '#F472B6', flavors: LAISKA_FLAVORS, hue: 320, hue2: 280 },

  // ============ ЖИДКОСТИ ============
  { id: 'duall-salt-2',  name: 'DUALL SALT · 2%', flavor: '38 вкусов · 30 мл · солевой никотин 2%', price: 185, category: 'liquid', brand: 'DUALL', volume: 30, popular: true, deviceStyle: 'liquid-bottle', shellColor: '#0a2818', accent: '#10B981', flavors: DUALL_FLAVORS, hue: 150, hue2: 200 },
  { id: 'duall-salt-5',  name: 'DUALL SALT · 5%', flavor: '38 вкусов · 30 мл · солевой никотин 5%', price: 185, category: 'liquid', brand: 'DUALL', volume: 30, popular: true, deviceStyle: 'liquid-bottle', shellColor: '#280a18', accent: '#EF4444', flavors: DUALL_FLAVORS, hue: 0, hue2: 340 },

  // ============ МНОГОРАЗОВЫЕ (POD / MOD) ============

  // VAPORESSO XROS
  { id: 'vaporesso-xros-mini',    name: 'VAPORESSO XROS Mini',    flavor: 'Pod-система · компакт',      price: 620,  category: 'pod', brand: 'VAPORESSO', deviceStyle: 'pod-stick', shellColor: '#1E293B', accent: '#94A3B8', hue: 210, hue2: 230 },
  { id: 'vaporesso-xros-3-mini',  name: 'VAPORESSO XROS 3 Mini',  flavor: 'Pod-система · 1000 mAh',     price: 740,  category: 'pod', brand: 'VAPORESSO', deviceStyle: 'pod-stick', shellColor: '#172554', accent: '#3B82F6', hue: 215, hue2: 240 },
  { id: 'vaporesso-xros-4',       name: 'VAPORESSO XROS 4',       flavor: 'Pod-система · 1000 mAh',     price: 1240, category: 'pod', brand: 'VAPORESSO', deviceStyle: 'pod-stick', shellColor: '#1E1B4B', accent: '#6366F1', hue: 245, hue2: 260 },
  { id: 'vaporesso-xros-4-mini',  name: 'VAPORESSO XROS 4 Mini',  flavor: 'Pod-система · компакт',      price: 840,  category: 'pod', brand: 'VAPORESSO', deviceStyle: 'pod-stick', shellColor: '#0F172A', accent: '#0EA5E9', hue: 200, hue2: 220 },
  { id: 'vaporesso-xros-5',       name: 'VAPORESSO XROS 5',       flavor: 'Pod-система · TYPE-C',       price: 1290, category: 'pod', brand: 'VAPORESSO', popular: true, deviceStyle: 'pod-stick', shellColor: '#0C0A1A', accent: '#22D3EE', hue: 195, hue2: 250 },
  { id: 'vaporesso-xros-5-mini',  name: 'VAPORESSO XROS 5 Mini',  flavor: 'Pod-система · компакт',      price: 860,  category: 'pod', brand: 'VAPORESSO', deviceStyle: 'pod-stick', shellColor: '#1E293B', accent: '#06B6D4', hue: 195, hue2: 220 },

  // GEEK VAPE Pods
  { id: 'geekvape-hero-1-rte',     name: 'GEEKVAPE Hero 1 RTE',     flavor: 'Pod-мод · защита IP68',         price: 1880, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#1F2937', accent: '#22D3C7', hue: 175, hue2: 200 },
  { id: 'geekvape-boost-le',       name: 'GEEKVAPE Boost LE',       flavor: 'Pod-мод · лимитированная серия', price: 820,  category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#1F2937', accent: '#F59E0B', hue: 35,  hue2: 25  },
  { id: 'geekvape-hero-3-classic', name: 'GEEKVAPE Hero 3 Classic', flavor: 'Pod-мод · classic edition',     price: 1580, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#0F172A', accent: '#10B981', hue: 150, hue2: 180 },
  { id: 'geekvape-hero-2-crystal', name: 'GEEKVAPE Hero 2 Crystal', flavor: 'Pod-мод · crystal edition',     price: 1800, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#1A1A2E', accent: '#A78BFA', hue: 270, hue2: 210 },
  { id: 'geekvape-hero-2',         name: 'GEEKVAPE Hero 2',         flavor: 'Pod-мод · новая версия',        price: 1750, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#1F2937', accent: '#0EA5E9', hue: 200, hue2: 230 },
  { id: 'geekvape-hero-2-rte',     name: 'GEEKVAPE Hero 2 RTE',     flavor: 'Pod-мод · защита IP68',         price: 1560, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#0F172A', accent: '#22D3C7', hue: 175, hue2: 205 },
  { id: 'geekvape-hero-5',         name: 'GEEKVAPE Hero 5',         flavor: 'Pod-мод · флагман',             price: 1730, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#7F1D1D', accent: '#EF4444', hue: 0,   hue2: 350 },
  { id: 'geekvape-boost-2-b60',    name: 'GEEKVAPE Boost 2 (B60)',  flavor: 'Pod-мод · 60W',                 price: 1480, category: 'pod', brand: 'GEEKVAPE', deviceStyle: 'box-mod', shellColor: '#111827', accent: '#3B82F6', hue: 215, hue2: 240 },
  { id: 'geekvape-boost-3',        name: 'GEEKVAPE Boost 3',        flavor: 'Pod-мод · топ-версия',          price: 2050, category: 'pod', brand: 'GEEKVAPE', popular: true, deviceStyle: 'box-mod', shellColor: '#0F172A', accent: '#8B5CF6', hue: 260, hue2: 290 },

  // ============ РАСХОДНИКИ ============

  // XROS Картриджи
  { id: 'xros-cart-04-2ml',  name: 'XROS Картридж 0.4 Ом', flavor: '2 мл',  price: 580, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#22D3C7' },
  { id: 'xros-cart-04-3ml',  name: 'XROS Картридж 0.4 Ом', flavor: '3 мл',  price: 580, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#22D3EE' },
  { id: 'xros-cart-06-2ml',  name: 'XROS Картридж 0.6 Ом', flavor: '2 мл',  price: 530, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#0EA5E9' },
  { id: 'xros-cart-06-3ml',  name: 'XROS Картридж 0.6 Ом', flavor: '3 мл',  price: 580, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#3B82F6' },
  { id: 'xros-cart-08-2ml',  name: 'XROS Картридж 0.8 Ом', flavor: '2 мл',  price: 530, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#6366F1' },
  { id: 'xros-cart-08-3ml',  name: 'XROS Картридж 0.8 Ом', flavor: '3 мл',  price: 580, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#8B5CF6' },
  { id: 'xros-cart-10-2ml',  name: 'XROS Картридж 1.0 Ом', flavor: '2 мл',  price: 530, category: 'consumable', brand: 'VAPORESSO', deviceStyle: 'consumable', shellColor: '#10131a', accent: '#A78BFA' },

  // Прочие расходники
  { id: 'cotton-bacon',   name: 'Хлопок Cotton Bacon', flavor: 'Премиум · 10 г', price: 490, category: 'consumable', brand: 'COTTON', deviceStyle: 'consumable', shellColor: '#181410', accent: '#F5C147' },

  // ============ АКСЕССУАРЫ ============
  { id: 'usb-c-cable',  name: 'Кабель USB Type-C', flavor: 'Зарядка для вейпов · 1 м', price: 290, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#1a1a1a', accent: '#9CA3AF' },
  { id: 'lanyard-strap', name: 'Шнурок-держатель', flavor: 'Универсальный, чёрный',     price: 350, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#0c0c0c', accent: '#22D3C7' },
  { id: 'silicone-case', name: 'Силиконовый чехол', flavor: 'На одноразку · цвета на выбор', price: 450, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#1f1230', accent: '#A78BFA' },
  { id: 'cleaning-kit',  name: 'Набор для чистки',  flavor: 'Щёточки + микрофибра',      price: 390, category: 'accessory', brand: 'TYAG', deviceStyle: 'accessory', shellColor: '#0a1a18', accent: '#22D3C7' },
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
