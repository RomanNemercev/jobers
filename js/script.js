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

let filterActiveUnActive = document.getElementById('hide-elements');
let filterArchiveUnActive = document.getElementById('hide-filter-archive');
filterActiveUnActive.addEventListener('click', function () {
    arrActiveValues.forEach(function (el) {
        el.checked = false;
        inActiveFilter.checked = false;
        ActiveFilter.checked = false;
        popupFilterActive.classList.remove('vacancies__filter--active');
    })
})

filterArchiveUnActive.addEventListener('click', function () {
    arrArchiveValues.forEach(function (el) {
        el.checked = false;
        ArchiveFilter.checked = false;
        popupFilterArchive.classList.remove('vacancies__filter--active');
    })
})

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
        removeItemButton: true,
        placeholderValue: 'Пол ',
        noChoicesText: '',
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
        removeItemButton: true,
        placeholderValue: 'Опыт работы',
        noChoicesText: '',
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
        removeItemButton: true,
        placeholderValue: 'Гражданство',
        noChoicesText: '',
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

let levelChoose = new Choices(
    document.getElementById('choose-level'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
    }
);

let specificChoose = new Choices(
    document.getElementById('specific-vacancy-options'),
    {
        allowHTML: true,
        itemSelectText: '',
        searchEnabled: false,
        shouldSort: false,
        removeItemButton: true,
        placeholderValue: 'Выберите вакансию',
        noChoicesText: 'Вакансии закончились',
    }
);

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
function errorInputs() {
    var items = document.querySelectorAll('.new__add-name__input[required]');
    if (!items.length) return;
    items.forEach(function (item) {
        var parent = item.closest('.new__add-name');
        item.addEventListener('focusout', function () {
            if (!this.value.length) parent.classList.add('error--visible');
        });
        item.addEventListener('focusin', function () {
            if (parent.classList.contains('error--visible')) parent.classList.remove('error--visible');
        });
    });
}

errorInputs();

//     modal for btn-auto-setting in dropdown
let autoSetBtn = document.querySelectorAll('.auto-setting');

autoSetBtn.forEach(function (el) {
    el.addEventListener('click', function () {
        document.getElementById('auto-popup-first').classList.add('vacancies__item-popup--open');
        document.body.classList.toggle('stop-scroll');
    })
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

// здесь был

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

document.querySelector('.auto__delete').addEventListener('click', function () {
    document.getElementById('auto-popup-first').classList.remove('vacancies__item-popup--open');
    document.getElementById('popup-del-quest').classList.add('vacancies__item-popup--open');
    document.body.classList.toggle('stop-scroll');
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
