document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.price-range__input');
  const errorMessage = document.querySelector('.price-range__error');

  // Ограничиваем ввод только цифрами
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Валидация на событии blur
    input.addEventListener('blur', function() {
      const fromInput = document.querySelector('.price-range__input--from');
      const toInput = document.querySelector('.price-range__input--to');
      const fromValue = parseInt(fromInput.value) || 0; // Парсим в число, если пусто — 0
      const toValue = parseInt(toInput.value) || 0;

      // Проверяем, заполнены ли поля
      let hasError = false;
      let errorText = '';

      if (!fromInput.value) {
        fromInput.classList.add('price-range__input--error');
        hasError = true;
        errorText = 'Это поле обязательно для заполнения';
      } else {
        fromInput.classList.remove('price-range__input--error');
      }

      if (!toInput.value) {
        toInput.classList.add('price-range__input--error');
        hasError = true;
        errorText = 'Это поле обязательно для заполнения';
      } else {
        toInput.classList.remove('price-range__input--error');
      }

      // Проверяем диапазон, если оба поля заполнены
      if (fromInput.value && toInput.value && fromValue > toValue) {
        fromInput.classList.add('price-range__input--error');
        toInput.classList.add('price-range__input--error');
        hasError = true;
        errorText = 'Значение "от" не может быть больше "до"';
      }

      // Показываем/скрываем ошибку
      errorMessage.textContent = errorText;
      errorMessage.style.display = hasError ? 'block' : 'none';
    });
  });
});