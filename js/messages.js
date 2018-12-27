'use strict';
(function () {

  var KEYCODE_ESC = 27;

  var createMessageElement = function (templateElement) {
    if (messageElement) {
      closeMessage();
    }
    var element = templateElement.cloneNode(true);

    element.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', documentKeydownHandler);

    return element;
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
      messageElement = createMessageElement(templateSuccessElement);
      mainElement.appendChild(messageElement);
    },
    createErrorMessage: function () {
      messageElement = createMessageElement(templateErrorElement);
      mainElement.appendChild(messageElement);
    }
  };
})();
