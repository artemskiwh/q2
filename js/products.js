/* ===== Products database for TYAG MOSKVA wholesale shop =====
   Real catalog from the Telegram channel @tyagmoskva.
   Categories: dispose, reusable, liquid, accessory, consumable
*/

const CATEGORIES = [
    { id: 'dispose', name: 'Одноразовые', short: 'Одноразки', icon: 'disposable' },
    { id: 'reusable', name: 'Многоразовые', short: 'Pod-системы', icon: 'reusable' },
    { id: 'liquid', name: 'Жидкости', short: 'Жидкости', icon: 'liquid' },
    { id: 'accessory', name: 'Аксессуары', short: 'Аксессуары', icon: 'accessory' },
    { id: 'consumable', name: 'Расходники', short: 'Расходники', icon: 'consumable' }
];

// Flavor → colour palette mapping helper.
function paletteFor(flavor) {
    const f = (flavor || '').toLowerCase();
    if (/виноград|grape/.test(f)) return 'grape';
    if (/вишн|cherry/.test(f)) return 'cherry';
    if (/манго|mango/.test(f)) return 'mango';
    if (/арбуз|watermelon/.test(f)) return 'watermelon';
    if (/яблок|apple/.test(f)) return 'apple';
    if (/черн|blueberry|blue/.test(f)) return 'blueberry';
    if (/мят|mint|тархун/.test(f)) return 'mint';
    if (/ананас|pineapple/.test(f)) return 'pineapple';
    if (/малин|raspberry/.test(f)) return 'raspberry';
    if (/персик|peach/.test(f)) return 'peach';
    if (/лимон|lemon|грейпфрут/.test(f)) return 'lemon';
    if (/кокос|coconut/.test(f)) return 'coconut';
    if (/клубник|strawberry/.test(f)) return 'strawberry';
    if (/гранат|pomegranate/.test(f)) return 'pomegranate';
    if (/маракуйя|passion/.test(f)) return 'passion';
    if (/лёд|лед|холодок|ice|морозн|ледя/.test(f)) return 'ice';
    if (/личи|lychee/.test(f)) return 'lychee';
    if (/дын|melon|канталуп/.test(f)) return 'melon';
    if (/жвачк|конфет|мармелад|gum|candy/.test(f)) return 'bubblegum';
    if (/энерг|red bull|редбулл|ред булл/.test(f)) return 'energy';
    if (/кола|cola/.test(f)) return 'cola';
    if (/гуав|тропич|экзотич|tropic/.test(f)) return 'tropical';
    if (/киви|kiwi/.test(f)) return 'kiwi';
    if (/абрикос|apricot/.test(f)) return 'apricot';
    if (/смородин|cassis/.test(f)) return 'cosmic';
    if (/закат|sunset|апельсин|orange/.test(f)) return 'sunset';
    if (/чай|tea/.test(f)) return 'forest';
    if (/банан|banana/.test(f)) return 'lemon';
    if (/капучино|coffee|кофе|табак|tobacco|карамел/.test(f)) return 'coconut';
    if (/йогурт|yogurt|чизкейк|сливочн|cream/.test(f)) return 'apricot';
    if (/ежевик|клюкв|berry|ягод/.test(f)) return 'raspberry';
    return 'mist';
}

