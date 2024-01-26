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