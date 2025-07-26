// script for scroll-x
// Function to check and toggle visibility of scroll buttons
function toggleScrollButtons() {
  const container = document.getElementById("scroll-wrapper");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnSet = document.querySelector(".btn-settings");

  if (window.innerWidth <= 772) {
    btnLeft.style.visibility = "hidden";
    btnRight.style.visibility = "hidden";
    console.log("123");
  } else if (container.scrollWidth > container.clientWidth) {
    btnLeft.style.visibility = "visible";
    btnRight.style.visibility = "visible";
    btnSet.style.cssText = "right: 100px; border-radius: 0;";
  } else {
    btnLeft.style.visibility = "hidden";
    btnRight.style.visibility = "hidden";
    btnSet.style.cssText = "right: 0; border-radius: 0 10px 10px 0;";
  }
}

// Initial check on page load
toggleScrollButtons();

// Check on window resize
window.addEventListener("resize", toggleScrollButtons);

// Event listeners for scroll buttons
document.getElementById("btn-left").onclick = function () {
  const container = document.getElementById("scroll-wrapper");
  sideScroll(container, "left", 25, 100, 10);
};

document.getElementById("btn-right").onclick = function () {
  const container = document.getElementById("scroll-wrapper");
  sideScroll(container, "right", 25, 100, 10);
};

