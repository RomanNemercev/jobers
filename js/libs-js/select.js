$(document).ready(function () {
     let startText;

    $('.droplist__selected').click(function (e) {
        $('.droplist').not($(this).closest('.droplist')).removeClass('droplist_active');
        let cross = $( ".droplist__icon_cross" ); 
        
        if ( !cross.is(e.target) 
		    && cross.has(e.target).length === 0 ) { 
                $(this).closest('.droplist').toggleClass('droplist_active');
		}
        
    });
    $('.droplist__item').click(function () {
        startText = $(this).closest('.droplist').find('.droplist__result_text').data('start');
        console.log(startText);
        let currentVal = $(this).text();

        if($(this).closest('.droplist').hasClass('droplist__select') || $(this).closest('.droplist').hasClass('droplist__check')) {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
        }
       
       if($(this).closest('.droplist').hasClass('droplist__select')) {
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(currentVal);
       }

       if($(this).closest('.droplist').hasClass('droplist__check')) {

        $(this).closest('.droplist').find('.droplist__result').addClass();
        let currentValChecked = $(this).closest('.droplist').find('.check:checked').map(function () {
            return $(this).val();
        }).get().join(', ');
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(currentValChecked);

        if (currentValChecked == 0) {
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_max');
        }
        else {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_max');
        }
        
       }
        
        $(this).addClass('droplist__item_active').siblings().removeClass('droplist__item_active');
        
    });
    $('.droplist__icon_cross').click(function () { 
        startText = $(this).closest('.droplist').find('.droplist__result_text').data('start');
        $(this).closest('.droplist__result').removeClass('droplist__result_active');
        $(this).closest('.droplist').find('.droplist__item').removeClass('droplist__item_active');
        $(this).closest('.droplist').find('.droplist__field').val('');
        if($(this).closest('.droplist').hasClass('droplist__select')) {
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
        }
        if($(this).closest('.droplist').hasClass('droplist__fields')) {
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
        }
    });

    $('.droplist__field').keyup(function () {
        let currentFromVal = $(this).closest('.droplist').find('.droplist__field_from').val();
        let currentToVal = $(this).closest('.droplist').find('.droplist__field_to').val();
        let fromValResult = 'от ' + currentFromVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let toValResult = ' до ' + currentToVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $(this).closest('.droplist').find('.droplist__result').show();
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text('');

        if(currentFromVal !== '' && currentToVal  == '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(fromValResult);
        }
        if(currentToVal  !== '' && currentFromVal == '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(toValResult);
        }
        if(currentFromVal !== '' && currentToVal  !== '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(fromValResult + toValResult);
        }
        if(currentFromVal == '' && currentToVal == '') {
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result_text').text(startText);
        }
        
    });
     // Использовать если списки в простом блоке
    $(".droplist").mouseup( function(e){ 
		let drop = $( ".form__list" );
		if ( !drop.is(e.target) 
		    && drop.has(e.target).length === 0 ) { 
                $(this).removeClass('droplist_active');
		}
	});

    // Использовать если списки в Popup
    // $('.cabinet__popup').mouseup(function (e) {
    //     let drop = $( ".droplist" );
    //     if (drop.has(e.target).length === 0){
    //         drop.removeClass('droplist_active');
    //     }
    // });

    $('.new-can__container').mouseup(function (e) {
        let drop = $( ".droplist" );
        if (drop.has(e.target).length === 0){
            drop.removeClass('droplist_active');
        }
    });


    $('.item__popup-wrapper').mouseup(function (e) {
        let drop = $( ".droplist" );
        if (drop.has(e.target).length === 0){
            drop.removeClass('droplist_active');
        }
    });
});