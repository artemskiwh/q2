/* ===== Products database for TYAG MOSKVA wholesale shop =====
   Categories: dispose, reusable, liquid, accessory, consumable
*/

const CATEGORIES = [
    { id: 'dispose', name: 'Одноразовые', short: 'Одноразки', icon: 'disposable' },
    { id: 'reusable', name: 'Многоразовые', short: 'Pod-системы', icon: 'reusable' },
    { id: 'liquid', name: 'Жидкости', short: 'Жидкости', icon: 'liquid' },
    { id: 'accessory', name: 'Аксессуары', short: 'Аксессуары', icon: 'accessory' },
    { id: 'consumable', name: 'Расходники', short: 'Расходники', icon: 'consumable' }
];

// Color palettes for product cards (used for SVG illustrations).
const COLOR_PALETTES = {
    grape: ['#6B2C7F', '#A148C0', '#D08FE8'],
    cherry: ['#7A1430', '#C92A4A', '#FF6781'],
    mango: ['#B86106', '#F09419', '#FBC85E'],
    watermelon: ['#7A132E', '#E83A6E', '#FF8FAA'],
    apple: ['#0F5A2F', '#3FB76F', '#A7E5C0'],
    blueberry: ['#13265E', '#3A4FB4', '#7E91E6'],
    mint: ['#0E5650', '#2DAA92', '#7FE0CB'],
    pineapple: ['#876200', '#F5C518', '#FFEC8A'],
    raspberry: ['#5E0D3B', '#C81E72', '#F77AB1'],
    peach: ['#A03F1F', '#F47C5C', '#FFC3A6'],
    lemon: ['#937900', '#FAE026', '#FFF59A'],
    coconut: ['#3F2B14', '#8D6033', '#E6CDA3'],
    strawberry: ['#7A1322', '#E63952', '#FF8898'],
    pomegranate: ['#591020', '#B71D3A', '#F86678'],
    passion: ['#7A4400', '#F38A1E', '#FFCB7A'],
    ice: ['#0F354F', '#4795BE', '#A8E0F4'],
    lychee: ['#742F5E', '#D26AA3', '#FAB6D6'],
    melon: ['#496015', '#9DC740', '#DCF09F'],
    bubblegum: ['#993566', '#E663A6', '#FFB7D5'],
    energy: ['#7F5400', '#FFB400', '#FFE391'],
    cola: ['#3D1D0B', '#7E3A12', '#C97744'],
    tropical: ['#7C2D6F', '#D26AC1', '#FFC8F1'],
    kiwi: ['#3D6A1A', '#7DBE40', '#C8EE93'],
    apricot: ['#94350F', '#E97A40', '#FFC195'],
    cosmic: ['#1B0A4D', '#6D33C7', '#B58CFF'],
    sunset: ['#7A1F40', '#E0533A', '#FFB266'],
    forest: ['#0D3725', '#3D8A60', '#A4D9BF'],
    mist: ['#1F2A38', '#506173', '#9EA9B5']
};

// Helper to format price in RUB.
function formatPrice(n) {
    return n.toLocaleString('ru-RU') + ' ₽';
}

