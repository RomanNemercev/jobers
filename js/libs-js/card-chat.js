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
  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (isMobile()) {
    console.log("Экран до 768px!!!");
    return;
  }
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

// ====== MOBILE SCRIPTS (<=768px) ======
(function () {
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // 1. Закрытие чата по клику на .card__close-wrapper
  $(document).on("click", ".card__close-wrapper", function () {
    if (isMobile()) {
      $(".chat__container.card").removeClass("visible");
    }
  });

  // 2. Переключение табов резюме/чат
  $(document).on(
    "click",
    ".card__navigation-resume, .card__navigation-chat",
    function () {
      if (!isMobile()) return;
      var $resumeTab = $(".card__navigation-resume");
      var $chatTab = $(".card__navigation-chat");
      var $cardWrapper = $(".card__wrapper");
      var $chatWrapper = $(".chat__wrapper");
      if ($(this).hasClass("card__navigation-resume")) {
        $resumeTab.addClass("active");
        $chatTab.removeClass("active");
        $cardWrapper.addClass("active");
        $chatWrapper.removeClass("active");
      } else {
        $chatTab.addClass("active");
        $resumeTab.removeClass("active");
        $chatWrapper.addClass("active");
        $cardWrapper.removeClass("active");
      }
    }
  );

  // 3. Высота .card__main для мобильной версии
  function setCardMainHeightMobile() {
    var cardMain = document.querySelector(".card__main");
    if (!cardMain) return;
    if (isMobile()) {
      console.log("begin new logics for mobile");
      cardMain.style.height = window.innerHeight - 163 + "px";
    } else {
      // Старая логика (оставляем для десктопа)
      // var cardHeader = document.querySelector(".card__header");
      // var cardWrapper = document.querySelector(".card__wrapper");
      // if (!cardHeader || !cardWrapper) return;
      // var wrapperHeight = cardWrapper.clientHeight;
      // var headerHeight = cardHeader.offsetHeight;
      // var mainHeight = wrapperHeight - headerHeight;
      // cardMain.style.height = mainHeight + "px";
      console.log("begin old logics for pc");
    }
  }

  window.addEventListener("resize", setCardMainHeightMobile);
  document.addEventListener("DOMContentLoaded", setCardMainHeightMobile);

  // 4. Высота .chat__timeline-wrapper для мобильной версии
  function setTimelineWrapperHeightMobile() {
    var timelineWrapper = document.querySelector(".chat__timeline-wrapper");
    if (!timelineWrapper) return;
    if (isMobile()) {
      // 61px дополнительно вычитаем
      timelineWrapper.style.height = window.innerHeight - 199 + "px";
    } else {
      // timelineWrapper.style.height = "";
      console.log("call pc logics for complete height of chat space");
    }
  }

  window.addEventListener("resize", setTimelineWrapperHeightMobile);
  document.addEventListener("DOMContentLoaded", setTimelineWrapperHeightMobile);

  // 5. Открытие/закрытие dropdown по клику на header
  $(document).on("click", ".card__dropdown-header", function (e) {
    if (!isMobile()) return;
    e.stopPropagation();
    var $dropdown = $(this).closest(".card__dropdown-768");
    $dropdown.toggleClass("active");
  });

  // Закрытие dropdown по клику вне или по элементу списка
  $(document).on("click", function (e) {
    if (!isMobile()) return;
    var $dropdown = $(".card__dropdown-768");
    if (!$dropdown.length) return;
    if (!$(e.target).closest(".card__dropdown-768").length) {
      $dropdown.removeClass("active");
    }
  });
  $(document).on("click", ".card__dropdown-item", function () {
    if (!isMobile()) return;
    $(this).closest(".card__dropdown-768").removeClass("active");
  });

  // 6. Кнопка .btn__comments-768 запускает сценарий комментария
  $(document).on("click", ".btn__comments-768", function (e) {
    if (!isMobile()) return;
    e.stopPropagation();
    var $btnComment = $(".card__btn-comments");
    if ($btnComment.length) $btnComment.trigger("click");
    $(this).closest(".card__dropdown-768").removeClass("active");
  });
})();
