$(document).ready(function () {
    $('.droplist__selected').click(function (e) {
        let cross = $( ".droplist__icon_cross" ); 
        
        if ( !cross.is(e.target) 
		    && cross.has(e.target).length === 0 ) { 
                $(this).closest('.droplist').toggleClass('droplist_active');
		}
        
    });
    $('.droplist__item').click(function () {

        let currentVal = $(this).text();

        if($(this).closest('.droplist').hasClass('droplist__select') || $(this).closest('.droplist').hasClass('droplist__check')) {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
        }
       
       if($(this).closest('.droplist').hasClass('droplist__select')) {
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(currentVal);
       }

       if($(this).closest('.droplist').hasClass('droplist__check')) {

        $(this).closest('.droplist').find('.droplist__result').addClass();
        let currentValChecked = $('.droplist__check .check:checked').map(function () {
            return $(this).val();
        }).get().join(', ');
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(currentValChecked);

        if (currentValChecked == 0) {
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result_text').text('Выберите несколько вариантов');
            $(this).closest('.droplist').find('.droplist__result').removeClass('droplist__result_max');
        }
        else {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_max');
        }
        
       }
        
        $(this).addClass('droplist__item_active').siblings().removeClass('droplist__item_active');
        
    });
    $('.droplist__icon_cross').click(function () { 
        $(this).closest('.droplist__result').removeClass('droplist__result_active');
        $(this).closest('.droplist').find('.droplist__item').removeClass('droplist__item_active');
        $(this).closest('.droplist').find('.droplist__field').val('');
        if($(this).closest('.droplist').hasClass('droplist__select')) {
            $(this).closest('.droplist').find('.droplist__result_text').text('Выберите 1 вариант');
        }
        if($(this).closest('.droplist').hasClass('droplist__fields')) {
            $(this).closest('.droplist').find('.droplist__result_text').text('Заработная плата');
        }
    });

    $('.droplist__field').keyup(function () {
        let currentFromVal = $('.droplist__field_from').val();
        let currentToVal = $('.droplist__field_to').val();
        let fromValResult = 'от ' + currentFromVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        let toValResult = ' до ' + currentToVal.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        $(this).closest('.droplist').find('.droplist__result').show();
        $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text('');
        if($('.droplist__field_from').val() !== '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(fromValResult);
        }
        if($('.droplist__field_to').val()  !== '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(toValResult);
        }
        if($('.droplist__field_from').val() !== '' && $('.droplist__field_to').val()  !== '') {
            $(this).closest('.droplist').find('.droplist__result').addClass('droplist__result_active');
            $(this).closest('.droplist').find('.droplist__result').children('.droplist__result_text').text(fromValResult + toValResult);
        }
        if($('.droplist__field').val() == '') {
            $(this).closest('.droplist').children('.droplist__result').removeClass('droplist__result_active');
        }
        
    });
    
    $(".droplist").mouseup( function(e){ 
		let drop = $( ".form__list" ); 
		if ( !drop.is(e.target) 
		    && drop.has(e.target).length === 0 ) { 
                $(this).removeClass('droplist_active');
		}
	});
   
});