// new update
addPopupOpenHandler(".new-update__btn", "create-new-update");
addPopupCloseHandler("#create-close-new-update", "create-new-update");
addPopupCloseOnBackgroundClickHandler("create-new-update");
addPopupCloseOnEscKeyHandler("create-new-update");

document
  .querySelector(".new-update__btn-cancel")
  .addEventListener("click", function () {
    document
      .getElementById("create-new-update")
      .classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

// response tg
addPopupOpenHandler(".tg-response", "response-tg");
addPopupCloseHandler("#create-close-new-update", "response-tg");
addPopupCloseOnBackgroundClickHandler("response-tg");
addPopupCloseOnEscKeyHandler("response-tg");

// moderation
addPopupOpenHandler(".moderation-call", "nots-moderations");
addPopupCloseHandler("#create-close-new-update", "nots-moderations");
addPopupCloseOnBackgroundClickHandler("nots-moderations");
addPopupCloseOnEscKeyHandler("nots-moderations");

document
  .querySelector(".moderation__btn-accept")
  .addEventListener("click", function () {
    document
      .getElementById("nots-moderations")
      .classList.remove("vacancies__item-popup--open");
    document.body.classList.remove("stop-scroll");
  });

// video module
function playVideo() {
  const placeholder = document.querySelector(".video-placeholder");
  const video = document.createElement("video");
  video.classList.add("video-space");
  video.controls = true;
  video.autoplay = true;
  const source = document.createElement("source");
  source.src = "../../video/video.webm";
  source.type = "video/webm";
  video.appendChild(source);
  placeholder.innerHTML = "";
  placeholder.appendChild(video);
  video
    .play()
    .catch((error) =>
      console.log("Автовоспроизведение заблокировано: ", error)
    );
}

document
  .querySelector(".video-placeholder")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    playVideo();
  });
