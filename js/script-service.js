//search-city module
//search city place
let suggestions = [
  "Санкт-Петербург",
  "Невский проспект, Санкт-Петербург",
  "Дворцовая площадь, Санкт-Петербург",
  "Колпинский район, Санкт-Петербург",
  // любой список городов
];

let inputSearch = document.getElementById("search");
let suggestionsPane = document.getElementById("suggestions-pane");

inputSearch.addEventListener("keyup", function (event) {
  let value = event.target.value;
  suggestionsPane.innerHTML = '';
  let filteredSuggestions = suggestions.filter(function (suggestion) {
    // проверка на строки, содержащие введенные данные
    return suggestion.toLowerCase().includes(value.toLowerCase());
  });
  if (value && filteredSuggestions.length > 0) {
    suggestionsPane.style.display = 'block';
    filteredSuggestions.forEach(function (filteredSuggestion) {
      let div = document.createElement("div");
      div.textContent = filteredSuggestion;
      div.className = 'suggestion';
      div.addEventListener("click", function () {
        inputSearch.value = div.textContent;
        suggestionsPane.style.display = 'none';
      });
      suggestionsPane.appendChild(div);
    });
  } else {
    suggestionsPane.style.display = 'none';
  }
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('.search-box')) {
    suggestionsPane.innerHTML = '';
    suggestionsPane.style.display = 'none';
  }
});

//end search city module