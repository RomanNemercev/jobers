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

// first step border rates
let arrExceptMin = [document.querySelector('label[for="rate-middle"]'), document.querySelector('label[for="rate-max"]')];
let arrExceptMinParents = [document.getElementById('parent-middle'), document.getElementById('parent-max')];
let minRate = document.querySelector('label[for="rate-min"]');
let minRateParent = minRate.parentNode;
minRate.addEventListener('click', function () {
    minRateParent.classList.add('rates__selected');
    arrExceptMinParents.forEach(function (el) {
        el.classList.remove('rates__selected')
    })
})

arrExceptMin.forEach(function (el) {
    el.addEventListener('click', function () {
        minRateParent.classList.remove('rates__selected')
    })
})

// second step border rates
let middleRateParent = document.getElementById('parent-middle');
let arrExceptMiddleParents = [document.getElementById('parent-min'), document.getElementById('parent-max')];
document.querySelector('label[for="rate-middle"]').addEventListener('click', function (el) {
    middleRateParent.classList.add('rates__selected')
    arrExceptMiddleParents.forEach(function (el) {
        el.classList.remove('rates__selected')
    })
})

// third step border rates
let maxRateParent = document.getElementById('parent-max');
let arrExceptMaxParent = [document.getElementById('parent-min'), document.getElementById('parent-middle')];
document.querySelector('label[for="rate-max"]').addEventListener('click', function () {
    maxRateParent.classList.add('rates__selected')
    arrExceptMaxParent.forEach(function (el) {
        el.classList.remove('rates__selected')
    })
})

// rates two page
let standartRateMinParent = document.getElementById('standart-parent-min');
let arrExceptStandartMinParents = [document.getElementById('standart-parent-middle'), document.getElementById('standart-parent-max')];
document.querySelector('label[for="standart-min"]').addEventListener('click', function () {
    standartRateMinParent.classList.add('rates__selected')
    arrExceptStandartMinParents.forEach(function (el) {
        el.classList.remove('rates__selected')
    })
})

// rates two page second item
let standartRateMiddleParent = document.getElementById('standart-parent-middle');
let arrExceptStandartMiddleParents = [document.getElementById('standart-parent-min'), document.getElementById('standart-parent-max')];
document.querySelector('label[for="standart-middle"]').addEventListener('click', function () {
    standartRateMiddleParent.classList.add('rates__selected')
    arrExceptStandartMiddleParents.forEach(function (el) {
        el.classList.remove('rates__selected')
    })
})

// rates two page third item
let standartRateMaxParent = document.getElementById('standart-parent-max');
let arrExceptStandartMaxParents = [document.getElementById('standart-parent-min'), document.getElementById('standart-parent-middle')];
document.querySelector('label[for="standart-max"]').addEventListener('click', function () {
    standartRateMaxParent.classList.add('rates__selected')
    arrExceptStandartMaxParents.forEach(function (el) {
        el.classList.remove('rates__selected')
    })
})

// rates-invoice first-item
let invoiceFirst = document.getElementById('invoice-first');
document.querySelector('label[for="choose-invoice"]').addEventListener('click', function () {
    invoiceFirst.classList.add('rates__selected')
})

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