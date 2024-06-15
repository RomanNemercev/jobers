// custom btn and check on upload file
let button = document.getElementById('upload-btn');
let fileInput = document.getElementById('file-upload');

const img_container = document.querySelector('.change__preview');
const img = document.querySelector('.change__background');

// При нажатии на кнопку
button.addEventListener('click', function () {
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
fileInput.addEventListener('change', function () {
    // Если файл выбран, меняем текст кнопки
    if (fileInput.files.length > 0) {
        button.innerText = 'Удалить';
        button.style.color = '#f50a0a';

        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
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
    input.addEventListener('focus', () => {
        if (!input.value) {
            input.value = '+7 (';
        }
        input.placeholder = '+7 (___) ___-__-__';
        input.classList.add('focused');
        setTimeout(() => {
            input.setSelectionRange(4, 4);
        }, 0);
    });

    input.addEventListener('blur', () => {
        if (input.value === '+7 (') {
            input.value = '';
            input.placeholder = '+7';
        }
        input.classList.remove('focused');
    });

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

// Функция для проверки валидации инпутов
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

// Применение форматирования и валидации после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    applyPhoneNumberFormatting('phone-input');
    handleInputValidation();
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

//validate data on enter a new pass
document.addEventListener("DOMContentLoaded", function () {
    const currentPassInput = document.getElementById('current-pass');
    const newPassInput = document.getElementById('new-pass');
    const repeatPassInput = document.getElementById('repeat-pass');
    const saveButton = document.getElementById('final-save');

    function validateInputs() {
        const currentPass = currentPassInput.value.trim();
        const newPass = newPassInput.value.trim();
        const repeatPass = repeatPassInput.value.trim();

        if (currentPass && newPass && repeatPass && newPass === repeatPass) {
            saveButton.disabled = false;
            saveButton.classList.remove('btn-disable');
            saveButton.classList.add('btn');
        } else {
            saveButton.disabled = true;
            saveButton.classList.add('btn-disable');
            saveButton.classList.remove('btn');
        }
    }

    currentPassInput.addEventListener('input', validateInputs);
    newPassInput.addEventListener('input', validateInputs);
    repeatPassInput.addEventListener('input', validateInputs);
});

$('.switch__button').click(function () {
    $(this).toggleClass('active');
});

// Открытие окна нового менеджера
addPopupOpenHandler('.add-new-man', 'popup-add-new-man');
addPopupCloseHandler('close-new-man', 'popup-add-new-man');
addPopupCloseOnBackgroundClickHandler('popup-add-new-man');
addPopupCloseOnEscKeyHandler('popup-add-new-man');

document.getElementById('add-new-man-cancel').addEventListener('click', function () {
    document.getElementById('popup-add-new-man').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// редактирование менеджера
addPopupOpenHandler('.edit-mans', 'edit-man-popup');
addPopupCloseHandler('.edit-man-close', 'edit-man-popup');
addPopupCloseOnBackgroundClickHandler('edit-man-popup');
addPopupCloseOnEscKeyHandler('edit-man-popup');

document.getElementById('edit-man-popup-cancel').addEventListener('click', function () {
    document.getElementById('edit-man-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// удаление менеджера
addPopupOpenHandler('.delete-mans', 'delete-man-popup');
addPopupCloseHandler('.popup-delete-close', 'delete-man-popup');
addPopupCloseOnBackgroundClickHandler('delete-man-popup');
addPopupCloseOnEscKeyHandler('delete-man-popup');

document.getElementById('delete-man-popup-cancel').addEventListener('click', function () {
    document.getElementById('delete-man-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

let vacancyBox =
    `<div class="field__box">
    <p class="field__name_popup field__box_mb">Вакансии Jobers</p>
    <div class="droplist droplist__select">
        <div class="form__list" action="">
            <div class="droplist__selected item droplist__result item"><span class="droplist__result_text">Выберите вариант</span> <span class="droplist__icon droplist__icon_cross"></span>
                <svg class="droplist__icon droplist__icon_arrow" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.222 2.34695L7.59695 7.97195C7.51857 8.05061 7.42542 8.11303 7.32286 8.15561C7.2203 8.1982 7.11035 8.22012 6.9993 8.22012C6.88825 8.22012 6.77829 8.1982 6.67573 8.15561C6.57317 8.11303 6.48003 8.05061 6.40164 7.97195L0.776641 2.34695C0.618132 2.18845 0.529083 1.97346 0.529083 1.7493C0.529083 1.52513 0.618132 1.31015 0.776641 1.15164C0.935149 0.993133 1.15013 0.904085 1.3743 0.904085C1.59846 0.904085 1.81344 0.993133 1.97195 1.15164L7 6.17969L12.028 1.15094C12.1866 0.992431 12.4015 0.903381 12.6257 0.903381C12.8499 0.903381 13.0648 0.992431 13.2234 1.15094C13.3819 1.30945 13.4709 1.52443 13.4709 1.7486C13.4709 1.97276 13.3819 2.18774 13.2234 2.34625L13.222 2.34695Z" fill="#9098B4"/>
                </svg>
            </div>
            <ul class="droplist__items">
                <li class="droplist__item">Менеджер по продажам (ID 424)</li>
                <li class="droplist__item">Повар в цех (ID 4232)</li>
            </ul>
        </div>
    </div>
</div>
<div class="field__box">
    <p class="field__name_popup field__box_mb">Воронка/Статус</p>
    <div class="droplist droplist__select">
        <div class="form__list" action="">
            <div class="droplist__selected item droplist__result item"><span class="droplist__result_text">Выберите вариант</span> <span class="droplist__icon droplist__icon_cross"></span>
                <svg class="droplist__icon droplist__icon_arrow" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.222 2.34695L7.59695 7.97195C7.51857 8.05061 7.42542 8.11303 7.32286 8.15561C7.2203 8.1982 7.11035 8.22012 6.9993 8.22012C6.88825 8.22012 6.77829 8.1982 6.67573 8.15561C6.57317 8.11303 6.48003 8.05061 6.40164 7.97195L0.776641 2.34695C0.618132 2.18845 0.529083 1.97346 0.529083 1.7493C0.529083 1.52513 0.618132 1.31015 0.776641 1.15164C0.935149 0.993133 1.15013 0.904085 1.3743 0.904085C1.59846 0.904085 1.81344 0.993133 1.97195 1.15164L7 6.17969L12.028 1.15094C12.1866 0.992431 12.4015 0.903381 12.6257 0.903381C12.8499 0.903381 13.0648 0.992431 13.2234 1.15094C13.3819 1.30945 13.4709 1.52443 13.4709 1.7486C13.4709 1.97276 13.3819 2.18774 13.2234 2.34625L13.222 2.34695Z" fill="#9098B4"/>
                </svg>
            </div>
            <ul class="droplist__items">
                <li class="droplist__item">Воронка</li>
                <li class="droplist__item">ВПО: ВЗЯТО В РАБОТУ</li>
            </ul>
        </div>
    </div>
</div>`

$('.add__vacancy').click(function (e) {
    $(this).parent('.fileld__box_addvacancy').prepend(vacancyBox);
    dropL();
});

// интеграция амо
addPopupOpenHandler('.crm__get-sets', 'amo-connect-popup');
addPopupCloseHandler('popup-amo-close', 'amo-connect-popup');
addPopupCloseOnBackgroundClickHandler('amo-connect-popup');
addPopupCloseOnEscKeyHandler('amo-connect-popup');

document.getElementById('amo-connect-cancel').addEventListener('click', function () {
    document.getElementById('amo-connect-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// интеграция bitrix
addPopupOpenHandler('.crm__bitrix-get', 'bitrix-popup');
addPopupCloseHandler('popup-bitrix-close', 'bitrix-popup');
addPopupCloseOnBackgroundClickHandler('bitrix-popup');
addPopupCloseOnEscKeyHandler('bitrix-popup');

document.getElementById('bitrix-connect-cancel').addEventListener('click', function () {
    document.getElementById('bitrix-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// интеграция potok
addPopupOpenHandler('.crm__potok-sets', 'potok-popup');
addPopupCloseHandler('popup-potok-close', 'potok-popup');
addPopupCloseOnBackgroundClickHandler('potok-popup');
addPopupCloseOnEscKeyHandler('potok-popup');

document.getElementById('potok-sets-cancel').addEventListener('click', function () {
    document.getElementById('potok-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// шаблоны добавить новый
addPopupOpenHandler('.temps__add-new', 'temps-popup');
addPopupCloseHandler('popup-temps-close', 'temps-popup');
addPopupCloseOnBackgroundClickHandler('temps-popup');
addPopupCloseOnEscKeyHandler('temps-popup');

document.getElementById('temps-add-new-cancel').addEventListener('click', function () {
    document.getElementById('temps-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

//начало скриптов по редактированию шаблонов
// редактировать подумать
addPopupOpenHandler('.edit-think', 'temps-popup-think');
addPopupCloseHandler('popup-temps-think-close', 'temps-popup-think');
addPopupCloseOnBackgroundClickHandler('temps-popup-think');
addPopupCloseOnEscKeyHandler('temps-popup-think');

document.getElementById('temps-think-cancel').addEventListener('click', function () {
    document.getElementById('temps-popup-think').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

// подтверждение удаления шаблона
addPopupOpenHandler('.delete__temp', 'delete-popup');
addPopupCloseHandler('popup-delete-temp-close', 'delete-popup');
addPopupCloseOnBackgroundClickHandler('delete-popup');
addPopupCloseOnEscKeyHandler('delete-popup');

document.getElementById('delete-temp-cancel').addEventListener('click', function () {
    document.getElementById('delete-popup').classList.remove('vacancies__item-popup--open');
    document.body.classList.remove('stop-scroll');
})

document.querySelector('.delete__temp').addEventListener('click', function () {
    document.getElementById('temps-popup-think').classList.remove('vacancies__item-popup--open');
})

//passEye script
function togglePassword(fieldId, button) {
    var field = document.getElementById(fieldId);
    if (field.type === "password") {
        field.type = "text";
        button.style.backgroundImage = "url('../img/passEyeVisible.svg')";
    } else {
        field.type = "password";
        button.style.backgroundImage = "url('../img/passEyeHide.svg')";
    }
}