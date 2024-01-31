// // none-scalable for nav-bar
// function forcedOriginalScale(noneScalable) {
//
//     var App = document.getElementById("noneScalable"); //получаем div по его id
//     App.style.zoom = 1 / devicePixelRatio; //устанавливаем масштаб в зависимости от pixel-ratio
//
// }
//
// document.addEventListener( //когда DOM загрузился
//
//     "DOMContentLoaded",
//
//     function () {
//         forcedOriginalScale('noneScalable'); //выполняем функцию, передаём в неё id нашего контейнера
//     }
// );

//tabs
let tabsBtn = document.querySelectorAll('.vacancies__value');
let tabsItem = document.querySelectorAll('.vacancies__content');

tabsBtn.forEach(function (element) {
    element.addEventListener('click', function (e) {
        const path = e.currentTarget.dataset.path;

        tabsBtn.forEach(function (btn) {
            btn.classList.remove('vacancies__value--active')
        });
        e.currentTarget.classList.add('vacancies__value--active')

        tabsItem.forEach(function (element) {
            element.classList.remove('vacancies__content--active')
        });
        document.querySelector(`[data-target="${path}"]`).classList.add('vacancies__content--active');
    })
});

//drop-down in vacancies-item
// list-one
let burger = document.querySelector('.item__burger');
let burgerList = document.querySelector('.item__burger-list');
let menuLinks = document.querySelectorAll('.item__burger-btn');

burger.addEventListener('click',
    function () {
        burgerList.classList.toggle('item__burger-list--active');
    })

menuLinks.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerList.classList.remove('item__burger-list--active');
        })
})

//list-two
let burgerTwo = document.querySelector('.item-two');
let burgerListTwo = document.querySelector('.list-two');
let menuLinksTwo = document.querySelectorAll('.item__btn-two');

burgerTwo.addEventListener('click',
    function () {
        burgerListTwo.classList.toggle('item__burger-list--active');
    })

menuLinksTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListTwo.classList.remove('item__burger-list--active');
        })
})

//list-third
let burgerThird = document.querySelector('.item-third');
let burgerListThird = document.querySelector('.list-third');
let menuLinksThird = document.querySelectorAll('.item__btn-third');

burgerThird.addEventListener('click',
    function () {
        burgerListThird.classList.toggle('item__burger-list--active');
    })

menuLinksThird.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListThird.classList.remove('item__burger-list--active');
        })
})

//archive block
//archive-one
let burgerArchiveOne = document.querySelector('.item__archive-one');
let burgerListArchiveOne = document.querySelector('.item__list__archive-one');
let menuLinksArchiveOne = document.querySelectorAll('.item__archive__btn-one');

burgerArchiveOne.addEventListener('click',
    function () {
        burgerListArchiveOne.classList.toggle('item__burger-list--active');
    })

menuLinksArchiveOne.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveOne.classList.remove('item__burger-list--active');
        })
})

//archive-two
let burgerArchiveTwo = document.querySelector('.item__archive-two');
let burgerListArchiveTwo = document.querySelector('.item__list__archive-two');
let menuLinksArchiveTwo = document.querySelectorAll('.item__archive__btn-two');

burgerArchiveTwo.addEventListener('click',
    function () {
        burgerListArchiveTwo.classList.toggle('item__burger-list--active');
    })

menuLinksArchiveTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveTwo.classList.remove('item__burger-list--active');
        })
})

//filter-choice
const multiSelect = () => {
    const elements = document.querySelectorAll('.vacancies__select-wrapper');
    elements.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
        })
    });
};

multiSelect();

let vacanciesFilterActive = document.getElementById("filterActive");
let vacanciesFilterArchive = document.getElementById("filterArchive");
let vacanciesInput = document.querySelectorAll('.vacancies__input');
let itemNameInput = document.querySelectorAll('.item__name-input');
let filterResetBtn = document.querySelectorAll('.vacancies__filter-reset');

vacanciesInput.forEach(function (el) {
    el.addEventListener('click',
        function () {
            vacanciesFilterActive.classList.toggle('vacancies__filter--active');
        })
})

vacanciesInput.forEach(function (el) {
    el.addEventListener('click',
        function () {
            vacanciesFilterArchive.classList.toggle('vacancies__filter--active');
        })
})

itemNameInput.forEach(function (el) {
    el.addEventListener('click',
        function () {
            vacanciesFilterActive.classList.toggle('vacancies__filter--active');
        })
})

itemNameInput.forEach(function (el) {
    el.addEventListener('click',
        function () {
            vacanciesFilterArchive.classList.toggle('vacancies__filter--active');
        })
})

filterResetBtn.forEach(function (el) {
    el.addEventListener('click',
        function () {
        vacanciesFilterActive.classList.remove('vacancies__filter--active');
        vacanciesFilterArchive.classList.remove('vacancies__filter--active');
        })
})