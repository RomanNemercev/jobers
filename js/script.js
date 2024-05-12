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

try {
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
} catch (error) {
    console.log("Не удалось вызвать табы.")
}

//drop-down in vacancies-item
// list-one
let burger = document.querySelector('.item__burger');
let burgerList = document.querySelector('.item__burger-list');
let inWorkDotsOne = document.querySelectorAll('.dot-inwork-one');
let menuLinks = document.querySelectorAll('.item__burger-btn');
let burgerNav = document.getElementById('nav-active-768');
let btnClose = document.getElementById('btn-droplist-close768');

try {
    // код...
    burger.addEventListener('click',
        function () {
            burgerList.classList.toggle('item__burger-list--active');
            burgerNav.classList.toggle('item__burger-nav--active');
            document.querySelector('.vacancies__droplist-back').classList.add('vacancies__droplist-back--active');
            document.body.classList.toggle('scroll-toggle');
            inWorkDotsOne.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })

    btnClose.addEventListener('click', function () {
        burgerList.classList.remove('item__burger-list--active');
        burgerNav.classList.remove('item__burger-nav--active');
        inWorkDotsOne.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
        document.body.classList.toggle('scroll-toggle');
        dropListBack.classList.remove('vacancies__droplist-back--active');
    })
} catch (err) {
    // обработка ошибки
    console.log('ошибка обработки первого дроплиста')
}


menuLinks.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerList.classList.remove('item__burger-list--active');
            burgerNav.classList.remove('item__burger-nav--active');
            document.body.classList.remove('scroll-toggle');
            dropListBack.classList.remove('vacancies__droplist-back--active');
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
let burgerNavSecond = document.querySelector('.item__nav-two');
let btnCloseSecond = document.getElementById('btn-droplist-close768-second');

try {
    // код...
    burgerTwo.addEventListener('click',
        function () {
            burgerListTwo.classList.toggle('item__burger-list--active');
            burgerNavSecond.classList.toggle('item__burger-nav--active');
            dropListBack.classList.add('vacancies__droplist-back--active');
            document.body.classList.toggle('scroll-toggle');
            inWorkDotsTwo.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })

    btnCloseSecond.addEventListener('click', function () {
        burgerListTwo.classList.remove('item__burger-list--active');
        burgerNavSecond.classList.remove('item__burger-nav--active');
        inWorkDotsTwo.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
        document.body.classList.toggle('scroll-toggle');
        dropListBack.classList.remove('vacancies__droplist-back--active');
    })
} catch (err) {
    // обработка ошибки
    console.log('ошибка обработки второго дроплиста')
}

menuLinksTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListTwo.classList.remove('item__burger-list--active');
            burgerNavSecond.classList.remove('item__burger-nav--active');
            document.body.classList.remove('scroll-toggle');
            dropListBack.classList.remove('vacancies__droplist-back--active');
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
let burgerNavThird = document.querySelector('.item__nav-third');
let btnCloseThird = document.getElementById('btn-droplist-close768-third');

