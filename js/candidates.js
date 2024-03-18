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

//всплывающее окно фильтров выбранных кандидатов
try {
    const multiSelect = () => {
        const elements = document.querySelectorAll('.cans__select-wrapper');
        elements.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                itemSelectText: '',
                shouldSort: false,
            })
        });
    };

    multiSelect();
} catch {
    console.log("Не запустился выпадающий список")
}

let checkAllCans = document.getElementById("filter-choose-all");
let arrAllCans = [document.getElementById("cans-first"), document.getElementById("cans-second"), document.getElementById("cans-third"), document.getElementById("cans-fourth")];

try {
    checkAllCans.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
            document.getElementById("popupFilterCans").classList.add('cans__filter--active');
            arrAllCans.forEach(function (el) {
                el.checked = true;
            })
        } else {
            document.getElementById('popupFilterCans').classList.remove('cans__filter--active');
            arrAllCans.forEach(function (el) {
                el.checked = false;
            })
        }
    })
} catch {
    console.log("Не сработал выбор всех кандидатов")
}

try {
    arrAllCans.forEach(function (el) {
        el.addEventListener('change', function (checkbox) {
            if (checkbox.currentTarget.checked) {
                document.getElementById('popupFilterCans').classList.add('cans__filter--active');
            } else {
                document.getElementById('popupFilterCans').classList.remove('cans__filter--active');
            }
        })
    })
} catch {
    console.log('Не сработал чекбокс на "Список вакансий"')
}
