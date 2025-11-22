$(document).ready(function() {
    // Фоны для главного блока
const heroBackgrounds = [
    "image/Hero1.svg",
    "image/Hero2.svg", 
    "image/Hero3.svg",
    "image/Hero4.svg"
];
let currentHeroBg = 0;

// Предзагрузка изображений для избежания задержек
function preloadImages() {
    heroBackgrounds.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}
preloadImages();

function setHeroBg(idx) {
    console.log('Setting background:', idx, heroBackgrounds[idx]);
    
    const $bg = $("#heroBg");
    if ($bg.length) {
        // Плавное переключение с переходом
        $bg.css('transition', 'background 0.5s ease-in-out');
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
let nextHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;

function preloadNextBackground() {
    const img = new Image();
    img.src = heroBackgrounds[nextHeroBg];
}

// Вызывать после каждой смены фона
preloadNextBackground();

// Автопереключение фонов
function startAutoSlide() {
    setInterval(function() {
        currentHeroBg = (currentHeroBg + 1) % heroBackgrounds.length;
        setHeroBg(currentHeroBg);
    }, 4000); // Меняем каждые 4 секунды
}

// Запускаем автопереключение
startAutoSlide();
    
 
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


//form1
   
        $(document).ready(function() {
            // Маска для телефона
            $('#phoneInput').on('input', function(e) {
                let x = $(this).val().replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
            });

            // Валидация формы
            $('#offerForm').on('submit', function(e) {
                e.preventDefault();
                
                const phoneInput = $('#phoneInput');
                const agreementCheckbox = $('#agreementCheckbox');
                const phoneError = $('#phoneError');
                const agreementError = $('#agreementError');
                let isValid = true;

                // Валидация телефона
                const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
                if (!phoneRegex.test(phoneInput.val())) {
                    phoneInput.addClass('error');
                    phoneError.show();
                    isValid = false;
                } else {
                    phoneInput.removeClass('error');
                    phoneError.hide();
                }

                // Валидация согласия
                if (!agreementCheckbox.is(':checked')) {
                    agreementError.show();
                    isValid = false;
                } else {
                    agreementError.hide();
                }

                if (isValid) {
                    // Показываем успешное состояние
                    showSuccessState();
                }
            });

            function showSuccessState() {
                $('#formContent').hide();
                $('#successContent').show().addClass('fade-in');
            }

            // Таймер обратного отсчета
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
                                // Акция завершена
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

            // Запуск таймера
            setInterval(updateTimer, 1000);
        });
    

//form2

      $(document).ready(function() {
            // Маска для телефона
            $('#creditPhoneInput').on('input', function(e) {
                let x = $(this).val().replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
            });

            // Валидация формы
            $('#creditForm').on('submit', function(e) {
                e.preventDefault();
                
                const phoneInput = $('#creditPhoneInput');
                const agreementCheckbox = $('#creditAgreementCheckbox');
                const phoneError = $('#creditPhoneError');
                const agreementError = $('#creditAgreementError');
                let isValid = true;

                // Валидация телефона
                const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
                if (!phoneRegex.test(phoneInput.val())) {
                    phoneInput.addClass('error');
                    phoneError.show();
                    isValid = false;
                } else {
                    phoneInput.removeClass('error');
                    phoneError.hide();
                }

                // Валидация согласия
                if (!agreementCheckbox.is(':checked')) {
                    agreementError.show();
                    isValid = false;
                } else {
                    agreementError.hide();
                }

                if (isValid) {
                    // Показываем успешное состояние
                    showCreditSuccessState();
                }
            });

            function showCreditSuccessState() {
                $('#creditFormContent').hide();
                $('#creditSuccessContent').show().addClass('fade-in');
            }
        });

        //form3

          // Маска для телефона
        document.getElementById('phoneInput').addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });

        // Валидация формы
        document.getElementById('testDriveForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneInput = document.getElementById('phoneInput');
            const agreementCheckbox = document.getElementById('agreementCheckbox');
            const phoneError = document.getElementById('phoneError');
            const agreementError = document.getElementById('agreementError');
            let isValid = true;

            // Валидация телефона
            const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                phoneInput.classList.add('error');
                phoneError.style.display = 'block';
                isValid = false;
            } else {
                phoneInput.classList.remove('error');
                phoneError.style.display = 'none';
            }

            // Валидация согласия
            if (!agreementCheckbox.checked) {
                agreementError.style.display = 'block';
                isValid = false;
            } else {
                agreementError.style.display = 'none';
            }

            if (isValid) {
                // Показываем успешное состояние
                showSuccessState();
            }
        });
