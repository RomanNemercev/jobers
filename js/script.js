// // none-scalable for nav-bar
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

//archive-two
let burgerArchiveTwo = document.querySelector('.item__archive-two');
let burgerListArchiveTwo = document.querySelector('.item__list__archive-two');
let inArchiveDotsTwo = document.querySelectorAll('.dot-archive-two');
let menuLinksArchiveTwo = document.querySelectorAll('.item__archive__btn-two');

try {
    burgerArchiveTwo.addEventListener('click',
        function () {
            burgerListArchiveTwo.classList.toggle('item__burger-list--active');
            inArchiveDotsTwo.forEach(function (el) {
                el.classList.toggle('item__burger-dot--active')
            })
        })
} catch (err) {
    console.log('ошибка обработки седьмого дроплиста')
}

menuLinksArchiveTwo.forEach(function (el) {
    el.addEventListener('click',
        function () {
            burgerListArchiveTwo.classList.remove('item__burger-list--active');
            inArchiveDotsTwo.forEach(function (el) {
                el.classList.remove('item__burger-dot--active')
            })
        })
})

//filter-choice
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


// popup filter
let vacanciesFilterActive = document.getElementById("filterActive");
let vacanciesFilterArchive = document.getElementById("filterArchive");
let vacanciesInput = document.querySelectorAll('.vacancies__input');
let itemNameInput = document.querySelectorAll('.item__name-input');
// delete after test right popup
// let filterResetBtn = document.querySelectorAll('.vacancies__filter-reset');

let enabledSettings = [];

vacanciesInput.forEach(function (checkbox) {

        enabledSettings = Array.from(vacanciesInput)
            .filter(i => i.checked)
            .map(i => i.value)
        console.log(enabledSettings);
        if (enabledSettings.length == 0) {
            vacanciesFilterActive.classList.remove('vacancies__filter--active');
        } else {
            vacanciesFilterActive.classList.toggle('vacancies__filter--active');
        }

})



// vacanciesInput.forEach(function (el) {
//     el.addEventListener('change', (event) => {
//         if (event.currentTarget.checked) {
//             vacanciesFilterActive.classList.toggle('vacancies__filter--active');
//             vacanciesFilterArchive.classList.toggle('vacancies__filter--active');
//         } else {
//             vacanciesFilterActive.classList.remove('vacancies__filter--active');
//             vacanciesFilterArchive.classList.remove('vacancies__filter--active');
//         }
//     })
// })
//
// itemNameInput.forEach(function (el) {
//     el.addEventListener('change', (event) => {
//         if (event.currentTarget.checked) {
//             vacanciesFilterActive.classList.toggle('vacancies__filter--active');
//             vacanciesFilterArchive.classList.toggle('vacancies__filter--active');
//         } else {
//             vacanciesFilterActive.classList.remove('vacancies__filter--active');
//             vacanciesFilterArchive.classList.remove('vacancies__filter--active');
//         }
//     })
// })

// vacanciesInput.forEach(function (el) {
//     el.addEventListener('click',
//         function () {
//             vacanciesFilterActive.classList.toggle('vacancies__filter--active');
//         })
// })
//
// vacanciesInput.forEach(function (el) {
//     el.addEventListener('click',
//         function () {
//             vacanciesFilterArchive.classList.toggle('vacancies__filter--active');
//         })
// })
//
// itemNameInput.forEach(function (el) {
//     el.addEventListener('click',
//         function () {
//             vacanciesFilterActive.classList.toggle('vacancies__filter--active');
//         })
// })
//
// itemNameInput.forEach(function (el) {
//     el.addEventListener('click',
//         function () {
//             vacanciesFilterArchive.classList.toggle('vacancies__filter--active');
//         })
// })

// delete after test right popup
// filterResetBtn.forEach(function (el) {
//     el.addEventListener('click',
//         function () {
//             vacanciesFilterActive.classList.remove('vacancies__filter--active');
//             vacanciesFilterArchive.classList.remove('vacancies__filter--active');
//         })
// })

//dropdown-search
let availableKeywords = [
    'Владимир Власов',
    'Владимир Власов',
    'Владимир Власов',
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