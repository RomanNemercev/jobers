//search-city reused
function createAutocomplete(inputSearchId, suggestionsPaneId, suggestions) {
    let inputSearch = document.getElementById(inputSearchId);
    let suggestionsPane = document.getElementById(suggestionsPaneId);

    inputSearch.addEventListener("keyup", function (event) {
        let value = event.target.value;
        suggestionsPane.innerHTML = '';
        let filteredSuggestions = suggestions.filter(function (suggestion) {
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
        if (!event.target.closest('#' + suggestionsPaneId)) {
            suggestionsPane.innerHTML = '';
            suggestionsPane.style.display = 'none';
        }
    });
}


//example:
// let cities = [
//     "Санкт-Петербург",
//     "Невский проспект, Санкт-Петербург",
//     "Дворцовая площадь, Санкт-Петербург",
//     "Колпинский район, Санкт-Петербург",
//     // список городов
// ];
//
// let metroStations = [
//     "Адмиралтейская",
//     "Академическая",
//     "Балтийская",
//     "Беговая",
//     "Бухаресткая"
//     // список станций метро
// ];
//
// createAutocomplete("search-cities", "suggestions-pane-cities", cities);
// createAutocomplete("search-metro", "suggestions-pane-metro", metroStations);
// html:
// <div>
//     <!-- Поле ввода и контейнер для предложений городов-->
//     <input id="search-cities" type="text" placeholder="Введите название города" className="search-reused__input">
//         <div id="suggestions-pane-cities" style="display: none;" className="search-reused__suggestion"></div>
// </div>