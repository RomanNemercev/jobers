(function ($) {

    "use strict";

    $(document).ready(function () {
        $('#multiple-checkboxes').multiselect({
            nonSelectedText: 'Выберите несколько вариантов',
        });
    });

})(jQuery);

//tooltip
const tooltips = document.querySelectorAll('.tt');
tooltips.forEach(t => {
    new bootstrap.Tooltip(t)
})