// Color palettes for product cards (used for SVG illustrations).
const COLOR_PALETTES = {
    grape: ['#3D1A5A', '#7C3FBC', '#C28AFF'],
    cherry: ['#5A0E22', '#C92A4A', '#FF6781'],
    mango: ['#A4540B', '#F0911C', '#FBC85E'],
    watermelon: ['#6C1129', '#E83A6E', '#FF95AC'],
    apple: ['#0B4A24', '#3FB76F', '#A7E5C0'],
    blueberry: ['#0F1F4F', '#3A4FB4', '#7E91E6'],
    mint: ['#0B4A45', '#2DAA92', '#7FE0CB'],
    pineapple: ['#7C5A00', '#F5C518', '#FFEC8A'],
    raspberry: ['#4F0930', '#C81E72', '#F77AB1'],
    peach: ['#94371A', '#F47C5C', '#FFC3A6'],
    lemon: ['#7E6800', '#FAE026', '#FFF59A'],
    coconut: ['#3A2611', '#8D6033', '#E6CDA3'],
    strawberry: ['#6A1020', '#E63952', '#FF8898'],
    pomegranate: ['#4D0D1C', '#B71D3A', '#F86678'],
    passion: ['#6F3D00', '#F38A1E', '#FFCB7A'],
    ice: ['#0E2F45', '#4795BE', '#A8E0F4'],
    lychee: ['#682954', '#D26AA3', '#FAB6D6'],
    melon: ['#445912', '#9DC740', '#DCF09F'],
    bubblegum: ['#8C2F5E', '#E663A6', '#FFB7D5'],
    energy: ['#704A00', '#FFB400', '#FFE391'],
    cola: ['#351A0A', '#7E3A12', '#C97744'],
    tropical: ['#6F285F', '#D26AC1', '#FFC8F1'],
    kiwi: ['#365E16', '#7DBE40', '#C8EE93'],
    apricot: ['#852E0D', '#E97A40', '#FFC195'],
    cosmic: ['#170945', '#6D33C7', '#B58CFF'],
    sunset: ['#6E1B3A', '#E0533A', '#FFB266'],
    forest: ['#0A2E1F', '#3D8A60', '#A4D9BF'],
    mist: ['#1F2A38', '#506173', '#9EA9B5']
};

function formatPrice(n) {
    return n.toLocaleString('ru-RU') + ' ₽';
}

// Helper for generating product entries.
let _idCounter = 0;
function nextId(prefix) {
    _idCounter++;
    return prefix + String(_idCounter).padStart(3, '0');
}

function disposable(brand, model, puffs, nic, price, flavors, opts = {}) {
    return flavors.map((flavor, i) => ({
        id: nextId('d'),
        cat: 'dispose',
        brand,
        name: `${brand} ${model}`,
        flavor,
        puffs,
        nic,
        price,
        oldPrice: opts.oldPrice,
        palette: paletteFor(flavor),
        popular: opts.popular && i < (opts.popularCount || 4),
        stock: opts.stock || 'много',
        desc: opts.desc || `${brand} ${model} — одноразовая электронная сигарета на ${puffs.toLocaleString('ru-RU')} затяжек, крепость ${nic}.`
    }));
}

function liquid(brand, line, nic, price, flavors, opts = {}) {
    return flavors.map((flavor, i) => ({
        id: nextId('l'),
        cat: 'liquid',
        brand,
        name: `${brand} ${line}`,
        flavor,
        volume: opts.volume || '30 мл',
        nic,
        price,
        palette: paletteFor(flavor),
        popular: opts.popular && i < (opts.popularCount || 4),
        stock: 'много',
        desc: opts.desc || `Солевая жидкость ${brand} ${line} с крепостью ${nic}. Объём ${opts.volume || '30 мл'}.`
    }));
}

const PRODUCTS = [];

/* ===== DISPOSABLES (Одноразовые) ===== */

// WAKA — новинки, четыре вариации по затяжкам
const wakaFlavors = ['Виноград-малина', 'Манго-личи', 'Клубника-арбуз', 'Двойное яблоко', 'Холодный персик', 'Ананас-кокос', 'Лимон-лайм', 'Голубая малина'];
PRODUCTS.push(...disposable('WAKA', '8000', 8000, '2%', 520, wakaFlavors, { popular: true, popularCount: 4 }));
PRODUCTS.push(...disposable('WAKA', '20000', 20000, '2%', 750, wakaFlavors, { popular: true, popularCount: 2 }));
PRODUCTS.push(...disposable('WAKA', '25000', 25000, '2%', 770, wakaFlavors));
PRODUCTS.push(...disposable('WAKA', '60000', 60000, '2%', 1020, wakaFlavors, { popular: true, popularCount: 2 }));

