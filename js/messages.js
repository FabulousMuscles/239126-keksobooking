'use strict';
(function () {

  var KEYCODE_ESC = 27;

  var createUploadMessage = function (templateElement) {
    createMessage(templateElement);

    return messageElement;
  };

  var createLoadMessage = function (templateElement, textMessage) {
    createMessage(templateElement);

    messageElement.querySelector('.error__message').textContent = textMessage;

    return messageElement;
  };


  var createMessage = function (templateElement) {
    if (messageElement) {
      closeMessage();
    }
    messageElement = templateElement.cloneNode(true);
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
      mainElement.appendChild(createLoadMessage(templateErrorElement, textMessage));
    }
  };
})();
