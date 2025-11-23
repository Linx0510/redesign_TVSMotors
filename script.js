$(document).ready(function() {
    // Фоны для главного блока
    const heroBackgrounds = [
        "image/Hero1.svg",
        "image/Hero2.svg", 
        "image/Hero3.svg",
        "image/Hero4.svg"
    ];

    

    let currentHeroBg = 0;

    // Функции для главного блока
    function setHeroBg(idx) {
        console.log('Setting background:', idx, heroBackgrounds[idx]);
        
        const $bg = $("#heroBg");
        if ($bg.length) {
            $bg.css('background', 
                `linear-gradient(263deg, rgba(0, 0, 0, 0.00) 22.51%, rgba(0, 0, 0, 0.80) 96.87%), 
                 url('${heroBackgrounds[idx]}') lightgray 50% / cover no-repeat`
            );
        }
        
        $('.new_dzn-hero-dot').removeClass('active');
        $('.new_dzn-hero-dot[data-index="' + idx + '"]').addClass('active');
        
        currentHeroBg = idx;
    }

    

    // Инициализация
    setHeroBg(currentHeroBg);
    
    // Обработчики для главного блока
    $('.new_dzn-hero-dot').on('click', function() {
        const index = parseInt($(this).data('index'));
        console.log('Dot clicked:', index);
        setHeroBg(index);
    });

    function startAutoSlide() {
        setInterval(function() {
            currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
            setHeroBg(currentHeroBg);
        }, 4000);
    }
    
    startAutoSlide();

    // Обновляем изображения при изменении размера окна
    $(window).on('resize', function() {
        updateMobileCarImages();
    });

    // Мобильное меню
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
    });

    $('#mobileMenuClose').on('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#mobileMenu').length && 
            !$(e.target).hasClass('new_dzn-mobile-menu-btn')) {
            closeMobileMenu();
        }
    });

    $(document).on('keyup', function(e) {
        if (e.key === 'Escape') {
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

    function closeMobileMenu() {
        $('#mobileMenu').removeClass('active');
        $('.new_dzn-mobile-menu-btn').removeClass('active');
        $('body').removeClass('menu-open');
        $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').removeClass('active');
    }

    // Форма 1 - Акция
    $('#phoneInput').on('input', function(e) {
        let x = $(this).val().replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
    });

    $('#offerForm').on('submit', function(e) {
        e.preventDefault();
        
        const phoneInput = $('#phoneInput');
        const agreementCheckbox = $('#agreementCheckbox');
        const phoneError = $('#phoneError');
        const agreementError = $('#agreementError');
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
            showSuccessState();
        }
    });

    function showSuccessState() {
        $('#formContent').hide();
        $('#successContent').show().addClass('fade-in');
    }

    function updateTimer() {
        const daysElement = $('#days');
        const hoursElement = $('#hours');
        const minutesElement = $('#minutes');
        const secondsElement = $('#seconds');

        let days = parseInt(daysElement.text());
        let hours = parseInt(hoursElement.text());
        let minutes = parseInt(minutesElement.text());
        let seconds = parseInt(secondsElement.text());

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

        daysElement.text(days.toString().padStart(2, '0'));
        hoursElement.text(hours.toString().padStart(2, '0'));
        minutesElement.text(minutes.toString().padStart(2, '0'));
        secondsElement.text(seconds.toString().padStart(2, '0'));
    }

    setInterval(updateTimer, 1000);

    // Форма 2 - Кредит
    $('#creditPhoneInput').on('input', function(e) {
        let x = $(this).val().replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
    });

    $('#creditForm').on('submit', function(e) {
        e.preventDefault();
        
        const phoneInput = $('#creditPhoneInput');
        const agreementCheckbox = $('#creditAgreementCheckbox');
        const phoneError = $('#creditPhoneError');
        const agreementError = $('#creditAgreementError');
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
            showCreditSuccessState();
        }
    });

    function showCreditSuccessState() {
        $('#creditFormContent').hide();
        $('#creditSuccessContent').show().addClass('fade-in');
    }

    // Форма 3 - Тест-драйв
    $('#testDrivePhoneInput').on('input', function(e) {
        let x = $(this).val().replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
    });

    $('#testDriveForm').on('submit', function(e) {
        e.preventDefault();
        
        const phoneInput = $('#testDrivePhoneInput');
        const agreementCheckbox = $('#testDriveAgreementCheckbox');
        const phoneError = $('#testDrivePhoneError');
        const agreementError = $('#testDriveAgreementError');
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
            showTestDriveSuccessState();
        }
    });

    function showTestDriveSuccessState() {
        $('#testDriveFormContent').hide();
        $('#testDriveSuccessContent').show().addClass('fade-in');
    }

    // Карточки слайдер
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
        return $(window).width() <= 768;
    }

    // Инициализация слайдера
    function initSlider() {
        if (isMobile()) {
            // Скрываем все карточки кроме активной
            $cards.removeClass('active').css({
                transform: 'translateX(100%)',
                display: 'none',
                transition: 'none'
            });
            
            // Показываем активную карточку
            $cards.eq(currentIndex).addClass('active').css({
                transform: 'translateX(0)',
                display: 'block'
            });
        } else {
            // На десктопе показываем все карточки
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

        // Устанавливаем начальную позицию для следующего слайда
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

        // Даем время для применения начальных стилей
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                // Анимация перехода
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

    // Следующий слайд
    function nextSlide() {
        if (!isMobile() || isAnimating) return;
        var newIndex = (currentIndex + 1) % $cards.length;
        showSlide(newIndex, 'next');
    }

    // Предыдущий слайд
    function prevSlide() {
        if (!isMobile() || isAnimating) return;
        var newIndex = (currentIndex - 1 + $cards.length) % $cards.length;
        showSlide(newIndex, 'prev');
    }

    // Обработчики событий для стрелок
    $leftArrow.on('click', prevSlide);
    $rightArrow.on('click', nextSlide);

    // Обработчики для свайпа
    $sliderContainer.on('touchstart', function(e) {
        if (!isMobile() || isAnimating) return;
        startX = e.originalEvent.touches[0].clientX;
        isDragging = true;
    });

    $sliderContainer.on('touchmove', function(e) {
        if (!isMobile() || !isDragging) return;
        // Предотвращаем скролл страницы при свайпе
        e.preventDefault();
    });

    $sliderContainer.on('touchend', function(e) {
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
    });

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


    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
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

    // Обработчик изменения размера окна
    function handleResize() {
        if (isMobile()) {
            initSlider();
            startAutoSlide();
        } else {
            resetSlider();
            stopAutoSlide();
        }
    }

    // Дебаунс для resize события
    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });

    // Инициализация
    initSlider();
    if (isMobile()) {
        startAutoSlide();
    }

    // Технологии безопасности слайдер
    let currentSlide = 0;
    let autoplayInterval;

    const $techSliderContainer = $('.new_slider-container');
    const $techSlides = $('.new_technology_security_content_cart');
    const $indicators = $('.new_ikon_indikator');
    const $mobileIndicators = $('.new_mobile_indicator');
    const totalSlides = $techSlides.length;

    const $lastSlideClone1 = $techSlides.eq(totalSlides - 1).clone();
    const $lastSlideClone2 = $techSlides.eq(totalSlides - 2).clone();
    $techSliderContainer.prepend($lastSlideClone2, $lastSlideClone1);

    const $firstSlideClone1 = $techSlides.eq(0).clone();
    const $firstSlideClone2 = $techSlides.eq(1).clone();
    $techSliderContainer.append($firstSlideClone1, $firstSlideClone2);

    const $allSlides = $('.new_technology_security_content_cart');
    const totalAllSlides = $allSlides.length;

    currentSlide = 2;

    function updateSlider() {
        const containerWidth = $('.new_technology_security_content').width();
        const cardWidth = $techSlides.first().outerWidth(true);
        const gap = 24;

        const offset = (containerWidth / 2) - (cardWidth / 2) - (currentSlide * (cardWidth + gap));

        $techSliderContainer.css('transform', `translateX(${offset}px)`);

        $allSlides.removeClass('active');
        $indicators.removeClass('active');
        $mobileIndicators.removeClass('active');

        let realIndex = (currentSlide - 2 + totalSlides) % totalSlides;
        if (realIndex < 0) realIndex += totalSlides;

        $allSlides.eq(currentSlide).addClass('active');
        $indicators.eq(realIndex).addClass('active');
        $mobileIndicators.eq(realIndex).addClass('active');
    }

    function nextTechSlide() {
        currentSlide++;

        if (currentSlide >= totalAllSlides - 2) {
            $techSliderContainer.css('transition', 'none');
            currentSlide = 2;
            const containerWidth = $('.new_technology_security_content').width();
            const cardWidth = $techSlides.first().outerWidth(true);
            const gap = 24;
            const offset = (containerWidth / 2) - (cardWidth / 2) - (currentSlide * (cardWidth + gap));
            $techSliderContainer.css('transform', `translateX(${offset}px)`);
    
            setTimeout(() => {
                $techSliderContainer.css('transition', 'transform 0.5s ease');
            }, 50);
        }

        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index + 2;
        updateSlider();
        resetAutoplay();
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextTechSlide, 2000);
    }

    updateSlider();
    startAutoplay();

    $indicators.on('click', function() {
        goToSlide($(this).index());
    });

    $mobileIndicators.on('click', function() {
        goToSlide($(this).index());
    });

    $(window).on('resize', updateSlider);
});

