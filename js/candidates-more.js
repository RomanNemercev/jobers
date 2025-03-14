// script for scroll-x
// Function to check and toggle visibility of scroll buttons
function toggleScrollButtons() {
    const container = document.getElementById('scroll-wrapper');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnSet = document.querySelector('.btn-settings');

    if (container.scrollWidth > container.clientWidth) {
        btnLeft.style.visibility = 'visible';
        btnRight.style.visibility = 'visible';
        btnSet.style.cssText = 'right: 100px; border-radius: 0;'
    } else {
        btnLeft.style.visibility = 'hidden';
        btnRight.style.visibility = 'hidden';
        btnSet.style.cssText = 'right: 0; border-radius: 0 10px 10px 0;'
    }
}

// var mediaQuery = window.matchMedia('(max-width: 768px)');

// if (mediaQuery.matches) {
//     btnLeft.style.visibility = 'hidden';
//     btnRight.style.visibility = 'hidden';
// }

// Event listeners for scroll buttons
document.getElementById('btn-left').onclick = function () {
    const container = document.getElementById('scroll-wrapper');
    sideScroll(container, 'left', 25, 100, 10);
};

document.getElementById('btn-right').onclick = function () {
    const container = document.getElementById('scroll-wrapper');
    sideScroll(container, 'right', 25, 100, 10);
};

// Scroll function
function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(function () {
        if (direction === 'left') {
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if (scrollAmount >= distance) {
            clearInterval(slideTimer);
        }
    }, speed);
}

// Initial check on page load
toggleScrollButtons();

// Check on window resize
window.addEventListener('resize', toggleScrollButtons);

//auto scroll on history page
new SimpleBar(document.getElementById('messageContainer'));
// Прокрутка до последнего сообщения
// document.addEventListener("DOMContentLoaded", function () {
//     var simpleBarInstance = new SimpleBar(document.getElementById('messageContainer'));
//     var scrollElement = simpleBarInstance.getScrollElement();
//     scrollElement.scrollTop = scrollElement.scrollHeight;
// });

//read-more
window.onload = function () {
    //selector for parent component
    const readMoreContainers = Array.from(document.querySelectorAll('.read-more__container'));

    readMoreContainers.forEach(container => {
        const textContainer = container.querySelector('.collapsedTextContainer');
        const button = container.querySelector('.read-more__btn');
        const fadeOverlay = textContainer.querySelector('.fadeOverlay');

        if (!textContainer || !button || !fadeOverlay) return;  // check if necessary children exist

        const toggleVisible = () => {
            if (textContainer.scrollHeight <= 49) {
                button.style.display = 'none';
                fadeOverlay.style.background = 'transparent';
            } else {
                button.style.display = 'block';
                fadeOverlay.style.background = null; // reset to default
            }
        }

        function expandText() {
            if (textContainer.style.maxHeight === '100%') {
                textContainer.style.maxHeight = '49px';
                textContainer.classList.remove('expanded');
                button.innerText = 'Показать полностью';
            } else {
                textContainer.style.maxHeight = '100%';
                textContainer.classList.add('expanded');
                button.innerText = 'Свернуть';
            }
            toggleVisible();
        }

        // Add click event listener with try-catch block
        // Ошибка происхордит
        button.addEventListener('click', () => {
            try {
                expandText();
            } catch (error) {
                console.log("Произошла ожидаемая ошибка по не нахождению текста в кнопке read-more.");
            }
        });
        toggleVisible();
    });
};

//custom select script
document.addEventListener("DOMContentLoaded", function () {
    const customSelect = document.querySelector(".custom-select");
    const dropdown = customSelect.querySelector(".dropdown");

    // Открытие/закрытие списка по клику на .custom-select
    customSelect.addEventListener("click", function () {
        this.classList.toggle("open");
        dropdown.style.display = this.classList.contains("open") ? "block" : "none";
    });

    // Закрытие списка при клике вне .custom-select
    document.addEventListener("click", function (event) {
        if (!customSelect.contains(event.target)) {
            customSelect.classList.remove("open");
            dropdown.style.display = "none";
        } else if (event.target.tagName === "LI") {
            const value = event.target.dataset.value;
            customSelect.querySelector(".selected-option").textContent = event.target.textContent;
            customSelect.dataset.value = value; // Записываем выбранное значение в атрибут data-value у .custom-select
            customSelect.classList.remove("open");
            dropdown.style.display = "none";
        }
    });
});

