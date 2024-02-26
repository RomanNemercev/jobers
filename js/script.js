// none-scalable for nav-bar
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
let inWorkDotsOne = document.querySelectorAll('.dot-inwork-one');
let menuLinks = document.querySelectorAll('.item__burger-btn');

try {
    // код...
    burger.addEventListener('click',
        function () {
            burgerList.classList.toggle('item__burger-list--active');
            inWorkDotsOne.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
} catch (err) {
    // обработка ошибки
    console.log('ошибка обработки первого дроплиста')
}


menuLinks.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerList.classList.remove('item__burger-list--active');
            inWorkDotsOne.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

//list-two
let burgerTwo = document.querySelector('.item-two');
let burgerListTwo = document.querySelector('.list-two');
let inWorkDotsTwo = document.querySelectorAll('.dot-inwork-two');
let menuLinksTwo = document.querySelectorAll('.item__btn-two');

try {
    // код...
    burgerTwo.addEventListener('click',
        function () {
            burgerListTwo.classList.toggle('item__burger-list--active');
            inWorkDotsTwo.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
} catch (err) {
    // обработка ошибки
    console.log('ошибка обработки второго дроплиста')
}

menuLinksTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListTwo.classList.remove('item__burger-list--active');
            inWorkDotsTwo.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

//list-third
let burgerThird = document.querySelector('.item-third');
let burgerListThird = document.querySelector('.list-third');
let inWorkDotsThree = document.querySelectorAll('.dot-inwork-three');
let menuLinksThird = document.querySelectorAll('.item__btn-third');

try {
    // код...
    burgerThird.addEventListener('click',
        function () {
            burgerListThird.classList.toggle('item__burger-list--active');
            inWorkDotsThree.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })

} catch (err) {
    // обработка ошибки
    console.log('ошибка обработки третьего дроплиста')
}

menuLinksThird.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListThird.classList.remove('item__burger-list--active');
            inWorkDotsThree.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

// active block
// active-one
let burgerActiveOne = document.querySelector('.item__active-one');
let burgerActiveListOne = document.querySelector('.item__list__active-one');
let inActiveDotsOne = document.querySelectorAll('.dot-active-one');
let menuActiveLinksOne = document.querySelectorAll('.item__active__btn-one');


try {
    burgerActiveOne.addEventListener('click',
        function () {
            burgerActiveListOne.classList.toggle('item__burger-list--active');
            inActiveDotsOne.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
} catch (err) {
    console.log('ошибка обработки четвертого дроплиста')
}

menuActiveLinksOne.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerActiveListOne.classList.remove('item__burger-list--active');
            inActiveDotsOne.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

// active-two
let burgerActiveTwo = document.querySelector('.item__active-two');
let burgerActiveListTwo = document.querySelector('.item__list__active-two');
let inActiveDotsTwo = document.querySelectorAll('.dot-active-two');
let menuActiveLinksTwo = document.querySelectorAll('.item__active__btn-two');

try {
    burgerActiveTwo.addEventListener('click',
        function () {
            burgerActiveListTwo.classList.toggle('item__burger-list--active');
            inActiveDotsTwo.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
} catch (err) {
    console.log('ошибка обработки пятого дроплиста')
}

menuActiveLinksTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerActiveListTwo.classList.remove('item__burger-list--active');
            inActiveDotsTwo.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

//archive block
//archive-one
let burgerArchiveOne = document.querySelector('.item__archive-one');
let burgerListArchiveOne = document.querySelector('.item__list__archive-one');
let inArchiveDotsOne = document.querySelectorAll('.dot-archive-one');
let menuLinksArchiveOne = document.querySelectorAll('.item__archive__btn-one');

try {
    burgerArchiveOne.addEventListener('click',
        function () {
            burgerListArchiveOne.classList.toggle('item__burger-list--active');
            inArchiveDotsOne.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
} catch (err) {
    console.log('ошибка обработки шестого дроплиста')
}

menuLinksArchiveOne.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveOne.classList.remove('item__burger-list--active');
            inArchiveDotsOne.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

//filter-choice
try {
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
} catch {
    console.log("Не запустился выпадающий список")
}


// popup filter
let inActiveFilter = document.getElementById('filter-inactive');
let ActiveFilter = document.getElementById('filter-active');
let ArchiveFilter = document.getElementById('archive-filter');

let popupFilterActive = document.getElementById('popupFilterActive');
let popupFilterArchive = document.getElementById('popupFilterArchive')

let activeValueFirst = document.getElementById('vacancies-value-first');
let activeValueSecond = document.getElementById('vacancies-value-second');
let activeValueThird = document.getElementById('vacancies-value-third');
let activeValueFourth = document.getElementById('vacancies-value-fourth');
let activeValueFifth = document.getElementById('vacancies-value-fifth');
let arrActiveValues = [activeValueFirst, activeValueSecond, activeValueThird, activeValueFourth, activeValueFifth];


let archiveValueFirst = document.getElementById('vacancies-archive-first');
let arrArchiveValues = [archiveValueFirst];

arrActiveValues.forEach(function (el) {
    el.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
        } else {
            inActiveFilter.checked = false;
            ActiveFilter.checked = false;
        }
    })
})

try {
    inActiveFilter.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
            popupFilterActive.classList.add('vacancies__filter--active');
            activeValueFirst.checked = true;
            activeValueSecond.checked = true;
            activeValueThird.checked = true;
        } else {
            popupFilterActive.classList.remove('vacancies__filter--active');
            activeValueFirst.checked = false;
            activeValueSecond.checked = false;
            activeValueThird.checked = false;
        }
    })
} catch {
    console.log('Не сработал чекбокс на фильтр "Не актвивные вакансии"')
}

try {
    ActiveFilter.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
            popupFilterActive.classList.add('vacancies__filter--active');
            activeValueFourth.checked = true;
            activeValueFifth.checked = true;
        } else {
            popupFilterActive.classList.remove('vacancies__filter--active');
            activeValueFourth.checked = false;
            activeValueFifth.checked = false;
        }
    })
} catch {
    console.log('Не сработал чекбок на "Активные вакансии"')
}

try {
    ArchiveFilter.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
            popupFilterArchive.classList.add('vacancies__filter--active');
            archiveValueFirst.checked = true;
        } else {
            popupFilterArchive.classList.remove('vacancies__filter--active');
            archiveValueFirst.checked = false;
        }
    })
} catch {
    console.log('Не сработал чекбокс на "Архивные вакансии"')
}