// Данные для моделей с цветами
// Массив для мобильных изображений автомобилей (fallback)


// Явная карта мобильных изображений по модели и цвету (файлы в image/model_mobile)
const mobileModelImages = {
    "tiggo-7l": {
        secondaryLeft: "./images/tiggo-4-pro-left.png",
        white: "image/model_mobile/7L_mobile/T7 White/T7_studio_white_47 1 (1).svg",
        black: "image/model_mobile/7L_mobile/T7 Black/T7_studio_black_47 (1).svg",
        blue: "image/model_mobile/7L_mobile/T7 Blue/T7_studio_blue_47 (1).svg",
        red: "image/model_mobile/7L_mobile/T7 Red/T7_studio_red_47 1 (1).svg",
        techgray: "image/model_mobile/7L_mobile/T7 Tech grey/T7_studio_tech grey_47 1 (1).svg",
        phantom: "image/model_mobile/7L_mobile/T7 Phantom/T7_studio_phantom_47 1 (1).svg",
        silver: "image/model_mobile/7L_mobile/T7 Silver/T7_studio_silver_47 1 (1).svg"
    },
    "tiggo-8-pro-max": {
        secondaryLeft: "./images/tiggo-4-pro-left.png",
        purple: "image/model_mobile/8 Pro max_mobile/8 Purple/purple_47 (1).svg",
        silver: "image/model_mobile/8 Pro max_mobile/8 Silver/silver_47.svg",
        white: "image/model_mobile/8 Pro max_mobile/8 White/white_47 (4).svg"
    },
    "tiggo-9": {
        secondaryLeft: "./images/tiggo-4-pro-left.png",
        white: "image/model_mobile/9_mobile/9 White/white_47.svg",
        black: "image/model_mobile/9_mobile/9 Black/black_47 (1).svg",
        blue: "image/model_mobile/9_mobile/9 Blue/blue_47 (1).svg",
        green: "image/model_mobile/9_mobile/9 Green/green_47.svg",
        techgray: "image/model_mobile/9_mobile/9 Techno grey/grey_tech_47.svg",
        gray: "image/model_mobile/9_mobile/9 Grey/grey_47.svg"
    }
};

