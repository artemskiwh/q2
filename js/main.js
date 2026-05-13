/* ===== TYAG MOSKVA — common scripts ===== */

const STORAGE_KEYS = {
    AGE: 'tyag_age_verified',
    CART: 'tyag_cart',
    FAV: 'tyag_favorites'
};

/* ----- LocalStorage helpers ----- */
function lsGet(key, fallback) {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch (_) { return fallback; }
}
function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
}

/* ----- Cart ----- */
const Cart = {
    items: lsGet(STORAGE_KEYS.CART, []),
    save() { lsSet(STORAGE_KEYS.CART, this.items); updateHeaderCounts(); },
    add(id, qty = 1) {
        const existing = this.items.find(it => it.id === id);
        if (existing) existing.qty += qty;
        else this.items.push({ id, qty });
        this.save();
    },
    remove(id) {
        this.items = this.items.filter(it => it.id !== id);
        this.save();
    },
    setQty(id, qty) {
        const it = this.items.find(i => i.id === id);
        if (it) {
            it.qty = Math.max(1, qty);
            this.save();
        }
    },
    has(id) { return !!this.items.find(it => it.id === id); },
    count() { return this.items.reduce((s, it) => s + it.qty, 0); },
    total() {
        return this.items.reduce((s, it) => {
            const p = getProductById(it.id);
            return p ? s + p.price * it.qty : s;
        }, 0);
    },
    clear() { this.items = []; this.save(); }
};

/* ----- Favorites ----- */
const Favorites = {
    items: lsGet(STORAGE_KEYS.FAV, []),
    save() { lsSet(STORAGE_KEYS.FAV, this.items); updateHeaderCounts(); },
    toggle(id) {
        if (this.items.includes(id)) {
            this.items = this.items.filter(i => i !== id);
        } else {
            this.items.push(id);
        }
        this.save();
        return this.items.includes(id);
    },
    has(id) { return this.items.includes(id); },
    count() { return this.items.length; }
};

/* ----- Header / mobile-nav badge update ----- */
function updateHeaderCounts() {
    const cartBadges = document.querySelectorAll('[data-cart-count]');
    const favBadges = document.querySelectorAll('[data-fav-count]');
    const cc = Cart.count();
    const fc = Favorites.count();
    cartBadges.forEach(b => b.textContent = cc > 0 ? cc : '');
    favBadges.forEach(b => b.textContent = fc > 0 ? fc : '');
}

/* ----- Toast ----- */
let toastTimer = null;
function toast(text) {
    let el = document.querySelector('.toast');
    if (!el) {
        el = document.createElement('div');
        el.className = 'toast';
        document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 1900);
}

/* ----- Age gate ----- */
function initAgeGate() {
    const gate = document.getElementById('age-gate');
    if (!gate) return;
    if (lsGet(STORAGE_KEYS.AGE, false)) {
        gate.classList.remove('show');
        return;
    }
    gate.classList.add('show');
    document.body.style.overflow = 'hidden';

    const yes = document.getElementById('age-yes');
    const no = document.getElementById('age-no');

    yes.addEventListener('click', () => {
        lsSet(STORAGE_KEYS.AGE, true);
        gate.classList.remove('show');
        document.body.style.overflow = '';
    });
    no.addEventListener('click', () => {
        try {
            window.location.href = 'https://www.google.com/';
        } catch (_) {
            document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;color:#fff;font-family:sans-serif;background:#0d0d0d;padding:24px;text-align:center;">Доступ к сайту разрешён только лицам старше 18 лет.</div>';
        }
    });
}

/* ===== SVG product illustration =====
   Realistic disposable vape / pod / liquid / accessory illustrations.
*/
function productSVG(product) {
    const palette = (window.COLOR_PALETTES && COLOR_PALETTES[product.palette]) || ['#444', '#666', '#888'];
    const [dark, mid, light] = palette;
    const safeId = 'g' + product.id;
    const brand = (product.brand || '').toUpperCase();
    const flavor = (product.flavor || '');
    const puffsLabel = product.puffs ? product.puffs : '';

    if (product.cat === 'liquid') {
        return liquidBottleSVG(safeId, dark, mid, light, brand, flavor);
    }
    if (product.cat === 'accessory') {
        return accessorySVG(safeId, brand, flavor, light);
    }
    if (product.cat === 'consumable') {
        return cartridgeSVG(safeId, brand, flavor, light);
    }
    if (product.cat === 'reusable') {
        return podDeviceSVG(safeId, dark, mid, light, brand, flavor);
    }
    return disposableVapeSVG(safeId, dark, mid, light, brand, flavor, puffsLabel);
}