// FIZZY Great 10000 — распродажа
const fizzyFlavors = [
    'Банан',
    'Чёрная смородина',
    'Красное яблоко ягоды',
    'Алое манго дыня',
    'Черника гранат',
    'Ананас',
    'Личи лимон',
    'Апельсиновый сок красного граната',
    'Арбуз',
    'Капучино',
    'Виноград - ананасовый лёд',
    'Ежевика шелковица',
    'Энергетик',
    'Черника малина вишня',
    'Зелёная оливковая мята',
    'Радужная конфета',
    'Персик',
    'Клюквенная сода',
    'Ананас персик маракуйя',
    'Малина клубника апельсин'
];
PRODUCTS.push(...disposable('FIZZY', 'Great 10000', 10000, '5%', 280, fizzyFlavors, { popular: true, popularCount: 4, oldPrice: 340, desc: 'FIZZY Great 10000 — распродажа! Сочный вкус и до 10 000 затяжек.' }));

// ELFBAR Monnight 25000
const elfbarMonnightFlavors = [
    'Персик-холодок',
    'Виноград-холодок',
    'Мята сладкая',
    'Двойное яблоко',
    'Вишня-арбуз',
    'Лимон-лайм',
    'Арбуз-холодок',
    'Кола-лайм',
    'Гранатовый всплеск',
    'Виноград-малина',
    'Киви-маракуйя-гуава',
    'Клубника-киви-холодок',
    'Манго-персик-арбуз',
    'Черника-малина-холодок',
    'Арбуз-канталупа-гуава'
];
PRODUCTS.push(...disposable('ELFBAR', 'Monnight 25000', 25000, '2%', 610, elfbarMonnightFlavors, { popular: true, popularCount: 3, desc: 'ELFBAR Monnight 25000 — русский язык, 15 вкусов в наличии.' }));

// GEEKBAR 32000 / 40000 / 50000
const geekbarFlavors = [
    'Виноград-холодок',
    'Манго-лёд',
    'Двойное яблоко',
    'Клубника-арбуз',
    'Персиковый чай',
    'Голубая малина',
    'Кола-лайм',
    'Тропический микс',
    'Холодный личи',
    'Грейпфрут-помело',
    'Свежий ананас',
    'Мятная жвачка',
    'Маракуйя-гуава',
    'Ягодный микс',
    'Энергетик'
];
PRODUCTS.push(...disposable('GEEKBAR', '32000', 32000, '5%', 550, geekbarFlavors, { popular: true, popularCount: 3, desc: 'GEEKBAR 32000 — крепкость 5%, русский язык, Честный Знак.' }));
PRODUCTS.push(...disposable('GEEKBAR', '40000', 40000, '5%', 650, geekbarFlavors, { popular: true, popularCount: 2, desc: 'GEEKBAR 40000 — крепкость 5%, русский язык, Честный Знак.' }));
PRODUCTS.push(...disposable('GEEKBAR', '50000', 50000, '5%', 670, geekbarFlavors, { popular: true, popularCount: 2, desc: 'GEEKBAR 50000 — крепкость 5%, русский язык, Честный Знак.' }));

// Vozol Shisha 25000
const vozolFlavors = [
    'Холодный арбуз',
    'Виноградный лёд',
    'Манго-личи',
    'Клубничный мохито',
    'Двойное яблоко',
    'Персик-холодок',
    'Голубая малина',
    'Лимонад',
    'Кола-лайм',
    'Ананас-кокос',
    'Жевательная резинка',
    'Мятный леденец',
    'Гранат-малина',
    'Маракуйя-гуава',
    'Энергетик',
    'Кисло-сладкое яблоко',
    'Тропический микс',
    'Холодная дыня',
    'Холодный личи',
    'Микс ягод'
];
PRODUCTS.push(...disposable('Vozol', 'Shisha 25000', 25000, '2%', 550, vozolFlavors, { popular: true, popularCount: 2, desc: 'Vozol Shisha 25000 — крепкость 2%, русский язык, 20 вкусов в наличии.' }));

