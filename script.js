// Fix iOS viewport height
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
setVH();


// Упрощенная версия с максимальной совместимостью для iOS
(function() {
    'use strict';
    
    // Универсальный ready handler
    function domReady(fn) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(fn, 1);
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    domReady(function() {
        console.log('DOM loaded - iOS compatible version');
        
        // Проверяем jQuery
        if (typeof window.jQuery === 'undefined') {
            console.error('jQuery не загружен');
            loadjQuery();
            return;
        }

        initAll();
    });

    function loadjQuery() {
        var script = document.createElement('script');
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
        script.onload = initAll;
        document.head.appendChild(script);
    }

    function initAll() {
        console.log('Initializing all components...');
        
        initHeroSlider();
        initMobileMenu();
        initForms();
        initTimer();
        initCardsSlider();
        initModelSection();
        
        // Инициализация после полной загрузки
        window.addEventListener('load', function() {
            initYandexMap();
            updateMobileCarImages();
        });
    }

    // 1. ГЛАВНЫЙ СЛАЙДЕР
    function initHeroSlider() {
        const heroBackgrounds = [
            "image/Hero1.svg",
            "image/Hero2.svg", 
            "image/Hero3.svg",
            "image/Hero4.svg"
        ];

        let currentHeroBg = 0;
        let heroInterval;

        function setHeroBg(idx) {
            const bgElement = document.getElementById("heroBg");
            if (!bgElement) return;
            
            // Простой подход для iOS
            bgElement.style.backgroundImage = `url('${heroBackgrounds[idx]}')`;
            bgElement.style.backgroundSize = 'cover';
            bgElement.style.backgroundPosition = 'center';
            
            // Обновляем точки
            document.querySelectorAll('.new_dzn-hero-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === idx);
            });
            
            currentHeroBg = idx;
        }

        function startAutoSlide() {
            stopAutoSlide();
            heroInterval = setInterval(function() {
                currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
                setHeroBg(currentHeroBg);
            }, 4000);
        }

        function stopAutoSlide() {
            if (heroInterval) {
                clearInterval(heroInterval);
                heroInterval = null;
            }
        }

        // Инициализация
        setHeroBg(0);
        startAutoSlide();

        // Обработчики
        document.querySelectorAll('.new_dzn-hero-dot').forEach((dot, index) => {
            dot.addEventListener('click', function() {
                setHeroBg(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Пауза при взаимодействии
        const heroBg = document.getElementById('heroBg');
        if (heroBg) {
            heroBg.addEventListener('touchstart', stopAutoSlide, { passive: true });
            heroBg.addEventListener('touchend', startAutoSlide, { passive: true });
        }
    }

    // 2. МОБИЛЬНОЕ МЕНЮ ДЛЯ iOS
    function initMobileMenu() {
        const menuBtn = document.querySelector('.new_dzn-mobile-menu-btn');
        const menuClose = document.getElementById('mobileMenuClose');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (!menuBtn || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
            // Фиксируем скролл для iOS
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            // Восстанавливаем скролл
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        // Обработчики
        menuBtn.addEventListener('click', openMenu);
        if (menuClose) menuClose.addEventListener('click', closeMenu);

        // Закрытие по клику вне меню
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !e.target.closest('.new_dzn-mobile-menu-btn')) {
                closeMenu();
            }
        });

        // Закрытие по Escape
        document.addEventListener('keyup', function(e) {
            if (e.key === 'Escape') closeMenu();
        });

        // Подменю
        document.querySelectorAll('#mobileMainMenu .new_dzn-nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = this.dataset.menu;
                document.getElementById('mobileMainMenu').style.display = 'none';
                document.getElementById('mobileSubMenu-' + menu).classList.add('active');
            });
        });

        document.querySelectorAll('.new_dzn-mobile-submenu .new_dzn-mobile-back').forEach(back => {
            back.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.new_dzn-mobile-submenu').forEach(sub => {
                    sub.classList.remove('active');
                });
                document.getElementById('mobileMainMenu').style.display = 'block';
            });
        });
    }

    // 3. ФОРМЫ - ПРОСТАЯ ВАЛИДАЦИЯ
    function initForms() {
        // Форматирование телефона
        function formatPhone(input) {
            let value = input.value.replace(/\D/g, '');
            if (value.startsWith('7')) value = value.substring(1);
            if (value.length > 0) value = '+7 (' + value;
            if (value.length > 7) value = value.substring(0, 7) + ') ' + value.substring(7);
            if (value.length > 12) value = value.substring(0, 12) + '-' + value.substring(12);
            if (value.length > 15) value = value.substring(0, 15) + '-' + value.substring(15);
            return value;
        }

        // Инициализация всех полей телефона
        document.querySelectorAll('input[type="tel"]').forEach(input => {
            input.addEventListener('input', function() {
                this.value = formatPhone(this);
            });
            
            // Для iOS - особый обработчик
            input.addEventListener('blur', function() {
                this.value = formatPhone(this);
            });
        });

        // Общая функция отправки формы
        function handleFormSubmit(formId, successId) {
            const form = document.getElementById(formId);
            const success = document.getElementById(successId);
            
            if (!form || !success) return;
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const phoneInput = form.querySelector('input[type="tel"]');
                const checkbox = form.querySelector('input[type="checkbox"]');
                
                // Валидация телефона
                if (phoneInput) {
                    const phoneValue = phoneInput.value.replace(/\D/g, '');
                    if (phoneValue.length !== 11) {
                        phoneInput.classList.add('error');
                        isValid = false;
                    } else {
                        phoneInput.classList.remove('error');
                    }
                }
                
                // Валидация чекбокса
                if (checkbox && !checkbox.checked) {
                    isValid = false;
                }
                
                if (isValid) {
                    form.style.display = 'none';
                    success.style.display = 'block';
                }
            });
        }

        // Инициализация всех форм
        handleFormSubmit('offerForm', 'successContent');
        handleFormSubmit('creditForm', 'creditSuccessContent');
        handleFormSubmit('testDriveForm', 'testDriveSuccessContent');
    }

    // 4. ТАЙМЕР
    function initTimer() {
        function updateTimer() {
            const days = document.getElementById('days');
            const hours = document.getElementById('hours');
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            
            if (!days || !hours || !minutes || !seconds) return;
            
            let d = parseInt(days.textContent) || 0;
            let h = parseInt(hours.textContent) || 0;
            let m = parseInt(minutes.textContent) || 0;
            let s = parseInt(seconds.textContent) || 0;
            
            s--;
            if (s < 0) { s = 59; m--; }
            if (m < 0) { m = 59; h--; }
            if (h < 0) { h = 23; d--; }
            if (d < 0) { d = h = m = s = 0; }
            
            days.textContent = d.toString().padStart(2, '0');
            hours.textContent = h.toString().padStart(2, '0');
            minutes.textContent = m.toString().padStart(2, '0');
            seconds.textContent = s.toString().padStart(2, '0');
        }
        
        setInterval(updateTimer, 1000);
    }

    // 5. СЛАЙДЕР КАРТОЧЕК - УПРОЩЕННАЯ ВЕРСИЯ ДЛЯ iOS
    function initCardsSlider() {
        const cards = document.querySelectorAll('.new_cards_cart');
        const leftArrow = document.querySelector('.new_arrow img:first-child');
        const rightArrow = document.querySelector('.new_arrow img:last-child');
        
        if (cards.length === 0) return;
        
        let currentIndex = 0;
        const isMobile = window.innerWidth <= 768;
        
        function showSlide(index) {
            cards.forEach((card, i) => {
                if (isMobile) {
                    card.style.display = i === index ? 'block' : 'none';
                } else {
                    card.style.display = 'block';
                }
            });
            currentIndex = index;
        }
        
        function nextSlide() {
            let nextIndex = (currentIndex + 1) % cards.length;
            showSlide(nextIndex);
        }
        
        function prevSlide() {
            let prevIndex = (currentIndex - 1 + cards.length) % cards.length;
            showSlide(prevIndex);
        }
        
        // Стрелки
        if (leftArrow) leftArrow.addEventListener('click', prevSlide);
        if (rightArrow) rightArrow.addEventListener('click', nextSlide);
        
        // Свайп для мобильных
        if (isMobile) {
            let startX = 0;
            const slider = document.querySelector('.new_cards_content');
            
            if (slider) {
                slider.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                }, { passive: true });
                
                slider.addEventListener('touchend', function(e) {
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) nextSlide();
                        else prevSlide();
                    }
                }, { passive: true });
            }
            
            // Автопрокрутка
            let slideInterval = setInterval(nextSlide, 4000);
            
            // Пауза при взаимодействии
            slider.addEventListener('touchstart', function() {
                clearInterval(slideInterval);
            }, { passive: true });
            
            slider.addEventListener('touchend', function() {
                slideInterval = setInterval(nextSlide, 4000);
            }, { passive: true });
        }
        
        showSlide(0);
    }

    // 6. МОДЕЛЬНЫЙ РЯД
    function initModelSection() {
        const modelTabs = document.querySelectorAll('.model-tab');
        const colorCircles = document.querySelectorAll('.color-circle');
        
        if (modelTabs.length === 0) return;
        
        modelTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const modelId = this.dataset.model;
                switchModel(modelId);
            });
        });
        
        colorCircles.forEach(circle => {
            circle.addEventListener('click', function() {
                const color = this.dataset.color;
                switchColor(color);
            });
        });
        
        // Инициализация первой модели
        switchModel('tiggo-7l');
    }

    function switchModel(modelId) {
        const model = window.modelsData[modelId];
        if (!model) return;
        
        window.currentModel = modelId;
        
        document.querySelectorAll('.model-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.model === modelId);
        });
        
        const title = document.getElementById("modelTitle");
        const price = document.getElementById("modelPrice");
        if (title) title.textContent = model.title;
        if (price) price.textContent = model.price;
        
        switchColor('white');
    }

    function switchColor(color) {
        const model = window.modelsData[window.currentModel];
        if (!model || !model.colors[color]) return;
        
        window.currentColor = color;
        const colorData = model.colors[color];
        
        const mainImg = document.getElementById("modelMainImage");
        const leftImg = document.getElementById("modelSecondaryImageLeft");
        const rightImg = document.getElementById("modelSecondaryImageRight");
        
        if (mainImg) mainImg.src = colorData.main;
        if (leftImg) leftImg.src = colorData.left;
        if (rightImg) rightImg.src = colorData.right;
        
        // Обновляем активный цвет
        document.querySelectorAll('.color-circle').forEach(circle => {
            circle.classList.toggle('active', circle.dataset.color === color);
        });
    }

    // 7. КАРТА
    function initYandexMap() {
        if (typeof ymaps === 'undefined') {
            console.log('Yandex Maps not loaded');
            return;
        }
        
        ymaps.ready(function() {
            const mapContainer = document.getElementById('carta-map-canvas');
            if (!mapContainer) return;
            
            const map = new ymaps.Map('carta-map-canvas', {
                center: [51.815934, 55.158308],
                zoom: 16
            });
            
            const placemark = new ymaps.Placemark([51.815934, 55.158308], {
                hintContent: 'ТВС Моторс'
            });
            
            map.geoObjects.add(placemark);
        });
    }

    // 8. МОБИЛЬНЫЕ ИЗОБРАЖЕНИЯ
    function updateMobileCarImages() {
        if (window.innerWidth > 768) return;
        
        const model = window.modelsData[window.currentModel];
        const color = window.currentColor;
        
        if (!model || !model.colors[color]) return;
        
        const mainImg = document.getElementById("modelMainImage");
        if (mainImg) {
            mainImg.src = model.colors[color].main;
        }
    }

    // 9. ОБРАБОТЧИК RESIZE
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateMobileCarImages();
        }, 250);
    });

})();