try {
    // код...
    burgerThird.addEventListener('click',
        function () {
            burgerListThird.classList.toggle('item__burger-list--active');
            burgerNavThird.classList.toggle('item__burger-nav--active');
            dropListBack.classList.add('vacancies__droplist-back--active');
            document.body.classList.toggle('scroll-toggle');
            inWorkDotsThree.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
    btnCloseThird.addEventListener('click', function () {
        burgerListThird.classList.remove('item__burger-list--active');
        burgerNavThird.classList.remove('item__burger-nav--active');
        inWorkDotsThree.forEach(function (el) {
            el.classList.toggle('item__burger-dot--active')
        })
        document.body.classList.toggle('scroll-toggle');
        dropListBack.classList.remove('vacancies__droplist-back--active');
    })
} catch (err) {
    // обработка ошибки
    console.log('ошибка обработки третьего дроплиста')
}

menuLinksThird.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListThird.classList.remove('item__burger-list--active');
            burgerNavThird.classList.remove('item__burger-nav--active');
            document.body.classList.remove('scroll-toggle');
            dropListBack.classList.remove('vacancies__droplist-back--active');
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
let burgerActiveFirst = document.querySelector('.item__nav__active-one');
let activeCloseFirst = document.getElementById('active-droplist-close768-first');

try {
    burgerActiveOne.addEventListener('click',
        function () {
            burgerActiveListOne.classList.toggle('item__burger-list--active');
            burgerActiveFirst.classList.toggle('item__burger-nav--active');
            dropListBack.classList.add('vacancies__droplist-back--active');
            document.body.classList.toggle('scroll-toggle');
            inActiveDotsOne.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
    activeCloseFirst.addEventListener('click', function () {
        burgerActiveListOne.classList.remove('item__burger-list--active');
        burgerActiveFirst.classList.remove('item__burger-nav--active');
        inActiveDotsOne.forEach(function (el) {
            el.classList.toggle('item__burger-dot--active')
        })
        document.body.classList.toggle('scroll-toggle');
        dropListBack.classList.remove('vacancies__droplist-back--active');
    })
} catch (err) {
    console.log('ошибка обработки четвертого дроплиста')
}

menuActiveLinksOne.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerActiveListOne.classList.remove('item__burger-list--active');
            burgerActiveFirst.classList.remove('item__burger-nav--active');
            document.body.classList.remove('scroll-toggle');
            dropListBack.classList.remove('vacancies__droplist-back--active');
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
let burgerActiveSecond = document.getElementById('vacancies-active-two')
let activeCloseSecond = document.getElementById('active-droplist-close768-second');

try {
    burgerActiveTwo.addEventListener('click',
        function () {
            burgerActiveListTwo.classList.toggle('item__burger-list--active');
            burgerActiveSecond.classList.toggle('item__burger-nav--active');
            dropListBack.classList.add('vacancies__droplist-back--active');
            document.body.classList.toggle('scroll-toggle');
            inActiveDotsTwo.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
    activeCloseSecond.addEventListener('click', function () {
        burgerActiveListTwo.classList.remove('item__burger-list--active');
        burgerActiveSecond.classList.remove('item__burger-nav--active');
        inActiveDotsTwo.forEach(function (el) {
            el.classList.toggle('item__burger-dot--active')
        })
        document.body.classList.toggle('scroll-toggle');
        dropListBack.classList.remove('vacancies__droplist-back--active');
    })
} catch (err) {
    console.log('ошибка обработки пятого дроплиста')
}

menuActiveLinksTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerActiveListTwo.classList.remove('item__burger-list--active');
            burgerActiveSecond.classList.remove('item__burger-nav--active');
            document.body.classList.remove('scroll-toggle');
            dropListBack.classList.remove('vacancies__droplist-back--active');
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
let burgerArchiveFirst = document.getElementById('vacancies-archive-one')
let archiveCloseFirst = document.getElementById('archive-droplist-close768-first');

try {
    burgerArchiveOne.addEventListener('click',
        function () {
            burgerListArchiveOne.classList.toggle('item__burger-list--active');
            burgerArchiveFirst.classList.toggle('item__burger-nav--active');
            dropListArchiveBack.classList.add('vacancies__archive-back--active');
            document.body.classList.toggle('scroll-toggle');
            inArchiveDotsOne.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
    archiveCloseFirst.addEventListener('click', function () {
        burgerListArchiveOne.classList.remove('item__burger-list--active');
        burgerArchiveFirst.classList.remove('item__burger-nav--active');
        inArchiveDotsOne.forEach(function (el) {
            el.classList.toggle('item__burger-dot--active')
        })
        document.body.classList.toggle('scroll-toggle');
        dropListArchiveBack.classList.remove('vacancies__archive-back--active');
    })
} catch (err) {
    console.log('ошибка обработки шестого дроплиста')
}

menuLinksArchiveOne.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveOne.classList.remove('item__burger-list--active');
            burgerArchiveFirst.classList.remove('item__burger-nav--active');
            document.body.classList.remove('scroll-toggle');
            dropListArchiveBack.classList.remove('vacancies__archive-back--active');
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

let filterActiveUnActive = document.getElementById('hide-elements');
let filterArchiveUnActive = document.getElementById('hide-filter-archive');

try {
    filterActiveUnActive.addEventListener('click', function () {
        arrActiveValues.forEach(function (el) {
            el.checked = false;
            inActiveFilter.checked = false;
            ActiveFilter.checked = false;
            popupFilterActive.classList.remove('vacancies__filter--active');
        })
    })
} catch {
    console.log("Не найден чекбок для снятия активных фильтров попапа(тот что снизу появляется)")
}

try {
    filterArchiveUnActive.addEventListener('click', function () {
        arrArchiveValues.forEach(function (el) {
            el.checked = false;
            ArchiveFilter.checked = false;
            popupFilterArchive.classList.remove('vacancies__filter--active');
        })
    })
} catch {
    console.log("Не найден чекбок для снятия архивных фильтров попапа(тот что снизу появляется)")
}


try {
    arrActiveValues.forEach(function (el) {
        el.addEventListener('change', function (event) {
            if (event.currentTarget.checked) {
            } else {
                inActiveFilter.checked = false;
                ActiveFilter.checked = false;
                morePopupSpace.classList.remove('vacancies__popup-768--active');
            }
        })
    })
} catch {
    console.log("Страница Вакансии. Не отработан блок вывода значений активных вакансий.")
}


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
            morePopupSpace.classList.remove('vacancies__popup-768--active');
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
            morePopupSpace.classList.remove('vacancies__popup-768--active');
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

try {
    archiveValueFirst.addEventListener('change', function (event) {
        if (event.currentTarget.checked) {
        } else {
            ArchiveFilter.checked = false;
        }
    })
} catch {
    console.log("Страница Вакансии. Не отработан блок вывода значений списка архивных вакансий.")
}

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
function handleInput(inputBox, availableKeywords, resultsBox) {
    return function () {
        let result = [];
        let input = inputBox.value;
        if (input.length) {
            result = availableKeywords.filter((keyword) => {
                return keyword.toLowerCase().includes(input.toLowerCase());
            });
        }
        displayResults(result, resultsBox);
        if (!result.length) {
            resultsBox.innerHTML = '';
        }
    };
}

// Отображение результатов
function displayResults(result, resultsBox) {
    const content = result.map((list) => {
        return '<li onclick=selectInput(this)>' + list + '</li>';
    });
    resultsBox.innerHTML = '<ul>' + content.join('') + '</ul>';
}

// Выбор варианта из выпадающего списка
function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultsBox.innerHTML = '';
}

// Основная логика
document.addEventListener('DOMContentLoaded', function () {
    const availableKeywords = [
        'Владимир Власов',
        'Андрей Власов',
        'Максим Власов',
        'Юрий Иванов',
        'Константин Хабенский',
        'Иван Грозный',
    ];
    const inputBox = document.getElementById('input-box');
    const resultsBox = document.querySelector('.search-bar__dropdown');

    // Функция для отображения последних элементов массива
    function displayLastKeywords(count) {
        const lastKeywords = availableKeywords.slice(-count);
        displayResults(lastKeywords, resultsBox);
    }

    // Обработчик события клика на поле ввода
    inputBox.addEventListener('click', function () {
        if (inputBox.value === '') {
            displayLastKeywords(3); // Отображаем последние три элемента массива
        }
    });

    // Обработчик события клика на документе
    document.addEventListener('click', function (event) {
        // Проверяем, был ли клик выполнен вне поля ввода поиска
        if (!inputBox.contains(event.target)) {
            // Сбрасываем результаты поиска
            resultsBox.innerHTML = '';
        }
    });

    try {
        inputBox.addEventListener('keyup', handleInput(inputBox, availableKeywords, resultsBox));
    } catch (err) {
        console.log('Не загрузился выпадающий поиск');
    }
});

//     modal for btn-del in dropdown
let btnDelDrop = document.querySelectorAll('.choose-del');

btnDelDrop.forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById('choose-del-modal').classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })
})

try {
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
} catch {
    console.log("Не найден блок доп.элементов для отработки события удаления окна предупреждения.")
}

//     modal for btn-del in filter popup
// ещё одна попытка привязать кнопку к id списка
// let test = document.getElementById('choices--some-item-choice-2');
// console.log(test)
// let test2 = document.getElementById('choose-del-modal-filter')
// console.log(test2)
//
// test.addEventListener('click', function () {
//     test2.classList.toggle('vacancies__item-popup--open');
// })

// select with search
try {
    const searchSelect = () => {
        const elements = document.querySelectorAll('.new__select-wrapper');
        elements.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: true,
                itemSelectText: '',
                shouldSort: false,
                removeItemButton: true,
            })
        });
    };

    searchSelect();
} catch {
    console.log("Не запустился выпадающий список")
}

