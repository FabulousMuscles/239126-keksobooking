'use strict';
(function () {

  var KEYCODE_ESC = 27;

  var createUploadMessage = function (templateElement) {
    if (messageElement) {
      closeMessage();
    }
    messageElement = templateElement.cloneNode(true);

    createMessageListeners();

    return messageElement;
  };

  var createLoadMessage = function (textMessage) {
    messageElement = templateErrorElement.cloneNode(true);

    messageElement.querySelector('.error__message').textContent = textMessage;

    createMessageListeners();

    return messageElement;
  };


  var createMessageListeners = function () {
    messageElement.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);
  };

  var messageClickHandler = function () {
    closeMessage();
  };

  var documentKeydownHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      closeMessage();
    }
  };

  var closeMessage = function () {
    mainElement.removeChild(messageElement);
    messageElement = null;
    document.removeEventListener('keydown', documentKeydownHandler);
  };

  var messageElement;
  var mainElement = document.querySelector('main');
  var templateErrorElement = document.querySelector('#error').content.querySelector('.error');
  var templateSuccessElement = document.querySelector('#success').content.querySelector('.success');

  window.messages = {
    createSuccessUploadMessage: function () {
      mainElement.appendChild(createUploadMessage(templateSuccessElement));
    },
    createErrorUploadMessage: function () {
      mainElement.appendChild(createUploadMessage(templateErrorElement));
    },
    createErrorLoadMessage: function (textMessage) {
      mainElement.appendChild(createLoadMessage(textMessage));
    }
  };
})();
