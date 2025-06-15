$(document).ready(function () {
  const $searchInput = $(".search-page__input");
  const $searchFilters = $(".search-page__filters");
  const $filterGroups = $(".search-page__filter-group");
  const $applyBtn = $(".search-page__apply-btn"); // Кнопка "Найти"
  const $filterTrigger = $(".filter-trigger"); // Кнопка "Фильтры"
  let searchText = "";
  const selectedFilters = {};

  // Обработчик для поля города
  const $cityFilter = $(".search-page__filter-city");
  const $cityHeader = $cityFilter.find(".search-page__filter-header");
  const $cityInputWrapper = $cityFilter.find(
    ".search-page__filter-input-wrapper"
  );
  const $cityInput = $cityInputWrapper.find(".search-page__filter-city-input");
  const $cityOptions = $cityFilter.find(".search-page__city-options");
  const $cityToggle = $cityFilter.find(".search-page__filter-toggle");
  const $cityReset = $cityFilter.find(".search-page__filter-reset");
  const $cityHint = $cityFilter.find(".search-page__city-hint");
  let cityValue = "";

  $cityFilter.addClass("default");

  // Создаем вспомогательный элемент для измерения ширины текста для выбора города
  const $measureSpanCity = $("<span>")
    .css({
      "font-size": $cityInput.css("font-size"),
      "font-weight": $cityInput.css("font-weight"),
      "font-family": $cityInput.css("font-family"),
      visibility: "hidden",
      position: "absolute",
      "white-space": "pre",
    })
    .appendTo("body");

  function updateCityInputState() {
    const isSelected = $cityFilter.hasClass("selected");
    if (isSelected) {
      $cityInput.prop("disabled", true).addClass("disabled");
      $cityReset.show(); // Показываем кнопку сброса

      // Измеряем ширину текста
      $measureSpanCity.text($cityInput.val() || $cityInput.attr("placeholder"));
      const textWidth = $measureSpanCity.outerWidth();

      // Измеряем ширину toggle (иконки)
      const toggleWidth = $cityToggle.outerWidth();

      // Суммируем ширину текста, toggle и добавляем отступ
      const totalWidth = textWidth + toggleWidth + 60;

      // Задаём min-width и max-width для filter-header
      $cityInput.css({
        "min-width": totalWidth + "px",
        "max-width": totalWidth + "px",
      });
    } else {
      $cityInput.prop("disabled", false).removeClass("disabled");
      $cityReset.hide(); // Скрываем кнопку сброса
      $cityInput.css({
        "min-width": "",
        "max-width": "",
      }); // Сбрасываем ширину
    }
  }

  // Удаляем вспомогательный элемент при размонтировании
  $(window).on("unload", function () {
    $measureSpanCity.remove();
  });

  // Обработчик клика по заголовку города
  $cityHeader.on("click", function () {
    $filterGroups.each(function () {
      const $group = $(this);
      if ($group.hasClass("open") && !$group.is($cityFilter)) {
        $group.removeClass("open");
        if ($group.find(".search-page__filter-header").length) {
          $group.find(".search-page__filter-header").show();
          $group.find(".search-page__filter-input-wrapper").hide();
        }
        // $group.find(".search-page__filter-options").hide();
        $group.addClass("default");
      }
    });
    $cityFilter.removeClass("default selected").addClass("open");
    $cityHeader.hide();
    $cityInputWrapper.show();
    $cityOptions.hide(); // Скрываем список
    $cityHint.show(); // Показываем подсказку
    $cityInput.focus(); // Автофокус
    fetchCitySuggestions($cityInput.val());
    updateCityInputState(); // Обновляем состояние поля
  });

  // Обработчик ввода в поле города
  $cityInput.on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 2) {
      $cityFilter.removeClass("selected");
      $cityReset.hide();
      $cityHint.hide(); // Скрываем подсказку
      $cityOptions.show();
      fetchCitySuggestions(query);
    } else {
      $cityOptions.hide(); // Скрываем список
      $cityHint.show(); // Показываем подсказку
    }
    updateCityInputState(); // Обновляем состояние поля
  });

  // Обработчик выбора значения из списка
  $cityOptions.on("click", "li", function () {
    cityValue = $(this).text();
    $cityInput.val(cityValue);
    $cityFilter.removeClass("open default").addClass("selected");
    $cityOptions.hide();
    $cityHint.hide();
    selectedFilters["Город"] = { value: cityValue };
    console.log(`Выбран город: ${cityValue}`);
    updateCityInputState(); // Обновляем состояние поля
  });

  // Обработчик Enter
  $cityInput.on("keypress", function (e) {
    if (e.which === 13 && $cityOptions.find("li").length > 0) {
      cityValue = $cityOptions.find("li:first").text();
      $cityInput.val(cityValue);
      $cityFilter.removeClass("open default").addClass("selected");
      $cityOptions.hide();
      $cityHint.hide();
      selectedFilters["Город"] = { value: cityValue };
      console.log(`Выбран город по Enter: ${cityValue}`);
      updateCityInputState(); // Обновляем состояние поля
    }
  });

  // Обработчик сброса
  $cityReset.on("click", function () {
    $cityInput.val(""); // Очистка поля
    $cityFilter.removeClass("selected open").addClass("default");
    $cityReset.hide();
    $cityHeader.show();
    $cityInputWrapper.hide();
    $cityHint.hide();
    delete selectedFilters["Город"];
    console.log("Город сброшен");
    updateCityInputState(); // Обновляем состояние поля
  });

  // Закрытие списка при клике вне
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-page__filter-city").length) {
      $cityFilter.removeClass("open");
      $cityOptions.hide();
      $cityHint.hide();
      if (!$cityFilter.hasClass("selected")) {
        $cityFilter.addClass("default"); // Добавляем default только если нет selected
        $cityHeader.show();
        $cityInputWrapper.hide();
      }
      updateCityInputState(); // Обновляем состояние поля
    }
  });

  // Функция для имитации предложений
  function fetchCitySuggestions(query) {
    const cities = [
      "Москва",
      "Санкт-Петербург",
      "Новосибирск",
      "Екатеринбург",
      "Казань",
      "Нижний Новгород",
      "Владивосток",
    ];
    $cityOptions.empty();
    const suggestions = cities
      .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
    if (suggestions.length > 0) {
      suggestions.forEach((city) => {
        $("<li>").text(city).appendTo($cityOptions);
      });
    } else {
      $cityOptions.hide(); // Скрываем, если нет совпадений
      $cityHint.show(); // Показываем подсказку при отсутствии совпадений
    }
  }

  // end logics for city
  // start logics for subway
  // Обработчик для поля метро
  const $metroFilter = $(".search-page__filter-metro");
  const $metroHeader = $metroFilter.find(".search-page__filter-header");
  const $metroInputWrapper = $metroFilter.find(
    ".search-page__filter-input-wrapper"
  );
  const $metroInput = $metroInputWrapper.find(
    ".search-page__filter-metro-input"
  );
  const $metroOptions = $metroFilter.find(".search-page__metro-options");
  const $metroToggle = $metroFilter.find(".search-page__filter-toggle");
  const $metroReset = $metroFilter.find(".search-page__filter-reset");
  const $metroHint = $metroFilter.find(".search-page__metro-hint");
  let metroValue = "";

  $metroFilter.addClass("default");

  // Создаем вспомогательный элемент для измерения ширины текста для выбора города
  const $measureSpanSubway = $("<span>")
    .css({
      "font-size": $metroInput.css("font-size"),
      "font-weight": $metroInput.css("font-weight"),
      "font-family": $metroInput.css("font-family"),
      visibility: "hidden",
      position: "absolute",
      "white-space": "pre",
    })
    .appendTo("body");

  function updateMetroInputState() {
    const isSelected = $metroFilter.hasClass("selected");
    if (isSelected) {
      $metroInput.prop("disabled", true).addClass("disabled");
      $metroReset.show(); // Показываем кнопку сброса

      // Измеряем ширину текста
      $measureSpanSubway.text(
        $metroInput.val() || $metroInput.attr("placeholder")
      );
      const textWidth = $measureSpanSubway.outerWidth();

      // Измеряем ширину toggle (иконки)
      const toggleWidth = $metroToggle.outerWidth();

      // Суммируем ширину текста, toggle и добавляем отступ
      const totalWidth = textWidth + toggleWidth + 60;

      // Задаём min-width и max-width для filter-header
      $metroInput.css({
        "min-width": totalWidth + "px",
        "max-width": totalWidth + "px",
      });
    } else {
      $metroInput.prop("disabled", false).removeClass("disabled");
      $metroReset.hide(); // Скрываем кнопку сброса
      $metroInput.css({
        "min-width": "",
        "max-width": "",
      }); // Сбрасываем ширину
    }
  }

  // Обработчик клика по заголовку метро
  $metroHeader.on("click", function () {
    $filterGroups.each(function () {
      const $group = $(this);
      if ($group.hasClass("open") && !$group.is($metroFilter)) {
        $group.removeClass("open");
        if ($group.find(".search-page__filter-header").length) {
          $group.find(".search-page__filter-header").show();
          $group.find(".search-page__filter-input-wrapper").hide();
        }
        $group.addClass("default");
      }
    });
    $metroFilter.removeClass("default selected").addClass("open");
    $metroHeader.hide();
    $metroInputWrapper.show();
    $metroOptions.hide(); // Скрываем список
    $metroHint.show(); // Показываем подсказку
    $metroInput.focus(); // Автофокус
    fetchMetroSuggestions($metroInput.val());
    updateMetroInputState(); // Обновляем состояние поля
  });

  // Обработчик ввода в поле метро
  $metroInput.on("input", function () {
    const query = $(this).val().trim();
    if (query.length > 2) {
      $metroFilter.removeClass("selected");
      $metroReset.hide();
      $metroHint.hide(); // Скрываем подсказку
      $metroOptions.show();
      fetchMetroSuggestions(query);
    } else {
      $metroOptions.hide(); // Скрываем список
      $metroHint.show(); // Показываем подсказку
    }
    updateMetroInputState(); // Обновляем состояние поля
  });

  // Обработчик выбора значения из списка
  $metroOptions.on("click", "li", function () {
    metroValue = $(this).text();
    $metroInput.val(metroValue);
    $metroFilter.removeClass("open default").addClass("selected");
    $metroOptions.hide();
    $metroHint.hide();
    selectedFilters["Метро"] = { value: metroValue };
    console.log(`Выбрана станция метро: ${metroValue}`);
    updateMetroInputState(); // Обновляем состояние поля
  });

  // Обработчик Enter
  $metroInput.on("keypress", function (e) {
    if (e.which === 13 && $metroOptions.find("li").length > 0) {
      metroValue = $metroOptions.find("li:first").text();
      $metroInput.val(metroValue);
      $metroFilter.removeClass("open default").addClass("selected");
      $metroOptions.hide();
      $metroHint.hide();
      selectedFilters["Метро"] = { value: metroValue };
      console.log(`Выбрана станция метро по Enter: ${metroValue}`);
      updateMetroInputState(); // Обновляем состояние поля
    }
  });

  // Обработчик сброса
  $metroReset.on("click", function () {
    $metroInput.val(""); // Очистка поля
    $metroFilter.removeClass("selected open").addClass("default");
    $metroReset.hide();
    $metroHeader.show();
    $metroInputWrapper.hide();
    $metroHint.hide();
    delete selectedFilters["Метро"];
    console.log("Станция метро сброшена");
    updateMetroInputState(); // Обновляем состояние поля
  });

  // Закрытие списка при клике вне
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-page__filter-metro").length) {
      $metroFilter.removeClass("open");
      $metroOptions.hide();
      $metroHint.hide();
      if (!$metroFilter.hasClass("selected")) {
        $metroFilter.addClass("default"); // Добавляем default только если нет selected
        $metroHeader.show();
        $metroInputWrapper.hide();
      }
      updateMetroInputState(); // Обновляем состояние поля
    }
  });

  // Функция для имитации предложений
  function fetchMetroSuggestions(query) {
    const metroStations = [
      "Тверская",
      "Пушкинская",
      "Чеховская",
      "Красные Ворота",
      "Комсомольская",
      "Белорусская",
      "Киевская",
    ];
    $metroOptions.empty();
    const suggestions = metroStations
      .filter((station) => station.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
    if (suggestions.length > 0) {
      suggestions.forEach((station) => {
        $("<li>").text(station).appendTo($metroOptions);
      });
    } else {
      $metroOptions.hide(); // Скрываем, если нет совпадений
      $metroHint.show(); // Показываем подсказку при отсутствии совпадений
    }
  }
  // end logics for subway

  // Открытие/закрытие фильтров по клику на "Фильтры"
  $filterTrigger.on("click", function () {
    const isOpen = $searchFilters.is(":visible");
    if (isOpen) {
      // Сбрасываем фильтры
      $searchInput.val("");
      searchText = "";
      $filterGroups.find('input[type="checkbox"]').prop("checked", false);
      $filterGroups.find('input[type="radio"]').prop("checked", false);
      $filterGroups.each(function () {
        const $group = $(this);
        const $toggle = $group.find(".search-page__filter-toggle");
        const $headerText = $group
          .find(".search-page__filter-header span")
          .first();
        const filterName =
          $headerText.attr("data-original-name") || $headerText.text();
        $toggle
          .removeClass("reset open")
          .html(
            '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
              "</svg>"
          );
        $group.removeClass("selected open").addClass("default");
        const originalFilterName =
          $headerText.attr("data-original-name") || filterName;
        $headerText.text(originalFilterName);
        if (selectedFilters[filterName]) {
          delete selectedFilters[filterName];
        }
      });
      $searchFilters.hide();
      $filterTrigger.removeClass("opened");
      $filterTrigger.addClass("closed");
      $filterTrigger.text("Фильтры");
      console.log("Все фильтры и текст сброшены");
    } else {
      $searchFilters.show();
      $filterTrigger.addClass("opened");
      $filterTrigger.removeClass("closed");
      $filterTrigger.text("Скрыть");
      console.log("Фильтры открыты");
    }
  });

  // Скрыть фильтры при клике вне компонента
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-page__filter").length) {
      $searchFilters.hide();
      $filterTrigger.removeClass("opened");
      $filterTrigger.addClass("closed");
      $filterTrigger.text("Фильтры");
    }
    if (
      !$(e.target).closest(".search-page__filter-header").length &&
      !$(e.target).closest(".search-page__filter-options").length &&
      !$(e.target).closest(".search-page__filter-toggle").length
    ) {
      $filterGroups.each(function () {
        const $group = $(this);
        const $toggle = $group.find(".search-page__filter-toggle");
        const $headerText = $group
          .find(".search-page__filter-header span")
          .first();
        const filterName =
          $headerText.attr("data-original-name") || $headerText.text();
        const isRangeFilter = $group.data("type") === "range";
        const hasSelectedValues =
          selectedFilters[filterName] &&
          (isRangeFilter
            ? selectedFilters[filterName].min && selectedFilters[filterName].max
            : selectedFilters[filterName].value !== undefined || // Для радио-кнопок
              (selectedFilters[filterName].values &&
                selectedFilters[filterName].values.length > 0)); // Для чекбоксов
        $group.removeClass("open");
        $toggle.removeClass("open");
        if (hasSelectedValues) {
          $toggle
            .addClass("reset")
            .html(
              '<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
                "</svg>"
            );
          $group.removeClass("default open").addClass("selected");
        } else {
          $toggle
            .removeClass("reset")
            .html(
              '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
                "</svg>"
            );
          $group.removeClass("selected open").addClass("default");
        }
      });
    }
  });

  // Открытие/закрытие групп фильтров
  $filterGroups.each(function () {
    const $group = $(this);
    const $header = $group.find(".search-page__filter-header");
    const $options = $group.find(".search-page__filter-options");
    const $toggle = $header.find(".search-page__filter-toggle");
    const $headerText = $header.find("span").first();
    const filterName = $header.find("span").first().text();
    const originalFilterName = filterName;
    $header.find("span").first().attr("data-original-name", originalFilterName);
    const isRangeFilter = $(this).data("type") === "range";

    $group.addClass("default");

    // Измеряем ширину data-original-name
    const $tempSpan = $("<span></span>")
      .text(originalFilterName)
      .css({
        visibility: "hidden",
        whiteSpace: "nowrap",
        position: "absolute",
        fontSize: $header.find("span").first().css("font-size"),
        fontFamily: $header.find("span").first().css("font-family"),
        fontWeight: $header.find("span").first().css("font-weight"),
      })
      .appendTo("body");
    const textWidth = $tempSpan.width();
    $tempSpan.remove();

    // Измеряем ширину filter-toggle
    const $tempToggle = $("<span></span>")
      .html(
        '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
          "</svg>"
      )
      .css({
        visibility: "hidden",
        whiteSpace: "nowrap",
        position: "absolute",
        fontSize: $toggle.css("font-size"),
        fontFamily: $toggle.css("font-family"),
        fontWeight: $toggle.css("font-weight"),
        padding: $toggle.css("padding"),
        margin: $toggle.css("margin"),
      })
      .appendTo("body");
    const toggleWidth = $tempToggle.width();
    $tempToggle.remove();

    // Суммируем ширину текста и toggle, добавляем небольшой отступ
    const totalWidth = textWidth + toggleWidth + 44.656; // 10px на возможный зазор

    // Задаём min-width и max-width для filter-header
    $header.css({
      "min-width": totalWidth,
      "max-width": totalWidth,
    });

    function updateFilterHeaderText() {
      const isOpen = $group.hasClass("open");
      if (selectedFilters[filterName]) {
        if (isRangeFilter) {
          const { min, max } = selectedFilters[filterName] || {};
          if (min && max) {
            $headerText.text(`от ${min} до ${max}`);
            $group
              .removeClass("default")
              .addClass(isOpen ? "open selected" : "selected");

            $toggle
              .addClass("reset")
              .html(
                '<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                  '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
                  "</svg>"
              );
          } else {
            $headerText.text(originalFilterName);
            $group
              .removeClass("selected")
              .addClass(isOpen ? "open" : "default");

            $toggle
              .removeClass("reset")
              .html(
                '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                  '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
                  "</svg>"
              );
          }
        } else {
          if (selectedFilters[filterName].value !== undefined) {
            // Для радио-кнопок
            $headerText.text(selectedFilters[filterName].value);
            $group
              .removeClass("default")
              .addClass(isOpen ? "open selected" : "selected");
          } else if (
            selectedFilters[filterName].values &&
            selectedFilters[filterName].values.length > 0
          ) {
            // Для чекбоксов
            const values = selectedFilters[filterName].values.join(", ");
            $headerText.text(values);
            $group
              .removeClass("default")
              .addClass(isOpen ? "open selected" : "selected");
          } else {
            $headerText.text(originalFilterName);
            $group
              .removeClass("selected")
              .addClass(isOpen ? "open" : "default");
          }
        }
      } else {
        $headerText.text(originalFilterName);
        $group.removeClass("selected").addClass(isOpen ? "open" : "default");
      }
    }

    $header.on("click", function () {
      const isOpen = $group.hasClass("open");
      $filterGroups.each(function () {
        const $otherGroup = $(this);
        const $otherToggle = $otherGroup.find(".search-page__filter-toggle");
        const $otherHeaderText = $otherGroup
          .find(".search-page__filter-header span")
          .first();
        const otherFilterName =
          $otherHeaderText.attr("data-original-name") ||
          $otherHeaderText.text();
        const isOtherRangeFilter = $otherGroup.data("type") === "range";
        const hasSelectedValues =
          selectedFilters[otherFilterName] &&
          (isOtherRangeFilter
            ? selectedFilters[otherFilterName].min &&
              selectedFilters[otherFilterName].max
            : selectedFilters[otherFilterName].value !== undefined || // Для радио-кнопок
              (selectedFilters[otherFilterName].values &&
                selectedFilters[otherFilterName].values.length > 0)); // Для чекбоксов
        $otherGroup.removeClass("open");
        if (hasSelectedValues) {
          $otherToggle
            .addClass("reset")
            .html(
              '<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
                "</svg>"
            );
          $otherGroup.removeClass("default open").addClass("selected");
        } else {
          $otherToggle
            .removeClass("reset")
            .html(
              '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
                "</svg>"
            );
          $otherGroup.removeClass("selected open").addClass("default");
        }
      });
      if (!isOpen) {
        $group.addClass("open");
        $toggle.addClass("open");
        if ($group.hasClass("selected")) {
          $group.addClass("open selected");
        } else {
          $group.removeClass("default").addClass("open");
        }
      } else {
        $group.removeClass("open");
        $toggle.removeClass("open");
        if (
          selectedFilters[filterName] &&
          (isRangeFilter
            ? selectedFilters[filterName].min && selectedFilters[filterName].max
            : selectedFilters[filterName].value !== undefined || // Для радио-кнопок
              (selectedFilters[filterName].values &&
                selectedFilters[filterName].values.length > 0)) // Для чекбоксов
        ) {
          $group.removeClass("default open").addClass("selected");
        } else {
          $group.removeClass("selected open").addClass("default");
        }
      }
      if (
        selectedFilters[filterName] &&
        (isRangeFilter
          ? selectedFilters[filterName].min && selectedFilters[filterName].max
          : selectedFilters[filterName].value !== undefined || // Для радио-кнопов
            (selectedFilters[filterName].values &&
              selectedFilters[filterName].values.length > 0)) // Для чекбоксов
      ) {
        $toggle
          .addClass("reset")
          .html(
            '<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
              "</svg>"
          );
      } else {
        $toggle
          .removeClass("reset")
          .html(
            '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
              "</svg>"
          );
      }
    });

    // Сброс фильтра при клике на крестик
    $toggle.on("click", function (e) {
      e.stopPropagation();
      if ($(this).hasClass("reset")) {
        if (isRangeFilter) {
          $options.find(".search-page__range-min").val("");
          $options.find(".search-page__range-max").val("");
          $options.find(".search-page__range-hide").prop("checked", false);
          selectedFilters[filterName] = { min: "", max: "", hide: false };
        } else {
          $options.find('input[type="checkbox"]').prop("checked", false);
          $options.find('input[type="radio"]').prop("checked", false);
          delete selectedFilters[filterName];
        }
        $(this)
          .removeClass("reset")
          .html(
            '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
              "</svg>"
          );
        $group.removeClass("open selected").addClass("default");
        $toggle.removeClass("open");
        console.log(`Сброшены фильтры для: ${filterName}`);
        updateFilterHeaderText();
      } else {
        $header.trigger("click");
      }
    });

    if (isRangeFilter) {
      const $minInput = $options.find(".search-page__range-min");
      const $maxInput = $options.find(".search-page__range-max");
      const $hideCheckbox = $options.find(".search-page__range-hide");
      const $toggle = $group.find(".search-page__filter-toggle");

      if (!selectedFilters[filterName]) {
        selectedFilters[filterName] = { min: "", max: "", hide: false };
      }

      $minInput.on("input", function () {
        selectedFilters[filterName].min = $(this).val();
        updateFilterHeaderText();
      });

      $maxInput.on("input", function () {
        selectedFilters[filterName].max = $(this).val();
        updateFilterHeaderText();
      });

      // Валидация при уходе фокуса с поля "от"
      $minInput.on("blur", function () {
        const minVal = parseInt($minInput.val()) || 0;
        const maxVal = parseInt($maxInput.val()) || 0;
        if (minVal && maxVal && minVal > maxVal) {
          $minInput.val(maxVal);
          selectedFilters[filterName].min = maxVal;
        }
        const isOpen = $group.hasClass("open");
        if (isOpen) $group.addClass("open");
        updateFilterHeaderText();
      });

      // Валидация при уходе фокуса с поля "до"
      $maxInput.on("blur", function () {
        const minVal = parseInt($minInput.val()) || 0;
        const maxVal = parseInt($maxInput.val()) || 0;
        if (maxVal && minVal && maxVal < minVal) {
          $maxInput.val(minVal);
          selectedFilters[filterName].max = minVal;
        }
        const isOpen = $group.hasClass("open");
        if (isOpen) $group.addClass("open");
        updateFilterHeaderText();
      });

      $hideCheckbox.on("change", function () {
        selectedFilters[filterName].hide = $(this).is(":checked");
        console.log(
          `Чекбокс "${filterName}": ${
            $(this).is(":checked") ? "включён" : "выключен"
          }`
        );
      });
    } else {
      $options
        .find('input[type="checkbox"], input[type="radio"]')
        .on("change", function () {
          const value = $(this).val();
          const isRadio = $(this).is('[type="radio"]');
          const inputName = $(this).attr("name"); // Для группировки радио-кнопок

          if ($(this).is(":checked")) {
            if (isRadio) {
              // Для радио-кнопок сохраняем только одно значение
              selectedFilters[filterName] = { value: value };
              // Сбрасываем другие радио-кнопки в группе
              $options
                .find(
                  `input[type="radio"][name="${inputName}"][value!="${value}"]`
                )
                .prop("checked", false);
              console.log(`Выбран фильтр (радио): ${filterName} - ${value}`);
            } else {
              // Для чекбоксов сохраняем массив значений
              if (!selectedFilters[filterName]) {
                selectedFilters[filterName] = { values: [] };
              }
              selectedFilters[filterName].values.push(value);
              console.log(`Выбран фильтр (чекбокс): ${filterName} - ${value}`);
            }
          } else {
            if (!isRadio) {
              // Для чекбоксов удаляем значение из массива
              selectedFilters[filterName].values = selectedFilters[
                filterName
              ].values.filter((v) => v !== value);
              if (selectedFilters[filterName].values.length === 0) {
                delete selectedFilters[filterName];
              }
              console.log(`Снят фильтр (чекбокс): ${filterName} - ${value}`);
            }
          }

          const isOpen = $group.hasClass("open");
          if (isOpen) $group.addClass("open");
          if (
            selectedFilters[filterName] &&
            (isRadio
              ? selectedFilters[filterName].value !== undefined
              : selectedFilters[filterName].values &&
                selectedFilters[filterName].values.length > 0)
          ) {
            $toggle
              .addClass("reset")
              .html(
                '<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                  '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
                  "</svg>"
              );
            $group
              .removeClass("default")
              .addClass(isOpen ? "open selected" : "selected");
          } else {
            $toggle
              .removeClass("reset")
              .html(
                '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                  '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
                  "</svg>"
              );
            $group
              .removeClass("selected")
              .addClass(isOpen ? "open" : "default");
          }

          updateFilterHeaderText();
        });
    }
  });

  // --- Синхронизация фильтров и поиска с тегами в .search-bar__search.search ---
  function renderSearchTags() {
    var $searchBar = $(".search-bar__search.search");
    var $container = $searchBar.find(".search-container");
    var $inputWrapper = $container.find(".search-input-wrapper");
    var $tagsContainer = $container.find(".search-tags");
    if ($tagsContainer.length) $tagsContainer.remove();
    $tagsContainer = $('<div class="search-tags"></div>').insertAfter(
      $inputWrapper
    );
    $inputWrapper.hide();

    // Собираем значения
    var tags = [];
    var textValue = $(".search-page__input").val().trim();
    if (textValue) {
      tags.push({ type: "text", value: textValue });
    }
    // Собираем фильтры
    $filterGroups.each(function () {
      var $group = $(this);
      var header = $group
        .find(".search-page__filter-header span")
        .first()
        .text()
        .trim();
      // Чекбоксы
      $group.find('input[type="checkbox"]:checked').each(function () {
        var val = $(this).val();
        if (val) tags.push({ type: "filter", value: val });
      });
      // Радио
      $group.find('input[type="radio"]:checked').each(function () {
        var val = $(this).val();
        if (val) tags.push({ type: "filter", value: val });
      });
      // Диапазоны
      if ($group.data("type") === "range") {
        var min = $group.find(".search-page__range-min").val();
        var max = $group.find(".search-page__range-max").val();
        if (min && max) {
          tags.push({ type: "filter", value: `от ${min} до ${max}` });
        }
      }
    });

    // Добавляем теги
    tags.forEach(function (tag) {
      var $tag = $('<span class="search-tag"></span>')
        .attr("data-type", tag.type)
        .attr("data-value", tag.value)
        .append(`<span class="filter-checkbox__text">${tag.value}</span>`)
        .append(
          `<span class="tag-remove"><svg width=\"19\" height=\"18\" viewBox=\"0 0 19 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" /></svg></span>`
        );
      if (tag.type === "text") $tag.addClass("search-tag-text");
      $tagsContainer.append($tag);
    });
  }

  function resetSearchTags() {
    var $searchBar = $(".search-bar__search.search");
    var $container = $searchBar.find(".search-container");
    $container.find(".search-tags").remove();
    $container.find(".search-input-wrapper").show();
  }

  // --- Управление состояниями страницы поиска ---
  const $defaultState = $(".search-page__default-state");
  const $resultsState = $(".search-page__results-state");
  const $favoritesState = $(".search-page__favorites");
  const $findBtn = $(".search-page__apply-btn");
  const $favResumesBtn = $(".search-page__fav-resumes");
  const $resultsReturn = $(".results__return");
  const $favReturn = $(".fav__return");

  // Показать только стартовое состояние при загрузке
  function showDefaultState() {
    $defaultState.removeClass("hide");
    $resultsState.addClass("hide");
    $favoritesState.addClass("hide");
  }

  // Показать только результаты поиска
  function showResultsState() {
    $defaultState.addClass("hide");
    $resultsState.removeClass("hide");
    $favoritesState.addClass("hide");
    renderSearchTags(); // Синхронизируем теги поиска
  }

  // Показать только избранное
  function showFavoritesState() {
    $defaultState.addClass("hide");
    $resultsState.addClass("hide");
    $favoritesState.removeClass("hide");
  }

  // Клик по "Найти" — показать результаты
  $findBtn.on("click", function (e) {
    e.preventDefault();
    showResultsState();
  });

  // Клик по "Избранные резюме" — показать избранное
  $favResumesBtn.on("click", function (e) {
    e.preventDefault();
    showFavoritesState();
  });

  // Клик по возврату из результатов — показать стартовое
  $resultsReturn.on("click", function (e) {
    e.preventDefault();
    showDefaultState();
    resetSearchTags();
  });

  // Клик по возврату из избранного — показать стартовое
  $favReturn.on("click", function (e) {
    e.preventDefault();
    showDefaultState();
  });

  // При загрузке страницы — стартовое состояние
  showDefaultState();

  // Применение фильтров через "Найти"
  $applyBtn.on("click", function () {
    const appliedFilters = [];
    for (const filterName in selectedFilters) {
      if (selectedFilters[filterName]) {
        if (
          selectedFilters[filterName].min ||
          selectedFilters[filterName].max ||
          selectedFilters[filterName].hide
        ) {
          appliedFilters.push({
            filterName,
            min: selectedFilters[filterName].min,
            max: selectedFilters[filterName].max,
            hide: selectedFilters[filterName].hide,
          });
        } else if (selectedFilters[filterName].values) {
          appliedFilters.push(
            ...selectedFilters[filterName].values.map((value) => ({
              filterName,
              value,
            }))
          );
        }
      }
    }

    console.log("Применённые параметры:");
    if (searchText) {
      console.log(`Текст поиска: ${searchText}`);
    }
    if (appliedFilters.length > 0) {
      console.log("Фильтры:", appliedFilters);
    }

    // Скрываем элементы
    // $(".search-page__filter-input").addClass("hidden");
    // $(".search-page__cards-description").addClass("hidden");
    // $searchFilters.hide();
    $filterTrigger.removeClass("opened");
    $filterTrigger.addClass("closed");
    $filterTrigger.text("Фильтры");
  });

  // Отслеживание ввода текста
  $searchInput.on("input", function () {
    searchText = $(this).val().trim();
  });
});

