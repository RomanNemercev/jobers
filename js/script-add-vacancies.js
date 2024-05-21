const multiAccordion = () => {
    const elements = document.querySelectorAll('.accordion-list');
    elements.forEach(el => {
        const acc = new Accordion(el, {
            elementClass: 'accordion',
            triggerClass: 'accordion__control',
            panelClass: 'accordion__content',
            activeClass: 'accordion--active'
        })
    });
};

multiAccordion();

//map
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.751590873860096, 37.61924179541014],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12,
    });

    // var myPlacemark = new ymaps.Placemark([55.751590873860096,37.61924179541014], {}, {
    //     iconLayout: 'default#image',
    //     iconImageHref: 'img/map_label.svg',
    //     iconImageSize: [20, 20],
    // });

    // myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контроль правил
    myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}

//custom btn
// I already selected these elements and signed them as variables so we can save up some time.
// You can pause and do the same...
const img_container = document.querySelector('.add__preview');
const img = document.querySelector('.add__background');
const input = document.querySelector('.add__input');
// const file_name = document.querySelector('.file_name');

input.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        img_container.style.display = 'block';

        const reader = new FileReader()
        reader.onload = function () {
            const result = reader.result;
            img.src = result;

            file_name.innerText = file.name;
        }
        reader.readAsDataURL(file);
    }
})

// обновленный блок тарифов
// Общая функция для обработки кликов
function handleRateClick(selectedElement, allElements) {
    selectedElement.classList.add('rates__selected');
    allElements.forEach(el => {
        if (el !== selectedElement) {
            el.classList.remove('rates__selected');
        }
    });
}

// Функция для установки обработчиков событий
function setupRateClickHandlers(mainSelector, allSelectors) {
    // Получаем основной элемент, к которому привязываем обработчик события
    const mainElement = document.querySelector(mainSelector);

    // Получаем все элементы, которые должны терять класс 'rates__selected'
    const allElements = allSelectors.map(selector => document.querySelector(selector).parentNode);

    // Устанавливаем обработчик события на основной элемент
    mainElement.addEventListener('click', () => handleRateClick(mainElement.parentNode, allElements));
}

// Установка обработчиков для первой страницы тарифов
setupRateClickHandlers('label[for="rate-min"]', [
    'label[for="rate-middle"]',
    'label[for="rate-max"]',
    'label[for="standart-min"]',
    'label[for="standart-middle"]',
    'label[for="standart-max"]'
]);

setupRateClickHandlers('label[for="rate-middle"]', [
    'label[for="rate-min"]',
    'label[for="rate-max"]',
    'label[for="standart-min"]',
    'label[for="standart-middle"]',
    'label[for="standart-max"]'
]);

setupRateClickHandlers('label[for="rate-max"]', [
    'label[for="rate-min"]',
    'label[for="rate-middle"]',
    'label[for="standart-min"]',
    'label[for="standart-middle"]',
    'label[for="standart-max"]'
]);

// Установка обработчиков для второй страницы тарифов
setupRateClickHandlers('label[for="standart-min"]', [
    'label[for="standart-middle"]',
    'label[for="standart-max"]',
    'label[for="rate-min"]',
    'label[for="rate-middle"]',
    'label[for="rate-max"]'
]);

setupRateClickHandlers('label[for="standart-middle"]', [
    'label[for="standart-min"]',
    'label[for="standart-max"]',
    'label[for="rate-min"]',
    'label[for="rate-middle"]',
    'label[for="rate-max"]'
]);

setupRateClickHandlers('label[for="standart-max"]', [
    'label[for="standart-min"]',
    'label[for="standart-middle"]',
    'label[for="rate-min"]',
    'label[for="rate-middle"]',
    'label[for="rate-max"]'
]);

// Обработчик для инвойса
document.querySelector('label[for="choose-invoice"]').addEventListener('click', () => {
    document.getElementById('invoice-first').classList.add('rates__selected');
});

// Обработчики для кнопок
document.querySelectorAll('.add__sites-value').forEach(element => {
    element.addEventListener('click', e => {
        const path = e.currentTarget.dataset.path;

        document.querySelectorAll('.add__sites-value').forEach(btn => btn.classList.remove('add__sites-value--active'));
        e.currentTarget.classList.add('add__sites-value--active');

        document.querySelectorAll('.add__sites-content').forEach(element => element.classList.remove('rates--active'));
        document.querySelector(`[data-target="${path}"]`).classList.add('rates--active');
    });
});



//search-drop some sets
let btnSearchDrop = document.getElementById('open_pop_up');
let searchDropNo = document.getElementById('search-btn-no');
let popupSearch = document.getElementById('pop_up');
let searchPopupClose = document.getElementById('pop_up_close');

btnSearchDrop.addEventListener('click', function () {
    document.body.classList.add('stop-scroll');
})