const modelsData = {
    "tiggo-4-pro": {
        title: "CHERY TIGGO 4 PRO",
        price: "2 100 000 ₽",
        mainImage: "./images/tiggo-4-pro-white.png",
        secondaryLeft: "./images/tiggo-4-pro-left.png",
        secondaryRight: "./images/tiggo-4-pro-right.png",
        colors: {
            white: { 
                main: "./images/tiggo-4-pro-white.png",
                left: "./images/tiggo-4-pro-left.png", 
                right: "./images/tiggo-4-pro-right.png"
            },
            red: { 
                main: "./images/tiggo-4-pro-red.png",
                left: "./images/tiggo-4-pro-red-left.png", 
                right: "./images/tiggo-4-pro-red-right.png"
            },
            gray: { 
                main: "./images/tiggo-4-pro-gray.png",
                left: "./images/tiggo-4-pro-gray-left.png", 
                right: "./images/tiggo-4-pro-gray-right.png"
            }
        }
    },
    "tiggo-4-new": {
        title: "CHERY TIGGO 4 NEW",
        price: "2 300 000 ₽",
        mainImage: "./images/tiggo-4-new-white.png",
        secondaryLeft: "./images/tiggo-4-new-left.png",
        secondaryRight: "./images/tiggo-4-new-right.png",
        colors: {
            white: { 
                main: "./images/tiggo-4-new-white.png",
                left: "./images/tiggo-4-new-left.png", 
                right: "./images/tiggo-4-new-right.png"
            },
            black: { 
                main: "./images/tiggo-4-new-black.png",
                left: "./images/tiggo-4-new-black-left.png", 
                right: "./images/tiggo-4-new-black-right.png"
            }
        }
    },
    "tiggo-7-pro-max": {
        title: "CHERY TIGGO 7 PRO MAX",
        price: "3 200 000 ₽",
        mainImage: "./images/tiggo-7-pro-max-white.png",
        secondaryLeft: "./images/tiggo-7-pro-max-left.png",
        secondaryRight: "./images/tiggo-7-pro-max-right.png",
        colors: {
            white: { 
                main: "./images/tiggo-7-pro-max-white.png",
                left: "./images/tiggo-7-pro-max-left.png", 
                right: "./images/tiggo-7-pro-max-right.png"
            },
            blue: { 
                main: "./images/tiggo-7-pro-max-blue.png",
                left: "./images/tiggo-7-pro-max-blue-left.png", 
                right: "./images/tiggo-7-pro-max-blue-right.png"
            }
        }
    },
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
            },
            blue: { 
                main: "./image/7L/T7 Blue/T7_studio_blue_47 (1) 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            red: { 
                main: "./image/7L/T7 Red/T7_studio_red_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            techgray: { 
                main: "./image/7L/T7 Tech grey/T7_studio_tech grey_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            phantom: { 
                main: "./image/7L/T7 Phantom/T7_studio_phantom_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            silver: { 
                main: "./image/7L/T7 Silver/T7_studio_silver_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            }
        }
    },
    "tiggo-8-pro-max": {
        title: "CHERY TIGGO 8 PRO MAX",
        price: "3 500 000 ₽",
        mainImage: "./images/tiggo-8-pro-max-white.png",
        secondaryLeft: "./images/tiggo-8-pro-max-left.png",
        secondaryRight: "./images/tiggo-8-pro-max-right.png",
        colors: {
            purple: { 
                main: "./image/8 Pro max/8 Purple/purple_47 (1) 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            silver: { 
                main: "./image/8 Pro max/8 Silver/silver_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            white: { 
                main: "./image/8 Pro max/8 White/white_47 (4) 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            }
        }
    },
    "tiggo-9": {
        title: "CHERY TIGGO 9",
        price: "4 200 000 ₽",
        mainImage: "./images/tiggo-9-white.png",
        secondaryLeft: "./images/tiggo-9-left.png",
        secondaryRight: "./images/tiggo-9-right.png",
        colors: {
            white: { 
                main: "./image/9/9 White/white_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            black: { 
                main: "./image/9/9 Black/black_47 (1) 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            blue: { 
                main: "./image/9/9 Blue/blue_47 (1) 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            green: { 
                main: "./image/9/9 Green/green_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            techgray: { 
                main: "./image/9/9 Techno grey/grey_tech_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            },
            gray: { 
                main: "./image/9/9 Grey/grey_47 1.svg",
                left: "./image/left_model.svg", 
                right: "./image/right_model.svg"
            }
        }
    },
    "arrizo-8": {
        title: "CHERY ARRIZO 8",
        price: "2 600 000 ₽",
        mainImage: "./images/arrizo-8-white.png",
        secondaryLeft: "./images/arrizo-8-left.png",
        secondaryRight: "./images/arrizo-8-right.png",
        colors: {
            white: { 
                main: "./images/arrizo-8-white.png",
                left: "./images/arrizo-8-left.png", 
                right: "./images/arrizo-8-right.png"
            },
            gray: { 
                main: "./images/arrizo-8-gray.png",
                left: "./images/arrizo-8-gray-left.png", 
                right: "./images/arrizo-8-gray-right.png"
            }
        }
    }
};

// Текущая модель и цвет
let currentModel = "tiggo-7l";
let currentColor = "white";

// Инициализация модельного ряда
document.addEventListener('DOMContentLoaded', function() {
    initModelSection();
});

function initModelSection() {
    const modelTabs = document.querySelectorAll('.model-tab');
    
    modelTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const modelId = this.dataset.model;
            switchModel(modelId);
        });
    });

    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            const color = this.dataset.color;
            switchColor(color);
        });
    });

    switchModel(currentModel);
}