function disposableVapeSVG(id, dark, mid, light, brand, flavor, puffs) {
    const brandTxt = brand.length > 9 ? brand.slice(0, 9) : brand;
    return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${id}" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stop-color="${light}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.04"/>
        </linearGradient>
        <linearGradient id="body${id}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="${dark}"/>
            <stop offset="30%" stop-color="${mid}"/>
            <stop offset="55%" stop-color="${light}"/>
            <stop offset="80%" stop-color="${mid}"/>
            <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
        <linearGradient id="shine${id}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
            <stop offset="50%" stop-color="#ffffff" stop-opacity="0.42"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="bot${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.45"/>
        </linearGradient>
        <radialGradient id="glow${id}" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stop-color="${light}" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="${light}" stop-opacity="0"/>
        </radialGradient>
    </defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <ellipse cx="100" cy="120" rx="80" ry="100" fill="url(#glow${id})"/>
    <!-- mouthpiece -->
    <path d="M86 12 Q86 8 90 8 L110 8 Q114 8 114 12 L114 22 L86 22 Z" fill="#1a1a1a"/>
    <rect x="82" y="22" width="36" height="14" rx="3" fill="#0d0d0d"/>
    <!-- body shadow -->
    <rect x="58" y="36" width="84" height="190" rx="26" fill="#000" opacity="0.35"/>
    <!-- body -->
    <rect x="56" y="34" width="84" height="186" rx="26" fill="url(#body${id})"/>
    <!-- shine on left edge -->
    <rect x="58" y="38" width="84" height="180" rx="24" fill="url(#shine${id})" opacity="0.55"/>
    <!-- bottom shadow -->
    <rect x="56" y="34" width="84" height="186" rx="26" fill="url(#bot${id})"/>
    <!-- subtle outline -->
    <rect x="56" y="34" width="84" height="186" rx="26" fill="none" stroke="#000" stroke-opacity="0.35" stroke-width="0.8"/>
    <!-- brand label -->
    <text x="98" y="92" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="900" font-size="14" letter-spacing="0.5">${escapeXml(brandTxt)}</text>
    ${puffs ? `<text x="98" y="108" text-anchor="middle" fill="#ffffff" fill-opacity="0.78" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="9" letter-spacing="1">${puffs} PUFFS</text>` : ''}
    <!-- flavor capsule -->
    <rect x="68" y="138" width="60" height="46" rx="9" fill="#000" fill-opacity="0.32"/>
    <text x="98" y="158" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-weight="700" font-size="8">${escapeXml(wrapText(flavor, 14, 0))}</text>
    <text x="98" y="170" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-family="Inter, Arial, sans-serif" font-weight="600" font-size="8">${escapeXml(wrapText(flavor, 14, 1))}</text>
    <!-- led / button -->
    <circle cx="98" cy="202" r="5" fill="#0d0d0d"/>
    <circle cx="98" cy="202" r="3" fill="${light}" opacity="0.85"/>
</svg>`;
}

function podDeviceSVG(id, dark, mid, light, brand, flavor) {
    const brandTxt = (brand || '').slice(0, 10);
    return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${mid}" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.04"/>
        </linearGradient>
        <linearGradient id="bod${id}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#1d1d1d"/>
            <stop offset="40%" stop-color="#2a2a2a"/>
            <stop offset="60%" stop-color="#1d1d1d"/>
            <stop offset="100%" stop-color="#0d0d0d"/>
        </linearGradient>
        <linearGradient id="cap${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${light}" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.45"/>
        </linearGradient>
    </defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <!-- pod tip -->
    <path d="M88 12 Q88 6 94 6 L106 6 Q112 6 112 12 L112 24 L88 24 Z" fill="#0a0a0a"/>
    <rect x="84" y="24" width="32" height="14" rx="3" fill="#181818"/>
    <!-- pod cartridge translucent -->
    <rect x="76" y="38" width="48" height="62" rx="6" fill="url(#cap${id})" stroke="#000" stroke-opacity="0.6" stroke-width="0.7"/>
    <!-- main body -->
    <rect x="60" y="98" width="80" height="128" rx="16" fill="url(#bod${id})" stroke="#000" stroke-opacity="0.5" stroke-width="0.8"/>
    <!-- screen/window -->
    <rect x="72" y="110" width="56" height="38" rx="4" fill="#000"/>
    <rect x="74" y="112" width="52" height="34" rx="3" fill="#0d0d0d"/>
    <text x="100" y="128" text-anchor="middle" fill="${light}" font-family="Inter, sans-serif" font-weight="800" font-size="11">${escapeXml(brandTxt)}</text>
    <text x="100" y="142" text-anchor="middle" fill="#ffffff" fill-opacity="0.55" font-family="Inter, sans-serif" font-size="7">${escapeXml(wrapText(flavor, 14, 0))}</text>
    <!-- branding line -->
    <rect x="80" y="160" width="40" height="3" rx="1" fill="#2a2a2a"/>
    <!-- fire button -->
    <circle cx="100" cy="186" r="11" fill="#0a0a0a" stroke="#2a2a2a" stroke-width="1.5"/>
    <circle cx="100" cy="186" r="5" fill="${light}" opacity="0.65"/>
    <!-- USB hint -->
    <rect x="92" y="216" width="16" height="3" rx="1" fill="#2a2a2a"/>
</svg>`;
}