// Bubble Mon 30000 — корейский бренд, 2-в-1
const bubbleMonFlavors = [
    'Berry Ice / Ягода со льдом',
    'Blackberry Kiwi Fruit',
    'Blackberry Sweet Orange',
    'Black grape / Чёрный виноград',
    'Cantaloupe / Дыня',
    'Coconut / Кокос',
    'Cranberry Grape',
    'Guava / Гуава',
    'Lemon Blueberry',
    'Lemon Passion Fruit Peach',
    'Orange Mango / Апельсин-манго',
    'Orange / Апельсин',
    'Pear Mango / Груша-манго',
    'Pineapple Coconut',
    'Pink Lemonade',
    'Red peach / Красный персик',
    'Strawberry Watermelon',
    'Блестящая клубника',
    'Клубничный мускат',
    'Личи'
];
PRODUCTS.push(...disposable('Bubble Mon', '30000', 30000, '5%', 400, bubbleMonFlavors, { popular: true, popularCount: 2, desc: 'Bubble Mon 30000 — корейский бренд, 2 вкуса в одном устройстве.' }));

// Puffmi Pure 12000
const puffmiFlavors = [
    'Манго лёд',
    'Клубника-киви',
    'Виноград',
    'Двойное яблоко',
    'Арбуз-холодок',
    'Голубая малина',
    'Холодный персик',
    'Ананас',
    'Личи',
    'Мята',
    'Жвачка',
    'Энергетик',
    'Маракуйя',
    'Грейпфрут',
    'Кола',
    'Лимонад',
    'Чай с персиком',
    'Тропический микс',
    'Холодная дыня',
    'Чёрная смородина'
];
PRODUCTS.push(...disposable('Puffmi', 'Pure 12000', 12000, '5%', 350, puffmiFlavors, { popularCount: 1, desc: 'Puffmi Pure 12000 — крепкость 5%, 20 вкусов в наличии.' }));

// Laiska Queen 10000
const laiskaFlavors = [
    'Жевательные конфеты',
    'Яблочная груша',
    'Черничный энергетик',
    'Вишнёвая газировка',
    'Черника малина лимон',
    'Ледяной арбуз',
    'Малина лайм',
    'Чизкейк',
    'Клюква виноград',
    'Ежевичный чай',
    'Лимон с морской солью',
    'Фантазия'
];
PRODUCTS.push(...disposable('Laiska Queen', '10000', 10000, '5%', 350, laiskaFlavors, { popular: true, popularCount: 1, desc: 'Laiska Queen 10000 — 12 вкусов в наличии, крепкость 5%.' }));

/* ===== REUSABLES (Многоразовые / POD-системы) ===== */

function pod(brand, model, price, opts = {}) {
    return {
        id: nextId('r'),
        cat: 'reusable',
        brand,
        name: `${brand} ${model}`,
        flavor: opts.color || 'Black',
        power: opts.power || '',
        battery: opts.battery || '',
        price,
        palette: opts.palette || 'mist',
        popular: !!opts.popular,
        stock: opts.stock || 'много',
        desc: opts.desc || `${brand} ${model} — pod-система от ${brand}. Сменные картриджи, USB-C зарядка.`
    };
}