// Scroll function
function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  const slideTimer = setInterval(function () {
    if (direction === "left") {
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

//всплывающее окно фильтров выбранных кандидатов
try {
  const multiSelect = () => {
    const elements = document.querySelectorAll(".cans__select-wrapper");
    elements.forEach((el) => {
      const choices = new Choices(el, {
        searchEnabled: false,
        itemSelectText: "",
        shouldSort: false,
      });
    });
  };

  multiSelect();
} catch {
  console.log("Не запустился выпадающий список");
}

let checkAllCans = document.getElementById("filter-choose-all");
let arrAllCans = [
  document.getElementById("cans-first"),
  document.getElementById("cans-second"),
  document.getElementById("cans-third"),
  document.getElementById("cans-fourth"),
  document.getElementById("cans-fifth"),
  document.getElementById("cans-sixth"),
  document.getElementById("cans-seventh"),
  document.getElementById("cans-eighth"),
];

try {
  checkAllCans.addEventListener("change", function (event) {
    if (event.currentTarget.checked) {
      document
        .getElementById("popupFilterCans")
        .classList.add("cans__filter--active");
      arrAllCans.forEach(function (el) {
        el.checked = true;
      });
    } else {
      document
        .getElementById("popupFilterCans")
        .classList.remove("cans__filter--active");
      arrAllCans.forEach(function (el) {
        el.checked = false;
      });
    }
  });
} catch {
  console.log("Не сработал выбор всех кандидатов");
}

try {
  arrAllCans.forEach(function (el) {
    el.addEventListener("change", function (checkbox) {
      if (checkbox.currentTarget.checked) {
        document
          .getElementById("popupFilterCans")
          .classList.add("cans__filter--active");
      } else {
        document
          .getElementById("popupFilterCans")
          .classList.remove("cans__filter--active");
      }
    });
  });
} catch {
  console.log('Не сработал чекбокс на "Список вакансий"');
}

try {
  document
    .getElementById("hide-filter-cans")
    .addEventListener("click", function () {
      document
        .getElementById("popupFilterCans")
        .classList.remove("cans__filter--active");
      arrAllCans.forEach(function (el) {
        el.checked = false;
      });
      checkAllCans.checked = false;
    });
} catch {
  console.log('Не сработал кнопка "Скрыть фильтр"');
}

//modal auto-setting in auto-choose
let autoSetBtn = document.querySelector(".can__btn-auto");

autoSetBtn.addEventListener("click", function () {
  document
    .getElementById("auto-popup-first")
    .classList.add("vacancies__item-popup--open");
  document.body.classList.toggle("stop-scroll");
});
document
  .getElementById("popup-first-close")
  .addEventListener("click", function () {
    document
      .getElementById("auto-popup-first")
      .classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

document.getElementById("add-new-auto").addEventListener("click", function () {
  document
    .getElementById("auto-popup-first")
    .classList.remove("vacancies__item-popup--open");
  document
    .getElementById("popup-auto-create")
    .classList.add("vacancies__item-popup--open");
});

document.querySelector(".new__close").addEventListener("click", function () {
  document
    .getElementById("popup-auto-create")
    .classList.remove("vacancies__item-popup--open");
  document
    .getElementById("auto-popup-first")
    .classList.add("vacancies__item-popup--open");
});

document
  .querySelector(".new__btn-cancel")
  .addEventListener("click", function () {
    document
      .getElementById("popup-auto-create")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.add("vacancies__item-popup--open");
  });

document
  .querySelector("#auto-popup-first .item__popup-wrapper")
  .addEventListener("click", (event) => {
    event._isClickWithInModal = true;
  });
document
  .getElementById("auto-popup-first")
  .addEventListener("click", (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .getElementById("popup-auto-create")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.add("vacancies__item-popup--open");
  }
});

document
  .querySelector("#popup-auto-create .item__popup-wrapper")
  .addEventListener("click", (event) => {
    event._isClickWithInModal = true;
  });
document
  .getElementById("popup-auto-create")
  .addEventListener("click", (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

let popupEditBtn = document.querySelectorAll(".auto__edit");

popupEditBtn.forEach(function (el) {
  el.addEventListener("click", function () {
    document
      .getElementById("popup-edit-desc")
      .classList.add("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.remove("vacancies__item-popup--open");
    document.body.classList.toggle("stop-scroll");
  });
});

document.querySelector(".edit__close").addEventListener("click", function () {
  document
    .getElementById("popup-edit-desc")
    .classList.remove("vacancies__item-popup--open");
  document
    .getElementById("auto-popup-first")
    .classList.add("vacancies__item-popup--open");
});

document.querySelector(".edit__cancel").addEventListener("click", function () {
  document
    .getElementById("popup-edit-desc")
    .classList.remove("vacancies__item-popup--open");
  document
    .getElementById("popup-auto-create")
    .classList.add("vacancies__item-popup--open");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .getElementById("popup-edit-desc")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.add("vacancies__item-popup--open");
  }
});

document
  .querySelector("#popup-edit-desc .item__popup-wrapper")
  .addEventListener("click", (event) => {
    event._isClickWithInModal = true;
  });
document
  .getElementById("popup-edit-desc")
  .addEventListener("click", (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

document.querySelectorAll(".auto__delete").forEach(function (el) {
  el.addEventListener("click", function () {
    document
      .getElementById("auto-popup-first")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("popup-del-quest")
      .classList.add("vacancies__item-popup--open");
    document.body.classList.toggle("stop-scroll");
  });
});

document
  .querySelector(".quest__btn-close")
  .addEventListener("click", function () {
    document
      .getElementById("popup-del-quest")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.add("vacancies__item-popup--open");
  });

document
  .querySelector(".quest__btn-cancel")
  .addEventListener("click", function () {
    document
      .getElementById("popup-del-quest")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.add("vacancies__item-popup--open");
  });

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .getElementById("popup-del-quest")
      .classList.remove("vacancies__item-popup--open");
    document
      .getElementById("auto-popup-first")
      .classList.add("vacancies__item-popup--open");
  }
});

document
  .querySelector("#popup-del-quest .item__popup-wrapper")
  .addEventListener("click", (event) => {
    event._isClickWithInModal = true;
  });
document
  .getElementById("popup-del-quest")
  .addEventListener("click", (event) => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .getElementById("auto-popup-first")
      .classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  }
});

//вызов выпадающих списков в окне нового автоподбора
try {
  const searchSelect = () => {
    const elements = document.querySelectorAll(".new__select-wrapper");
    elements.forEach((el) => {
      const choices = new Choices(el, {
        searchEnabled: true,
        itemSelectText: "",
        shouldSort: false,
        removeItemButton: true,
      });
    });
  };

  searchSelect();
} catch {
  console.log("Не запустился выпадающий список");
}

// созданиние списка для кнопка "определенные вакансии в блоке автоотбора"
let radioSpecific = document.getElementById("specific-vacancy");
let specificList = document.getElementById("specific-vacancy-wrapper");
let radioSpecificParent = radioSpecific.parentNode;

let arrGlobal = [
  document.getElementById("current-vacancy"),
  document.getElementById("all-vacancies"),
];

radioSpecific.addEventListener("click", function () {
  specificList.classList.add("specific--visible");
});

arrGlobal.forEach(function (el) {
  el.addEventListener("click", function () {
    specificList.classList.remove("specific--visible");
    radioSpecificParent.classList.remove("specific--style");
  });
});

radioSpecific.addEventListener("click", function () {
  radioSpecificParent.classList.add("specific--style");
});

//добавления окна проверки дублей
//clone's window in popup autoset
let checkClones = document.getElementById("search-duplicates");
let clonesInter = document.querySelector(".new__clones__item-hide");

checkClones.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    clonesInter.classList.add("new__clones--visible");
  } else {
    clonesInter.classList.remove("new__clones--visible");
  }
});

//tooltip
try {
  tippy("#myButton", {
    content:
      "Если установлено значение в 10 дней и первый кандидат получен 1 числа, то все кандидаты с такими же контактами, которые откликнутся с 1 по 10 число включительно, будут автоматически считаться дублями",
    theme: "jobers",
    maxWidth: 332,
  });
} catch {
  console.log(
    "Не найден блок типпи, в роли отображения тултипа в отображении дубликатов или нет(?)."
  );
}

// добавил дату в строку названия автоотбора
let date = new Date();
let day = date.getDate();
let monthIndex = date.getMonth();
let year = date.getFullYear();

let months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];
let monthName = months[monthIndex];