function liquidBottleSVG(id, dark, mid, light, brand, flavor) {
    const brandTxt = (brand || '').slice(0, 12);
    return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${mid}" stop-opacity="0.16"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.04"/>
        </linearGradient>
        <linearGradient id="liq${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${light}"/>
            <stop offset="55%" stop-color="${mid}"/>
            <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
        <linearGradient id="hl${id}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
            <stop offset="40%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <!-- cap -->
    <rect x="76" y="22" width="48" height="22" rx="3" fill="#1a1a1a"/>
    <rect x="78" y="14" width="44" height="12" rx="3" fill="#0d0d0d"/>
    <!-- neck -->
    <rect x="84" y="44" width="32" height="12" fill="#0d0d0d"/>
    <!-- shoulders / body -->
    <path d="M68 56 L132 56 L142 78 L142 210 Q142 220 132 220 L68 220 Q58 220 58 210 L58 78 Z"
          fill="url(#liq${id})" stroke="#000" stroke-opacity="0.45" stroke-width="0.8"/>
    <!-- left highlight strip -->
    <path d="M70 70 Q66 90 66 150 L66 200" fill="none" stroke="url(#hl${id})" stroke-width="6" stroke-linecap="round"/>
    <!-- label background -->
    <rect x="68" y="100" width="64" height="100" rx="6" fill="#000" fill-opacity="0.45"/>
    <!-- label content -->
    <text x="100" y="124" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-weight="900" font-size="12" letter-spacing="0.5">${escapeXml(brandTxt)}</text>
    <line x1="76" y1="132" x2="124" y2="132" stroke="${light}" stroke-opacity="0.7" stroke-width="0.8"/>
    <text x="100" y="148" text-anchor="middle" fill="${light}" font-family="Inter, sans-serif" font-weight="700" font-size="8" letter-spacing="2">SALT NIC</text>
    <text x="100" y="170" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-weight="600" font-size="8">${escapeXml(wrapText(flavor, 18, 0))}</text>
    <text x="100" y="182" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-family="Inter, sans-serif" font-weight="500" font-size="8">${escapeXml(wrapText(flavor, 18, 1))}</text>
    <text x="100" y="200" text-anchor="middle" fill="#ffffff" fill-opacity="0.7" font-family="Inter, sans-serif" font-weight="700" font-size="7" letter-spacing="2">30 ML · 20MG</text>
</svg>`;
}

function cartridgeSVG(id, brand, flavor, accent) {
    const brandTxt = (brand || '').slice(0, 11);
    return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${accent}" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="#000" stop-opacity="0.04"/>
        </linearGradient>
        <linearGradient id="box${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#262626"/>
            <stop offset="100%" stop-color="#0f0f0f"/>
        </linearGradient>
    </defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <!-- box -->
    <rect x="34" y="58" width="132" height="124" rx="10" fill="url(#box${id})" stroke="#000" stroke-opacity="0.5" stroke-width="0.8"/>
    <!-- accent stripe -->
    <rect x="34" y="76" width="132" height="22" fill="${accent}" fill-opacity="0.25"/>
    <text x="100" y="92" text-anchor="middle" fill="${accent}" font-family="Inter, sans-serif" font-weight="900" font-size="14" letter-spacing="1">${escapeXml(brandTxt)}</text>
    <!-- product silhouette -->
    <rect x="60" y="110" width="20" height="48" rx="3" fill="#2a2a2a"/>
    <rect x="90" y="110" width="20" height="48" rx="3" fill="#2a2a2a"/>
    <rect x="120" y="110" width="20" height="48" rx="3" fill="#2a2a2a"/>
    <rect x="65" y="106" width="10" height="4" rx="1" fill="${accent}"/>
    <rect x="95" y="106" width="10" height="4" rx="1" fill="${accent}"/>
    <rect x="125" y="106" width="10" height="4" rx="1" fill="${accent}"/>
    <text x="100" y="174" text-anchor="middle" fill="#ffffff" fill-opacity="0.8" font-family="Inter, sans-serif" font-weight="600" font-size="8">${escapeXml(wrapText(flavor, 26, 0))}</text>
</svg>`;
}

