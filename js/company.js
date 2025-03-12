// добавление новой комании
addPopupOpenHandler('.add-company', 'create-new-company');
addPopupCloseHandler('#create-close-new-company', 'create-new-company');
addPopupCloseOnBackgroundClickHandler('create-new-company');
addPopupCloseOnEscKeyHandler('create-new-company');

document.getElementById('create-new-company-cancel').addEventListener('click', function () {
    closePopup('create-new-company');
})

//редактирование компании
// добавление новой комании
addPopupOpenHandler('.company__get-correct', 'correct-company');
addPopupCloseHandler('correct-company-close', 'correct-company');
addPopupCloseOnBackgroundClickHandler('correct-company');
addPopupCloseOnEscKeyHandler('correct-company');

document.getElementById('correct-company-cancel').addEventListener('click', function () {
    closePopup('correct-company');
})

// закрытие окна редактирования и открытие подтверждения удаления
document.getElementById('access-del-company').addEventListener('click', function () {
    closePopup('correct-company');
    openPopup('del-company');
});

addPopupCloseHandler('#close-del-company', 'del-company');
addPopupCloseOnBackgroundClickHandler('del-company');
addPopupCloseOnEscKeyHandler('del-company');

document.getElementById('del-company-cancel').addEventListener('click', function () {
    closePopup('del-company');
})

addPopupOpenHandler('.delete-company', 'del-company');
addPopupCloseHandler('#close-del-company', 'del-company');
addPopupCloseOnBackgroundClickHandler('del-company');
addPopupCloseOnEscKeyHandler('del-company');