// pl for textarea in chat crm
// Функция для обновления отступа в textarea
function updateTextareaIndent() {
    var mediaQuery = window.matchMedia('(max-width: 1170px)');
    var overlayWidth = document.getElementById("chat-select").offsetWidth;
    var totalIndent = overlayWidth + 100; // Добавляем 37px к ширине overlay
    document.getElementById("chat-textarea").style.textIndent = totalIndent + "px";

    if (mediaQuery.matches) {
        totalIndent = overlayWidth + 150; // Добавляем 37px к ширине overlay
        document.getElementById("chat-textarea").style.textIndent = totalIndent + "px";
    }
}

// Функция для обновления отступа и текста placeholder
// function updatePlaceholderIndent() {
//     var overlayWidth = document.getElementById("chat-select").offsetWidth;
//     var placeholderText = "Введите ваше сообщение";
//     document.getElementById("chat-textarea").setAttribute("placeholder", placeholderText);
// }

// Событие для изменения значения в chat-select
document.querySelectorAll("#chat-select li").forEach(function (item) {
    item.addEventListener("click", function () {
        document.querySelector("#chat-select .selected-option").textContent = this.getAttribute("data-value");
        // updateTextareaIndent();
        // updatePlaceholderIndent();
        var overlayWidth = document.getElementById("chat-select").offsetWidth;
        var placeholderText = "Введите ваше сообщение";
        document.getElementById("chat-textarea").setAttribute("placeholder", placeholderText);
        // var overlayWidth = document.getElementById("chat-select").offsetWidth;
        var totalIndent = overlayWidth + 37; // Добавляем 37px к ширине overlay
        document.getElementById("chat-textarea").style.textIndent = totalIndent + "px";
    });
});

// Инициализация при загрузке страницы
window.addEventListener("load", function () {
    updateTextareaIndent();
    // updatePlaceholderIndent();
});

// Также обновляем отступ при изменении размера окна
window.addEventListener("resize", function () {
    updateTextareaIndent();
    // updatePlaceholderIndent();
});


// add script for dropdown in chat crm
// Добавляем обработчик события для кнопки выбора действия
document.getElementsByClassName("more-dropbtn")[0].addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("more-show");
});

// Добавляем обработчик события для всего документа
document.addEventListener("click", function (event) {
    var dropdowns = document.getElementsByClassName("more-dropdown-content");
    var i;
    // Проверяем, является ли цель события одним из выпадающих списков
    for (i = 0; i < dropdowns.length; i++) {
        var dropdown = dropdowns[i];
        if (!event.target.matches('.more-dropbtn') && !dropdown.contains(event.target)) {
            // Закрываем все выпадающие списки, если клик произошел вне списка
            if (dropdown.classList.contains('more-show')) {
                dropdown.classList.remove('more-show');
            }
        }
    }
});

// Добавляем обработчики событий для кнопок внутри выпадающего списка
document.getElementById("insertTemplateBtn").addEventListener("click", function () {
    // Добавьте здесь функционал для вставки шаблона
    console.log("Вставить шаблон");
});

document.getElementById("attachFileBtn").addEventListener("click", function () {
    // Открываем окно для выбора файла
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.click();

    // Добавляем обработчик события для выбора файла
    fileInput.addEventListener("change", function () {
        // Добавьте здесь функционал для обработки выбранного файла
        console.log("Выбран файл:", fileInput.files[0]);
    });
});

// add focus when click on answer
function scrollToInput() {
    var messageInput = document.getElementById('chat-textarea');
    messageInput.focus();
    // закомментированный код на случай если нужен тест по скрытию placeholder
    // var placeholderText = ' ';
    // document.getElementById("chat-textarea").setAttribute("placeholder", placeholderText);

    // Выбираем вариант "Чат на работном сайте"
    var customSelect = document.getElementById('chat-select');
    var selectedOption = customSelect.querySelector('.selected-option');
    var dropdown = customSelect.querySelector('.dropdown');
    selectedOption.textContent = "Чат на работном сайте";
    customSelect.dataset.value = "Чат на работном сайте";

    // Закрываем выпадающий список
    customSelect.classList.remove("open");
    dropdown.style.display = "none";
}

function scrollToInputComments() {
    var messageInput = document.getElementById('chat-textarea');
    messageInput.focus();

    // Выбираем вариант "Чат на работном сайте"
    var customSelect = document.getElementById('chat-select');
    var selectedOption = customSelect.querySelector('.selected-option');
    var dropdown = customSelect.querySelector('.dropdown');
    selectedOption.textContent = "Комментарий";
    customSelect.dataset.value = "Комментарий";

    // Закрываем выпадающий список
    customSelect.classList.remove("open");
    dropdown.style.display = "none";
}