let radioSpecific = document.getElementById('specific-vacancy');
let specificList = document.getElementById('specific-vacancy-wrapper');
// let radioSpecificParent = radioSpecific.parentNode;
try {
} catch {
    console.log("Ошибка связанная с поиском родителя кнопки особенные вакансии.")
}


let arrGlobal = [document.getElementById('current-vacancy'), document.getElementById('all-vacancies')];


try {
    radioSpecific.addEventListener('click', function () {
        specificList.classList.add('specific--visible');
    })
} catch {
    console.log("Не удалось найти кнопку отображения определенных вакансий в окне автоотбора, на странице вакансий.")
}

try {
    arrGlobal.forEach(function (el) {
        el.addEventListener('click', function () {
            specificList.classList.remove('specific--visible');
            document.getElementById('specific-vacancy').parentNode.classList.remove('specific--style');
        })
    })
} catch {
    console.log("Не удалось определить элементы стилей для окна определенных вакансий в автоотборе.")
}


try {
    radioSpecific.addEventListener('click', function () {
        document.getElementById('specific-vacancy').parentNode.classList.add('specific--style');
    })
} catch {
    console.log("Не найден элемент стиля определенных вакансий. Страница Вакансии.")
}

// валидация main-name в автоотборе
// первый способ работает только с определенными вложенными значениями тексt. В этом случае это @
// let mainNameInput = document.getElementById('main-name');
// mainNameInput.onblur = function () {
//     if (!mainNameInput.value.includes('@')) {
//         mainNameInput.classList.add('invalid');
//         error.innerHTML = 'Это поле обязательно для заполнения'
//     }
// };
//
// mainNameInput.onfocus = function () {
//     if (this.classList.contains('invalid')) {
//         // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
//         this.classList.remove('invalid');
//         error.innerHTML = "";
//     }
// };

