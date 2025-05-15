$(document).ready(function () {
  const $searchInput = $('.search-input');
  const $searchFilters = $('.search-filters');
  const $filterGroups = $('.filter-group');
  const $applyBtn = $('.filter-apply-btn');
  const $cancelBtn = $('.filter-cancel-btn');
  let searchText = '';
  const selectedFilters = {};

  $(document).on('click', '.search-tags', function(e) {
    if (!$(e.target).hasClass('tag-remove')) {
      $searchFilters.show();
      console.log('Открыт контейнер фильтров через клик на .search-tags');
    }
  });

  // Показать/скрыть фильтры при фокусе на инпуте
  $searchInput.on('focus', function () {
    $searchFilters.show();
    $('.search__wrapper').addClass('focus');
  });

  $searchInput.on('blur', function () {
    $('.search__wrapper').removeClass('focus');
  });

  // Скрыть фильтры при клике вне компонента
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.search-container').length) {
      $searchFilters.hide();
    }
    if (!$(e.target).closest('.filter-header').length && !$(e.target).closest('.filter-options').length && !$(e.target).closest('.filter-toggle').length) {
      $filterGroups.each(function () {
        const $group = $(this);
        const $toggle = $(this).find('.filter-toggle');
        const $headerText = $(this).find('.filter-header span').first();
        const filterName = $(this).find('.filter-header span').first().attr('data-original-name') || $(this).find('.filter-header span').first().text();
        const isRangeFilter = $(this).data('type') === 'range';
        const hasSelectedValues = selectedFilters[filterName] && (
          isRangeFilter
            ? (selectedFilters[filterName].min && selectedFilters[filterName].max)
            : (selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0)
        );
        $group.removeClass('open');
        $toggle.removeClass('open');
        if (hasSelectedValues) {
          $toggle.addClass('reset').html('<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
            '</svg>');
          $group.removeClass('default open').addClass('selected');
        } else {
          $toggle.removeClass('reset').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
            '</svg>');
          $group.removeClass('selected open').addClass('default');
        }
      });
    }
  });

  // Открытие/закрытие фильтров
  $filterGroups.each(function () {
    const $group = $(this);
    const $header = $(this).find('.filter-header');
    const $options = $(this).find('.filter-options');
    const $toggle = $header.find('.filter-toggle');
    const $headerText = $header.find('span').first();
    const filterName = $header.find('span').first().text();
    const originalFilterName = filterName; // Сохраняем оригинальное название
    $header.find('span').first().attr('data-original-name', originalFilterName);
    const isRangeFilter = $(this).data('type') === 'range';

    // Устанавливаем начальное состояние: default
    $group.addClass('default');

    // Измеряем ширину data-original-name
    const $tempSpan = $('<span></span>')
      .text(originalFilterName)
      .css({
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        position: 'absolute',
        fontSize: $header.find('span').first().css('font-size'),
        fontFamily: $header.find('span').first().css('font-family'),
        fontWeight: $header.find('span').first().css('font-weight')
      })
      .appendTo('body');
    const textWidth = $tempSpan.width();
    $tempSpan.remove();

    // Измеряем ширину filter-toggle
    const $tempToggle = $('<span></span>')
      .html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
        '</svg>')
      .css({
        visibility: 'hidden',
        whiteSpace: 'nowrap',
        position: 'absolute',
        fontSize: $toggle.css('font-size'),
        fontFamily: $toggle.css('font-family'),
        fontWeight: $toggle.css('font-weight'),
        padding: $toggle.css('padding'),
        margin: $toggle.css('margin')
      })
      .appendTo('body');
    const toggleWidth = $tempToggle.width();
    $tempToggle.remove();

    // Суммируем ширину текста и toggle, добавляем небольшой отступ
    const totalWidth = textWidth + toggleWidth + 44.656; // 10px на возможный зазор

    // Задаём min-width и max-width для filter-header
    $header.css({
      'min-width': totalWidth,
      'max-width': totalWidth
    });

    // Функция для обновления текста заголовка
    function updateFilterHeaderText() {
      const isOpen = $group.hasClass('open');
      if (selectedFilters[filterName]) {
        if (isRangeFilter) {
          const {min, max} = selectedFilters[filterName] || {};
          if (min && max) {
            $headerText.text(`от ${min} до ${max}`);
            $group.removeClass('default').addClass(isOpen ? 'open selected' : 'selected');
          } else {
            $headerText.text(originalFilterName);
            $group.removeClass('selected').addClass(isOpen ? 'open' : 'default');
          }
        } else {
          if (selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0) {
            const values = selectedFilters[filterName].values.join(', ');
            $headerText.text(values);
            $group.removeClass('default').addClass(isOpen ? 'open selected' : 'selected');
          } else {
            $headerText.text(originalFilterName);
            $group.removeClass('selected').addClass(isOpen ? 'open' : 'default');
          }
        }
      } else {
        $headerText.text(originalFilterName);
        $group.removeClass('selected').addClass(isOpen ? 'open' : 'default');
      }
    }

    $header.on('click', function () {
      const isOpen = $group.hasClass('open');
      $filterGroups.each(function () {
        const $otherGroup = $(this);
        const $otherToggle = $otherGroup.find('.filter-toggle');
        const $otherHeaderText = $otherGroup.find('.filter-header span').first();
        const otherFilterName = $otherHeaderText.attr('data-original-name') || $otherHeaderText.text();
        const isRangeFilter = $otherGroup.data('type') === 'range';
        const hasSelectedValues = selectedFilters[otherFilterName] && (
          isRangeFilter
            ? (selectedFilters[otherFilterName].min && selectedFilters[otherFilterName].max)
            : (selectedFilters[otherFilterName].values && selectedFilters[otherFilterName].values.length > 0)
        );
        $otherGroup.removeClass('open');
        if (hasSelectedValues) {
          $otherToggle.addClass('reset').html('<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
            '</svg>');
          $otherGroup.removeClass('default open').addClass('selected');
        } else {
          $otherToggle.removeClass('reset').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
            '</svg>');
          $otherGroup.removeClass('selected open').addClass('default');
        }
      });
      if (!isOpen) {
        $group.addClass('open');
        $toggle.addClass('open');
        if ($group.hasClass('selected')) {
          $group.addClass('open selected');
        } else {
          $group.removeClass('default').addClass('open');
        }
      } else {
        $group.removeClass('open');
        $toggle.removeClass('open');
        if (selectedFilters[filterName] && (isRangeFilter ? (selectedFilters[filterName].min && selectedFilters[filterName].max) : (selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0))) {
          $group.removeClass('default open').addClass('selected');
        } else {
          $group.removeClass('selected open').addClass('default');
        }
      }
      if (selectedFilters[filterName] && (isRangeFilter ? (selectedFilters[filterName].min && selectedFilters[filterName].max) : (selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0))) {
        $toggle.addClass('reset').html('<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
          '</svg>');
      } else {
        $toggle.removeClass('reset').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
          '</svg>');
      }
    });

    if (isRangeFilter) {
      const $minInput = $options.find('.range-min');
      const $maxInput = $options.find('.range-max');
      const $hideCheckbox = $options.find('.range-hide');

      // Инициализируем значения
      if (!selectedFilters[filterName]) {
        selectedFilters[filterName] = {min: '', max: '', hide: false};
      }

      // Обработка ввода значений
      $minInput.on('input', function () {
        selectedFilters[filterName].min = $(this).val();
        const isOpen = $group.hasClass('open');
        if (isOpen) $group.addClass('open');
        updateFilterHeaderText();
        updateApplyButtonState();
      });

      $maxInput.on('input', function () {
        selectedFilters[filterName].max = $(this).val();
        const isOpen = $group.hasClass('open');
        if (isOpen) $group.addClass('open');
        updateFilterHeaderText();
        updateApplyButtonState();
      });

      // Валидация при уходе фокуса с поля "от"
      $minInput.on('blur', function () {
        const minVal = parseInt($minInput.val()) || 0;
        const maxVal = parseInt($maxInput.val()) || 0;
        if (minVal && maxVal && minVal > maxVal) {
          $minInput.val(maxVal);
          selectedFilters[filterName].min = maxVal;
        }
        const isOpen = $group.hasClass('open');
        if (isOpen) $group.addClass('open');
        updateFilterHeaderText();
        updateApplyButtonState();
      });

      // Валидация при уходе фокуса с поля "до"
      $maxInput.on('blur', function () {
        const minVal = parseInt($minInput.val()) || 0;
        const maxVal = parseInt($maxInput.val()) || 0;
        if (maxVal && minVal && maxVal < minVal) {
          $maxInput.val(minVal);
          selectedFilters[filterName].max = minVal;
        }
        const isOpen = $group.hasClass('open');
        if (isOpen) $group.addClass('open');
        updateFilterHeaderText();
        updateApplyButtonState();
      });

      // Обработка чекбокса
      $hideCheckbox.on('change', function () {
        selectedFilters[filterName].hide = $(this).is(':checked');
        console.log(`Чекбокс "${filterName}": ${$(this).is(':checked') ? 'включён' : 'выключен'}`);
        const isOpen = $group.hasClass('open');
        if (isOpen) $group.addClass('open');
        updateApplyButtonState();
      });
    } else {
      // Обработка выбора фильтров (для обычных списков)
      $options.find('input[type="checkbox"]').on('change', function () {
        const value = $(this).val();
        if ($(this).is(':checked')) {
          if (!selectedFilters[filterName]) {
            selectedFilters[filterName] = {values: []};
          }
          selectedFilters[filterName].values.push(value);
          console.log(`Выбран фильтр: ${filterName} - ${value}`);
        } else {
          selectedFilters[filterName].values = selectedFilters[filterName].values.filter(v => v !== value);
          if (selectedFilters[filterName].values.length === 0) {
            delete selectedFilters[filterName];
          }
          console.log(`Снят фильтр: ${filterName} - ${value}`);
        }

        const isOpen = $group.hasClass('open');
        if (isOpen) $group.addClass('open');;
        if (selectedFilters[filterName] && selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0) {
          $toggle.addClass('reset').html('<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
            '</svg>');
          $group.removeClass('default').addClass(isOpen ? 'open selected' : 'selected');
        } else {
          $toggle.removeClass('reset').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
            '</svg>');
          $group.removeClass('selected').addClass(isOpen ? 'open' : 'default');
        }

        updateFilterHeaderText();
        updateApplyButtonState();
      });
    }

    // Сброс фильтра при клике на крестик
    $toggle.on('click', function (e) {
      e.stopPropagation();
      if ($(this).hasClass('reset')) {
        // e.stopPropagation();
        if (isRangeFilter) {
          $options.find('.range-min').val('');
          $options.find('.range-max').val('');
          $options.find('.range-hide').prop('checked', false);
          selectedFilters[filterName] = {min: '', max: '', hide: false};
        } else {
          $options.find('input[type="checkbox"]').prop('checked', false);
          delete selectedFilters[filterName];
        }
        $(this).removeClass('reset').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
          '</svg>');
        $group.removeClass('open selected').addClass('default');
        $toggle.removeClass('open');
        console.log(`Сброшены фильтры для: ${filterName}`);
        updateFilterHeaderText();
        updateApplyButtonState();
      } else {
        // Если reset отсутствует, вручную вызываем открытие/закрытие
        $header.trigger('click');
      }
    });
  });

  // Отслеживание ввода текста
  $searchInput.on('input', function () {
    searchText = $(this).val().trim();
    updateApplyButtonState();
  });

  $searchInput.on('keydown', function(e) {
    if (e.keyCode === 13) { // Enter key
      e.preventDefault(); // Предотвращаем стандартное поведение (например, отправку формы)
      $applyBtn.trigger('click'); // Вызываем клик на кнопке "Применить"
      console.log('Кнопка "Применить" активирована через Enter');
    }
  });

  // Обновляем состояние кнопки "Применить"
  function updateApplyButtonState() {
    let hasFilters = false;
    const $searchWrapper = $('.search__wrapper');
    for (const filterName in selectedFilters) {
      if (selectedFilters[filterName]) {
        if (selectedFilters[filterName].min || selectedFilters[filterName].max || selectedFilters[filterName].hide) {
          hasFilters = true;
          break;
        }
        if (selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0) {
          hasFilters = true;
          break;
        }
      }
    }
    const hasText = searchText.length > 0;
    const hasTags = $('.search-tags .search-tag').length > 0;
    const hasAnySelection = hasFilters || hasText || hasTags;
    if (hasAnySelection) {
      $applyBtn.removeClass('disabled');
      $searchWrapper.addClass('has-selected');
    } else {
      $applyBtn.addClass('disabled');
      $searchWrapper.removeClass('has-selected');
    }
  }

  // Применение фильтров
  $applyBtn.on('click', function () {
    if ($(this).hasClass('disabled')) return;

    const appliedFilters = [];
    for (const filterName in selectedFilters) {
      if (selectedFilters[filterName]) {
        if (selectedFilters[filterName].min || selectedFilters[filterName].max || selectedFilters[filterName].hide) {
          appliedFilters.push({
            filterName,
            min: selectedFilters[filterName].min,
            max: selectedFilters[filterName].max,
            hide: selectedFilters[filterName].hide
          });
        } else if (selectedFilters[filterName].values) {
          appliedFilters.push(...selectedFilters[filterName].values.map(value => ({filterName, value})));
        }
      }
    }

    console.log('Применённые параметры:');
    if (searchText) {
      console.log(`Текст поиска: ${searchText}`);
    }
    if (appliedFilters.length > 0) {
      console.log('Фильтры:', appliedFilters);
    }

    // Очистим инпут и добавим теги
    $searchInput.val('');
    const $container = $('.search-container');
    $container.find('.search-tags').remove();
    const $tagsContainer = $('<div class="search-tags"></div>').insertAfter($('.search-input-wrapper'));
    $searchInput.hide(); // Скрываем только search-input

    // Храним все значения тегов
    const allTags = [];
    if (searchText) {
      allTags.push({type: 'text', value: searchText});
    }
    appliedFilters.forEach(filter => {
      if (filter.value) {
        allTags.push({type: 'filter', value: filter.value});
      } else if (filter.min && filter.max) {
        allTags.push({type: 'range', value: `от ${filter.min} до ${filter.max}`});
      }
    });

    // Добавляем первые два тега
    allTags.slice(0, 3).forEach(tag => {
      const $tag = $(`<span class="search-tag" data-type="${tag.type}" data-value="${tag.value}"><span class="filter-checkbox__text">${tag.value}</span><span class="tag-remove"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />
</svg></span></span>`);
      if (tag.type === 'text') {
        $tag.addClass('search-tag-text'); // Добавляем класс для текстового тега
      }
      $tagsContainer.append($tag);
    });

    // Добавляем +N, если тегов больше двух
    if (allTags.length > 3) {
      const remaining = allTags.length - 3;
      const $tag = $(`<span class="search-tag plus-n" data-remaining="${remaining}">+${remaining}</span>`);
      $tagsContainer.append($tag);
    }

    // Скрываем фильтры
    $searchFilters.hide();
    searchText = '';
    updateApplyButtonState();

    // Обработчик удаления тегов
    $tagsContainer.on('click', '.tag-remove', function () {
      const $tag = $(this).parent();
      const tagValue = $tag.data('value').toString(); // Преобразуем в строку для корректного сравнения
      const tagType = $tag.data('type');
      const isTextTag = tagType === 'text';

      // Удаляем тег из allTags
      const tagIndex = allTags.findIndex(tag => tag.value === tagValue && tag.type === tagType);
      if (tagIndex !== -1) {
        allTags.splice(tagIndex, 1);
      }

      // Обновляем selectedFilters
      if (isTextTag) {
        searchText = '';
      } else {
        for (const filterName in selectedFilters) {
          if (selectedFilters[filterName].min && `от ${selectedFilters[filterName].min} до ${selectedFilters[filterName].max}` === tagValue) {
            selectedFilters[filterName] = {min: '', max: '', hide: false};
          } else if (selectedFilters[filterName].values) {
            selectedFilters[filterName].values = selectedFilters[filterName].values.filter(v => v !== tagValue);
            if (selectedFilters[filterName].values.length === 0) {
              delete selectedFilters[filterName];
            }
          }
        }
        // Обновляем крестики и заголовки в фильтрах
        $filterGroups.each(function () {
          const $toggle = $(this).find('.filter-toggle');
          const filterName = $(this).find('.filter-header span').first().text();
          const isRangeFilter = $(this).data('type') === 'range';
          if (selectedFilters[filterName] && (isRangeFilter ? (selectedFilters[filterName].min && selectedFilters[filterName].max) : (selectedFilters[filterName].values && selectedFilters[filterName].values.length > 0))) {
            $toggle.addClass('reset').html('<svg class="toggle-cross" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />\n' +
              '</svg>');
          } else {
            $toggle.removeClass('reset').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
              '</svg>');
          }
          const originalFilterName = $(this).find('.filter-header span').first().attr('data-original-name') || filterName;
          if (!selectedFilters[filterName] || (isRangeFilter && !selectedFilters[filterName].min) || (!isRangeFilter && selectedFilters[filterName].values && selectedFilters[filterName].values.length === 0)) {
            $(this).find('.filter-header span').first().text(originalFilterName);
          } else if (isRangeFilter && selectedFilters[filterName].min && selectedFilters[filterName].max) {
            $(this).find('.filter-header span').first().text(`от ${selectedFilters[filterName].min} до ${selectedFilters[filterName].max}`);
          } else if (!isRangeFilter) {
            $(this).find('.filter-header span').first().text(selectedFilters[filterName].values.join(', '));
          }
        });
      }

      // Удаляем текущий тег
      $tag.remove();

      // Если остались теги
      if (allTags.length > 0) {
        // Удаляем текущие теги и пересчитываем видимые
        $tagsContainer.find('.search-tag').remove();
        allTags.slice(0, 3).forEach(tag => {
          const $newTag = $(`<span class="search-tag" data-type="${tag.type}" data-value="${tag.value}"><span class="filter-checkbox__text">${tag.value}</span><span class="tag-remove"><svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.1577 13.4655C15.3162 13.624 15.4053 13.839 15.4053 14.0631C15.4053 14.2873 15.3162 14.5023 15.1577 14.6608C14.9992 14.8193 14.7842 14.9084 14.5601 14.9084C14.3359 14.9084 14.1209 14.8193 13.9624 14.6608L9.49826 10.1953L5.03271 14.6594C4.8742 14.8179 4.65922 14.9069 4.43506 14.9069C4.21089 14.9069 3.99591 14.8179 3.8374 14.6594C3.67889 14.5009 3.58984 14.2859 3.58984 14.0617C3.58984 13.8376 3.67889 13.6226 3.8374 13.4641L8.30295 8.99994L3.83881 4.53439C3.6803 4.37588 3.59125 4.1609 3.59125 3.93674C3.59125 3.71257 3.6803 3.49759 3.83881 3.33908C3.99732 3.18057 4.2123 3.09152 4.43646 3.09152C4.66063 3.09152 4.87561 3.18057 5.03412 3.33908L9.49826 7.80463L13.9638 3.33838C14.1223 3.17987 14.3373 3.09082 14.5615 3.09082C14.7856 3.09082 15.0006 3.17987 15.1591 3.33838C15.3176 3.49689 15.4067 3.71187 15.4067 3.93603C15.4067 4.1602 15.3176 4.37518 15.1591 4.53369L10.6936 8.99994L15.1577 13.4655Z" fill="#5898FF" />
</svg></span></span>`);
          if (tag.type === 'text') {
            $newTag.addClass('search-tag-text'); // Добавляем класс для текстового тега
          }
          $tagsContainer.prepend($newTag);
        });

        // Обновляем или удаляем +N
        const $plusN = $tagsContainer.find('.plus-n');
        if (allTags.length > 3) {
          const remaining = allTags.length - 3;
          if ($plusN.length) {
            $plusN.text(`+${remaining}`).data('remaining', remaining);
          } else {
            const $newPlusN = $(`<span class="search-tag plus-n" data-remaining="${remaining}">+${remaining}</span>`);
            $tagsContainer.append($newPlusN);
          }
        } else {
          $plusN.remove();
        }
      }

      // Если тегов не осталось
      if (allTags.length === 0) {
        $tagsContainer.remove();
        $searchInput.show(); // Показываем только search-input
        // Сбрасываем чекбоксы и поля range
        $filterGroups.each(function () {
          const $options = $(this).find('.filter-options');
          const isRangeFilter = $(this).data('type') === 'range';
          if (isRangeFilter) {
            $options.find('.range-min').val('');
            $options.find('.range-max').val('');
            $options.find('.range-hide').prop('checked', false);
          } else {
            $options.find('input[type="checkbox"]').prop('checked', false);
          }
        });
      }

      updateApplyButtonState();
    });
  });

  // Сброс фильтров
  $cancelBtn.on('click', function () {
    $searchInput.val('');
    searchText = '';
    $filterGroups.find('input[type="checkbox"]').prop('checked', false);
    $filterGroups.each(function () {
      const $group = $(this);
      const $toggle = $(this).find('.filter-toggle');
      const $headerText = $(this).find('.filter-header span').first();
      const filterName = $headerText.attr('data-original-name') || $headerText.text();
      $toggle.removeClass('reset open').html('<svg class="toggle-arrow" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '  <path d="M15.7202 7.34689L10.0952 12.9719C10.0168 13.0506 9.92368 13.113 9.82112 13.1556C9.71856 13.1981 9.60861 13.2201 9.49756 13.2201C9.38651 13.2201 9.27655 13.1981 9.17399 13.1556C9.07143 13.113 8.97829 13.0506 8.8999 12.9719L3.2749 7.34689C3.11639 7.18838 3.02734 6.9734 3.02734 6.74924C3.02734 6.52507 3.11639 6.31009 3.2749 6.15158C3.43341 5.99307 3.64839 5.90402 3.87256 5.90402C4.09672 5.90402 4.31171 5.99307 4.47021 6.15158L9.49826 11.1796L14.5263 6.15088C14.6848 5.99237 14.8998 5.90332 15.124 5.90332C15.3481 5.90332 15.5631 5.99237 15.7216 6.15088C15.8801 6.30939 15.9692 6.52437 15.9692 6.74853C15.9692 6.9727 15.8801 7.18768 15.7216 7.34619L15.7202 7.34689Z" fill="#9098B4" />\n' +
        '</svg>');
      $group.removeClass('selected open').addClass('default');
      const originalFilterName = $headerText.attr('data-original-name') || filterName;
      $headerText.text(originalFilterName);
      if (selectedFilters[filterName]) {
        delete selectedFilters[filterName];
      }
    });
    $searchFilters.hide();
    updateApplyButtonState();
    console.log('Все фильтры и текст сброшены');
  });
});