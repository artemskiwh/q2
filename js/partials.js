/* ===== Shared partials: header, mobile nav, footer, age-gate =====
   Use <div data-partial="header|mobile-nav|footer|age-gate"></div>
   and provide data-active="home|catalog|cart|favorites|about|delivery"
*/

function renderHeader(active) {
    const cartCount = Cart.count();
    const favCount = Favorites.count();
    return `
<header class="header">
    <div class="container header-inner">
        <a href="index.html" class="logo" aria-label="TYAG MOSKVA">
            <span class="logo-mark">T</span>
            <span class="logo-text">
                <strong>TYAG</strong>
                <span>MOSKVA</span>
            </span>
        </a>
        <div class="search">
            <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input type="text" data-search placeholder="Поиск по каталогу"/>
        </div>
        <nav class="nav-links">
            <a href="catalog.html" class="${active === 'catalog' ? 'active' : ''}">Каталог</a>
            <a href="about.html" class="${active === 'about' ? 'active' : ''}">О нас</a>
            <a href="delivery.html" class="${active === 'delivery' ? 'active' : ''}">Оплата и доставка</a>
        </nav>
        <div class="header-actions">
            <a href="favorites.html" class="icon-btn" aria-label="Избранное" title="Избранное">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="badge" data-fav-count>${favCount > 0 ? favCount : ''}</span>
            </a>
            <a href="cart.html" class="icon-btn" aria-label="Корзина" title="Корзина">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span class="badge" data-cart-count>${cartCount > 0 ? cartCount : ''}</span>
            </a>
        </div>
    </div>
</header>`;
}

function renderMobileNav(active) {
    const cartCount = Cart.count();
    const favCount = Favorites.count();
    return `
<nav class="mobile-nav">
    <div class="mobile-nav-inner">
        <a href="index.html" class="${active === 'home' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Главная</span>
        </a>
        <a href="catalog.html" class="${active === 'catalog' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>Каталог</span>
        </a>
        <a href="favorites.html" class="${active === 'favorites' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>Избранное</span>
            <span class="badge" data-fav-count>${favCount > 0 ? favCount : ''}</span>
        </a>
        <a href="cart.html" class="${active === 'cart' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>Корзина</span>
            <span class="badge" data-cart-count>${cartCount > 0 ? cartCount : ''}</span>
        </a>
        <a href="about.html" class="${active === 'about' || active === 'delivery' ? 'active' : ''}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            <span>Меню</span>
        </a>
    </div>
</nav>`;
}

function renderFooter() {
    return `
<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <a href="index.html" class="logo" style="margin-bottom:14px;">
                    <span class="logo-mark">T</span>
                    <span class="logo-text"><strong>TYAG</strong><span>MOSKVA</span></span>
                </a>
                <p class="footer-warn">Оптовый магазин вейп-продукции и аксессуаров в Москве. Работаем с никотинсодержащей продукцией и реализуем её только лицам старше 18 лет.</p>
                <div class="footer-socials">
                    <a href="https://t.me/tyagmoskva" target="_blank" rel="noopener" aria-label="Telegram">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
                    </a>
                    <a href="#" aria-label="WhatsApp">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4.1-3.5-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.1 1.3 3.3.2.2 2.3 3.6 5.7 5 .8.4 1.4.6 1.9.8.8.3 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4zM12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10c0 1.8-.5 3.5-1.3 5L22 22l-5.2-1.4c-1.4.8-3.1 1.4-4.8 1.4z"/></svg>
                    </a>
                </div>
            </div>
            <div>
                <h4>Магазин</h4>
                <ul>
                    <li><a href="catalog.html">Каталог</a></li>
                    <li><a href="catalog.html?cat=dispose">Одноразовые</a></li>
                    <li><a href="catalog.html?cat=reusable">Многоразовые</a></li>
                    <li><a href="catalog.html?cat=liquid">Жидкости</a></li>
                </ul>
            </div>
            <div>
                <h4>Покупателям</h4>
                <ul>
                    <li><a href="about.html">О нас</a></li>
                    <li><a href="delivery.html">Оплата и доставка</a></li>
                    <li><a href="cart.html">Корзина</a></li>
                    <li><a href="favorites.html">Избранное</a></li>
                </ul>
            </div>
            <div>
                <h4>Контакты</h4>
                <ul>
                    <li><a href="tel:+74950000000">+7 (495) 000-00-00</a></li>
                    <li><a href="mailto:info@tyagmoskva.ru">info@tyagmoskva.ru</a></li>
                    <li><a href="https://t.me/tyagmoskva" target="_blank" rel="noopener">@tyagmoskva в Telegram</a></li>
                    <li><span style="color:var(--muted);">пн–вс 10:00–22:00</span></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <span>© 2026 TYAG MOSKVA. Все права защищены.</span>
            <span>Продажа только лицам старше 18 лет. Никотин вызывает зависимость.</span>
        </div>
    </div>
</footer>`;
}

function renderAgeGate() {
    return `
<div class="age-gate" id="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
    <div class="age-gate-card">
        <div class="age-gate-head">
            <div class="age-gate-18">18+</div>
            <div class="age-gate-logo" aria-hidden="true">
                <svg width="46" height="46" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="30" fill="#0d0d0d" stroke="#FFD645" stroke-width="2"/>
                    <text x="32" y="28" text-anchor="middle" fill="#FFD645" font-family="Inter, sans-serif" font-weight="800" font-size="11">TYAG</text>
                    <text x="32" y="42" text-anchor="middle" fill="#fff" font-family="Inter, sans-serif" font-weight="700" font-size="8">VAPE</text>
                </svg>
            </div>
        </div>
        <h2 id="age-title">Вам больше 18 лет?</h2>
        <div class="age-gate-text">
            Данный Сайт не является рекламой, так как предназначен для ограниченного круга лиц, а именно для совершеннолетних потребителей табачной продукции (граждан России старше 18 лет) для предоставления им достоверной информации об основных потребительских свойствах и качественных характеристик табачной продукции и аксессуарах для курения (п.1 и п.2 ст.10 Закона «О защите прав Потребителя»). Лицам, не достигшим совершеннолетия, пользование Сайтом запрещено. (ст. 20 ФЗ №15 «Об охране здоровья граждан..»)
            При переходе на сайт я подтверждаю, что мне уже исполнилось 18 лет, я являюсь потребителем табака или иной никотинсодержащей продукции и даю согласие на обработку персональных данных.
        </div>
        <div class="age-gate-actions">
            <button class="btn btn-primary" id="age-yes">Больше 18</button>
            <button class="btn btn-secondary" id="age-no">Меньше 18</button>
        </div>
    </div>
</div>`;
}

function injectPartials() {
    document.querySelectorAll('[data-partial]').forEach(el => {
        const type = el.dataset.partial;
        const active = el.dataset.active || '';
        let html = '';
        switch (type) {
            case 'header': html = renderHeader(active); break;
            case 'mobile-nav': html = renderMobileNav(active); break;
            case 'footer': html = renderFooter(); break;
            case 'age-gate': html = renderAgeGate(); break;
        }
        el.outerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', injectPartials);
