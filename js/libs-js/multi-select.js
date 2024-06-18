$(document).ready(function () {
    let startTextInner;
    let startTextDropindrop;
    let activeDroplistCount = 0;
    let tempateActiveDroplistCount = ``;
    let requestSearchText;
    let searchValue = '';

    startTextDropindrop = $('.droplist__dropindrop').find('.droplist__result_text').data('start');


    $('.droplist__selected').click(function (e) {
        $('.droplist__inner').not($(this).closest('.droplist__inner')).removeClass('droplist_active');
        let cross = $( ".droplist__icon_cross" );

        if ( !cross.is(e.target)
            && cross.has(e.target).length === 0 ) {
            if($(this).closest('.droplist__inner').hasClass('droplist_active')) {
                $(this).closest('.droplist__inner').removeClass('droplist_active');
            }
            else {
                $(this).closest('.droplist__inner').addClass('droplist_active');
            }
        }

    });
    $('.droplist__inner .droplist__item').not('.droplist__item_nohover').click(function () {

        console.log(tempateActiveDroplistCount);
        startTextInner = $(this).closest('.droplist__inner').find('.droplist__result_text').data('start');

        let currentValInner = $(this).text();
        if($(this).closest('.droplist__inner').hasClass('droplist__select') || $(this).closest('.droplist__inner').hasClass('droplist__check') || $(this).closest('.droplist__inner').hasClass('droplist__fields')) {
            $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
        }

        if($(this).closest('.droplist__inner').hasClass('droplist__select')) {
            activeDroplistCountReturn();
            $(this).closest('.droplist__inner').find('.droplist__result').children('.droplist__result_text').text(currentValInner);
            $(this).addClass('droplist__item_active').siblings().removeClass('droplist__item_active');
        }

        if($(this).closest('.droplist__inner').hasClass('droplist__check') || $(this).closest('.droplist__inner').hasClass('droplist__fields')) {


            let currentValCheckedInner = $(this).closest('.droplist__inner').find('.check:checked').map(function () {
                return $(this).val();
            }).get().join(', ');


            if (currentValCheckedInner == 0) {
                $(this).closest('.droplist__inner').find('.droplist__result').removeClass('droplist__result_active');
                $(this).closest('.droplist__inner').find('.droplist__result_text').text(startTextInner);
                $(this).closest('.droplist__inner').find('.droplist__result').removeClass('droplist__result_max');
            }
            else {
                $(this).closest('.droplist__inner').find('.droplist__result').children('.droplist__result_text').text(currentValCheckedInner);
                $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
                $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_max');
                $(this).closest('.droplist__inner').find('input[type="text"]').val('');
                if ($(this).closest('.droplist__inner').hasClass('droplist__fields')) {
                    $(this).closest('.droplist__inner').find('.droplist__result').removeClass('droplist__result_max');
                }
            }

        }

    });
    $('.droplist__inner .droplist__icon_cross').click(function () {
        startTextInner = $(this).closest('.droplist__inner').find('.droplist__result_text').data('start');
        $(this).closest('.droplist__result').removeClass('droplist__result_active');
        $(this).closest('.droplist__inner').find('.droplist__item').removeClass('droplist__item_active');
        $(this).closest('.droplist__inner').find('input').prop('checked', false);
        $(this).closest('.droplist__inner').find('.droplist__field').val('');
        if($(this).closest('.droplist__inner').hasClass('droplist__select')) {
            $(this).closest('.droplist__inner').find('.droplist__result_text').text(startTextInner);
        }
        if($(this).closest('.droplist__inner').hasClass('droplist__fields')) {
            $(this).closest('.droplist__inner').find('.droplist__result_text').text(startTextInner);
        }
        activeDroplistCountReturn();
    });
    $('.droplist__dropindrop .droplist__icon_cross').click(function () {
        startTextInner = $(this).closest('.droplist__inner').find('.droplist__result_text').data('start');
        $('.droplist__inner .droplist__result').removeClass('droplist__result_active');
        $('.droplist__inner').find('.droplist__item').removeClass('droplist__item_active');

        $('.droplist__inner').each(function (index, element) {
            // element == this
            let startData = $(element).find('.droplist__result_text').data('start');
            console.log(startData);
            $(element).find('.droplist__result_text').text(startData);
            $(element).find('.droplist__items input[type="checkbox"]').prop('checked', false);
            $(element).find('.droplist__items input[type="text"]').val('');

        });
        activeDroplistCountReturn();
    });

    $('.droplist__inner .droplist__field_from, .droplist__inner .droplist__field_to').keyup(function () {

        let currentFromValInner = $(this).closest('.droplist__inner').find('.droplist__field_from').val();
        let currentToValInner = $(this).closest('.droplist__inner').find('.droplist__field_to').val();
        let fromValResultInner = 'от ' + currentFromValInner.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let toValResultInner = ' до ' + currentToValInner.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $(this).closest('.droplist__inner').find('.droplist__result').show();
        $(this).closest('.droplist__inner').find('.droplist__result').children('.droplist__result_text').text('');
        if(currentFromValInner !== '' && currentToValInner  == '') {
            $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist__inner').find('.droplist__result').children('.droplist__result_text').text(fromValResultInner);
            $(this).closest('.droplist__inner').find('input[type="checkbox"]').prop('checked', false);
            // $(this).closest('.droplist').find('input').prop('checked', false);
            // activeDroplistCountReturn();
        }
        if(currentToValInner  !== '' && currentFromValInner == '') {
            $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist__inner').find('.droplist__result').children('.droplist__result_text').text(toValResultInner);
            $(this).closest('.droplist__inner').find('input[type="checkbox"]').prop('checked', false);
            // $(this).closest('.droplist').find('input').prop('checked', false);
            // activeDroplistCountReturn();
        }
        if(currentFromValInner !== '' && currentToValInner  !== '') {
            $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist__inner').find('.droplist__result').children('.droplist__result_text').text(fromValResultInner + toValResultInner);
            $(this).closest('.droplist__inner').find('input[type="checkbox"]').prop('checked', false);
            // $(this).closest('.droplist').find('input').prop('checked', false);
            // activeDroplistCountReturn();
        }
        if(currentFromValInner == '' && currentToValInner == '') {
            $(this).closest('.droplist__inner').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist__inner').find('.droplist__result_text').text(startTextInner);

            // activeDroplistCountReturn();
        }
        if(currentFromValInner == '' && currentToValInner == '' && $(this).closest('.droplist').find('.check').is(':checked')) {
            $(this).closest('.droplist__inner').find('.droplist__result_text').text($(this).closest('.droplist__inner').find('.check:checked').val());
            $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
        }

    });
    // Использовать если списки в простом блоке
    // $(".droplist").mouseup( function(e){
    // 	let drop = $( "droplist__inner > .form__list" );
    // 	if ( !drop.is(e.target)
    // 	    && drop.has(e.target).length === 0 ) {
    //             $(this).removeClass('droplist_active');
    // 	}
    // });

    // Использовать если списки в Popup
    $('.drop__container').mouseup(function (e) {
        let dropInner = $( ".droplist__inner" );
        if (dropInner.has(e.target).length === 0){
            dropInner.removeClass('droplist_active');
        }
    });

    $('.droplist__selected_drop').click(function (e) {
        $(this).closest('.droplist__dropindrop').siblings('.drop__container').fadeToggle();
        $(this).closest('.droplist__dropindrop').toggleClass('droplist_active_outer');
        // $('.droplists__block > .droplist').removeClass('droplist_active');

    });

    function activeDroplistCountReturn() {
        // activeDroplistCount = $('.droplist__item_active').length;
        activeDroplistCount = $('.droplist__inner .droplist__result_active').length;
        tempateActiveDroplistCount = `Выбрано ${activeDroplistCount} опций`;
        $('.droplist__dropindrop .droplist__result_text').text(tempateActiveDroplistCount);
        // if($('.droplist__item_active').length < 1) {
        //     $('.droplist__dropindrop').find('.droplist__result_text').text(startTextDropindrop);
        // }
        if(activeDroplistCount == 0) {
            $('.droplist__dropindrop').find('.droplist__result_text').text(startTextDropindrop);
            $('.droplist__result').removeClass('droplist__result_active');
            // $('.droplist__inner').removeClass('droplist_active');
            $('.droplist__inner').find('.droplist__item').removeClass('droplist__item_active');
            $('.droplist__result').removeClass('droplist__result_max');
            $('.reques').remove();
            $('.droplist__inner_search .droplist__result_text').css('display', 'block');
            $('.droplist__inner_search .droplist__result').removeClass('droplist__result_search');
            $('.droplist__inner_search .droplist__result').removeClass('droplist__result_active');
        }
        else {
            $('.droplist__dropindrop').find('.droplist__result').addClass('droplist__result_active');
        }
    }

    $('.droplist__inner').change(function (e) {
        activeDroplistCountReturn();
    });


    function sendValueSearch() {
        searchValue = $('.droplist__field_search').val();
        requestSearchText = `<div class="reques"> <span>${searchValue}</span> <svg class="close__request" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_370)">
                            <path d="M12.5 4L3.5 13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.5 13L3.5 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_1_370">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                            </clipPath>
                            </defs>
                            </svg></div>`;
    }

    $('.droplist__field_search').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
            e.preventDefault();
            sendValueSearch();
            // $('.take__values_block').append(requestSearchText);

            $(this).closest('.droplist__fields').find('.requests').append(requestSearchText);
            $(this).val('');
            $(this).closest('.droplist__fields').find('.droplist__result_text').css('display', 'none');
            $(this).closest('.droplist__fields').find('.droplist__result').addClass('droplist__result_search');
            $(this).closest('.droplist__inner').find('.droplist__result').addClass('droplist__result_active');
            activeDroplistCountReturn();
        }

    });

    function removeRequest() {
        $(document).on('click','.close__request',function () {
            $(this).closest('.reques').remove();
            if($('.reques').length == 0) {
                $('.droplist__inner_search .droplist__result_text').css('display', 'block');
                $('.droplist__inner_search .droplist__result').removeClass('droplist__result_search');
                $('.droplist__inner_search .droplist__result').removeClass('droplist__result_active');
                activeDroplistCountReturn();
            }
        });
    }
    removeRequest();

});