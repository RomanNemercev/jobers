// none-scalable for nav-bar
function forcedOriginalScale(noneScalable) {

    var App = document.getElementById("noneScalable"); //получаем div по его id
    App.style.zoom = 1 / devicePixelRatio; //устанавливаем масштаб в зависимости от pixel-ratio

}

document.addEventListener( //когда DOM загрузился

    "DOMContentLoaded",

    function () {
        forcedOriginalScale('noneScalable'); //выполняем функцию, передаём в неё id нашего контейнера
    }
);

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
let itemTop = document.querySelector('.item__top');
let menuLinks = document.querySelectorAll('.item__burger-btn');

burger.addEventListener('click',
    function () {
        burgerList.classList.toggle('item__burger-list--active');
        itemTop.classList.toggle('item__top--active');
    })

menuLinks.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerList.classList.remove('item__burger-list--active');
            itemTop.classList.remove('item__top--active');
        })
})

//list-two
let burgerTwo = document.querySelector('.item-two');
let burgerListTwo = document.querySelector('.list-two');
let itemTopTwo = document.querySelector('.top-two');
let menuLinksTwo = document.querySelectorAll('.item__btn-two');

burgerTwo.addEventListener('click',
    function () {
        burgerListTwo.classList.toggle('item__burger-list--active');
        itemTopTwo.classList.toggle('item__top--active');
    })

menuLinksTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListTwo.classList.remove('item__burger-list--active');
            itemTopTwo.classList.remove('item__top--active');
        })
})

//list-third
let burgerThird = document.querySelector('.item-third');
let burgerListThird = document.querySelector('.list-third');
let itemTopThird = document.querySelector('.top-third');
let menuLinksThird = document.querySelectorAll('.item__btn-third');

burgerThird.addEventListener('click',
    function () {
        burgerListThird.classList.toggle('item__burger-list--active');
        itemTopThird.classList.toggle('item__top--active');
    })

menuLinksThird.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListThird.classList.remove('item__burger-list--active');
            itemTopThird.classList.remove('item__top--active');
        })
})

//archive block
//archive-one
let burgerArchiveOne = document.querySelector('.item__archive-one');
let burgerListArchiveOne = document.querySelector('.list__archive-one');
let itemTopArchiveOne = document.querySelector('.archive__top-one');
let menuLinksArchiveOne = document.querySelectorAll('.archive__btn-one');

burgerArchiveOne.addEventListener('click',
    function () {
        burgerListArchiveOne.classList.toggle('item__burger-list--active');
        itemTopArchiveOne.classList.toggle('item__top--active');
    })

menuLinksArchiveOne.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveOne.classList.remove('item__burger-list--active');
            itemTopArchiveOne.classList.remove('item__top--active');
        })
})

//archive-two
let burgerArchiveTwo = document.querySelector('.item__archive-two');
let burgerListArchiveTwo = document.querySelector('.list__archive-two');
let itemTopArchiveTwo = document.querySelector('.archive__top-two');
let menuLinksArchiveTwo = document.querySelectorAll('.archive__btn-two');

burgerArchiveTwo.addEventListener('click',
    function () {
        burgerListArchiveTwo.classList.toggle('item__burger-list--active');
        itemTopArchiveTwo.classList.toggle('item__top--active');
    })

menuLinksArchiveTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveTwo.classList.remove('item__burger-list--active');
            itemTopArchiveTwo.classList.remove('item__top--active');
        })
})