function accessorySVG(id, brand, flavor, accent) {
    const lower = (brand + ' ' + flavor).toLowerCase();
    if (lower.includes('кабель') || lower.includes('кабел')) {
        return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a2a2a" stop-opacity="0.2"/><stop offset="100%" stop-color="#000" stop-opacity="0.04"/></linearGradient></defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <path d="M40 60 Q70 80 100 100 Q130 120 160 100 Q175 90 160 70" stroke="#1d1d1d" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M40 60 Q70 80 100 100 Q130 120 160 100 Q175 90 160 70" stroke="#2a2a2a" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="148" y="56" width="22" height="14" rx="3" fill="#1a1a1a" stroke="${accent}" stroke-width="0.6"/>
    <rect x="34" y="46" width="22" height="14" rx="3" fill="#1a1a1a" stroke="${accent}" stroke-width="0.6"/>
    <text x="100" y="190" text-anchor="middle" fill="#ffffff" fill-opacity="0.85" font-family="Inter, sans-serif" font-weight="800" font-size="13">USB TYPE-C</text>
    <text x="100" y="208" text-anchor="middle" fill="#cccccc" font-family="Inter, sans-serif" font-size="9">${escapeXml(flavor)}</text>
</svg>`;
    }
    if (lower.includes('аккумулятор') || lower.includes('mah')) {
        return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#444" stop-opacity="0.15"/><stop offset="100%" stop-color="#000" stop-opacity="0.04"/></linearGradient>
    <linearGradient id="cell${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a3a3a"/><stop offset="100%" stop-color="#161616"/></linearGradient></defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <rect x="84" y="32" width="32" height="10" rx="2" fill="#0d0d0d"/>
    <rect x="78" y="42" width="44" height="170" rx="8" fill="url(#cell${id})" stroke="#000" stroke-opacity="0.5" stroke-width="0.8"/>
    <rect x="82" y="86" width="36" height="60" rx="4" fill="${accent}" fill-opacity="0.25"/>
    <text x="100" y="110" text-anchor="middle" fill="${accent}" font-family="Inter, sans-serif" font-weight="900" font-size="12">${escapeXml((brand || '').slice(0, 9))}</text>
    <text x="100" y="128" text-anchor="middle" fill="#ffffff" fill-opacity="0.7" font-family="Inter, sans-serif" font-size="8">${escapeXml(flavor)}</text>
    <text x="100" y="232" text-anchor="middle" fill="#888" font-family="Inter, sans-serif" font-size="9">${escapeXml(flavor.includes('18650') || flavor.toLowerCase().includes('mah') ? flavor : '')}</text>
</svg>`;
    }
    return `
<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${accent}" stop-opacity="0.1"/><stop offset="100%" stop-color="#000" stop-opacity="0.04"/></linearGradient></defs>
    <rect width="200" height="240" rx="14" fill="url(#bg${id})"/>
    <rect x="46" y="60" width="108" height="120" rx="14" fill="#1d1d1d" stroke="#000" stroke-opacity="0.5" stroke-width="0.8"/>
    <rect x="46" y="84" width="108" height="24" fill="${accent}" fill-opacity="0.18"/>
    <text x="100" y="100" text-anchor="middle" fill="${accent}" font-family="Inter, sans-serif" font-weight="900" font-size="12">${escapeXml((brand || '').slice(0, 11))}</text>
    <text x="100" y="138" text-anchor="middle" fill="#ffffff" fill-opacity="0.8" font-family="Inter, sans-serif" font-weight="600" font-size="9">${escapeXml(wrapText(flavor, 22, 0))}</text>
    <text x="100" y="152" text-anchor="middle" fill="#ffffff" fill-opacity="0.55" font-family="Inter, sans-serif" font-size="8">${escapeXml(wrapText(flavor, 22, 1))}</text>
    <circle cx="100" cy="168" r="3" fill="${accent}"/>
</svg>`;
}

