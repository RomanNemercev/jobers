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

//auto scroll on history page
new SimpleBar(document.getElementById('messageContainer'));
// Прокрутка до последнего сообщения
document.addEventListener("DOMContentLoaded", function () {
    var simpleBarInstance = new SimpleBar(document.getElementById('messageContainer'));
    var scrollElement = simpleBarInstance.getScrollElement();
    scrollElement.scrollTop = scrollElement.scrollHeight;
});

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
            if (textContainer.scrollHeight <= 60) {
                button.style.display = 'none';
                fadeOverlay.style.background = 'transparent';
            } else {
                button.style.display = 'block';
                fadeOverlay.style.background = null; // reset to default
            }
        }

        function expandText() {
            if (textContainer.style.maxHeight === '100%') {
                textContainer.style.maxHeight = '60px';
                textContainer.classList.remove('expanded');
                button.innerText = 'Развернуть';
            } else {
                textContainer.style.maxHeight = '100%';
                textContainer.classList.add('expanded');
                button.innerText = 'Свернуть';
            }
            toggleVisible();
        }

        button.addEventListener('click', expandText);
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
function updateTextareaIndent() {
    var overlayWidth = document.getElementById("chat-select").offsetWidth;
    var totalIndent = overlayWidth + 30; // Добавляем 30px к ширине overlay
    document.getElementById("chat-textarea").style.textIndent = totalIndent + "px";
}

function updatePlaceholderIndent() {
    var overlayWidth = document.getElementById("chat-select").offsetWidth;
    var totalIndent = overlayWidth + 30; // Добавляем 30px к ширине overlay
    var placeholderSpaces = Math.ceil(overlayWidth / 8); // Округляем до ближайшего целого числа символов
    var placeholderText = "Введите ваше сообщение";
    document.getElementById("chat-textarea").setAttribute("placeholder", placeholderText);
}

document.getElementById("chat-select").addEventListener("change", function () {
    updateTextareaIndent();
    updatePlaceholderIndent();
});

document.getElementById("chat-select").addEventListener("input", function () {
    updateTextareaIndent();
    updatePlaceholderIndent();
});

document.getElementById("chat-textarea").addEventListener("input", function () {
    updateTextareaIndent();
});

// Инициализация
updateTextareaIndent();
updatePlaceholderIndent();

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