let formattedDate = day + " " + monthName + " " + year + " " + "года";
var ura = "Автоотбор от ";
document.getElementById("main-name").value = ura + formattedDate;

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
    const dropdownClose = dropdown.querySelector(".item__btn-close");
    const dropdownBack = dropdown.querySelector(".candidates__droplist-back");

    dropdownToggle.addEventListener("click", function () {
      if (dropdownMenu.classList.contains("dropdown--active")) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    dropdownClose.addEventListener("click", function () {
      closeDropdown();
    });

    dropdownBack.addEventListener("click", function () {
      closeDropdown();
    });

    function openDropdown() {
      dropdownMenu.style.display = "block";
      dropdownMenu.classList.add("dropdown--active");
      dropdownBack.classList.add("candidates__droplist-back--active");
      dropdown.setAttribute("data-state", "open");
    }

    function closeDropdown() {
      dropdownMenu.classList.remove("dropdown--active");
      dropdownBack.classList.remove("candidates__droplist-back--active");
      dropdownMenu.style.display = "none";
      dropdown.setAttribute("data-state", "closed");
    }
  });
});

//script for popup
// Функция для открытия всплывающего окна
function openPopup(popupId) {
  document.getElementById(popupId).classList.add("vacancies__item-popup--open");
  document.body.classList.add("stop-scroll");
}

// Функция для закрытия всплывающего окна
function closePopup(popupId) {
  document
    .getElementById(popupId)
    .classList.remove("vacancies__item-popup--open");
  document.body.classList.remove("stop-scroll");
}

// Функция для добавления обработчика события открытия всплывающего окна
function addPopupOpenHandler(buttonSelector, popupId) {
  document.querySelectorAll(buttonSelector).forEach(function (button) {
    button.addEventListener("click", function () {
      openPopup(popupId);
    });
  });
}

// Функция для добавления обработчика события закрытия всплывающего окна
function addPopupCloseHandler(closeButtonId, popupId) {
  document.getElementById(closeButtonId).addEventListener("click", function () {
    closePopup(popupId);
  });
}

// Функция для добавления обработчика события закрытия всплывающего окна при клике на фон
function addPopupCloseOnBackgroundClickHandler(popupId) {
  document.getElementById(popupId).addEventListener("click", function (event) {
    if (!event.target.closest(".item__popup-wrapper")) {
      closePopup(popupId);
    }
  });
}

// Функция для добавления обработчика события закрытия всплывающего окна при нажатии клавиши Esc
function addPopupCloseOnEscKeyHandler(popupId) {
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup(popupId);
    }
  });
}

// Открытие окна удаления вакансии
addPopupOpenHandler("#del-popup1", "del-popup");
addPopupCloseHandler("del-popup-close", "del-popup");
addPopupCloseOnBackgroundClickHandler("del-popup");
addPopupCloseOnEscKeyHandler("del-popup");

//close del-popup-close after click on del-no button
document.getElementById("del-no").addEventListener("click", function () {
  document
    .getElementById("del-popup")
    .classList.remove("vacancies__item-popup--open");
});

//call add can pop up
addPopupOpenHandler("#add-can", "add-can-field");
addPopupCloseHandler("add-can-close", "add-can-field");
addPopupCloseOnBackgroundClickHandler("add-can-field");
addPopupCloseOnEscKeyHandler("add-can-field");

//close pop up after click on add-no \ yes button
// document.getElementById('add-btn-save').addEventListener('click', function () {
//     document.getElementById('add-can-field').classList.remove('vacancies__item-popup--open');
// })

document
  .getElementById("add-btn-cancel")
  .addEventListener("click", function () {
    document
      .getElementById("add-can-field")
      .classList.remove("vacancies__item-popup--open");
  });

//move sidebar
let burgerTab = document.querySelector(".search-bar__burger");
let sideBar = document.querySelector(".nav__container");

burgerTab.addEventListener("click", function () {
  burgerTab.classList.toggle("search-bar__burger--active");
  sideBar.classList.toggle("nav__container--active");
  document.body.classList.toggle("stop-scroll");
});

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
      resultsBox.innerHTML = "";
    }
  };
}

// Отображение результатов
function displayResults(result, resultsBox) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)>" + list + "</li>";
  });
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

// Выбор варианта из выпадающего списка
function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultsBox.innerHTML = "";
}

