$(document).ready(function() {
    // Открытие подменю
    $('#mobileMainMenu .new_dzn-nav-item').on('click', function(e) {
        e.preventDefault();
        var menu = $(this).data('menu');
        $('#mobileMainMenu').hide();
        $('.new_dzn-mobile-submenu').removeClass('active');
        $('#mobileSubMenu-' + menu).addClass('active');
    });

    // Назад к основному меню
    $('.new_dzn-mobile-submenu .new_dzn-mobile-back').on('click', function(e) {
        e.preventDefault();
        $('.new_dzn-mobile-submenu').removeClass('active');
        $('#mobileMainMenu').show();
    });
    // Открытие мобильного меню
    $('.new_dzn-mobile-menu-btn').on('click', function(e) {
        e.stopPropagation();
        $('#mobileMenu').addClass('active');
        $('body').addClass('menu-open'); // Блокируем скролл
    });

    // Закрытие мобильного меню
    $('#mobileMenuClose').on('click', function(e) {
        e.stopPropagation();
        closeMobileMenu();
    });

    // Закрытие по клику вне меню
    $(document).on('click', function(e) {
        if ($(e.target).closest('#mobileMenu').length === 0 && 
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
        var parent = $(this).closest('.new_dzn-nav-item-with-dropdown');
        parent.toggleClass('active');
        $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').not(parent).removeClass('active');
    });

    // Функция закрытия меню
    function closeMobileMenu() {
        $('#mobileMenu').removeClass('active');
        $('.new_dzn-mobile-menu-btn').removeClass('active');
        $('body').removeClass('menu-open');
        $('.new_dzn-mobile-navigation .new_dzn-nav-item-with-dropdown').removeClass('active');
    }
});