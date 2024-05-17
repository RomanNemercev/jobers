$(document).ready(function () {
     let startText;
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
    $('.droplist__item').not('.droplist__item_nohover').click(function () {
        
        console.log(tempateActiveDroplistCount);
        startText = $(this).closest('.droplist').find('.droplist__result_text').data('start');
        console.log(startText);
        let currentVal = $(this).text();
        if($(this).closest('.droplist').hasClass('droplist__select') || $(this).closest('.droplist').hasClass('droplist__check') || $(this).closest('.droplist').hasClass('droplist__fields')) {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
        }
       
       if($(this).closest('.droplist').hasClass('droplist__select')) {
        activeDroplistCountReturn();
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(currentVal);
        $(this).addClass('droplist__item_active').siblings().removeClass('droplist__item_active');
       }

       if($(this).closest('.droplist').hasClass('droplist__check') || $(this).closest('.droplist').hasClass('droplist__fields')) {
        if($(this).children('input').is(':checked')) {
            $(this).addClass('droplist__item_active');
        }
        else {
            $(this).removeClass('droplist__item_active');
        }
        
        let currentValChecked = $(this).closest('.droplist').find('.check:checked').map(function () {
            return $(this).val();
        }).get().join(', ');
        if($(this).closest('.droplist').find('input[type="text"]').val() == '') {
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(currentValChecked);
        }
        

        if (currentValChecked == 0 && $(this).closest('.droplist').find('input[type="text"]').val() == '') {
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_max');
        }
        else {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_max');
            if($(this).closest('.droplist').hasClass('droplist__fields')) {
                $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_max');
                $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            }
        }
        // if($(this).closest('.droplist').find('input[type="text"]').length > 0) {
        //     $(this).closest('.droplist').find('input[type="text"]').val('');
        // }
        
       }
        
    });
    $('.droplist__inner .droplist__icon_cross').click(function () {
        startText = $(this).closest('.droplist').find('.droplist__result_text').data('start');
        $(this).closest('.droplist__result').removeClass('droplist__result_active');
        $(this).closest('.droplist').find('.droplist__item').removeClass('droplist__item_active');
        $(this).closest('.droplist').find('input').prop('checked', false);
        $(this).closest('.droplist').find('.droplist__field').val('');
        if($(this).closest('.droplist').hasClass('droplist__select')) {
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
        }
        if($(this).closest('.droplist').hasClass('droplist__fields')) {
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
        }
        activeDroplistCountReturn();
    });
    $('.droplist__dropindrop .droplist__icon_cross').click(function () {
        startText = $(this).closest('.droplist').find('.droplist__result_text').data('start');
        $('.droplist__result').removeClass('droplist__result_active');
        $('.droplist').find('.droplist__item').removeClass('droplist__item_active');
       
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

    $('.droplist__field_from, .droplist__field_to').keyup(function () {
        let currentFromVal = $(this).closest('.droplist').find('.droplist__field_from').val();
        let currentToVal = $(this).closest('.droplist').find('.droplist__field_to').val();
        let fromValResult = 'от ' + currentFromVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let toValResult = ' до ' + currentToVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $(this).closest('.droplist').find('.droplist__result').show();
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text('');
        if(currentFromVal !== '' && currentToVal  == '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(fromValResult);
            // $(this).closest('.droplist').find('input').prop('checked', false);
            // activeDroplistCountReturn();
        }
        if(currentToVal  !== '' && currentFromVal == '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(toValResult);
            // $(this).closest('.droplist').find('input').prop('checked', false);
            // activeDroplistCountReturn();
        }
        if(currentFromVal !== '' && currentToVal  !== '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(fromValResult + toValResult);
            // $(this).closest('.droplist').find('input').prop('checked', false);
            // activeDroplistCountReturn();
        }
        if(currentFromVal == '' && currentToVal == '') {
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
            
            // activeDroplistCountReturn();
        }
        if(currentFromVal == '' && currentToVal == '' && $(this).closest('.droplist').find('.check').is(':checked')) {
            $(this).closest('.droplist').find('.droplist__result_text').text($(this).closest('.droplist').find('.check:checked').val());
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
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
        let drop = $( ".droplist" );
        if (drop.has(e.target).length === 0){
            drop.removeClass('droplist_active');
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
            $('.droplist').find('.droplist__item').removeClass('droplist__item_active');
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
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
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