// ещё один способ
function handleInputValidation() {
    var inputs = document.querySelectorAll('.new__add-name__input[required]');
    inputs.forEach(function(input) {
        var parent = input.closest('.new__add-name');
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                parent.classList.add('error--visible');
            } else {
                parent.classList.remove('error--visible');
            }
        });
    });
}

handleInputValidation();

//     modal for btn-auto-setting in dropdown
let autoSetBtn = document.querySelectorAll('.auto-setting');

autoSetBtn.forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })
})

try {
    document.getElementById('popup-first-close').addEventListener('click', function () {
        document.getElementById('auto-popup-first').classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })

    document.getElementById('add-new-auto').addEventListener('click', function () {
        document.getElementById('auto-popup-first').classList.remove('vacancies__item-popup--open');
        document.getElementById('popup-auto-create').classList.add('vacancies__item-popup--open');
    })

    document.querySelector('.new__close').addEventListener('click', function () {
        document.getElementById('popup-auto-create').classList.remove('vacancies__item-popup--open');
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
    })

    document.querySelector('.new__btn-cancel').addEventListener('click', function () {
        document.getElementById('popup-auto-create').classList.remove('vacancies__item-popup--open');
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
    })

    document.querySelector("#auto-popup-first .item__popup-wrapper").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("auto-popup-first").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('popup-auto-create').classList.remove('vacancies__item-popup--open');
            document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
        }
    });

    document.querySelector("#popup-auto-create .item__popup-wrapper").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("popup-auto-create").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });
} catch {
    console.log("Не найден блок элементов для окна добавления нового автоотбора.")
}