function switchModel(modelId) {
    const model = modelsData[modelId];
    if (!model) return;

    currentModel = modelId;
    
    document.querySelectorAll('.model-tab').forEach(tab => {
        tab.classList.remove('active', 'semi-inactive', 'inactive');
        if (tab.dataset.model === modelId) {
            tab.classList.add('active');
        } else {
            tab.classList.add('inactive');
        }
    });

    document.getElementById("modelTitle").textContent = model.title;
    document.getElementById("modelPrice").textContent = model.price;

    currentColor = "white";
    switchColor(currentColor);

    updateColorCircles(model.colors);
}

function switchColor(color) {
    const model = modelsData[currentModel];
    if (!model || !model.colors[color]) return;

    currentColor = color;
    
    const colorData = model.colors[color];
    
    // Проверяем, мобильное ли устройство
    if ($(window).width() <= 768) {
        // На мобильных используем мобильные изображения
        updateMobileCarImages();
                

    } else {
        // На десктопе используем обычные изображения
        document.getElementById("modelMainImage").src = colorData.main;
        document.getElementById("modelSecondaryImageLeft").src = colorData.left;
        document.getElementById("modelSecondaryImageRight").src = colorData.right;
    }

    document.querySelectorAll('.color-circle').forEach(circle => {
        circle.classList.remove('active');
        if (circle.dataset.color === color) {
            circle.classList.add('active');
        }
    });

    document.getElementById("selectedColorName").textContent = 
        document.querySelector(`.color-circle[data-color="${color}"]`).dataset.name;
}

function updateColorCircles(availableColors) {
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach(circle => {
        const color = circle.dataset.color;
        if (availableColors[color]) {
            circle.style.display = 'block';
        } else {
            circle.style.display = 'none';
        }
    });
}

// Функция для обновления мобильных изображений (добавлена в глобальную область видимости)
function updateMobileCarImages() {
    if ($(window).width() <= 768) {
        const model = modelsData[currentModel];
        // Сначала пытаемся взять специализированную картинку для модели+цвета
        const modelMobileMap = (typeof mobileModelImages !== 'undefined') ? mobileModelImages[currentModel] : null;
        if (model && modelMobileMap && modelMobileMap[currentColor]) {
            document.getElementById("modelMainImage").src = modelMobileMap[currentColor];
            // Для боковых изображений используем сначала цветное левое изображение, затем fallback
            const colorLeft = (model && model.colors && model.colors[currentColor] && model.colors[currentColor].left)
                ? model.colors[currentColor].left
                : model.secondaryLeft;
            const colorRight = (model && model.colors && model.colors[currentColor] && model.colors[currentColor].right)
                ? model.colors[currentColor].right
                : model.secondaryRight;
            const secLeftEl = document.getElementById("modelSecondaryImageLeft");
            const secRightEl = document.getElementById("modelSecondaryImageRight");
            if (secLeftEl && colorLeft) { secLeftEl.src = colorLeft; secLeftEl.style.display = 'block'; }
            if (secRightEl && colorRight) { secRightEl.src = colorRight; }
            return;
        }

        // Если нет явной мобильной картинки, используем запасные массивы mobileCarImages
        const mobileImages = mobileCarImages[currentModel];
        if (model && mobileImages && mobileImages.length > 0) {
            const mainImageIndex = Object.keys(model.colors).indexOf(currentColor) % mobileImages.length;
            document.getElementById("modelMainImage").src = mobileImages[mainImageIndex];

            const leftImageIndex = (mainImageIndex + 1) % mobileImages.length;
            const rightImageIndex = (mainImageIndex + 2) % mobileImages.length;

            const colorLeft = (model && model.colors && model.colors[currentColor] && model.colors[currentColor].left)
                ? model.colors[currentColor].left
                : null;
            const secLeftEl = document.getElementById("modelSecondaryImageLeft");
            const secRightEl = document.getElementById("modelSecondaryImageRight");
            if (secLeftEl) {
                secLeftEl.src = colorLeft || mobileImages[leftImageIndex];
                secLeftEl.style.display = 'block';
            }
            if (secRightEl) secRightEl.src = mobileImages[rightImageIndex];
        }
    }
}



// Карта Яндекс
function initYandexMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function () {
            // Обновляем координаты на правильный адрес
            var dealerCoords = [51.815934, 55.158308]; // Координаты для п. Пригородный, Нежинское шоссе

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
    }
}

$(document).ready(function() {
    if (typeof ymaps !== 'undefined') {
        initYandexMap();
    }
});
// Дополнительные функции для модельного ряда
function updateModelInfo(modelId) {
    // В реальном приложении здесь будет логика загрузки данных о модели
    console.log('Выбрана модель:', modelId);
}

function changeCarColor(color) {
    // В реальном приложении здесь будет логика изменения цвета автомобиля на изображении
    console.log('Выбран цвет:', color);
}

// Взаимодействие с вкладками моделей
document.addEventListener('DOMContentLoaded', function() {
    const modelTabs = document.querySelectorAll('.model-tab');
    
    modelTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех вкладок
            modelTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('semi-inactive');
                t.classList.remove('inactive');
                if (!t.classList.contains('active')) {
                    t.classList.add('inactive');
                }
            });
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            this.classList.remove('inactive');
            
            // Обновляем информацию о модели
            updateModelInfo(this.dataset.model);
        });
    });

    // Взаимодействие с выбором цвета
    const colorCircles = document.querySelectorAll('.color-circle');
    const colorName = document.querySelector('.color-name');
    
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Убираем активный класс у всех кругов
            colorCircles.forEach(c => c.classList.remove('active'));
            
            // Добавляем активный класс текущему кругу
            this.classList.add('active');
            
            // Обновляем название цвета
            colorName.textContent = this.dataset.name;
            
            // Здесь можно добавить логику для изменения цвета автомобиля на изображении
            changeCarColor(this.dataset.color);
        });
    });
});