//за отсутсвием массива значений(одного элемента), создаю ф-ию без forEach
archiveValueFirst.addEventListener('change', function (event) {
    if (event.currentTarget.checked) {
    } else {
        ArchiveFilter.checked = false;
    }
})

try {
    arrActiveValues.forEach(function (el) {
        el.addEventListener('change', function (checkbox) {
            if (checkbox.currentTarget.checked) {
                popupFilterActive.classList.add('vacancies__filter--active');
            } else {
                popupFilterActive.classList.remove('vacancies__filter--active');
            }
        })
    })
} catch {
    console.log('Не сработал чекбокс на "Список вакансий"')
}


try {
    arrArchiveValues.forEach(function (el) {
        el.addEventListener('change', function (checkbox) {
            if (checkbox.currentTarget.checked) {
                popupFilterArchive.classList.add('vacancies__filter--active');
            } else {
                popupFilterArchive.classList.remove('vacancies__filter--active');
            }
        })
    })
} catch {
    console.log('Не сработал чекбокс на "Список архивных вакансий"')
}


//dropdown-search
let availableKeywords = [
    'Владимир Власов',
    'Андрей Власов',
    'Максим Власов',
    'Юрий Иваной',
    'Константин Хабенский',
    'Иван Грозный',
];

const resultsBox = document.querySelector('.search-bar__dropdown');
const inputBox = document.getElementById('input-box');

try {
    inputBox.onkeyup = function () {
        let result = [];
        let input = inputBox.value;
        if (input.length) {
            result = availableKeywords.filter((keyword) => {
                return keyword.toLowerCase().includes(input.toLowerCase());
            });
            console.log(result);
        }
        display(result);

        if (!result.length) {
            resultsBox.innerHTML = '';
        }
    }
} catch (err) {
    console.log('Не загрузился выпадающий поиск')
}

function display(result) {
    const content = result.map((list) => {
        return '<li onclick=selectInput(this)>' + list + '</li>';
    });

    resultsBox.innerHTML = '<ul>' + content.join('') + '</ul>';
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}

//     modal for btn-del in dropdown
let btnDelDrop = document.querySelectorAll('.choose-del');

btnDelDrop.forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById('choose-del-modal').classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })
})

document.getElementById('modal-close-window').addEventListener('click', function () {
    document.getElementById('choose-del-modal').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

document.getElementById('choose-del-btn').addEventListener('click', function () {
    document.getElementById('choose-del-modal').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

document.getElementById('modal-yes-window').addEventListener('click', function () {
    document.getElementById('choose-del-modal').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        document.getElementById("choose-del-modal").classList.remove("vacancies__item-popup--open");
        document.body.classList.remove('stop-scroll');
    }
});

document.querySelector("#choose-del-modal .vacancies__item-popup__wrapper").addEventListener('click', event => {
    event._isClickWithInModal = true;
});
document.getElementById("choose-del-modal").addEventListener('click', event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
});


// select with search
try {
    const searchSelect = () => {
        const elements = document.querySelectorAll('.new__select-wrapper');
        elements.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: true,
                itemSelectText: '',
                shouldSort: false,
            })
        });
    };

    searchSelect();
} catch {
    console.log("Не запустился выпадающий список")
}

let genderChoose = new Choices(
    document.getElementById('gender'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
    }
);

let ageChoose = new Choices(
    document.getElementById('age'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
    }
);

let wageChoose = new Choices(
    document.getElementById('wage'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
    }
);

let skillChoose = new Choices(
    document.getElementById('skill'),
    {
        itemSelectText: '',
        allowHTML: true,
        searchEnabled: false,
        shouldSort: false,
    }
);

let nationChoose = new Choices(
    document.getElementById('nation'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        position: 'bottom',
    }
);

let contactsChoose = new Choices(
    document.getElementById('contacts'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
    }
);
