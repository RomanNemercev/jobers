function dropL() {
    $('.droplist__selected').click(function (e) {
        $('.droplist:not(.droplist__inner)').not($(this).closest('.droplist:not(.droplist__inner)')).removeClass('droplist_active');
        let cross = $( ".droplist__icon_cross" );

        if ( !cross.is(e.target)
            && cross.has(e.target).length === 0 ) {
            $(this).closest('.droplist:not(.droplist__inner)').toggleClass('droplist_active');
        }


    });
    $('.droplist__item').click(function () {
        startText = $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').data('start');
        console.log(startText);
        let currentVal = $(this).text();

        if($(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__select') || $(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__check')) {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').addClass('droplist__result_active');
        }

        if($(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__select')) {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text(currentVal);
        }

        if($(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__check')) {


            let currentValChecked = $(this).closest('.droplist:not(.droplist__inner)').find('.check:checked').map(function () {
                return $(this).val();
            }).get().join(', ');
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text(currentValChecked);

            if (currentValChecked == 0) {
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').removeClass('droplist__result_active');
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').text(startText);
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').removeClass('droplist__result_max');
            }
            else {
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').addClass('droplist__result_max');
            }

        }

        if($(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__fields') && $(this).is(':not(.droplist__item_nohover)')) {
            if($('input[type="checkbox"]').length > 0 && $('input[type="checkbox"]').is(':checked')) {
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').addClass('droplist__result_active');
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text($(this).text());
                $(this).closest('.droplist:not(.droplist__inner)').find('input[type="text"]').val('');
            }
            else {
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').removeClass('droplist__result_active');
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').removeClass('droplist__result_max');
                $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').text(startText);
            }

        }

        $(this).addClass('droplist__item_active').siblings().removeClass('droplist__item_active');

    });
    $('.droplist__icon_cross').click(function () {
        startText = $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').data('start');
        $(this).closest('.droplist__result').removeClass('droplist__result_active');
        $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__item').removeClass('droplist__item_active');
        $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__field').val('');
        if($(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__select')) {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').text(startText);
        }
        if($(this).closest('.droplist:not(.droplist__inner)').hasClass('droplist__fields')) {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').text(startText);
            $(this).closest('.droplist:not(.droplist__inner)').find('input[type="checkbox"]').prop('checked', false);
        }
    });

    $('.droplist:not(.droplist__inner) .droplist__field').keyup(function () {
        let currentFromVal = $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__field_from').val();
        let currentToVal = $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__field_to').val();
        let fromValResult = 'от ' + currentFromVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let toValResult = ' до ' + currentToVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').show();
        $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text('');

        if(currentFromVal !== '' && currentToVal  == '') {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text(fromValResult);
            $(this).closest('.droplist:not(.droplist__inner)').find('input[type="checkbox"]').prop('checked', false);
        }
        if(currentToVal  !== '' && currentFromVal == '') {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text(toValResult);
            $(this).closest('.droplist:not(.droplist__inner)').find('input[type="checkbox"]').prop('checked', false);
        }
        if(currentFromVal !== '' && currentToVal  !== '') {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').children('.droplist__result_text').text(fromValResult + toValResult);
            $(this).closest('.droplist:not(.droplist__inner)').find('input[type="checkbox"]').prop('checked', false);
        }
        if(currentFromVal == '' && currentToVal == '') {
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist:not(.droplist__inner)').find('.droplist__result_text').text(startText);
        }

    });
    // Использовать если списки в простом блоке
    $(".droplist:not(.droplist__inner)").mouseup( function(e){
        let drop = $( ".form__list" );
        if ( !drop.is(e.target)
            && drop.has(e.target).length === 0 ) {
            $(this).removeClass('droplist_active');
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