// VAPORESSO XROS — все версии
PRODUCTS.push(pod('VAPORESSO', 'XROS Mini', 620, { power: '16W', battery: '1000 mAh', palette: 'mist', popular: true, desc: 'VAPORESSO XROS Mini — компактная pod-система начального уровня.' }));
PRODUCTS.push(pod('VAPORESSO', 'XROS 3 Mini', 740, { power: '16W', battery: '1000 mAh', palette: 'mist', popular: true, desc: 'VAPORESSO XROS 3 Mini — обновлённая версия любимой Mini.' }));
PRODUCTS.push(pod('VAPORESSO', 'XROS 4', 1240, { power: '20W', battery: '1000 mAh', palette: 'mist', popular: true, desc: 'VAPORESSO XROS 4 — флагман линейки XROS с регулировкой воздуха.' }));
PRODUCTS.push(pod('VAPORESSO', 'XROS 4 Mini', 840, { power: '18W', battery: '1000 mAh', palette: 'mist', popular: true, desc: 'VAPORESSO XROS 4 Mini — компактный флагман.' }));
PRODUCTS.push(pod('VAPORESSO', 'XROS 5', 1290, { power: '20W', battery: '1000 mAh', palette: 'mist', popular: true, desc: 'VAPORESSO XROS 5 — новейшее поколение XROS.' }));
PRODUCTS.push(pod('VAPORESSO', 'XROS 5 Mini', 860, { power: '18W', battery: '1000 mAh', palette: 'mist', desc: 'VAPORESSO XROS 5 Mini — компактная версия пятого поколения.' }));