// form3 - Test Drive Form
$(document).ready(function() {
    // Маска для телефона
    $('#testDrivePhoneInput').on('input', function(e) {
        let x = $(this).val().replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        $(this).val('+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : ''));
    });

    // Валидация формы
    $('#testDriveForm').on('submit', function(e) {
        e.preventDefault();
        
        const phoneInput = $('#testDrivePhoneInput');
        const agreementCheckbox = $('#testDriveAgreementCheckbox');
        const phoneError = $('#testDrivePhoneError');
        const agreementError = $('#testDriveAgreementError');
        let isValid = true;

        // Валидация телефона
        const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phoneInput.val())) {
            phoneInput.addClass('error');
            phoneError.show();
            isValid = false;
        } else {
            phoneInput.removeClass('error');
            phoneError.hide();
        }

        // Валидация согласия
        if (!agreementCheckbox.is(':checked')) {
            agreementError.show();
            isValid = false;
        } else {
            agreementError.hide();
        }

        if (isValid) {
            // Показываем успешное состояние
            showTestDriveSuccessState();
        }
    });

    function showTestDriveSuccessState() {
        $('#testDriveFormContent').hide();
        $('#testDriveSuccessContent').show().addClass('fade-in');
    }
});
        function showSuccessState() {
            const formContent = document.getElementById('formContent');
            const successContent = document.getElementById('successContent');
            
            formContent.style.display = 'none';
            successContent.style.display = 'flex';
            successContent.classList.add('fade-in');
        }

            // Взаимодействие с вкладками моделей (первая секция)
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
    
            // Взаимодействие с выбором цвета (первая секция)
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
    
            // Функции для обновления информации (заглушки)
            function updateModelInfo(modelId) {
                // В реальном приложении здесь будет логика загрузки данных о модели
                console.log('Выбрана модель:', modelId);
            }
    
            function changeCarColor(color) {
                // В реальном приложении здесь будет логика изменения цвета автомобиля на изображении
                console.log('Выбран цвет:', color);
            }
            // Добавьте этот код в существующий script.js после остального кода

// Данные для моделей с цветами
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
    
    // Обработчики для вкладок моделей
    modelTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const modelId = this.dataset.model;
            switchModel(modelId);
        });
    });

    // Обработчики для выбора цвета
    const colorCircles = document.querySelectorAll('.color-circle');
    colorCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            const color = this.dataset.color;
            switchColor(color);
        });
    });

    // Инициализация первой модели
    switchModel(currentModel);
}

function switchModel(modelId) {
    const model = modelsData[modelId];
    if (!model) return;

    currentModel = modelId;
    
    // Обновляем активную вкладку
    document.querySelectorAll('.model-tab').forEach(tab => {
        tab.classList.remove('active', 'semi-inactive', 'inactive');
        if (tab.dataset.model === modelId) {
            tab.classList.add('active');
        } else {
            tab.classList.add('inactive');
        }
    });

    // Обновляем информацию о модели
    document.getElementById("modelTitle").textContent = model.title;
    document.getElementById("modelPrice").textContent = model.price;

    // Переключаем на белый цвет по умолчанию для новой модели
    currentColor = "white";
    switchColor(currentColor);

    // Обновляем доступные цвета
    updateColorCircles(model.colors);
}

