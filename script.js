// Универсальный ready handler для всех браузеров
function domReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(fn, 1);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

domReady(function() {
    // Проверяем наличие jQuery
    if (typeof jQuery === 'undefined') {
        console.error('jQuery не загружен');
        return;
    }

    // Фоны для главного блока
    const heroBackgrounds = [
        "image/Hero1.svg",
        "image/Hero2.svg", 
        "image/Hero3.svg",
        "image/Hero4.svg"
    ];

    let currentHeroBg = 0;
    let heroInterval;

    // Улучшенная функция установки фона с поддержкой всех браузеров
    function setHeroBg(idx) {
        console.log('Setting background:', idx, heroBackgrounds[idx]);
        
        const bgElement = document.getElementById("heroBg");
        if (bgElement) {
            // Кросс-браузерное установление фона
            bgElement.style.backgroundImage = `linear-gradient(263deg, rgba(0, 0, 0, 0.00) 22.51%, rgba(0, 0, 0, 0.80) 96.87%), url('${heroBackgrounds[idx]}')`;
            bgElement.style.backgroundSize = 'cover';
            bgElement.style.backgroundPosition = '50%';
            bgElement.style.backgroundRepeat = 'no-repeat';
            bgElement.style.backgroundColor = 'lightgray';
        }
        
        $('.new_dzn-hero-dot').removeClass('active');
        $(`.new_dzn-hero-dot[data-index="${idx}"]`).addClass('active');
        
        currentHeroBg = idx;
    }

    // Улучшенный автопереход с паузой при hover/touch
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
    setHeroBg(currentHeroBg);
    
    // Обработчики для главного блока
    $('.new_dzn-hero-dot').on('click', function() {
        const index = parseInt($(this).data('index'));
        console.log('Dot clicked:', index);
        setHeroBg(index);
        stopAutoSlide();
        startAutoSlide(); // Перезапускаем таймер после клика
    });

    // Пауза при взаимодействии (для десктопа и мобильных)
    $('#heroBg').on('touchstart mouseenter', stopAutoSlide)
                .on('touchend mouseleave', startAutoSlide);

    startAutoSlide();

    // Улучшенный обработчик resize с debounce
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            updateMobileCarImages();
            // Переинициализируем слайдеры при изменении размера
            if (typeof initSlider === 'function') initSlider();
            if (typeof updateSlider === 'function') updateSlider();
        }, 250);
    }

    // Кросс-браузерное событие resize
    window.addEventListener('resize', handleResize);

    // Мобильное меню - улучшенная версия
    function initMobileMenu() {
        $('#mobileMainMenu .new_dzn-nav-item').on('click', function(e) {
            e.preventDefault();
            var menu = $(this).data('menu');
            $('#mobileMainMenu').hide();
            $('.new_dzn-mobile-submenu').removeClass('active');
            $('#mobileSubMenu-' + menu).addClass('active');
        });

        $('.new_dzn-mobile-submenu .new_dzn-mobile-back').on('click', function(e) {
            e.preventDefault();
            $('.new_dzn-mobile-submenu').removeClass('active');
            $('#mobileMainMenu').show();
        });

        $('.new_dzn-mobile-menu-btn').on('click', function(e) {
            e.stopPropagation();
            $('#mobileMenu').addClass('active');
            $('body').addClass('menu-open');
            // Предотвращаем скролл body на iOS
            document.body.style.overflow = 'hidden';
        });

        $('#mobileMenuClose').on('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });

        // Улучшенный обработчик клика вне меню
        $(document).on('click', function(e) {
            if ($(e.target).closest('#mobileMenu').length === 0 && 
                !$(e.target).hasClass('new_dzn-mobile-menu-btn')) {
                closeMobileMenu();
            }
        });

        // Обработчик Escape
        $(document).on('keyup', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeMobileMenu();
            }
        });

        $(document).on('click', '.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown > span', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var $parent = $(this).closest('.new_dzn-nav-item-with-dropdown');
            $parent.toggleClass('active');
            $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').not($parent).removeClass('active');
        });
    }

    function closeMobileMenu() {
        $('#mobileMenu').removeClass('active');
        $('.new_dzn-mobile-menu-btn').removeClass('active');
        $('body').removeClass('menu-open');
        $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').removeClass('active');
        // Восстанавливаем скролл
        document.body.style.overflow = '';
    }

    // Универсальная функция форматирования телефона
    function formatPhone(input) {
        return input.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    }

    // Универсальная функция валидации формы
    function initForm(formConfig) {
        const {
            formId,
            phoneInputId,
            agreementCheckboxId,
            phoneErrorId,
            agreementErrorId,
            formContentId,
            successContentId
        } = formConfig;

        $(`#${phoneInputId}`).on('input', function(e) {
            let x = formatPhone($(this).val());
            if (x) {
                $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
            }
        });

        $(`#${formId}`).on('submit', function(e) {
            e.preventDefault();
            
            const phoneInput = $(`#${phoneInputId}`);
            const agreementCheckbox = $(`#${agreementCheckboxId}`);
            const phoneError = $(`#${phoneErrorId}`);
            const agreementError = $(`#${agreementErrorId}`);
            let isValid = true;

            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(phoneInput.val())) {
                phoneInput.addClass('error');
                phoneError.show();
                isValid = false;
            } else {
                phoneInput.removeClass('error');
                phoneError.hide();
            }

            if (!agreementCheckbox.is(':checked')) {
                agreementError.show();
                isValid = false;
            } else {
                agreementError.hide();
            }

            if (isValid) {
                showFormSuccessState(formContentId, successContentId);
            }
        });
    }

    function showFormSuccessState(formContentId, successContentId) {
        $(`#${formContentId}`).hide();
        $(`#${successContentId}`).show().addClass('fade-in');
    }

    // Инициализация всех форм
    initForm({
        formId: 'offerForm',
        phoneInputId: 'phoneInput',
        agreementCheckboxId: 'agreementCheckbox',
        phoneErrorId: 'phoneError',
        agreementErrorId: 'agreementError',
        formContentId: 'formContent',
        successContentId: 'successContent'
    });

    initForm({
        formId: 'creditForm',
        phoneInputId: 'creditPhoneInput',
        agreementCheckboxId: 'creditAgreementCheckbox',
        phoneErrorId: 'creditPhoneError',
        agreementErrorId: 'creditAgreementError',
        formContentId: 'creditFormContent',
        successContentId: 'creditSuccessContent'
    });

    initForm({
        formId: 'testDriveForm',
        phoneInputId: 'testDrivePhoneInput',
        agreementCheckboxId: 'testDriveAgreementCheckbox',
        phoneErrorId: 'testDrivePhoneError',
        agreementErrorId: 'testDriveAgreementError',
        formContentId: 'testDriveFormContent',
        successContentId: 'testDriveSuccessContent'
    });

    // Таймер обратного отсчета
    function initTimer() {
        function updateTimer() {
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

            let days = parseInt(daysElement.textContent) || 0;
            let hours = parseInt(hoursElement.textContent) || 0;
            let minutes = parseInt(minutesElement.textContent) || 0;
            let seconds = parseInt(secondsElement.textContent) || 0;

            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        hours = 23;
                        days--;
                        
                        if (days < 0) {
                            days = 0;
                            hours = 0;
                            minutes = 0;
                            seconds = 0;
                        }
                    }
                }
            }

            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }

        setInterval(updateTimer, 1000);
    }

    // Карточки слайдер - улучшенная версия
    function initCardsSlider() {
        var $cards = $('.new_cards_cart');
        var $leftArrow = $('.new_arrow img').first();
        var $rightArrow = $('.new_arrow img').last();
        var $sliderContainer = $('.new_cards_content');
        var currentIndex = 0;
        var isAnimating = false;
        var startX = 0;
        var isDragging = false;
        var swipeThreshold = 50;
        var autoSlideInterval;

        // Проверяем, является ли устройство мобильным
        function isMobile() {
            return window.innerWidth <= 768;
        }

        // Инициализация слайдера
        function initSlider() {
            if (isMobile()) {
                $cards.removeClass('active').css({
                    transform: 'translateX(100%)',
                    display: 'none',
                    transition: 'none'
                });
                
                $cards.eq(currentIndex).addClass('active').css({
                    transform: 'translateX(0)',
                    display: 'block'
                });
            } else {
                resetSlider();
            }
        }

        // Сброс слайдера для десктопного режима
        function resetSlider() {
            $cards.removeClass('active').css({
                position: '',
                transform: '',
                display: 'block',
                transition: ''
            });
        }

        // Показать слайд
        function showSlide(newIndex, direction) {
            if (isAnimating || newIndex === currentIndex || !isMobile()) return;
            
            isAnimating = true;

            var $current = $cards.eq(currentIndex);
            var $next = $cards.eq(newIndex);

            // Используем requestAnimationFrame для плавной анимации
            requestAnimationFrame(function() {
                if (direction === 'next') {
                    $next.css({
                        transform: 'translateX(100%)',
                        display: 'block'
                    });
                } else {
                    $next.css({
                        transform: 'translateX(-100%)',
                        display: 'block'
                    });
                }

                requestAnimationFrame(function() {
                    $current.css({
                        transform: direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)',
                        transition: 'transform 0.4s ease-in-out'
                    });

                    $next.css({
                        transform: 'translateX(0)',
                        transition: 'transform 0.4s ease-in-out'
                    });
                });
            });

            // Завершение анимации
            setTimeout(function() {
                $current.removeClass('active').css({
                    display: 'none',
                    transform: 'translateX(100%)',
                    transition: 'none'
                });
                
                $next.addClass('active').css({
                    transition: 'none'
                });
                
                currentIndex = newIndex;
                isAnimating = false;
            }, 400);
        }

        function nextSlide() {
            if (!isMobile() || isAnimating) return;
            var newIndex = (currentIndex + 1) % $cards.length;
            showSlide(newIndex, 'next');
        }

        function prevSlide() {
            if (!isMobile() || isAnimating) return;
            var newIndex = (currentIndex - 1 + $cards.length) % $cards.length;
            showSlide(newIndex, 'prev');
        }

        // Обработчики событий для стрелок
        $leftArrow.on('click', prevSlide);
        $rightArrow.on('click', nextSlide);

        // Улучшенные обработчики для свайпа
        function handleTouchStart(e) {
            if (!isMobile() || isAnimating) return;
            startX = e.originalEvent.touches[0].clientX;
            isDragging = true;
            // Предотвращаем скролл страницы
            e.preventDefault();
        }

        function handleTouchMove(e) {
            if (!isMobile() || !isDragging) return;
            e.preventDefault();
        }

        function handleTouchEnd(e) {
            if (!isMobile() || !isDragging || isAnimating) return;
            
            var endX = e.originalEvent.changedTouches[0].clientX;
            var diffX = startX - endX;
            
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    nextSlide(); 
                } else {
                    prevSlide();
                }
            }
            isDragging = false;
        }

        // Добавляем обработчики с пассивными событиями для производительности
        const passiveOptions = { passive: false };
        $sliderContainer[0].addEventListener('touchstart', handleTouchStart, passiveOptions);
        $sliderContainer[0].addEventListener('touchmove', handleTouchMove, passiveOptions);
        $sliderContainer[0].addEventListener('touchend', handleTouchEnd, passiveOptions);

        // Обработчики для клавиатуры
        $(document).on('keydown', function(e) {
            if (!isMobile() || isAnimating) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSlide();
                    break;
            }
        });

        function startAutoSlide() {
            stopAutoSlide();
            if (isMobile()) {
                autoSlideInterval = setInterval(nextSlide, 4000);
            }
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        }
        
        // Обработчики для паузы автопрокрутки
        function pauseAutoSlide() {
            stopAutoSlide();
        }
        
        function resumeAutoSlide() {
            if (isMobile()) {
                startAutoSlide();
            }
        }
        
        $sliderContainer.add($leftArrow).add($rightArrow)
            .on('touchstart mouseenter', pauseAutoSlide)
            .on('touchend mouseleave', resumeAutoSlide);

        // Инициализация
        initSlider();
        if (isMobile()) {
            startAutoSlide();
        }

        // Возвращаем функции для внешнего использования
        return {
            initSlider: initSlider,
            handleResize: function() {
                if (isMobile()) {
                    initSlider();
                    startAutoSlide();
                } else {
                    resetSlider();
                    stopAutoSlide();
                }
            }
        };
    }

    // Инициализация всех компонентов
    initMobileMenu();
    initTimer();
    
    const cardsSlider = initCardsSlider();
    
    // Сохраняем ссылку на обработчик resize для слайдера карточек
    window.cardsSliderHandleResize = cardsSlider.handleResize;
});

