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
   Generates colorful, distinctive bottle/device illustration based on category + palette.
*/
function productSVG(product) {
    const palette = (window.COLOR_PALETTES && COLOR_PALETTES[product.palette]) || ['#444', '#666', '#888'];
    const [dark, mid, light] = palette;
    const safeId = 'g' + product.id;
    const initials = (product.brand || product.name).slice(0, 4).toUpperCase();
    const label = (product.flavor || '').slice(0, 18);

    if (product.cat === 'liquid') {
        // Liquid bottle
        return `
<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${dark}" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="b${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${light}"/>
            <stop offset="55%" stop-color="${mid}"/>
            <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
        <linearGradient id="hl${safeId}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45"/>
            <stop offset="60%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <rect width="200" height="220" fill="url(#bg${safeId})" rx="14"/>
    <!-- bottle -->
    <rect x="70" y="36" width="60" height="14" rx="3" fill="#1a1a1a"/>
    <rect x="78" y="50" width="44" height="12" fill="#0d0d0d"/>
    <path d="M70 64 L130 64 L138 84 L138 188 Q138 198 128 198 L72 198 Q62 198 62 188 L62 84 Z"
          fill="url(#b${safeId})" stroke="#0a0a0a" stroke-width="1.5"/>
    <rect x="75" y="98" width="50" height="78" rx="6" fill="#0d0d0d" fill-opacity="0.55"/>
    <text x="100" y="128" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="13">${initials}</text>
    <text x="100" y="146" text-anchor="middle" fill="${light}" font-family="Inter, sans-serif" font-weight="700" font-size="9">SALT</text>
    <text x="100" y="166" text-anchor="middle" fill="#cccccc" font-family="Inter, sans-serif" font-size="7">${escapeXml(label)}</text>
    <path d="M72 78 Q70 95 70 130 L70 175" fill="none" stroke="url(#hl${safeId})" stroke-width="6" stroke-linecap="round"/>
</svg>`;
    }
    if (product.cat === 'accessory' || product.cat === 'consumable') {
        // Generic device / box illustration
        return `
<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#222" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#222" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="b${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3a3a3a"/>
            <stop offset="100%" stop-color="#1d1d1d"/>
        </linearGradient>
    </defs>
    <rect width="200" height="220" fill="url(#bg${safeId})" rx="14"/>
    <rect x="46" y="56" width="108" height="120" rx="14" fill="url(#b${safeId})" stroke="#0a0a0a" stroke-width="1.5"/>
    <rect x="60" y="72" width="80" height="42" rx="6" fill="#0d0d0d"/>
    <text x="100" y="98" text-anchor="middle" fill="${light}" font-family="Inter, sans-serif" font-weight="800" font-size="13">${initials}</text>
    <rect x="60" y="124" width="80" height="34" rx="6" fill="#0d0d0d" fill-opacity="0.7"/>
    <text x="100" y="146" text-anchor="middle" fill="#cccccc" font-family="Inter, sans-serif" font-size="8">${escapeXml(label)}</text>
    <circle cx="100" cy="172" r="5" fill="${mid}"/>
</svg>`;
    }
    if (product.cat === 'reusable') {
        // POD device illustration
        return `
<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${dark}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="b${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${light}"/>
            <stop offset="50%" stop-color="${mid}"/>
            <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
        <linearGradient id="hl${safeId}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.35"/>
            <stop offset="60%" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <rect width="200" height="220" fill="url(#bg${safeId})" rx="14"/>
    <!-- pod -->
    <rect x="74" y="22" width="52" height="32" rx="6" fill="#1a1a1a"/>
    <rect x="86" y="14" width="28" height="14" rx="4" fill="#0d0d0d"/>
    <rect x="68" y="50" width="64" height="158" rx="14" fill="url(#b${safeId})" stroke="#0a0a0a" stroke-width="1.5"/>
    <rect x="78" y="72" width="44" height="50" rx="4" fill="#0d0d0d" fill-opacity="0.55"/>
    <text x="100" y="95" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="12">${initials}</text>
    <text x="100" y="112" text-anchor="middle" fill="${light}" font-family="Inter, sans-serif" font-weight="700" font-size="8">POD</text>
    <rect x="80" y="138" width="40" height="22" rx="4" fill="#0d0d0d" fill-opacity="0.7"/>
    <text x="100" y="153" text-anchor="middle" fill="#dddddd" font-family="Inter, sans-serif" font-size="7">${escapeXml(label)}</text>
    <circle cx="100" cy="180" r="6" fill="#0d0d0d" stroke="${mid}" stroke-width="1.5"/>
    <path d="M76 60 Q72 100 72 165 L72 195" fill="none" stroke="url(#hl${safeId})" stroke-width="5" stroke-linecap="round"/>
</svg>`;
    }
    // dispose - colourful, signature disposable vape illustration
    return `
<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
        <linearGradient id="bg${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${dark}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="${dark}" stop-opacity="0.05"/>
        </linearGradient>
        <linearGradient id="b${safeId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${light}"/>
            <stop offset="50%" stop-color="${mid}"/>
            <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
        <linearGradient id="hl${safeId}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fff" stop-opacity="0.45"/>
            <stop offset="60%" stop-color="#fff" stop-opacity="0"/>
        </linearGradient>
    </defs>
    <rect width="200" height="220" fill="url(#bg${safeId})" rx="14"/>
    <!-- mouthpiece -->
    <rect x="82" y="14" width="36" height="20" rx="6" fill="#1a1a1a"/>
    <rect x="84" y="8" width="32" height="10" rx="3" fill="#0d0d0d"/>
    <!-- body -->
    <rect x="62" y="32" width="76" height="172" rx="22" fill="url(#b${safeId})" stroke="#0a0a0a" stroke-width="1.5"/>
    <!-- brand panel -->
    <rect x="74" y="60" width="52" height="44" rx="6" fill="#0d0d0d" fill-opacity="0.6"/>
    <text x="100" y="84" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-weight="800" font-size="13">${initials}</text>
    <text x="100" y="98" text-anchor="middle" fill="${light}" font-family="Inter, sans-serif" font-weight="700" font-size="8">${product.puffs ? product.puffs + ' PUFFS' : 'VAPE'}</text>
    <!-- flavor panel -->
    <rect x="74" y="120" width="52" height="58" rx="6" fill="#0d0d0d" fill-opacity="0.55"/>
    <text x="100" y="142" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-size="8" font-weight="600">${escapeXml(label)}</text>
    <circle cx="100" cy="162" r="6" fill="${light}"/>
    <!-- highlight -->
    <path d="M70 50 Q66 100 66 170 L66 190" fill="none" stroke="url(#hl${safeId})" stroke-width="6" stroke-linecap="round"/>
</svg>`;
}

