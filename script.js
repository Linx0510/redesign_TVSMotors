$(document).ready(function() {
    // Mobile menu functionality
    $('.new_dzn-mobile-menu-btn').on('click', function() {
        $('.new_dzn-navigation').toggleClass('active');
        $(this).toggleClass('active');
    });
    
    // Mobile dropdown functionality
    $(document).on('click', '.new_dzn-nav-item-with-dropdown', function(e) {
        if ($(window).width() <= 768) {
            e.preventDefault();
            e.stopPropagation();
            $(this).toggleClass('active');
            
            // Close other dropdowns
            $('.new_dzn-nav-item-with-dropdown').not(this).removeClass('active');
        }
    });
    
    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.new_dzn-nav-item-with-dropdown').length) {
            $('.new_dzn-nav-item-with-dropdown').removeClass('active');
        }
        
        // Close mobile menu when clicking outside
        if (!$(e.target).closest('.new_dzn-header-nav').length && $(window).width() <= 768) {
            $('.new_dzn-navigation').removeClass('active');
            $('.new_dzn-mobile-menu-btn').removeClass('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    $('.new_dzn-dropdown-link').on('click', function() {
        if ($(window).width() <= 768) {
            $('.new_dzn-navigation').removeClass('active');
            $('.new_dzn-mobile-menu-btn').removeClass('active');
            $('.new_dzn-nav-item-with-dropdown').removeClass('active');
        }
    });
    
    // Handle window resize
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            $('.new_dzn-navigation').removeClass('active');
            $('.new_dzn-mobile-menu-btn').removeClass('active');
            $('.new_dzn-nav-item-with-dropdown').removeClass('active');
        }
    });
    
    // Prevent dropdown close when clicking inside dropdown
    $('.new_dzn-dropdown-menu').on('click', function(e) {
        e.stopPropagation();
    });
});