let popupEditBtn = document.querySelectorAll('.auto__edit');

popupEditBtn.forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById('popup-edit-desc').classList.add('vacancies__item-popup--open');
        document.getElementById("auto-popup-first").classList.remove("vacancies__item-popup--open");
        document.body.classList.toggle('stop-scroll');
    })
})

try {
    document.querySelector('.edit__close').addEventListener('click', function () {
        document.getElementById('popup-edit-desc').classList.remove('vacancies__item-popup--open');
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
    })

    document.querySelector('.edit__cancel').addEventListener('click', function () {
        document.getElementById('popup-edit-desc').classList.remove('vacancies__item-popup--open');
        document.getElementById('popup-auto-create').classList.add('vacancies__item-popup--open');
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('popup-edit-desc').classList.remove('vacancies__item-popup--open');
            document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
        }
    });

    document.querySelector("#popup-edit-desc .item__popup-wrapper").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("popup-edit-desc").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });

    document.querySelectorAll('.auto__delete').forEach(function (el) {
        el.addEventListener('click', function () {
            document.getElementById('auto-popup-first').classList.remove('vacancies__item-popup--open');
            document.getElementById('popup-del-quest').classList.add('vacancies__item-popup--open');
            document.body.classList.toggle('stop-scroll');
        })
    })

    document.querySelector('.quest__btn-close').addEventListener('click', function () {
        document.getElementById('popup-del-quest').classList.remove('vacancies__item-popup--open');
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
    })

    document.querySelector('.quest__btn-cancel').addEventListener('click', function () {
        document.getElementById('popup-del-quest').classList.remove('vacancies__item-popup--open');
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('popup-del-quest').classList.remove('vacancies__item-popup--open');
            document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
        }
    });

    document.querySelector("#popup-del-quest .item__popup-wrapper").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("popup-del-quest").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('auto-popup-first').classList.remove('vacancies__item-popup--open');
            document.body.classList.remove('stop-scroll');
        }
    });
} catch {
    console.log("Не найдены элементы дополнительных ф-ий окна автоотбора в виде удалить или редактировать.")
}


//clone's window in popup autoset
let checkClones = document.getElementById('search-duplicates');
let clonesInter = document.querySelector('.new__clones__item-hide');


try {
    checkClones.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            clonesInter.classList.add('new__clones--visible');
        } else {
            clonesInter.classList.remove('new__clones--visible');
        }
    })
} catch {
    console.log("Не найден блок отображения дубликатов или нет, в окне автоотбора.")
}

//tooltip
try {
    tippy('#myButton', {
        content: "Если установлено значение в 10 дней и первый кандидат получен 1 числа, то все кандидаты с такими же контактами, которые откликнутся с 1 по 10 число включительно, будут автоматически считаться дублями",
        theme: 'jobers',
        maxWidth: 332,
    });
} catch {
    console.log("Не найден блок типпи, в роли отображения тултипа в отображении дубликатов или нет(?).")
}


// добавил дату в строку названия автоотбора
let date = new Date();
let day = date.getDate();
let monthIndex = date.getMonth();
let year = date.getFullYear();

let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
let monthName = months[monthIndex];

let formattedDate = day + " " + monthName + " " + year + " " + "года";

// var now = new Date(); //утрачен так как старый метод
var ura = 'Автоотбор от ';

try {
// now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); //утрачен так как старый метод
    document.getElementById('main-name').value = ura + formattedDate;
} catch {
    console.log("Не найден блок отображения дефолтного названия в заключетельной строке нового автоотбора, страницы" +
        "вакансий.")
}