// Основная логика
document.addEventListener("DOMContentLoaded", function () {
  const availableKeywords = [
    "Владимир Власов",
    "Андрей Власов",
    "Максим Власов",
    "Юрий Иванов",
    "Константин Хабенский",
    "Иван Грозный",
  ];
  const inputBox = document.getElementById("input-box");
  const resultsBox = document.querySelector(".search-bar__dropdown");

  // Функция для отображения последних элементов массива
  function displayLastKeywords(count) {
    const lastKeywords = availableKeywords.slice(-count);
    displayResults(lastKeywords, resultsBox);
  }

  // Обработчик события клика на поле ввода
  // inputBox.addEventListener('click', function () {
  //     if (inputBox.value === '') {
  //         displayLastKeywords(3); // Отображаем последние три элемента массива
  //     }
  // });

  // Обработчик события клика на документе
  document.addEventListener("click", function (event) {
    // Проверяем, был ли клик выполнен вне поля ввода поиска
    if (!inputBox.contains(event.target)) {
      // Сбрасываем результаты поиска
      resultsBox.innerHTML = "";
    }
  });

  try {
    inputBox.addEventListener(
      "keyup",
      handleInput(inputBox, availableKeywords, resultsBox)
    );
  } catch (err) {
    console.log("Не загрузился выпадающий поиск");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const availableKeywords = [
    "Владимир Власов",
    "Андрей Власов",
    "Максим Власов",
    "Юрий Иванов",
    "Константин Хабенский",
    "Иван Грозный",
  ];
  const inputBox = document.getElementById("input-box-candidates");
  const resultsBox = document.querySelector(".search-bar__dropdown-second");

  // Функция для отображения последних элементов массива
  function displayLastKeywords(count) {
    const lastKeywords = availableKeywords.slice(-count);
    displayResults(lastKeywords, resultsBox);
  }

  // Обработчик события клика на поле ввода
  inputBox.addEventListener("click", function () {
    if (inputBox.value === "") {
      displayLastKeywords(3); // Отображаем последние три элемента массива
    }
  });

  // Обработчик события клика на документе
  document.addEventListener("click", function (event) {
    // Проверяем, был ли клик выполнен вне поля ввода поиска
    if (!inputBox.contains(event.target)) {
      // Сбрасываем результаты поиска
      resultsBox.innerHTML = "";
    }
  });

  try {
    inputBox.addEventListener(
      "keyup",
      handleInput(inputBox, availableKeywords, resultsBox)
    );
  } catch (err) {
    console.log("Не загрузился выпадающий поиск");
  }
});

//code for popup 768
const morePopupBtn = document.getElementById("vacancies-popup-more");
const morePopupSpace = document.getElementById("vacancies-popup-options");
const popupBtnCloseFirst = document.getElementById("popup-btn-close-first");
const optionsBack = document.querySelector(".vacancies__options-back");

const togglePopup = () => {
  morePopupSpace.classList.toggle("vacancies__popup-768--active");
  optionsBack.classList.toggle("vacancies__options-back--active");
};

try {
  morePopupBtn.addEventListener("click", togglePopup);
  optionsBack.addEventListener("click", togglePopup);
  popupBtnCloseFirst.addEventListener("click", togglePopup);
} catch (error) {
  console.log(
    "Не найден элемент открытия дополнительных функций выделенных вакансий на странице вакансий."
  );
}

//start add-tag script
initializeTagInput("tag-input-1");
initializeTagInput("tag-input-2");
initializeTagInput("tag-input-3");
initializeTagInput("tag-input-4");
initializeTagInput("tag-input-5");
initializeTagInput("tag-input-6");
initializeTagInput("tag-input-7");
initializeTagInput("tag-input-8");
initializeTagInput("tag-input-1-mobile");
initializeTagInput("tag-input-2-mobile");
initializeTagInput("tag-input-3-mobile");
initializeTagInput("tag-input-4-mobile");
initializeTagInput("tag-input-5-mobile");
initializeTagInput("tag-input-6-mobile");
initializeTagInput("tag-input-7-mobile");
initializeTagInput("tag-input-8-mobile");

// программа по закрытию и открытию окон верхнерго бара справа
document.addEventListener("click", function (event) {
  // Проверка на клик по окнам уведомлений, поддержки и аккаунта, а также их кнопкам
  const clickedElement = event.target;

  // Списки элементов, которые не должны закрывать окна при клике
  const noCloseElements = [
    document.querySelector(".nots__container"),
    document.querySelector(".supp__container"),
    document.querySelector(".acc__container"),
    document.getElementById("note-btn"),
    document.getElementById("supp-btn"),
    document.getElementById("acc-btn"),
    document.querySelector(".search-bar__note"),
  ];

  // Если клик не по одному из этих элементов, закрываем окна
  if (!noCloseElements.some((el) => el && el.contains(clickedElement))) {
    // Закрытие окна уведомлений
    const notsContainer = document.querySelector(".nots__container");
    if (notsContainer.classList.contains("nots__container--active")) {
      notsContainer.classList.remove("nots__container--active");
      document
        .querySelector(".search-bar__note")
        .classList.remove("semi-color");
      document.querySelector(".body-page").classList.remove("scroll-stop");
    }

    // Закрытие окна поддержки
    const suppContainer = document.querySelector(".supp__container");
    if (suppContainer.classList.contains("supp__container--active")) {
      suppContainer.classList.remove("supp__container--active");
      document.getElementById("supp-btn").classList.remove("semi-color");
      document.querySelector(".body-page").classList.remove("scroll-stop");
    }

    // Закрытие окна аккаунта
    const accContainer = document.querySelector(".acc__container");
    if (accContainer.classList.contains("acc__container--active")) {
      accContainer.classList.remove("acc__container--active");
      document.getElementById("acc-btn").classList.remove("semi-color");
      document.querySelector(".body-page").classList.remove("scroll-stop");
    }
  }
});

// Открытие-закрытие окна уведомлений
document.getElementById("note-btn").addEventListener("click", function (event) {
  event.stopPropagation(); // Предотвращение всплытия события
  document
    .querySelector(".nots__container")
    .classList.toggle("nots__container--active");
  document.querySelector(".search-bar__note").classList.toggle("semi-color");
  document
    .querySelector(".supp__container")
    .classList.remove("supp__container--active");
  document.getElementById("supp-btn").classList.remove("semi-color");
  document
    .querySelector(".acc__container")
    .classList.remove("acc__container--active");
  document.getElementById("acc-btn").classList.remove("semi-color");
  // document.querySelector('.body-page').classList.toggle('scroll-stop');
});

// Открытие-закрытие окна поддержки
document.getElementById("supp-btn").addEventListener("click", function (event) {
  event.stopPropagation(); // Предотвращение всплытия события
  document
    .querySelector(".supp__container")
    .classList.toggle("supp__container--active");
  document.getElementById("supp-btn").classList.toggle("semi-color");
  document
    .querySelector(".nots__container")
    .classList.remove("nots__container--active");
  document.querySelector(".search-bar__note").classList.remove("semi-color");
  document
    .querySelector(".acc__container")
    .classList.remove("acc__container--active");
  document.getElementById("acc-btn").classList.remove("semi-color");
  // document.querySelector('.body-page').classList.toggle('scroll-stop');
});

// Открытие-закрытие окна аккаунта
document.getElementById("acc-btn").addEventListener("click", function (event) {
  event.stopPropagation(); // Предотвращение всплытия события
  document
    .querySelector(".acc__container")
    .classList.toggle("acc__container--active");
  document.getElementById("acc-btn").classList.toggle("semi-color");
  document
    .querySelector(".nots__container")
    .classList.remove("nots__container--active");
  document.querySelector(".search-bar__note").classList.remove("semi-color");
  document
    .querySelector(".supp__container")
    .classList.remove("supp__container--active");
  document.getElementById("supp-btn").classList.remove("semi-color");
  document.querySelector(".body-page").classList.toggle("scroll-stop");
});

// удаление стоп-скролл класса, если окно содержит класс отображения
// уведомления
document.getElementById("note-btn").addEventListener("click", function () {
  if (
    document
      .querySelector(".nots__container")
      .classList.contains("nots__container--active")
  ) {
    document.querySelector(".body-page").classList.add("scroll-stop");
  } else {
    document.querySelector(".body-page").classList.remove("scroll-stop");
  }
});

// поддержка
document.getElementById("supp-btn").addEventListener("click", function () {
  if (
    document
      .querySelector(".supp__container")
      .classList.contains("supp__container--active")
  ) {
    document.querySelector(".body-page").classList.add("scroll-stop");
  } else {
    document.querySelector(".body-page").classList.remove("scroll-stop");
  }
});

// acc
document.getElementById("acc-btn").addEventListener("click", function () {
  if (
    document
      .querySelector(".acc__container")
      .classList.contains("acc__container--active")
  ) {
    document.querySelector(".body-page").classList.add("scroll-stop");
  } else {
    document.querySelector(".body-page").classList.remove("scroll-stop");
  }
});

//city autocomplete
document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const autocompleteList = document.getElementById("autocomplete-list");
  const clearInput = document.getElementById("clear-input");

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Новосибирск",
    "Екатеринбург",
    "Казань",
    "Нижний Новгород",
    "Челябинск",
    "Самара",
    "Омск",
    "Ростов-на-Дону",
    "Уфа",
    "Красноярск",
    "Воронеж",
    "Пермь",
    "Волгоград",
  ];

  cityInput.addEventListener("input", function () {
    const query = cityInput.value.toLowerCase();
    autocompleteList.innerHTML = "";

    if (query === "") {
      showDefaultOptions();
      return;
    }

    const filteredCities = cities.filter((city) =>
      city.toLowerCase().includes(query)
    );

    if (filteredCities.length === 0) {
      autocompleteList.style.display = "none";
    } else {
      autocompleteList.style.display = "block";
    }

    filteredCities.forEach((city) => {
      const item = document.createElement("div");
      item.classList.add("autocomplete-item");
      item.innerText = city;
      item.addEventListener("click", function () {
        cityInput.value = city;
        autocompleteList.innerHTML = "";
        autocompleteList.style.display = "none";
        cityInput.classList.add("selected");
        clearInput.style.display = "inline";
      });
      autocompleteList.appendChild(item);
    });
  });

  cityInput.addEventListener("focus", function () {
    if (cityInput.value === "") {
      showDefaultOptions();
    }
  });

  document.addEventListener("click", function (e) {
    if (
      !autocompleteList.contains(e.target) &&
      e.target !== cityInput &&
      e.target !== clearInput
    ) {
      autocompleteList.innerHTML = "";
      autocompleteList.style.display = "none";
    }
  });

  clearInput.addEventListener("click", function () {
    cityInput.value = "";
    cityInput.classList.remove("selected");
    clearInput.style.display = "none";
    autocompleteList.innerHTML = "";
    autocompleteList.style.display = "none";
  });

  function showDefaultOptions() {
    autocompleteList.innerHTML = "";
    const defaultCities = ["Москва", "Санкт-Петербург"];
    defaultCities.forEach((city) => {
      const item = document.createElement("div");
      item.classList.add("autocomplete-item");
      item.innerText = city;
      item.addEventListener("click", function () {
        cityInput.value = city;
        autocompleteList.innerHTML = "";
        autocompleteList.style.display = "none";
        cityInput.classList.add("selected");
        clearInput.style.display = "inline";
      });
      autocompleteList.appendChild(item);
    });
    if (defaultCities.length > 0) {
      autocompleteList.style.display = "block";
    } else {
      autocompleteList.style.display = "none";
    }
  }
});

