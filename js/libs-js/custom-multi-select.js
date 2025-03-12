$(document).ready(function() {
  const $selectHeader = $('.select-header');
  const $selectOptions = $('.select-options');
  const $options = $('.option');
  const $arrow = $('.select-arrow');
  let selectedValues = [];

//   close or open list
  $selectHeader.on('click', function() {
    $selectOptions.toggleClass('active');
    $arrow.toggleClass('active');
    $selectHeader.toggleClass('active');
  });

//   data processing options
  $options.on('click', function() {
    const $checkbox = $(this).find('.checkbox');
    const value = $(this).data('value');
    const index = selectedValues.indexOf(value);

    if (index === -1) {
      selectedValues.push(value);
      $checkbox.addClass('active');
    } else {
      selectedValues.splice(index, 1);
      $checkbox.removeClass('active');
    }

    updatePlaceholder();

    // add or remove selected based on whether we have active items
    if (selectedValues.length > 0) {
      $selectHeader.addClass('selected');
    } else {
      $selectHeader.removeClass('selected');
    }
  });

//   update value in header
  function updatePlaceholder() {
    if (selectedValues.length > 0) {
      const displayText = selectedValues.join(', ');
      $('.select-placeholder').text(displayText);
    } else {
      $('.select-placeholder').text('Выберите площадку');
    }
  }

// close on click out of zone component
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.custom-select').length) {
      $selectOptions.removeClass('active');
      $arrow.removeClass('active');
      $selectHeader.removeClass('active');
    //   on close remove selected if we don't have any values
      if (selectedValues.length === 0) {
        $selectHeader.removeClass('selected');
      }
    }
  });
})
