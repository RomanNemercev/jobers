function dropL() {
    // Обработчик клика по элементу droplist__selected для открытия/закрытия списка
    $('.droplist__selected').click(function (e) {
        // Закрыть все открытые списки, кроме текущего
        $('.droplist:not(.droplist__inner)').not($(this).closest('.droplist:not(.droplist__inner)')).removeClass('droplist_active');

        let cross = $(".droplist__icon_cross");

        if (!cross.is(e.target) && cross.has(e.target).length === 0) {
            $(this).closest('.droplist:not(.droplist__inner)').toggleClass('droplist_active');
        }
    });

    // Обработчик клика по элементу droplist__item для выбора элемента из списка
    $('.droplist__item').click(function () {
        let startText = $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').data('start');
        let currentVal = $(this).text();
        let $droplist = $(this).closest('.droplist:not(.droplist__inner)');
        let $result = $droplist.find('.droplist__result');

        if ($droplist.hasClass('droplist__select') || $droplist.hasClass('droplist__check')) {
            $result.addClass('droplist__result_active');
        }

        if ($droplist.hasClass('droplist__select')) {
            $result.children('.droplist__result_text').text(currentVal);
        }

        if ($droplist.hasClass('droplist__check')) {
            let currentValChecked = $droplist.find('.check:checked').map(function () {
                return $(this).val();
            }).get().join(', ');

            $result.children('.droplist__result_text').text(currentValChecked);

            if (currentValChecked == 0) {
                $result.removeClass('droplist__result_active').removeClass('droplist__result_max');
                $result.children('.droplist__result_text').text(startText);
            } else {
                $result.addClass('droplist__result_max');
            }
        }

        if ($droplist.hasClass('droplist__fields') && $(this).is(':not(.droplist__item_nohover)')) {
            if ($('input[type="checkbox"]').length > 0 && $('input[type="checkbox"]').is(':checked')) {
                $result.addClass('droplist__result_active');
                $result.children('.droplist__result_text').text($(this).text());
                $droplist.find('input[type="text"]').val('');
            } else {
                $result.removeClass('droplist__result_active').removeClass('droplist__result_max');
                $result.children('.droplist__result_text').text(startText);
            }
        }

        $(this).addClass('droplist__item_active').siblings().removeClass('droplist__item_active');
    });

    // Обработчик клика по крестику для сброса выбора
    $('.droplist__icon_cross').click(function () {
        let startText = $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').data('start');
        let $droplist = $(this).closest('.droplist:not(.droplist__inner)');
        let $result = $droplist.find('.droplist__result');

        $result.removeClass('droplist__result_active');
        $droplist.find('.droplist__item').removeClass('droplist__item_active');
        $droplist.find('.droplist__field').val('');

        if ($droplist.hasClass('droplist__select') || $droplist.hasClass('droplist__fields')) {
            $result.children('.droplist__result_text').text(startText);
        }

        if ($droplist.hasClass('droplist__fields')) {
            $droplist.find('input[type="checkbox"]').prop('checked', false);
        }
    });

    // Обработчик ввода текста в поле
    $('.droplist:not(.droplist__inner) .droplist__field').keyup(function () {
        let $droplist = $(this).closest('.droplist:not(.droplist__inner)');
        let currentFromVal = $droplist.find('.droplist__field_from').val();
        let currentToVal = $droplist.find('.droplist__field_to').val();
        let fromValResult = 'от ' + currentFromVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let toValResult = ' до ' + currentToVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let $result = $droplist.find('.droplist__result');

        $result.show().children('.droplist__result_text').text('');

        if (currentFromVal !== '' && currentToVal == '') {
            $result.addClass('droplist__result_active').children('.droplist__result_text').text(fromValResult);
            $droplist.find('input[type="checkbox"]').prop('checked', false);
        } else if (currentToVal !== '' && currentFromVal == '') {
            $result.addClass('droplist__result_active').children('.droplist__result_text').text(toValResult);
            $droplist.find('input[type="checkbox"]').prop('checked', false);
        } else if (currentFromVal !== '' && currentToVal !== '') {
            $result.addClass('droplist__result_active').children('.droplist__result_text').text(fromValResult + toValResult);
            $droplist.find('input[type="checkbox"]').prop('checked', false);
        } else {
            $result.removeClass('droplist__result_active').children('.droplist__result_text').text(startText);
        }
    });

    // Закрытие списка при клике вне его
    $(document).mouseup(function (e) {
        let $activeDropList = $('.droplist_active');

        // Проверить, находится ли клик внутри активного droplist или form__list
        if (!$activeDropList.is(e.target) && $activeDropList.has(e.target).length === 0 &&
            !$(".form__list").is(e.target) && $(".form__list").has(e.target).length === 0) {
            $activeDropList.removeClass('droplist_active');
        }
    });
}

$(document).ready(function () {
    let startText;

    dropL();

    // Использовать если списки в Popup
    $('.cabinet__popup').mouseup(function (e) {
        let drop = $( ".droplist:not(.droplist__inner)" );
        if (drop.has(e.target).length === 0){
            drop.removeClass('droplist_active');
        }
    });

    $('.new-can__container').mouseup(function (e) {
        let drop = $( ".droplist:not(.droplist__inner)" );
        if (drop.has(e.target).length === 0){
            drop.removeClass('droplist_active');
        }
    });


    $('.item__popup-wrapper').mouseup(function (e) {
        let drop = $( ".droplist:not(.droplist__inner)" );
        if (drop.has(e.target).length === 0){
            drop.removeClass('droplist_active');
        }
    });

});