//программа для контроля чекбокса и введенных данных
document
  .getElementById("search-duplicates")
  .addEventListener("change", function () {
    var clonesLabel = document.getElementById("clones-label");
    var dayAmount = document.getElementById("day-amount");
    var errorSpan = clonesLabel.querySelector(".error");

    if (this.checked) {
      // clonesLabel.classList.add('visible');
      if (!dayAmount.value) {
        clonesLabel.classList.add("error--visible");
      }
    } else {
      clonesLabel.classList.remove("visible", "error--visible");
    }
  });

document.getElementById("day-amount").addEventListener("input", function () {
  var clonesLabel = document.getElementById("clones-label");

  if (this.value) {
    clonesLabel.classList.remove("error--visible");
  } else {
    clonesLabel.classList.add("error--visible");
  }
});

//проверка на выбор списка
document
  .getElementById("specific-vacancy")
  .addEventListener("change", function () {
    var specificWrapper = document.getElementById("specific-vacancy-wrapper");
    var errorSpan = document.querySelector(".new__current-label .error");
    var vacancyLabel = document.getElementById("specific-vacancy-label");

    if (this.checked) {
      specificWrapper.classList.add("specific--visible");
      var selectedItems = specificWrapper.querySelectorAll(
        ".droplist__items .check:checked"
      );
      if (selectedItems.length === 0) {
        errorSpan.style.display = "inline-block";
        errorSpan.style.cssText =
          "display: inline-block; top: 70px; width: auto;";
        specificWrapper.style.cssText =
          "outline: 1px solid red; border-radius: 5px;";
        vacancyLabel.style.marginBottom = "85px";
      }
    } else {
      specificWrapper.classList.remove("specific--visible");
      errorSpan.style.display = "none";
      vacancyLabel.style.marginBottom = "11px";
    }
  });

