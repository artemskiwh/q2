// ============ TYAG МОСКВА — клиентский JS ============

// ---- AGE GATE ----
function initAgeGate(){
  const KEY = 'tyag_age_ok';
  if (sessionStorage.getItem(KEY) === '1') return;
  const gate = document.getElementById('ageGate');
  if (!gate) return;
  gate.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const yes = gate.querySelector('.age-btn.yes');
  const no  = gate.querySelector('.age-btn.no');
  yes && yes.addEventListener('click', () => {
    sessionStorage.setItem(KEY, '1');
    gate.classList.add('hidden');
    document.body.style.overflow = '';
  });
  no && no.addEventListener('click', () => {
    const reject = document.getElementById('ageReject');
    reject && reject.classList.add('show');
    gate.classList.add('hidden');
  });
}

// ---- STORAGE: cart & favorites ----
const Storage = {
  getCart() { try { return JSON.parse(localStorage.getItem('tyag_cart')) || []; } catch { return []; } },
  setCart(v) { localStorage.setItem('tyag_cart', JSON.stringify(v)); updateBadges(); },
  getFavs() { try { return JSON.parse(localStorage.getItem('tyag_favs')) || []; } catch { return []; } },
  setFavs(v) { localStorage.setItem('tyag_favs', JSON.stringify(v)); updateBadges(); }
};

function addToCart(id, qty = 1) {
  const cart = Storage.getCart();
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  Storage.setCart(cart);
  toast('Товар добавлен в корзину');
}
function removeFromCart(id) {
  Storage.setCart(Storage.getCart().filter(x => x.id !== id));
  renderCart();
}
function setCartQty(id, qty) {
  const cart = Storage.getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  Storage.setCart(cart);
  renderCart();
}
function toggleFav(id) {
  const favs = Storage.getFavs();
  const i = favs.indexOf(id);
  if (i >= 0) {
    favs.splice(i, 1);
    Storage.setFavs(favs);
    toast('Удалено из избранного');
  } else {
    favs.push(id);
    Storage.setFavs(favs);
    toast('Добавлено в избранное');
  }
  document.querySelectorAll(`.product-fav[data-id="${id}"]`).forEach(b => {
    b.classList.toggle('active', favs.includes(id));
  });
}

function updateBadges() {
  const cartCount = Storage.getCart().reduce((s,x) => s + x.qty, 0);
  const favCount  = Storage.getFavs().length;
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = cartCount;
    el.style.display = cartCount > 0 ? '' : 'none';
  });
  document.querySelectorAll('[data-fav-count]').forEach(el => {
    el.textContent = favCount;
    el.style.display = favCount > 0 ? '' : 'none';
  });
}

// ---- TOAST ----
let toastTimer = null;
function toast(msg) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast'; el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ---- IMAGE / PLACEHOLDER RENDERING ----
// Each product can have an image at images/products/<id>.jpg.
// If missing, we render a styled gradient tile with model name overlay.
function productImageHTML(p) {
  const [c1, c2] = p.colors || ['#444','#222'];
  const headline = (p.name || 'TYAG').toUpperCase();
  const sub = p.flavor || '';
  return `
    <div class="ph-img" style="background:radial-gradient(140% 90% at 30% 25%, ${c1}55, transparent 60%), radial-gradient(140% 90% at 70% 75%, ${c2}55, transparent 60%), linear-gradient(135deg, #15151c 0%, #0c0c10 100%);">
      <img loading="lazy" src="images/products/${p.image}.jpg" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="ph-fallback" style="display:none;">
        <div class="ph-brand">${headline}</div>
        <div class="ph-model">${sub}</div>
      </div>
    </div>`;
}

function categoryImageHTML(c) {
  const [c1, c2] = c.colors;
  const coverSrc = c.cover ? `images/products/${c.cover}.jpg` : `images/categories/${c.id}.jpg`;
  return `
    <div class="ph-img cat" style="background:radial-gradient(140% 90% at 30% 25%, ${c1}55, transparent 60%), radial-gradient(140% 90% at 70% 75%, ${c2}55, transparent 60%), linear-gradient(135deg, #15151c 0%, #0c0c10 100%);">
      <img loading="lazy" src="${coverSrc}" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="ph-fallback" style="display:none;">
        <div class="ph-brand">${c.name.toUpperCase()}</div>
      </div>
    </div>`;
}

// ---- PRODUCT CARD ----
function renderProductCard(p) {
  const favs = Storage.getFavs();
  const isFav = favs.includes(p.id);
  return `
    <article class="product">
      ${p.isNew ? `<div class="product-badge">NEW</div>` : ''}
      <button class="product-fav ${isFav ? 'active' : ''}" data-id="${p.id}" aria-label="Избранное" onclick="event.preventDefault();event.stopPropagation();toggleFav('${p.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>
      <a href="product.html?id=${p.id}" class="product-link">
        <div class="product-img">${productImageHTML(p)}</div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-flavor">${p.flavor || ''}</div>
          <div class="product-price">
            <span class="now">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
        </div>
      </a>
    </article>`;
}

