let timeout;
const popUpTablet = $('.pop-up__tablet');

popUpTablet.on('scroll', function() {
  clearTimeout(timeout);

  popUpTablet.css('scrollbar-width', 'auto');

  timeout = setTimeout(function() {
    popUpTablet.css('scrollbar-width', 'none');
  }, 1000);
});