$(document).ready(function () {
  const $otherFilter = $(".search-page__filter-other");
  const $otherOptions = $otherFilter.find(".search-page__filter-options");
  const $otherToggle = $otherFilter.find(".search-page__filter-toggle");
  const $otherHeader = $otherFilter.find(".search-page__other-header");
  const $otherText = $otherHeader.find("span").eq(1);

  $otherFilter.addClass("default");

  $otherHeader.on("click", function () {
    const isOpen = $otherFilter.hasClass("open");
    $otherFilter.toggleClass("open default");
  });

  $otherOptions.find("input[type='radio']").on("change", function () {
    const $selectedRadio = $(this);
    const selectedValue = $selectedRadio.val();

    if (selectedValue) {
      $otherText.text(selectedValue);
      $otherFilter.removeClass("open").addClass("selected");

      $otherToggle
        .addClass("reset")
        .html(
          '<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
            "</svg>"
        );
    }
  });

  $(document).on("click", function (event) {
    if (
      !$otherFilter.is(event.target) &&
      $otherFilter.has(event.target).length === 0 &&
      $otherFilter.hasClass("open")
    ) {
      $otherFilter.removeClass("open").addClass("default");
    }
  });

  $otherToggle.on("click", function () {
    if ($otherFilter.hasClass("selected")) {
      event.stopPropagation();
      $otherText.text("Сохраненные фильтры (0)");
      $otherFilter.removeClass("selected").addClass("default");
      $otherOptions.find("input[type='radio']").prop("checked", false);

      $otherToggle
        .removeClass("reset")
        .html(
          '<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
            "</svg>"
        );
    }
  });
});