function renderCategoryCard(c) {
  const count = getCategoryCount(c.id);
  return `
    <a href="catalog.html?cat=${c.id}" class="cat-card">
      <div class="cat-img">${categoryImageHTML(c)}</div>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${count} ${pluralRu(count, ['товар','товара','товаров'])}</div>
    </a>`;
}

function pluralRu(n, forms) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

// ---- HOME PAGE RENDER ----
function renderHome() {
  const catsEl = document.getElementById('homeCats');
  const prodEl = document.getElementById('homeProducts');
  if (catsEl) catsEl.innerHTML = CATEGORIES.map(renderCategoryCard).join('');
  if (prodEl) prodEl.innerHTML = PRODUCTS.slice(0, 18).map(renderProductCard).join('');
}

// ---- CATALOG PAGE ----
function renderCatalog() {
  const root = document.getElementById('catalogRoot');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const cat   = params.get('cat') || '';
  const q     = (params.get('q') || '').toLowerCase().trim();
  const sort  = params.get('sort') || 'pop';

  let list = PRODUCTS.slice();
  if (cat) list = list.filter(p => p.category === cat);
  if (q)   list = list.filter(p => (p.name + ' ' + p.brand + ' ' + p.flavor).toLowerCase().includes(q));

  if (sort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

  // Title
  const title = document.getElementById('catalogTitle');
  if (title) {
    if (q) title.textContent = `Поиск: «${params.get('q')}»`;
    else if (cat) title.textContent = getCategoryName(cat);
    else title.textContent = 'Каталог';
  }
  // Sidebar
  const side = document.getElementById('catalogSidebar');
  if (side) {
    side.innerHTML = `
      <h3>Категории</h3>
      <ul class="sidebar-list">
        <li><a href="catalog.html" class="${!cat ? 'active' : ''}">Все<span class="count">${PRODUCTS.length}</span></a></li>
        ${CATEGORIES.map(c => `
          <li><a href="catalog.html?cat=${c.id}" class="${cat === c.id ? 'active' : ''}">${c.name}<span class="count">${getCategoryCount(c.id)}</span></a></li>
        `).join('')}
      </ul>
      <h3>Цена</h3>
      <div class="price-range">
        <input type="number" placeholder="от" id="priceFrom">
        <input type="number" placeholder="до" id="priceTo">
      </div>
    `;
    const apply = () => {
      const from = parseInt(document.getElementById('priceFrom').value) || 0;
      const to   = parseInt(document.getElementById('priceTo').value) || Infinity;
      let filtered = list.filter(p => p.price >= from && p.price <= to);
      document.getElementById('catalogGrid').innerHTML = filtered.length
        ? filtered.map(renderProductCard).join('')
        : `<div class="empty-state" style="grid-column:1/-1"><h2>Ничего не найдено</h2><p>Попробуйте изменить фильтры</p></div>`;
      document.getElementById('catalogCount').textContent = filtered.length + ' ' + pluralRu(filtered.length, ['товар','товара','товаров']);
    };
    side.querySelector('#priceFrom').addEventListener('input', apply);
    side.querySelector('#priceTo').addEventListener('input', apply);
  }
  // Count + sort
  const count = document.getElementById('catalogCount');
  if (count) count.textContent = list.length + ' ' + pluralRu(list.length, ['товар','товара','товаров']);
  const sortEl = document.getElementById('catalogSort');
  if (sortEl) {
    sortEl.value = sort;
    sortEl.addEventListener('change', () => {
      params.set('sort', sortEl.value);
      location.search = params.toString();
    });
  }
  // Grid
  const grid = document.getElementById('catalogGrid');
  if (grid) {
    grid.innerHTML = list.length
      ? list.map(renderProductCard).join('')
      : `<div class="empty-state" style="grid-column:1/-1"><h2>Ничего не найдено</h2><p>Попробуйте изменить запрос</p></div>`;
  }
}

// ---- PRODUCT PAGE ----
function renderProduct() {
  const root = document.getElementById('productRoot');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) {
    root.innerHTML = `<div class="empty-state"><h2>Товар не найден</h2><p>Возможно, его убрали из каталога</p><a class="btn" href="catalog.html">В каталог</a></div>`;
    return;
  }
  const favs = Storage.getFavs();
  const isFav = favs.includes(p.id);
  root.innerHTML = `
    <div class="crumbs">
      <a href="index.html">Главная</a><span>/</span>
      <a href="catalog.html?cat=${p.category}">${getCategoryName(p.category)}</a><span>/</span>
      <span style="color:var(--muted-2)">${p.name}</span>
    </div>
    <div class="product-detail">
      <div class="pd-gallery">${productImageHTML(p)}</div>
      <div class="pd-info">
        <h1>${p.name}</h1>
        <div class="pd-brand">${p.brand} · ${p.flavor || ''}</div>
        <div class="pd-price">
          <span class="now">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="old">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <div class="pd-specs">
          ${p.puffs ? `<div class="pd-spec"><div class="k">Тяг</div><div class="v">${p.puffs.toLocaleString('ru-RU')}</div></div>` : ''}
          ${p.nicotine ? `<div class="pd-spec"><div class="k">Никотин</div><div class="v">${p.nicotine}</div></div>` : ''}
          ${p.volume ? `<div class="pd-spec"><div class="k">Объём</div><div class="v">${p.volume}</div></div>` : ''}
          <div class="pd-spec"><div class="k">Категория</div><div class="v">${getCategoryName(p.category)}</div></div>
        </div>
        <div class="pd-actions">
          <button class="btn" onclick="addToCart('${p.id}')">В корзину</button>
          <button class="btn ghost product-fav ${isFav?'active':''}" data-id="${p.id}" onclick="toggleFav('${p.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            В избранное
          </button>
        </div>
        <div class="pd-desc">
          <p><strong>${p.name}</strong> — ${p.flavor ? `вкус «${p.flavor}». ` : ''}Качественный продукт от бренда ${p.brand}. ${p.puffs ? `Рассчитан на ${p.puffs.toLocaleString('ru-RU')} затяжек. ` : ''}${p.nicotine ? `Содержание никотина: ${p.nicotine}. ` : ''}Все товары сертифицированы. Оптовые поставки по всей России.</p>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-head"><h2 class="section-title">Похожие товары</h2></div>
      <div class="products">
        ${PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0,6).map(renderProductCard).join('')}
      </div>
    </div>`;
}