function switchColor(color) {
    const model = modelsData[currentModel];
    if (!model || !model.colors[color]) return;

    currentColor = color;
    
    // Обновляем изображения
    const colorData = model.colors[color];
    document.getElementById("modelMainImage").src = colorData.main;
    document.getElementById("modelSecondaryImageLeft").src = colorData.left;
    document.getElementById("modelSecondaryImageRight").src = colorData.right;

    // Обновляем активный цвет
    document.querySelectorAll('.color-circle').forEach(circle => {
        circle.classList.remove('active');
        if (circle.dataset.color === color) {
            circle.classList.add('active');
        }
    });

    // Обновляем название цвета
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

// Инициализация второй секции
    
            // Данные отзывов (вторая секция)
            const reviews = [
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
                    quote: "18.11.2023 г. приобрели автомобиль в автосалоне на Полтавской, 43. Оформление прошло в комфортной обстановке, оперативно, атмосфера в салоне доброжелательная. Отзывчивый и вежливый персонал. Особую благодарность выражаем Кирпичникову Егору за компетентное мнение. Получили от него доступную информацию об автомобиле и об условиях покупки. В этом салоне к условиям купли-продажи автомобиля к нам подошли индивидуально, учтя все наши требования, желания и предоставили максимальные скидки. Желаю салону больших продаж и процветания!",
                    author: "Татьяна П.",
                    source: "Яндекс Карты",
                    sourceType: "app"
                },
                {
                    quote: "Обожаю когда всё современно. Личный кабинет, где можно следить каждую манипуляцию с автомобилем. Связь с клиентской службой, где не только отвечают молниеносно но и перезванивают сразу. И не разговариваешь с роботом а с живым человеком. Да, цены на ТО. Но зато всё у официального дилера, всё в одном месте, без очередей. За всё можно спросить и устранить. Чем бегать по всему городу по автосервисам. А девушки просто милашки. Безумно красивая девочка на ресепшене работает на Нежинском шоссе. Приветливая улыбка. Красотка просто.",
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
    
            // Создание карточек отзывов (вторая секция)
            const column1 = document.getElementById('column1');
            const column2 = document.getElementById('column2');
    
            // Разделяем отзывы на две группы
            const firstHalf = reviews.slice(0, Math.ceil(reviews.length / 2));
            const secondHalf = reviews.slice(Math.ceil(reviews.length / 2));
    
            // Функция для создания карточки
            function createCard(review) {
                const card = document.createElement('div');
                card.className = 'comment-card';
                
                // Определение класса для источника в зависимости от типа
                let sourceClass = '';
                if (review.sourceType === 'app') {
                    sourceClass = 'new_dzn-commets-content-style-name-app';
                } else if (review.sourceType === 'car') {
                    sourceClass = 'new_dzn-commets-content-style-name-car';
                } else {
                    sourceClass = 'new_dzn-commets-content-style-name';
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
    
            // Добавляем карточки в первую колонку
            firstHalf.forEach(review => {
                column1.appendChild(createCard(review));
            });
    
            // Добавляем карточки во вторую колонку
            secondHalf.forEach(review => {
                column2.appendChild(createCard(review));
            });
    
            // Дублируем контент для бесконечного скролла
            function duplicateContentForScroll(column) {
                const content = column.innerHTML;
                column.innerHTML += content;
            }
    
            duplicateContentForScroll(column1);
            duplicateContentForScroll(column2);
    //карта 
    function initYandexMap() {
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

$(document).ready(function() {
    if (typeof ymaps !== 'undefined') {
        initYandexMap();
    }
});
          








/*видеоотзыв */
 
        $(document).ready(function() {
            let $cards = $('.video-comments-card');
            let $leftArrow = $('.video-comments-nav .left-arrow');
            let $rightArrow = $('.video-comments-nav .right-arrow');
            let $wrapper = $('.video-comments-wrapper');
            let currentIndex = 0;
            let isAnimating = false;
            let touchStartX = 0;
            var touchEndX = 0;
            var minSwipeDistance = 50;
            
            function isMobile() {
                return $(window).width() <= 300;
            }

            function showSlide(newIndex, direction) {
                if (!isMobile() || isAnimating || newIndex < 0 || newIndex >= $cards.length) return;
                isAnimating = true;

                var $current = $cards.eq(currentIndex);
                var $next = $cards.eq(newIndex);
                
                var initialTransform = direction === 'next' ? 'translateX(50%)' : 'translateX(-150%)';

                $next.removeClass('active').css({
                    transform: initialTransform,
                    opacity: 0,
                    zIndex: 3,
                    transition: 'none'
                });
                
                void $next[0].offsetWidth;
                
                $next.css('transition', 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out');
                
                $current.removeClass('active').css({
                    transform: direction === 'next' ? 'translateX(-300%)' : 'translateX(50%)',
                    opacity: 0,
                    zIndex: 2
                });

                $next.addClass('active').css({
                    transform: 'translateX(-50%)',
                    opacity: 1
                });

                setTimeout(function() {
                    $cards.not($next).css({
                        zIndex: 1,
                        transform: 'translateX(-50%)',
                        opacity: 0
                    });
                    currentIndex = newIndex;
                    isAnimating = false;
                }, 400);
            }

            function initSlider() {
                if (isMobile()) {
                    $cards.removeClass('active').css({
                        opacity: 0,
                        transform: 'translateX(-50%)',
                        position: 'absolute'
                    });
                    $cards.eq(0).addClass('active').css('opacity', 1);
                    currentIndex = 0;
                } else {
                    $cards.css({
                        opacity: 1,
                        transform: 'none',
                        position: 'relative'
                    });
                }
            }
            
            $leftArrow.on('click', function() {
                var newIndex = (currentIndex - 1 + $cards.length) % $cards.length;
                showSlide(newIndex, 'prev');
            });

            $rightArrow.on('click', function() {
                var newIndex = (currentIndex + 1) % $cards.length;
                showSlide(newIndex, 'next');
            });

            $wrapper.on('touchstart', function(e) {
                if (!isMobile() || isAnimating) return;
                touchStartX = e.originalEvent.touches[0].screenX;
            });

            $wrapper.on('touchend', function(e) {
                if (!isMobile() || isAnimating) return;
                touchEndX = e.originalEvent.changedTouches[0].screenX;
                var diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > minSwipeDistance) {
                    if (diff > 0) {
                        var newIndex = (currentIndex + 1) % $cards.length;
                        showSlide(newIndex, 'next');
                    } else {
                        var newIndex = (currentIndex - 1 + $cards.length) % $cards.length;
                        showSlide(newIndex, 'prev');
                    }
                }
            });
            
            $(window).on('resize', function() {
                initSlider();
            });

            initSlider();
        });


/*видеоблок со скроллоm */

        document.addEventListener('DOMContentLoaded', function() {
            const cardsContainer = document.querySelector('.new_croll-cards-container');
            const arrowLeft = document.querySelector('.new_croll-arrow-left');
            const arrowRight = document.querySelector('.new_croll-arrow-right');
            const cards = document.querySelectorAll('.new_croll-card');
            
            let isDragging = false;
            let startX = 0;
            let scrollLeft = 0;
            
            function updateArrows() {
                const container = cardsContainer;
                const scrollLeft = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                // Обновляем стрелки
                arrowLeft.style.opacity = scrollLeft <= 10 ? '0.4' : '1';
                arrowRight.style.opacity = scrollLeft >= maxScroll - 10 ? '0.4' : '1';
            }
            
            function scrollToCard(direction) {
                const container = cardsContainer;
                const cardWidth = cards[0].offsetWidth + 20; // + gap
                const currentScroll = container.scrollLeft;
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                let targetScroll;
                
                if (direction === 'left') {
                    targetScroll = Math.max(0, currentScroll - cardWidth);
                } else {
                    targetScroll = Math.min(maxScroll, currentScroll + cardWidth);
                }
                
                container.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
                
                // Обновляем стрелки после анимации
                setTimeout(updateArrows, 300);
            }
            
            // Обработчики для стрелок
            arrowLeft.addEventListener('click', () => scrollToCard('left'));
            arrowRight.addEventListener('click', () => scrollToCard('right'));
            
            // Свайп для десктопа
            cardsContainer.addEventListener('mousedown', (e) => {
                isDragging = true;
                cardsContainer.classList.add('grabbing');
                startX = e.pageX - cardsContainer.offsetLeft;
                scrollLeft = cardsContainer.scrollLeft;
            });
            
            cardsContainer.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX - cardsContainer.offsetLeft;
                const walk = (x - startX) * 2;
                cardsContainer.scrollLeft = scrollLeft - walk;
            });
            
            function endDrag() {
                isDragging = false;
                cardsContainer.classList.remove('grabbing');
                updateArrows();
            }
            
            cardsContainer.addEventListener('mouseup', endDrag);
            cardsContainer.addEventListener('mouseleave', endDrag);
            
            // Touch события для мобильных
            cardsContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - cardsContainer.offsetLeft;
                scrollLeft = cardsContainer.scrollLeft;
            });
            
            cardsContainer.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const x = e.touches[0].pageX - cardsContainer.offsetLeft;
                const walk = (x - startX) * 2;
                cardsContainer.scrollLeft = scrollLeft - walk;
            });
            
            cardsContainer.addEventListener('touchend', updateArrows);
            
            // Обновление при изменении размера
            window.addEventListener('resize', updateArrows);
            
            // Обновление при скролле
            cardsContainer.addEventListener('scroll', updateArrows);
            
            // Инициализация
            updateArrows();
        });
  

  