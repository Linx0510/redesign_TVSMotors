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
    
            // Обработчики для кнопок воспроизведения (третья секция)
            document.addEventListener('DOMContentLoaded', function() {
                const playButtons = document.querySelectorAll('.video-comments-play-btn');
                playButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Получаем информацию о карточке
                        const card = this.closest('.video-comments-card');
                        const title = card.querySelector('.video-comments-card-title').textContent;
                        const carName = card.querySelector('.video-comments-car-name').textContent;
                        
                        alert(`Запуск видео отзыва:\n${title}\n${carName}`);
                    });
                });
            });
    