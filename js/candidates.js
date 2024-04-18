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
let arrAllCans = [document.getElementById("cans-first"), document.getElementById("cans-second"),
    document.getElementById("cans-third"), document.getElementById("cans-fourth"),
    document.getElementById("cans-fifth"), document.getElementById("cans-sixth"),
    document.getElementById("cans-seventh"), document.getElementById('cans-eighth')];

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

try {
    document.getElementById('hide-filter-cans').addEventListener('click', function () {
        document.getElementById('popupFilterCans').classList.remove('cans__filter--active');
        arrAllCans.forEach(function (el) {
            el.checked = false;
        })
        checkAllCans.checked = false;
    })
} catch {
    console.log('Не сработал кнопка "Скрыть фильтр"')
}


//modal auto-setting in auto-choose
let autoSetBtn = document.querySelector('.can__btn-auto');

autoSetBtn.addEventListener('click', function () {
    document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
    document.body.classList.toggle('stop-scroll');
})
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

let popupEditBtn = document.querySelectorAll('.auto__edit');

popupEditBtn.forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById('popup-edit-desc').classList.add('vacancies__item-popup--open');
        document.getElementById("auto-popup-first").classList.remove("vacancies__item-popup--open");
        document.body.classList.toggle('stop-scroll');
    })
})

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

//вызов выпадающих списков в окне нового автоподбора
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

// созданиние списка для кнопка "определенные вакансии в блоке автоотбора"
let radioSpecific = document.getElementById('specific-vacancy');
let specificList = document.getElementById('specific-vacancy-wrapper');
let radioSpecificParent = radioSpecific.parentNode;

let arrGlobal = [document.getElementById('current-vacancy'), document.getElementById('all-vacancies')];

radioSpecific.addEventListener('click', function () {
    specificList.classList.add('specific--visible');
})

arrGlobal.forEach(function (el) {
    el.addEventListener('click', function () {
        specificList.classList.remove('specific--visible');
        radioSpecificParent.classList.remove('specific--style');
    })
})

radioSpecific.addEventListener('click', function () {
    radioSpecificParent.classList.add('specific--style');
})

//добавления окна проверки дублей
//clone's window in popup autoset
let checkClones = document.getElementById('search-duplicates');
let clonesInter = document.querySelector('.new__clones__item-hide');

checkClones.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        clonesInter.classList.add('new__clones--visible');
    } else {
        clonesInter.classList.remove('new__clones--visible');
    }
})

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
var ura = 'Автоотбор от ';
document.getElementById('main-name').value = ura + formattedDate;

//вызов выпадающего списка в окне добавления нового кандидата
let vacancyChoose = new Choices(
    document.getElementById('choose-vacancy'),
    {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        removeItemButton: true,
        noChoicesText: '',
    }
);

//script for dropdown
// document.addEventListener("DOMContentLoaded", function () {
//     const dropdowns = document.querySelectorAll('.dropdown');
//
//     dropdowns.forEach(function (dropdown) {
//         const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
//         const dropdownMenu = dropdown.querySelector('.dropdown-menu');
//         const dropdownClose = dropdown.querySelector('.item__btn-close');
//         const dropdownBack = dropdown.querySelector('.candidates__droplist-back');
//         const dropdownDot = dropdown.querySelectorAll('.button-icon');
//
//         dropdown.addEventListener('mouseleave', function (e) {
//             if (!dropdown.contains(e.relatedTarget)) {
//                 closeDropdown();
//             }
//         });
//
//         dropdown.addEventListener('mouseenter', function () {
//             openDropdown();
//         });
//
//         dropdownMenu.addEventListener('mouseenter', function () {
//             clearTimeout(dropdownMenu.timer);
//         });
//
//         dropdownMenu.addEventListener('mouseleave', function () {
//             dropdownMenu.timer = setTimeout(function () {
//                 closeDropdown();
//             }, 200);
//         });
//
//         dropdownClose.addEventListener('click', function () {
//             closeDropdown();
//
//             // Удаляем обработчики событий
//             dropdownToggle.removeEventListener('mouseenter', handleMouseEnter);
//             dropdownToggle.removeEventListener('mouseleave', handleMouseLeave);
//         });
//
//         dropdownBack.addEventListener('click', function () {
//             closeDropdown();
//             dropdownToggle.removeEventListener('mouseenter', handleMouseEnter);
//             dropdownToggle.removeEventListener('mouseleave', handleMouseLeave);
//         });
//
// // Объявляем функции-обработчики событий
//         function handleMouseEnter() {
//             openDropdown();
//             clearTimeout(dropdownMenu.timer);
//         }
//
//         function handleMouseLeave(e) {
//             if (!dropdown.contains(e.relatedTarget)) {
//                 closeDropdown();
//             }
//
//             dropdownMenu.timer = setTimeout(function () {
//                 closeDropdown();
//             }, 200);
//         }
//
//
//         function openDropdown() {
//             dropdownMenu.style.display = 'block';
//             dropdownMenu.classList.add('dropdown--active');
//             dropdownBack.classList.add('candidates__droplist-back--active');
//             dropdown.setAttribute('data-state', 'open');
//         }
//
//         function closeDropdown() {
//             dropdownMenu.classList.remove('dropdown--active');
//             dropdownBack.classList.remove('candidates__droplist-back--active');
//             dropdownMenu.style.display = 'none';
//             dropdown.setAttribute('data-state', 'closed');
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function (dropdown) {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownClose = dropdown.querySelector('.item__btn-close');
        const dropdownBack = dropdown.querySelector('.candidates__droplist-back');

        dropdownToggle.addEventListener('click', function () {
            if (dropdownMenu.classList.contains('dropdown--active')) {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        dropdownClose.addEventListener('click', function () {
            closeDropdown();
        });

        dropdownBack.addEventListener('click', function () {
            closeDropdown();
        });

        function openDropdown() {
            dropdownMenu.style.display = 'block';
            dropdownMenu.classList.add('dropdown--active');
            dropdownBack.classList.add('candidates__droplist-back--active');
            dropdown.setAttribute('data-state', 'open');
        }

        function closeDropdown() {
            dropdownMenu.classList.remove('dropdown--active');
            dropdownBack.classList.remove('candidates__droplist-back--active');
            dropdownMenu.style.display = 'none';
            dropdown.setAttribute('data-state', 'closed');
        }
    });
});


