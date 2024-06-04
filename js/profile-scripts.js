// custom btn and check on upload file
let button = document.getElementById('upload-btn');
let fileInput = document.getElementById('file-upload');

const img_container = document.querySelector('.change__preview');
const img = document.querySelector('.change__background');

// При нажатии на кнопку
button.addEventListener('click', function() {
    if (button.innerText === 'Загрузить') {
        // В этом случае открываем диалоговое окно для выбора файла
        fileInput.click();
    } else {
        // Если файл уже загружен, удаляем его
        fileInput.value = "";
        button.innerText = 'Загрузить';
        button.style.color = '#5898ff';
        img_container.style.display = 'none'; // Скрываем блок после удаления файла
    }
});

// При выборе файла
fileInput.addEventListener('change', function() {
    // Если файл выбран, меняем текст кнопки
    if (fileInput.files.length > 0) {
        button.innerText = 'Удалить';
        button.style.color = '#f50a0a';

        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            const result = reader.result;
            img.src = result;
            img_container.style.display = 'block';
            // file_name.innerText = file.name;
        }
        reader.readAsDataURL(file);
    }
});

//valid phone number in input
// Функция для форматирования номера телефона
const formatPhoneNumber = (input) => {
    // Обработчик фокуса на поле ввода
    input.addEventListener('focus', () => {
        if (!input.value) {
            input.value = '+7 (';
        }
        input.placeholder = '+7 (___) ___-__-__';
        input.classList.add('focused');

        // Установить позицию курсора после "+7 ("
        setTimeout(() => {
            input.setSelectionRange(4, 4);
        }, 0);
    });

    // Обработчик потери фокуса на поле ввода
    input.addEventListener('blur', () => {
        if (input.value === '+7 (') {
            input.value = '';
            input.placeholder = '+7';
        }
        input.classList.remove('focused');
    });

    // Обработчик ввода в поле
    input.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, '');
        let formattedInput = '+7 (';

        if (value.length > 1) {
            formattedInput += value.substring(1, 4);
        }
        if (value.length >= 5) {
            formattedInput += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formattedInput += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formattedInput += '-' + value.substring(9, 11);
        }

        event.target.value = formattedInput;

        // Установить позицию курсора после последнего введенного символа
        const cursorPosition = formattedInput.length;
        setTimeout(() => {
            event.target.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
    });
};

// Функция для применения форматирования ко всем элементам с определенным классом
const applyPhoneNumberFormatting = (className) => {
    const phoneInputs = document.querySelectorAll(`.${className}`);
    phoneInputs.forEach(input => formatPhoneNumber(input));
};

// Применение форматирования ко всем полям ввода с классом "phone-input"
document.addEventListener('DOMContentLoaded', () => {
    applyPhoneNumberFormatting('phone-input');
});

// Открытие change окна
addPopupOpenHandler('#change-open', 'edit-popup');
addPopupCloseHandler('popup-edit-close', 'edit-popup');
addPopupCloseOnBackgroundClickHandler('edit-popup');
addPopupCloseOnEscKeyHandler('edit-popup');

document.querySelector('.change__btn-cancel').addEventListener('click', function () {
    document.getElementById('edit-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// Открытие save окна
addPopupOpenHandler('#final-save', 'save-popup');
addPopupCloseHandler('popup-save-close', 'save-popup');
addPopupCloseOnBackgroundClickHandler('save-popup');
addPopupCloseOnEscKeyHandler('save-popup');

