document.addEventListener('DOMContentLoaded', function () {
  const timeline = document.querySelector('.chat__timeline');
  const timelineWrapper = document.querySelector('.chat__timeline-wrapper');
  const chatHeader = document.querySelector('.chat__header');
  const chatInput = document.querySelector('.chat__input');
  const chatContainer = document.querySelector('.chat__container');
  const chatEventBtn = document.querySelector('.chat__event');
  const chatHideBtn = document.querySelector('.chat__hide');
  const textarea = document.querySelector('.chat__input-space');
  const sendButton = document.querySelector('.chat__input-btn');
  const replyContainer = document.querySelector('.chat__reply-container');
  const replyAuthor = document.querySelector('.chat__reply-author');
  const replyText = document.querySelector('.chat__reply-text');
  const replyClose = document.querySelector('.chat__reply-close');
  const scrollDownBtn = document.querySelector('.chat__scroll-down-btn');
  let hideTimeout;
  let quotedMessage = null;

  // Функция для вычисления высоты timelineWrapper
  function updateTimelineHeight() {
    const headerHeight = chatHeader ? chatHeader.offsetHeight : 0;
    const inputHeight = chatInput ? chatInput.offsetHeight : 0;
    const totalHeight = headerHeight + inputHeight;
    timelineWrapper.style.height = `calc(100vh - ${totalHeight}px)`;
    updatePadding();
    updateScrollButtonVisibility();
  }

  // Функция для проверки наличия скроллбара и обновления padding-right
  function updatePadding() {
    const hasScrollbar = timeline.scrollHeight > timeline.clientHeight;
    if (hasScrollbar) {
      timeline.style.paddingRight = '5px'; // Уменьшаем padding-right, если есть скроллбар
    } else {
      timeline.style.paddingRight = '15px'; // Возвращаем стандартный padding-right
    }
  }

  // Функция для проверки видимости кнопки прокрутки вниз
  function updateScrollButtonVisibility() {
    const hasScrollbar = timeline.scrollHeight > timeline.clientHeight;
    if (!hasScrollbar) {
      scrollDownBtn.classList.remove('visible');
      return;
    }

    // Вычисляем, насколько пользователь прокрутил вверх
    const scrollTop = timeline.scrollTop; // Текущая позиция скролла
    const scrollHeight = timeline.scrollHeight; // Полная высота контента
    const clientHeight = timeline.clientHeight; // Видимая высота
    const scrollableDistance = scrollHeight - clientHeight; // Скроллируемая высота
    const scrollPercentage = (scrollTop / scrollableDistance) * 100; // Процент прокрутки

    // Показываем кнопку, если пользователь прокрутил вверх более чем на 20%
    if (scrollPercentage < 80) { // 100% - 20% = 80%
      scrollDownBtn.classList.add('visible');
    } else {
      scrollDownBtn.classList.remove('visible');
    }
  }

  // Функция для прокрутки вниз
  function scrollToBottom() {
    timeline.scrollTo({
      top: timeline.scrollHeight,
      behavior: 'smooth' // Плавная прокрутка
    });
  }

  // Функция для показа скроллбара
  function showScrollbar() {
    timeline.classList.add('chat__timeline--scrollbar-visible');
    clearTimeout(hideTimeout);
  }

  // Функция для скрытия скроллбара
  function hideScrollbar() {
    hideTimeout = setTimeout(() => {
      timeline.classList.remove('chat__timeline--scrollbar-visible');
    }, 1000);
  }

  // События для скроллбара
  timeline.addEventListener('scroll', function () {
    showScrollbar();
    hideScrollbar();
    updateScrollButtonVisibility();
  });

  timeline.addEventListener('mouseover', showScrollbar);
  timeline.addEventListener('mouseout', hideScrollbar);

  // Прокрутка вниз при нажатии на кнопку
  scrollDownBtn.addEventListener('click', scrollToBottom);

  // Функция для подстройки высоты textarea
  const minHeight = 55;
  const maxHeight = 81;
  textarea.style.height = `${minHeight}px`;

  function adjustTextareaHeight() {
    textarea.style.height = 'auto';
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
    textarea.style.bottom = '0';
    textarea.style.top = `auto`;
    updateTimelineHeight(); // Обновляем высоту timelineWrapper
  }

  textarea.addEventListener('input', adjustTextareaHeight);

  // Обработка нажатия на кнопку ответа
  document.querySelectorAll('.chat__answer').forEach(button => {
    button.addEventListener('click', function () {
      const messageContent = this.closest('.chat__message-content');
      const author = messageContent.querySelector('.chat__content-author').textContent;
      const source = messageContent.querySelector('.chat__content-source').textContent;
      const textElement = messageContent.querySelector('.chat__content-item');
      const text = textElement.innerHTML;

      quotedMessage = {author, source, text};
      replyAuthor.textContent = author;
      replyText.innerHTML = text;
      const replySource = replyContainer.querySelector('.chat__reply-source') || document.createElement('p');
      replySource.className = 'chat__reply-source';
      replySource.textContent = `(${source})`; // Добавляем скобки
      replyAuthor.after(replySource);
      replyContainer.style.display = 'flex';
      textarea.focus();
      updateTimelineHeight(); // Обновляем высоту при появлении replyContainer
    });
  });

  // Закрытие процитированного сообщения
  replyClose.addEventListener('click', function () {
    replyContainer.style.display = 'none';
    quotedMessage = null;
    updateTimelineHeight(); // Обновляем высоту при скрытии replyContainer
  });

  // Отправка сообщения
  sendButton.addEventListener('click', function () {
    const messageText = textarea.value.trim();
    if (!messageText) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat__message outgoing';
    const messageContent = document.createElement('div');
    messageContent.className = 'chat__message-content';

    if (quotedMessage) {
      const replyBlock = document.createElement('div');
      replyBlock.className = 'chat__message-reply';
      replyBlock.innerHTML = `
                <div class="chat__reply-title">
                    <p class="chat__reply-author">${quotedMessage.author}</p>
                    <p class="chat__reply-source">(${quotedMessage.source})</p>
                </div>
                <p class="chat__reply-text">${quotedMessage.text}</p>
            `;
      messageContent.appendChild(replyBlock);
    }

    messageContent.innerHTML += `
            <p class="chat__content-author">Роман</p>
            <p class="chat__content-item">${messageText}</p>
            <span class="chat__content-date">${new Date().toLocaleString('ru', {
      day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric'
    })}</span>
        `;

    messageDiv.appendChild(messageContent);
    timeline.appendChild(messageDiv);

    textarea.value = '';
    replyContainer.style.display = 'none';
    quotedMessage = null;
    adjustTextareaHeight();
    timeline.scrollTop = timeline.scrollHeight;
    scrollToBottom();
    updatePadding();
  });

  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendButton.click();
    }
  });

  // Показать чат при нажатии на кнопку .chat__event
  chatEventBtn.addEventListener('click', function() {
    chatContainer.classList.add('visible');
  });

  // Скрыть чат при нажатии на кнопку .chat__hide
  chatHideBtn.addEventListener('click', function() {
    chatContainer.classList.remove('visible');
  });

  // Первоначальное вычисление высоты и padding
  updateTimelineHeight();
  updatePadding();
  if (timeline.scrollHeight > timeline.clientHeight) {
    scrollToBottom(); // Прокручиваем вниз при загрузке, если есть скроллбар
  }

  // Обновляем высоту при изменении размера окна
  window.addEventListener('resize', () => {
    updateTimelineHeight();
    updatePadding();
  });
});