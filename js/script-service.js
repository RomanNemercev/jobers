//search-city module
//search city place
let suggestions = [
  "Санкт-Петербург",
  "Невский проспект, Санкт-Петербург",
  "Дворцовая площадь, Санкт-Петербург",
  "Колпинский район, Санкт-Петербург",
  // любой список городов
];

let inputSearch = document.getElementById("search");
let suggestionsPane = document.getElementById("suggestions-pane");

inputSearch.addEventListener("keyup", function (event) {
  let value = event.target.value;
  suggestionsPane.innerHTML = '';
  let filteredSuggestions = suggestions.filter(function (suggestion) {
    // проверка на строки, содержащие введенные данные
    return suggestion.toLowerCase().includes(value.toLowerCase());
  });
  if (value && filteredSuggestions.length > 0) {
    suggestionsPane.style.display = 'block';
    filteredSuggestions.forEach(function (filteredSuggestion) {
      let div = document.createElement("div");
      div.textContent = filteredSuggestion;
      div.className = 'suggestion';
      div.addEventListener("click", function () {
        inputSearch.value = div.textContent;
        suggestionsPane.style.display = 'none';
      });
      suggestionsPane.appendChild(div);
    });
  } else {
    suggestionsPane.style.display = 'none';
  }
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('.search-box')) {
    suggestionsPane.innerHTML = '';
    suggestionsPane.style.display = 'none';
  }
});

//end search city module

// sticky basket script
document.addEventListener('DOMContentLoaded', function() {
  const basketWrapper = document.querySelector('.service__basket-wrapper');
  const mainContainer = document.querySelector('.service__main-container');
  const toggleButton = document.querySelector('.service__basket-toggle');
  const backButton = document.querySelector('.service__mobile-back');

  // Получаем начальную позицию блока корзины
  const basketOffsetTop = basketWrapper.getBoundingClientRect().top + window.scrollY;

  // Функция для обработки скролла
  function handleScroll() {
    // Проверяем ширину экрана
    if (window.innerWidth <= 768) {
      basketWrapper.classList.remove('service__basket-wrapper--sticky');
      basketWrapper.style.position = '';
      basketWrapper.style.top = '';
      basketWrapper.style.bottom = '';
      return; // Прерываем выполнение для малых разрешений
    }

    if (window.innerWidth <= 870) {
      // Если ширина <= 870px, сбрасываем стили и отключаем фиксацию
      basketWrapper.classList.remove('service__basket-wrapper--sticky');
      basketWrapper.style.position = 'relative';
      basketWrapper.style.top = 'auto';
      basketWrapper.style.bottom = 'auto';
      return; // Прерываем выполнение функции
    }

    const scrollTop = window.scrollY;
    const mainContainerRect = mainContainer.getBoundingClientRect();
    const mainContainerBottom = mainContainerRect.bottom + scrollTop;

    // Если прокрутка достигла точки, где корзина должна стать фиксированной
    if (scrollTop >= basketOffsetTop - 90) {
      basketWrapper.classList.add('service__basket-wrapper--sticky');

      // Проверяем, чтобы корзина не уходила за нижнюю границу контейнера
      const basketHeight = basketWrapper.offsetHeight;
      if (scrollTop + basketHeight + 20 > mainContainerBottom) {
        basketWrapper.style.position = 'absolute';
        basketWrapper.style.top = 'auto';
        basketWrapper.style.bottom = '0';
      } else {
        basketWrapper.style.position = 'fixed';
        basketWrapper.style.top = '90px';
        basketWrapper.style.bottom = 'auto';
      }
    } else {
      basketWrapper.classList.remove('service__basket-wrapper--sticky');
      basketWrapper.style.position = 'relative';
      basketWrapper.style.top = 'auto';
      basketWrapper.style.bottom = 'auto';
    }
  }

  // Закрытие попапа при клике на .service__mobile-back
  backButton.addEventListener('click', function() {
    if (basketWrapper.classList.contains('service__basket-wrapper--popup')) {
      basketWrapper.classList.remove('service__basket-wrapper--popup');
      document.body.style.overflow = '';
    }
  });

  // Переключение попапа
  toggleButton.addEventListener('click', function() {
    basketWrapper.classList.toggle('service__basket-wrapper--popup');
    // Блокируем прокрутку страницы при открытом попапе
    document.body.style.overflow = basketWrapper.classList.contains('service__basket-wrapper--popup') ? 'hidden' : '';
  });

  // Отслеживаем прокрутку
  window.addEventListener('scroll', handleScroll);

  // Отслеживаем изменение размера окна
  window.addEventListener('resize', handleScroll);

  // Вызываем функцию сразу, чтобы учесть начальное состояние
  handleScroll();
});