function wrapText(text, perLine, lineIndex) {
    if (!text) return '';
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const w of words) {
        if ((current + ' ' + w).trim().length > perLine) {
            if (current) lines.push(current);
            current = w;
        } else {
            current = (current + ' ' + w).trim();
        }
    }
    if (current) lines.push(current);
    return lines[lineIndex] || '';
}

function escapeXml(s) {
    return String(s || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

/* ===== Category icon SVG — looks like a small group of products ===== */
function categoryIconSVG(catId) {
    if (catId === 'dispose') {
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cdA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FF6781"/><stop offset="100%" stop-color="#7A1430"/></linearGradient>
                <linearGradient id="cdB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#F0911C"/><stop offset="100%" stop-color="#7A3A06"/></linearGradient>
                <linearGradient id="cdC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7C3FBC"/><stop offset="100%" stop-color="#2D124F"/></linearGradient>
            </defs>
            <rect x="14" y="20" width="20" height="64" rx="7" fill="url(#cdA)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="18" y="14" width="12" height="8" rx="2" fill="#1a1a1a"/>
            <rect x="40" y="14" width="20" height="70" rx="7" fill="url(#cdB)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="44" y="8" width="12" height="8" rx="2" fill="#1a1a1a"/>
            <rect x="66" y="22" width="20" height="62" rx="7" fill="url(#cdC)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="70" y="16" width="12" height="8" rx="2" fill="#1a1a1a"/>
        </svg>`;
    }
    if (catId === 'reusable') {
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="crsA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3FB76F"/><stop offset="100%" stop-color="#0E4324"/></linearGradient>
                <linearGradient id="crsB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#506173"/><stop offset="100%" stop-color="#1A222C"/></linearGradient>
            </defs>
            <rect x="20" y="22" width="26" height="62" rx="8" fill="url(#crsA)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="26" y="14" width="14" height="10" rx="3" fill="#1a1a1a"/>
            <rect x="28" y="34" width="10" height="22" rx="2" fill="#0d0d0d" fill-opacity="0.6"/>
            <circle cx="33" cy="72" r="3" fill="#FFD645" opacity="0.6"/>
            <rect x="56" y="20" width="26" height="64" rx="8" fill="url(#crsB)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="62" y="12" width="14" height="10" rx="3" fill="#0d0d0d"/>
            <rect x="64" y="32" width="10" height="22" rx="2" fill="#0d0d0d"/>
            <circle cx="69" cy="70" r="3" fill="#fff" opacity="0.4"/>
        </svg>`;
    }
    if (catId === 'liquid') {
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="clqA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FAE026"/><stop offset="100%" stop-color="#6F5500"/></linearGradient>
                <linearGradient id="clqB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#E63952"/><stop offset="100%" stop-color="#5E0C1C"/></linearGradient>
            </defs>
            <rect x="22" y="16" width="14" height="8" rx="2" fill="#1a1a1a"/>
            <rect x="25" y="12" width="8" height="6" fill="#0d0d0d"/>
            <path d="M18 24 L40 24 L44 32 L44 84 Q44 88 40 88 L18 88 Q14 88 14 84 L14 32 Z" fill="url(#clqA)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="22" y="42" width="14" height="34" rx="2" fill="#0d0d0d" fill-opacity="0.5"/>
            <rect x="60" y="16" width="14" height="8" rx="2" fill="#1a1a1a"/>
            <rect x="63" y="12" width="8" height="6" fill="#0d0d0d"/>
            <path d="M56 24 L78 24 L82 32 L82 84 Q82 88 78 88 L56 88 Q52 88 52 84 L52 32 Z" fill="url(#clqB)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
            <rect x="60" y="42" width="14" height="34" rx="2" fill="#0d0d0d" fill-opacity="0.5"/>
        </svg>`;
    }
    if (catId === 'accessory') {
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 30 Q40 50 60 40 Q78 32 82 20" stroke="#2a2a2a" stroke-width="6" fill="none" stroke-linecap="round"/>
            <rect x="14" y="22" width="14" height="14" rx="3" fill="#1a1a1a" stroke="#FFD645" stroke-width="0.8"/>
            <rect x="78" y="12" width="14" height="14" rx="3" fill="#1a1a1a" stroke="#FFD645" stroke-width="0.8"/>
            <rect x="30" y="56" width="40" height="28" rx="6" fill="#1a1a1a" stroke="#FFD645" stroke-width="1"/>
            <rect x="36" y="62" width="28" height="6" rx="1" fill="#FFD645" fill-opacity="0.5"/>
            <circle cx="50" cy="76" r="3" fill="#FFD645"/>
        </svg>`;
    }
    // consumable
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="cca" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a3a3a"/><stop offset="100%" stop-color="#161616"/></linearGradient>
        </defs>
        <rect x="14" y="34" width="72" height="44" rx="6" fill="url(#cca)" stroke="#000" stroke-opacity="0.4" stroke-width="0.8"/>
        <rect x="14" y="42" width="72" height="10" fill="#FFD645" fill-opacity="0.2"/>
        <rect x="22" y="56" width="8" height="18" rx="2" fill="#2a2a2a"/>
        <rect x="34" y="56" width="8" height="18" rx="2" fill="#2a2a2a"/>
        <rect x="46" y="56" width="8" height="18" rx="2" fill="#2a2a2a"/>
        <rect x="58" y="56" width="8" height="18" rx="2" fill="#2a2a2a"/>
        <rect x="70" y="56" width="8" height="18" rx="2" fill="#2a2a2a"/>
        <rect x="24" y="54" width="4" height="3" fill="#FFD645"/>
        <rect x="36" y="54" width="4" height="3" fill="#FFD645"/>
        <rect x="48" y="54" width="4" height="3" fill="#FFD645"/>
        <rect x="60" y="54" width="4" height="3" fill="#FFD645"/>
        <rect x="72" y="54" width="4" height="3" fill="#FFD645"/>
    </svg>`;
}

/* ===== Render product card ===== */
function renderProductCard(product, options = {}) {
    const inFav = Favorites.has(product.id);
    const inCart = Cart.has(product.id);
    return `
<article class="product-card" data-id="${product.id}">
    <a href="product.html?id=${product.id}" class="product-image" aria-label="${escapeXml(product.name)}">
        ${productSVG(product)}
    </a>
    <button class="fav-btn ${inFav ? 'active' : ''}" data-fav="${product.id}" aria-label="В избранное">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
    </button>
    <div class="product-body">
        <a href="product.html?id=${product.id}">
            <h3 class="product-name">${escapeXml(product.name)}</h3>
        </a>
        <p class="product-desc">${escapeXml(product.flavor || '')}</p>
        <div class="product-bottom">
            <div>
                <div class="product-price">${formatPrice(product.price)}</div>
                ${product.oldPrice ? `<div class="product-old-price">${formatPrice(product.oldPrice)}</div>` : ''}
            </div>
            <button class="btn-cart ${inCart ? 'in-cart' : ''}" data-add="${product.id}" aria-label="В корзину">
                ${inCart ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`}
                <span>${inCart ? 'В корзине' : 'В корзину'}</span>
            </button>
        </div>
    </div>
</article>`;
}

/* ===== Bind product card events (delegated) ===== */
function bindProductActions(root = document) {
    root.addEventListener('click', (e) => {
        const favBtn = e.target.closest('[data-fav]');
        const addBtn = e.target.closest('[data-add]');
        if (favBtn) {
            e.preventDefault();
            const id = favBtn.dataset.fav;
            const added = Favorites.toggle(id);
            favBtn.classList.toggle('active', added);
            toast(added ? 'Добавлено в избранное' : 'Убрано из избранного');
        }
        if (addBtn) {
            e.preventDefault();
            const id = addBtn.dataset.add;
            if (Cart.has(id)) {
                Cart.remove(id);
                addBtn.classList.remove('in-cart');
                addBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>В корзину</span>';
                toast('Убрано из корзины');
            } else {
                Cart.add(id, 1);
                addBtn.classList.add('in-cart');
                addBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>В корзине</span>';
                toast('Добавлено в корзину');
            }
        }
    });
}

/* ===== Search ===== */
function bindSearch() {
    const inputs = document.querySelectorAll('[data-search]');
    inputs.forEach(input => {
        let timer = null;
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = input.value.trim();
                window.location.href = 'catalog.html' + (q ? '?q=' + encodeURIComponent(q) : '');
            }
        });
    });
}

/* ===== Init on DOM ready ===== */
document.addEventListener('DOMContentLoaded', () => {
    initAgeGate();
    updateHeaderCounts();
    bindProductActions();
    bindSearch();
});