//работа с новыми выпадающими списками
let newDropListItem = document.querySelectorAll('.new__droplist-item');
let newDropList = document.getElementById('new-droplist');

newDropListItem.forEach(function (el) {
    el.addEventListener('click', function () {
        newDropList.classList.remove('droplist_active');
    })
})

//move sidebar
let burgerTab = document.querySelector('.search-bar__burger');
let sideBar = document.querySelector('.nav__container');

try {
    burgerTab.addEventListener('click', function () {
        burgerTab.classList.toggle('search-bar__burger--active');
        sideBar.classList.toggle('nav__container--active');
        document.body.classList.toggle('stop-scroll');
    })
} catch (error) {
    console.log("Не удалось вызвать бургер меню")
}

//more pupup options till 768px
let morePopupBtn = document.getElementById('vacancies-popup-more');
let morePopupSpace = document.getElementById('vacancies-popup-options');
let popupBtnCloseFirst = document.getElementById('popup-btn-close-first');
let optionsBack = document.querySelector('.vacancies__options-back');

try {
    morePopupBtn.addEventListener('click', function () {
        morePopupSpace.classList.add('vacancies__popup-768--active');
        optionsBack.classList.add('vacancies__options-back--active');
    })

    optionsBack.addEventListener('click', function () {
        morePopupSpace.classList.remove('vacancies__popup-768--active');
        optionsBack.classList.remove('vacancies__options-back--active');
    })
    popupBtnCloseFirst.addEventListener('click', function () {
        morePopupSpace.classList.remove('vacancies__popup-768--active');
        optionsBack.classList.remove('vacancies__options-back--active');
    })
} catch {
    console.log("Не найден элемент открытия дополнительныъ ф-ий выделенных вакансий, на странице вакансий.")
}

// archive popup-more
// code bottom from "closing droplist till 768"
let dropListBack = document.querySelector('.vacancies__droplist-back');
let dropListArchiveBack = document.querySelector('.vacancies__archive-back');


let archivePopupBtn = document.getElementById('vacancies-archive-more');
let archivePopupSpace = document.getElementById('archive-popup-options');
let archiveBtnCloseFirst = document.getElementById('popup-archive-close-first');


try {
    archivePopupBtn.addEventListener('click', function () {
        archivePopupSpace.classList.add('vacancies__popup-768--active');
        dropListArchiveBack.classList.add('vacancies__options-back--active');
    })

    dropListArchiveBack.addEventListener('click', function () {
        archivePopupSpace.classList.remove('vacancies__popup-768--active');
        dropListArchiveBack.classList.remove('vacancies__options-back--active');
    })
    archiveBtnCloseFirst.addEventListener('click', function () {
        archivePopupSpace.classList.remove('vacancies__popup-768--active');
        dropListArchiveBack.classList.remove('vacancies__options-back--active');
    })
} catch {
    console.log("Не найден блок функций отображения дополнительных свойств дроплиста в мобильной версии.")
}

//closing droplist in 768

try {
    dropListBack.addEventListener('click', function () {
        burgerNav.classList.remove('item__burger-nav--active');
        burgerNavSecond.classList.remove('item__burger-nav--active');
        burgerNavThird.classList.remove('item__burger-nav--active');
        burgerActiveFirst.classList.remove('item__burger-nav--active');
        burgerActiveSecond.classList.remove('item__burger-nav--active');
        dropListBack.classList.remove('vacancies__droplist-back--active');
        dropListBack.classList.remove('vacancies__archive-back--active');
        document.body.classList.toggle('scroll-toggle');
        inWorkDotsOne.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
        inWorkDotsTwo.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
        inWorkDotsThree.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
        inActiveDotsOne.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
        inActiveDotsTwo.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
    })
} catch {
    console.log("Не найден блок стилей для отображения попап блоков в мобильной версии, на странице Вакансии.")
}