searchDropNo.addEventListener('click', function () {
    popupSearch.classList.remove('active');
    document.body.classList.remove('stop-scroll');
})

searchPopupClose.addEventListener('click', function () {
    document.body.classList.remove('stop-scroll');
})

document.querySelector("#pop_up .pop-up__body").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("pop_up").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('active');
    document.body.classList.remove('stop-scroll');
});

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById('pop_up').classList.remove('active');
    }
});

//search-city module
//search city place
let suggestions = [
    "Санкт-Петербург",
    "Невский проспект, Санкт-Петербург",
    "Дворцовая площадь, Санкт-Петербург",
    "Колпинский район, Санкт-Петербург",
    // тут может быть любой список городов
];

let inputSearch = document.getElementById("search");
let suggestionsPane = document.getElementById("suggestions-pane");

inputSearch.addEventListener("keyup", function (event) {
    let value = event.target.value;
    suggestionsPane.innerHTML = '';
    if (value) {
        suggestionsPane.style.display = 'block';
        let filteredSuggestions = suggestions.filter(function (suggestion) {
            // проверка на строки, содержащие введенные данные
            return suggestion.toLowerCase().includes(value.toLowerCase());
        });
        filteredSuggestions.forEach(function (filteredSuggestion) {
            let div = document.createElement("div");
            div.textContent = filteredSuggestion;
            div.className = 'suggestion';
            div.addEventListener("click", function () {
                inputSearch.value = div.textContent;
                suggestionsPane.style.display = 'none';
            });
            suggestionsPane.appendChild(div);
        });
    } else {
        suggestionsPane.style.display = 'none';
    }
});

//reused search script launch
let metroStations = [
    "Адмиралтейская",
    "Академическая",
    "Балтийская",
    "Беговая",
    "Бухаресткая"
    // список станций метро
];

createAutocomplete("search-metro", "suggestions-pane-metro", metroStations);

// add new number script and validate
document.addEventListener('DOMContentLoaded', () => {
    const addMoreNumberBtn = document.getElementById('add-more-number-btn');
    const callContainer = document.querySelector('.add__call-container');
    const phoneNumberInputs = document.querySelectorAll('.add__call__data');

    const formatPhoneNumber = (input) => {
        input.addEventListener('focus', () => {
            if (!input.value) {
                input.value = '+7 (';
            }
            input.placeholder = '+7 (___) ___-__-__';
            input.classList.add('focused');

            // Установить позицию курсора после "+7 ("
            setTimeout(() => {
                input.setSelectionRange(4, 4);
            }, 0);
        });

        input.addEventListener('blur', () => {
            if (input.value === '+7 (') {
                input.value = '';
                input.placeholder = '+7';
            }
            input.classList.remove('focused');
        });

        input.addEventListener('input', (event) => {
            let input = event.target.value.replace(/\D/g, '');
            let formattedInput = '+7 (';

            if (input.length > 1) {
                formattedInput += input.substring(1, 4);
            }
            if (input.length >= 5) {
                formattedInput += ') ' + input.substring(4, 7);
            }
            if (input.length >= 8) {
                formattedInput += '-' + input.substring(7, 9);
            }
            if (input.length >= 10) {
                formattedInput += '-' + input.substring(9, 11);
            }

            event.target.value = formattedInput;

            // Установить позицию курсора после последнего введенного символа
            const cursorPosition = formattedInput.length;
            setTimeout(() => {
                event.target.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        });
    };

    const handleInputValidation = () => {
        const inputs = document.querySelectorAll('.new__add-name__input[required]');
        inputs.forEach((input) => {
            const parent = input.closest('.new__add-name');
            input.addEventListener('blur', function () {
                if (!this.value.trim()) {
                    parent.classList.add('error--visible');
                } else {
                    parent.classList.remove('error--visible');
                }
            });
        });
    };

    phoneNumberInputs.forEach(formatPhoneNumber);
    handleInputValidation();

    addMoreNumberBtn.addEventListener('click', function () {
        const additionalPhoneContainer = document.querySelector('.additional-phone-container');
        if (!additionalPhoneContainer) {
            const additionalPhoneInput = document.createElement('div');
            additionalPhoneInput.classList.add('additional-phone-container');

            additionalPhoneInput.innerHTML = `
                <label class="add__label new__add-name">
                    <input type="tel" class="add__call__data new__add-name__input add__call__data" placeholder="+7" required>
                    <span class="error">Это поле обязательно для заполнения</span>
                </label>
            `;

            callContainer.insertBefore(additionalPhoneInput, addMoreNumberBtn);
            const newInput = additionalPhoneInput.querySelector('.add__call__data');
            formatPhoneNumber(newInput);
            handleInputValidation();  // Apply validation to new input
            this.textContent = 'Удалить дополнительный номер';
        } else {
            callContainer.removeChild(additionalPhoneContainer);
            this.textContent = 'Указать еще один номер';
        }
    });
});