'use strict';

(function () {
  var KEYCODE_ESC = 27;
  var SELECTOR_MESSAGE_ERROR = '.error__message';

  var createMessage = function (templateElement, messageSelector, textMessage) {
    var messageTextElement;

    if (messageElement) {
      closeMessage();
    }
    messageElement = templateElement.cloneNode(true);

    if (messageSelector && textMessage) {
      messageTextElement = messageElement.querySelector(messageSelector);
      messageTextElement.textContent = textMessage;
    }

    messageElement.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onDocumentKeydown);

    mainElement.appendChild(messageElement);
  };

  var onMessageClick = function () {
    closeMessage();
  };

  var onDocumentKeydown = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    mainElement.removeChild(messageElement);
    messageElement = null;
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  var messageElement;
  var mainElement = document.querySelector('main');
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var templateSuccessElement = document.querySelector('#success').content.querySelector('.success');

  window.messages = {
    createSuccessMessage: function () {
      createMessage(templateSuccessElement);
    },
    createErrorMessage: function (textMessage) {
      createMessage(templateErrorElement, SELECTOR_MESSAGE_ERROR, textMessage);
    }
  };
})();