document
  .querySelectorAll("#specific-vacancy-wrapper .droplist__items .check")
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      var specificWrapper = document.getElementById("specific-vacancy-wrapper");
      var errorSpan = document.querySelector(".new__current-label .error");
      var selectedItems = specificWrapper.querySelectorAll(
        ".droplist__items .check:checked"
      );
      var vacancyLabel = document.getElementById("specific-vacancy-label");

      if (selectedItems.length > 0) {
        errorSpan.style.display = "none";
        vacancyLabel.style.marginBottom = "65px";
        specificWrapper.style.cssText = "outline: none; border-radius: 5px;";
        specificWrapper
          .querySelector(".droplist__selected")
          .classList.add("droplist__result_active");
      } else {
        errorSpan.style.display = "inline-block";
        vacancyLabel.style.marginBottom = "85px";
        specificWrapper.style.cssText =
          "outline: 1px solid red; border-radius: 5px;";
        specificWrapper
          .querySelector(".droplist__selected")
          .classList.remove("droplist__result_active");
      }
    });
  });

document
  .getElementById("current-vacancy")
  .addEventListener("change", function () {
    if (document.getElementById("current-vacancy").checked) {
      document.getElementById("specific-vacancy-label").style.marginBottom =
        "11px";
      document.getElementById("specific-vacancy-error").style.display = "none";
    } else {
      document.getElementById("specific-vacancy-label").style.backgroundColor =
        "green";
    }
  });

document
  .getElementById("all-vacancies")
  .addEventListener("change", function () {
    if (document.getElementById("current-vacancy").checked) {
      document.getElementById("specific-vacancy-label").style.backgroundColor =
        "green";
    } else {
      document.getElementById("specific-vacancy-label").style.marginBottom =
        "11px";
      document.getElementById("specific-vacancy-error").style.display = "none";
    }
  });

