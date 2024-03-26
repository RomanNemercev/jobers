// script for scroll-x
let btnRight = document.getElementById('btn-right');
btnRight.onclick = function () {
    let container = document.getElementById('scroll-wrapper');
    sideScroll(container, 'right', 25, 100, 10);
};

function sideScroll(element, direction, speed, distance, step) {
    scrollAmount = 0;
    let slideTimer = setInterval(function () {
        if (direction == 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            window.clearInterval(slideTimer);
        }
    }, speed);
}