// Глобальные функции для модельного ряда
const modelsData = {
    // ... (ваш существующий modelsData объект)
};

let currentModel = "tiggo-7l";
let currentColor = "white";

// Улучшенная функция для мобильных изображений
function updateMobileCarImages() {
    if (window.innerWidth <= 768) {
        const model = modelsData[currentModel];
        const mainImage = document.getElementById("modelMainImage");
        const leftImage = document.getElementById("modelSecondaryImageLeft");
        const rightImage = document.getElementById("modelSecondaryImageRight");

        if (!mainImage) return;

        // Используем мобильные изображения если доступны
        const mobileImages = mobileModelImages[currentModel];
        if (mobileImages && mobileImages[currentColor]) {
            mainImage.src = mobileImages[currentColor];
        } else if (model && model.colors && model.colors[currentColor]) {
            mainImage.src = model.colors[currentColor].main;
        }

        // Боковые изображения
        if (leftImage && model && model.colors && model.colors[currentColor]) {
            leftImage.src = model.colors[currentColor].left || model.secondaryLeft;
            leftImage.style.display = 'block';
        }

        if (rightImage && model && model.colors && model.colors[currentColor]) {
            rightImage.src = model.colors[currentColor].right || model.secondaryRight;
        }
    }
}

// Улучшенная инициализация карты
function initYandexMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            var dealerCoords = [51.815934, 55.158308];
            var myMap = new ymaps.Map('carta-map-canvas', {
                center: dealerCoords,
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

            var dealerPlacemark = new ymaps.Placemark(dealerCoords, {
                hintContent: 'ТВС Моторс, официальный дилер CHERY',
                balloonContent: 'Оренбургская область, п. Пригородный, Нежинское шоссе, 12-й км' 
            }, {
                preset: 'islands#redStretchyIcon' 
            });

            myMap.geoObjects.add(dealerPlacemark);
        });
    } else {
        // Fallback если Яндекс Карты не загрузились
        console.warn('Yandex Maps не загружены');
    }
}

// Универсальная функция для загрузки скриптов
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = function() {
        console.error('Ошибка загрузки скрипта:', src);
    };
    document.head.appendChild(script);
}

// Полифиллы для старых браузеров
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
    };
}

// Инициализация при полной загрузке страницы
window.addEventListener('load', function() {
    // Инициализация карты
    if (document.getElementById('carta-map-canvas')) {
        initYandexMap();
    }
    
    // Обновляем мобильные изображения
    updateMobileCarImages();
    
    // Инициализация отзывов если есть
    if (typeof initDesktopComments === 'function') {
        initDesktopComments();
    }
    if (typeof initMobileComments === 'function') {
        initMobileComments();
    }
});

// Предотвращаем масштабирование на iPhone при дабл-тапе
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Улучшенная обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Убедитесь что mobileModelImages объявлен
const mobileModelImages = window.mobileModelImages || {};