//droplist in new can create
// document.addEventListener('DOMContentLoaded', function () {
//     const dropdownContainer = document.querySelector('.dropdown-container');
//     const selectedValue = dropdownContainer.querySelector('.selected-value');
//     const inputPlaceholder = selectedValue.querySelector('.input-placeholder');
//     const dropdownIconDown = selectedValue.querySelector('.icon-down');
//     const dropdownIconUp = selectedValue.querySelector('.icon-up');
//     const dropdownList = dropdownContainer.querySelector('.dropdown-list');
//     const tagsContainer = selectedValue.querySelector('.tags');
//
//     selectedValue.addEventListener('click', (event) => {
//         event.stopPropagation(); // Остановить всплытие события
//         const isExpanded = dropdownList.style.display === 'block';
//         dropdownList.style.display = isExpanded ? 'none' : 'block';
//         dropdownIconDown.style.display = isExpanded ? 'block' : 'none';
//         dropdownIconUp.style.display = isExpanded ? 'none' : 'block';
//         inputPlaceholder.style.color = isExpanded ? '#9098b4' : '#2f353d';
//     });
//
//     dropdownList.addEventListener('click', (event) => {
//         event.stopPropagation(); // Остановить всплытие события
//         const item = event.target.closest('.dropdown-item');
//         if (item) {
//             const checkbox = item.querySelector('input');
//             checkbox.checked = !checkbox.checked;
//
//             if (checkbox.checked) {
//                 addTag(item.dataset.value);
//             } else {
//                 removeTag(item.dataset.value);
//             }
//         }
//     });
//
//     function addTag(value) {
//         // Проверяем, существует ли уже тег с таким значением
//         if (!tagsContainer.querySelector(`.tag[data-value="${value}"]`)) {
//             const tag = document.createElement('div');
//             tag.className = 'tag';
//             tag.dataset.value = value;
//             tag.innerHTML = `${value} <span class="remove-tag"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <g clip-path="url(#clip0_5360_6349)">
//     <path d="M12.5 3.5L3.5 12.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//     <path d="M12.5 12.5L3.5 3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
//   </g>
//   <defs>
//     <clipPath id="clip0_5360_6349">
//       <rect width="16" height="16" fill="white" />
//     </clipPath>
//   </defs>
// </svg></span>`;
//             tag.querySelector('.remove-tag').addEventListener('click', (event) => {
//                 event.stopPropagation(); // Остановить всплытие события
//                 removeTag(value);
//                 const item = dropdownList.querySelector(`.dropdown-item[data-value="${value}"]`);
//                 if (item) {
//                     item.querySelector('input').checked = false;
//                 }
//             });
//             tagsContainer.appendChild(tag);
//             updateInputPlaceholder();
//         }
//     }
//
//     function removeTag(value) {
//         const tag = tagsContainer.querySelector(`.tag[data-value="${value}"]`);
//         if (tag) {
//             tagsContainer.removeChild(tag);
//             updateInputPlaceholder();
//         }
//     }
//
//     function updateInputPlaceholder() {
//         if (tagsContainer.children.length === 0) {
//             inputPlaceholder.textContent = 'Выберите вакансию';
//         } else {
//             inputPlaceholder.textContent = '';
//         }
//     }
//
//     // Закрытие выпадающего списка при клике вне его
//     document.addEventListener('click', () => {
//         dropdownList.style.display = 'none';
//         dropdownIconDown.style.display = 'block';
//         dropdownIconUp.style.display = 'none';
//         inputPlaceholder.style.color = '#9098b4';
//     });
// });

//open preview can
addPopupOpenHandler(".open-preview", "popup2");
addPopupCloseHandler("popup2-close", "popup2");
addPopupCloseOnBackgroundClickHandler("popup2");
addPopupCloseOnEscKeyHandler("popup2");

//required inputs
function handleInputValidation() {
  var inputs = document.querySelectorAll(".new__add-name__input[required]");
  inputs.forEach(function (input) {
    var parent = input.closest(".new__add-name");
    input.addEventListener("blur", function () {
      if (!this.value.trim()) {
        parent.classList.add("error--visible");
      } else {
        parent.classList.remove("error--visible");
      }
    });
  });
}

handleInputValidation();

//check droplist
function validateSelection() {
  var specificWrapper = document.querySelector(".new-can__dropdown");
  var errorSpan = specificWrapper.querySelector(".error");
  var selectedItems = specificWrapper.querySelectorAll(
    ".droplist__items .check:checked"
  );
  var vacancyLabel = specificWrapper.querySelector(".droplist__result_text");

  // Проверяем, выбран ли хотя бы один чекбокс
  if (selectedItems.length > 0) {
    // Если выбран хотя бы один чекбокс, скрываем сообщение об ошибке
    errorSpan.style.display = "none";
    vacancyLabel.style.marginBottom = "16px";
    specificWrapper.style.cssText = "outline: none; border-radius: 5px;";
    specificWrapper
      .querySelector(".droplist__selected")
      .classList.add("droplist__result_active");
  } else {
    // Если ни один чекбокс не выбран, показываем сообщение об ошибке
    errorSpan.style.display = "inline-block";
    vacancyLabel.style.marginBottom = "35px";
    specificWrapper.style.cssText =
      "outline: 1px solid red; border-radius: 5px; margin-bottom: 40px; height: 40px;";
    specificWrapper
      .querySelector(".droplist__selected")
      .classList.remove("droplist__result_active");
  }
}

document
  .getElementById("add-btn-save")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы, если это необходимо
    validateSelection();
  });

var checkboxes = document.querySelectorAll(".droplist__items .check");
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    validateSelection();
  });
});