// GEEK VAPE — поды и моды
PRODUCTS.push(pod('GEEKVAPE', 'Hero 1 RTE', 1880, { power: '60W', battery: '1200 mAh', palette: 'mist', popular: true, desc: 'GEEKVAPE Hero 1 RTE — pod-mod с поддержкой RTE-картриджей.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Boost LE', 820, { power: '40W', battery: '1500 mAh', palette: 'mist', popular: true, desc: 'GEEKVAPE Aegis Boost LE — лёгкий и недорогой Boost.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Hero 3 Classic', 1580, { power: '40W', battery: '1500 mAh', palette: 'mist', desc: 'GEEKVAPE Hero 3 Classic — третье поколение Hero.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Hero 2 Crystal', 1800, { power: '40W', battery: '1500 mAh', palette: 'mist', desc: 'GEEKVAPE Hero 2 Crystal — версия Hero 2 с прозрачным корпусом.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Hero 2 (новые)', 1750, { power: '40W', battery: '1500 mAh', palette: 'mist', popular: true, desc: 'GEEKVAPE Hero 2 — обновлённая ревизия.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Hero 2 RTE', 1560, { power: '40W', battery: '1500 mAh', palette: 'mist', desc: 'GEEKVAPE Hero 2 RTE — Hero 2 с RTE-картриджами.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Hero 5', 1730, { power: '40W', battery: '1500 mAh', palette: 'mist', popular: true, desc: 'GEEKVAPE Hero 5 — пятое поколение Hero.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Boost 2 (B60)', 1480, { power: '60W', battery: '2000 mAh', palette: 'mist', desc: 'GEEKVAPE Aegis Boost 2 B60 — мощный pod-mod с защитой IP68.' }));
PRODUCTS.push(pod('GEEKVAPE', 'Boost 3', 2050, { power: '100W', battery: '2500 mAh', palette: 'mist', popular: true, desc: 'GEEKVAPE Aegis Boost 3 — флагман линейки Boost.' }));

/* ===== LIQUIDS (Жидкости) — DUALL SALT ===== */

const duallFlavors = [
    'Спрайт арбуз лайм',
    'Морозный личи',
    'Печенье карамель',
    'Морозная дыня',
    'Личи гуава',
    'Табак печенье',
    'Малиновый йогурт',
    'Мятные леденцы эвкалипт',
    'Дыня маракуйя',
    'Клубничное мороженое',
    'Киви гуава',
    'Ягодный чай',
    'Ананас киви',
    'Холодное смородина',
    'Манго ананас',
    'Смородина малина яблоко',
    'Клубника апельсин маракуйя',
    'Мятная жвачка',
    'Ягодный морс',
    'Ледяной арбуз с дыней',
    'Морозный ред булл',
    'Морозный ананас',
    'Йогурт персик маракуйя',
    'Манго апельсин мята',
    'Кислый лимон киви',
    'Лимонад с грейпфрутом',
    'Ледяной тархун',
    'Манго кумкват',
    'Фруктовый мармелад',
    'Яблоко виноград',
    'Ледяная кола',
    'Экзотические фрукты',
    'Яблоко малина',
    'Ледяное манго',
    'Чай с грейпфрутом и ягодами',
    'Клубничный йогурт',
    'Ледяное манго с апельсином',
    'Черничный чизкейк'
];

PRODUCTS.push(...liquid('DUALL', 'SALT 2%', '2% (20мг)', 185, duallFlavors, { popular: true, popularCount: 4, desc: 'DUALL SALT — солевая жидкость 2%, объём 30 мл. Подходит для большинства pod-систем.' }));
PRODUCTS.push(...liquid('DUALL', 'SALT 5%', '5% (50мг)', 185, duallFlavors.slice(0, 24), { desc: 'DUALL SALT — солевая жидкость 5%, объём 30 мл.' }));

/* ===== CONSUMABLES (Расходники) — XROS картриджи ===== */

function cart(name, flavor, price, opts = {}) {
    return {
        id: nextId('c'),
        cat: 'consumable',
        brand: opts.brand || 'VAPORESSO',
        name,
        flavor,
        price,
        palette: 'mist',
        popular: !!opts.popular,
        stock: 'много',
        desc: opts.desc || `${name}. ${flavor}.`
    };
}

PRODUCTS.push(cart('Картридж XROS', '0.4 Ом, 2 мл', 580, { popular: true, desc: 'Сменный картридж VAPORESSO XROS с сетчатым испарителем 0.4 Ом, 2 мл.' }));
PRODUCTS.push(cart('Картридж XROS', '0.4 Ом, 3 мл', 580, { popular: true, desc: 'Картридж XROS 0.4 Ом, увеличенный объём 3 мл.' }));
PRODUCTS.push(cart('Картридж XROS', '0.6 Ом, 2 мл', 530, { popular: true, desc: 'Картридж XROS 0.6 Ом, 2 мл — универсальный выбор.' }));
PRODUCTS.push(cart('Картридж XROS', '0.6 Ом, 3 мл', 580, { desc: 'Картридж XROS 0.6 Ом, 3 мл.' }));
PRODUCTS.push(cart('Картридж XROS', '0.8 Ом, 2 мл', 530, { popular: true, desc: 'Картридж XROS 0.8 Ом, 2 мл. Для MTL парения.' }));
PRODUCTS.push(cart('Картридж XROS', '0.8 Ом, 3 мл', 580, { desc: 'Картридж XROS 0.8 Ом, 3 мл.' }));
PRODUCTS.push(cart('Картридж XROS', '1.0 Ом, 2 мл', 530, { desc: 'Картридж XROS 1.0 Ом, 2 мл — самый плотный и тёплый MTL.' }));

// Доп. расходники под популярные устройства
PRODUCTS.push(cart('Картридж GEEKVAPE Boost B-Series', '0.4 Ом, 5 шт', 890, { brand: 'GEEKVAPE', desc: 'Сменные испарители B-Series для линейки Aegis Boost.' }));
PRODUCTS.push(cart('Картридж GEEKVAPE Hero', '0.4 Ом, 2 шт', 690, { brand: 'GEEKVAPE', popular: true, desc: 'Сменные картриджи для всей линейки Hero.' }));
PRODUCTS.push(cart('Картридж GEEKVAPE Hero RTE', '0.6 Ом, 2 шт', 690, { brand: 'GEEKVAPE', desc: 'Картриджи Hero RTE с верхней заправкой.' }));
PRODUCTS.push(cart('Хлопок Cotton Bacon V2', '1 упаковка', 390, { brand: 'COTTON BACON', desc: 'Премиальный американский хлопок для намоток.' }));
PRODUCTS.push(cart('Хлопок Native Wicks Platinum', '1 упаковка', 450, { brand: 'NATIVE WICKS', desc: 'Хлопок премиум-класса для самых требовательных.' }));

/* ===== ACCESSORIES (Аксессуары) ===== */

function accessoryItem(name, flavor, price, opts = {}) {
    return {
        id: nextId('a'),
        cat: 'accessory',
        brand: opts.brand || 'TYAG',
        name,
        flavor,
        price,
        palette: 'mist',
        popular: !!opts.popular,
        stock: 'много',
        desc: opts.desc || ''
    };
}

PRODUCTS.push(accessoryItem('Кабель USB Type-C 1м', 'Чёрный', 290, { popular: true, desc: 'Качественный кабель USB-C для зарядки большинства устройств.' }));
PRODUCTS.push(accessoryItem('Кабель USB Type-C 0.3м', 'Чёрный', 190, { desc: 'Короткий кабель USB-C для удобного ношения с собой.' }));
PRODUCTS.push(accessoryItem('Сетевой адаптер 2A', 'Чёрный', 490, { desc: 'Зарядное устройство 5V/2A.' }));
PRODUCTS.push(accessoryItem('Силиконовый чехол XROS 4', 'Прозрачный', 350, { brand: 'XROS', desc: 'Защитный чехол для VAPORESSO XROS 4.' }));
PRODUCTS.push(accessoryItem('Силиконовый чехол XROS 5', 'Прозрачный', 350, { brand: 'XROS', desc: 'Защитный чехол для VAPORESSO XROS 5.' }));
PRODUCTS.push(accessoryItem('Силиконовый чехол GEEKVAPE Hero 2', 'Чёрный', 390, { brand: 'GEEKVAPE', desc: 'Защитный силиконовый чехол для GEEKVAPE Hero 2.' }));
PRODUCTS.push(accessoryItem('Аккумулятор Molicel P26A 18650', '2600 mAh', 690, { brand: 'MOLICEL', popular: true, desc: 'Высокотоковый аккумулятор 25А для боксмодов.' }));
PRODUCTS.push(accessoryItem('Аккумулятор Molicel P42A 21700', '4000 mAh', 990, { brand: 'MOLICEL', desc: 'Топовый аккумулятор 45А для мощных модов.' }));
PRODUCTS.push(accessoryItem('Дрип-тип 510 универсальный', 'Чёрный смолистый', 250, { desc: 'Сменный мундштук стандарта 510.' }));
PRODUCTS.push(accessoryItem('Дрип-тип 810 широкий', 'Серебристый', 290, { desc: 'Сменный мундштук стандарта 810.' }));
PRODUCTS.push(accessoryItem('Кейс для аккумуляторов 2 шт', 'Чёрный', 190, { desc: 'Пластиковый кейс для переноски 18650/20700.' }));
PRODUCTS.push(accessoryItem('Зарядное устройство Nitecore UM2', 'Чёрный', 1990, { brand: 'NITECORE', desc: 'Интеллектуальная зарядка для аккумуляторов 18650/21700.' }));
PRODUCTS.push(accessoryItem('Чехол-сумка для девайса', 'Чёрный нейлон', 590, { desc: 'Удобный чехол с карманом для жидкости.' }));
PRODUCTS.push(accessoryItem('Шнурок-лэньярд', 'Чёрный', 290, { desc: 'Универсальный шнурок для ношения вейпа на шее.' }));

function getCategoryCount(catId) {
    return PRODUCTS.filter(p => p.cat === catId).length;
}

function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

function searchProducts(query) {
    if (!query) return PRODUCTS;
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.flavor && p.flavor.toLowerCase().includes(q)) ||
        (p.desc && p.desc.toLowerCase().includes(q))
    );
}

if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
    window.PRODUCTS = PRODUCTS;
    window.COLOR_PALETTES = COLOR_PALETTES;
    window.formatPrice = formatPrice;
    window.getCategoryCount = getCategoryCount;
    window.getProductById = getProductById;
    window.searchProducts = searchProducts;
}