// ---- CART PAGE ----
function renderCart() {
  const root = document.getElementById('cartRoot');
  if (!root) return;
  const cart = Storage.getCart();
  if (!cart.length) {
    root.innerHTML = `
      <div class="empty-state">
        <div class="ic"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg></div>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из каталога, чтобы оформить заказ</p>
        <a href="catalog.html" class="btn">Перейти в каталог</a>
      </div>`;
    return;
  }
  const items = cart.map(c => ({ ...PRODUCTS.find(x => x.id === c.id), qty: c.qty })).filter(x => x.id);
  const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);
  const shipping = subtotal >= 5000 ? 0 : 350;
  const total = subtotal + shipping;
  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${items.map(p => `
          <div class="cart-item">
            <div class="ci-img">${productImageHTML(p)}</div>
            <div class="ci-text">
              <div class="ci-name">${p.name}</div>
              <div class="ci-flavor">${p.flavor || ''}</div>
            </div>
            <div class="qty">
              <button onclick="setCartQty('${p.id}', ${p.qty - 1})" aria-label="Меньше">−</button>
              <span>${p.qty}</span>
              <button onclick="setCartQty('${p.id}', ${p.qty + 1})" aria-label="Больше">+</button>
            </div>
            <div class="ci-price">${formatPrice(p.price * p.qty)}</div>
            <button class="ci-remove" onclick="removeFromCart('${p.id}')" aria-label="Удалить">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            </button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <h3>Ваш заказ</h3>
        <div class="cs-row"><span>Товары (${items.reduce((s,x) => s+x.qty, 0)})</span><span>${formatPrice(subtotal)}</span></div>
        <div class="cs-row"><span>Доставка</span><span>${shipping === 0 ? 'Бесплатно' : formatPrice(shipping)}</span></div>
        ${shipping > 0 ? `<div class="cs-row" style="color:var(--muted);font-size:12px"><span>До бесплатной доставки</span><span>${formatPrice(5000 - subtotal)}</span></div>` : ''}
        <div class="cs-row total"><span>Итого</span><span class="v">${formatPrice(total)}</span></div>
        <a href="checkout.html" class="btn full" style="margin-top:14px">Оформить заказ</a>
        <a href="catalog.html" class="btn ghost full" style="margin-top:8px">Продолжить покупки</a>
      </div>
    </div>`;
}

// ---- FAVORITES PAGE ----
function renderFavorites() {
  const root = document.getElementById('favoritesRoot');
  if (!root) return;
  const favs = Storage.getFavs();
  if (!favs.length) {
    root.innerHTML = `
      <div class="empty-state">
        <div class="ic"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
        <h2>Избранное пусто</h2>
        <p>Сохраняйте товары, нажав на сердечко</p>
        <a href="catalog.html" class="btn">К каталогу</a>
      </div>`;
    return;
  }
  const items = favs.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  root.innerHTML = `<div class="products">${items.map(renderProductCard).join('')}</div>`;
}

// ---- SEARCH ----
function initSearch() {
  document.querySelectorAll('[data-search]').forEach(input => {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const q = input.value.trim();
        if (q) location.href = `catalog.html?q=${encodeURIComponent(q)}`;
      }
    });
  });
}

// ---- INIT ----
function bootstrap() {
  initAgeGate();
  updateBadges();
  initSearch();
  renderHome();
  renderCatalog();
  renderProduct();
  renderCart();
  renderFavorites();
}
document.addEventListener('DOMContentLoaded', () => {
  // If layout containers exist, inject layout first.
  if (document.getElementById('__header')) {
    const pageActive = document.body.getAttribute('data-page') || '';
    if (typeof injectLayout === 'function') injectLayout(pageActive);
  }
  bootstrap();
});
