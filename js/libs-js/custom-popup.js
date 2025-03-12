// script for popup
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
function addPopupCloseHandler(closeButtonSelector, popupId) {
    document.querySelectorAll(closeButtonSelector).forEach(function (button) {
        button.addEventListener('click', function () {
            closePopup(popupId);
        });
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

// Пример использования для нескольких всплывающих окон
// addPopupOpenHandler('.open-popup1', 'popup1');
// addPopupCloseHandler('.popup1-close', 'popup1');
// addPopupCloseOnBackgroundClickHandler('popup1');
// addPopupCloseOnEscKeyHandler('popup1');
//
// addPopupOpenHandler('.open-popup2', 'popup2');
// addPopupCloseHandler('.popup2-close', 'popup2');
// addPopupCloseOnBackgroundClickHandler('popup2');
// addPopupCloseOnEscKeyHandler('popup2');
