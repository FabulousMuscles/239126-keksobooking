'use strict';
(function () {

  var KEYCODE_ESC = 27;

  var createMessage = function (templateElement) {
    if (messageElement) {
      closeMessage();
    }
    messageElement = templateElement.cloneNode(true);

    messageElement.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);

    return messageElement;
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
    createSuccessMessage: function () {
      mainElement.appendChild(createMessage(templateSuccessElement));
    },
    createErrorMessage: function () {
      mainElement.appendChild(createMessage(templateErrorElement));
    }
  };
})();