try {
    dropListArchiveBack.addEventListener('click', function () {
        burgerArchiveFirst.classList.remove('item__burger-nav--active');
        dropListArchiveBack.classList.remove('vacancies__archive-back--active');
        document.body.classList.toggle('scroll-toggle');
        inArchiveDotsOne.forEach(function (el) {
            el.classList.remove('item__burger-dot--active')
        })
    })
} catch {
    console.log("Не найден блок стилей для фона попапа на странице вакансий.")
}

//добавление окна добавить в архив
let btnSendArchive = document.querySelectorAll('.send-archive');

btnSendArchive.forEach(function (el) {
    el.addEventListener('click', function () {
        document.querySelector('.vacancies__archive-popup').classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })
})

try {
    document.querySelector("#to-archive .vacancies__send-archive").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("to-archive").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('to-archive').classList.remove('vacancies__item-popup--open');
        }
    });

    document.getElementById('to-archive-btn').addEventListener('click', function () {
        document.getElementById('to-archive').classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })

    document.querySelector('.archive__no').addEventListener('click', function () {
        document.getElementById('to-archive').classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })
} catch {
    console.log("Не найден блок стилей для окна добавления в архив, на странице вакансий.")
}


// кнопка удаления нескольких вакансий для попапа в 768 активных вакансий и архива
let multiDeleteActiveVacancies = document.getElementById('multi-delete-vacancies');
let multiDelArchiveVacancies = document.getElementById('multi-delete-vacancies-archive');
let multiDelModalSpace = document.getElementById('choose-del-modal-filter');

try {
    multiDeleteActiveVacancies.addEventListener('click', function () {
        multiDelModalSpace.classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })

    // archive btn
    multiDelArchiveVacancies.addEventListener('click', function () {
        multiDelModalSpace.classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })

    document.querySelector("#choose-del-modal-filter .vacancies__filter-popup__wrapper").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("choose-del-modal-filter").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('choose-del-modal-filter').classList.remove('vacancies__item-popup--open');
        }
    });

    // скрыта в счет того что в мобильной версии нет закрывающего крестика
    // document.getElementById('to-archive-btn').addEventListener('click', function () {
    //     document.getElementById('to-archive').classList.remove('vacancies__item-popup--open');
    //     document.body.classList.remove('stop-scroll');
    // })

    document.getElementById('multidelete-yes-btn').addEventListener('click', function () {
        multiDelModalSpace.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })

    document.getElementById('multidelete-no-btn').addEventListener('click', function () {
        multiDelModalSpace.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })
} catch {
    console.log("Не сработал попап удаления нескольких вакансий. Элемент не найден. Страница Вакансии.")
}

//кнопка отправки в архив на попапе страницы вакансий
let multiArchiveBtn = document.getElementById('multi-archive-vacancies');
let multiArchiveSpace = document.getElementById('to-multiarchive');

try {
    multiArchiveBtn.addEventListener('click', function () {
        multiArchiveSpace.classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })

    document.querySelector("#to-multiarchive .vacancies__send-multiarchive").addEventListener('click', event => {
        event._isClickWithInModal = true;
    });
    document.getElementById("to-multiarchive").addEventListener('click', event => {
        if (event._isClickWithInModal) return;
        event.currentTarget.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            document.getElementById('to-multiarchive').classList.remove('vacancies__item-popup--open');
        }
    });

    document.getElementById('to-multiarchive-btn').addEventListener('click', function () {
        document.getElementById('to-multiarchive').classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })

    document.querySelector('.multiarchive__yes').addEventListener('click', function () {
        multiArchiveSpace.classList.remove('vacancies__item-popup--open');
        morePopupSpace.classList.remove('vacancies__popup-768--active');
        optionsBack.classList.remove('vacancies__options-back--active');
        document.body.classList.remove('stop-scroll');
    })

    document.querySelector('.multiarchive__no').addEventListener('click', function () {
        multiArchiveSpace.classList.remove('vacancies__item-popup--open');
        document.body.classList.remove('stop-scroll');
    })
} catch {
    console.log("Ошибка запроса элементов окна множественной архивации.")
}

