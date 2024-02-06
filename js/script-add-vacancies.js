const multiSelect = () => {
    const elements = document.querySelectorAll('.add__select-wrapper');
    elements.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
        })
    });
};

multiSelect();

//accordion-add-vacancies
new Accordion('.accordion-list', {
    elementClass: 'accordion',
    triggerClass: 'accordion__control',
    panelClass: 'accordion__content',
    activeClass: 'accordion--active'
});

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

//border-for-checkbox
// document.addEventListener('DOMContentLoaded', () => {
//
//     let checkbox = document.querySelector('label[for="standart-middle"]');
//
//     checkbox.addEventListener('click', function()
//     {
//         let parent = this.parentNode;
//
//         ( !parent.classList.contains('selected') ) ?
//             parent.classList.add('selected'):
//             parent.classList.remove('selected');
//     });
//
// });

let ratesBtn = document.querySelectorAll('.add__sites-value');
let ratesItem = document.querySelectorAll('.add__sites-content');

ratesBtn.forEach(function (element) {
    element.addEventListener('click', function (e) {
        const path = e.currentTarget.dataset.path;

        ratesBtn.forEach(function (btn) {
            btn.classList.remove('add__sites-value--active')
        });
        e.currentTarget.classList.add('add__sites-value--active')

        ratesItem.forEach(function (element) {
            element.classList.remove('rates--active')
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('rates--active');
    })
});