// open dropdown in right top
document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll('.dropdown-dots');

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

//init tags js
initializeTagInput('tag-input-0');
initializeTagInput('tag-input-1');

//styles for tabs click on 768
var mediaQuery = window.matchMedia('(max-width: 1170px)');

if (mediaQuery.matches) {

    document.getElementById('history').addEventListener('click', function () {
        document.querySelector('.search-bar__container').style.display = 'none';
        document.querySelector('.more').style.paddingTop = '0';
        document.querySelector('.more__cans-header').style.padding = '7px 12px';
        document.querySelector('.more__cans-header').classList.add('hide-after');
        document.querySelector('.more__header-right').style.display = 'none';
        document.querySelector('.more__content').style.height = '100vh';
        document.querySelector('.more__enter').style.display = 'block';
    })

    document.getElementById('resume').addEventListener('click', function () {
        document.querySelector('.search-bar__container').style.display = 'flex';
        document.querySelector('.more').style.paddingTop = '53px';
        document.querySelector('.more__cans-header').style.padding = '15px 12px';
        document.querySelector('.more__cans-header').classList.remove('hide-after');
        document.querySelector('.more__header-right').style.display = 'flex';
        document.querySelector('.more__content').style.height = 'calc(100vh - 65px)';
        document.querySelector('.more__enter').style.display = 'none';
    })
    console.log('Экран до 1170px');
}

//create tabs for cans list
let listCansBtn = document.querySelector('.search-bar__cans');
let mainContentUser = document.querySelector('.more__cans-info');
let moreCansScroll = document.querySelector('.more__cans-scroll');
listCansBtn.addEventListener('click', function () {
    if (listCansBtn.style.opacity === '1') {
        listCansBtn.style.opacity = '0.5';
    } else {
        listCansBtn.style.opacity = '1';
    }

    if (mainContentUser.style.cssText === 'opacity: 1; visibility: visible; position: relative;') {
        mainContentUser.style.cssText = 'opacity: 0; visibility: hidden; position: absolute;';
    } else {
        mainContentUser.style.cssText = 'opacity: 1; visibility: visible; position: relative;';
    }

    moreCansScroll.classList.toggle('more__cans-scroll--active__768');
    document.querySelector('.vacancies__content--active').classList.toggle('vacancies__content--active__correct-height');
    document.querySelector('.more__items-list').classList.toggle('more__items-list__correct-height');
})

//doubles expand sets
document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector(".more__doubles-content");
    const toggleButton = document.querySelector(".more__doubles-toggle");
    let moreDoublesHeight = document.querySelector(".more__doubles").offsetHeight + 60;

    // Проверяем высоту контента и скрываем/показываем кнопку "Раскрыть полностью"
    if (content.scrollHeight > 60) {
        toggleButton.classList.add("more__doubles-toggle_active");
        document.querySelector('.more__doubles').classList.add('more__doubles--overlay');
    }

    toggleButton.addEventListener("click", function () {
        const parent = toggleButton.closest(".more__doubles");

        if (parent.classList.contains("more__doubles-open")) {
            parent.classList.remove("more__doubles-open");
            toggleButton.textContent = "Раскрыть полностью";
        } else {
            parent.classList.add("more__doubles-open");
            toggleButton.textContent = "Скрыть";
        }
    });

    const moreCansInfo = document.querySelector('.more__cans-info');
    let isOpen = false;
    // Проверка ширины окна
    if (window.innerWidth < 1323) {
        moreDoublesHeight = (moreDoublesHeight.offsetHeight + 100) + 'px';
    }

    toggleButton.addEventListener('click', () => {

        if (isOpen) {
            // Если уже открыто, то закрываем и сбрасываем высоту
            moreCansInfo.style.cssText = ''; // или можно указать конкретную высоту, если нужно
        } else {
            // Если закрыто, то устанавливаем нужную высоту
            moreCansInfo.style.height = `calc(100% - ${moreDoublesHeight}px)`;
        }
        isOpen = !isOpen; // переключаем состояние
    });

    document.querySelector('.more__doubles-denied').addEventListener('click', () => {
        document.querySelector('.more__doubles').style.cssText = 'display: none;';
        document.querySelector('.more__cans-info').style.cssText = 'height: 100%;';
        document.querySelector('.more__main-content').classList.add('vacancies__content-one--undoubles');
        document.querySelector('.more__messages').classList.add('more__messages--active-full');
    })
});


//doubles expand sets end      height: calc(-440px + 100vh);