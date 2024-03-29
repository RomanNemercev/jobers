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
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        removeItemButton: true,
        noChoicesText: '',
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
tippy('#myButton', {
    content: "Если установлено значение в 10 дней и первый кандидат получен 1 числа, то все кандидаты с такими же контактами, которые откликнутся с 1 по 10 число включительно, будут автоматически считаться дублями",
    theme: 'jobers',
    maxWidth: 332,
});

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