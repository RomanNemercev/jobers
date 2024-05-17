//add tags script
// Получаем необходимые элементы
const tagInput = document.getElementById('tag-input');
const tagOptions = document.querySelector('.tag-options');
const selectedTags = document.querySelector('.selected-tags');

const tagsExample = [
    'B2B продажи',
    'B2C продажи',
    'FMCG продажи',
    'Автоматизация продаж',
    'Агентские продажи',
    'Активные продажи',
    'Анализ продаж',
];
// Массив для хранения выбранных тегов
let selectedTagsArray = [];
// Флаг для контроля обновления списка тегов при удалении
let shouldUpdateTagOptions = true;

// Функция для отображения вариантов тегов
function showTagOptions(tags) {
    tagOptions.innerHTML = '';
    if (tags.length > 0) {
        const header = document.createElement('p');
        header.classList.add('tag-options-header');
        // Изменяем текст заголовка в зависимости от наличия введенных данных
        header.textContent = tagInput.value.trim() ? 'Найдено:' : 'Предложенные навыки по вашей специализации';
        tagOptions.appendChild(header);
        tagOptions.style.cssText = 'padding: 15px; margin-top: 10px;';
    }
    tags.forEach(tag => {
        // Проверяем, что тег не выбран
        if (!selectedTagsArray.includes(tag)) {
            const tagElement = document.createElement('div');
            tagElement.classList.add('tag-option');
            tagElement.textContent = tag;
            tagElement.addEventListener('click', (event) => {
                event.stopPropagation(); // Остановить всплытие события
                selectTag(tag);
                selectedTags.style.marginBottom = '10px';
            });
            tagOptions.appendChild(tagElement);
        }
    });
}

// Функция для выбора тега
function selectTag(tag) {
    // Добавляем выбранный тег в массив
    selectedTagsArray.push(tag);
    // Обновляем список выбранных тегов
    updateSelectedTags();
    // Очищаем input
    tagInput.value = '';
    // Обновляем список вариантов тегов
    const inputValue = tagInput.value.toLowerCase();
    const filteredTags = tagsExample
        .filter(tag => tag.toLowerCase().includes(inputValue))
        .sort();
    showTagOptions(filteredTags);
}

// Функция для обновления списка выбранных тегов
function updateSelectedTags() {
    selectedTags.innerHTML = '';
    selectedTagsArray.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.classList.add('selected-tag');
        tagElement.textContent = tag;

        // Создаем элемент для крестика удаления тега
        const closeIcon = document.createElement('span');
        closeIcon.classList.add('close-icon');
        // closeIcon.innerHTML = '&times;'; // Используем символ крестика
        tagElement.appendChild(closeIcon);

        // Обработчик события при клике на крестик для удаления тега
        closeIcon.addEventListener('click', (event) => {
            event.stopPropagation(); // Остановить всплытие события
            removeTag(tag);
        });

        selectedTags.appendChild(tagElement);
    });
}

// Функция для удаления выбранного тега
function removeTag(tag) {
    selectedTagsArray = selectedTagsArray.filter(item => item !== tag);
    updateSelectedTags();
    if (shouldUpdateTagOptions) {
        const inputValue = tagInput.value.toLowerCase();
        const filteredTags = tagsExample
            .filter(tag => tag.toLowerCase().includes(inputValue))
            .sort();
        showTagOptions(filteredTags);
    }
}

// Обработчик события при фокусировке на input
tagInput.addEventListener('focus', () => {
    // Показываем варианты тегов
    shouldUpdateTagOptions = true; // Разрешаем обновление списка тегов
    const inputValue = tagInput.value.toLowerCase();
    const filteredTags = tagsExample
        .filter(tag => tag.toLowerCase().includes(inputValue))
        .sort();
    showTagOptions(filteredTags);
});

// Обработчик события при вводе текста в input
tagInput.addEventListener('input', () => {
    // Фильтруем и сортируем варианты тегов
    shouldUpdateTagOptions = true; // Разрешаем обновление списка тегов
    const inputValue = tagInput.value.toLowerCase();
    const filteredTags = tagsExample
        .filter(tag => tag.toLowerCase().includes(inputValue))
        .sort();
    // Показываем отфильтрованные и отсортированные варианты тегов
    showTagOptions(filteredTags);
});


// Обработчик события при клике за пределы контейнера компонента
document.addEventListener('click', (event) => {
    // Проверяем, что клик не по элементу для удаления тега
    if (!event.target.closest('.tag-input-container') && !event.target.classList.contains('close-icon')) {
        // Если клик был за пределами компонента, очищаем список вариантов тегов
        tagOptions.innerHTML = '';
        tagOptions.style.cssText = 'padding: 0; margin-top: 0;';
        shouldUpdateTagOptions = false; // Запрещаем обновление списка тегов
    }
});