// Функция для генерации пагинации
function generatePagination(currentPage, totalPages) {
  const paginationWrapper = document.getElementById("pagination");
  paginationWrapper.innerHTML = ""; // Очищаем старую пагинацию

  // Стрелка "Назад"
  if (currentPage > 1) {
    const prevButton = createPaginationButton(
      "prev",
      currentPage - 1,
      false,
      true
    );
    paginationWrapper.appendChild(prevButton);
  }

  // Первая страница всегда отображается
  paginationWrapper.appendChild(
    createPaginationButton(1, 1, currentPage === 1)
  );

  if (currentPage > 4) {
    // Три точки перед серединой, если текущая страница дальше четвертой
    const dots = document.createElement("span");
    dots.classList.add("pagination-break");
    dots.textContent = "...";
    paginationWrapper.appendChild(dots);
  }

  // Средние страницы
  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    paginationWrapper.appendChild(
      createPaginationButton(i, i, currentPage === i)
    );
  }

  if (currentPage < totalPages - 3) {
    // Три точки перед последними страницами
    const dots = document.createElement("span");
    dots.textContent = "...";
    paginationWrapper.appendChild(dots);
  }

  // Последняя страница всегда отображается
  if (totalPages > 1) {
    paginationWrapper.appendChild(
      createPaginationButton(totalPages, totalPages, currentPage === totalPages)
    );
  }

  // Стрелка "Вперед"
  if (currentPage < totalPages) {
    const nextButton = createPaginationButton(
      "next",
      currentPage + 1,
      false,
      true
    );
    paginationWrapper.appendChild(nextButton);
  }
}

// Вспомогательная функция для создания кнопки пагинации
// Функция для создания кнопки пагинации
function createPaginationButton(text, page, isActive = false, isArrow = false) {
  const button = document.createElement("button");
  button.classList.add("can__pagination-btn");

  if (isArrow) {
    button.classList.add("arrow-btn"); // Добавляем класс для стрелок
  } else {
    button.classList.add("number-btn"); // Добавляем класс для цифр
  }

  if (isActive) {
    button.classList.add("active");
    button.disabled = true;
  }

  // Проверка: если это стрелка назад или вперед, добавляем SVG
  if (isArrow && text === "prev") {
    button.innerHTML = `
           <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M7.94219 12.8078C8.00026 12.8659 8.04632 12.9348 8.07775 13.0107C8.10918 13.0866 8.12535 13.1679 8.12535 13.25C8.12535 13.3321 8.10918 13.4134 8.07775 13.4893C8.04632 13.5652 8.00026 13.6341 7.94219 13.6922C7.88412 13.7503 7.81518 13.7963 7.73931 13.8277C7.66344 13.8592 7.58213 13.8753 7.5 13.8753C7.41788 13.8753 7.33656 13.8592 7.26069 13.8277C7.18482 13.7963 7.11588 13.7503 7.05782 13.6922L0.807816 7.44218C0.749705 7.38414 0.703606 7.31521 0.672154 7.23933C0.640701 7.16346 0.624512 7.08213 0.624512 7C0.624512 6.91786 0.640701 6.83653 0.672154 6.76066C0.703606 6.68478 0.749705 6.61585 0.807816 6.55781L7.05782 0.307809C7.17509 0.190534 7.33415 0.124649 7.5 0.124649C7.66586 0.124649 7.82492 0.190534 7.94219 0.307809C8.05947 0.425084 8.12535 0.584144 8.12535 0.749997C8.12535 0.915849 8.05947 1.07491 7.94219 1.19218L2.1336 7L7.94219 12.8078Z" fill="#2F353D" />
           </svg>
        `;
    button.style.marginRight = "14px";
  } else if (isArrow && text === "next") {
    // Добавим стрелку вперед
    button.innerHTML = `
           <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M8.19205 7.44218L1.94205 13.6922C1.88398 13.7503 1.81504 13.7963 1.73917 13.8277C1.6633 13.8592 1.58198 13.8753 1.49986 13.8753C1.41774 13.8753 1.33642 13.8592 1.26055 13.8277C1.18468 13.7963 1.11574 13.7503 1.05767 13.6922C0.999603 13.6341 0.95354 13.5652 0.922113 13.4893C0.890687 13.4134 0.874512 13.3321 0.874512 13.25C0.874512 13.1679 0.890687 13.0866 0.922113 13.0107C0.95354 12.9348 0.999603 12.8659 1.05767 12.8078L6.86627 7L1.05767 1.19218C0.940396 1.07491 0.874512 0.915849 0.874512 0.749997C0.874512 0.584144 0.940396 0.425084 1.05767 0.307809C1.17495 0.190534 1.33401 0.124649 1.49986 0.124649C1.66571 0.124649 1.82477 0.190534 1.94205 0.307809L8.19205 6.55781C8.25016 6.61585 8.29626 6.68478 8.32771 6.76066C8.35916 6.83653 8.37535 6.91786 8.37535 7C8.37535 7.08213 8.35916 7.16346 8.32771 7.23933C8.29626 7.31521 8.25016 7.38414 8.19205 7.44218Z" fill="#2F353D" />
           </svg>
        `;
    button.style.marginLeft = "14px";
  } else {
    button.textContent = text; // Обычные кнопки с номерами страниц
  }

  button.addEventListener("click", () => {
    generatePagination(page, 24); // Обновляем пагинацию
  });

  return button;
}

// Генерируем пагинацию для первой страницы
generatePagination(1, 24);

// // добавляем последней кнопке класс для отступа
// function highlightLastNumberButton() {
//     const numberButtons = document.querySelectorAll('.number-btn');
//
//     if (numberButtons.length > 0) {
//         numberButtons[numberButtons.length - 1].classList.add('last-number-btn');
//     }
// }
//
// // Вызываем после генерации пагинации
// highlightLastNumberButton();
