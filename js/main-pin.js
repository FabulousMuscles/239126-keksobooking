'use strict';

(function () {
  var POSITION_MAX_X = 1135;
  var POSITION_MIN_X = 0;
  var POSITION_MAX_Y = 630;
  var POSITION_MIN_Y = 130;

  var ADDRESS_ORIGIN_X = 570;
  var ADDRESS_ORIGIN_Y = 375;

  var mainPinElement = document.querySelector('.map__pin--main');

  var createMainPinMouseDownHandler = function (callbackMainPinMouseUp, callbackMainPinMouseMove) {
    return function (evt) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMainPinMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var y = Math.max(POSITION_MIN_Y, Math.min((mainPinElement.offsetTop - shift.y), POSITION_MAX_Y));
        var x = Math.max(POSITION_MIN_X, Math.min((mainPinElement.offsetLeft - shift.x), POSITION_MAX_X));

        mainPinElement.style.top = y + 'px';
        mainPinElement.style.left = x + 'px';

        callbackMainPinMouseMove(x, y);
      };

      var onMainPinMouseUp = function () {
        callbackMainPinMouseUp();

        document.removeEventListener('mousemove', onMainPinMouseMove);
        document.removeEventListener('mouseup', onMainPinMouseUp);
      };
      document.addEventListener('mousemove', onMainPinMouseMove);
      document.addEventListener('mouseup', onMainPinMouseUp);
    };
  };

  var onMainPinMouseDown;

  window.mainPin = {
    activate: function (callbackMainPinMouseUp, callbackMainPinMouseMove) {
      onMainPinMouseDown = createMainPinMouseDownHandler(callbackMainPinMouseUp, callbackMainPinMouseMove);

      mainPinElement.addEventListener('mousedown', onMainPinMouseDown);
    },
    deactivate: function () {
      mainPinElement.removeEventListener('mousedown', onMainPinMouseDown);
    },
    resetPosition: function () {
      mainPinElement.style.left = ADDRESS_ORIGIN_X + 'px';
      mainPinElement.style.top = ADDRESS_ORIGIN_Y + 'px';
    }
  };

})();
