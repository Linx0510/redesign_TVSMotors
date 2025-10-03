$(document).ready(function() {
    // Фоны для главного блока
    const heroBackgrounds = [
        "image/Hero (2).svg",
        "image/Timer.svg", 
       "image/Hero (2).svg",
        "image/Hero (2).svg"
    ];
    let currentHeroBg = 0;

    function setHeroBg(idx) {
        console.log('Setting background:', idx, heroBackgrounds[idx]);
        
        const $bg = $("#heroBg");
        if ($bg.length) {
            // Добавляем градиент к фону
            $bg.css('background', 
                `linear-gradient(263deg, rgba(0, 0, 0, 0.00) 22.51%, rgba(0, 0, 0, 0.80) 96.87%), 
                 url('${heroBackgrounds[idx]}') lightgray 50% / cover no-repeat`
            );
        }
        
        // Обновляем активную точку
        $('.new_dzn-hero-dot').removeClass('active');
        $('.new_dzn-hero-dot[data-index="' + idx + '"]').addClass('active');
        
        currentHeroBg = idx;
    }

    // Инициализация фона при загрузке
    setHeroBg(currentHeroBg);
    
    // Обработчики для точек переключения фона
    $('.new_dzn-hero-dot').on('click', function() {
        const index = parseInt($(this).data('index'));
        console.log('Dot clicked:', index);
        setHeroBg(index);
    });

    // Автопереключение фонов (РАСКОММЕНТИРОВАНО)
    function startAutoSlide() {
        setInterval(function() {
            currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
            setHeroBg(currentHeroBg);
        }, 5000); // Меняем каждые 5 секунд (увеличил с 1 до 5 секунд)
    }
    
 
    startAutoSlide(); 

    // Остальной ваш код для мобильного меню...
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

    // Открытие мобильного меню
    $('.new_dzn-mobile-menu-btn').on('click', function(e) {
        e.stopPropagation();
        $('#mobileMenu').addClass('active');
        $('body').addClass('menu-open');
    });

    // Закрытие мобильного меню
    $('#mobileMenuClose').on('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
    });

    // Закрытие по клику вне меню
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#mobileMenu').length && 
            !$(e.target).hasClass('new_dzn-mobile-menu-btn')) {
            closeMobileMenu();
        }
    });

    // Закрытие по ESC
    $(document).on('keyup', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Mobile dropdowns
    $(document).on('click', '.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown > span', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $parent = $(this).closest('.new_dzn-nav-item-with-dropdown');
        $parent.toggleClass('active');
        $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').not($parent).removeClass('active');
    });

    // Функция закрытия меню
    function closeMobileMenu() {
        $('#mobileMenu').removeClass('active');
        $('.new_dzn-mobile-menu-btn').removeClass('active');
        $('body').removeClass('menu-open');
        $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').removeClass('active');
    }
});