const PRODUCTS = [
    // ========== DISPOSABLE VAPES (Одноразовые) ==========
    { id: 'd01', cat: 'dispose', brand: 'INFLAVE', name: 'INFLAVE OMEGA 7000', flavor: 'Гранат и черника', puffs: 7000, nic: '2%', price: 1200, oldPrice: 1400, palette: 'pomegranate', popular: true, stock: 'много', desc: 'Сочный гранат с лёгкой черничной кислинкой. Эргономичный корпус, мощная батарея и густой пар.' },
    { id: 'd02', cat: 'dispose', brand: 'INFLAVE', name: 'INFLAVE OMEGA 7000', flavor: 'Манго маракуйя', puffs: 7000, nic: '2%', price: 1200, palette: 'mango', popular: true, stock: 'много', desc: 'Тропический микс манго и маракуйи — мягкий и насыщенный вкус.' },
    { id: 'd03', cat: 'dispose', brand: 'INFLAVE', name: 'INFLAVE OMEGA 9000', flavor: 'Виноград лёд', puffs: 9000, nic: '2%', price: 1300, palette: 'grape', popular: true, stock: 'много', desc: 'Холодный виноград с морозным послевкусием. До 9000 затяжек.' },
    { id: 'd04', cat: 'dispose', brand: 'INFLAVE', name: 'INFLAVE OMEGA 9000', flavor: 'Арбуз клубника', puffs: 9000, nic: '2%', price: 1300, palette: 'watermelon', stock: 'много', desc: 'Свежий арбуз и спелая клубника — летний коктейль на каждый день.' },
    { id: 'd05', cat: 'dispose', brand: 'WOKO', name: 'WOKO 2500', flavor: 'Манго', puffs: 2500, nic: '2%', price: 950, palette: 'mango', popular: true, stock: 'много', desc: 'Компактная одноразка с фирменным вкусом манго. Простое и приятное парение.' },
    { id: 'd06', cat: 'dispose', brand: 'WOKO', name: 'WOKO 2500', flavor: 'Лесные ягоды', puffs: 2500, nic: '2%', price: 950, palette: 'blueberry', stock: 'много', desc: 'Смесь лесных ягод с лёгкой сладостью.' },
    { id: 'd07', cat: 'dispose', brand: 'WOKO', name: 'WOKO 5000', flavor: 'Арбуз', puffs: 5000, nic: '2%', price: 1050, palette: 'watermelon', popular: true, stock: 'много', desc: 'Свежий и сочный арбуз с долгим послевкусием.' },
    { id: 'd08', cat: 'dispose', brand: 'WOKO', name: 'WOKO MAX 6000', flavor: 'Кокос', puffs: 6000, nic: '2%', price: 1100, palette: 'coconut', popular: true, stock: 'много', desc: 'Сливочный кокос — нежный и тропический вкус.' },
    { id: 'd09', cat: 'dispose', brand: 'WOKO', name: 'WOKO MAX 6000', flavor: 'Личи', puffs: 6000, nic: '2%', price: 1100, palette: 'lychee', stock: 'есть', desc: 'Экзотическое личи с тонкой парфюмерной нотой.' },
    { id: 'd10', cat: 'dispose', brand: 'ELFBAR', name: 'ELFBAR 6000', flavor: 'Вишнёвый персик', puffs: 6000, nic: '2%', price: 1250, palette: 'cherry', popular: true, stock: 'много', desc: 'Глубокий вкус вишни с мягким бархатом персика.' },
    { id: 'd11', cat: 'dispose', brand: 'ELFBAR', name: 'ELFBAR 6000', flavor: 'Голубая малина', puffs: 6000, nic: '2%', price: 1250, palette: 'blueberry', stock: 'много', desc: 'Сладко-кислая голубая малина — фирменный микс ELFBAR.' },
    { id: 'd12', cat: 'dispose', brand: 'ELFBAR', name: 'ELFBAR AF5000', flavor: 'Манго лёд', puffs: 5000, nic: '2%', price: 1200, palette: 'mango', popular: true, stock: 'много', desc: 'Спелое манго с морозной свежестью.' },
    { id: 'd13', cat: 'dispose', brand: 'ELFBAR', name: 'ELFBAR AF5000', flavor: 'Клубничный коктейль', puffs: 5000, nic: '2%', price: 1200, palette: 'strawberry', stock: 'много', desc: 'Сочный клубничный микс — ароматный и насыщенный.' },
    { id: 'd14', cat: 'dispose', brand: 'LOST MARY', name: 'LOST MARY OS5000', flavor: 'Маракуйя', puffs: 5000, nic: '2%', price: 1100, palette: 'passion', popular: true, stock: 'много', desc: 'Тропическая маракуйя с тонким парфюмерным шлейфом.' },
    { id: 'd15', cat: 'dispose', brand: 'LOST MARY', name: 'LOST MARY OS5000', flavor: 'Кислый яблочный лед', puffs: 5000, nic: '2%', price: 1100, palette: 'apple', stock: 'много', desc: 'Освежающий зелёный яблоко с лёгкой кислинкой и ментолом.' },
    { id: 'd16', cat: 'dispose', brand: 'LOST MARY', name: 'LOST MARY BM5000', flavor: 'Голубая малина', puffs: 5000, nic: '2%', price: 1100, palette: 'blueberry', stock: 'много', desc: 'Хит продаж — сбалансированный вкус голубой малины.' },
    { id: 'd17', cat: 'dispose', brand: 'LOST MARY', name: 'LOST MARY MO20000', flavor: 'Виноград', puffs: 20000, nic: '2%', price: 1750, oldPrice: 1900, palette: 'grape', popular: true, stock: 'мало', desc: 'Гигант 20K затяжек, цифровой индикатор уровня жидкости и заряда.' },
    { id: 'd18', cat: 'dispose', brand: 'LOST MARY', name: 'LOST MARY MO20000', flavor: 'Ананас лимон', puffs: 20000, nic: '2%', price: 1750, palette: 'pineapple', stock: 'мало', desc: 'Спелый ананас с цитрусовой подачей. 20K затяжек.' },
    { id: 'd19', cat: 'dispose', brand: 'VAPORESSO', name: 'VAPORESSO ECO NANO', flavor: 'Ментол', puffs: 8000, nic: '2%', price: 950, palette: 'mint', stock: 'много', desc: 'Многоразовая платформа с pod-картриджем, заряд через USB-C.' },
    { id: 'd20', cat: 'dispose', brand: 'VAPORESSO', name: 'VAPORESSO ECO NANO', flavor: 'Манго персик', puffs: 8000, nic: '2%', price: 950, palette: 'peach', stock: 'много', desc: 'Сочный микс манго и персика, заряжаемая система.' },
    { id: 'd21', cat: 'dispose', brand: 'WAKA', name: 'WAKA SoloPro 6000', flavor: 'Микс ягод', puffs: 6000, nic: '2%', price: 1150, palette: 'raspberry', stock: 'много', desc: 'Цифровой дисплей, удобная форма, насыщенный ягодный микс.' },
    { id: 'd22', cat: 'dispose', brand: 'WAKA', name: 'WAKA SoloPro 6000', flavor: 'Дыня лёд', puffs: 6000, nic: '2%', price: 1150, palette: 'melon', stock: 'много', desc: 'Свежая дыня с морозным финишем.' },
    { id: 'd23', cat: 'dispose', brand: 'HQD', name: 'HQD Cuvie Plus', flavor: 'Энергетик', puffs: 1200, nic: '2%', price: 580, palette: 'energy', stock: 'много', desc: 'Классическая компактная одноразка с фирменным вкусом энергетика.' },
    { id: 'd24', cat: 'dispose', brand: 'HQD', name: 'HQD Cuvie Plus', flavor: 'Кола', puffs: 1200, nic: '2%', price: 580, palette: 'cola', stock: 'много', desc: 'Газированная кола — классика вкусов.' },
    { id: 'd25', cat: 'dispose', brand: 'PYNE POD', name: 'PYNE POD Boost 12000', flavor: 'Клубника киви', puffs: 12000, nic: '2%', price: 1490, palette: 'strawberry', stock: 'есть', desc: 'Перезаряжаемая платформа на 12K затяжек, регулировка мощности.' },
    { id: 'd26', cat: 'dispose', brand: 'PYNE POD', name: 'PYNE POD Boost 12000', flavor: 'Манго маракуйя', puffs: 12000, nic: '2%', price: 1490, palette: 'mango', stock: 'есть', desc: 'Тропический коктейль на 12K затяжек.' },
    { id: 'd27', cat: 'dispose', brand: 'PLONQ', name: 'Plonq MAX SMART 12000', flavor: 'Личи', puffs: 12000, nic: '2%', price: 1490, palette: 'lychee', stock: 'есть', desc: 'Перезаряжаемая платформа, цифровой экран, фирменный вкус личи.' },
    { id: 'd28', cat: 'dispose', brand: 'PLONQ', name: 'Plonq MAX SMART 12000', flavor: 'Кокос ананас', puffs: 12000, nic: '2%', price: 1490, palette: 'pineapple', stock: 'есть', desc: 'Карибская пина-колада в одной одноразке.' },
    { id: 'd29', cat: 'dispose', brand: 'CHILLAX', name: 'Chillax Lit 6000', flavor: 'Виноград лёд', puffs: 6000, nic: '2%', price: 1050, palette: 'grape', stock: 'есть', desc: 'Компактная одноразка со светящимся индикатором.' },
    { id: 'd30', cat: 'dispose', brand: 'CHILLAX', name: 'Chillax Lit 6000', flavor: 'Жвачка', puffs: 6000, nic: '2%', price: 1050, palette: 'bubblegum', stock: 'есть', desc: 'Сладкая жевательная резинка детства.' },
    { id: 'd31', cat: 'dispose', brand: 'GEEK BAR', name: 'GEEK BAR PULSE 15000', flavor: 'Манго лёд', puffs: 15000, nic: '2%', price: 1690, palette: 'mango', stock: 'мало', desc: 'Двойной режим парения, эргономика, 15K затяжек.' },
    { id: 'd32', cat: 'dispose', brand: 'GEEK BAR', name: 'GEEK BAR PULSE 15000', flavor: 'Тропический микс', puffs: 15000, nic: '2%', price: 1690, palette: 'tropical', stock: 'мало', desc: 'Микс экзотических фруктов на 15K затяжек.' },

    // ========== REUSABLE (Многоразовые / POD-системы) ==========
    { id: 'r01', cat: 'reusable', brand: 'VAPORESSO', name: 'VAPORESSO XROS 4', flavor: 'Black / Black', power: '20W', battery: '1000 mAh', price: 2790, oldPrice: 3100, palette: 'mist', popular: true, stock: 'много', desc: 'Pod-система с регулировкой воздуха и сменными картриджами. Заряд через USB-C.' },
    { id: 'r02', cat: 'reusable', brand: 'VAPORESSO', name: 'VAPORESSO XROS 4', flavor: 'Sunset Red', power: '20W', battery: '1000 mAh', price: 2790, palette: 'sunset', stock: 'много', desc: 'Стильный POD от VAPORESSO в красном цвете.' },
    { id: 'r03', cat: 'reusable', brand: 'VAPORESSO', name: 'VAPORESSO XROS 4 MINI', flavor: 'Stellar Black', power: '16W', battery: '1000 mAh', price: 2390, palette: 'cosmic', stock: 'много', desc: 'Компактная Mini-версия популярного POD.' },
    { id: 'r04', cat: 'reusable', brand: 'SMOK', name: 'SMOK NORD 5', flavor: 'Black Stabilized Wood', power: '80W', battery: '2000 mAh', price: 3490, palette: 'forest', popular: true, stock: 'много', desc: 'Мощная pod-mod система на 80W с регулировкой и большим экраном.' },
    { id: 'r05', cat: 'reusable', brand: 'SMOK', name: 'SMOK NORD 5', flavor: 'Blue Carbon Fiber', power: '80W', battery: '2000 mAh', price: 3490, palette: 'ice', stock: 'много', desc: 'Pod-mod в синем карбоне — мощно и стильно.' },
    { id: 'r06', cat: 'reusable', brand: 'VOOPOO', name: 'VOOPOO ARGUS P2', flavor: 'Black', power: '25W', battery: '1100 mAh', price: 2990, palette: 'mist', popular: true, stock: 'много', desc: 'Лёгкая и плоская pod-система с фирменным чипом GENE.' },
    { id: 'r07', cat: 'reusable', brand: 'VOOPOO', name: 'VOOPOO ARGUS P2', flavor: 'Pearl White', power: '25W', battery: '1100 mAh', price: 2990, palette: 'mist', stock: 'есть', desc: 'Тот же ARGUS P2 в жемчужно-белом.' },
    { id: 'r08', cat: 'reusable', brand: 'UWELL', name: 'UWELL Caliburn G3', flavor: 'Phantom Black', power: '25W', battery: '1000 mAh', price: 2690, popular: true, palette: 'mist', stock: 'много', desc: 'Третье поколение легендарного Caliburn — флагман среди pod-систем.' },
    { id: 'r09', cat: 'reusable', brand: 'UWELL', name: 'UWELL Caliburn G3', flavor: 'Light Purple', power: '25W', battery: '1000 mAh', price: 2690, palette: 'cosmic', stock: 'есть', desc: 'Caliburn G3 в светло-фиолетовом цвете.' },
    { id: 'r10', cat: 'reusable', brand: 'UWELL', name: 'UWELL Caliburn AK3', flavor: 'Black', power: '15W', battery: '520 mAh', price: 1690, palette: 'mist', stock: 'много', desc: 'Бюджетная и компактная pod-система с сетчатым испарителем.' },
    { id: 'r11', cat: 'reusable', brand: 'GEEKVAPE', name: 'GEEKVAPE Wenax Q', flavor: 'Black', power: '25W', battery: '1000 mAh', price: 1990, palette: 'mist', stock: 'много', desc: 'Pod-система с регулировкой мощности и эргономичной формой.' },
    { id: 'r12', cat: 'reusable', brand: 'GEEKVAPE', name: 'GEEKVAPE Wenax K2', flavor: 'Rainbow', power: '18W', battery: '1000 mAh', price: 1790, palette: 'cosmic', stock: 'много', desc: 'Стильный Wenax K2 в радужном корпусе.' },
    { id: 'r13', cat: 'reusable', brand: 'OXVA', name: 'OXVA Xlim Pro', flavor: 'Gunmetal', power: '30W', battery: '1000 mAh', price: 2890, palette: 'mist', popular: true, stock: 'много', desc: 'Pod-система с цветным экраном и регулировкой мощности.' },
    { id: 'r14', cat: 'reusable', brand: 'OXVA', name: 'OXVA Xlim Pro', flavor: 'Black Brown', power: '30W', battery: '1000 mAh', price: 2890, palette: 'coconut', stock: 'много', desc: 'Топовый pod с премиальной отделкой.' },
    { id: 'r15', cat: 'reusable', brand: 'OXVA', name: 'OXVA Xlim SQ Pro', flavor: 'Black', power: '25W', battery: '1200 mAh', price: 2590, palette: 'mist', stock: 'много', desc: 'Квадратная версия Xlim с увеличенной батареей.' },
    { id: 'r16', cat: 'reusable', brand: 'LOST VAPE', name: 'LOST VAPE URSA Quest', flavor: 'Black Carbon', power: '100W', battery: '2x18650', price: 4990, palette: 'cosmic', stock: 'есть', desc: 'Мощный pod-mod на сменных аккумуляторах, до 100W.' },
    { id: 'r17', cat: 'reusable', brand: 'LOST VAPE', name: 'LOST VAPE URSA Baby Pro', flavor: 'Silver / White', power: '25W', battery: '900 mAh', price: 2790, palette: 'mist', stock: 'много', desc: 'Премиальная pod-система с матовым корпусом и металлической отделкой.' },
    { id: 'r18', cat: 'reusable', brand: 'ASPIRE', name: 'ASPIRE Flexus Q', flavor: 'Black', power: '20W', battery: '700 mAh', price: 1590, palette: 'mist', stock: 'много', desc: 'Тонкая и лёгкая pod-система с цельным дизайном.' },
    { id: 'r19', cat: 'reusable', brand: 'ASPIRE', name: 'ASPIRE Cyber S', flavor: 'Blue', power: '40W', battery: '1000 mAh', price: 2890, palette: 'ice', stock: 'много', desc: 'Мощный POD c регулировкой и цветным экраном.' },
    { id: 'r20', cat: 'reusable', brand: 'INNOKIN', name: 'INNOKIN Klypse', flavor: 'Black', power: '19W', battery: '700 mAh', price: 1690, palette: 'mist', stock: 'много', desc: 'Стартовый набор Klypse с прозрачным картриджем.' },
    { id: 'r21', cat: 'reusable', brand: 'VAPORESSO', name: 'VAPORESSO LUXE Q2', flavor: 'Galaxy Blue', power: '17W', battery: '1000 mAh', price: 1990, palette: 'cosmic', stock: 'много', desc: 'Pod-система с автоматической затяжкой и заметным цветом.' },
    { id: 'r22', cat: 'reusable', brand: 'VAPORESSO', name: 'VAPORESSO LUXE XR Max', flavor: 'Black', power: '80W', battery: '2800 mAh', price: 3690, palette: 'mist', popular: true, stock: 'много', desc: 'Pod-mod c автономностью на несколько дней.' },
    { id: 'r23', cat: 'reusable', brand: 'SMOK', name: 'SMOK Novo Master Box', flavor: 'Black', power: '80W', battery: '2000 mAh', price: 3290, palette: 'mist', stock: 'много', desc: 'Универсальная pod-mod с цветным экраном и поддержкой ваты.' },
    { id: 'r24', cat: 'reusable', brand: 'GEEKVAPE', name: 'GEEKVAPE Aegis Hero 2', flavor: 'Camo', power: '60W', battery: '1200 mAh', price: 3490, palette: 'forest', stock: 'много', desc: 'Защищённый POD с IP67, противоударный.' },
    { id: 'r25', cat: 'reusable', brand: 'CALIBURN', name: 'UWELL Caliburn A3S', flavor: 'Black', power: '15W', battery: '520 mAh', price: 1490, palette: 'mist', stock: 'много', desc: 'Самая доступная Caliburn с автоматической затяжкой.' },
    { id: 'r26', cat: 'reusable', brand: 'VAPORESSO', name: 'VAPORESSO Coolfire Z80', flavor: 'Black', power: '80W', battery: '2500 mAh', price: 3990, palette: 'mist', stock: 'есть', desc: 'Mod на 80W с интуитивным управлением.' },
    { id: 'r27', cat: 'reusable', brand: 'VOOPOO', name: 'VOOPOO Doric 20 SE', flavor: 'Silver', power: '20W', battery: '1500 mAh', price: 1490, palette: 'mist', stock: 'много', desc: 'Простой и лёгкий POD от VOOPOO.' },
    { id: 'r28', cat: 'reusable', brand: 'GEEKVAPE', name: 'GEEKVAPE Wenax M1', flavor: 'Black', power: '20W', battery: '800 mAh', price: 1390, palette: 'mist', stock: 'много', desc: 'Базовая модель Wenax — простое решение для перехода.' },

    // ========== LIQUID (Жидкости) ==========
    { id: 'l01', cat: 'liquid', brand: 'HUSKY', name: 'Husky Mint Series', flavor: 'Strong Mint', volume: '30 мл', nic: '20мг', price: 690, palette: 'mint', popular: true, stock: 'много', desc: 'Классический холодный ментол с лёгкой сладостью.' },
    { id: 'l02', cat: 'liquid', brand: 'HUSKY', name: 'Husky Mint Series', flavor: 'Strawberry Burst', volume: '30 мл', nic: '20мг', price: 690, palette: 'strawberry', stock: 'много', desc: 'Жидкость со вкусом сочной клубники.' },
    { id: 'l03', cat: 'liquid', brand: 'HUSKY', name: 'Husky Salt', flavor: 'Lychee Ice', volume: '30 мл', nic: '20мг', price: 690, palette: 'lychee', popular: true, stock: 'много', desc: 'Личи с морозным послевкусием.' },
    { id: 'l04', cat: 'liquid', brand: 'JAM MONSTER', name: 'Jam Monster Salt', flavor: 'Blueberry Jam', volume: '30 мл', nic: '20мг', price: 850, palette: 'blueberry', popular: true, stock: 'много', desc: 'Хлеб с черничным джемом — культовый американский вкус.' },
    { id: 'l05', cat: 'liquid', brand: 'JAM MONSTER', name: 'Jam Monster Salt', flavor: 'Strawberry Jam', volume: '30 мл', nic: '20мг', price: 850, palette: 'strawberry', stock: 'много', desc: 'Клубничный джем на тосте — десертная классика.' },
    { id: 'l06', cat: 'liquid', brand: 'JAM MONSTER', name: 'Jam Monster Salt', flavor: 'Apple Jam', volume: '30 мл', nic: '20мг', price: 850, palette: 'apple', stock: 'много', desc: 'Яблочный джем со сливочной булочкой.' },
    { id: 'l07', cat: 'liquid', brand: 'MAXWELLS', name: 'Maxwells Salt', flavor: 'Big Red', volume: '30 мл', nic: '20мг', price: 790, palette: 'cherry', stock: 'много', desc: 'Красные ягоды с прохладной свежестью.' },
    { id: 'l08', cat: 'liquid', brand: 'MAXWELLS', name: 'Maxwells Salt', flavor: 'Wow!', volume: '30 мл', nic: '20мг', price: 790, palette: 'tropical', stock: 'много', desc: 'Фирменный экзотический микс Maxwells.' },
    { id: 'l09', cat: 'liquid', brand: 'MAGIC WAND', name: 'Magic Wand Salt', flavor: 'Гранат-малина', volume: '30 мл', nic: '20мг', price: 590, palette: 'pomegranate', stock: 'много', desc: 'Сочный гранат с малиновой кислинкой.' },
    { id: 'l10', cat: 'liquid', brand: 'MAGIC WAND', name: 'Magic Wand Salt', flavor: 'Манго-маракуйя', volume: '30 мл', nic: '20мг', price: 590, palette: 'mango', stock: 'много', desc: 'Тропический микс по доступной цене.' },
    { id: 'l11', cat: 'liquid', brand: 'SMOKE KITCHEN', name: 'Smoke Kitchen Ladies', flavor: 'Honey Berries', volume: '30 мл', nic: '20мг', price: 750, palette: 'raspberry', stock: 'много', desc: 'Медово-ягодная композиция с лёгкой сливочной нотой.' },
    { id: 'l12', cat: 'liquid', brand: 'SMOKE KITCHEN', name: 'Smoke Kitchen Ladies', flavor: 'Cool Apple', volume: '30 мл', nic: '20мг', price: 750, palette: 'apple', stock: 'много', desc: 'Зелёное яблоко с лёгким холодком.' },
    { id: 'l13', cat: 'liquid', brand: 'BAD DRIP', name: 'Bad Drip Salt', flavor: 'Cereal Trip', volume: '30 мл', nic: '20мг', price: 890, palette: 'apricot', stock: 'есть', desc: 'Сладкие хлопья с молоком — десертный вкус.' },
    { id: 'l14', cat: 'liquid', brand: 'BAD DRIP', name: 'Bad Drip Salt', flavor: 'Don\'t Care Bear', volume: '30 мл', nic: '20мг', price: 890, palette: 'bubblegum', stock: 'есть', desc: 'Мармеладные мишки — фирменный вкус Bad Drip.' },
    { id: 'l15', cat: 'liquid', brand: 'NASTY', name: 'Nasty Juice Salt', flavor: 'Cush Man Mango', volume: '30 мл', nic: '20мг', price: 750, palette: 'mango', stock: 'много', desc: 'Спелое манго с тропическим оттенком.' },
    { id: 'l16', cat: 'liquid', brand: 'NASTY', name: 'Nasty Juice Salt', flavor: 'Bad Blood', volume: '30 мл', nic: '20мг', price: 750, palette: 'pomegranate', stock: 'много', desc: 'Гранат с насыщенным послевкусием.' },
    { id: 'l17', cat: 'liquid', brand: 'BLACKBAR', name: 'Blackbar Salt', flavor: 'Tropical Punch', volume: '30 мл', nic: '20мг', price: 690, palette: 'tropical', stock: 'много', desc: 'Тропический пунш — экзотический микс.' },
    { id: 'l18', cat: 'liquid', brand: 'BLACKBAR', name: 'Blackbar Salt', flavor: 'Ледяная дыня', volume: '30 мл', nic: '20мг', price: 690, palette: 'melon', stock: 'много', desc: 'Сочная дыня с холодком.' },
    { id: 'l19', cat: 'liquid', brand: 'EZ DUZ IT', name: 'EZ Duz It Salt', flavor: 'Strawberry', volume: '30 мл', nic: '20мг', price: 590, palette: 'strawberry', stock: 'много', desc: 'Простая и чистая клубника без перегруза.' },
    { id: 'l20', cat: 'liquid', brand: 'EZ DUZ IT', name: 'EZ Duz It Salt', flavor: 'Apple', volume: '30 мл', nic: '20мг', price: 590, palette: 'apple', stock: 'много', desc: 'Натуральное зелёное яблоко.' },
    { id: 'l21', cat: 'liquid', brand: 'TYAG', name: 'TYAG SIGNATURE', flavor: 'Виноград-черника', volume: '30 мл', nic: '20мг', price: 690, palette: 'grape', popular: true, stock: 'много', desc: 'Фирменная жидкость магазина: насыщенный виноград с черничной нотой.' },
    { id: 'l22', cat: 'liquid', brand: 'TYAG', name: 'TYAG SIGNATURE', flavor: 'Манго-личи', volume: '30 мл', nic: '20мг', price: 690, palette: 'mango', stock: 'много', desc: 'Фирменная жидкость: спелое манго и нежное личи.' },

    // ========== ACCESSORY (Аксессуары) ==========
    { id: 'a01', cat: 'accessory', brand: 'BASIC', name: 'Кабель USB Type-C 1м', flavor: 'Чёрный', price: 290, palette: 'mist', stock: 'много', desc: 'Качественный кабель USB-C для зарядки большинства POD-систем.' },
    { id: 'a02', cat: 'accessory', brand: 'BASIC', name: 'Кабель USB Type-C 0.3м', flavor: 'Чёрный', price: 190, palette: 'mist', stock: 'много', desc: 'Короткий кабель USB-C для удобного ношения с собой.' },
    { id: 'a03', cat: 'accessory', brand: 'TYAG', name: 'Сетевой адаптер 2A', flavor: 'Чёрный', price: 490, palette: 'mist', stock: 'много', desc: 'Адаптер 5V/2A с быстрой зарядкой.' },
    { id: 'a04', cat: 'accessory', brand: 'CALIBURN', name: 'Силиконовый чехол Caliburn G3', flavor: 'Чёрный', price: 350, palette: 'mist', stock: 'много', desc: 'Защитный силиконовый чехол для Caliburn G3.' },
    { id: 'a05', cat: 'accessory', brand: 'XROS', name: 'Силиконовый чехол XROS 4', flavor: 'Прозрачный', price: 350, palette: 'mist', stock: 'много', desc: 'Прозрачный чехол для VAPORESSO XROS 4.' },
    { id: 'a06', cat: 'accessory', brand: 'TYAG', name: 'Дрип-тип 510 универсальный', flavor: 'Чёрный смолистый', price: 250, palette: 'mist', stock: 'много', desc: 'Сменный мундштук 510 для атомайзеров.' },
    { id: 'a07', cat: 'accessory', brand: 'TYAG', name: 'Дрип-тип 810 широкий', flavor: 'Серебристый', price: 290, palette: 'mist', stock: 'много', desc: 'Сменный мундштук 810 для дрипок и баков.' },
    { id: 'a08', cat: 'accessory', brand: 'NITECORE', name: 'Зарядное устройство Nitecore UM2', flavor: 'Чёрный', price: 1990, palette: 'mist', stock: 'есть', desc: 'Интеллектуальная зарядка для аккумуляторов 18650/21700.' },
    { id: 'a09', cat: 'accessory', brand: 'MOLICEL', name: 'Аккумулятор Molicel P26A 18650', flavor: '2600 mAh', price: 690, palette: 'mist', popular: true, stock: 'много', desc: 'Высокотоковый аккумулятор 25А для боксмодов.' },
    { id: 'a10', cat: 'accessory', brand: 'MOLICEL', name: 'Аккумулятор Molicel P42A 21700', flavor: '4000 mAh', price: 990, palette: 'mist', stock: 'много', desc: 'Топовый аккумулятор 45А для мощных модов.' },
    { id: 'a11', cat: 'accessory', brand: 'TYAG', name: 'Кейс для аккумуляторов 2 шт', flavor: 'Чёрный', price: 190, palette: 'mist', stock: 'много', desc: 'Пластиковый кейс для переноски 18650/20700.' },
    { id: 'a12', cat: 'accessory', brand: 'TYAG', name: 'Чехол-сумка для девайса', flavor: 'Чёрный нейлон', price: 590, palette: 'mist', stock: 'много', desc: 'Удобный чехол с карманом для жидкости и аксессуаров.' },
    { id: 'a13', cat: 'accessory', brand: 'TYAG', name: 'Шнурок-лэньярд', flavor: 'Чёрный', price: 290, palette: 'mist', stock: 'много', desc: 'Универсальный шнурок для ношения вейпа на шее.' },
    { id: 'a14', cat: 'accessory', brand: 'TYAG', name: 'Лейка-носик для жидкости', flavor: 'Прозрачный', price: 90, palette: 'mist', stock: 'много', desc: 'Удобная насадка для аккуратной заправки.' },
    { id: 'a15', cat: 'accessory', brand: 'TYAG', name: 'Чистящая ткань микрофибра', flavor: 'Чёрный', price: 150, palette: 'mist', stock: 'много', desc: 'Микрофибра для протирки экрана и корпуса.' },
    { id: 'a16', cat: 'accessory', brand: 'TYAG', name: 'Пинцет керамический', flavor: 'Белый', price: 250, palette: 'mist', stock: 'много', desc: 'Керамический пинцет для работы со спиралями.' },
    { id: 'a17', cat: 'accessory', brand: 'COIL MASTER', name: 'Coil Master DIY Kit V3', flavor: 'Чёрный', price: 2890, palette: 'mist', stock: 'мало', desc: 'Профессиональный набор для намотки спиралей.' },

    // ========== CONSUMABLE (Расходники) ==========
    { id: 'c01', cat: 'consumable', brand: 'UWELL', name: 'Картридж Caliburn G2', flavor: '0.8 Ом, 4 шт', price: 690, palette: 'mist', popular: true, stock: 'много', desc: 'Сменные картриджи для UWELL Caliburn G2 / GK2 / X. Упаковка 4 шт.' },
    { id: 'c02', cat: 'consumable', brand: 'UWELL', name: 'Картридж Caliburn G3', flavor: '0.9 Ом, 2 шт', price: 590, palette: 'mist', popular: true, stock: 'много', desc: 'Картриджи для нового Caliburn G3. Упаковка 2 шт.' },
    { id: 'c03', cat: 'consumable', brand: 'UWELL', name: 'Испаритель Caliburn A3S', flavor: '1.0 Ом, 4 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Сменный picod для Caliburn A2/A3/A3S.' },
    { id: 'c04', cat: 'consumable', brand: 'VAPORESSO', name: 'Картридж XROS', flavor: '0.8 Ом, 3 шт', price: 590, palette: 'mist', popular: true, stock: 'много', desc: 'Сменные картриджи для VAPORESSO XROS / XROS 2 / 3 / 4. Упаковка 3 шт.' },
    { id: 'c05', cat: 'consumable', brand: 'VAPORESSO', name: 'Картридж XROS', flavor: '1.0 Ом, 3 шт', price: 590, palette: 'mist', stock: 'много', desc: 'XROS картриджи с большим сопротивлением для MTL парения.' },
    { id: 'c06', cat: 'consumable', brand: 'SMOK', name: 'Испаритель Nord 5 RPM 3', flavor: '0.23 Ом, 3 шт', price: 690, palette: 'mist', stock: 'много', desc: 'Сменные испарители для SMOK Nord 5.' },
    { id: 'c07', cat: 'consumable', brand: 'SMOK', name: 'Картридж Novo X', flavor: '0.8 Ом, 3 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Сменные картриджи для SMOK Novo X / 4.' },
    { id: 'c08', cat: 'consumable', brand: 'VOOPOO', name: 'Картридж ARGUS P2', flavor: '0.7 Ом, 2 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Сменные картриджи для VOOPOO ARGUS P1/P2.' },
    { id: 'c09', cat: 'consumable', brand: 'VOOPOO', name: 'Картридж PnP', flavor: 'PnP-TM2 0.8 Ом', price: 350, palette: 'mist', stock: 'много', desc: 'Универсальный испаритель серии PnP. 1 шт.' },
    { id: 'c10', cat: 'consumable', brand: 'OXVA', name: 'Картридж Xlim', flavor: '0.8 Ом, 3 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Сменные картриджи для всей линейки OXVA Xlim.' },
    { id: 'c11', cat: 'consumable', brand: 'GEEKVAPE', name: 'Испаритель Aegis Boost', flavor: 'B-Series 0.4 Ом, 5 шт', price: 890, palette: 'mist', stock: 'много', desc: 'Сменные испарители B-Series для Aegis Boost / Aegis Hero.' },
    { id: 'c12', cat: 'consumable', brand: 'GEEKVAPE', name: 'Картридж Wenax Q', flavor: '0.9 Ом, 2 шт', price: 490, palette: 'mist', stock: 'много', desc: 'Сменный картридж для GEEKVAPE Wenax Q.' },
    { id: 'c13', cat: 'consumable', brand: 'LOST VAPE', name: 'Картридж URSA UB Lite', flavor: '0.8 Ом, 3 шт', price: 690, palette: 'mist', stock: 'много', desc: 'Картриджи для линейки LOST VAPE URSA.' },
    { id: 'c14', cat: 'consumable', brand: 'INNOKIN', name: 'Картридж Klypse', flavor: '0.8 Ом, 2 шт', price: 490, palette: 'mist', stock: 'много', desc: 'Сменный картридж для INNOKIN Klypse.' },
    { id: 'c15', cat: 'consumable', brand: 'ASPIRE', name: 'Картридж Cyber S / G', flavor: '0.8 Ом, 3 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Картриджи для ASPIRE Cyber S / Cyber G.' },
    { id: 'c16', cat: 'consumable', brand: 'COTTON BACON', name: 'Хлопок Cotton Bacon V2', flavor: '1 упаковка', price: 390, palette: 'mist', popular: true, stock: 'много', desc: 'Премиальный американский хлопок для намоток.' },
    { id: 'c17', cat: 'consumable', brand: 'COIL MASTER', name: 'Coil Master Wire Kanthal', flavor: 'A1, 24AWG, 5м', price: 250, palette: 'mist', stock: 'много', desc: 'Проволока Kanthal A1 для намотки спиралей.' },
    { id: 'c18', cat: 'consumable', brand: 'COIL MASTER', name: 'Готовые спирали Clapton', flavor: 'Ni80 0.3 Ом, 10 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Готовые сложные спирали Clapton.' },
    { id: 'c19', cat: 'consumable', brand: 'TYAG', name: 'Силиконовая колба 30мл', flavor: 'Прозрачная', price: 90, palette: 'mist', stock: 'много', desc: 'Удобная флакон-капельница для жидкости.' },
    { id: 'c20', cat: 'consumable', brand: 'CALIBURN', name: 'Картридж Caliburn A2', flavor: '0.9 Ом, 2 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Сменные картриджи для UWELL Caliburn A2 / AK2.' },
    { id: 'c21', cat: 'consumable', brand: 'CALIBURN', name: 'Картридж Caliburn G', flavor: '1.0 Ом, 4 шт', price: 690, palette: 'mist', stock: 'много', desc: 'Картриджи первого Caliburn G — классика.' },
    { id: 'c22', cat: 'consumable', brand: 'VAPORESSO', name: 'Испаритель GTX', flavor: '0.4 Ом, 5 шт', price: 690, palette: 'mist', stock: 'много', desc: 'Универсальные GTX испарители для Target PM80 и LUXE.' },
    { id: 'c23', cat: 'consumable', brand: 'SMOK', name: 'Испаритель RPM 2', flavor: '0.16 Ом, 5 шт', price: 690, palette: 'mist', stock: 'много', desc: 'Сменные RPM 2 испарители для SMOK RPM 4 / 5.' },
    { id: 'c24', cat: 'consumable', brand: 'VOOPOO', name: 'Картридж Drag Nano 2', flavor: '0.8 Ом, 2 шт', price: 490, palette: 'mist', stock: 'много', desc: 'Сменные картриджи для VOOPOO Drag Nano 2.' },
    { id: 'c25', cat: 'consumable', brand: 'OXVA', name: 'Картридж Oneo / Xlim SQ', flavor: '0.6 Ом, 3 шт', price: 590, palette: 'mist', stock: 'много', desc: 'Картриджи для линейки OXVA Oneo и Xlim SQ.' },
    { id: 'c26', cat: 'consumable', brand: 'COTTON BACON', name: 'Хлопок Native Wicks', flavor: '1 упаковка', price: 450, palette: 'mist', stock: 'много', desc: 'Премиальный хлопок Native Wicks Platinum.' },
    { id: 'c27', cat: 'consumable', brand: 'TYAG', name: 'Хлопок Cotton Pads', flavor: 'Упаковка 100 г', price: 250, palette: 'mist', stock: 'много', desc: 'Бюджетный медицинский хлопок для намоток.' },
    { id: 'c28', cat: 'consumable', brand: 'TYAG', name: 'Кольца уплотнительные O-Ring', flavor: 'Набор 50 шт', price: 190, palette: 'mist', stock: 'много', desc: 'Резиновые уплотнители разных размеров.' },
    { id: 'c29', cat: 'consumable', brand: 'GEEKVAPE', name: 'Испаритель Z Series', flavor: 'Z2 0.4 Ом, 5 шт', price: 890, palette: 'mist', stock: 'много', desc: 'Сменные испарители для баков Zeus / Z.' }
];

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