// Функция для успешного состояния формы
function showSuccessState() {
    const formContent = document.getElementById('formContent');
    const successContent = document.getElementById('successContent');
    
    if (formContent && successContent) {
        formContent.style.display = 'none';
        successContent.style.display = 'flex';
        successContent.classList.add('fade-in');
    }
}

// Инициализация при загрузке страницы
$(document).ready(function() {
    // Обновляем мобильные изображения при загрузке
    updateMobileCarImages();
    
    // Инициализация карты
    if (typeof ymaps !== 'undefined') {
        initYandexMap();
    }
});
const reviews = [
            {
                quote: "18.11.2023 г. приобрели автомобиль в автосалоне на Полтавской, 43. Оформление прошло в комфортной обстановке, оперативно, атмосфера в салоне доброжелательная. Отзывчивый и вежливый персонал. Особую благодарность выражаем Кирпичникову Егору за компетентное мнение. Получили от него доступную информацию об автомобиле и об условиях покупки. В этом салоне к условиям купли-продажи автомобиля к нам подошли индивидуально, учтя все наши требования, желания и предоставили максимальные скидки. Желаю салону больших продаж и процветания!",
                author: "Татьяна П.",
                source: "Яндекс Карты",
                sourceType: "app"
            },
            {
                quote: "Выражаю благодарность сотрудникам автосалона и персонально менеджеру Бегалиеву Равилю за квалифицированную помощь в подборке и приобретении автомобиля Cherri Tiggo 7 pro max. Радует и помогает его индивидуальный подход к покупателям, профессионализм и скорость принятия решений. Также хочется отметить специалиста кредитного отдела Кузьмину Александру за подробное и понятное и терпеливое обьяснение всех условий. Всем огромное спасибо и успехов.",
                author: "Виктор Гривко",
                source: "Chery Tiggo 7 Pro Max",
                sourceType: "car"
            },
            {
                quote: "Приебрел второй автомобиль Cherry в автосалоне ТВС моторс в Оренбурге. Первый 3 года назад Cherry tiggo4 , отличный автомобиль проехал 90тыс. Км без нареканий решил попробовать Tiggo 7 pro сегодня приобрели. В автосалоне очень комфортно даже попал на розыгрыш среди покупателей в этом году, но не участвовал . Мое участие ждет меня через месяц и в конце года 🍋 . Обязательно приеду. Очень всем рекомендую. На автомобиль дали хорошую цену и скидку на новый и куча бесплатных допов( защита движка,решетки ,коврики и зимняя резина)",
                author: "Андрей Пересыпкин",
                source: "Яндекс Карты",
                sourceType: "app"
            },
            {
                quote: "Обожаю когда всё современно. Личный кабинет, где можно следить каждую манипуляцию с автомобилем. Связь с клиентской службой, где не только отвечают молниеносно но и перезванивают сразу. И не разговариваешь с роботом а с живым человеком. Да, цены на ТО. Но зато всё у официального дилера, всё в одном месте, без очередей. За всё можно спросить и устранить. Чем бегать по всему городу по автосервисам. А девушки просто милашки. Безумно красивая девочка на ресепшене работает на Нежинском шоссе. Приветливая улыбка. Красотка просто.",
                author: "Юрий Морозов",
                source: "Яндекс Карты",
                sourceType: "app"
            },
            {
                quote: "Обожаю когда всё современно. Личный кабинет, где можно следить каждую манипуляцию с автомобилем. Связь с клиентской службой, где не только отвечают молниеносно но и перезванивают сразу. И не разговариваешь с роботом а с живым человеком. Да, цены на ТО. Но зато всё у официального дилера, всё в одном месте, без очередей. За всё можно спросить и устранить. Чем бегать по всему городу по автосервисам. А девушки просто милашки. Безумно красивая дегочка на ресепшене работает на Нежинском шоссе. Приветливая улыбка. Красотка просто.",
                author: "Андрей Пересыпкин",
                source: "",
                sourceType: ""
            },
            {
                quote: "18.11.2023 г. приобрели автомобиль в автосалоне на Полтавской, 43. Оформление прошло в комфортной обстановке, оперативно, атмосфера в салоне доброжелательная. Отзывчивый и вежливый персонал. Особую благодарность выражаем Кирпичникову Егору за компетентное мнение. Получили от него доступную информацию об автомобиле и об условиях покупки. В этом салоне к условиям купли-продажи автомобиля к нам подошли индивидуально, учтя все наши требования, желания и предоставили максимальные скидки. Желаю салону больших продаж и процветания!",
                author: "Татьяна П.",
                source: "",
                sourceType: ""
            }
        ];

        // Инициализация десктоп версии
        function initDesktopComments() {
            const column1 = document.getElementById('column1');
            const column2 = document.getElementById('column2');
            
            if (!column1 || !column2) return;
            
            // Разделяем отзывы на две группы
            const firstHalf = reviews.slice(0, Math.ceil(reviews.length / 2));
            const secondHalf = reviews.slice(Math.ceil(reviews.length / 2));
            
            // Добавляем карточки в первую колонку
            firstHalf.forEach(review => {
                column1.appendChild(createDesktopCard(review));
            });
            
            // Добавляем карточки во вторую колонку
            secondHalf.forEach(review => {
                column2.appendChild(createDesktopCard(review));
            });
            
            // Дублируем контент для бесконечного скролла
            duplicateContentForScroll(column1);
            duplicateContentForScroll(column2);
        }

        // Инициализация мобильной версии
        function initMobileComments() {
            const mobileColumn = document.getElementById('mobileColumn');
            const pagination = document.querySelector('.comments-mobile-pagination');
            
            if (!mobileColumn || !pagination) return;
            
            // Очищаем контейнеры
            mobileColumn.innerHTML = '';
            pagination.innerHTML = '';
            
            // Добавляем все карточки
            reviews.forEach((review, index) => {
                mobileColumn.appendChild(createMobileCard(review));
                
                // Создаем точки пагинации
                const dot = document.createElement('div');
                dot.className = `comments-mobile-dot ${index === 0 ? 'active' : ''}`;
                dot.dataset.index = index;
                pagination.appendChild(dot);
            });
            
            // Добавляем обработчики для пагинации
            initMobilePagination();
            initMobileArrows();
            
            // Обновляем состояние стрелок при загрузке
            updateMobileArrows();
        }

        // Создание карточки для десктопа
        function createDesktopCard(review) {
            const card = document.createElement('div');
            card.className = 'comment-card';
            
            let sourceClass = 'new_dzn-commets-content-style-name';
            if (review.sourceType === 'app') {
                sourceClass = 'new_dzn-commets-content-style-name-app';
            } else if (review.sourceType === 'car') {
                sourceClass = 'new_dzn-commets-content-style-name-car';
            }
            
            card.innerHTML = `
                <div class="new_dzn-commets-content-style-title1">
                    <span class="new_dzn-commets-content-style-elms">"</span>
                    <p>${review.quote}</p>
                </div>
                <div class="new_dzn-commets-content-style-title2">
                    <h2>${review.author}</h2>
                    ${review.source ? `<span class="${sourceClass}">${review.source}</span>` : ''}
                </div>
            `;
            
            return card;
        }

        // Создание карточки для мобильной версии
        function createMobileCard(review) {
            const card = document.createElement('div');
            card.className = 'comment-mobile-card';
            
            let sourceClass = 'new_dzn-commets-content-style-name';
            if (review.sourceType === 'app') {
                sourceClass = 'new_dzn-commets-content-style-name-app';
            } else if (review.sourceType === 'car') {
                sourceClass = 'new_dzn-commets-content-style-name-car';
            }
            
            card.innerHTML = `
                <div class="new_dzn-commets-content-style-title1">
                    <span class="new_dzn-commets-content-style-elms">"</span>
                    <p>${review.quote}</p>
                </div>
                <div class="new_dzn-commets-content-style-title2">
                    <h2>${review.author}</h2>
                    ${review.source ? `<span class="${sourceClass}">${review.source}</span>` : ''}
                </div>
            `;
            
            return card;
        }

        // Функция для дублирования контента (только для десктопа)
        function duplicateContentForScroll(column) {
            const content = column.innerHTML;
            column.innerHTML += content;
        }

        // Инициализация мобильной пагинации
        function initMobilePagination() {
            const container = document.querySelector('.comments-mobile-container');
            const dots = document.querySelectorAll('.comments-mobile-dot');
            
            if (!container || dots.length === 0) return;
            
            container.addEventListener('scroll', () => {
                const scrollLeft = container.scrollLeft;
                const cardWidth = container.querySelector('.comment-mobile-card').offsetWidth + 16;
                const activeIndex = Math.round(scrollLeft / cardWidth);
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
                
                // Обновляем состояние стрелок при скролле
                updateMobileArrows();
            });
            
            // Обработчики клика на точки
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const cardWidth = container.querySelector('.comment-mobile-card').offsetWidth + 16;
                    container.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                    });
                });
            });
        }

        // Инициализация мобильных стрелок
        function initMobileArrows() {
            const container = document.querySelector('.comments-mobile-container');
            const arrowLeft = document.getElementById('arrowLeft');
            const arrowRight = document.getElementById('arrowRight');
            
            if (!container || !arrowLeft || !arrowRight) return;
            
            arrowLeft.addEventListener('click', () => {
                const cardWidth = container.querySelector('.comment-mobile-card').offsetWidth + 16;
                container.scrollBy({
                    left: -cardWidth,
                    behavior: 'smooth'
                });
            });
            
            arrowRight.addEventListener('click', () => {
                const cardWidth = container.querySelector('.comment-mobile-card').offsetWidth + 16;
                container.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
            });
        }

        // Обновление состояния мобильных стрелок
        function updateMobileArrows() {
            const container = document.querySelector('.comments-mobile-container');
            const arrowLeft = document.getElementById('arrowLeft');
            const arrowRight = document.getElementById('arrowRight');
            
            if (!container || !arrowLeft || !arrowRight) return;
            
            const scrollLeft = container.scrollLeft;
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            const cardWidth = container.querySelector('.comment-mobile-card').offsetWidth + 16;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            const totalCards = reviews.length;
            
            // Левая стрелка активна, если мы не на первой карточке
            arrowLeft.disabled = currentIndex === 0;
            
            // Правая стрелка активна, если мы не на последней карточке
            arrowRight.disabled = currentIndex >= totalCards - 1;
        }

        // Основная инициализация
        document.addEventListener('DOMContentLoaded', function() {
            initDesktopComments();
            initMobileComments();
            
            // Обновляем стрелки при ресайзе
            window.addEventListener('resize', updateMobileArrows);
        });

        /*ВИДЕО-ОТЗЫВЫ ТОЛЬКО С IMG БЕЗ САМОГО ВИДЕО*/ 
        document.addEventListener('DOMContentLoaded', function() {
            // Данные карточек
            const cardData = [
                {
                    image: './image/new_vide_img1.svg',
                    title: 'Юрий Морозов',
                    carName: 'Chery Tiggo 7 Pro'
                },
                {
                    image: './image/new_vide_img2.svg',
                    title: 'Андрей Пересыпкин',
                    carName: 'Chery Arrizo 8'
                },
                {
                    image: './image/new_vide_img3.svg',
                    title: 'Андрей Пересыпкин',
                    carName: 'Chery Arrizo 8'
                },
                {
                    image: './image/new_vide_img1.svg',
                    title: 'Андрей Пересыпкин',
                    carName: 'Chery Arrizo 8'
                },
                {
                    image: './image/new_vide_img2.svg',
                    title: 'Андрей Пересыпкин',
                    carName: 'Chery Arrizo 8'
                },
                {
                    image: './image/new_vide_img3.svg',
                    title: 'Татьяна П.',
                    carName: 'Chery Tiggo 4 New'
                },
                {
                    image: './image/new_vide_img1.svg',
                    title: 'Татс Снега',
                    carName: 'Chery Tiggo 7 Pro'
                },
                {
                    image: './image/new_vide_img2.svg',
                    title: 'Анна Иванова',
                    carName: 'Chery Tiggo 8 Pro'
                }
            ];

            // Элементы DOM
            const videoGrid = document.getElementById('videoGrid');
            const videoCarousel = document.getElementById('videoCarousel');
            const leftArrow = document.querySelector('.left-arrow');
            const rightArrow = document.querySelector('.right-arrow');
            
            let isMobile = window.innerWidth <= 768;
            let currentIndex = 0;
            let cardWidth = isMobile ? 343 : 400;
            let gap = isMobile ? 16 : 24;

            // Создание карточек
            function createCards() {
                console.log('createCards() called; window.innerWidth=', window.innerWidth);
                videoGrid.innerHTML = '';
                // Сбрасываем индекс при пересоздании карточек для мобильного режима,
                // чтобы не осталось значения от десктопной логики (например currentIndex = 4)
                if (window.innerWidth <= 768) currentIndex = 0;
                
                // Создаем оригинальные карточки
                cardData.forEach((card, index) => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'video-comments-card';
                    cardElement.style.backgroundImage = `linear-gradient(0deg, rgba(60, 60, 60, 0.5), rgba(60, 60, 60, 0.5)), url('${card.image}')`;
                    cardElement.dataset.index = index;
                    
                    cardElement.innerHTML = `
                        <div class="video-comments-play-container">
                            <div class="video-comments-play-btn">
                                <div class="video-comments-play-icon"></div>
                            </div>
                        </div>
                        <div class="video-comments-text-container">
                            <div class="text-content">
                                <h4 class="video-comments-card-title">${card.title}</h4>
                                <span class="video-comments-car-name">${card.carName}</span>
                            </div>
                        </div>
                    `;
                    
                    videoGrid.appendChild(cardElement);
                });

                // Гарантируем видимость и сбрасываем трансформации для мобильной версии
                try {
                    if (window.innerWidth <= 768) {
                        videoGrid.style.display = 'flex';
                        videoGrid.style.transform = '';
                    } else {
                        videoGrid.style.display = '';
                        videoGrid.style.transform = '';
                    }
                } catch (err) {
                    console.warn('Failed to adjust videoGrid styles', err);
                }

                console.log('createCards(): appended', videoGrid.querySelectorAll('.video-comments-card').length, 'cards');

                // Настройка карусели
                if (isMobile) {
                    setupMobileCarousel();
                } else {
                    setupDesktopCarousel();
                }
            }

            // Настройка мобильной версии
            function setupMobileCarousel() {
                cardWidth = 343;
                gap = 16;
                
                // Центрируем контейнер
                videoCarousel.style.display = 'flex';
                videoCarousel.style.justifyContent = 'center';
                
                // Показываем только текущую карточку
                const cards = videoGrid.querySelectorAll('.video-comments-card');
                cards.forEach((card, index) => {
                    card.style.display = index === currentIndex ? 'flex' : 'none';
                });

                // Настройка навигации
                setupMobileNavigation();
            }

            // Настройка десктопной версии
            function setupDesktopCarousel() {
                cardWidth = 400;
                gap = 24;
                
                // Клонируем карточки для бесконечного скролла
                const cards = videoGrid.querySelectorAll('.video-comments-card');
                
                // Клонируем первые 4 карточки и добавляем в конец
                for (let i = 0; i < 4; i++) {
                    const clone = cards[i].cloneNode(true);
                    videoGrid.appendChild(clone);
                }
                
                // Клонируем последние 4 карточки и добавляем в начало
                for (let i = cards.length - 4; i < cards.length; i++) {
                    const clone = cards[i].cloneNode(true);
                    videoGrid.insertBefore(clone, videoGrid.firstChild);
                }

                // Устанавливаем начальную позицию (настоящие первые карточки)
                currentIndex = 4; // Потому что добавили 4 клона в начало
                updateCardPosition();
                
                // Настройка drag & drop
                setupDragHandlers();
            }

            // Обновление позиции карточек
            function updateCardPosition() {
                const transformValue = -currentIndex * (cardWidth + gap);
                videoGrid.style.transform = `translateX(${transformValue}px)`;
            }

            // Переход к следующей карточке
            function nextCard() {
                if (isMobile) {
                    // Для мобильной версии
                    const cards = videoGrid.querySelectorAll('.video-comments-card');
                    cards[currentIndex].style.display = 'none';
                    
                    currentIndex = (currentIndex + 1) % cardData.length;
                    cards[currentIndex].style.display = 'flex';
                } else {
                    // Для десктопной версии
                    currentIndex++;
                    
                    // Если достигли конца (оригинальные карточки + клоны в конце)
                    if (currentIndex >= cardData.length + 4) {
                        // Мгновенно переходим к началу оригинальных карточек
                        currentIndex = 4;
                        videoGrid.style.transition = 'none';
                        updateCardPosition();
                        // Возвращаем transition
                        setTimeout(() => {
                            videoGrid.style.transition = 'transform 0.3s ease';
                        }, 50);
                    } else {
                        updateCardPosition();
                    }
                }
            }

            // Переход к предыдущей карточке
            function prevCard() {
                if (isMobile) {
                    // Для мобильной версии
                    const cards = videoGrid.querySelectorAll('.video-comments-card');
                    cards[currentIndex].style.display = 'none';
                    
                    currentIndex = (currentIndex - 1 + cardData.length) % cardData.length;
                    cards[currentIndex].style.display = 'flex';
                } else {
                    // Для десктопной версии
                    currentIndex--;
                    
                    // Если достигли начала (клоны в начале)
                    if (currentIndex < 0) {
                        // Мгновенно переходим к концу оригинальных карточек
                        currentIndex = cardData.length + 3;
                        videoGrid.style.transition = 'none';
                        updateCardPosition();
                        // Возвращаем transition
                        setTimeout(() => {
                            videoGrid.style.transition = 'transform 0.3s ease';
                        }, 50);
                    } else {
                        updateCardPosition();
                    }
                }
            }

            // Настройка навигации для мобильной версии
            function setupMobileNavigation() {
                if (leftArrow && rightArrow) {
                    leftArrow.addEventListener('click', prevCard);
                    rightArrow.addEventListener('click', nextCard);
                }
            }

            // Drag & Drop для десктопа
            function setupDragHandlers() {
                let isDragging = false;
                let startX = 0;
                let startTranslate = 0;

                videoCarousel.addEventListener('mousedown', startDrag);
                videoCarousel.addEventListener('touchstart', startDrag);
                
                videoCarousel.addEventListener('mousemove', duringDrag);
                videoCarousel.addEventListener('touchmove', duringDrag);
                
                videoCarousel.addEventListener('mouseup', endDrag);
                videoCarousel.addEventListener('touchend', endDrag);
                videoCarousel.addEventListener('mouseleave', endDrag);

                function startDrag(e) {
                    isDragging = true;
                    startX = e.pageX || e.touches[0].pageX;
                    startTranslate = -currentIndex * (cardWidth + gap);
                    videoGrid.style.transition = 'none';
                }

                function duringDrag(e) {
                    if (!isDragging) return;
                    e.preventDefault();
                    
                    const x = e.pageX || e.touches[0].pageX;
                    const walk = (x - startX);
                    const currentTranslate = startTranslate + walk;
                    
                    videoGrid.style.transform = `translateX(${currentTranslate}px)`;
                }

                function endDrag() {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const endX = event.pageX || event.changedTouches[0].pageX;
                    const diff = startX - endX;
                    
                    // Определяем направление свайпа
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            nextCard();
                        } else {
                            prevCard();
                        }
                    } else {
                        // Возвращаем на место если свайп был маленьким
                        updateCardPosition();
                    }
                    
                    videoGrid.style.transition = 'transform 0.3s ease';
                }
            }

            // Инициализация карусели
            function initCarousel() {
                createCards();
            }

            // Обработчик изменения размера окна
            function handleResize() {
                const wasMobile = isMobile;
                isMobile = window.innerWidth <= 768;
                
                if (wasMobile !== isMobile) {
                    createCards();
                }
            }

            // Запускаем инициализацию
            initCarousel();
            // Оставляем resize handler на случай обычного ресайза
            window.addEventListener('resize', handleResize);
            // И добавляем listener для изменения media-query — срабатывает при переключении в DevTools device toolbar
            try {
                const mq = window.matchMedia('(max-width: 768px)');
                if (mq && typeof mq.addEventListener === 'function') {
                    mq.addEventListener('change', (e) => {
                        const nowMobile = e.matches;
                        if (nowMobile !== isMobile) {
                            isMobile = nowMobile;
                            createCards();
                        }
                    });
                } else if (mq && typeof mq.addListener === 'function') {
                    // backward compatibility
                    mq.addListener((e) => {
                        const nowMobile = e.matches;
                        if (nowMobile !== isMobile) {
                            isMobile = nowMobile;
                            createCards();
                        }
                    });
                }
            } catch (err) {
                console.warn('matchMedia listener not available', err);
            }
            
            // Обработчики для секции актуальных предложений (стрелки прокрутки)
            (function() {
                const container = document.querySelector('.new_croll-cards-container');
                const leftArrow = document.querySelector('.new_croll-arrow-left');
                const rightArrow = document.querySelector('.new_croll-arrow-right');

                if (!container || !leftArrow || !rightArrow) return;

                function getStep() {
                    const card = container.querySelector('.new_croll-card');
                    if (!card) return Math.round(container.clientWidth * 0.8);
                    const style = window.getComputedStyle(card);
                    const marginRight = parseFloat(style.marginRight) || 0;
                    return card.offsetWidth + marginRight;
                }

                function updateArrowsState() {
                    const atStart = container.scrollLeft <= 5;
                    const atEnd = (container.scrollWidth - container.clientWidth - container.scrollLeft) <= 5;
                    leftArrow.classList.toggle('disabled', atStart);
                    rightArrow.classList.toggle('disabled', atEnd);
                    // Для доступности: блокируем кнопки
                    leftArrow.setAttribute('aria-disabled', atStart ? 'true' : 'false');
                    rightArrow.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
                }

                leftArrow.addEventListener('click', function() {
                    const step = getStep();
                    container.scrollBy({ left: -step, behavior: 'smooth' });
                });

                rightArrow.addEventListener('click', function() {
                    const step = getStep();
                    container.scrollBy({ left: step, behavior: 'smooth' });
                });

                // Обновляем состояние при ручной прокрутке и ресайзе
                container.addEventListener('scroll', updateArrowsState);
                window.addEventListener('resize', updateArrowsState);

                // Инициализация состояния
                setTimeout(updateArrowsState, 0);
            })();
        });