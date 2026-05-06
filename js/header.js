class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <style>
            /* Фикс скролла и высоты мобильного меню */
            @media (max-width: 1200px) {
                nav {
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    overscroll-behavior: contain !important;
                    padding-bottom: 150px !important; /* Увеличенный отступ под кнопку в самом низу */
                }
                .dropdown-content.show {
                    max-height: 1500px !important; /* Снимаем ограничение высоты для длинных списков */
                    margin-bottom: 15px;
                }
            }
        </style>
        <div class="top-bar">
            <div>Типография полного цикла в Нижнем Новгороде</div>
            <div>
                <a href="tel:88007006099">8 (800) 700-60-99</a>
                <a href="mailto:rost@rost.nnov.ru">rost@rost.nnov.ru</a>
            </div>
        </div>

        <header data-aos="fade-down" data-aos-duration="800">
            <a href="index.html" class="logo-container">
                <img src="img/logo.webp" alt="Логотип ПрессРост" class="logo-image" onerror="this.style.display='none'">
            </a>
            
            <div style="display: flex; align-items: center;">
                <a href="tel:88007006099" class="mobile-phone">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
                <div class="burger-menu" id="burgerMenu">
                    <span></span><span></span><span></span>
                </div>
            </div>

            <nav>
                <div class="dropdown" id="aboutDropdown">
                    <a href="firm.html" class="dropbtn" id="aboutBtn">О нас <span class="arrow">▼</span></a>
                    <div class="dropdown-content" id="aboutDropdownContent">
                        <a href="firm.html">О компании</a>
                        <a href="news.html">Новости</a>
                        <a href="vacancies.html">Вакансии</a>
                        <a href="contacts.html">Контакты</a>
                        <a href="index.html#faq">FAQ</a>
                    </div>
                </div>
                
                <div class="dropdown" id="productsDropdown">
                    <a href="index.html#products" class="dropbtn" id="productsBtn">Продукция <span class="arrow">▼</span></a>
                    <div class="dropdown-content" id="productsDropdownContent">
                        <a href="index.html#products" style="color: var(--press-green);">Все решения</a>
                        <a href="alcohol-labels.html">Алкоголь и вино</a>
                        <a href="cosmetics-labels.html">Косметика и парфюм</a>
                        <a href="food-labels.html">Пищевая продукция</a>
                        <a href="autochem-labels.html">Автохимия</a>
                        <a href="household-labels.html">Бытовая химия</a>
                        <a href="shrink-labels.html">Термоусадочная</a>
                    </div>
                </div>

                <a href="index.html#technologies">Технологии</a>
                <a href="chestny-znak.html">Маркировка</a>
                
                <div class="dropdown" id="infoDropdown">
                    <a href="infocentr.html" class="dropbtn" id="infoBtn">Инфоцентр <span class="arrow">▼</span></a>
                    <div class="dropdown-content" id="infoDropdownContent">
                        <a href="infocentr.html#sout">СОУТ</a>
                        <a href="infocentr.html#polezno">Полезное</a>
                    </div>
                </div>
                
                <button class="btn btn-order trigger-modal" id="headerOrderBtn">Заказать расчет</button>
            </nav>
        </header>
        `;

        this.initMobileMenu();
    }

    initMobileMenu() {
        // Универсальная функция для открытия выпадающих списков на мобильных устройствах
        const toggleDropdown = (btnId, contentId, dropdownId) => {
            const btn = this.querySelector(btnId);
            const content = this.querySelector(contentId);
            const dropdown = this.querySelector(dropdownId);
            if(btn && content && dropdown) {
                btn.addEventListener('click', function(e) {
                    if (window.innerWidth <= 1200) {
                        e.preventDefault(); 
                        content.classList.toggle('show');
                        dropdown.classList.toggle('active');
                    }
                });
            }
        };

        toggleDropdown('#aboutBtn', '#aboutDropdownContent', '#aboutDropdown');
        toggleDropdown('#productsBtn', '#productsDropdownContent', '#productsDropdown');
        toggleDropdown('#infoBtn', '#infoDropdownContent', '#infoDropdown');

        const burgerMenuBtn = this.querySelector('#burgerMenu');
        const mobileNavMenu = this.querySelector('nav');
        const mobileNavLinks = this.querySelectorAll('nav > a:not(.dropbtn), nav button, .dropdown-content a');

        // Открытие/закрытие мобильного меню (бургер)
        if(burgerMenuBtn) {
            burgerMenuBtn.addEventListener('click', () => {
                burgerMenuBtn.classList.toggle('active');
                mobileNavMenu.classList.toggle('active');
                document.body.style.overflow = mobileNavMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
        }

        // Закрытие меню при клике на любую ссылку внутри
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(burgerMenuBtn) burgerMenuBtn.classList.remove('active');
                if(mobileNavMenu) mobileNavMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                
                // Закрываем все открытые аккордеоны (dropdown) при переходе
                if (window.innerWidth <= 1200) {
                    this.querySelectorAll('.dropdown-content.show').forEach(el => el.classList.remove('show'));
                    this.querySelectorAll('.dropdown.active').forEach(el => el.classList.remove('active'));
                }
            });
        });
    }
}
customElements.define('site-header', SiteHeader);