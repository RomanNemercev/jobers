$(function () {
  const chatContainer = document.querySelector(".chat__container");
  const overlayPage = document.querySelector(".chat__overlay");
  // Сброс всех флагов состояний
  function resetTimelineFlags() {
    var $timeline = $(".chat__timeline-wrapper");
    $timeline.removeClass("loading chats staff begin selected active end new");
  }
  $(".chat__timeline-wrapper").data("first-message-sent", false);

  // Открытие чата с нужными флагами
  $(document).on("click", ".chat__event", function () {
    var $timeline = $(".chat__timeline-wrapper");
    resetTimelineFlags();
    chatContainer.classList.add("visible");
    $timeline.addClass("loading");
    try {
      overlayPage.classList.add("visible");
    } catch (e) {
      console.log("overlay mask undefined - line 223");
    }
    if ($(this).hasClass("chats--trigger")) {
      $timeline.addClass("chats");
    }
    if ($(this).hasClass("support--trigger")) {
      $timeline.addClass("staff");
    }
    // Плавный переход к состоянию begin
    setTimeout(function () {
      $timeline.removeClass("loading chats staff").addClass("begin");
    }, 2000);
  });

  // 2. Сброс флагов при закрытии чата
  $(document).on("click", ".chat__hide", function () {
    resetTimelineFlags();
  });

  $(document).on("click", ".chat__begin-theme .droplist__item", function () {
    var $timeline = $(".chat__timeline-wrapper");
    $timeline.removeClass("begin").addClass("selected");
    $(this).closest(".droplist").removeClass("droplist_active");
    if (typeof updateTimelineHeight === "function") {
      console.log("updTimelineHeight === true");
      updateTimelineHeight();
    }
  });

  $(document).on(
    "click",
    ".chat__begin-theme .droplist__icon_cross",
    function (e) {
      e.stopPropagation();
      var $timeline = $(".chat__timeline-wrapper");
      $timeline.removeClass("selected").addClass("begin");
      if (typeof updateTimelineHeight === "function") {
        console.log("updTimelineHeight === true");
        updateTimelineHeight();
      }
    }
  );

  // 3. Флаг для первого нажатия
  // в начале документа глобально объявил флаг для первой отправки

  // Обработка нажатия на кнопку отправки сообщения
  $(document).on("click", ".chat__input-btn", function (e) {
    console.log("click on send message");
    var $timeline = $(".chat__timeline-wrapper");
    var theme = $(".chat__begin-theme .droplist__result_text").text().trim();
    var message = $(".chat__input-space").val().trim();
    if (!theme || !message) return false;

    // Для первого обращения (selected) или нового обращения (new)
    if (
      ($timeline.hasClass("selected") &&
        !$(".chat__timeline-wrapper").data("first-message-sent")) ||
      $timeline.hasClass("new")
    ) {
      // Вставляем сообщение пользователя в .chat__active
      var $active = $(".chat__active");
      if ($active.length) {
        console.log("there is active block");
        theme = theme.replace("Тема", "");
        console.log("theme for past is: ", theme);
        $active.find(".chat__theme-value").text(theme);
        $active.find(".chat__message-value").text(message);
      } else {
        console.log("no active block");
        // ...создать новый блок
        var html = `
        <div class="chat__active-message outgoing">
          <p class="chat__message-user f16w600">Вы</p>
          <div class="chat__content-wrapper">
            <div class="chat__theme-wrapper">
              <p class="chat__theme-title f14w300 c-bali">Тема:</p>
              <p class="chat__theme-value f14w400 c-space">${theme}</p>
            </div>
            <div class="chat__message-content">
              <p class="chat__message-title f14w300 c-bali">Сообщение:</p>
              <p class="chat__message-value f14w400 c-space">${message}</p>
            </div>
          </div>
          <div class="chat__message-time"><span class="chat__time-value">${getCurrentTime()}</span></div>
        </div>
      `;
        $active.append(html);
      }

      // Меняем состояние
      $timeline.removeClass("selected new").addClass("active");
      $(".chat__timeline-wrapper")
        .data("first-message-sent", true)
        .attr("data-first-message-sent", "true");

      // Очищаем поле ввода и droplist
      $(".chat__input-space").val("");
      var $droplist = $(".chat__begin-theme .droplist");
      $droplist.removeClass("droplist_active");
      $droplist
        .find(".droplist__result_text")
        .text($droplist.find(".droplist__result_text").data("start") || "Тема");

      if (typeof updateTimelineHeight === "function") updateTimelineHeight();
      if (typeof adjustTextareaHeight === "function") adjustTextareaHeight();

      e.preventDefault();
      return false;
    }

    // Иначе — стандартная логика (ничего не делаем, работает sendButton.addEventListener)
  });

  $(document).on("keydown", ".chat__input-space", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      $(".chat__input-btn").trigger("click");
    }
  });

  // Сброс флага и droplist при закрытии чата
  $(document).on("click", ".chat__hide", function () {
    $(".chat__timeline-wrapper").data("first-message-sent", false);
    // Сброс droplist к начальному значению
    var $droplist = $(".chat__begin-theme .droplist");
    $droplist.removeClass("droplist_active");
    $droplist
      .find(".droplist__result_text")
      .text($droplist.find(".droplist__result_text").data("start") || "Тема");
    updateTimelineHeight();
  });

  // Вспомогательная функция для времени
  function getCurrentTime() {
    var now = new Date();
    var h = now.getHours().toString().padStart(2, "0");
    var m = now.getMinutes().toString().padStart(2, "0");
    return h + ":" + m;
  }

  $(document).on("click", ".chat__new", function () {
    var $timeline = $(".chat__timeline-wrapper");
    if ($timeline.hasClass("end")) {
      $timeline.removeClass("end").addClass("new");
    }
  });
});
