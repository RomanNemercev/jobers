$(function () {
  var commentAdded = false;
  var $btnComment = $(".card__btn-comments");
  var $commentBlock = $(".card__comment");
  var $completeBlock = $(".card__complete");
  var $textarea = $(".card__textarea-space");
  var $approveBtn = $(".card__comment-approve");
  var $cancelBtn = $(".card__comment-cancel");
  var $removeBtn = $(".card__complete-remove");
  var $completeName = $(".card__complete-title");
  var $completeValue = $(".card__complete-value");

  // 1. Показать блок комментария
  $btnComment.on("click", function () {
    if (commentAdded) return;
    $commentBlock.show();
    $textarea.val("").focus();
  });

  // 2. Подтвердить комментарий
  $approveBtn.on("click", function () {
    var text = $textarea.val().trim();
    if (!text) return;
    $commentBlock.hide();
    $completeBlock.show();
    $completeName.text("Геннадий Максимов"); // Статичное имя
    $completeValue.text(text);
    commentAdded = true;
    $btnComment.prop("disabled", true).addClass("disabled");
  });

  // 3. Отмена комментария
  $cancelBtn.on("click", function () {
    $textarea.val("");
    $commentBlock.hide();
  });

  // 4. Удалить комментарий
  $removeBtn.on("click", function () {
    $completeBlock.hide();
    $completeValue.text("");
    commentAdded = false;
    $btnComment.prop("disabled", false).removeClass("disabled");
  });

  // 5. Сбросить состояние при загрузке
  $commentBlock.hide();
  $completeBlock.hide();
  $btnComment.prop("disabled", false).removeClass("disabled");
});

// расчет высоты для card__main
function setCardMainHeight() {
  var cardHeader = document.querySelector(".card__header");
  var cardMain = document.querySelector(".card__main");
  var cardWrapper = document.querySelector(".card__wrapper");
  if (!cardHeader || !cardMain || !cardWrapper) return;
  var wrapperHeight = cardWrapper.clientHeight;
  var headerHeight = cardHeader.offsetHeight;
  var mainHeight = wrapperHeight - headerHeight;
  cardMain.style.height = mainHeight + "px";
}

window.addEventListener("resize", setCardMainHeight);

var observer = new MutationObserver(setCardMainHeight);
observer.observe(document.querySelector(".card__wrapper"), {
  childList: true,
  subtree: true,
  attributes: true,
});

document.addEventListener("DOMContentLoaded", setCardMainHeight);
