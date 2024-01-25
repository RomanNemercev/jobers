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