//script for popup
// Функция для открытия всплывающего окна
function openPopup(popupId) {
    document.getElementById(popupId).classList.add('vacancies__item-popup--open');
    document.body.classList.add('stop-scroll');
}

// Функция для закрытия всплывающего окна
function closePopup(popupId) {
    document.getElementById(popupId).classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
}

// Функция для добавления обработчика события открытия всплывающего окна
function addPopupOpenHandler(buttonSelector, popupId) {
    document.querySelectorAll(buttonSelector).forEach(function (button) {
        button.addEventListener('click', function () {
            openPopup(popupId);
        });
    });
}

// Функция для добавления обработчика события закрытия всплывающего окна
function addPopupCloseHandler(closeButtonId, popupId) {
    document.getElementById(closeButtonId).addEventListener('click', function () {
        closePopup(popupId);
    });
}

// Функция для добавления обработчика события закрытия всплывающего окна при клике на фон
function addPopupCloseOnBackgroundClickHandler(popupId) {
    document.getElementById(popupId).addEventListener('click', function (event) {
        if (!event.target.closest(".item__popup-wrapper")) {
            closePopup(popupId);
        }
    });
}

// Функция для добавления обработчика события закрытия всплывающего окна при нажатии клавиши Esc
function addPopupCloseOnEscKeyHandler(popupId) {
    window.addEventListener('keydown', function (e) {
        if (e.key === "Escape") {
            closePopup(popupId);
        }
    });
}

// Открытие окна удаления вакансии
addPopupOpenHandler('#del-popup1', 'del-popup');
addPopupCloseHandler('del-popup-close', 'del-popup');
addPopupCloseOnBackgroundClickHandler('del-popup');
addPopupCloseOnEscKeyHandler('del-popup');

//close del-popup-close after click on del-no button
document.getElementById('del-no').addEventListener('click', function () {
    document.getElementById('del-popup').classList.remove('vacancies__item-popup--open');
})

//call add can pop up
addPopupOpenHandler('#add-can', 'add-can-field');
addPopupCloseHandler('add-can-close', 'add-can-field');
addPopupCloseOnBackgroundClickHandler('add-can-field');
addPopupCloseOnEscKeyHandler('add-can-field');

//close pop up after click on add-no \ yes button
document.getElementById('add-btn-save').addEventListener('click', function () {
    document.getElementById('add-can-field').classList.remove('vacancies__item-popup--open');
})

document.getElementById('add-btn-cancel').addEventListener('click', function () {
    document.getElementById('add-can-field').classList.remove('vacancies__item-popup--open');
})

//move sidebar
let burgerTab = document.querySelector('.search-bar__burger');
let sideBar = document.querySelector('.nav__container');

burgerTab.addEventListener('click', function () {
    burgerTab.classList.toggle('search-bar__burger--active');
    sideBar.classList.toggle('nav__container--active');
    document.body.classList.toggle('stop-scroll');
})


//dropdown-search for desktop
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

document.addEventListener('DOMContentLoaded', function () {
    const availableKeywords = [
        'Владимир Власов',
        'Андрей Власов',
        'Максим Власов',
        'Юрий Иванов',
        'Константин Хабенский',
        'Иван Грозный',
    ];
    const inputBox = document.getElementById('input-box-candidates');
    const resultsBox = document.querySelector('.search-bar__dropdown-second');

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

//code for popup 768
const morePopupBtn = document.getElementById('vacancies-popup-more');
const morePopupSpace = document.getElementById('vacancies-popup-options');
const popupBtnCloseFirst = document.getElementById('popup-btn-close-first');
const optionsBack = document.querySelector('.vacancies__options-back');

const togglePopup = () => {
    morePopupSpace.classList.toggle('vacancies__popup-768--active');
    optionsBack.classList.toggle('vacancies__options-back--active');
};

try {
    morePopupBtn.addEventListener('click', togglePopup);
    optionsBack.addEventListener('click', togglePopup);
    popupBtnCloseFirst.addEventListener('click', togglePopup);
} catch (error) {
    console.log("Не найден элемент открытия дополнительных функций выделенных вакансий на странице вакансий.");
}
