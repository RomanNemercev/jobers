function initializeTagInput(containerId) {
    const container = document.getElementById(containerId);
    const addTagBtn = container.querySelector('.add-tag-btn');
    const tagsContainer = container.querySelector('.tags-container');

    addTagBtn.addEventListener('click', function () {
        addTagBtn.style.display = 'none'; // Скрыть кнопку "Добавить тег +"

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Введите тег';
        input.value = '#'; // Добавляем символ "#" при создании input

        input.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Предотвратить стандартное поведение (переход на следующую строку)
                finishTagInput(input, container);
            }
        });

        input.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                cancelTagInput(input, addTagBtn);
            }
        });

        container.insertBefore(input, addTagBtn.nextSibling);
        input.focus();
    });

    function finishTagInput(input, container) {
        const tagValue = input.value.trim();
        if (tagValue !== '') {
            const existingTags = container.querySelectorAll('.tag');
            let isDuplicate = false;
            existingTags.forEach((tag) => {
                if (tag.textContent === tagValue) {
                    isDuplicate = true;
                    return;
                }
            });

            if (!isDuplicate) {
                const tag = document.createElement('div');
                tag.classList.add('tag');
                tag.textContent = tagValue;

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'x';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    container.removeChild(tag);
                });

                tag.appendChild(deleteBtn);
                container.insertBefore(tag, addTagBtn);
            }
        }

        input.parentNode.removeChild(input); // Удалить input после завершения ввода
        addTagBtn.style.display = 'block'; // Показать кнопку "Добавить тег +"
    }

    function cancelTagInput(input, addTagBtn) {
        input.parentNode.removeChild(input); // Удалить input
        addTagBtn.style.display = 'block'; // Показать кнопку "Добавить тег +"
    }
}

// Вызываем функцию для каждого контейнера с тегами
// initializeTagInput('tag-input-1');