// sets for navbar
function toggleScrollButtons() {
  const container = document.getElementById("scroll-wrapper");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnSet = document.querySelector(".btn-settings");

  // Показываем/скрываем кнопки в зависимости от положения скролла
  const scrollLeft = container.scrollLeft;
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;
  const maxScroll = scrollWidth - clientWidth;

  // Кнопка влево
  btnLeft.style.visibility = scrollLeft > 0 ? "visible" : "hidden";

  // Кнопка вправо

  btnRight.style.visibility = scrollLeft < maxScroll ? "visible" : "hidden";

  // Позиция кнопки настроек (условие от ширины окна оставляем для адаптивности)
  if (window.innerWidth <= 772) {
    btnLeft.style.visibility = "hidden";
    btnRight.style.visibility = "hidden";
    // btnSet.style.cssText = 'right: 0; border-radius: 0 10px 10px 0;';
  }
  // else if (container.scrollWidth > container.clientWidth) {
  //   btnSet.style.cssText = 'right: 100px; border-radius: 0;';
  // } else {
  //   btnSet.style.cssText = 'right: 0; border-radius: 0 10px 10px 0;';
  // }
}

// Инициализация при загрузке
toggleScrollButtons();

// Обновление при изменении размера окна
window.addEventListener("resize", toggleScrollButtons);

// Обновление при прокрутке (добавляем слушатель)
document
  .getElementById("scroll-wrapper")
  .addEventListener("scroll", toggleScrollButtons);

// Сохранение существующих обработчиков
document.getElementById("btn-left").onclick = function () {
  const container = document.getElementById("scroll-wrapper");
  sideScroll(container, "left", 25, 100, 10);
};

document.getElementById("btn-right").onclick = function () {
  const container = document.getElementById("scroll-wrapper");
  sideScroll(container, "right", 25, 100, 10);
};

// Существующая функция прокрутки
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