// Глобальные переменные
window.modelsData = {
    "tiggo-7l": {
        title: "CHERY TIGGO 7L",
        price: "2 880 000 ₽",
        mainImage: "./image/model.svg",
        secondaryLeft: "./image/left-model.svg",
        secondaryRight: "./images/Rectangle 13.png",
        colors: {
            white: { 
                main: "./image/7L/T7 White/T7_studio_white_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            black: { 
                main: "./image/7L/T7 Black/T7_studio_black_47 (1) 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            }
            // ... остальные цвета
        }
    }
    // ... другие модели
};

window.currentModel = "tiggo-7l";
window.currentColor = "white";
window.mobileModelImages = {};

// Полифиллы для iOS
if (!String.prototype.padStart) {
    String.prototype.padStart = function(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) return String(this);
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
    };
}


// Добавьте этот код
function fixIOSScroll() {
    if (/iPhone|iPad|iPod/.test(navigator.platform)) {
        const container = document.querySelector('.models-container');
        const wrapper = document.querySelector('.models-wrapper');
        
        if (container && wrapper) {
            // Принудительно устанавливаем ширину
            const items = wrapper.children;
            let totalWidth = 0;
            
            for (let item of items) {
                totalWidth += item.offsetWidth + 15; // + gap
            }
            
            wrapper.style.width = totalWidth + 'px';
            container.style.overflowX = 'scroll';
        }
    }
}

// Запускаем при загрузке и ресайзе
document.addEventListener('DOMContentLoaded', fixIOSScroll);
window.addEventListener('resize', fixIOSScroll);