function escapeXml(s) {
    return String(s || '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

/* ===== Category icon SVG ===== */
function categoryIconSVG(catId) {
    const accent = '#FFD645';
    switch (catId) {
        case 'dispose':
            return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="cdisp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff7b6b"/><stop offset="100%" stop-color="#7a1d1d"/></linearGradient></defs>
                <rect x="26" y="4" width="12" height="6" rx="2" fill="#222"/>
                <rect x="18" y="10" width="28" height="50" rx="9" fill="url(#cdisp)" stroke="#0a0a0a" stroke-width="1"/>
                <rect x="22" y="20" width="20" height="12" rx="2" fill="#0d0d0d"/>
                <rect x="22" y="36" width="20" height="18" rx="2" fill="#0d0d0d" fill-opacity="0.5"/>
            </svg>`;
        case 'reusable':
            return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="creus" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6a85a8"/><stop offset="100%" stop-color="#2c3a4d"/></linearGradient></defs>
                <rect x="24" y="4" width="16" height="8" rx="2" fill="#222"/>
                <rect x="16" y="12" width="32" height="48" rx="10" fill="url(#creus)" stroke="#0a0a0a" stroke-width="1"/>
                <rect x="22" y="20" width="20" height="22" rx="3" fill="#0d0d0d" fill-opacity="0.6"/>
                <circle cx="32" cy="52" r="4" fill="#0d0d0d" stroke="${accent}" stroke-width="1"/>
            </svg>`;
        case 'liquid':
            return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="cliq" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd86b"/><stop offset="100%" stop-color="#a76b16"/></linearGradient></defs>
                <rect x="26" y="6" width="12" height="6" rx="1" fill="#222"/>
                <rect x="28" y="12" width="8" height="6" fill="#0d0d0d"/>
                <path d="M22 18 L42 18 L46 26 L46 56 Q46 60 42 60 L22 60 Q18 60 18 56 L18 26 Z" fill="url(#cliq)" stroke="#0a0a0a" stroke-width="1"/>
                <rect x="22" y="32" width="20" height="22" rx="2" fill="#0d0d0d" fill-opacity="0.5"/>
            </svg>`;
        case 'accessory':
            return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="22" fill="#1a1a1a" stroke="${accent}" stroke-width="2"/>
                <path d="M22 32 L30 40 L44 26" stroke="${accent}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="32" cy="14" r="3" fill="${accent}"/>
                <circle cx="32" cy="50" r="3" fill="${accent}"/>
            </svg>`;
        case 'consumable':
            return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="14" width="36" height="36" rx="6" fill="#1a1a1a" stroke="#333" stroke-width="1.5"/>
                <path d="M22 22 L42 22 L42 32 Q42 36 38 36 L26 36 Q22 36 22 32 Z" fill="${accent}" fill-opacity="0.8"/>
                <rect x="22" y="40" width="20" height="6" rx="2" fill="${accent}" fill-opacity="0.3"/>
                <text x="32" y="56" text-anchor="middle" fill="#888" font-family="Inter, sans-serif" font-size="6" font-weight="700">POD</text>
            </svg>`;
        default:
            return '';
    }
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
