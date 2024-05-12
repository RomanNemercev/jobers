let timeout
const popUpTablet = document.querySelector('.pop-up__tablet')

popUpTablet.addEventListener('scroll', function () {
  clearTimeout(timeout)

  popUpTablet.style.scrollbarWidth = 'auto'

  timeout = setTimeout(function () {
    popUpTablet.style.scrollbarWidth = 'none'
  }, 1000)
})
