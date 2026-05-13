// ============ Общие шапка/футер/мобильное меню ============
// Используется на всех страницах кроме index.html (где уже разметка статичная).

function renderHeader(active = '') {
  return `
<div class="age-gate hidden" id="ageGate">
  <div class="age-modal">
    <div class="age-modal-head">
      <h1>18+</h1>
      <div class="age-logo">T</div>
    </div>
    <h2>Вам больше 18 лет?</h2>
    <p>Данный сайт не является рекламой, так как предназначен для ограниченного круга лиц, а именно для совершеннолетних потребителей табачной продукции (граждан России старше 18 лет) для предоставления им достоверной информации об основных потребительских свойствах и качественных характеристиках табачной продукции и аксессуарах для курения (п.1 и п.2 ст.10 Закона «О защите прав Потребителя»). Лицам, не достигшим совершеннолетия, пользование сайтом запрещено (ст. 20 ФЗ №15 «Об охране здоровья граждан…»).</p>
    <p>При переходе на сайт я подтверждаю, что мне уже исполнилось 18 лет, я являюсь потребителем табака или иной никотинсодержащей продукции и даю согласие на обработку персональных данных.</p>
    <div class="age-actions">
      <button class="age-btn yes">Больше 18</button>
      <button class="age-btn no">Меньше 18</button>
    </div>
  </div>
</div>
<div class="age-reject" id="ageReject">
  <div>
    <h1>Доступ запрещён</h1>
    <p>Сайт предназначен только для лиц старше 18 лет. Вы можете закрыть эту вкладку.</p>
  </div>
</div>

<header class="header">
  <div class="container">
    <div class="header-top">
      <a href="index.html" class="logo" aria-label="TYAG МОСКВА">
        <div class="logo-mark">T</div>
        <div class="logo-text">
          <div class="l1">TYAG</div>
          <div class="l2">МОСКВА</div>
        </div>
      </a>
      <div class="search">
        <span class="search-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>
        <input type="text" placeholder="Поиск по каталогу..." data-search>
      </div>
      <nav class="header-links">
        <a href="about.html" class="header-link">О нас</a>
        <a href="delivery.html" class="header-link">Оплата и доставка</a>
      </nav>
      <div class="header-icons">
        <a href="favorites.html" class="icon-btn" aria-label="Избранное">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span>Избранное</span>
          <span class="badge" data-fav-count style="display:none">0</span>
        </a>
        <a href="cart.html" class="icon-btn" aria-label="Корзина">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          <span>Корзина</span>
          <span class="badge" data-cart-count style="display:none">0</span>
        </a>
      </div>
    </div>
  </div>
</header>`;
}

function renderFooter() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <a href="index.html" class="logo" style="margin-bottom:14px">
          <div class="logo-mark">T</div>
          <div class="logo-text">
            <div class="l1">TYAG</div>
            <div class="l2">МОСКВА</div>
          </div>
        </a>
        <p>Оптовый поставщик вейпов и электронных сигарет №1 в Москве. Только оригинальная продукция, прямые контракты с производителями.</p>
        <div class="footer-socials">
          <a href="https://t.me/tyagmoskva" class="footer-social" target="_blank" rel="noopener" aria-label="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m22 3-3 18-7-5-4 3v-5l11-9-13 7-5-2 21-7z"/></svg>
          </a>
          <a href="#" class="footer-social" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4-.1-.6-.1-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Магазин</h4>
        <ul>
          <li><a href="catalog.html">Каталог</a></li>
          <li><a href="catalog.html?cat=disposable">Одноразовые</a></li>
          <li><a href="catalog.html?cat=reusable">Многоразовые</a></li>
          <li><a href="catalog.html?cat=liquid">Жидкости</a></li>
          <li><a href="catalog.html?cat=accessory">Аксессуары</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Информация</h4>
        <ul>
          <li><a href="about.html">О нас</a></li>
          <li><a href="delivery.html">Оплата и доставка</a></li>
          <li><a href="favorites.html">Избранное</a></li>
          <li><a href="cart.html">Корзина</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Контакты</h4>
        <ul>
          <li><a href="https://t.me/tyagmoskva" target="_blank" rel="noopener">Telegram: @tyagmoskva</a></li>
          <li>Москва, Россия</li>
          <li>Ежедневно с 10:00 до 22:00</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 TYAG МОСКВА. Все права защищены.</span>
      <span>Продажа лицам старше 18 лет</span>
    </div>
  </div>
</footer>`;
}

function renderMobNav(active = '') {
  return `
<nav class="mob-nav">
  <div class="mob-nav-inner">
    <a href="index.html" class="${active === 'home' ? 'active' : ''}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12 12 3l9 9M5 10v10h14V10"/></svg>
      Главная
    </a>
    <a href="catalog.html" class="${active === 'catalog' ? 'active' : ''}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      Каталог
    </a>
    <a href="favorites.html" class="${active === 'favs' ? 'active' : ''}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      Избранное
      <span class="mob-badge" data-fav-count style="display:none">0</span>
    </a>
    <a href="cart.html" class="${active === 'cart' ? 'active' : ''}">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
      Корзина
      <span class="mob-badge" data-cart-count style="display:none">0</span>
    </a>
  </div>
</nav>`;
}

function injectLayout(active) {
  const headerEl = document.getElementById('__header');
  const footerEl = document.getElementById('__footer');
  const navEl    = document.getElementById('__mobnav');
  if (headerEl) headerEl.innerHTML = renderHeader(active);
  if (footerEl) footerEl.innerHTML = renderFooter();
  if (navEl)    navEl.innerHTML    = renderMobNav(active);
}
